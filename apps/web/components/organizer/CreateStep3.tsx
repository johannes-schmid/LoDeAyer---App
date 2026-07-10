"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check } from "lucide-react";
import { StepBar } from "./CreateStep1";
import type { EventInfo } from "./CreateStep1";
import type { EventSettings } from "./CreateStep2";

const PLANS = [
  { id: "fiesta", name: "Fiesta", guests: "Hasta 50 invitados", price: "$49", popular: true },
  { id: "boda", name: "Boda", guests: "Hasta 150 invitados", price: "$89", popular: false },
  { id: "total", name: "Boda Total", guests: "Invitados ilimitados", price: "$159", popular: false },
];

interface CreateStep3Props {
  info: EventInfo;
  settings: EventSettings;
  onConfirm: () => void;
  onBack: () => void;
}

export default function CreateStep3({ info, settings, onConfirm, onBack }: CreateStep3Props) {
  const [plan, setPlan] = useState("fiesta");

  const title = info.partner1 && info.partner2
    ? `Boda de ${info.partner1} & ${info.partner2}`
    : "Tu evento";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <StepBar active={2} />
      <div className="px-6 mb-6">
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Paso 3 de 3</p>
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
              { label: "Momentos", val: `${settings.moments.length} seleccionados` },
              { label: "Premio", val: settings.prize ? settings.prize.split(" ").slice(0, 2).join(" ") : "—" },
            ].map(({ label, val }) => (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-wide text-[#f4efe7]/30">{label}</p>
                <p className="text-base font-semibold mt-1">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest">Selecciona tu plan</p>
        <div className="space-y-2">
          {PLANS.map(p => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={`w-full flex items-center justify-between rounded-2xl px-5 py-4 border-2 transition-all ${
                plan === p.id ? "border-[#d9b98a]/50 bg-[#d9b98a]/[0.05]" : "border-white/[0.07] bg-[#111113]"
              }`}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{p.name}</span>
                  {p.popular && (
                    <span className="bg-[#d9b98a]/10 border border-[#d9b98a]/30 text-[#d9b98a] text-[10px] font-semibold rounded-full px-2 py-0.5">Popular</span>
                  )}
                </div>
                <p className="text-[#f4efe7]/35 text-xs mt-0.5">{p.guests}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xl font-bold tracking-tight">{p.price}</p>
                  <p className="text-[#f4efe7]/30 text-[10px]">pago único</p>
                </div>
                {plan === p.id && <Check className="w-4 h-4 text-[#d9b98a] shrink-0" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6 pb-10 space-y-3">
        <Button onClick={onConfirm} className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]">
          Crear evento y pagar →
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3 flex items-center justify-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    </div>
  );
}
