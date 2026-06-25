import { Button } from "@/components/ui/button";
import { CheckCircle, Sun } from "lucide-react";

const TOTAL_SHOTS = 20;
const USED_SHOTS = 19;

interface SuccessScreenProps {
  name: string;
  uploadedPhotos: number;
  onContinue: () => void;
  onVote: () => void;
}

export default function SuccessScreen({ uploadedPhotos, onContinue, onVote }: SuccessScreenProps) {
  const filled = USED_SHOTS + uploadedPhotos;
  const remaining = Math.max(0, TOTAL_SHOTS - filled);

  return (
    <div className="flex flex-col h-full px-6 py-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-7">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>

        <p className="text-[11px] uppercase tracking-[0.12em] text-[#8a8a8a] mb-2">
          Listo
        </p>
        <h2 className="font-serif italic text-3xl font-light text-[#f4efe7] leading-tight mb-4">
          Foto subida
        </h2>

        <p className="font-serif italic text-[#8a8a8a] text-base leading-relaxed max-w-xs mb-2">
          Queda sellada y solo la veran Ana &amp; Carlos hasta que decidan publicar el album.
        </p>
        <p className="text-[#8a8a8a] text-xs max-w-xs mb-8">
          Nadie mas la ve hasta entonces.
        </p>

        <div className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl p-5 w-full max-w-xs mb-6">
          <p className="text-[#d9b98a] text-4xl font-bold tabular-nums mb-1">{remaining}</p>
          <p className="text-[#8a8a8a] text-xs mb-4">disparos restantes en tu carrete de {TOTAL_SHOTS}</p>
          <div className="flex gap-[2px]">
            {[...Array(TOTAL_SHOTS)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-full ${i < filled ? "bg-[#d9b98a]" : "bg-white/[0.06]"}`}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full max-w-xs h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90 mb-4"
        >
          Seguir subiendo fotos
        </Button>

        <div className="w-full max-w-xs bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#d9b98a]/10 flex items-center justify-center shrink-0">
            <Sun className="w-4 h-4 text-[#d9b98a]" />
          </div>
          <div className="text-left">
            <p className="text-[#d9b98a] text-xs font-medium">Manana a las 9:00 am te enviamos el album por WhatsApp</p>
          </div>
        </div>

        <button
          onClick={onVote}
          className="text-[#8a8a8a] text-sm py-2 hover:text-[#f4efe7] transition-colors"
        >
          Ver votacion &amp; album (demo)
        </button>
      </div>
    </div>
  );
}
