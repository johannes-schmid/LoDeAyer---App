"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CEREMONY = [
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Rodrigo M.", votes: 23, top: true },
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Lucía P.", votes: 17, top: true },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Camila V.", votes: 14, top: true },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Tú", votes: 9 },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Martín O.", votes: 5 },
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Valeria S.", votes: 3 },
];
const PARTY = [
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Sofía R.", votes: 11, top: false },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Diego N.", votes: 8, top: false },
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Tú", votes: 6, top: false },
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Ana B.", votes: 4, top: false },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Carlos F.", votes: 2, top: false },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Elena M.", votes: 1, top: false },
];

interface RevealScreenProps {
  onBack: () => void;
}

function PhotoGrid({ photos }: { photos: typeof CEREMONY }) {
  return (
    <div className="grid grid-cols-3 gap-[3px] px-5">
      {photos.map((p, i) => (
        <div key={i} className={`relative aspect-square overflow-hidden rounded-xl ${p.top ? "ring-2 ring-[#d9b98a]/40" : ""}`}>
          <img src={p.src} alt={p.author} className="w-full h-full object-cover block" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-1.5 pb-1.5 flex items-end justify-between">
            <span className="text-[8px] font-semibold text-[#f4efe7]/75 leading-tight max-w-[60%] truncate">{p.author}</span>
            <span className="text-[9px] font-bold text-[#d9b98a] flex items-center gap-0.5">♥ {p.votes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RevealScreen({ onBack }: RevealScreenProps) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Hero */}
      <div className="px-5 pt-8 pb-5 bg-gradient-to-b from-[#d9b98a]/[0.05] to-transparent shrink-0">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-green-400 text-[11px] font-semibold">🎞️ El Revelado · 9:00 am</span>
        </div>
        <h2 className="font-serif italic text-3xl font-light mb-1 leading-tight">Boda de Ana &amp; Carlos</h2>
        <p className="text-[#f4efe7]/40 text-sm">Sábado 14 de noviembre · Lima, Perú</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[{ n: "312", l: "Fotos" }, { n: "38", l: "Personas" }, { n: "94", l: "Votos" }].map((s, i) => (
            <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-xl py-3 text-center">
              <p className="text-lg font-bold tracking-tight">{s.n}</p>
              <p className="text-[10px] text-[#f4efe7]/35 mt-1 uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Winner */}
      <div className="relative mx-5 rounded-2xl overflow-hidden border-2 border-[#d9b98a]/40 shrink-0 mb-1">
        <img
          src="https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=500&w=600"
          alt="Ganador"
          className="w-full h-52 object-cover block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/95 via-[#0b0b0c]/20 to-transparent" />
        <div className="absolute top-3 right-3 bg-[#d9b98a] text-[#0b0b0c] text-[10px] font-black rounded-full px-3 py-1 tracking-wide">
          🏆 PREMIO
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-2xl mb-1">👑</div>
          <p className="font-serif italic text-xl">Foto de Rodrigo M.</p>
          <p className="text-[#d9b98a] text-xs font-semibold mt-1">23 votos · Foto más popular</p>
        </div>
      </div>

      <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest px-5 pt-5 pb-3 shrink-0">🥂 La ceremonia</p>
      <PhotoGrid photos={CEREMONY} />

      <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest px-5 pt-5 pb-3 shrink-0">🎶 El baile</p>
      <PhotoGrid photos={PARTY} />

      <div className="px-5 pt-5 pb-10 space-y-3 shrink-0">
        <Button
          onClick={() => setDownloaded(true)}
          className={`w-full h-14 rounded-2xl font-semibold ${downloaded ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#c9a070]"}`}
        >
          {downloaded ? "✓ Álbum en camino a tu WhatsApp" : "📥 Descargar álbum completo"}
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-2">← Volver a votar</button>
      </div>
    </div>
  );
}
