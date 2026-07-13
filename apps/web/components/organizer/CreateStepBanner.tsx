"use client";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ImagePlus } from "lucide-react";
import { StepBar } from "./CreateStep1";
import type { EventInfo } from "./CreateStep1";
import WelcomeScreen from "@/components/guest/WelcomeScreen";
import { toDisplayableImage } from "@/lib/heic";

interface CreateStepBannerProps {
  file: File | null;
  onChange: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
  info: EventInfo;
  existingBannerUrl?: string | null;
  editMode?: boolean;
}

export default function CreateStepBanner({ file, onChange, onNext, onBack, info, existingBannerUrl, editMode }: CreateStepBannerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : (existingBannerUrl ?? null);

  const formattedDate = useMemo(() => {
    if (!info.date) return "Fecha por confirmar";
    const d = new Date(`${info.date}T00:00:00`);
    if (Number.isNaN(d.getTime())) return info.date;
    return d.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
  }, [info.date]);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {!editMode && <StepBar steps={4} active={1} />}
      <div className={`px-6 mb-6 ${editMode ? "pt-6" : ""}`}>
        {!editMode && <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-1">Paso 2 de 4</p>}
        <h2 className="text-2xl font-bold tracking-tight">
          {editMode ? "Foto de invitación" : <>Elige una foto<br/>de portada</>}
        </h2>
      </div>

      <div className="px-6 flex-1">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          className="hidden"
          onChange={async e => {
            const file = e.target.files?.[0] ?? null;
            onChange(file ? await toDisplayableImage(file) : null);
          }}
        />

        <p className="text-[11px] uppercase tracking-widest text-[#f4efe7]/30 mb-1">Vista previa</p>
        <p className="text-[#f4efe7]/25 text-xs mb-3">
          Así se verá la pantalla de bienvenida que reciben tus invitados al escanear el QR.
        </p>

        <div className="relative rounded-[2rem] border border-white/[0.08] overflow-hidden h-[440px] shadow-xl shadow-black/40 mx-auto max-w-[280px]">
          <WelcomeScreen
            onNext={() => {}}
            bannerUrl={previewUrl}
            partner1={info.partner1 || "Nombre 1"}
            partner2={info.partner2 || "Nombre 2"}
            city={info.city || "Ciudad"}
            date={formattedDate}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute top-0 left-0 right-0 h-[55%] flex flex-col items-center justify-center gap-2 text-white/80 bg-black/0 hover:bg-black/30 transition-colors"
          >
            {!previewUrl && (
              <>
                <ImagePlus className="w-7 h-7" />
                <span className="text-sm font-medium">Subir foto de portada</span>
              </>
            )}
          </button>
        </div>

        {previewUrl && (
          <div className="flex gap-3 mt-4 max-w-[280px] mx-auto">
            <button
              onClick={() => inputRef.current?.click()}
              className="flex-1 border border-white/[0.09] rounded-xl py-2.5 text-sm text-[#f4efe7]/60 hover:text-[#f4efe7]/90 transition-colors"
            >
              Cambiar foto
            </button>
            <button
              onClick={() => onChange(null)}
              className="flex-1 border border-white/[0.09] rounded-xl py-2.5 text-sm text-[#f4efe7]/40 hover:text-[#f4efe7]/70 transition-colors"
            >
              Quitar
            </button>
          </div>
        )}

        {!editMode && (
          <p className="text-[#f4efe7]/25 text-xs mt-4 text-center">
            Es opcional — puedes agregarla más adelante.
          </p>
        )}
      </div>

      <div className="px-6 pt-6 pb-10 space-y-3">
        <Button
          onClick={onNext}
          className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]"
        >
          {editMode ? "Guardar" : "Siguiente →"}
        </Button>
        <button onClick={onBack} className="w-full text-[#f4efe7]/35 text-sm py-3 flex items-center justify-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>
      </div>
    </div>
  );
}
