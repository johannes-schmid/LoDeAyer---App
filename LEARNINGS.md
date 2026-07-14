# LEARNINGS

Running log of mistakes, gotchas, and their fixes so we don't repeat them.
**Read this at the start of every session.** Append a new row after any surprising problem or fix.

Format: what went wrong (or what we learned) → the fix / rule to follow.

---

## Environment & tooling

- **pnpm 11 requires Node 22.13+, this machine has Node 20** → corepack activating `pnpm@latest`
  crashed (`ERR_UNKNOWN_BUILTIN_MODULE node:sqlite`). Fix: pinned **pnpm 9.15.9**
  (`packageManager` field + `corepack prepare pnpm@9.15.9 --activate`). Don't bump pnpm past 9.x
  until Node is upgraded to 22.
- **Node 20 is on borrowed time.** `@supabase/supabase-js` and pnpm 11 both warn/require Node 22+.
  Plan a Node 22 upgrade; when done, we can move to pnpm 11.
- **Expo + pnpm needs `.npmrc` with `node-linker=hoisted`** (we also set `shamefully-hoist=true`).
  Without it, Metro/React Native can't resolve hoisted deps. Keep this file.
- **Every route 500s locally without Supabase env** → `proxy.ts` (middleware) calls
  `createServerClient` on every request and throws `Your project's URL and Key are required` when
  `NEXT_PUBLIC_SUPABASE_URL` / `..._ANON_KEY` are unset (e.g. a fresh clone with no `.env.local`).
  This is env, not a code bug. To smoke-test UI without a real project, run dev with dummy values:
  `NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=demo pnpm dev:web`.

## Supabase local (Docker)

- **Running a second local Supabase project alongside another one on the same machine** (this
  machine already had a `knm-website` stack on the default ports) requires a unique `project_id`
  in `supabase/config.toml` (container names are `supabase_<service>_<project_id>`) **and** a full
  custom port block — `[api]`, `[db]` (+ `shadow_port`, `[db.pooler]`), `[studio]`, `[inbucket]`,
  `[analytics]`. We used `55321/55322/55320/55329/55323/55324/55327` for LoDeAyer (`knm-website`
  keeps the 543xx defaults). Verified both `docker ps` simultaneously with no port conflicts.
- **`supabase start` does NOT error on a missing `env(...)` value** — e.g.
  `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID` unset just leaves the literal string
  `env(SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET)` unsubstituted; Google auth simply won't work until a
  real client id/secret is provided (confirmed via the `/auth/v1/authorize?provider=google` redirect
  showing the unsubstituted placeholder in the query string). No fatal error either way — don't
  assume "it started" means the provider is configured.
- **CLI warns `environment variable is unset`** for each missing `env(...)` reference at every
  `supabase status`/`supabase start` call — expected noise until real secrets are added to
  `supabase/.env` (git-ignored; copy from `supabase/.env.example`).
- **New API key format**: `supabase status -o env` now prints `PUBLISHABLE_KEY`/`SECRET_KEY` (new
  Supabase API keys) alongside the legacy JWT-style `ANON_KEY`/`SERVICE_ROLE_KEY`. Next.js
  `@supabase/ssr` still wants the legacy `ANON_KEY` JWT for `NEXT_PUBLIC_SUPABASE_ANON_KEY` — use
  that one, not `PUBLISHABLE_KEY`.
- **A stale `next dev` process from a previous session can silently keep serving port 3000** even
  after code changes (turbo's own `pnpm dev:web` just fails with "Another next dev server is
  already running" and picks 3001 instead). Check `ps -p <pid>` and the existing
  `.next/dev/logs/next-development.log` before assuming curl output reflects current code — the
  stale server does eventually pick up `.env.local`/file changes via its own watcher, but only
  after the fact.

## Monorepo

- **Latest Expo template is SDK 57, not 56** (the ecosystem moved). `create-expo-app@latest` pulls
  `expo-template-default@sdk-57`. Always let the CLI pick versions rather than hand-pinning Expo deps.
- **`create-expo-app` still prompts** about git init even inside an existing repo. Ran with
  `--no-install`; the prompt was harmless (no stray `.git` created). Verify no nested `.git` after.
- **Align React versions across apps** for pnpm hoisting. Native template shipped `react@19.2.3`;
  web had `19.2.4`. Pinned web to `19.2.3` so hoisting doesn't create a dual-React conflict (RN is
  strict about a single React). When bumping React, bump both `apps/web` and `apps/native` together.
- **Metro monorepo config is explicit.** `apps/native/metro.config.js` sets `watchFolders` to the
  workspace root and `resolver.nodeModulesPaths` to app + root `node_modules`. Keep it.
- **`@lodeayer/shared` resolves via `workspace:*`** and is bundled directly from source
  (`packages/shared/src/*.ts`) by both Next (verified: build OK) and Metro (verified: expo export
  bundled `../../packages/shared/src/index.ts`). No build step needed for the package.

