"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ALL_PHOTOS = [
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Rodrigo M.", moment: "ceremonia", sel: true },
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Lucía P.", moment: "ceremonia", sel: true },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Camila V.", moment: "cocktail", sel: true },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Diego N.", moment: "baile", sel: false },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Martín O.", moment: "baile", sel: true },
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Valeria S.", moment: "cena", sel: false },
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Sofía R.", moment: "cena", sel: true },
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Ana B.", moment: "baile", sel: true },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Carlos F.", moment: "cocktail", sel: false },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Elena M.", moment: "cocktail", sel: true },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Pedro A.", moment: "ceremonia", sel: false },
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Tania B.", moment: "baile", sel: true },
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Jorge C.", moment: "cena", sel: true },
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Sara D.", moment: "ceremonia", sel: true },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Luis E.", moment: "cocktail", sel: false },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Marta F.", moment: "baile", sel: true },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Andrés G.", moment: "cena", sel: true },
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=300&w=300", author: "Natalia J.", moment: "cocktail", sel: true },
];

const FILTERS = [
  { val: "all", label: `Todas (${ALL_PHOTOS.length})` },
  { val: "ceremonia", label: "Ceremonia" },
  { val: "cocktail", label: "Cocktail" },
  { val: "baile", label: "Baile" },
  { val: "cena", label: "Cena" },
];

interface CurationScreenProps {
  onPublish: () => void;
  onBack: () => void;
}

export default function CurationScreen({ onPublish, onBack }: CurationScreenProps) {
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(ALL_PHOTOS.map((p, i) => p.sel ? i : -1).filter(i => i >= 0))
  );
  const [filter, setFilter] = useState("all");
  const [consent, setConsent] = useState(false);

  const toggle = (i: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    const filtered = ALL_PHOTOS.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || p.moment === filter);
    const allSel = filtered.every(({ i }) => selected.has(i));
    setSelected(prev => {
      const next = new Set(prev);
      filtered.forEach(({ i }) => allSel ? next.delete(i) : next.add(i));
      return next;
    });
  };

  const visible = ALL_PHOTOS.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || p.moment === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="shrink-0">
        <div className="px-5 pt-10 pb-4 border-b border-white/[0.05]">
          <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Selección de fotos · Revelado</p>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Curar el álbum</h2>
          <p className="text-[#f4efe7]/40 text-sm">Elige las fotos que van al álbum público.</p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05]">
          <span className="text-[#d9b98a] text-sm font-semibold">{selected.size} foto{selected.size !== 1 ? "s" : ""} seleccionada{selected.size !== 1 ? "s" : ""}</span>
          <button onClick={toggleAll} className="text-[#f4efe7]/40 text-xs hover:text-[#f4efe7]/70 transition-colors">
            {visible.every(({ i }) => selected.has(i)) ? "Deseleccionar todas" : "Seleccionar todas"}
          </button>
        </div>

        {/* Filter row */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none border-b border-white/[0.05]">
        {FILTERS.map(f => (
          <button
            key={f.val}
            onClick={() => setFilter(f.val)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 transition-all ${
              filter === f.val
                ? "bg-[#d9b98a]/10 border-[#d9b98a]/40 text-[#d9b98a]"
                : "bg-transparent border-white/[0.09] text-[#f4efe7]/45"
            }`}
          >
            {f.label}
          </button>
        ))}
        </div>
      </div>{/* end sticky header */}

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto">
      {/* Photo grid */}
      <div className="grid grid-cols-3 gap-[3px] px-5 pb-2 pt-2">
        {visible.map(({ p, i }) => {
          const isSel = selected.has(i);
          return (
            <button key={i} onClick={() => toggle(i)} className="relative aspect-square overflow-hidden rounded-xl">
              <img src={p.src} alt={p.author} className="w-full h-full object-cover block" loading="lazy" />
              <div className={`absolute inset-0 transition-colors ${isSel ? "bg-[#d9b98a]/10" : "bg-transparent"}`} />
              <div className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSel ? "bg-[#d9b98a] border-[#d9b98a]" : "border-white/50 bg-transparent"}`}>
                {isSel && <span className="text-[#0b0b0c] text-[9px] font-black">✓</span>}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b0b0c]/80 to-transparent p-1.5">
                <p className="text-[8px] font-semibold text-[#f4efe7]/70 truncate">{p.author}</p>
              </div>
            </button>
          );
        })}
      </div>

      </div>{/* end scrollable area */}

      <div className="px-5 pt-4 pb-10 space-y-3 shrink-0">
        <p className="text-[#f4efe7]/25 text-xs text-center">Las fotos seleccionadas se envían a todos los invitados por WhatsApp a las 9:00 am</p>

        {/* Consent */}
        <button
          onClick={() => setConsent(c => !c)}
          className="w-full flex items-start gap-3 bg-[#111113] border border-white/[0.07] rounded-2xl px-4 py-4 text-left"
        >
          <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${consent ? "bg-[#d9b98a] border-[#d9b98a]" : "border-white/25 bg-transparent"}`}>
            {consent && <span className="text-[#0b0b0c] text-[10px] font-black">✓</span>}
          </div>
          <p className="text-[#f4efe7]/50 text-xs leading-relaxed">
            Confirmo que todos los invitados han dado su <span className="text-[#f4efe7]/80 font-semibold">consentimiento</span> para que sus fotos se incluyan en el álbum compartido.
          </p>
        </button>

        <Button
          onClick={onPublish}
          disabled={selected.size === 0 || !consent}
          className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070] disabled:opacity-30"
        >
          Publicar álbum ({selected.size} fotos)
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3">← Volver al panel</button>
      </div>
    </div>
  );
}
