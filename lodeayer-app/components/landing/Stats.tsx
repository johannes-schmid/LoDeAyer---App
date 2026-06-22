export default function Stats() {
  return (
    <section className="bg-[#0d0d0f] border-y border-white/[0.06] py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#d9b98a] text-xs uppercase tracking-[0.18em] mb-4 font-medium">La diferencia</p>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-[#f4efe7] mb-14 tracking-tight">
          Sin app,{" "}
          <em className="italic text-[#d9b98a]">sin excusas.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0b0b0c] rounded-2xl p-10 border border-white/[0.05]">
            <p className="text-5xl font-serif text-red-400/60 font-light mb-3 tracking-tight">10–15%</p>
            <p className="text-[#f4efe7] font-medium mb-1.5 text-sm">Con app obligatoria</p>
            <p className="text-[#f4efe7]/35 text-sm leading-relaxed">La mayoría abandona antes de registrarse. Las fotos se pierden.</p>
          </div>
          <div className="bg-[#0b0b0c] rounded-2xl p-10 border border-[#d9b98a]/15">
            <p className="text-5xl font-serif text-[#d9b98a] font-light mb-3 tracking-tight">75–85%</p>
            <p className="text-[#f4efe7] font-medium mb-1.5 text-sm">Sin app, solo QR</p>
            <p className="text-[#f4efe7]/35 text-sm leading-relaxed">Abren el link, escriben su nombre, y suben fotos en segundos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
