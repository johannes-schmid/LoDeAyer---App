"use client";
import { useRef } from "react";
import { Camera, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOTAL_SHOTS = 20;
const USED_SHOTS = 19;

const demoPics = [
  "https://images.pexels.com/photos/30505255/pexels-photo-30505255.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
  "https://images.pexels.com/photos/11596048/pexels-photo-11596048.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
  "https://images.pexels.com/photos/10168642/pexels-photo-10168642.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
];

interface CarreteScreenProps {
  name: string;
  uploadedPhotos: string[];
  onPhotoUpload: (dataUrl: string) => void;
  onVote: () => void;
}

export default function CarreteScreen({ name, uploadedPhotos, onPhotoUpload, onVote }: CarreteScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filled = USED_SHOTS + uploadedPhotos.length;
  const remaining = TOTAL_SHOTS - filled;
  const isFull = remaining <= 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) onPhotoUpload(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const allPhotos = [...uploadedPhotos, ...demoPics];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif italic text-[#d9b98a] text-[15px]">Boda de Ana &amp; Carlos</p>
            <p className="text-[#8a8a8a] text-xs mt-0.5">Lima &middot; 21 Jun 2026</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#d9b98a] flex items-center justify-center text-[#0b0b0c] font-semibold text-sm shrink-0">
            {name[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5">
        <div>
          <div className="flex gap-[2px] mb-2">
            {[...Array(TOTAL_SHOTS)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-full transition-colors duration-300 ${
                  i < filled ? "bg-[#d9b98a]" : "bg-white/[0.06]"
                }`}
              />
            ))}
          </div>
          <p className="text-[#8a8a8a] text-[11px] text-right">
            {remaining > 0 ? `${remaining} disparos restantes` : "Carrete lleno"}
          </p>
        </div>

        {isFull ? (
          <div className="flex flex-col items-center text-center pt-6 space-y-6">
            <div className="w-10 h-[3px] bg-[#d9b98a] rounded-full" />
            <div>
              <h3 className="font-serif italic text-2xl font-light text-[#f4efe7] mb-3 leading-tight">
                Tu carrete esta completo
              </h3>
              <p className="text-[#8a8a8a] text-sm leading-relaxed max-w-xs">
                Subiste tus 20 mejores fotos de la noche. Nadie las ve hasta el revelado de manana.
              </p>
            </div>
            <div className="w-full bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#d9b98a]/10 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4 text-[#d9b98a]" />
              </div>
              <p className="text-[#d9b98a] text-xs font-medium text-left">
                Manana a las 9:00 am te enviamos el album por WhatsApp
              </p>
            </div>
            <Button
              onClick={onVote}
              className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90"
            >
              Ver votacion
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3 bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d9b98a] mt-1.5 shrink-0" />
              <p className="text-[#8a8a8a] text-xs leading-relaxed">
                <span className="text-[#d9b98a] font-medium">Sube solo tus mejores 20 fotos de la noche.</span>{" "}
                Menos es mas — las mejores imagenes ganan mas votos en el album final.
              </p>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-white/[0.10] rounded-2xl p-8 text-center hover:border-[#d9b98a]/25 hover:bg-[#d9b98a]/[0.03] transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:border-[#d9b98a]/20 transition-colors duration-200">
                <Camera className="w-5 h-5 text-[#d9b98a]/60" />
              </div>
              <p className="text-[#f4efe7] text-sm font-medium mb-1">Tomar o subir foto</p>
              <p className="text-[#8a8a8a] text-xs">Toca para elegir de tu galeria</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </button>

            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mb-3">Tus fotos</p>
              <div className="grid grid-cols-4 gap-2">
                {allPhotos.map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#141416]">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#8a8a8a]" />
                </button>
              </div>
            </div>

            <div className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[#8a8a8a] text-xs">34 personas subiendo</span>
              </div>
              <span className="text-white/15">&middot;</span>
              <span className="text-[#8a8a8a] text-xs">287 fotos en total</span>
            </div>

            <div className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#d9b98a]/10 flex items-center justify-center shrink-0">
                <Sun className="w-4 h-4 text-[#d9b98a]" />
              </div>
              <div>
                <p className="text-[#d9b98a] text-xs font-medium">Manana a las 9:00 am te enviamos el album por WhatsApp</p>
                <p className="text-[#8a8a8a] text-xs mt-0.5">No puedes subir ahora? Te recordamos mas tarde.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
