"use client";
import { useEffect, useState } from "react";

interface ScanScreenProps {
  photoSrc: string;
  onApproved: () => void;
}

const CHECKS = [
  { id: "blur", label: "Nitidez", okText: "Nítida" },
  { id: "exposure", label: "Exposición", okText: "Correcta" },
  { id: "content", label: "Contenido apropiado", okText: "Aprobada" },
];

export default function ScanScreen({ photoSrc, onApproved }: ScanScreenProps) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setDoneCount(0);
    const timers = CHECKS.map((_, i) =>
      setTimeout(() => setDoneCount(i + 1), (i + 1) * 900)
    );
    const finish = setTimeout(onApproved, CHECKS.length * 900 + 700);
    return () => { timers.forEach(clearTimeout); clearTimeout(finish); };
  }, [photoSrc, onApproved]);

  return (
    <div className="flex flex-col h-full items-center justify-center px-6 py-10 text-center">
      {/* Photo with scan overlay */}
      <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-white/[0.10] mb-8 shrink-0">
        <img src={photoSrc} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0b0b0c]/40" />
        {/* Scan line */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d9b98a] to-transparent animate-scan-line" />
        {/* Corners */}
        {[["top-2 left-2 border-t-2 border-l-2",""],["top-2 right-2 border-t-2 border-r-2",""],["bottom-2 left-2 border-b-2 border-l-2",""],["bottom-2 right-2 border-b-2 border-r-2",""]].map(([cls], i) => (
          <div key={i} className={`absolute w-5 h-5 border-[#d9b98a]/70 ${cls}`} />
        ))}
      </div>

      <p className="text-[#f4efe7]/40 text-[11px] uppercase tracking-widest mb-2">IA verificando calidad</p>
      <h2 className="text-xl font-bold tracking-tight mb-7">
        {doneCount === CHECKS.length ? "✓ Foto aprobada" : "Analizando tu foto…"}
      </h2>

      <div className="w-full space-y-3">
        {CHECKS.map((c, i) => {
          const done = i < doneCount;
          const active = i === doneCount;
          return (
            <div
              key={c.id}
              className="flex items-center gap-3 bg-[#111113] border border-white/[0.06] rounded-xl px-4 py-3 text-left transition-all duration-300"
            >
              <span className="text-base w-5 text-center shrink-0">
                {done ? "✅" : active ? "⏳" : "○"}
              </span>
              <span className="text-sm font-medium flex-1">{c.label}</span>
              <span className={`text-xs transition-colors duration-300 ${done ? "text-green-400" : "text-[#f4efe7]/30"}`}>
                {done ? `✓ ${c.okText}` : active ? "Verificando…" : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
