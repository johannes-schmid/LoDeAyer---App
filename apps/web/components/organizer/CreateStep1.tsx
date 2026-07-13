"use client";
import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

function StepBar({ steps, active }: { steps: number; active: number }) {
  return (
    <div className="flex gap-1.5 px-6 pt-5 mb-6">
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className={`flex-1 h-[3px] rounded-full transition-all ${i < active ? "bg-[#d9b98a]" : i === active ? "bg-[#d9b98a]/40" : "bg-white/[0.08]"}`} />
      ))}
    </div>
  );
}

export { StepBar };

export default function CreateStep1({ data, onChange, onNext, onBack }: CreateStep1Props) {
  const [calOpen, setCalOpen] = useState(false);

  const set = (k: keyof EventInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, [k]: e.target.value });

  const selectedDate = data.date ? parse(data.date, "yyyy-MM-dd", new Date()) : undefined;
  const validDate = selectedDate && isValid(selectedDate) ? selectedDate : undefined;

  const handleDaySelect = (day: Date | undefined) => {
    onChange({ ...data, date: day ? format(day, "yyyy-MM-dd") : "" });
    setCalOpen(false);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <StepBar steps={4} active={0} />
      <div className="px-6 mb-6">
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Paso 1 de 4</p>
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
            <Popover open={calOpen} onOpenChange={setCalOpen}>
              <PopoverTrigger className="w-full h-14 rounded-2xl bg-[#111113] border border-white/[0.08] px-4 flex items-center justify-between text-sm transition-colors hover:border-white/[0.15] focus:outline-none focus:border-[#d9b98a]/40 focus:ring-[3px] focus:ring-[#d9b98a]/10">
                <span className={validDate ? "text-[#f4efe7]" : "text-[#f4efe7]/20"}>
                  {validDate ? format(validDate, "d MMM yyyy", { locale: es }) : "Elige fecha"}
                </span>
                <CalendarIcon className="w-4 h-4 text-[#f4efe7]/30 shrink-0" />
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-[#111113] border-white/[0.10] rounded-2xl shadow-2xl"
                align="start"
                sideOffset={6}
              >
                <Calendar
                  mode="single"
                  selected={validDate}
                  onSelect={handleDaySelect}
                  locale={es}
                  classNames={{
                    root: "bg-[#111113] text-[#f4efe7] p-3 rounded-2xl",
                    month_caption: "text-[#f4efe7] text-sm font-medium",
                    weekday: "text-[#f4efe7]/30 text-[11px]",
                    outside: "text-[#f4efe7]/15",
                    disabled: "text-[#f4efe7]/15 opacity-40",
                  }}
                />
              </PopoverContent>
            </Popover>
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
