# LoDeAyer — Design Directions

**3 complete HTML previews for user testing in Peru.**
Open each directly in Chrome from `file://` — no build step.

---

## What we're building

One merged landing page that combines:
- **Angle A** (problema.html): "Your photos are trapped in guests' phones"
- **Angle B** (experiencia.html): "Disposable camera ritual + El Revelado"

**Decision:** Album collection is the core promise. El Revelado is a toggleable feature, not a separate product. Both angles appear on every direction.

---

## Shared design system

| Token | Value |
|-------|-------|
| Background | `#0b0b0c` (ink) |
| Surface | `#141416` (smoke) |
| Text | `#f4efe7` (paper) |
| Accent | `#d9b98a` (champagne) |
| Serif | Fraunces (Google Fonts) |
| Sans | Inter |
| Grain | SVG fractal noise overlay, opacity 3.5% |

**Photos:** Real Latin American wedding photos via Pexels API. Hotlinked from CDN. Attribution: "Fotos: Pexels" in every footer (required by Pexels terms).

**Lead capture (all directions):** Every CTA opens an email + name modal. WhatsApp secondary option. Posts to Formspree placeholder (swap for Supabase/Resend in production).

---

## The 3 directions

### A — Editorial Noir
`direction-a.html`

**Vibe:** Premium wedding magazine. Dark, timeless, romantic. Inspired directly by OnePhoto's design language.

**What it does well:**
- Most natural evolution of the current LoDeAyer look
- Full-bleed hero photo with gradient mask feels cinematic
- Fraunces italic + champagne accents = unmistakably premium
- Conservative — won't alienate any demographic

**Risk:** May feel familiar / not distinctive enough in a competitive market

**Best for:** Couples who found you via Instagram and already know the aesthetic

---

### B — Film / Carrete
`direction-b.html`

**Vibe:** Disposable camera ritual elevated. Contact-sheet grids, scattered Polaroids, film-sprocket details, date-stamp monospace labels. WhatsApp-green glow for the Revelado moment.

**What it does well:**
- Makes the "carrete + revelado" ritual the hero — strongest product differentiation
- Emotionally resonant: nostalgia + surprise + ritual = shareability
- WhatsApp green in Revelado section creates a memorable, recognizable moment
- Polaroid aesthetic translates well in Latin American markets

**Risk:** More opinionated — some couples may want "clean and modern"

**Best for:** The viral/word-of-mouth play; couples who love the film camera vibe

---

### C — Modern Product
`direction-c.html`

**Vibe:** 2026 SaaS confidence. Bold Inter 800 headlines, phone mockups with real photos inside, bento-grid mosaic, dotted-grid texture accents. Looks like it belongs next to Linear or Vercel.

**What it does well:**
- Most trustworthy for the tech-skeptical buyer ("this is a real product")
- Bento photo grid immediately communicates "look at all these moments"
- Large outcome-focused stats (75-85% participation) front and center
- Easiest to add app screenshots later when the real product ships

**Risk:** Least emotionally warm — weddings are an emotional decision

**Best for:** Scaling via paid ads; wedding planners / B2B channel

---

## Recommendation

**Test B (Film/Carrete) as the primary, with A as the safe fallback.**

Reason: The carrete + revelado ritual is LoDeAyer's most differentiated feature vs. generic "upload your photos" competitors. B makes that ritual the entire emotional story of the landing page. If it resonates in Peru, you have a genuine brand identity; if it doesn't, pivot to A (same tokens, lower-risk).

C is the right direction when you start paid acquisition at scale — leads with outcome metrics, converts better with colder audiences.

---

## Section flow (all three directions)

```
Nav (fixed)
Hero (photo + headline + CTA)
Use-case chips (Bodas · Quinceañeras · Cumpleaños · Aniversarios)
El problema (4 pain cards)
Cómo funciona (3 steps)
El Revelado (WhatsApp chat mockup)
Lo que no viste (guest POV, 3 photo cards)
Sin app (10-15% vs 75-85% stats)
Lo que recibes (album feature list)
Precios (4 tiers: $0 / $49 / $89 / $159)
FAQ (6 questions, accordion)
Closing CTA + wedding planner partner block
Footer (logo · links · "Fotos: Pexels")

Floating: QR widget (desktop) + Lead capture modal
```

---

## Pricing tiers (final)

| Tier | Price | Guests | Key differentiator |
|------|-------|--------|-------------------|
| Prueba | $0 | 15 | Try before you buy |
| Fiesta | $49 | 50 | Birthdays, quinceañeras |
| Boda | $89 ⭐ | 150 | Recommended for weddings |
| Boda Total | $159 | Unlimited | No limits |

---

## Next step

1. Open all 3 in Chrome, compare at desktop + mobile
2. Pick a direction (or elements to merge)
3. Build chosen direction in Next.js + shadcn + deploy to Vercel for Peru test
4. Wire: Supabase lead capture, Resend email, Mixpanel, Microsoft Clarity

```bash
open -a "Google Chrome" "/Users/johannesschmid/Desktop/Development Project/Photo_App/direction-a.html"
open -a "Google Chrome" "/Users/johannesschmid/Desktop/Development Project/Photo_App/direction-b.html"
open -a "Google Chrome" "/Users/johannesschmid/Desktop/Development Project/Photo_App/direction-c.html"
```
