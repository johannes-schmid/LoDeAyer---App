# LoDeAyer — Host Onboarding & Event Setup (First Flow) + Supabase Backend

## Context

LoDeAyer's organizer flow is currently a **fully mocked, single client-side state machine**
(`apps/web/app/organizer/page.tsx`) — 8 screens rendered from local React state, zero
persistence, no auth, no backend. The `@lodeayer/shared` package has domain types + a Supabase
client factory but **nothing is wired**: no env vars, no migrations, no schema, no auth.

This build turns the **first swimlane of the user story map — "Set up the Event" (host) +
the "get started" part of "Distribute Access"** — into a real, persisted product:

> Host signs in → creates an event (couple, date, reveal time, upload rules, reward, banner) →
> lands on a real dashboard with a shareable guest link + downloadable QR poster.

It also stands up the **Supabase backend for the whole project** (full schema, RLS, storage),
even though only the event-setup tables are written to in this milestone. Later milestones
(guest upload, curation, reveal/voting, winner) build on the same schema.

### Decisions locked with the user
- **Host auth**: Google OAuth via Supabase Auth (Gmail login). Guests stay no-account (later).
- **Payment**: deferred. Events are created free; `payment_status` defaults to `unpaid`.
  Single flat price shown as info only (no Stripe this milestone). Validate pricing with real
  couples first.
- **Distribution**: real per-event guest link (`/evento/[slug]`) + real generated, downloadable
  QR poster + "compartir por WhatsApp" (wa.me prefilled). Automated WhatsApp bulk invites/
  reminders deferred (needs WhatsApp Business API).
- **Banner**: include couple-photo upload + preview; store in a Supabase Storage bucket.

### Hard constraints
- `apps/web` is **Next.js 16** (App Router, Turbopack, React 19). APIs differ from older Next —
  **before writing any server code (server actions, route handlers, cookies, middleware), read
  the relevant guide in `apps/web/node_modules/next/dist/docs/`** (per `apps/web/AGENTS.md`).
- pnpm 9.15.9 pinned, Node 20. Do **not** run `npm install`. Add deps with
  `pnpm --filter web add ...`.
- Design system is fixed ("Revelado" — dark ink `#0b0b0c`, champagne `#d9b98a`, Fraunces serif,
  Spanish copy). Reuse existing component styling; don't restyle.
- Global rule: don't add scope beyond the above; confirm before extra files/migrations.

---

## Database schema (Supabase Postgres)

Design the **full** project schema now (so later milestones need no re-architecting); this
milestone only writes to `profiles`, `events`, and the `event-banners` storage bucket.

Delivered as `supabase/migrations/0001_init.sql` (new `supabase/` dir at repo root). User runs it
by pasting into the Supabase SQL Editor (or `supabase db push` if they use the CLI).

**Tables**

- `public.profiles` — 1:1 with `auth.users`. `id uuid pk references auth.users(id) on delete
  cascade`, `full_name`, `email`, `whatsapp`, `created_at`. Auto-populated by an
  `on_auth_user_created` trigger (standard Supabase pattern).
- `public.events` — the core row.
  - `id uuid pk default gen_random_uuid()`, `host_id uuid not null references auth.users(id)`
  - `slug text unique not null` (used by guest URL `/evento/[slug]`; generated from couple names
    + short random suffix)
  - `partner1 text not null`, `partner2 text not null`
  - `event_date date`, `reveal_at timestamptz`
  - `venue text`, `city text`
  - `max_photos_per_guest int not null default 20`, `unlimited_photos bool not null default false`
  - `moments text[] not null default '{}'`
  - `reward_type text check (reward_type in ('flowers','sweets','liquor','custom','none'))`,
    `reward_label text`
  - `banner_url text`
  - `allow_sharing bool not null default true`, `voting_open text default 'guests' check (voting_open in ('guests','anyone'))`
  - `status text not null default 'active' check (status in ('draft','active','revealed','archived'))`
  - `payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid'))`
  - `created_at timestamptz default now()`, `updated_at timestamptz default now()` (+ update trigger)
