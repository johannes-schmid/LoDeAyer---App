import { notFound, redirect } from "next/navigation";
import type { EventRow } from "@lodeayer/shared";
import { createClient } from "@/lib/supabase/server";
import OrgDashboard from "@/components/organizer/OrgDashboard";

function formatRevealLabel(revealAt: string | null): string | null {
  if (!revealAt) return null;
  const formatted = new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(revealAt));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default async function EventoDashboardPage({ params }: { params: Promise<{ id: string }> }) {
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
  const revealLabel = formatRevealLabel(event.reveal_at);

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] overflow-hidden">
        <OrgDashboard event={event} guestUrl={guestUrl} revealLabel={revealLabel} />
      </div>
    </div>
  );
}
