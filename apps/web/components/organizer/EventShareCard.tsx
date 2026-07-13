"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import { Check, Copy, Download, MessageCircle, Share2 } from "lucide-react";

interface EventShareCardProps {
  eventId: string;
  guestUrl: string;
  partner1: string;
  partner2: string;
}

export default function EventShareCard({ eventId, guestUrl, partner1, partner2 }: EventShareCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(guestUrl, { width: 512, margin: 1 }).then(setQrDataUrl).catch(() => {});
  }, [guestUrl]);

  function handleCopy() {
    navigator.clipboard?.writeText(guestUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const waMessage = `¡Estás invitado a la boda de ${partner1} & ${partner2}! 📸 Sube tus fotos aquí: ${guestUrl}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-3xl p-5">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 shrink-0 bg-white rounded-xl flex items-center justify-center p-2">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR del evento" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-black/5 rounded-md animate-pulse" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-widest text-[#f4efe7]/30 mb-1">Link para invitados</p>
          <p className="text-[#d9b98a] text-sm font-semibold truncate">{guestUrl.replace(/^https?:\/\//, "")}</p>
          <p className="text-[#f4efe7]/30 text-xs mt-1">Escanea el QR para probarlo tú mismo</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setShareOpen(v => !v)}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#d9b98a]/10 hover:bg-[#d9b98a]/15 transition-colors text-[#d9b98a] text-sm font-semibold"
        >
          <Share2 className="w-4 h-4" /> Compartir
        </button>
        <Link
          href={`/organizer/evento/${eventId}/portada`}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-[#f4efe7]/60 text-sm"
        >
          Editar foto
        </Link>
      </div>

      {shareOpen && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-[#d9b98a]" /> : <Copy className="w-4 h-4 text-[#f4efe7]/60" />}
            <span className="text-[11px] text-[#f4efe7]/50">{copied ? "Copiado" : "Copiar"}</span>
          </button>
          <Link
            href={`/organizer/evento/${eventId}/poster`}
            target="_blank"
            className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
          >
            <Download className="w-4 h-4 text-[#f4efe7]/60" />
            <span className="text-[11px] text-[#f4efe7]/50">QR</span>
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#25d366]/10 hover:bg-[#25d366]/15 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25d366]" />
            <span className="text-[11px] text-[#25d366]">WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
}
