"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PrizeScreenProps {
  prize: string;
  onBack: () => void;
}

export default function PrizeScreen({ prize, onBack }: PrizeScreenProps) {
  const [notified, setNotified] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-[11px] uppercase tracking-widest text-[#f4efe7]/30 mb-6">Boda de Ana &amp; Carlos · Ganador</p>

        {/* Photo */}
        <div className="relative mb-6">
          <img
            src="https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=500&w=400"
            alt="Ganador"
            className="w-48 h-56 object-cover rounded-2xl border-[3px] border-[#d9b98a]/50 shadow-2xl"
          />
        </div>

        <div className="w-6 h-6 rounded-full bg-[#d9b98a] mb-3" />
        <h2 className="text-2xl font-bold tracking-tight mb-1">Rodrigo Mendoza</h2>
        <p className="text-[#f4efe7]/40 text-sm mb-6">La foto más votada de la noche</p>

        <div className="w-full bg-[#d9b98a]/[0.07] border border-[#d9b98a]/25 rounded-2xl p-5 flex items-center gap-4 text-left mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#d9b98a]/20 border border-[#d9b98a]/30 flex items-center justify-center shrink-0">
            <span className="text-[#d9b98a] font-bold text-sm">1</span>
          </div>
          <div>
            <p className="font-bold text-base">{prize || "Botella de champagne Moët"}</p>
            <p className="text-[#f4efe7]/40 text-sm mt-0.5">Premio elegido por Ana &amp; Carlos</p>
            <p className="text-[#d9b98a] text-xs font-semibold mt-1.5">23 votos · 68% de participación</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3">
        <Button
          onClick={() => setNotified(true)}
          className={`w-full h-14 rounded-2xl font-semibold transition-all ${
            notified
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#c9a070]"
          }`}
        >
          {notified ? "Mensaje enviado a Rodrigo" : "Notificar ganador por WhatsApp"}
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3">← Volver al álbum</button>
      </div>
    </div>
  );
}
