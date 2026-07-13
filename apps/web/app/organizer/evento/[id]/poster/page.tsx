import { notFound, redirect } from "next/navigation";
import type { EventRow } from "@lodeayer/shared";
import { createClient } from "@/lib/supabase/server";
import PosterPrintClient from "@/components/organizer/PosterPrintClient";

export default async function EventoPosterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/organizer");

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single<EventRow>();

  if (!event) notFound();

  const guestUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/evento/${event.slug}`;

  return (
    <PosterPrintClient
      guestUrl={guestUrl}
      partner1={event.partner1}
      partner2={event.partner2}
      bannerUrl={event.banner_url}
    />
  );
}
