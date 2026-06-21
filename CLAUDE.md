# LoDeAyer — Project CLAUDE.md

## Dev server
No dev server — static HTML files opened directly in Chrome.
```
open -a "Google Chrome" "/Users/johannesschmid/Desktop/Development Project/Photo_App/experiencia.html"
open -a "Google Chrome" "/Users/johannesschmid/Desktop/Development Project/Photo_App/problema.html"
```

---

## Directory map
```
Photo_App/
├── problema.html     # Landing page v1 — "El problema" angle (photo sharing pain)
├── experiencia.html  # Landing page v2 — "La experiencia" angle (disposable camera / revelado)
└── CLAUDE.md
```

---

## Product overview

**LoDeAyer** — a web-based photo collection and sharing platform for weddings and events, built for the Latin American (Spanish-speaking) market.

**Core insight from research:**
- Photos are taken at weddings but never reach the couple
- Guests don't share because it's too much friction (downloading apps, setting up accounts)
- WhatsApp compresses photos to low quality
- Photos are scattered across different chats, phones, platforms
- The professional photographer delivers 2 months later and only captures their own POV
- Spontaneous guest moments are lost forever

**The solution:**
- QR code at each table → guests open a web link (no app download)
- Enter name only → no account, no friction
- Upload photos during or after the event (30-day window)
- Next-day "Revelado" — all photos revealed at once via WhatsApp
- Organized album by event moment (ceremony, cocktail, party)
- Gamification: points per photo uploaded, vote for best photo, winner announced
- Couples control: review and approve before album is finalized

---

## Two concepts now merged into one product

**Concept A — Sharing/collection** (`problema.html`):
- Emphasis on solving the "photos never arrive" problem
- Album organized by moment, download in one click
- Works like a structured collection tool

**Concept B — Disposable camera / Revelado** (`experiencia.html`):
- Limited shots per person (carrete, 10–30 configurable)
- Film aesthetic, surprise reveal next morning
- Sealed until reveal time chosen by the couple

**Decision: Merge both into one final landing page.** Research best practices for combining the two angles. The Revelado experience is a toggleable feature, not a separate product.

---

## Market & positioning

- **Primary market**: Peru (launch market)
- **Expansion**: Chile, Colombia
- **Language**: Spanish only for now
- **Audience**: Engaged couples (primary buyer), wedding planners (B2B channel)
- **Competitors**: POV, Lenz, Disposable, OnFilm — all US-based, some with Spanish listings. No native LatAm product.
- **Key differentiator**: No app download, WhatsApp-native flow, LatAm-focused, film/revelado ritual

---

## Business model

- **One-time payment per event** (not subscription)
- **Target pricing**: ~$30–$89 per event (competitor benchmark: ~$30)
- **Tiers shown on pages** (draft, may adjust):
  - Prueba: $0 — up to 15 guests, 10 photos/person
  - Fiesta: $49 — up to 50 guests
  - Boda: $89 — up to 150 guests (recommended)
  - Boda Total: $159 — unlimited guests
- **Revenue channels**: Direct (couples), B2B (wedding planners / photographers as resellers)

---

## Tech stack

### Current state (landing pages)
Static HTML + Tailwind CDN + React via Babel in-browser. Temporary — move to the stack below when building the real product.

### Target stack (default)
| Layer | Tool |
|-------|------|
| Framework | Next.js (App Router) |
| UI | React + Tailwind CSS + shadcn/ui |
| Database + Auth | Supabase (Postgres + Supabase Auth) |
| Storage | Supabase Storage (images) |
| Hosting | Vercel (frontend + API routes) |
| Payments | Stripe (one-time per event) |
| Email | Resend (transactional + reminders) |
| Notifications | WhatsApp API (primary), Resend email (fallback) |
| Background jobs | Vercel Crons (reveal scheduling, reminder sends) |
| Analytics | Mixpanel (product) + Google Analytics (traffic) |
| Session recording | Microsoft Clarity |
| Error tracking | Sentry |
| Path alias | `@/*` → project root (`jsconfig.json`) |
| Mobile (future) | Expo |

### Known constraints
- Images average ~10MB each; 200 guests × 20 photos ≈ 40GB per large wedding — storage cost is a key unit economic to track
- Supabase Storage confirmed viable; compression/optimization needed before storing (use squash or equivalent)
- Web-first (mobile browser) — no native app for MVP; App Clips and Android instant apps explored but deprioritized

---

## MVP scope (agreed)

1. Couple creates event (web)
2. QR code / share link generated
3. Guests open link → enter name → upload photos (no login)
4. WhatsApp reminders to upload (couple provides guest phone numbers)
5. Reveal: next-day gallery unlocked, sent via WhatsApp
6. Guests vote for best photo; winner announced to group
7. Couple reviews → approves final album → download

**Not in MVP**: AI photo classification, live projection at event, video, face recognition grouping

---

## UI verification — screenshot loop

After every UI change, verify visually using Puppeteer before reporting done. Run this pattern:

```bash
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000'); // or file:// path for static HTML
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to /tmp/screenshot.png');
})();
"
```

Then read `/tmp/screenshot.png` to visually confirm the change looks correct. Repeat after each meaningful change — do not declare done without having seen a screenshot. For static HTML files use `file:///absolute/path/to/file.html` as the URL.

Install Puppeteer if not present: `npm install puppeteer`

---

## Success / failure log

| Date | What happened |
|------|--------------|
| 2026-06-21 | Both HTML pages were blank — Babel's new default JSX runtime emits `import` statements, crashing in a plain `<script>` tag. Fixed by registering a `react-classic` preset and pointing `text/babel` at it. |
| 2026-06-21 | Decision made: merge two landing pages into one final page. |

---

## Next steps
1. Research best practices for combining "problem-agitation" + "experience/ritual" angles on a single landing page
2. Build merged final landing page
3. Share with target audience in Peru for feedback
4. Begin MVP build (Supabase + Next.js)
