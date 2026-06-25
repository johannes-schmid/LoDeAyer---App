"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const AVATAR_COLORS = [
  "from-rose-400 to-pink-600",
  "from-sky-400 to-blue-600",
  "from-violet-400 to-purple-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-fuchsia-400 to-pink-500",
  "from-cyan-400 to-sky-600",
  "from-lime-400 to-green-600",
];

const GUESTS = [
  { init: "M", name: "María G.", photos: 3, photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "R", name: "Rodrigo M.", photos: 5, photo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "L", name: "Lucía P.", photos: 7, photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "C", name: "Camila V.", photos: 2, photo: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "D", name: "Diego N.", photos: 4, photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "S", name: "Sofía R.", photos: 6, photo: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "V", name: "Valeria S.", photos: 3, photo: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { init: "Ma", name: "Martín O.", photos: 1, photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
];

const ACTIVITY = [
  { guestIdx: 0, action: "subió 3 fotos", detail: "Mesa 4", time: "hace 1m",
    thumb: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { guestIdx: 1, action: "se unió al evento", detail: "", time: "hace 3m", thumb: null },
  { guestIdx: 2, action: "subió 5 fotos", detail: "Mesa 7", time: "hace 5m",
    thumb: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { guestIdx: 3, action: "subió 2 fotos", detail: "Mesa 2", time: "hace 8m",
    thumb: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { guestIdx: 4, action: "subió 4 fotos", detail: "Mesa 1", time: "hace 12m",
    thumb: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
  { guestIdx: 5, action: "subió 6 fotos", detail: "Mesa 5", time: "hace 18m",
    thumb: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=120&w=120" },
];

const ALBUM_PHOTOS = [
  { src: "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&h=500&w=400", guestIdx: 1, moment: "Ceremonia", time: "hace 1h" },
  { src: "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=500&w=400", guestIdx: 2, moment: "Cocktail", time: "hace 2h" },
  { src: "https://images.pexels.com/photos/15964962/pexels-photo-15964962.jpeg?auto=compress&cs=tinysrgb&h=500&w=400", guestIdx: 3, moment: "Baile", time: "hace 2h" },
  { src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&h=500&w=400", guestIdx: 4, moment: "Cena", time: "hace 3h" },
  { src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&h=500&w=400", guestIdx: 5, moment: "Baile", time: "hace 3h" },
  { src: "https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg?auto=compress&cs=tinysrgb&h=500&w=400", guestIdx: 0, moment: "Ceremonia", time: "hace 4h" },
];

function Avatar({ idx, size = "md" }: { idx: number; size?: "sm" | "md" | "lg" }) {
  const g = GUESTS[idx % GUESTS.length];
  const sz = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-11 h-11" : "w-9 h-9";
  return (
    <div className={`${sz} rounded-full shrink-0 ring-2 ring-[#0b0b0c] overflow-hidden`}>
      <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
    </div>
  );
}

type Tab = "inicio" | "actividad" | "album";

interface OrgDashboardProps {
  eventName: string;
  onCurate: () => void;
}

export default function OrgDashboard({ eventName, onCurate }: OrgDashboardProps) {
  const [tab, setTab] = useState<Tab>("inicio");

  return (
    <div className="flex flex-col h-full bg-[#0b0b0c]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3 shrink-0">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30 mb-0.5">Panel organizador</p>
          <h2 className="font-serif italic text-xl font-light leading-tight">{eventName}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px] font-semibold">En curso</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#111113] border border-white/[0.06] flex items-center justify-center text-[#f4efe7]/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "inicio" && <InicioTab onCurate={onCurate} />}
        {tab === "actividad" && <ActividadTab />}
        {tab === "album" && <AlbumTab onCurate={onCurate} />}
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 bg-[#0d0d0f] border-t border-white/[0.06] flex pb-safe">
        {([
          { key: "inicio", label: "Inicio", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { key: "actividad", label: "Actividad", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
          { key: "album", label: "Álbum", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
        ] as { key: Tab; label: string; icon: React.ReactNode }[]).map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${tab === key ? "text-[#d9b98a]" : "text-[#f4efe7]/25"}`}
          >
            {icon}
            <span className="text-[9px] uppercase tracking-wider font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function InicioTab({ onCurate }: { onCurate: () => void }) {
  return (
    <div className="px-5 pt-2 pb-6 space-y-5">
      {/* Contributors row */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30 mb-3">Invitados que subieron fotos</p>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {GUESTS.map((g, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="relative">
                <div className="w-12 h-12 rounded-full ring-2 ring-[#d9b98a]/50 overflow-hidden">
                  <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                </div>
                {g.photos > 0 && (
                  <div className="absolute -bottom-0.5 -right-0.5 bg-[#d9b98a] text-[#0b0b0c] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {g.photos}
                  </div>
                )}
              </div>
              <p className="text-[9px] text-[#f4efe7]/40 w-11 text-center truncate">{g.name.split(" ")[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {[{ n: "287", l: "Fotos" }, { n: "34", l: "Personas" }, { n: "12", l: "Mesas" }].map((s, i) => (
          <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 text-center">
            <p className="text-xl font-bold tracking-tight">{s.n}</p>
            <p className="text-[10px] text-[#f4efe7]/35 mt-1 uppercase tracking-wider">{s.l}</p>
          </div>
        ))}
      </div>

      {/* QR card */}
      <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5">
        <p className="text-[11px] uppercase tracking-widest text-[#f4efe7]/30 mb-4 text-center">Código QR del evento</p>
        <div className="flex justify-center mb-4">
          <a href="/demo" target="_blank" rel="noopener noreferrer" className="w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2.5 hover:ring-2 hover:ring-[#d9b98a]/60 transition-all">
            <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="41" height="41" fill="white"/>
              <rect x="1" y="1" width="7" height="7" fill="black"/><rect x="2" y="2" width="5" height="5" fill="white"/><rect x="3" y="3" width="3" height="3" fill="black"/>
              <rect x="33" y="1" width="7" height="7" fill="black"/><rect x="34" y="2" width="5" height="5" fill="white"/><rect x="35" y="3" width="3" height="3" fill="black"/>
              <rect x="1" y="33" width="7" height="7" fill="black"/><rect x="2" y="34" width="5" height="5" fill="white"/><rect x="3" y="35" width="3" height="3" fill="black"/>
              <rect x="9" y="1" width="2" height="1" fill="black"/><rect x="13" y="1" width="3" height="1" fill="black"/><rect x="18" y="1" width="2" height="1" fill="black"/>
              <rect x="9" y="9" width="3" height="3" fill="black"/><rect x="14" y="9" width="2" height="1" fill="black"/><rect x="18" y="9" width="3" height="1" fill="black"/>
              <rect x="9" y="19" width="5" height="5" fill="black"/><rect x="10" y="20" width="3" height="3" fill="white"/>
              <rect x="33" y="33" width="7" height="7" fill="black"/><rect x="34" y="34" width="5" height="5" fill="white"/><rect x="35" y="35" width="3" height="3" fill="black"/>
            </svg>
          </a>
        </div>
        <p className="text-[#d9b98a] text-sm font-semibold text-center mb-1">lodeayer.com/boda/ana-carlos-2025</p>
        <p className="text-[#f4efe7]/30 text-xs text-center mb-4">Comparte este link o imprime el QR para cada mesa</p>
        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard?.writeText("lodeayer.com/boda/ana-carlos-2025").catch(() => {})}
            className="flex-1 border border-white/[0.09] rounded-xl py-2.5 text-sm text-[#f4efe7]/50 hover:text-[#f4efe7]/80 transition-colors"
          >Copiar link</button>
          <button
            onClick={() => alert("📥 QR descargado")}
            className="flex-1 bg-[#d9b98a] text-[#0b0b0c] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#c9a070] transition-colors"
          >Descargar QR</button>
        </div>
      </div>

      {/* Revelado */}
      <div className="bg-[#d9b98a]/[0.06] border border-[#d9b98a]/15 rounded-2xl px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[#d9b98a] text-sm font-semibold">Revelado programado</p>
          <p className="text-[#f4efe7]/35 text-xs mt-0.5">Mañana a las 9:00 am</p>
        </div>
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#d9b98a]/60" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3a6 6 0 0 1 6 6c0 4-2 6-2 9H8c0-3-2-5-2-9a6 6 0 0 1 6-6z"/><path d="M9 17v1a3 3 0 0 0 6 0v-1"/></svg>
      </div>

      <WhatsAppReminderCard />

      <Button onClick={onCurate} className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]">
        Curar fotos para el álbum
      </Button>
      <a
        href="/evento/demo"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 border border-white/[0.09] rounded-2xl py-3.5 text-sm text-[#f4efe7]/50 hover:text-[#f4efe7]/80 transition-colors"
      >
        Ver cómo lo ve un invitado →
      </a>
    </div>
  );
}

const PENDING_GUESTS = [
  { name: "Camila V.", photo: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { name: "Diego N.", photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
  { name: "Martín O.", photo: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&h=100&w=100" },
];
const PENDING_COUNT = 16;

function WhatsAppReminderCard() {
  const [preview, setPreview] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setPreview(false);
  };

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25d366]/10 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25d366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.887a.5.5 0 0 0 .609.61l6.101-1.502A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.09-1.392l-.364-.218-3.768.927.966-3.686-.236-.38A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f4efe7]">Recordatorio WhatsApp</p>
              <p className="text-[11px] text-[#f4efe7]/40 mt-0.5">
                {sent ? `Enviado a ${PENDING_COUNT} invitados` : `${PENDING_COUNT} invitados aún sin fotos`}
              </p>
            </div>
          </div>
          {sent ? (
            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1 shrink-0">
              <CheckCheck className="w-3 h-3 text-green-400" />
              <span className="text-green-400 text-[10px] font-semibold">Enviado</span>
            </div>
          ) : (
            <button
              onClick={() => setPreview(v => !v)}
              className="text-[#d9b98a] text-xs font-semibold shrink-0"
            >
              {preview ? "Ocultar" : "Ver mensaje"}
            </button>
          )}
        </div>

        {/* Pending avatars */}
        {!sent && (
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {PENDING_GUESTS.map((g, i) => (
                <div key={i} className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-[#111113]">
                  <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-[#f4efe7]/35 text-[11px]">+ {PENDING_COUNT - 3} más</p>
          </div>
        )}
      </div>

      {/* WhatsApp preview */}
      {preview && !sent && (
        <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-white/[0.06]">
          {/* WA chrome */}
          <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.854L.057 23.887a.5.5 0 0 0 .609.61l6.101-1.502A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.09-1.392l-.364-.218-3.768.927.966-3.686-.236-.38A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </div>
            <div>
              <p className="text-white text-[11px] font-semibold leading-tight">LoDeAyer</p>
              <p className="text-white/60 text-[9px]">en línea</p>
            </div>
          </div>
          {/* WA chat bg */}
          <div className="bg-[#0a1929] px-3 py-3 space-y-2">
            {/* Incoming bubble */}
            <div className="flex justify-start">
              <div className="bg-[#1f2c34] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl max-w-[90%] px-3 py-2 shadow">
                <p className="text-[#f4efe7] text-xs leading-relaxed">
                  Hola Camila, soy Ana del equipo de LoDeAyer.{"\n\n"}
                  <span className="text-white font-medium">Todavía no subiste tus fotos de la boda de Ana &amp; Carlos.</span>{"\n\n"}
                  El revelado es mañana a las 9:00 am — no te pierdas aparecer en el álbum.{"\n\n"}
                  <span className="text-[#25d366] font-medium underline text-[11px]">lodeayer.com/boda/ana-carlos-2025</span>
                </p>
                <div className="flex items-center justify-end gap-1 mt-1.5">
                  <p className="text-[#f4efe7]/30 text-[9px]">9:14 pm</p>
                  <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send button */}
      {!sent && (
        <div className="px-4 pb-4">
          <button
            onClick={handleSend}
            className="w-full bg-[#25d366] text-[#0b0b0c] font-semibold text-sm rounded-xl py-3 hover:bg-[#1fb558] transition-colors"
          >
            Enviar a {PENDING_COUNT} invitados sin fotos
          </button>
        </div>
      )}
    </div>
  );
}

function ActividadTab() {
  return (
    <div className="px-5 pt-3 pb-6">
      <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30 mb-4">Actividad en vivo</p>
      <div className="space-y-4">
        {ACTIVITY.map((a, i) => {
          const g = GUESTS[a.guestIdx];
          return (
            <div key={i} className="flex gap-3">
              <div className="w-9 h-9 rounded-full shrink-0 mt-0.5 overflow-hidden ring-1 ring-white/[0.08]">
                <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm leading-tight">
                    <span className="font-semibold">{g.name}</span>
                    {" "}<span className="text-[#f4efe7]/50">{a.action}</span>
                    {a.detail && <span className="text-[#f4efe7]/30"> · {a.detail}</span>}
                  </p>
                  <span className="text-[10px] text-[#f4efe7]/25 shrink-0 mt-0.5">{a.time}</span>
                </div>
                {a.thumb && (
                  <img src={a.thumb} alt="" className="w-16 h-16 rounded-xl object-cover" loading="lazy" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlbumTab({ onCurate }: { onCurate: () => void }) {
  return (
    <div className="pt-3 pb-6">
      <div className="flex items-center justify-between px-5 mb-4">
        <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30">Fotos recibidas · {ALBUM_PHOTOS.length}</p>
        <button onClick={onCurate} className="text-[#d9b98a] text-xs font-semibold">Curar álbum →</button>
      </div>

      {/* Feed-style list */}
      <div className="space-y-5">
        {ALBUM_PHOTOS.map((p, i) => {
          const g = GUESTS[p.guestIdx];
          return (
            <div key={i}>
              {/* Author row */}
              <div className="flex items-center gap-2.5 px-5 mb-2">
                <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden ring-1 ring-white/[0.08]">
                  <img src={g.photo} alt={g.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold">{g.name}</p>
                  <p className="text-[10px] text-[#f4efe7]/35">{p.moment}</p>
                </div>
                <span className="text-[10px] text-[#f4efe7]/25">{p.time}</span>
              </div>
              {/* Photo */}
              <img src={p.src} alt={g.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
