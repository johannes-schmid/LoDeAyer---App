"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const VOTE_PHOTOS = [
  { id: 1, src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Rodrigo M.", votes: 23 },
  { id: 2, src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Lucia P.", votes: 17 },
  { id: 3, src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Camila V.", votes: 14 },
  { id: 4, src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Tu", votes: 9 },
  { id: 5, src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", name: "Martin O.", votes: 8 },
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
      <div className="px-6 pt-8 pb-5 shrink-0">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#8a8a8a] mb-2">
          Boda de Ana &amp; Carlos
        </p>
        <h2 className="font-serif italic text-3xl font-light text-[#f4efe7] leading-tight mb-2">
          La mejor foto
        </h2>
        <p className="text-[#8a8a8a] text-sm mb-4">
          Toca la foto que mas te gusto de la noche
        </p>
        <div className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-2.5 inline-flex items-center gap-2">
          <span className="text-[#d9b98a] text-xs font-medium">Premio: Botella de champagne</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pb-4 shrink-0">
        {VOTE_PHOTOS.map((p, i) => {
          const voted = myVote === p.id;
          const count = p.votes + (voted ? 1 : 0);
          return (
            <button
              key={p.id}
              onClick={() => setMyVote(voted ? null : p.id)}
              className={`relative rounded-2xl overflow-hidden transition-all duration-200 text-left ${
                voted ? "ring-2 ring-[#d9b98a]" : "ring-1 ring-white/[0.08]"
              }`}
            >
              {i === 0 && (
                <div className="absolute top-2 right-2 z-10 bg-[#d9b98a]/90 text-[#0b0b0c] text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  #1
                </div>
              )}
              <img src={p.src} alt={p.name} className="w-full aspect-square object-cover block" loading="lazy" />
              <div className="bg-[#141416] px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-medium text-[#f4efe7] truncate">{p.name}</span>
                <span className={`text-xs font-bold tabular-nums ${voted ? "text-[#d9b98a]" : "text-[#8a8a8a]"}`}>
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-5 pb-10 space-y-3 shrink-0">
        <p className="text-[#8a8a8a] text-xs text-center">El ganador se anuncia a las 9:00 am con el album</p>
        <Button
          onClick={onSeeReveal}
          className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90"
        >
          Ver el album del revelado
        </Button>
        <button
          onClick={onBack}
          className="w-full text-[#8a8a8a] text-sm py-3 hover:text-[#f4efe7] transition-colors"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