- `public.guests` — (later milestone) `id`, `event_id fk`, `name`, `whatsapp`, `created_at`;
  `unique(event_id, whatsapp)`.
- `public.photos` — (later) `id`, `event_id fk`, `guest_id fk`, `storage_path`, `moment`,
  `approved bool default false`, `is_contest_entry bool default false`, `created_at`.
- `public.votes` — (later) `id`, `event_id fk`, `photo_id fk`, `guest_id fk`, `created_at`;
  `unique(event_id, guest_id)` (one contest vote per guest).

**RLS (enable on all tables)**
- `profiles`: owner can `select`/`update` where `id = auth.uid()`.
- `events`: host full CRUD where `host_id = auth.uid()`; **anon `select`** limited to
  `status = 'active'` (guest flow reads event by slug — public-safe columns only).
- `guests`/`photos`/`votes`: host can read rows for events they own; anon insert policies added in
  the guest-upload milestone (baseline: host-read only for now).

**Storage buckets** (created in the migration via `storage.buckets` + policies)
- `event-banners` — **public read**; authenticated host can insert/update objects under their own
  event path. Used this milestone.
- `event-photos` — **private**; wired in the guest-upload milestone.

---

## Web integration

### Dependencies (add to `apps/web`)
- `@supabase/supabase-js` and `@supabase/ssr` (cookie-based auth for the App Router).
- `qrcode` (server/client QR generation for the downloadable poster) — or `qrcode.react` for
  display; pick during execution based on the poster-download approach.

### Env (`apps/web`)
- Add `.env.local` (values provided by user — do not commit) and `.env.example` (committed):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
  `NEXT_PUBLIC_SITE_URL` (for OAuth redirect + guest links). Service-role key only if a server
  admin op needs it (avoid this milestone).

### Supabase client wiring (new files)
- `apps/web/lib/supabase/client.ts` — browser client (`createBrowserClient` from `@supabase/ssr`).
- `apps/web/lib/supabase/server.ts` — server client (`createServerClient`, Next 16 `cookies()`).
- `apps/web/middleware.ts` — session refresh (per `@supabase/ssr` Next.js guide).
- `apps/web/app/auth/callback/route.ts` — OAuth code-exchange callback.
- (Prefer wiring through `@lodeayer/shared`'s `createSupabaseClient` where it fits; the SSR
  helpers may need direct `@supabase/ssr` calls — acceptable.)

### Routing (convert host-setup portion to real routes; leave later-milestone mocks as demo)
- `apps/web/app/organizer/page.tsx` → **real entry**: renders `OrgLanding`; "Crear mi evento"
  triggers Google sign-in if unauthenticated, else routes to `/organizer/nuevo`. If the host
  already has events, show a simple "mis eventos" list linking to each dashboard.
- `apps/web/app/organizer/nuevo/page.tsx` → **create wizard** (client): keeps the existing
  step state machine (Step1 → Step2 → Step3 → **new Banner step**); on confirm calls a
  `createEvent` server action → redirects to `/organizer/evento/[id]`.
- `apps/web/app/organizer/evento/[id]/page.tsx` → **real dashboard** (server component): fetches
  the event (RLS-scoped to host), renders `OrgDashboard` with real event name, reveal time,
  guest link, and QR. Guest/photo/activity feeds stay mocked until later milestones.
- `apps/web/app/organizer/demo/page.tsx` → move the **current** all-in-one mock state machine
  here so `curation`/`gallery`/`prize` stay reachable/demoable without breaking anything.
- Server action `createEvent` (e.g. `apps/web/app/organizer/nuevo/actions.ts`): validates input,
  slugifies couple names, uploads banner to `event-banners`, inserts the `events` row under
  `auth.uid()`, returns the new id. Read Next 16 server-action docs first.

### Component changes (reuse existing styling)
- `CreateStep1.tsx`: parametrize `StepBar` to N segments (currently hardcoded `[0,1,2]`) so it
  supports the 4-step wizard. No field changes.
- `CreateStep2.tsx`: **replace the free-text prize `Input`** with a **reward catalog picker**
  (FR-4): Flores / Dulces / Licor chips (+ optional "Otro" custom text). Store as
  `reward_type` + `reward_label`. Keep max-photos, moments, voting, sharing controls.
