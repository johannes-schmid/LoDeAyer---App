# LoDeAyer — Project CLAUDE.md

## Dev server
The project lives entirely in `lodeayer-app/`. All work happens there.

```bash
cd "/Users/johannesschmid/Desktop/Development Project/LoDeAyer/lodeayer-app"
npm run dev
```

> **Note:** Requires Node v18+. Use your terminal (not Claude's shell) if Claude's shell defaults to Node v14. Check with `node --version`.

Open in Chrome:
- Landing page: `open -a "Google Chrome" http://localhost:3000`
- Guest demo: `open -a "Google Chrome" http://localhost:3000/evento/demo`
- Organizer demo: `open -a "Google Chrome" http://localhost:3000/organizer`

---

## Directory map

```
lodeayer-app/
├── app/
│   ├── page.tsx                  # Marketing landing page
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── globals.css               # Tailwind + custom keyframes (scan-line, marquee)
│   ├── evento/[slug]/page.tsx    # Guest mobile flow (welcome → name → carrete → scan → success → vote → reveal)
│   └── organizer/page.tsx        # Couple flow (landing → create 1-3 → dashboard → curation → gallery → prize)
├── components/
│   ├── guest/
│   │   ├── WelcomeScreen.tsx     # Event hero + stats
│   │   ├── NameScreen.tsx        # Name + WhatsApp entry
│   │   ├── CarreteScreen.tsx     # Upload zone + film strip + top-20 hint
│   │   ├── ScanScreen.tsx        # Fake AI quality scan (nitidez, exposición, contenido)
│   │   ├── SuccessScreen.tsx     # Upload confirmed + shots remaining
│   │   ├── VoteScreen.tsx        # Vote for best photo grid
│   │   └── RevealScreen.tsx      # Morning reveal — winner + photo gallery by moment
│   ├── organizer/
│   │   ├── OrgLanding.tsx        # Couple sign-in / product overview
│   │   ├── CreateStep1.tsx       # Event info (names, date, venue, city, reveal time)
│   │   ├── CreateStep2.tsx       # Settings (max photos, moments, prize, voting rules, sharing)
│   │   ├── CreateStep3.tsx       # Plan selection + summary + pay CTA
│   │   ├── OrgDashboard.tsx      # Live stats + QR code + activity feed
│   │   ├── CurationScreen.tsx    # Photo curation grid (select/deselect for album)
│   │   ├── GalleryVoteScreen.tsx # Public gallery + per-photo voting + sharing
│   │   └── PrizeScreen.tsx       # Winner announcement + WhatsApp notify CTA
│   ├── landing/                  # Marketing landing page sections
│   └── ui/                       # shadcn/ui primitives
└── lib/                          # Utilities
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
- Enter name + WhatsApp → no account, no friction
- Upload top-20 photos during or after the event
- AI quality scan on each upload (blur, exposure, content check)
- Next-day "Revelado" — all photos revealed at once via WhatsApp
- Organized album by event moment (ceremony, cocktail, party)
- Couple curates the album before publishing
- Guests vote for best photo; winner gets a prize chosen by the couple
- Couple notifies winner via WhatsApp

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
- **Tiers:**
  - Prueba: $0 — up to 15 guests, 10 photos/person
  - Fiesta: $49 — up to 50 guests
  - Boda: $89 — up to 150 guests (recommended)
  - Boda Total: $159 — unlimited guests
- **Revenue channels**: Direct (couples), B2B (wedding planners / photographers as resellers)

---

## Tech stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| UI | React + Tailwind CSS v4 + shadcn/ui |
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
| Path alias | `@/*` → project root |
| Mobile (future) | Expo |

### Known constraints
- Images average ~10MB each; 200 guests × 20 photos ≈ 40GB per large wedding — storage cost is a key unit economic to track
- Supabase Storage confirmed viable; compression/optimization needed before storing
- Web-first (mobile browser) — no native app for MVP

---

## MVP scope (agreed)

1. Couple creates event (web) — 3-step form, plan selection
2. QR code / share link generated
3. Guests open link → enter name + WhatsApp → upload photos (no login)
4. AI quality scan per photo (client-side simulation; real AI in production)
5. WhatsApp reminders to upload (couple provides guest phone numbers)
6. Couple curates album — selects which photos go public
7. Reveal: next-day gallery unlocked, sent via WhatsApp
8. Guests vote for best photo; winner announced to group
9. Couple assigns prize → WhatsApp notification to winner
10. Couple + guests download album

**Not in MVP**: AI photo classification, live projection at event, video, face recognition grouping

---

## UI verification

After every UI change, verify at localhost:3000 in Chrome. Use Puppeteer if needed:

```bash
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 900 });
  await page.goto('http://localhost:3000/evento/demo');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });
  await browser.close();
})();
"
```

---

## Success / failure log

| Date | What happened |
|------|--------------|
| 2026-06-21 | Static HTML pages were blank — Babel JSX runtime issue. Fixed. |
| 2026-06-21 | Decision: merge two landing page angles into one product. |
| 2026-06-22 | Migrated all work to Next.js app (`lodeayer-app/`). Deleted static HTML files. Full guest flow (7 screens) and organizer flow (8 screens) built in React/Tailwind. |

---

## Next steps
1. Start dev server and verify both flows visually in browser
2. Wire up Supabase (schema: events, guests, photos, votes)
3. Add real file upload to Supabase Storage with client-side compression
4. Stripe payment integration on CreateStep3
5. WhatsApp API integration for reveal + winner notification
