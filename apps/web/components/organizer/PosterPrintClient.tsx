"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface PosterPrintClientProps {
  guestUrl: string;
  partner1: string;
  partner2: string;
  bannerUrl?: string | null;
}

export default function PosterPrintClient({ guestUrl, partner1, partner2, bannerUrl }: PosterPrintClientProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(guestUrl, { width: 800, margin: 1 }).then(setQrDataUrl).catch(() => {});
  }, [guestUrl]);

  useEffect(() => {
    if (qrDataUrl) {
      const t = setTimeout(() => window.print(), 300);
      return () => clearTimeout(t);
    }
  }, [qrDataUrl]);

  return (
    <div className="poster-page relative min-h-screen w-full overflow-hidden bg-[#0b0b0c] text-white flex flex-col items-center justify-end">
      {bannerUrl ? (
        <img src={bannerUrl} alt="" className="poster-bg absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="poster-bg absolute inset-0 bg-gradient-warm" />
      )}
      <div className="poster-bg absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/55 to-[#0b0b0c]/10" />

      <div className="relative z-10 flex flex-col items-center px-8 pt-28 pb-14 text-center w-full">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">Boda de</p>
        <h1 className="font-serif italic text-4xl md:text-5xl mb-10 text-gradient-champagne">
          {partner1} &amp; {partner2}
        </h1>

        <div className="bg-white rounded-[2rem] p-7 shadow-2xl shadow-black/50 flex flex-col items-center gap-4 w-full max-w-xs">
          <p className="text-[#0b0b0c] text-sm font-semibold tracking-tight">Escanea para subir tus fotos</p>
          <div className="w-52 h-52 flex items-center justify-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR del evento" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-black/5 rounded-xl animate-pulse" />
            )}
          </div>
          <p className="text-xs text-[#8a8a8a] break-all">{guestUrl}</p>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="poster-no-print fixed bottom-6 rounded-full bg-white text-[#0b0b0c] px-6 py-3 text-sm font-medium shadow-xl"
      >
        Imprimir póster
      </button>

      <style>{`
        @media print {
          .poster-no-print { display: none; }
          .poster-page { padding: 0; }
          .poster-bg {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
