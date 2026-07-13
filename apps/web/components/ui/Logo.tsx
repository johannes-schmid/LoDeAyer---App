/**
 * LoDeAyer brand mark — a camera focus reticle (corner brackets + focus point).
 *
 * Playful colorway concept: the mark is never locked to one color. It ships in three
 * brand tones and can be swapped per surface / event / season.
 */

export type Colorway = "ink" | "champagne" | "paper";

export const COLORWAYS: Record<Colorway, { bg: string; mark: string; wordLo: string; word: string }> = {
  ink: { bg: "#0b0b0c", mark: "#d9b98a", wordLo: "#d9b98a", word: "#f4efe7" },
  champagne: { bg: "#d9b98a", mark: "#0b0b0c", wordLo: "#0b0b0c", word: "#141416" },
  paper: { bg: "#f4efe7", mark: "#0b0b0c", wordLo: "#c9a070", word: "#0b0b0c" },
};

interface LogoMarkProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LogoMark({ size = 24, color = "currentColor", className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth={2.4} strokeLinecap="round" fill="none">
        <path d="M8 14V10a2 2 0 0 1 2-2h4" />
        <path d="M26 8h4a2 2 0 0 1 2 2v4" />
        <path d="M32 26v4a2 2 0 0 1-2 2h-4" />
        <path d="M14 32h-4a2 2 0 0 1-2-2v-4" />
        <circle cx="20" cy="20" r="3.2" />
      </g>
      <circle cx="20" cy="20" r="1.1" fill={color} />
    </svg>
  );
}

interface LogoProps {
  markSize?: number;
  tone?: Colorway;
  className?: string;
  /** Extra classes for the wordmark span (use for text size, e.g. "text-2xl"). */
  textClassName?: string;
}

/** Full lockup: reticle mark + two-tone "LoDeAyer" wordmark (Lo italic accent). */
export function Logo({ markSize = 18, tone = "ink", className, textClassName }: LogoProps) {
  const c = COLORWAYS[tone];
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <LogoMark size={markSize} color={c.mark} />
      <span className={`font-serif leading-none ${textClassName ?? ""}`}>
        <span className="italic" style={{ color: c.wordLo }}>
          Lo
        </span>
        <span style={{ color: c.word }}>DeAyer</span>
      </span>
    </span>
  );
}

interface AppIconProps {
  tone?: Colorway;
  size?: number;
  className?: string;
}

/** Rounded app-icon tile in a given colorway. */
export function AppIcon({ tone = "ink", size = 64, className }: AppIconProps) {
  const c = COLORWAYS[tone];
  return (
    <div
      className={`flex items-center justify-center ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: c.bg,
        borderRadius: size * 0.26,
      }}
    >
      <LogoMark size={size * 0.44} color={c.mark} />
    </div>
  );
}