## Next.js Server Actions

- **Passing a `File` (e.g. an image) as a direct argument to a `"use server"` action hits Next's
  default ~1MB Server Action body limit** (`Body exceeded 1 MB limit`, thrown by
  `react-server-dom-turbopack`) — a banner upload of a few MB fails with a 500 even though the
  Storage bucket itself has no such limit. Fix: never pass large `File`/`Blob` values through a
  server action. Upload directly from the client (`createClient()` browser client →
  `supabase.storage.from(bucket).upload(...)`, already authenticated via the session cookie) and
  pass only the resulting public URL **string** into the server action for the DB insert.

## TypeScript

- **Native `tsc` fails on `*.css` / `*.module.css` imports** unless `apps/native/expo-env.d.ts`
  exists (it provides `/// <reference types="expo/types" />` which declares CSS modules). This file
  is gitignored and normally generated by `expo start`; `expo export` does NOT create it. If native
  typecheck complains about CSS modules, recreate `expo-env.d.ts` with that reference.
- Softened the shared `base.json` tsconfig: removed `verbatimModuleSyntax` and
  `noUncheckedIndexedAccess` — they broke the existing prototype screens. Keep `strict: true`.

## Image handling

- **HEIC/HEIF (default iPhone photo format) can't be rendered by `<img>`/canvas in Chrome, Firefox,
  or Android** — only Safari decodes it natively. Any upload flow that shows a preview or does
  `FileReader.readAsDataURL` needs to convert HEIC → JPEG client-side first, or guests uploading
  straight from their iPhone camera roll get broken image previews. Fix: `apps/web/lib/heic.ts`
  (`toDisplayableImage`) detects HEIC by MIME type + `.heic`/`.heif` extension and converts via
  `heic2any` (dynamically imported — it's a client-only WASM lib, don't import it at module scope in
  a file that could be SSR'd). Wired into `CarreteScreen.tsx` (guest photo upload) and
  `CreateStepBanner.tsx` (organizer banner upload) before the file touches `FileReader` or Supabase
  Storage. Also widen `<input accept>` to `image/*,.heic,.heif` — some browsers don't map the HEIC
  MIME type into `image/*`.

## Guest route data wiring

- **`/evento/[slug]` was a pure client component that never fetched the event row** — every real
  guest saw the same hardcoded demo content (Ana & Carlos, Pexels stock banner) regardless of which
  wedding's QR code they scanned, because the organizer's uploaded `banner_url`/`partner1`/`partner2`
  /`city`/`event_date` were never read from Supabase. Fixed by splitting into a server `page.tsx`
  (fetches `events` by `slug`, mirrors the pattern in `app/organizer/evento/[id]/page.tsx`) that
  passes real data into a new client component `EventoClient.tsx` (the old page.tsx, renamed).
  `events_anon_select_active` RLS policy (`supabase/migrations/0001_init.sql`) allows anon `select`
  only where `status = 'active'` — new events default to `status = 'active'`, so this works without
  a service-role bypass.
- **`/evento/demo` is not a real slug in the DB** — it's served by the same `[slug]` dynamic route
  and must be special-cased in `page.tsx` (`if (slug === "demo") return <EventoClient .../>` with
  no DB fetch) or it 404s. Mirrors how `/organizer/demo` is its own standalone hardcoded page.
- Verified end-to-end against local Supabase: inserted a real `events` row via the REST API
  (service-role key, since organizer signup wasn't driven through the UI), confirmed
  `curl http://localhost:3000/evento/<slug>` returns the row's banner image URL and partner names
  in the SSR'd HTML, then deleted the test row.

## Verification wins (how we confirm things actually work)

- **Web:** `pnpm --filter web build` (Turbopack, typechecks too) + curl routes on the dev server.
  Verified `/organizer` 200, `/evento/demo` 200, `/` → 307 → `/organizer`. No landing/demo routes.
- **Native (no simulator handy):** `npx expo export --platform web` exercises Metro + monorepo
  resolution and catches config errors without a device. Passing typecheck + a clean export ≈ boots.

---

## Historical (pre-monorepo, from the old success/failure log)

- **2026-06-21** Static HTML pages were blank — Babel JSX runtime issue. Fixed by moving to Next.js.
- **2026-06-21** Decision: merge two landing-page angles into one product.
- **2026-06-22** Migrated all work to a Next.js app; deleted static HTML. Full guest flow (7 screens)
  and organizer flow (8 screens) built in React/Tailwind.
- **Local dev gotcha:** `npx serve --single` redirects everything to index — breaks clean-URL
  routing. Don't use it; use the framework dev server.
- **2026-07-10** Restructured into an app-only pnpm + Turborepo monorepo (`apps/web`, `apps/native`,
  `packages/*`). Deleted the marketing website (moved to its own repo). Kept guest + organizer screens.
