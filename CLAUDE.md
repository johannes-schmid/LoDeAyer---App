# LoDeAyer — App (Monorepo)

> This repo is the **product app only**. The marketing website lives in a separate repo
> (`github.com/johannes-schmid/LoDeAyer`). Do not add marketing/landing pages here.

## Dev servers (hot reload)

Run everything from the **repo root**. Requires **Node 18+** (this machine: v20).
Package manager is **pnpm 9.15.9** (pinned via `packageManager` — do not run `npm install`).

```bash
# from repo root
pnpm install            # install all workspaces
pnpm dev                # run all apps (turbo)
pnpm dev:web            # Next.js web app only  -> http://localhost:3000
pnpm dev:native         # Expo dev server only  -> Expo Go / simulator
pnpm build              # build all
pnpm typecheck          # typecheck all
pnpm lint               # lint all
```

Open the web app in Chrome:
- Organizer flow: `open -a "Google Chrome" http://localhost:3000/organizer`
- Guest demo flow: `open -a "Google Chrome" http://localhost:3000/evento/demo`
- `/` redirects to `/organizer`.

---

## Mandatory self-check protocol (run after EVERY dev task)

Never declare work done without verifying it actually works. The rule is: **confirm what was
defined is really there and behaves, not just that code was written.**

1. **Typecheck/build** the affected workspace: `pnpm --filter <web|native> typecheck` (and `build`
   for web-facing changes).
2. **Drive the actual flow** — start the dev server and exercise the changed screen/route (curl the
   URL for web; for native, bundle via `npx expo export --platform web` or run the app). Use the
   `/verify` or `/run` skill for anything non-trivial.
3. **Report the real result**, including failures and command output. For web UI changes, always
   provide a direct `open -a "Google Chrome" http://localhost:3000/...` URL.
4. **Log learnings**: append anything new/surprising (a mistake + its fix, a version gotcha) to
   `LEARNINGS.md` so it isn't repeated. Read `LEARNINGS.md` at the start of a session.

---

## Directory map

```
LoDeAyer - App/                      # monorepo root
├── apps/
│   ├── web/                         # Next.js 16 (App Router, Turbopack) — guest + organizer flows
│   │   ├── app/
│   │   │   ├── page.tsx             # redirects → /organizer
│   │   │   ├── layout.tsx           # fonts + metadata
│   │   │   ├── globals.css          # Tailwind v4 + custom keyframes
│   │   │   ├── evento/[slug]/       # guest mobile flow (welcome→name→carrete→scan→success→vote→reveal)
│   │   │   └── organizer/           # couple flow (landing→create 1-3→dashboard→curation→gallery→prize)
│   │   └── components/
│   │       ├── guest/               # 7 guest screens
│   │       ├── organizer/           # 8 organizer screens
│   │       └── ui/                  # shadcn/ui primitives
│   └── native/                      # Expo SDK 57 + Expo Router (TypeScript). Currently the default
│                                    # template + a link to @lodeayer/shared. Real flows TBD.
├── packages/
│   ├── shared/                      # cross-platform, non-UI: domain types, Supabase client factory
│   │   └── src/{types.ts,supabase.ts,index.ts}
│   ├── typescript-config/           # base / nextjs / react-native tsconfig presets
│   └── eslint-config/               # shared eslint flat config
├── turbo.json                       # turbo task pipeline
├── pnpm-workspace.yaml
├── package.json                     # root scripts (turbo)
├── .npmrc                           # node-linker=hoisted (required for Expo + pnpm)
├── CLAUDE.md                        # this file
├── LEARNINGS.md                     # running log of mistakes + fixes — READ FIRST
└── Inspo/                           # design inspiration images
```

**Import conventions**
- Web: `@/*` → `apps/web/*` (existing alias).
- Shared code (both platforms): import from `@lodeayer/shared` (types, `createSupabaseClient`).
- Put cross-platform, non-UI logic in `packages/shared`. UI stays per-platform (web = Tailwind/DOM,
  native = React Native) — no forced cross-platform UI yet.

---

## Tech stack

| Layer | Tool |
|-------|------|
| Monorepo | pnpm workspaces + Turborepo |
| Web | Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, shadcn/ui |
| Native | Expo SDK 57 + Expo Router, React Native 0.86 |
| Shared | `@lodeayer/shared` — TS types + Supabase client factory |
| Database + Auth | Supabase (Postgres + Auth) — not yet wired |
| Storage | Supabase Storage (images) — not yet wired |
| Payments | Stripe (one-time per event) — not yet wired |
| Email / Notifications | Resend + WhatsApp API — not yet wired |
| Hosting | Vercel (web), EAS (native) |
| Path alias | `@/*` → `apps/web/*` |

### Not yet decided / deferred
- **NativeWind** (Tailwind for RN): deferred — v5 is preview-only (Tailwind v4 + pinned lightningcss).
  Add it when native UI work begins; until then native uses RN `StyleSheet`.
- **Node 22**: Supabase-js and pnpm 11 want Node 22+. We run Node 20 with pnpm 9.15.9. Upgrade Node to
  22 before it becomes blocking (see LEARNINGS.md).

---

## Product overview

**LoDeAyer** — web + mobile photo collection & sharing for weddings/events, for the Spanish-speaking
LatAm market (launch: Peru; expansion: Chile, Colombia).

**Core insight:** wedding photos are taken but never reach the couple — friction (app downloads,
accounts), WhatsApp compression, scattered across chats. The pro photographer delivers late and
misses spontaneous guest moments.

**The experience:** QR at each table → guest opens a web link (no app download) → enters name +
WhatsApp (no account) → uploads top photos → AI quality scan → next-day "Revelado" reveal via
WhatsApp → album organized by moment → couple curates → guests vote → winner gets a prize.

**Business model:** one-time payment per event (Prueba $0 / Fiesta $49 / Boda $89 / Boda Total $159).
Channels: direct (couples) + B2B (wedding planners, photographers).

> The tight "MVP checklist" framing is retired. Build toward the full product; **the user stories /
> flows drive feature work** and will be added here as they're defined.

---

## Working rules (from global + project)
- Look up official docs before building with any external service.
- Don't add features/abstractions/refactors beyond what's asked; confirm multi-file or schema changes.
- Ask before destructive git ops (commit/push/force).
- `apps/web` runs **Next.js 16** — APIs differ from older versions; check `apps/web/AGENTS.md`.
