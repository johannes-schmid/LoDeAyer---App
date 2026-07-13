import { notFound, redirect } from "next/navigation";
import type { EventRow } from "@lodeayer/shared";
import { createClient } from "@/lib/supabase/server";
import EditBannerClient from "./EditBannerClient";

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
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

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] overflow-hidden" style={{ touchAction: "manipulation" }}>
        <EditBannerClient
          eventId={event.id}
          currentBannerUrl={event.banner_url}
          info={{
            partner1: event.partner1,
            partner2: event.partner2,
            date: event.event_date ?? "",
            revealTime: "09:00",
            venue: event.venue ?? "",
            city: event.city ?? "",
          }}
        />
      </div>
    </div>
  );
}
