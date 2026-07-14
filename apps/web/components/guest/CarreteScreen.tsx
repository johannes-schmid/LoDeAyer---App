"use client";
import { useRef, useState } from "react";
import { Camera, Plus, Star, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoSpinner from "@/components/ui/LogoSpinner";
import type { GuestPhoto } from "@/lib/guests/actions";

const LONG_PRESS_MS = 500;

interface CarreteScreenProps {
  name: string;
  partner1: string;
  partner2: string;
  city: string | null;
  date?: string;
  maxPhotos: number;
  uploadedPhotos: GuestPhoto[];
  submittedAt: string | null;
  onPhotoUpload: (file: File) => void;
  onDeletePhoto: (photoId: string) => void;
  onReorderPhotos: (orderedIds: string[]) => void;
  onSetFavorite: (photoId: string) => void;
  onSubmit: () => void;
  onVote: () => void;
}

export default function CarreteScreen({
  name,
  partner1,
  partner2,
  city,
  date,
  maxPhotos,
  uploadedPhotos,
  submittedAt,
  onPhotoUpload,
  onDeletePhoto,
  onReorderPhotos,
  onSetFavorite,
  onSubmit,
  onVote,
}: CarreteScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activePhotoId, setActivePhotoId] = useState<string | null>(null);

  const filled = uploadedPhotos.length;
  const remaining = maxPhotos - filled;
  const isFull = remaining <= 0;
  const isLocked = !!submittedAt;
  const activePhoto = uploadedPhotos.find(p => p.id === activePhotoId) ?? null;
  const activeIndex = uploadedPhotos.findIndex(p => p.id === activePhotoId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => onPhotoUpload(file));
    e.target.value = "";
  };

  const startPress = (photoId: string) => {
    if (isLocked) return;
    const photo = uploadedPhotos.find(p => p.id === photoId);
    if (photo?.uploading) return;
    pressTimer.current = setTimeout(() => setActivePhotoId(photoId), LONG_PRESS_MS);
  };

  const cancelPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const move = (delta: 1 | -1) => {
    if (activeIndex < 0) return;
    const target = activeIndex + delta;
    if (target < 0 || target >= uploadedPhotos.length) return;

    const ids = uploadedPhotos.map(p => p.id);
    [ids[activeIndex], ids[target]] = [ids[target], ids[activeIndex]];
    onReorderPhotos(ids);
    setActivePhotoId(null);
  };

  const toggleFavorite = () => {
    if (!activePhoto) return;
    onSetFavorite(activePhoto.id);
    setActivePhotoId(null);
  };

  const remove = () => {
    if (!activePhoto) return;
    onDeletePhoto(activePhoto.id);
    setActivePhotoId(null);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-serif italic text-[#d9b98a] text-[15px]">Boda de {partner1} &amp; {partner2}</p>
            {(city || date) && (
              <p className="text-[#8a8a8a] text-xs mt-0.5">{[city, date].filter(Boolean).join(" · ")}</p>
            )}
          </div>
          <div className="w-9 h-9 rounded-full bg-[#d9b98a] flex items-center justify-center text-[#0b0b0c] font-semibold text-sm shrink-0">
            {name[0]?.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5">
        <div>
          <div className="flex gap-[2px] mb-2">
            {[...Array(maxPhotos)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-[3px] rounded-full transition-colors duration-300 ${
                  i < filled ? "bg-[#d9b98a]" : "bg-white/[0.06]"
                }`}
              />
            ))}
          </div>
          <p className="text-[#8a8a8a] text-[11px] text-right">
            {isLocked ? "Carrete enviado" : remaining > 0 ? `${remaining} disparos restantes` : "Carrete lleno"}
          </p>
        </div>

        {!isLocked && (
          <div className="flex items-start gap-3 bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d9b98a] mt-1.5 shrink-0" />
            <p className="text-[#8a8a8a] text-xs leading-relaxed">
              <span className="text-[#d9b98a] font-medium">Sube solo tus mejores {maxPhotos} fotos de la noche.</span>{" "}
              Mantén presionada una foto para moverla, marcarla como favorita o eliminarla.
            </p>
          </div>
        )}

        {!isLocked && !isFull && (
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
              accept="image/*,.heic,.heif"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </button>
        )}

        {filled > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mb-3">Tus fotos</p>
            <div className="grid grid-cols-4 gap-2">
              {uploadedPhotos.map(photo => (
                <div
                  key={photo.id}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[#141416] select-none"
                  onPointerDown={() => startPress(photo.id)}
                  onPointerUp={cancelPress}
                  onPointerLeave={cancelPress}
                  onContextMenu={e => {
                    e.preventDefault();
                    if (!isLocked) setActivePhotoId(photo.id);
                  }}
                >
                  {photo.url ? (
                    <img src={photo.url} alt="" className="w-full h-full object-cover" draggable={false} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <LogoSpinner size={24} />
                    </div>
                  )}
                  {photo.uploading && photo.url && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <LogoSpinner size={24} />
                    </div>
                  )}
                  {photo.isFavorite && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#d9b98a] flex items-center justify-center">
                      <Star className="w-3 h-3 text-[#0b0b0c]" fill="currentColor" />
                    </div>
                  )}
                </div>
              ))}
              {!isLocked && !isFull && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.06] transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#8a8a8a]" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-[#141416] ring-1 ring-white/[0.08] rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#d9b98a]/10 flex items-center justify-center shrink-0">
            <Sun className="w-4 h-4 text-[#d9b98a]" />
          </div>
          <div>
            <p className="text-[#d9b98a] text-xs font-medium">Manana a las 9:00 am te enviamos el album por WhatsApp</p>
            {!isLocked && (
              <p className="text-[#8a8a8a] text-xs mt-0.5">No puedes subir ahora? Te recordamos mas tarde.</p>
            )}
          </div>
        </div>

        {isLocked ? (
          <div className="flex flex-col items-center text-center pt-4 space-y-4">
            <h3 className="font-serif italic text-2xl font-light text-[#f4efe7] leading-tight">
              Tus fotos ya fueron enviadas
            </h3>
            <p className="text-[#8a8a8a] text-sm leading-relaxed max-w-xs">
              Quedan selladas. Nadie las ve hasta el revelado de manana.
            </p>
            <Button
              onClick={onVote}
              className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90"
            >
              Ver votacion
            </Button>
          </div>
        ) : (
          filled > 0 && (
            <div className="space-y-2">
              <Button
                onClick={onSubmit}
                className="w-full h-12 rounded-2xl text-sm font-medium tracking-wide bg-[#d9b98a] text-[#0b0b0c] hover:bg-[#d9b98a]/90"
              >
                Enviar todas mis fotos
              </Button>
              <p className="text-[#8a8a8a] text-xs text-center">
                Podras editar tus fotos hasta que las envies.
              </p>
            </div>
          )
        )}
      </div>

      {activePhoto && (
        <div
          className="absolute inset-0 z-10 bg-black/60 flex items-end justify-center"
          onClick={() => setActivePhotoId(null)}
        >
          <div
            className="w-full bg-[#141416] ring-1 ring-white/[0.08] rounded-t-3xl p-5 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden mx-auto mb-2">
              <img src={activePhoto.url} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => move(-1)}
                disabled={activeIndex <= 0}
                className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-3 text-sm text-[#f4efe7] disabled:opacity-30"
              >
                &larr; Mover
              </button>
              <button
                onClick={() => move(1)}
                disabled={activeIndex >= uploadedPhotos.length - 1}
                className="rounded-xl bg-white/[0.04] border border-white/[0.08] py-3 text-sm text-[#f4efe7] disabled:opacity-30"
              >
                Mover &rarr;
              </button>
            </div>
            <button
              onClick={toggleFavorite}
              className="w-full rounded-xl bg-[#d9b98a]/10 border border-[#d9b98a]/20 py-3 text-sm text-[#d9b98a] flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4" fill={activePhoto.isFavorite ? "currentColor" : "none"} />
              {activePhoto.isFavorite ? "Favorita para el premio" : "Marcar como favorita"}
            </button>
            <button
              onClick={remove}
              className="w-full rounded-xl bg-red-500/10 border border-red-500/20 py-3 text-sm text-red-400"
            >
              Eliminar
            </button>
            <button
              onClick={() => setActivePhotoId(null)}
              className="w-full py-2 text-sm text-[#8a8a8a]"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
