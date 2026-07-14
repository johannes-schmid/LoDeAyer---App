"use client";

/**
 * Compact version of the LoDeAyer focus-reticle mark, animated as a camera
 * locking focus. Used inline (photo tiles, buttons) where the full-screen
 * CreatingEventOverlay would be too heavy.
 */
interface LogoSpinnerProps {
  size?: number;
  className?: string;
}

export default function LogoSpinner({ size = 28, className = "" }: LogoSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className="loader-arc absolute inset-0" width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle
          cx="20"
          cy="20"
          r="17.5"
          stroke="#d9b98a"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeDasharray="15 95"
        />
      </svg>
      <svg width={size * 0.64} height={size * 0.64} viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
  );
}
