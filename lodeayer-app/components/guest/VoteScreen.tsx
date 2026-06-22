"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const VOTE_PHOTOS = [
  { id: 1, src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Rodrigo M.", votes: 23 },
  { id: 2, src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Lucía P.", votes: 17 },
  { id: 3, src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Camila V.", votes: 14 },
  { id: 4, src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Tú", votes: 9 },
  { id: 5, src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Martín O.", votes: 8 },
  { id: 6, src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Valeria S.", votes: 6 },
];

interface VoteScreenProps {
  onSeeReveal: () => void;
  onBack: () => void;
}

export default function VoteScreen({ onSeeReveal, onBack }: VoteScreenProps) {
  const [myVote, setMyVote] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-6 pt-8 pb-4 text-center shrink-0">
        <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-2">Boda de Ana &amp; Carlos</p>
        <h2 className="text-2xl font-bold tracking-tight mb-1">¿Cuál es la mejor foto?</h2>
        <p className="text-[#f4efe7]/40 text-sm mb-3">Toca la foto que más te gustó de la noche</p>
        <div className="inline-flex items-center gap-2 bg-[#d9b98a]/[0.08] border border-[#d9b98a]/20 rounded-full px-4 py-1.5">
          <span className="text-[#d9b98a] text-xs font-semibold">🏆 Premio: Botella de champagne</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 py-4 shrink-0">
        {VOTE_PHOTOS.map((p, i) => {
          const voted = myVote === p.id;
          const count = p.votes + (voted ? 1 : 0);
          return (
            <button
              key={p.id}
              onClick={() => setMyVote(voted ? null : p.id)}
              className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-200 text-left ${
                voted ? "border-[#d9b98a]" : "border-transparent"
              }`}
            >
              {i === 0 && (
                <div className="absolute top-2 right-2 z-10 bg-[#0b0b0c]/70 backdrop-blur-sm border border-[#d9b98a]/30 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-[#d9b98a]">
                  👑 #1
                </div>
              )}
              <img src={p.src} alt={p.name} className="w-full aspect-square object-cover block" loading="lazy" />
              <div className="bg-[#111113] px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#f4efe7]/75 truncate">{p.name}</span>
                <span className={`text-xs font-bold flex items-center gap-1 ${voted ? "text-[#d9b98a]" : "text-[#f4efe7]/50"}`}>
                  {voted ? "♥" : "♡"} {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-5 pb-10 space-y-3 shrink-0">
        <p className="text-[#f4efe7]/25 text-xs text-center">El ganador se anuncia a las 9:00 am con el álbum</p>
        <Button
          onClick={onSeeReveal}
          className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]"
        >
          Ver el álbum del revelado →
        </Button>
        <button
          onClick={onBack}
          className="w-full text-[#f4efe7]/40 text-sm py-3"
        >
          ← Volver a subir fotos
        </button>
      </div>
    </div>
  );
}
