import { Button } from "@/components/ui/button";
import { ArrowRight, Film } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-shrink-0 h-[55%]">
        <img
          src="https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=900&w=600"
          alt="Boda"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c]/30 via-transparent to-[#0b0b0c]" />
        <div className="absolute top-5 left-0 right-0 flex justify-center">
          <span className="bg-[#0b0b0c]/60 backdrop-blur-md border border-white/[0.10] px-4 py-1.5 rounded-full font-serif italic text-[#d9b98a] text-sm">
            LoDeAyer
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-5 pb-8 bg-[#0b0b0c]">
        <div className="text-center mb-1">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#8a8a8a] mb-1">
            Boda de
          </p>
          <h2 className="font-serif italic text-3xl font-light leading-tight text-[#f4efe7]">
            Ana &amp; Carlos
          </h2>
        </div>
        <p className="text-[#8a8a8a] text-xs text-center mt-1 mb-6">
          Lima &middot; 21 de Junio, 2026
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: "287", label: "Fotos" },
            { val: "34", label: "Personas" },
            { val: "9h", label: "Revelado" },
          ].map((s, i) => (
            <div key={i} className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold tabular-nums text-[#d9b98a]">{s.val}</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#8a8a8a] mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 mb-6 w-full">
          <Film className="w-3.5 h-3.5 text-[#d9b98a]/60 shrink-0" />
          <div className="flex gap-[2px] flex-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-full ${i < 14 ? "bg-[#d9b98a]" : "bg-white/[0.06]"}`}
              />
            ))}
          </div>
          <span className="text-[#8a8a8a] text-[11px] shrink-0">20 disparos</span>
        </div>

        <div className="flex-1" />

        <Button
          onClick={onNext}
          className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90 flex items-center justify-center gap-2"
        >
          Unirme al evento <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
