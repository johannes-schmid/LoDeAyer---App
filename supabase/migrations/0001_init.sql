-- LoDeAyer — full schema (profiles, events, guests, photos, votes)
-- RLS on all tables, updated_at + on_auth_user_created triggers, storage buckets.

-- ============================================================
-- profiles — 1:1 with auth.users
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  whatsapp text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (id = auth.uid());

create policy "profiles_update_own"
  on public.profiles for update
  using (id = auth.uid());

-- ============================================================
-- events — core row
-- ============================================================
create table public.events (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references auth.users (id),
  slug text not null unique,
  partner1 text not null,
  partner2 text not null,
  event_date date,
  reveal_at timestamptz,
  venue text,
  city text,
  max_photos_per_guest int not null default 20,
  unlimited_photos boolean not null default false,
  moments text[] not null default '{}',
  reward_type text check (reward_type in ('flowers', 'sweets', 'liquor', 'custom', 'none')),
  reward_label text,
  banner_url text,
  allow_sharing boolean not null default true,
  voting_open text default 'guests' check (voting_open in ('guests', 'anyone')),
  status text not null default 'active' check (status in ('draft', 'active', 'revealed', 'archived')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events_host_all"
  on public.events for all
  using (host_id = auth.uid())
  with check (host_id = auth.uid());

create policy "events_anon_select_active"
  on public.events for select
  to anon
  using (status = 'active');

-- ============================================================
-- guests — (schema only this milestone)
-- ============================================================
create table public.guests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  name text not null,
  whatsapp text not null,
  created_at timestamptz not null default now(),
  unique (event_id, whatsapp)
);

alter table public.guests enable row level security;

create policy "guests_host_select"
  on public.guests for select
  using (
    exists (
      select 1 from public.events
      where events.id = guests.event_id
        and events.host_id = auth.uid()
    )
  );

-- ============================================================
-- photos — (schema only this milestone)
-- ============================================================
create table public.photos (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  guest_id uuid not null references public.guests (id) on delete cascade,
  storage_path text not null,
  moment text,
  approved boolean not null default false,
  is_contest_entry boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.photos enable row level security;

create policy "photos_host_select"
  on public.photos for select
  using (
    exists (
      select 1 from public.events
      where events.id = photos.event_id
        and events.host_id = auth.uid()
    )
  );

-- ============================================================
-- votes — (schema only this milestone)
-- ============================================================
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  photo_id uuid not null references public.photos (id) on delete cascade,
  guest_id uuid not null references public.guests (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (event_id, guest_id)
);

alter table public.votes enable row level security;

create policy "votes_host_select"
  on public.votes for select
  using (
    exists (
      select 1 from public.events
      where events.id = votes.event_id
        and events.host_id = auth.uid()
    )
  );

-- ============================================================
-- triggers
-- ============================================================

-- updated_at on events
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_set_updated_at
  before update on public.events
  for each row
  execute function public.set_updated_at();

-- auto-populate profiles on new auth.users row
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ============================================================
-- storage buckets
-- ============================================================
insert into storage.buckets (id, name, public)
values ('event-banners', 'event-banners', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('event-photos', 'event-photos', false)
on conflict (id) do nothing;

create policy "event_banners_public_read"
  on storage.objects for select
  using (bucket_id = 'event-banners');

create policy "event_banners_host_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'event-banners'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "event_banners_host_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'event-banners'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
