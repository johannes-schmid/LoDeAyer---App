"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

export interface EventInfo {
  partner1: string;
  partner2: string;
  date: string;
  revealTime: string;
  venue: string;
  city: string;
}

interface CreateStep1Props {
  data: EventInfo;
  onChange: (d: EventInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

function StepBar({ active }: { active: number }) {
  return (
    <div className="flex gap-1.5 px-6 pt-5 mb-6">
      {[0, 1, 2].map(i => (
        <div key={i} className={`flex-1 h-[3px] rounded-full transition-all ${i < active ? "bg-[#d9b98a]" : i === active ? "bg-[#d9b98a]/40" : "bg-white/[0.08]"}`} />
      ))}
    </div>
  );
}

export { StepBar };

export default function CreateStep1({ data, onChange, onNext, onBack }: CreateStep1Props) {
  const set = (k: keyof EventInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, [k]: e.target.value });

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <StepBar active={0} />
      <div className="px-6 mb-6">
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Paso 1 de 3</p>
        <h2 className="text-2xl font-bold tracking-tight">Cuéntanos de<br/>tu evento</h2>
      </div>

      <div className="px-6 space-y-4 flex-1">
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-2">Novio/a 1</label>
          <Input value={data.partner1} onChange={set("partner1")} placeholder="Ej: Ana"
            className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40" />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-2">Novio/a 2</label>
          <Input value={data.partner2} onChange={set("partner2")} placeholder="Ej: Carlos"
            className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-2">Fecha</label>
            <Input type="date" value={data.date} onChange={set("date")}
              className="bg-[#111113] border-white/[0.08] text-[#f4efe7] h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-2">Hora revelado</label>
            <Input type="time" value={data.revealTime} onChange={set("revealTime")}
              className="bg-[#111113] border-white/[0.08] text-[#f4efe7] h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40" />
          </div>
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-2">Lugar</label>
          <Input value={data.venue} onChange={set("venue")} placeholder="Ej: Casa Hacienda Mamita"
            className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40" />
        </div>
        <div>
          <label className="text-[11px] uppercase tracking-widest text-[#f4efe7]/35 block mb-2">Ciudad</label>
          <Input value={data.city} onChange={set("city")} placeholder="Ej: Lima, Perú"
            className="bg-[#111113] border-white/[0.08] text-[#f4efe7] placeholder:text-[#f4efe7]/20 h-14 rounded-2xl focus-visible:ring-[#d9b98a]/30 focus-visible:border-[#d9b98a]/40" />
        </div>
      </div>

      <div className="px-6 pt-6 pb-10 space-y-3">
        <Button
          onClick={onNext}
          disabled={!data.partner1 || !data.partner2}
          className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070] disabled:opacity-30"
        >
          Siguiente →
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3 flex items-center justify-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    </div>
  );
}
