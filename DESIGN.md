# LoDeAyer — Design System

The product's visual identity. Keep this in sync when brand-level design (color, type,
logo, core components) changes. Screen-level styling lives in the components themselves.

---

## Direction: **Revelado** (confirmed Jul 2026)

Dark, editorial, "fine-art photo lab" feel. The name evokes the next-morning *revelado*
(film development) reveal — the product's core emotional hook. Restrained, timeless,
premium. Warm champagne gold on ink black, with subtle film grain.

Chosen over two alternatives: *Papel* (light stationery — parked as a possible light theme
for the organizer dashboard / marketing) and *Carrete* (modern charcoal + amber — parked for
social/campaigns).

---

## Color palette

| Token | Hex | Use |
|-------|-----|-----|
| Ink | `#0b0b0c` | app background |
| Smoke | `#141416` | cards, panels |
| Paper | `#f4efe7` | primary text on dark |
| Champagne | `#d9b98a` | primary accent, CTAs, logo, headline highlights |
| Gold deep | `#c9a070` | accent gradient / hover |
| Muted | `#8a8a8a` | secondary text, captions |
| Border | `rgba(255,255,255,0.08)` | hairlines, card rings |

Defined as CSS vars + brand tokens in `apps/web/app/globals.css` (`--color-ink`, `--color-champagne`, etc.).
A `refined` variant of the palette was explored (deeper ink `#0C0B0D`, brighter champagne `#E2BE88`);
current production values above are the ones shipped — bump only if we do a full pass.

---

## Typography

| Role | Face | Notes |
|------|------|-------|
| Display / headings | **Fraunces** (Google, variable) | `.font-serif` / `--font-heading`. Replaced Cormorant Garamond — warmer and far sturdier at small mobile sizes. Optical sizing auto. Italic used for couple names ("Ana & Carlos"). |
| Body / UI | **Inter** (Google) | `--font-sans`, default `html` font. |
| Data / stamps | system mono | `--font-mono` — stats, dates, "REVELADO · 09:41" style captions. |

- Wired in `apps/web/app/layout.tsx` (font imports → CSS vars) and `apps/web/app/globals.css`
  (`--font-serif`, `--font-heading`, `.font-serif`).
- **Fraunces chosen over** Bodoni Moda (stunning but fragile hairlines — reserved for large
  marketing-site hero type) and Instrument Serif (modern but single-weight).

---

## Logo

**Focus-reticle mark** — a camera's autofocus brackets (four corners) around a center focus
point (ring + dot). Reads as "point & capture" and doubles as a photo frame. Works at any
size (favicon → QR sticker).

**Wordmark** — "LoDeAyer" in Fraunces: **Lo** italic in the accent tone, **DeAyer** upright.

Component: `apps/web/components/ui/Logo.tsx`
- `<LogoMark size color />` — the reticle only.
- `<Logo tone markSize textClassName />` — full lockup (mark + two-tone wordmark).
- `<AppIcon tone size />` — rounded app-icon tile in a colorway.
- In use: guest `WelcomeScreen` brand chip, organizer `OrgLanding`.

### Playful colorway concept

The mark is **never locked to one color** — that's the brand's playful signature. It ships in
three tones (`Colorway` type + `COLORWAYS` map), swappable per surface / event / season:

| Colorway | Background | Mark |
|----------|-----------|------|
| `ink` | `#0b0b0c` | champagne `#d9b98a` |
| `champagne` | `#d9b98a` | ink `#0b0b0c` |
| `paper` | `#f4efe7` | ink `#0b0b0c` |

Default app icon = `ink`. Future: rotate colorways per event so each couple's link feels its
own, or cycle them as a small marketing motif.

---

## Gradients

Subtle warm gradients add depth and a more modern feel. Utilities in `globals.css`:

| Class | What | Use |
|-------|------|-----|
| `.bg-gradient-warm` | radial ink→warm-ink from top | screen / sheet backgrounds |
| `.hero-glow` | soft champagne radial glow (top center) | overlay on hero imagery |
| `.bg-champagne-gradient` | `#e9d1a6 → #d9b98a → #c39a63` | primary CTAs |
| `.text-gradient-champagne` | champagne gradient clipped to text | occasional headline accents |

Keep them restrained — warm and low-contrast, not flashy. Live on the guest `WelcomeScreen`
(hero glow, warm sheet background, gradient CTA); roll the CTA + warm background out to the
other screens as they're touched.

---

## Reference screen

Guest onboarding (`components/guest/WelcomeScreen.tsx`): logo chip (top) → one large
full-bleed hero photo in a rounded frame (with `hero-glow` + "REVELADO · 09:41" stamp) →
bottom block on warm gradient: "Boda de" eyebrow, couple name (Fraunces italic, gold
ampersand), date, champagne-gradient CTA.

---

## Changelog

- **2026-07-10** — Direction *Revelado* confirmed. Swapped Cormorant Garamond → **Fraunces**.
  Added focus-frame **logo** (`Logo.tsx`) to guest welcome + organizer landing.
- **2026-07-10** — Refined logo (reticle mark + two-tone wordmark). Added **colorway** system
  (`LogoMark` / `Logo` / `AppIcon`, tones ink/champagne/paper) — the playful "brand changes
  color" concept. Introduced **gradient** utilities and applied them on the guest welcome.
