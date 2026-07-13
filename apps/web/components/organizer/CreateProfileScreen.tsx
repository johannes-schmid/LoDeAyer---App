"use client";
import { ArrowLeft, CalendarCheck, Camera, Gift } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import SignInButton from "@/components/organizer/SignInButton";

const BENEFITS = [
  { icon: Camera, text: "Recibe todas las fotos de tus invitados en un solo lugar" },
  { icon: CalendarCheck, text: "Crea tu evento en minutos, sin costo" },
  { icon: Gift, text: "Revelado al día siguiente, listo para compartir" },
];

export default function CreateProfileScreen({ next, onBack }: { next: string; onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-gradient-warm px-6 pt-8 pb-10">
      <button
        onClick={onBack}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#f4efe7]/60"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <Logo markSize={26} textClassName="text-2xl" />
        <h1 className="mt-6 font-serif text-2xl font-light leading-tight text-[#f4efe7]">
          Crea tu perfil <span className="italic text-[#d9b98a]">gratis</span>
        </h1>
        <p className="mt-2 max-w-[19rem] text-[13px] leading-relaxed text-[#8a8a8a]">
          Para crear tu evento primero necesitas una cuenta. Es gratis y toma menos de un minuto.
        </p>

        <div className="mt-8 w-full space-y-3">
          {BENEFITS.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#d9b98a]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm text-[#f4efe7]/80">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <SignInButton
        next={next}
        className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-champagne-gradient text-sm font-medium tracking-wide text-[#0b0b0c] transition hover:brightness-105"
      >
        Continuar con Google
      </SignInButton>
      <p className="pt-3 text-center text-xs text-[#f4efe7]/20">Prueba gratis &middot; Sin tarjeta</p>
    </div>
  );
}
