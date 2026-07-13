import { Logo } from "@/components/ui/Logo";

interface OrgLandingProps {
  createCta: React.ReactNode;
}

const HERO =
  "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&h=1400&w=900";

const EVENT_TYPES = ["Bodas", "Quinceañeras", "Baby showers", "Fiestas"];

export default function OrgLanding({ createCta }: OrgLandingProps) {
  return (
    <div className="flex h-full flex-col bg-gradient-warm">
      <header className="flex-shrink-0 pt-8 pb-4 flex justify-center">
        <span className="rounded-full border border-white/[0.10] bg-[#0b0b0c]/60 px-5 py-2.5 backdrop-blur-md">
          <Logo markSize={22} textClassName="text-2xl" />
        </span>
      </header>

      <div className="relative mx-3 flex-1 overflow-hidden rounded-[2rem] ring-1 ring-white/[0.06]">
        <img
          src={HERO}
          alt="Invitados capturando un evento"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c]/20 via-transparent to-[#0b0b0c]/80" />
        <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-36" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d9b98a]" />
          REVELADO &middot; 09:41
        </div>
      </div>

      <footer className="flex-shrink-0 px-6 pt-6 pb-9 text-center">
        <h1 className="font-serif text-[1.7rem] font-light leading-[1.15] text-[#f4efe7]">
          Todas las fotos de tu evento,
          <br />
          <span className="italic text-[#d9b98a]">en un solo lugar.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[19rem] text-[13px] leading-relaxed text-[#8a8a8a]">
          Tus invitados las suben desde su celular con un QR. Sin apps ni cuentas.
          Al día siguiente, todo es tuyo.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {EVENT_TYPES.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-[11px] text-[#f4efe7]/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6">{createCta}</div>
        <p className="pt-3 text-xs text-[#f4efe7]/20">Prueba gratis &middot; Sin tarjeta</p>
      </footer>
    </div>
  );
}
