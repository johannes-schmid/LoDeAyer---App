"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Los invitados necesitan descargar una app?",
    a: "No. Solo escanean el QR con la cámara del celular, entran a la web, escriben su nombre y listo. Sin apps, sin cuentas, sin contraseñas.",
  },
  {
    q: "¿Qué pasa si un invitado no tiene datos en la fiesta?",
    a: "Pueden subir las fotos hasta 30 días después del evento. Así los que no tuvieron señal pueden hacerlo desde casa con WiFi.",
  },
  {
    q: "¿Puedo revisar las fotos antes de que todos las vean?",
    a: "Sí. El plan Boda y Boda Total incluyen un panel de aprobación donde puedes ver cada foto y decidir cuáles se incluyen en el álbum final.",
  },
  {
    q: "¿Las fotos se comprimen como en WhatsApp?",
    a: "No. Las fotos se almacenan en alta resolución. El revelado por WhatsApp envía un link al álbum, no archivos comprimidos directamente.",
  },
  {
    q: "¿Funciona en cualquier celular?",
    a: "Sí. La web funciona en cualquier smartphone moderno (iOS y Android) con Chrome, Safari o cualquier navegador actualizado.",
  },
  {
    q: "¿Cuánto tiempo tengo acceso al álbum?",
    a: "Depende del plan: 7 días (Prueba), 30 días (Fiesta, Boda, Boda Total). Puedes descargar todo el álbum antes de que expire.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="max-w-2xl mx-auto px-5 md:px-6 py-16 md:py-24">
      <div className="text-center mb-14">
        <p className="text-[#d9b98a] text-xs uppercase tracking-[0.18em] mb-4 font-medium">FAQ</p>
        <h2 className="text-4xl font-serif font-light text-[#f4efe7] tracking-tight">
          Preguntas{" "}
          <em className="italic text-[#d9b98a]">frecuentes.</em>
        </h2>
      </div>
      <div className="space-y-1.5">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
            >
              <span className="text-[#f4efe7] text-sm font-medium leading-snug">{faq.q}</span>
              <span className="text-[#d9b98a]/60 shrink-0">
                {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-5 border-t border-white/[0.04]">
                <p className="text-[#f4efe7]/50 text-sm leading-relaxed pt-4">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
