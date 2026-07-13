import { notFound } from "next/navigation";
import type { EventRow } from "@lodeayer/shared";
import { createClient } from "@/lib/supabase/server";
import { getGuestPhotoState } from "@/lib/guests/actions";
import EventoClient from "./EventoClient";

function formatEventDate(eventDate: string | null): string | undefined {
  if (!eventDate) return undefined;
  const d = new Date(`${eventDate}T00:00:00`);
  if (Number.isNaN(d.getTime())) return eventDate;
  return d.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
}

export default async function EventoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single<EventRow>();

  if (!event) notFound();

  const guestState = await getGuestPhotoState(event.id);

  return (
    <EventoClient
      eventId={event.id}
      bannerUrl={event.banner_url}
      partner1={event.partner1}
      partner2={event.partner2}
      city={event.city}
      date={formatEventDate(event.event_date)}
      maxPhotosPerGuest={event.max_photos_per_guest}
      revealAt={event.reveal_at}
      initialGuestState={guestState}
    />
  );
}
