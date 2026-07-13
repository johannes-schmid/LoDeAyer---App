"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { StepBar } from "./CreateStep1";
import type { EventInfo } from "./CreateStep1";
import type { EventSettings } from "./CreateStep2";

const FLAT_PRICE = "$49";

interface CreateStep3Props {
  info: EventInfo;
  settings: EventSettings;
  onConfirm: () => void;
  onBack: () => void;
}

export default function CreateStep3({ info, settings, onConfirm, onBack }: CreateStep3Props) {
  const title = info.partner1 && info.partner2
    ? `Boda de ${info.partner1} & ${info.partner2}`
    : "Tu evento";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <StepBar steps={4} active={3} />
      <div className="px-6 mb-6">
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Paso 4 de 4</p>
        <h2 className="text-2xl font-bold tracking-tight">Todo listo para<br/>tu evento</h2>
      </div>

      <div className="px-6 space-y-4 flex-1">
        {/* Summary */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-serif italic text-xl">{title}</p>
              <p className="text-[#f4efe7]/35 text-xs mt-1">{info.date} · {info.city || "Lima, Perú"}</p>
            </div>
            <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold rounded-full px-2.5 py-1">✓ Listo</span>
          </div>
          <div className="border-t border-white/[0.05]" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Fotos/persona", val: String(settings.maxPhotos) },
              { label: "Revelado", val: info.revealTime || "9:00" },
              { label: "Premio", val: settings.rewardLabel ? settings.rewardLabel.split(" ").slice(0, 2).join(" ") : "—" },
            ].map(({ label, val }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-wide text-[#f4efe7]/30">{label}</p>
                <p className="text-base font-semibold mt-1">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between rounded-2xl px-5 py-4 border border-white/[0.07] bg-[#111113]">
          <div>
            <p className="font-semibold text-sm">LoDeAyer</p>
            <p className="text-[#f4efe7]/35 text-xs mt-0.5">Invitados y fotos ilimitados</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold tracking-tight">{FLAT_PRICE}</p>
            <p className="text-[#f4efe7]/30 text-[10px]">pago único</p>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6 pb-10 space-y-3">
        <Button onClick={onConfirm} className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]">
          Crear evento →
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3 flex items-center justify-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    </div>
  );
}
