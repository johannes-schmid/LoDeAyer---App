-- M3 step B — guest photo management: upload, delete, reorder, favorite, submit.
--
-- Same trust model as 0002_guest_join.sql: guests are anon, identified only by a guest_id the
-- client holds (server-side httpOnly cookie). All mutations go through SECURITY DEFINER RPCs so
-- RLS never needs to trust a guest-supplied guest_id directly — each RPC re-derives the guest's
-- event and re-checks state itself.

alter table public.guests add column submitted_at timestamptz;
alter table public.photos add column position int not null default 0;

-- One favorite (contest entry) per guest, enforced at the DB level.
create unique index photos_one_favorite_per_guest
  on public.photos (guest_id)
  where is_contest_entry;

-- ============================================================
-- autolock helper — lazily enforces "auto-submit once reveal_at passes"
-- (no cron job: every RPC below calls this first)
-- ============================================================
create or replace function public._guest_autolock(p_guest_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.guests
  set submitted_at = now()
  where guests.id = p_guest_id
    and guests.submitted_at is null
    and exists (
      select 1 from public.events
      where events.id = guests.event_id
        and events.reveal_at is not null
        and events.reveal_at <= now()
    );
end;
$$;

-- ============================================================
-- get_guest_upload_status
-- ============================================================
create or replace function public.get_guest_upload_status(p_guest_id uuid)
returns table (
  name text,
  submitted_at timestamptz,
  reveal_at timestamptz,
  max_photos_per_guest int,
  unlimited_photos boolean
)
language plpgsql
security definer set search_path = public
as $$
begin
  perform public._guest_autolock(p_guest_id);

  return query
    select g.name, g.submitted_at, e.reveal_at, e.max_photos_per_guest, e.unlimited_photos
    from public.guests g
    join public.events e on e.id = g.event_id
    where g.id = p_guest_id;
end;
$$;

-- ============================================================
-- list_guest_photos
-- ============================================================
create or replace function public.list_guest_photos(p_guest_id uuid)
returns setof public.photos
language plpgsql
security definer set search_path = public
as $$
begin
  perform public._guest_autolock(p_guest_id);

  return query
    select * from public.photos
    where guest_id = p_guest_id
    order by position;
end;
$$;

-- ============================================================
-- add_guest_photo
-- ============================================================
create or replace function public.add_guest_photo(p_guest_id uuid, p_storage_path text)
returns public.photos
language plpgsql
security definer set search_path = public
as $$
declare
  v_guest public.guests;
  v_event public.events;
  v_count int;
  v_photo public.photos;
begin
  perform public._guest_autolock(p_guest_id);

  select * into v_guest from public.guests where id = p_guest_id;
  if v_guest is null then
    raise exception 'guest not found';
  end if;
  if v_guest.submitted_at is not null then
    raise exception 'ya enviaste tus fotos';
  end if;

  select * into v_event from public.events where id = v_guest.event_id;

  select count(*) into v_count from public.photos where guest_id = p_guest_id;
  if not v_event.unlimited_photos and v_count >= v_event.max_photos_per_guest then
    raise exception 'carrete lleno';
  end if;

  insert into public.photos (event_id, guest_id, storage_path, position)
  values (
    v_guest.event_id,
    p_guest_id,
    p_storage_path,
    (select coalesce(max(position), -1) + 1 from public.photos where guest_id = p_guest_id)
  )
  returning * into v_photo;

  return v_photo;
end;
$$;

-- ============================================================
-- delete_guest_photo
-- ============================================================
create or replace function public.delete_guest_photo(p_photo_id uuid, p_guest_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_submitted_at timestamptz;
begin
  perform public._guest_autolock(p_guest_id);

  select submitted_at into v_submitted_at from public.guests where id = p_guest_id;
  if v_submitted_at is not null then
    raise exception 'ya enviaste tus fotos';
  end if;

  delete from public.photos where id = p_photo_id and guest_id = p_guest_id;
end;
$$;

-- ============================================================
-- reorder_guest_photos
-- ============================================================
create or replace function public.reorder_guest_photos(p_guest_id uuid, p_photo_ids uuid[])
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_submitted_at timestamptz;
  v_id uuid;
  v_position int := 0;
begin
  perform public._guest_autolock(p_guest_id);

  select submitted_at into v_submitted_at from public.guests where id = p_guest_id;
  if v_submitted_at is not null then
    raise exception 'ya enviaste tus fotos';
  end if;

  foreach v_id in array p_photo_ids loop
    update public.photos
    set position = v_position
    where id = v_id and guest_id = p_guest_id;
    v_position := v_position + 1;
  end loop;
end;
$$;

-- ============================================================
-- set_favorite_photo
-- ============================================================
create or replace function public.set_favorite_photo(p_photo_id uuid, p_guest_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_submitted_at timestamptz;
begin
  perform public._guest_autolock(p_guest_id);

  select submitted_at into v_submitted_at from public.guests where id = p_guest_id;
  if v_submitted_at is not null then
    raise exception 'ya enviaste tus fotos';
  end if;

  update public.photos
  set is_contest_entry = (id = p_photo_id)
  where guest_id = p_guest_id;
end;
$$;

-- ============================================================
-- submit_guest_photos
-- ============================================================
create or replace function public.submit_guest_photos(p_guest_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_count int;
begin
  perform public._guest_autolock(p_guest_id);

  select count(*) into v_count from public.photos where guest_id = p_guest_id;
  if v_count = 0 then
    raise exception 'sube al menos una foto antes de enviar';
  end if;

  update public.guests
  set submitted_at = now()
  where id = p_guest_id and submitted_at is null;
end;
$$;

grant execute on function public.get_guest_upload_status(uuid) to anon;
grant execute on function public.list_guest_photos(uuid) to anon;
grant execute on function public.add_guest_photo(uuid, text) to anon;
grant execute on function public.delete_guest_photo(uuid, uuid) to anon;
grant execute on function public.reorder_guest_photos(uuid, uuid[]) to anon;
grant execute on function public.set_favorite_photo(uuid, uuid) to anon;
grant execute on function public.submit_guest_photos(uuid) to anon;

-- ============================================================
-- storage policies for event-photos (private bucket, previously had none)
-- ============================================================
create policy "event_photos_anon_insert"
  on storage.objects for insert
  to anon
  with check (
    bucket_id = 'event-photos'
    and exists (
      select 1 from public.events
      where events.id::text = (storage.foldername(name))[1]
        and events.status = 'active'
    )
  );

create policy "event_photos_anon_select"
  on storage.objects for select
  to anon
  using (
    bucket_id = 'event-photos'
    and exists (
      select 1 from public.events
      where events.id::text = (storage.foldername(name))[1]
    )
  );