- `CreateStep3.tsx`: **remove the 3-tier `PLANS`**; show a **single flat price** as info only and
  a summary. CTA becomes "Crear evento" (drop "y pagar"), calls the wizard's confirm. (FR-2)
- **New** `CreateStepBanner.tsx`: couple-photo file input + live preview reusing the guest
  `WelcomeScreen` hero framing. Passes a `File` up to the wizard for upload on confirm.
- `OrgDashboard.tsx`: accept real event props; render the **real** guest link
  (`${SITE_URL}/evento/${slug}`), a **real QR** for that link, a working **"Descargar QR"**
  (print-ready poster download), and **"Compartir por WhatsApp"** via `wa.me` prefilled. Replace
  the hardcoded reveal card with the event's `reveal_at`. Keep mock stat tiles/feeds for now.

---

## Milestones (write to a repo `ROADMAP.md` as the running to-do file)

First execution step: create `ROADMAP.md` at repo root with checkboxes for the whole project so
work proceeds milestone-by-milestone. This build delivers **M0 + M1 + M2**.

- **M0 — Backend foundation** (this build): `supabase/migrations/0001_init.sql` (full schema +
  RLS + triggers + storage buckets); env vars + `.env.example`; Supabase client/server/middleware
  wiring; Google OAuth + callback. ✔ when a host can sign in and a session persists.
- **M1 — Event creation** (this build): wizard routed at `/organizer/nuevo`, reward catalog,
  single-price step, banner upload, `createEvent` server action persisting to Supabase. ✔ when a
  created event exists in the DB and the host is redirected to its real dashboard.
- **M2 — Distribution / get started** (this build): real dashboard at `/organizer/evento/[id]`
  with guest link + downloadable QR poster + WhatsApp share. ✔ when the QR/link resolve to the
  event's guest URL.
- **M3 — Guest access & upload** (future): guest join via slug (phone + name, no account),
  camera-roll upload, client compression, quality filter, contest-entry pick, offline retry.
- **M4 — Curation** (future): host approve/reject per-guest, auto-sort by moment.
- **M5 — Reveal & voting** (future): reveal gate at `reveal_at`, simultaneous WhatsApp reveal,
  vote on contest entries, ranking.
- **M6 — Winner & reward + post-event** (future): ranked results, prefilled winner WhatsApp
  message, 30-day album access, share album link.
- **M7 — Payments & messaging infra** (future): Stripe one-time checkout, WhatsApp Business API
  (bulk invites, reminders, reveal, winner), Vercel Crons, analytics (Mixpanel/GA/Clarity/Sentry).

---

## Verification (per project self-check protocol)

1. **Migration**: after the user runs `0001_init.sql`, confirm tables/RLS/buckets exist (query
   `information_schema.tables`, `pg_policies`, `storage.buckets` via the SQL editor or a quick
   script with the service key).
2. **Typecheck/build**: `pnpm --filter web typecheck` and `pnpm --filter web build` (Turbopack).
3. **Drive the real flow** on `pnpm dev:web` (http://localhost:3000):
   - Google sign-in → session persists across refresh.
   - `/organizer/nuevo` → complete all 4 steps incl. banner → confirm.
   - Verify a new `events` row (correct `host_id`, `slug`, `reward_type`, `banner_url`) and the
     banner object in `event-banners`.
   - Redirect lands on `/organizer/evento/[id]`; QR + link resolve to `/evento/[slug]`;
     "Descargar QR" downloads a poster; WhatsApp share opens `wa.me` with prefilled text.
   - `curl` the routes for 200s; provide
     `open -a "Google Chrome" http://localhost:3000/organizer`.
4. **Log learnings**: append Next 16 / Supabase SSR / pnpm gotchas to `LEARNINGS.md`.

### Notes / flags
- A live-looking `PEXELS_API_KEY` is committed in the repo root `.env` — worth rotating/gitignoring
  (out of scope here, flagging).
- `@supabase/supabase-js` wants Node 22+; we're on Node 20 (works, watch for warnings — see
  `LEARNINGS.md`).
