export default function Marquee() {
  const items = ["Bodas", "Quinceañeras", "Cumpleaños", "Aniversarios", "Eventos", "Fiestas"];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/5 py-5 bg-[#141416]">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="text-[#d9b98a] text-sm uppercase tracking-widest font-medium">{item}</span>
            <span className="text-white/20 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
