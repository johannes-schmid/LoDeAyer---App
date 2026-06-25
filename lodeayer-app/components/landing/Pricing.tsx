"use client";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Prueba",
    price: "$0",
    desc: "Para probar antes de tu evento",
    features: ["Hasta 15 invitados", "10 fotos por persona", "Álbum digital básico", "Acceso 7 días"],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    name: "Fiesta",
    price: "$49",
    desc: "Para fiestas y cumpleaños",
    features: ["Hasta 50 invitados", "20 fotos por persona", "Álbum con revelado", "Acceso 30 días", "Recordatorios WhatsApp"],
    cta: "Elegir Fiesta",
    highlight: false,
  },
  {
    name: "Boda",
    price: "$89",
    desc: "El más popular para bodas",
    features: ["Hasta 150 invitados", "30 fotos por persona", "Todo de Fiesta +", "Votación mejor foto", "Panel de aprobación", "QR personalizado"],
    cta: "Elegir Boda",
    highlight: true,
  },
  {
    name: "Boda Total",
    price: "$159",
    desc: "Sin límites, sin preocupaciones",
    features: ["Invitados ilimitados", "Fotos ilimitadas", "Todo de Boda +", "Soporte prioritario", "Entrega exprés del álbum"],
    cta: "Elegir Total",
    highlight: false,
  },
];

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="precios" className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="text-[#d9b98a] text-xs uppercase tracking-[0.18em] mb-4 font-medium">Precios</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#f4efe7] tracking-tight">
            Un pago, para{" "}
            <em className="italic text-[#d9b98a]">toda la vida.</em>
          </h2>
          <p className="text-[#f4efe7]/40 mt-4 text-sm">Pago único por evento. Sin suscripciones.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 flex flex-col ${
                p.highlight
                  ? "bg-[#d9b98a] text-[#0b0b0c]"
                  : "bg-[#111113] border border-white/[0.06] text-[#f4efe7] hover:border-white/[0.12] transition-colors duration-300"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b0b0c] text-[#d9b98a] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#d9b98a]/25 whitespace-nowrap">
                  Recomendado
                </span>
              )}
              <p className={`text-xs font-semibold mb-1 uppercase tracking-wider ${p.highlight ? "text-[#0b0b0c]/50" : "text-[#d9b98a]"}`}>{p.name}</p>
              <p className={`text-4xl font-serif font-light mb-1 tracking-tight ${p.highlight ? "text-[#0b0b0c]" : "text-[#f4efe7]"}`}>{p.price}</p>
              <p className={`text-xs mb-6 ${p.highlight ? "text-[#0b0b0c]/50" : "text-[#f4efe7]/35"}`}>{p.desc}</p>
              <ul className="space-y-2.5 flex-1 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className={`text-xs flex items-start gap-2.5 ${p.highlight ? "text-[#0b0b0c]/70" : "text-[#f4efe7]/55"}`}>
                    <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${p.highlight ? "text-[#0b0b0c]/60" : "text-[#d9b98a]/70"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setModalOpen(true)}
                className={`w-full rounded-xl text-sm font-medium h-10 ${
                  p.highlight
                    ? "bg-[#0b0b0c] text-[#d9b98a] hover:bg-[#111113]"
                    : "bg-white/[0.05] text-[#f4efe7] hover:bg-white/[0.10] border border-white/[0.08]"
                }`}
                variant={p.highlight ? "default" : "ghost"}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
