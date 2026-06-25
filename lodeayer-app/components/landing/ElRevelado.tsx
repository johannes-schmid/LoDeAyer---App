import { Clock } from "lucide-react";

export default function ElRevelado() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div>
          <p className="text-[#d9b98a] text-xs uppercase tracking-[0.18em] mb-4 font-medium">El revelado</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#f4efe7] mb-6 tracking-tight">
            Como un carrete de fotos,{" "}
            <em className="italic text-[#d9b98a]">sellado hasta mañana.</em>
          </h2>
          <p className="text-[#f4efe7]/50 text-base leading-relaxed mb-5">
            Las fotos quedan selladas durante la fiesta. Nadie puede ver las de los demás. A la mañana siguiente, todo se revela a la vez — como abrir el carrete.
          </p>
          <p className="text-[#f4efe7]/50 text-base leading-relaxed mb-8">
            Tú decides la hora del revelado. Todos los invitados reciben un mensaje de WhatsApp al mismo tiempo. El álbum completo, de un golpe.
          </p>
          <div className="flex items-center gap-3 bg-[#111113] border border-white/[0.06] rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-[#d9b98a]/10 border border-[#d9b98a]/15 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#d9b98a]" />
            </div>
            <div>
              <p className="text-[#f4efe7] text-sm font-medium">Revelado programado</p>
              <p className="text-[#f4efe7]/35 text-xs mt-0.5">Mañana a las 9:00 am · Todos reciben el álbum por WhatsApp</p>
            </div>
          </div>
        </div>

        {/* WhatsApp mockup */}
        <div className="flex justify-center">
          <div className="bg-[#0d1f1c] rounded-3xl p-4 w-full max-w-[300px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/[0.06]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.08]">
              <div className="w-9 h-9 rounded-full bg-[#d9b98a] flex items-center justify-center font-serif text-[#0b0b0c] font-bold text-sm">L</div>
              <div>
                <p className="text-white text-sm font-semibold">LoDeAyer — Boda A&C</p>
                <p className="text-white/40 text-xs">Grupo · 34 participantes</p>
              </div>
            </div>
            {/* Messages */}
            <div className="space-y-3">
              <div className="bg-[#1a3830] rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                <p className="text-white/70 text-[11px] font-semibold mb-1">LoDeAyer</p>
                <p className="text-white text-sm">Buenos días!</p>
                <p className="text-white/70 text-xs mt-1">Ha llegado el momento del <strong>revelado</strong>.</p>
              </div>
              <div className="bg-[#1a3830] rounded-2xl rounded-tl-none p-3 max-w-[90%]">
                <p className="text-white/70 text-xs">287 fotos de 34 personas esperan ser vistas.</p>
                <div className="grid grid-cols-3 gap-1 mt-2 rounded-xl overflow-hidden">
                  {[
                    "https://images.pexels.com/photos/9041817/pexels-photo-9041817.jpeg?auto=compress&cs=tinysrgb&h=80&w=80",
                    "https://images.pexels.com/photos/30505255/pexels-photo-30505255.jpeg?auto=compress&cs=tinysrgb&h=80&w=80",
                    "https://images.pexels.com/photos/10168642/pexels-photo-10168642.jpeg?auto=compress&cs=tinysrgb&h=80&w=80",
                  ].map((src, i) => (
                    <div key={i} className="aspect-square overflow-hidden">
                      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="mt-2 bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl p-2 text-center">
                  <p className="text-[#25D366] text-xs font-semibold">Ver álbum completo</p>
                </div>
              </div>
              <div className="ml-auto bg-[#25D366]/15 border border-[#25D366]/20 rounded-2xl rounded-tr-none p-3 max-w-[70%]">
                <p className="text-white/80 text-xs">hermosas las fotos!!</p>
                <p className="text-white/30 text-[10px] mt-1 text-right">9:04</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
