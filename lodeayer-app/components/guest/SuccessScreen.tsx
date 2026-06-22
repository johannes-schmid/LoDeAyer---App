import { Button } from "@/components/ui/button";
import { CheckCircle, Camera, Sun } from "lucide-react";

const TOTAL_SHOTS = 20;
const USED_SHOTS = 13;

interface SuccessScreenProps {
  name: string;
  uploadedPhotos: number;
  onContinue: () => void;
  onVote: () => void;
}

export default function SuccessScreen({ uploadedPhotos, onContinue, onVote }: SuccessScreenProps) {
  const remaining = TOTAL_SHOTS - USED_SHOTS - uploadedPhotos;

  return (
    <div className="flex flex-col h-full px-6 py-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Check circle */}
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-7">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>

        <h2 className="font-serif font-light text-3xl text-[#f4efe7] mb-2.5 tracking-tight">Foto subida</h2>
        <p className="font-serif italic text-[#f4efe7]/45 text-base leading-relaxed max-w-xs mb-8">
          Queda sellada hasta el revelado de mañana. Nadie la ve hasta entonces.
        </p>

        {/* Shots remaining */}
        <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 w-full max-w-xs mb-6">
          <p className="text-[#d9b98a] text-5xl font-serif font-light mb-1 tracking-tight">{Math.max(0, remaining)}</p>
          <p className="text-[#f4efe7]/40 text-xs">disparos restantes en tu carrete de {TOTAL_SHOTS}</p>
          <div className="flex gap-[3px] mt-4">
            {[...Array(TOTAL_SHOTS)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full ${
                  i < USED_SHOTS + uploadedPhotos ? "bg-[#d9b98a]" : "bg-white/[0.08]"
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full max-w-xs bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl text-base hover:bg-[#c9a070] mb-3 flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" /> Seguir subiendo fotos
        </Button>

        {/* WhatsApp reminder */}
        <div className="w-full max-w-xs bg-[#d9b98a]/[0.07] border border-[#d9b98a]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#d9b98a]/10 flex items-center justify-center shrink-0">
            <Sun className="w-4 h-4 text-[#d9b98a]" />
          </div>
          <div className="text-left">
            <p className="text-[#d9b98a] text-xs font-semibold">Mañana a las 9:00 am</p>
            <p className="text-[#f4efe7]/40 text-xs mt-0.5">Revelado · te avisamos por WhatsApp</p>
          </div>
        </div>

        <button
          onClick={onVote}
          className="w-full max-w-xs text-[#f4efe7]/40 text-sm py-2 hover:text-[#f4efe7]/70 transition-colors"
        >
          Ver votación &amp; álbum (demo) →
        </button>
      </div>
    </div>
  );
}
