"use client";
import { Button } from "@/components/ui/button";

const ACTIVITY = [
  { init: "M", name: "María García", action: "subió 3 fotos", detail: "Mesa 4", time: "hace 1m" },
  { init: "R", name: "Rodrigo M.", action: "se unió al evento", detail: "", time: "hace 3m" },
  { init: "L", name: "Lucía P.", action: "subió 5 fotos", detail: "Mesa 7", time: "hace 5m" },
  { init: "C", name: "Camila V.", action: "subió 2 fotos", detail: "Mesa 2", time: "hace 8m" },
  { init: "D", name: "Diego N.", action: "subió 4 fotos", detail: "Mesa 1", time: "hace 12m" },
];

interface OrgDashboardProps {
  eventName: string;
  onCurate: () => void;
}

export default function OrgDashboard({ eventName, onCurate }: OrgDashboardProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-12 pb-5 bg-gradient-to-b from-[#d9b98a]/[0.05] to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">En curso</span>
          </div>
          <span className="text-[#f4efe7]/30 text-xs">Hoy · 14 nov</span>
        </div>
        <h2 className="font-serif italic text-3xl font-light mb-1">{eventName}</h2>
        <p className="text-[#f4efe7]/40 text-sm">Casa Hacienda Mamita · Lima, Perú</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 px-5 mb-5">
        {[{ n: "287", l: "Fotos" }, { n: "34", l: "Personas" }, { n: "12", l: "Mesas" }].map((s, i) => (
          <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 text-center">
            <p className="text-xl font-bold tracking-tight">{s.n}</p>
            <p className="text-[10px] text-[#f4efe7]/35 mt-1 uppercase tracking-wider">{s.l}</p>
          </div>
        ))}
      </div>

      {/* QR card */}
      <div className="mx-5 bg-[#111113] border border-white/[0.06] rounded-2xl p-5 mb-5">
        <p className="text-[11px] uppercase tracking-widest text-[#f4efe7]/30 mb-4 text-center">Código QR del evento</p>
        <div className="flex justify-center mb-4">
          <div className="w-36 h-36 bg-white rounded-xl flex items-center justify-center p-2.5">
            <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="41" height="41" fill="white"/>
              <rect x="1" y="1" width="7" height="7" fill="black"/>
              <rect x="2" y="2" width="5" height="5" fill="white"/>
              <rect x="3" y="3" width="3" height="3" fill="black"/>
              <rect x="33" y="1" width="7" height="7" fill="black"/>
              <rect x="34" y="2" width="5" height="5" fill="white"/>
              <rect x="35" y="3" width="3" height="3" fill="black"/>
              <rect x="1" y="33" width="7" height="7" fill="black"/>
              <rect x="2" y="34" width="5" height="5" fill="white"/>
              <rect x="3" y="35" width="3" height="3" fill="black"/>
              <rect x="9" y="1" width="2" height="1" fill="black"/>
              <rect x="13" y="1" width="3" height="1" fill="black"/>
              <rect x="18" y="1" width="2" height="1" fill="black"/>
              <rect x="22" y="1" width="4" height="1" fill="black"/>
              <rect x="9" y="9" width="3" height="3" fill="black"/>
              <rect x="14" y="9" width="2" height="1" fill="black"/>
              <rect x="18" y="9" width="3" height="1" fill="black"/>
              <rect x="23" y="9" width="4" height="1" fill="black"/>
              <rect x="29" y="9" width="3" height="1" fill="black"/>
              <rect x="35" y="9" width="4" height="1" fill="black"/>
              <rect x="9" y="19" width="5" height="5" fill="black"/>
              <rect x="10" y="20" width="3" height="3" fill="white"/>
              <rect x="16" y="19" width="2" height="1" fill="black"/>
              <rect x="20" y="19" width="3" height="2" fill="black"/>
              <rect x="25" y="19" width="4" height="1" fill="black"/>
              <rect x="31" y="19" width="2" height="3" fill="black"/>
              <rect x="35" y="20" width="4" height="2" fill="black"/>
              <rect x="33" y="33" width="7" height="7" fill="black"/>
              <rect x="34" y="34" width="5" height="5" fill="white"/>
              <rect x="35" y="35" width="3" height="3" fill="black"/>
              <rect x="9" y="33" width="2" height="2" fill="black"/>
              <rect x="13" y="33" width="3" height="1" fill="black"/>
              <rect x="18" y="33" width="4" height="1" fill="black"/>
              <rect x="24" y="33" width="2" height="2" fill="black"/>
              <rect x="28" y="33" width="3" height="1" fill="black"/>
              <rect x="9" y="36" width="4" height="2" fill="black"/>
              <rect x="15" y="37" width="2" height="2" fill="black"/>
              <rect x="19" y="36" width="3" height="1" fill="black"/>
              <rect x="24" y="36" width="2" height="3" fill="black"/>
              <rect x="29" y="37" width="3" height="2" fill="black"/>
            </svg>
          </div>
        </div>
        <p className="text-[#d9b98a] text-sm font-semibold text-center mb-1">lodeayer.com/boda/ana-carlos-2025</p>
        <p className="text-[#f4efe7]/30 text-xs text-center mb-4">Comparte este link o imprime el QR para cada mesa</p>
        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard?.writeText("lodeayer.com/boda/ana-carlos-2025").catch(() => {})}
            className="flex-1 border border-white/[0.09] rounded-xl py-2.5 text-sm text-[#f4efe7]/50 hover:text-[#f4efe7]/80 transition-colors"
          >
            Copiar link
          </button>
          <button
            onClick={() => alert("📥 QR descargado")}
            className="flex-1 bg-[#d9b98a] text-[#0b0b0c] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#c9a070] transition-colors"
          >
            Descargar QR
          </button>
        </div>
      </div>

      {/* Activity */}
      <div className="px-5 mb-5">
        <p className="text-[11px] uppercase tracking-widest text-[#f4efe7]/30 mb-3">Actividad en vivo</p>
        <div className="space-y-0 bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
          {ACTIVITY.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < ACTIVITY.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
              <div className="w-8 h-8 rounded-full bg-[#d9b98a]/15 border border-[#d9b98a]/25 flex items-center justify-center text-[#d9b98a] text-xs font-bold shrink-0">
                {a.init}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  <span className="font-semibold">{a.name}</span>
                  {" "}<span className="text-[#f4efe7]/50">{a.action}</span>
                  {a.detail && <span className="text-[#f4efe7]/30"> · {a.detail}</span>}
                </p>
              </div>
              <span className="text-[10px] text-[#f4efe7]/25 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revelado + CTA */}
      <div className="px-5 pb-10 space-y-3">
        <div className="bg-[#d9b98a]/[0.06] border border-[#d9b98a]/15 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[#d9b98a] text-sm font-semibold">Revelado programado</p>
            <p className="text-[#f4efe7]/35 text-xs mt-0.5">Mañana a las 9:00 am</p>
          </div>
          <span className="text-xl">🎞️</span>
        </div>
        <Button onClick={onCurate} className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]">
          🖼️ Curar fotos para el álbum
        </Button>
      </div>
    </div>
  );
}
