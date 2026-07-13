"use client";
import { useState } from "react";
import type { EventRow } from "@lodeayer/shared";
import EventShareCard from "./EventShareCard";
import { Bell, Calendar, Camera, Check, Sparkles } from "lucide-react";

interface OrgDashboardProps {
  event: EventRow;
  guestUrl: string;
  revealLabel: string | null;
  onCurate?: () => void;
}

type Tab = "inicio" | "actividad" | "album";

export default function OrgDashboard({ event, guestUrl, revealLabel, onCurate }: OrgDashboardProps) {
  const [tab, setTab] = useState<Tab>("inicio");
  const eventName = `Boda de ${event.partner1} & ${event.partner2}`;

  return (
    <div className="flex flex-col h-full bg-[#0b0b0c]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3 shrink-0">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30 mb-0.5">Panel organizador</p>
          <h2 className="font-serif italic text-xl font-light leading-tight">{eventName}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px] font-semibold">En curso</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#111113] border border-white/[0.06] flex items-center justify-center text-[#f4efe7]/50">
            <Bell className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "inicio" && (
          <InicioTab event={event} guestUrl={guestUrl} revealLabel={revealLabel} onCurate={onCurate} />
        )}
        {tab === "actividad" && <ActividadTab />}
        {tab === "album" && <AlbumTab onCurate={onCurate} />}
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 bg-[#0d0d0f] border-t border-white/[0.06] flex pb-safe">
        {([
          { key: "inicio", label: "Inicio", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { key: "actividad", label: "Actividad", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
          { key: "album", label: "Álbum", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
        ] as { key: Tab; label: string; icon: React.ReactNode }[]).map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${tab === key ? "text-[#d9b98a]" : "text-[#f4efe7]/25"}`}
          >
            {icon}
            <span className="text-[9px] uppercase tracking-wider font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function InicioTab({ event, guestUrl, revealLabel, onCurate }: {
  event: EventRow; guestUrl: string; revealLabel: string | null; onCurate?: () => void;
}) {
  const stats = { fotos: "0", personas: "0" };

  return (
    <div className="px-5 pt-2 pb-6 space-y-5">
      {/* Stats */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl divide-x divide-white/[0.06] flex">
        {[{ n: stats.fotos, l: "Fotos" }, { n: stats.personas, l: "Personas subiendo" }].map((s, i) => (
          <div key={i} className="flex-1 text-center py-4">
            <p className="text-xl font-bold tracking-tight">{s.n}</p>
            <p className="text-[10px] text-[#f4efe7]/35 mt-1 uppercase tracking-wider">{s.l}</p>
          </div>
        ))}
      </div>

      <EventShareCard eventId={event.id} guestUrl={guestUrl} partner1={event.partner1} partner2={event.partner2} />

      <EventTimeline
        createdAt={event.created_at}
        revealAt={event.reveal_at}
        revealLabel={revealLabel}
        hasPhotos={stats.fotos !== "0"}
        onCurate={onCurate}
      />
    </div>
  );
}

function getCountdown(revealAt: string | null): string | null {
  if (!revealAt) return null;
  const target = new Date(revealAt).getTime();
  const diffMs = target - Date.now();
  if (diffMs <= 0) return null;
  const days = Math.floor(diffMs / 86_400_000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Mañana";
  return `En ${days} días`;
}

type StepStatus = "done" | "current" | "pending";

function EventTimeline({ createdAt, revealAt, revealLabel, hasPhotos, onCurate }: {
  createdAt: string;
  revealAt: string | null;
  revealLabel: string | null;
  hasPhotos: boolean;
  onCurate?: () => void;
}) {
  const createdLabel = new Date(createdAt).toLocaleDateString("es-PE", { day: "numeric", month: "long" });
  const countdown = getCountdown(revealAt);

  const steps: { icon: React.ReactNode; title: string; detail: string; status: StepStatus; onClick?: () => void }[] = [
    {
      icon: <Check className="w-3.5 h-3.5" />,
      title: "Evento creado",
      detail: createdLabel,
      status: "done",
    },
    {
      icon: <Camera className="w-3.5 h-3.5" />,
      title: "Recibiendo fotos",
      detail: hasPhotos ? "Llegando fotos de invitados" : "Aún no hay fotos — comparte el link",
      status: hasPhotos ? "current" : "pending",
    },
    {
      icon: <Calendar className="w-3.5 h-3.5" />,
      title: "Revelado",
      detail: revealLabel ?? "Sin fecha de revelado",
      status: "pending",
      // shows a countdown badge instead of the default dot when upcoming
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5" />,
      title: "Curar álbum",
      detail: onCurate ? "Elige las fotos que verán todos" : "Próximamente",
      status: "pending",
      onClick: onCurate,
    },
  ];

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl px-4 py-4">
      <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30 mb-4">Cronología</p>
      <div className="space-y-0">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div
              key={step.title}
              onClick={step.onClick}
              role={step.onClick ? "button" : undefined}
              className={`w-full flex items-start gap-3 text-left ${step.onClick ? "cursor-pointer" : ""}`}
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    step.status === "done"
                      ? "bg-[#d9b98a] text-[#0b0b0c]"
                      : step.status === "current"
                      ? "bg-[#d9b98a]/15 text-[#d9b98a] ring-1 ring-[#d9b98a]/40"
                      : "bg-white/[0.05] text-[#f4efe7]/25"
                  }`}
                >
                  {step.icon}
                </div>
                {!isLast && <div className="w-px flex-1 min-h-[22px] bg-white/[0.08] my-1" />}
              </div>
              <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-4"}`}>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${step.status === "pending" ? "text-[#f4efe7]/70" : "text-[#f4efe7]"}`}>
                    {step.title}
                  </p>
                  {step.title === "Revelado" && countdown && (
                    <span className="text-[10px] font-semibold text-[#d9b98a] bg-[#d9b98a]/10 rounded-full px-2 py-0.5">
                      {countdown}
                    </span>
                  )}
                </div>
                <p className="text-[#f4efe7]/35 text-xs mt-0.5">{step.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActividadTab() {
  return (
    <div className="px-5 pt-8 pb-6 text-center">
      <p className="text-[#f4efe7]/30 text-sm">Aún no hay actividad</p>
      <p className="text-[#f4efe7]/20 text-xs mt-1">Comparte el QR para empezar a recibir fotos</p>
    </div>
  );
}

function AlbumTab({ onCurate }: { onCurate?: () => void }) {
  return (
    <div className="px-5 pt-8 pb-6 text-center">
      <p className="text-[#f4efe7]/30 text-sm">Aún no hay fotos</p>
      <p className="text-[#f4efe7]/20 text-xs mt-1">Comparte el QR para empezar a recibir fotos</p>
    </div>
  );
}
