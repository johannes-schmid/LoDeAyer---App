"use client";
import { useRef } from "react";
import { Camera, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOTAL_SHOTS = 20;
const USED_SHOTS = 13;

const demoPics = [
  "https://images.pexels.com/photos/30505255/pexels-photo-30505255.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
  "https://images.pexels.com/photos/11596048/pexels-photo-11596048.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
  "https://images.pexels.com/photos/10168642/pexels-photo-10168642.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
];

interface CarreteScreenProps {
  name: string;
  uploadedPhotos: string[];
  onPhotoUpload: (dataUrl: string) => void;
}

export default function CarreteScreen({ name, uploadedPhotos, onPhotoUpload }: CarreteScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const remaining = TOTAL_SHOTS - USED_SHOTS - uploadedPhotos.length;

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
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif italic text-[#d9b98a] text-[15px]">Boda de Ana & Carlos</p>
            <p className="text-[#f4efe7]/30 text-xs mt-0.5">Lima · 21 Jun 2026</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#d9b98a] flex items-center justify-center text-[#0b0b0c] font-semibold text-sm">
            {name[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-4">
        {/* Film strip */}
        <div>
          <div className="flex gap-[3px] mb-2">
            {[...Array(TOTAL_SHOTS)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                  i < USED_SHOTS + uploadedPhotos.length ? "bg-[#d9b98a]" : "bg-white/[0.08]"
                }`}
              />
            ))}
          </div>
          <p className="text-[#f4efe7]/30 text-[11px] text-right">
            {remaining > 0 ? `${remaining} disparos restantes` : "Carrete lleno"}
          </p>
        </div>

        {/* Top-20 hint */}
        <div className="flex items-start gap-3 bg-[#d9b98a]/[0.06] border border-[#d9b98a]/[0.15] rounded-2xl px-4 py-3">
          <span className="text-base mt-0.5">✨</span>
          <p className="text-[#f4efe7]/60 text-xs leading-relaxed">
            <span className="text-[#d9b98a] font-semibold">Sube solo tus mejores 20 fotos de la noche.</span>{" "}
            Menos es más — las mejores imágenes ganan más votos en el álbum final.
          </p>
        </div>

        {/* Upload zone */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full border border-dashed border-white/[0.10] rounded-2xl p-8 text-center hover:border-[#d9b98a]/25 hover:bg-[#d9b98a]/[0.03] transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:border-[#d9b98a]/20 transition-colors duration-200">
            <Camera className="w-5 h-5 text-[#d9b98a]/60" />
          </div>
          <p className="text-[#f4efe7] font-medium text-sm mb-1">Tomar o subir foto</p>
          <p className="text-[#f4efe7]/35 text-xs">Toca para elegir de tu galería</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </button>

        {/* Gallery */}
        <div>
          <p className="text-[#f4efe7]/30 text-[11px] mb-2.5 uppercase tracking-[0.12em]">Tus fotos</p>
          <div className="grid grid-cols-4 gap-2">
            {allPhotos.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#111113]">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.07] transition-colors"
            >
              <Plus className="w-5 h-5 text-[#f4efe7]/25" />
            </button>
          </div>
        </div>

        {/* Live footer */}
        <div className="flex items-center gap-3 bg-[#111113] border border-white/[0.05] rounded-2xl px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[#f4efe7]/50 text-xs">34 personas subiendo</span>
          </div>
          <span className="text-white/15">·</span>
          <span className="text-[#f4efe7]/50 text-xs">287 fotos en total</span>
        </div>

        {/* Revelado reminder */}
        <div className="bg-[#d9b98a]/[0.07] border border-[#d9b98a]/15 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#d9b98a]/10 flex items-center justify-center shrink-0">
            <Sun className="w-4 h-4 text-[#d9b98a]" />
          </div>
          <div>
            <p className="text-[#d9b98a] text-xs font-semibold">Mañana a las 9:00 am</p>
            <p className="text-[#f4efe7]/40 text-xs mt-0.5">Revelado · por WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
