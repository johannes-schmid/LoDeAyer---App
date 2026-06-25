"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ScanScreenProps {
  photoSrc: string;
  onApproved: () => void;
}

const CHECKS = [
  { id: "blur", label: "Nitidez", okText: "Nitida" },
  { id: "exposure", label: "Exposicion", okText: "Correcta" },
  { id: "content", label: "Contenido apropiado", okText: "Aprobada" },
];

export default function ScanScreen({ photoSrc, onApproved }: ScanScreenProps) {
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    setDoneCount(0);
    const timers = CHECKS.map((_, i) =>
      setTimeout(() => setDoneCount(i + 1), (i + 1) * 900)
    );
    return () => { timers.forEach(clearTimeout); };
  }, [photoSrc]);

  return (
    <div className="flex flex-col h-full items-center justify-center px-6 py-10 text-center">
      <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-white/[0.08] mb-8 shrink-0">
        <img src={photoSrc} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0b0b0c]/40" />
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d9b98a] to-transparent animate-scan-line" />
        <svg className="absolute top-2 left-2 w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M0 5V0h5" stroke="#d9b98ab3" strokeWidth="1.5" />
        </svg>
        <svg className="absolute top-2 right-2 w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M20 5V0h-5" stroke="#d9b98ab3" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-2 left-2 w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M0 15v5h5" stroke="#d9b98ab3" strokeWidth="1.5" />
        </svg>
        <svg className="absolute bottom-2 right-2 w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M20 15v5h-5" stroke="#d9b98ab3" strokeWidth="1.5" />
        </svg>
      </div>

      <p className="text-[11px] uppercase tracking-[0.12em] text-[#8a8a8a] mb-3">
        IA verificando calidad
      </p>
      <h2 className="font-serif italic text-3xl font-light text-[#f4efe7] leading-tight mb-8">
        {doneCount === CHECKS.length ? "Foto aprobada" : "Analizando tu foto..."}
      </h2>

      <div className="w-full space-y-3">
        {CHECKS.map((c, i) => {
          const done = i < doneCount;
          const active = i === doneCount;
          return (
            <div
              key={c.id}
              className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3 text-left transition-all duration-300"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-green-500 border-green-500"
                    : active
                    ? "border-[#d9b98a]/60"
                    : "border-white/[0.15]"
                }`}
              >
                {done && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d9b98a]/60 animate-pulse" />
                )}
              </div>
              <span className="text-sm font-medium text-[#f4efe7] flex-1">{c.label}</span>
              <span
                className={`text-xs transition-colors duration-300 ${
                  done ? "text-green-400" : active ? "text-[#8a8a8a]" : "text-[#8a8a8a]/40"
                }`}
              >
                {done ? c.okText : active ? "Verificando..." : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {doneCount === CHECKS.length && (
        <Button
          onClick={onApproved}
          className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90 mt-8"
        >
          Continuar
        </Button>
      )}
    </div>
  );
}
