import Link from "next/link";
import { ArrowRight, FolderHeart, Plus } from "lucide-react";
import type { EventRow } from "@lodeayer/shared";
import { createClient } from "@/lib/supabase/server";
import OrgAuthFlow from "@/components/organizer/OrgAuthFlow";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default async function OrganizerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <OrgAuthFlow />;
  }

  const { data: events } = await supabase
    .from("events")
    .select("id,partner1,partner2,event_date,banner_url")
    .eq("host_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Pick<EventRow, "id" | "partner1" | "partner2" | "event_date" | "banner_url">[]>();

  if (!events?.length) {
    return (
      <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
        <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] px-6 pt-12 pb-10 flex flex-col">
          <h1 className="font-serif italic text-2xl font-light mb-6">Mis eventos</h1>

          <Empty className="border-white/[0.08] bg-[#111113] flex-1 justify-center">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="bg-white/[0.06] text-[#d9b98a]">
                <FolderHeart />
              </EmptyMedia>
              <EmptyTitle className="text-[#f4efe7] font-serif italic text-lg font-normal">
                Aún no tienes eventos
              </EmptyTitle>
              <EmptyDescription className="text-[#f4efe7]/35">
                Crea tu primer evento para empezar a recibir fotos de tus invitados.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link
                href="/organizer/nuevo"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-champagne-gradient text-sm font-medium tracking-wide text-[#0b0b0c] transition hover:brightness-105"
              >
                <Plus className="h-4 w-4" /> Crear evento
              </Link>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-start justify-center">
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#0b0b0c] px-6 pt-12 pb-10">
        <h1 className="font-serif italic text-2xl font-light mb-6">Mis eventos</h1>

        <div className="space-y-3 mb-6">
          {events.map(e => (
            <Link
              key={e.id}
              href={`/organizer/evento/${e.id}`}
              className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#111113] px-5 py-4 hover:border-white/[0.15] transition-colors"
            >
              <div>
                <p className="font-serif italic text-lg">Boda de {e.partner1} &amp; {e.partner2}</p>
                {e.event_date && (
                  <p className="text-[#f4efe7]/35 text-xs mt-0.5">{e.event_date}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-[#f4efe7]/30" />
            </Link>
          ))}
        </div>

        <Link
          href="/organizer/nuevo"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-champagne-gradient text-sm font-medium tracking-wide text-[#0b0b0c] transition hover:brightness-105"
        >
          <Plus className="h-4 w-4" /> Crear nuevo evento
        </Link>
      </div>
    </div>
  );
}
