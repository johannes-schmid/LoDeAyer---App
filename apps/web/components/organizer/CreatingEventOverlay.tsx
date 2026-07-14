"use client";

/**
 * Full-screen loading overlay shown while an event is being created.
 *
 * The mark is the LoDeAyer focus reticle (see ui/Logo.tsx) animated as a camera
 * locking focus: corner brackets breathe inward, the focus ring + dot pulse, and a
 * champagne scan arc sweeps around them. It stays up until createEvent() redirects.
 */
interface CreatingEventOverlayProps {
  show: boolean;
  /** Status line under the mark; defaults to the creation message. */
  message?: string;
}

export default function CreatingEventOverlay({ show, message = "Creando tu evento" }: CreatingEventOverlayProps) {
  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className="loader-fade-in fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0c] bg-gradient-warm"
    >
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-1/2" />

      <div className="relative flex items-center justify-center" style={{ width: 128, height: 128 }}>
        {/* Faint full track */}
        <svg className="absolute inset-0" width={128} height={128} viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="17.5" stroke="#d9b98a" strokeWidth={0.7} opacity={0.12} />
        </svg>

        {/* Rotating champagne scan arc */}
        <svg className="loader-arc absolute inset-0" width={128} height={128} viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle
            cx="20"
            cy="20"
            r="17.5"
            stroke="#d9b98a"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeDasharray="15 95"
          />
        </svg>

        {/* Focus reticle — same geometry as LogoMark */}
        <svg width={82} height={82} viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <g className="loader-brackets" stroke="#d9b98a" strokeWidth={2.4} strokeLinecap="round" fill="none">
            <path d="M8 14V10a2 2 0 0 1 2-2h4" />
            <path d="M26 8h4a2 2 0 0 1 2 2v4" />
            <path d="M32 26v4a2 2 0 0 1-2 2h-4" />
            <path d="M14 32h-4a2 2 0 0 1-2-2v-4" />
          </g>
          <circle className="loader-focus-ring" cx="20" cy="20" r="3.2" stroke="#d9b98a" strokeWidth={2.4} fill="none" />
          <circle className="loader-focus-dot" cx="20" cy="20" r="1.1" fill="#d9b98a" />
        </svg>
      </div>

      <div className="mt-10 flex flex-col items-center px-8 text-center">
        <span className="font-serif text-xl leading-none">
          <span className="italic text-[#d9b98a]">Lo</span>
          <span className="text-[#f4efe7]">DeAyer</span>
        </span>
        <p className="mt-4 text-sm text-[#f4efe7]/55">
          <span className="loader-dots">{message}</span>
        </p>
      </div>
    </div>
  );
}
