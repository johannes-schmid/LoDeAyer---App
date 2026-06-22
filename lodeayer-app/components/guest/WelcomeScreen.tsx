import { Button } from "@/components/ui/button";
import { ArrowRight, Film } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Hero image */}
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

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-4 pb-8 bg-[#0b0b0c]">
        <h1 className="font-serif italic text-[1.65rem] text-[#f4efe7] text-center leading-tight mb-1">
          Boda de Ana & Carlos
        </h1>
        <p className="text-[#f4efe7]/35 text-xs text-center mb-5">Lima · 21 de Junio, 2026</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: "287", label: "fotos" },
            { val: "34", label: "personas" },
            { val: "9h", label: "revelado" },
          ].map((s, i) => (
            <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-3 text-center">
              <p className="text-[#d9b98a] font-semibold text-lg leading-none">{s.val}</p>
              <p className="text-[#f4efe7]/35 text-[10px] mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Carrete pill */}
        <div className="flex items-center gap-2.5 bg-[#111113] border border-white/[0.06] rounded-full px-4 py-2.5 mb-5 self-center">
          <Film className="w-3.5 h-3.5 text-[#d9b98a]/60" />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? "bg-[#d9b98a]" : "bg-white/15"}`} />
            ))}
          </div>
          <span className="text-[#f4efe7]/50 text-xs">20 disparos · carrete</span>
        </div>

        <div className="flex-1" />

        <Button
          onClick={onNext}
          className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl text-base hover:bg-[#c9a070] flex items-center justify-center gap-2"
        >
          Unirme al evento <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
