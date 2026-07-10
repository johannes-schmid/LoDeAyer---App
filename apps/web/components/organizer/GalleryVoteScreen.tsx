"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AVATAR_COLORS = [
  "from-rose-400 to-pink-600",
  "from-sky-400 to-blue-600",
  "from-violet-400 to-purple-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-fuchsia-400 to-pink-500",
];

const PHOTOS = [
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", author: "Rodrigo M.", init: "R", moment: "Ceremonia", votes: 23 },
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", author: "Lucía P.", init: "L", moment: "Cocktail", votes: 17 },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", author: "Camila V.", init: "C", moment: "Baile", votes: 14 },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", author: "Martín O.", init: "Ma", moment: "Cena", votes: 9 },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", author: "Sofía R.", init: "S", moment: "Baile", votes: 8 },
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=400&w=400", author: "Valeria S.", init: "V", moment: "Ceremonia", votes: 6 },
];

const RANKS = ["#1", "#2", "#3"];

interface GalleryVoteScreenProps {
  onSeePrize: () => void;
  onBack: () => void;
}

export default function GalleryVoteScreen({ onSeePrize, onBack }: GalleryVoteScreenProps) {
  const [myVote, setMyVote] = useState<number | null>(null);

  const totalVotes = PHOTOS.reduce((s, p) => s + p.votes, 0) + (myVote !== null ? 1 : 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-10 pb-5 bg-gradient-to-b from-[#d9b98a]/[0.04] to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
            <span className="text-green-400 text-[11px] font-semibold">Álbum publicado</span>
          </div>
          <span className="text-[#f4efe7]/30 text-xs">15 nov · 9:02 am</span>
        </div>
        <h2 className="font-serif italic text-3xl font-light mb-1">Boda de Ana &amp; Carlos</h2>
        <p className="text-[#f4efe7]/40 text-sm mb-4">{PHOTOS.length} fotos en el álbum · Votación abierta</p>

        <div className="flex gap-2">
          <Button onClick={onSeePrize} className="flex-1 bg-[#d9b98a] text-[#0b0b0c] font-semibold rounded-xl h-11 hover:bg-[#c9a070] text-sm">
            Ver ganador
          </Button>
          <button
            onClick={() => alert("Link del álbum copiado")}
            className="px-4 h-11 rounded-xl border border-white/[0.09] bg-[#111113] text-[#f4efe7]/60 text-sm font-medium hover:text-[#f4efe7]/90 transition-colors"
          >
            Compartir
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3">
        <p className="text-[11px] uppercase tracking-widest text-[#f4efe7]/30">Fotos del álbum</p>
        <p className="text-[#d9b98a] text-xs font-semibold">{totalVotes} votos en total</p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        {PHOTOS.map((p, i) => {
          const voted = myVote === i;
          const count = p.votes + (voted ? 1 : 0);
          return (
            <div key={i} className={`rounded-2xl overflow-hidden border-2 transition-all ${i === 0 ? "border-[#d9b98a]/40" : "border-transparent"}`}>
              <div className="relative">
                {i < 3 && (
                  <div className="absolute top-2 left-2 z-10 bg-[#0b0b0c]/70 backdrop-blur-sm border border-[#d9b98a]/25 rounded-full px-2 py-0.5 text-[10px] font-bold text-[#d9b98a]">
                    {RANKS[i]}
                  </div>
                )}
                <img src={p.src} alt={p.author} className="w-full aspect-square object-cover block" loading="lazy" />
              </div>
              <div className="bg-[#111113] px-3 pt-2.5 pb-1 flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center font-bold text-white text-[9px] shrink-0`}>
                  {p.init}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#f4efe7]/80 truncate">{p.author}</p>
                  <p className="text-[10px] text-[#f4efe7]/35">{p.moment}</p>
                </div>
              </div>
              <div className="bg-[#111113] px-3 pb-3 flex items-center justify-between">
                <button
                  onClick={() => setMyVote(voted ? null : i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                    voted
                      ? "bg-[#d9b98a]/10 border-[#d9b98a]/40 text-[#d9b98a]"
                      : "border-white/[0.09] text-[#f4efe7]/50"
                  }`}
                >
                  {voted ? "♥" : "♡"} {count}
                </button>
                <button
                  onClick={() => alert("Foto compartida!")}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/[0.09] text-xs text-[#f4efe7]/40 hover:text-[#f4efe7]/70 transition-colors"
                >
                  ↗ Compartir
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-10">
        <button onClick={onBack} className="w-full text-[#f4efe7]/30 text-sm py-3">← Volver al panel</button>
      </div>
    </div>
  );
}
