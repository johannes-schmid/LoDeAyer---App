"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { StepBar } from "./CreateStep1";

export interface EventSettings {
  maxPhotos: number;
  unlimitedPhotos: boolean;
  moments: string[];
  prize: string;
  votingOpen: "guests" | "anyone";
  allowSharing: boolean;
}

interface CreateStep2Props {
  data: EventSettings;
  onChange: (d: EventSettings) => void;
  onNext: () => void;
  onBack: () => void;
}

const MOMENT_OPTIONS = [
  { val: "ceremonia", label: "Ceremonia" },
  { val: "cocktail", label: "Cocktail" },
  { val: "cena", label: "Cena" },
  { val: "baile", label: "Baile" },
  { val: "after", label: "After" },
  { val: "preparativos", label: "Preparativos" },
];

export default function CreateStep2({ data, onChange, onNext, onBack }: CreateStep2Props) {
  const toggleMoment = (val: string) => {
    const has = data.moments.includes(val);
    onChange({ ...data, moments: has ? data.moments.filter(m => m !== val) : [...data.moments, val] });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <StepBar active={1} />
      <div className="px-6 mb-6">
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Paso 2 de 3</p>
        <h2 className="text-2xl font-bold tracking-tight">Personaliza<br/>tu álbum</h2>
      </div>

      <div className="px-6 space-y-6 flex-1">
        {/* Max photos stepper */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35">Máximo de fotos por persona</label>
            <button
              onClick={() => onChange({ ...data, unlimitedPhotos: !data.unlimitedPhotos })}
              className="flex items-center gap-2 text-xs text-[#f4efe7]/40 hover:text-[#f4efe7]/70 transition-colors"
            >
              <div className={`w-8 h-4 rounded-full relative transition-colors ${data.unlimitedPhotos ? "bg-[#d9b98a]" : "bg-white/[0.10]"}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${data.unlimitedPhotos ? "right-0.5" : "left-0.5"}`} />
              </div>
              Sin límite
            </button>
          </div>
          {data.unlimitedPhotos ? (
            <div className="flex items-center justify-center bg-[#111113] border border-white/[0.08] rounded-2xl p-5">
              <p className="text-[#d9b98a] font-semibold text-sm">∞ Sin restricción de fotos</p>
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-[#111113] border border-white/[0.08] rounded-2xl p-3">
              <button
                onClick={() => onChange({ ...data, maxPhotos: Math.max(5, data.maxPhotos - 5) })}
                className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.10] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-bold tracking-tight">{data.maxPhotos}</span>
                <p className="text-[#f4efe7]/35 text-xs mt-0.5">fotos</p>
              </div>
              <button
                onClick={() => onChange({ ...data, maxPhotos: Math.min(30, data.maxPhotos + 5) })}
                className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.10] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
          <p className="text-[#f4efe7]/25 text-xs mt-2">Recomendamos 20 — las mejores fotos, no todas.</p>
        </div>

        {/* Moments */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-3">Momentos del evento</label>
          <div className="flex flex-wrap gap-2">
            {MOMENT_OPTIONS.map(m => (
              <button
                key={m.val}
                onClick={() => toggleMoment(m.val)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  data.moments.includes(m.val)
                    ? "bg-[#d9b98a]/10 border-[#d9b98a]/40 text-[#d9b98a]"
                    : "bg-transparent border-white/[0.09] text-[#f4efe7]/50"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prize */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-3">Premio para la mejor foto</label>
          <Input
            value={data.prize}
            onChange={e => onChange({ ...data, prize: e.target.value })}
            placeholder="Ej: Botella de champagne"
            className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40"
          />
          <p className="text-[#f4efe7]/25 text-xs mt-2">El ganador lo decide la votación de los invitados.</p>
        </div>

        {/* Voting */}
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-3">¿Quién puede votar?</label>
          <div className="flex gap-2">
            {(["guests", "anyone"] as const).map(v => (
              <button
                key={v}
                onClick={() => onChange({ ...data, votingOpen: v })}
                className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                  data.votingOpen === v
                    ? "bg-[#d9b98a]/10 border-[#d9b98a]/40 text-[#d9b98a]"
                    : "bg-transparent border-white/[0.09] text-[#f4efe7]/50"
                }`}
              >
                {v === "guests" ? "Solo invitados" : "Cualquiera con link"}
              </button>
            ))}
          </div>
        </div>

        {/* Sharing toggle */}
        <button
          onClick={() => onChange({ ...data, allowSharing: !data.allowSharing })}
          className="w-full flex items-center justify-between bg-[#111113] border border-white/[0.08] rounded-2xl px-4 py-4"
        >
          <div className="text-left">
            <p className="text-sm font-semibold">Permitir compartir fotos</p>
            <p className="text-[#f4efe7]/35 text-xs mt-0.5">Los invitados pueden compartir al álbum</p>
          </div>
          <div className={`w-11 h-6 rounded-full relative transition-colors ${data.allowSharing ? "bg-[#d9b98a]" : "bg-white/[0.10]"}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${data.allowSharing ? "right-0.5" : "left-0.5"}`} />
          </div>
        </button>
      </div>

      <div className="px-6 pt-6 pb-10 space-y-3">
        <Button onClick={onNext} className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]">
          Siguiente →
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3 flex items-center justify-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    </div>
  );
}
