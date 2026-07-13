-- M3 step A — guest join via slug (phone + name, no account).
--
-- guests_host_select restricts SELECT to the event's host, which also blocks the
-- RETURNING row of a direct anon INSERT (Postgres RLS-checks RETURNING against
-- SELECT policies too). So guest join goes through a SECURITY DEFINER function
-- instead of a table-level anon INSERT policy: it bypasses RLS internally (owned by
-- postgres) but only ever returns the one row it just wrote.

create or replace function public.join_guest(p_event_id uuid, p_name text, p_whatsapp text)
returns public.guests
language plpgsql
security definer set search_path = public
as $$
declare
  v_guest public.guests;
begin
  if not exists (
    select 1 from public.events
    where events.id = p_event_id and events.status = 'active'
  ) then
    raise exception 'event not found or not active';
  end if;

  insert into public.guests (event_id, name, whatsapp)
  values (p_event_id, p_name, p_whatsapp)
  on conflict (event_id, whatsapp) do update set name = excluded.name
  returning * into v_guest;

  return v_guest;
end;
$$;

grant execute on function public.join_guest(uuid, text, text) to anon;
