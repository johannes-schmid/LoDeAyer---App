export default function BentoGrid() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-20">
      <p className="text-[#f4efe7]/40 text-xs uppercase tracking-[0.22em] mb-3 font-medium">El resultado</p>
      <h2 className="font-serif font-bold text-[#f4efe7] text-4xl md:text-5xl mb-8 tracking-tight">
        Una boda. Mil miradas.
      </h2>

      <div className="grid grid-cols-4 gap-3" style={{ gridTemplateRows: "320px 220px" }}>

        {/* Large dance photo — col 1-2, rows 1-2 */}
        <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl bg-[#111113] group">
          <img
            src="https://images.pexels.com/photos/30505255/pexels-photo-30505255.jpeg?auto=compress&cs=tinysrgb&h=900&w=900"
            alt="La pista"
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5">
            <p className="text-[#f4efe7]/60 text-[11px] uppercase tracking-[0.16em] font-medium">La pista</p>
            <p className="font-serif italic text-[#f4efe7] text-base mt-0.5">1:47 am</p>
          </div>
        </div>

        {/* Champagne — col 3, row 1 */}
        <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl bg-[#111113] group">
          <img
            src="https://images.pexels.com/photos/11596048/pexels-photo-11596048.jpeg?auto=compress&cs=tinysrgb&h=400&w=400"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* B&W editorial bride — col 4, rows 1-2 */}
        <div className="col-span-1 row-span-2 relative overflow-hidden rounded-2xl bg-[#111113] group">
          <img
            src="https://images.pexels.com/photos/30957025/pexels-photo-30957025.jpeg?auto=compress&cs=tinysrgb&h=800&w=400"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500 grayscale"
          />
        </div>

        {/* Stat card — col 3, row 2 */}
        <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl bg-[#111113] border border-white/[0.06] flex flex-col items-center justify-center">
          <p className="font-serif font-bold text-[#d9b98a] text-6xl leading-none tracking-tight">287</p>
          <p className="text-[#f4efe7]/45 text-sm mt-2">fotos subidas</p>
        </div>

      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-4 gap-3 mt-3">

        {/* Bridesmaids — col 1 */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl bg-[#111113] group" style={{ height: "220px" }}>
          <img
            src="https://images.pexels.com/photos/9041817/pexels-photo-9041817.jpeg?auto=compress&cs=tinysrgb&h=400&w=400"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Moody couple — col 2 */}
        <div className="col-span-1 relative overflow-hidden rounded-2xl bg-[#111113] group" style={{ height: "220px" }}>
          <img
            src="https://images.pexels.com/photos/6198375/pexels-photo-6198375.jpeg?auto=compress&cs=tinysrgb&h=400&w=400"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Quote card — col 3-4 */}
        <div className="col-span-2 relative overflow-hidden rounded-2xl bg-[#111113] border border-white/[0.06] flex flex-col items-center justify-center px-8 text-center" style={{ height: "220px" }}>
          <p className="font-serif italic text-[#f4efe7] text-xl md:text-2xl leading-snug">
            "287 fotos · 34 personas · 1 boda"
          </p>
          <p className="text-[#f4efe7]/35 text-sm mt-3">Boda de Ana & Carlos · Lima</p>
        </div>

      </div>
    </section>
  );
}
