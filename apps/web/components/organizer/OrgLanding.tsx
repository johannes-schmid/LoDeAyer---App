import { Button } from "@/components/ui/button";

interface OrgLandingProps {
  onCreate: () => void;
  onDemo: () => void;
}

export default function OrgLanding({ onCreate, onDemo }: OrgLandingProps) {
  return (
    <div className="flex flex-col h-full px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="font-serif italic text-[#d9b98a] text-2xl mb-1">LoDeAyer</p>
        <p className="text-[#f4efe7]/35 text-sm tracking-wide mb-12">Panel de organización</p>

        <div className="w-full bg-[#111113] border border-white/[0.06] rounded-2xl p-5 mb-8 text-left space-y-3">
          <p className="text-[#f4efe7]/35 text-[11px] uppercase tracking-widest mb-4">Lo que incluye tu evento</p>
          {[
            "QR en cada mesa — sin app ni cuenta",
            "Revelado al día siguiente por WhatsApp",
            "Votación + premio para la mejor foto",
            "Álbum descargable en alta calidad",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d9b98a]/50 shrink-0" />
              <span className="text-[#f4efe7]/70">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {["Bodas", "Baby Showers", "Quinceañeras", "Fiestas"].map((tag) => (
            <span key={tag} className="text-xs text-[#f4efe7]/35 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onCreate}
          className="w-full bg-[#d9b98a] text-[#0b0b0c] font-semibold h-14 rounded-2xl hover:bg-[#c9a070]"
        >
          Crear mi evento
        </Button>
        <button
          onClick={onDemo}
          className="w-full text-[#f4efe7]/40 text-sm py-3 border border-white/[0.08] rounded-2xl hover:text-[#f4efe7]/70 transition-colors"
        >
          Ver demo del panel →
        </button>
        <p className="text-center text-[#f4efe7]/20 text-xs pt-2">Prueba gratis · Sin tarjeta</p>
      </div>
    </div>
  );
}
