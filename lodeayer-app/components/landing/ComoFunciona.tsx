import Link from "next/link";
import { Camera } from "lucide-react";

const steps = [
  {
    num: 1,
    title: "Crea tu evento",
    desc: "Cinco minutos desde el celular. Elige el carrete, la hora del revelado, y obtienes tu QR.",
  },
  {
    num: 2,
    title: "Comparte el QR",
    desc: "En las mesas, en la invitación, por WhatsApp. Tus invitados entran sin descargar nada, solo con su nombre.",
  },
  {
    num: 3,
    title: "Recibe el álbum",
    desc: "Todas las fotos de todos, organizadas por momento del día. Al día siguiente, por WhatsApp.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="max-w-6xl mx-auto px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Two overlapping phone mockups */}
        <div className="flex justify-center items-center order-2 lg:order-1">
          <div className="relative w-[340px] h-[580px]">

            {/* Front phone — on top */}
            <div className="absolute bottom-0 left-0 w-[255px] -rotate-2" style={{ zIndex: 2 }}>
              <div className="bg-[#1a1a1c] rounded-[38px] border border-white/[0.10] p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
                <div className="rounded-[30px] overflow-hidden relative" style={{ height: "460px" }}>
                  <img
                    src="https://images.pexels.com/photos/10168642/pexels-photo-10168642.jpeg?auto=compress&cs=tinysrgb&h=900&w=500"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/90 via-[#0b0b0c]/30 to-[#0b0b0c]/50" />
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-5">
                    <p className="text-[#d9b98a]/80 text-[10px] uppercase tracking-[0.18em] mb-2">LoDeAyer</p>
                    <p className="font-serif italic text-[#f4efe7] text-xl text-center leading-tight mb-1">
                      Boda de Ana & Carlos
                    </p>
                    <p className="text-[#f4efe7]/40 text-[11px] mb-5">Sáb 14 nov · Lima, Perú</p>
                    <div className="grid grid-cols-3 gap-2 w-full mb-4">
                      {[["287","FOTOS"],["34","INVITADOS"],["9h","REVELADO"]].map(([v,l],i) => (
                        <div key={i} className="bg-white/[0.08] rounded-2xl py-2 text-center border border-white/[0.06]">
                          <p className="text-[#f4efe7] font-semibold text-sm leading-none">{v}</p>
                          <p className="text-[#f4efe7]/40 text-[9px] mt-1 tracking-wider">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-[#d9b98a] rounded-2xl py-3 text-center">
                      <p className="text-[#0b0b0c] font-semibold text-sm">+ Subir mis fotos</p>
                    </div>
                    <p className="text-[#f4efe7]/30 text-[10px] mt-2">Tu carrete: 13 de 20 disparos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back phone — behind, sticking out more */}
            <div className="absolute top-0 right-[-20px] w-[265px] rotate-2" style={{ zIndex: 1 }}>
              <div className="bg-[#1a1a1c] rounded-[40px] border border-white/[0.12] p-1.5 shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                <div className="rounded-[32px] overflow-hidden bg-[#0b0b0c]">
                  {/* Dynamic Island */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-20 h-5 bg-[#0b0b0c] rounded-full border border-white/[0.12] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#1c1c1e] border border-white/15" />
                    </div>
                  </div>
                  <div className="px-4 pb-6">
                    <div className="text-center mb-4">
                      <p className="font-serif italic text-[#d9b98a] text-[13px]">LoDeAyer</p>
                      <p className="font-serif italic text-[#f4efe7] text-base mt-0.5 leading-snug">Boda de Ana & Carlos</p>
                      <p className="text-[#f4efe7]/30 text-[10px] mt-0.5">Lima · 21 Jun 2026</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {[["287","fotos"],["34","personas"],["9h","revelado"]].map(([v,l],i) => (
                        <div key={i} className="bg-[#111113] rounded-xl py-2 text-center border border-white/[0.05]">
                          <p className="text-[#d9b98a] font-semibold text-sm leading-none">{v}</p>
                          <p className="text-white/30 text-[9px] mt-1">{l}</p>
                        </div>
                      ))}
                    </div>
                    <Link href="/evento/demo">
                      <div className="bg-[#d9b98a] text-[#0b0b0c] rounded-xl py-2.5 text-center flex items-center justify-center gap-2 hover:bg-[#c9a070] transition-colors cursor-pointer mb-3">
                        <Camera className="w-3.5 h-3.5" />
                        <div>
                          <p className="font-semibold text-xs leading-none">Subir foto</p>
                          <p className="text-[9px] opacity-60 mt-0.5">7 disparos restantes</p>
                        </div>
                      </div>
                    </Link>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        "https://images.pexels.com/photos/11596048/pexels-photo-11596048.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
                        "https://images.pexels.com/photos/6198369/pexels-photo-6198369.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
                        "https://images.pexels.com/photos/10168642/pexels-photo-10168642.jpeg?auto=compress&cs=tinysrgb&h=100&w=100",
                      ].map((src, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-[#111113]">
                          <img src={src} alt="" loading="lazy" className="w-full h-full object-cover opacity-70" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Steps */}
        <div className="order-1 lg:order-2">
          <p className="text-[#f4efe7]/40 text-xs uppercase tracking-[0.22em] mb-4 font-medium">La solución</p>
          <h2 className="font-serif text-[#f4efe7] mb-12 tracking-tight leading-tight">
            <span className="font-bold text-4xl md:text-5xl">Un QR en cada mesa.</span>
            <br />
            <em className="italic text-[#d9b98a] text-4xl md:text-5xl font-light">Eso es todo.</em>
          </h2>

          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-5">
                <div className="w-9 h-9 rounded-full bg-[#d9b98a]/10 border border-[#d9b98a]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#d9b98a] text-sm font-semibold">{s.num}</span>
                </div>
                <div>
                  <h3 className="text-[#f4efe7] font-semibold text-base mb-1.5">{s.title}</h3>
                  <p className="text-[#f4efe7]/45 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
