import { Smartphone, Clock, Camera, ImageOff } from "lucide-react";

const problems = [
  {
    Icon: Smartphone,
    title: "WhatsApp destruye la calidad",
    desc: "Cada foto enviada por WhatsApp pierde hasta el 80% de su resolución. Las fotos de tu boda terminan pixeladas.",
  },
  {
    Icon: Clock,
    title: '"Después te las paso"',
    desc: "El 90% de los invitados nunca llegan a mandar sus fotos. El momento pasa, la intención también.",
  },
  {
    Icon: Camera,
    title: "El fotógrafo llega en 2 meses",
    desc: "El profesional entrega un álbum perfecto, pero solo su perspectiva. Los momentos espontáneos no están.",
  },
  {
    Icon: ImageOff,
    title: "Los momentos íntimos se pierden",
    desc: "El abrazo entre amigos, el baile improvisado, la lágrima del padre — nadie los captura ni los comparte.",
  },
];

export default function ElProblema() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <p className="text-[#d9b98a] text-xs uppercase tracking-[0.18em] mb-4 font-medium">El problema</p>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-[#f4efe7] tracking-tight">
          Las fotos de tu boda{" "}
          <em className="italic text-[#d9b98a]">nunca llegan.</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {problems.map((p, i) => (
          <div key={i} className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-[#d9b98a]/20 transition-colors duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-[#d9b98a]/20 transition-colors duration-300">
              <p.Icon className="w-5 h-5 text-[#d9b98a]/70" />
            </div>
            <h3 className="font-medium text-[#f4efe7] mb-2 text-sm leading-snug">{p.title}</h3>
            <p className="text-[#f4efe7]/40 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
