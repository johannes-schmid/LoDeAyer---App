# LoDeAyer — Product Roadmap

Running to-do for the product build, tracked milestone by milestone. Check items off as they land.
Detailed plan for the current build: [`docs/plan-host-onboarding-and-backend.md`](docs/plan-host-onboarding-and-backend.md).

**Now building:** M0 + M1 + M2 (host onboarding → create event → get started). M0/M1/M2 are code-complete
locally except the two hosted-Supabase config steps and wiring real photo/guest stats into the
dashboard (blocked on M3). **Next up: M3 — guest access & upload**, the biggest remaining gap.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## M0 — Backend foundation (Supabase) 🟢 local done, hosted setup pending

- [x] Create `supabase/migrations/0001_init.sql` — full schema (`profiles`, `events`,
      `guests`, `photos`, `votes`), RLS on all tables, `updated_at` + `on_auth_user_created`
      triggers, storage buckets (`event-banners` public, `event-photos` private).
- [x] Local Docker Supabase stack (`supabase/config.toml`, project_id `lodeayer`, isolated ports
      55321-55327 so it runs alongside other local Supabase projects). `pnpm db:start` /
      `db:stop` / `db:reset` / `db:studio`. Migration applied and verified (tables, RLS policies,
      buckets all confirmed via psql).
- [ ] User runs the migration on the **hosted** project's SQL editor; verify tables/policies/buckets
      exist there too.
- [x] Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
      `NEXT_PUBLIC_SITE_URL` (`apps/web/.env.local` uncommitted, pointed at local Docker stack +
      `.env.example` committed).
- [x] Add deps to `apps/web`: `@supabase/supabase-js`, `@supabase/ssr`.
- [x] Wire clients: `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (server),
      `proxy.ts` (Next 16's renamed `middleware.ts` — session refresh).
- [x] Google OAuth wired: `app/auth/callback/route.ts` + `[auth.external.google]` in
      `supabase/config.toml` + minimal sign-in CTA on `/organizer`.
- [x] Google Cloud OAuth client created; client ID/secret added to `supabase/.env` (local,
      git-ignored). **Verified locally: host signs in with Google at `/organizer` and the session
      persists across refresh.**
- [ ] Add the same Google OAuth client ID/secret to the **hosted** project's Auth → Providers →
      Google settings (needed before this works in production/Vercel).
- **Done when:** a host can sign in with Google and the session persists across refresh —
      ✅ **confirmed working locally.** Hosted-project Google provider config still pending.

## M1 — Event creation (Set up the Event) 🟢 done

- [x] Route the create wizard at `/organizer/nuevo` (keep the step state machine).
- [x] `CreateStep1`: parametrize `StepBar` to N steps (currently hardcoded 3).
- [x] `CreateStep2`: replace free-text prize with reward catalog picker
      (Flores / Dulces / Licor + optional custom) → `reward_type` + `reward_label`. (FR-4)
- [x] `CreateStep3`: drop 3-tier plans → single flat price (info only), CTA "Crear evento". (FR-2)
- [x] New `CreateStepBanner`: couple-photo upload + preview (reuse WelcomeScreen hero). Now also
      converts HEIC/HEIF uploads to JPEG client-side (`lib/heic.ts`) so iPhone photos preview/upload
      correctly.
- [x] `createEvent` server action: slugify, upload banner to `event-banners`, insert `events`
      row under `auth.uid()`, redirect to `/organizer/evento/[id]`.
- [x] `/organizer` becomes real entry: landing + Google sign-in + "mis eventos" list (real Supabase
      query by `host_id`).
- **Done when:** a created event exists in the DB and the host lands on its real dashboard. ✅

## M2 — Distribution / get started 🟡 mostly done

- [x] `/organizer/evento/[id]` real dashboard (server component, RLS-scoped fetch of the `events` row).
- [x] Real guest link `${SITE_URL}/evento/${slug}` + copy-to-clipboard (`EventShareCard.tsx`).
- [x] Real generated QR + working "Descargar QR" (print-ready poster download via `window.print()`,
      `PosterPrintClient.tsx`).
- [x] "Compartir por WhatsApp" via `wa.me` prefilled message.
- [x] Real reveal card from `reveal_at`.
- [x] Move current mock all-in-one flow to `/organizer/demo` (keep curation/gallery/prize).
- [x] Guest welcome screen (`/evento/[slug]`) now fetches the real event row and shows the actual
      banner/couple names/city/date instead of hardcoded demo content. `/evento/demo` special-cased
      to keep working without a DB row.
- [ ] `OrgDashboard` stats (photo count, guest count, album/curation tabs) are still driven by an
      optional `demoData` prop that's never passed on the real `/organizer/evento/[id]` route — it
      always shows 0/0/0 there. **Blocked on M3** (no real photos/guests exist yet to count).
- **Done when:** the QR and link resolve to the event's guest URL `/evento/[slug]`. ✅ (dashboard
      stats wiring rolls into M3/M4 once photos exist)

---

## Future milestones

## M3 — Guest access & upload
> Decision: automated quality filter is **cut from MVP scope** (was FR-9) — always accept
> uploads; revisit only if real-world testing shows it's needed.
- [ ] Guest join via slug (phone + name, **no account**, no email). (FR-6, FR-7)
- [ ] Camera-roll upload + client-side compression. (FR-8, FR-9)
- [ ] Guest picks ONE photo for the contest pool. (FR-10)
- [ ] Offline queue + retry on poor venue WiFi. (NFR)

## M4 — Curation (host)
- [ ] Review incoming photos grouped per guest. (FR-13)
- [ ] Approve/reject individual photos before album visibility. (FR-14)
- [ ] Approved photos auto-sort into album by moment. (FR-15)

## M5 — Reveal & voting
- [ ] Album sealed until host `reveal_at`. (FR-16)
- [ ] Simultaneous reveal notification to all guests. (FR-17)
- [ ] Guests vote on contest entries only; rank by votes. (FR-18, FR-19)

## M6 — Winner & reward + post-event
- [ ] Host sees ranked results (1st–3rd). (FR-20)
- [ ] Prefilled, host-editable WhatsApp message to winner (not auto-sent). (FR-21)
- [ ] 30-day guest album access + share complete album link. (FR-22, FR-23)

## M7 — Payments & messaging infrastructure
- [ ] Stripe one-time checkout (single flat price) — gate event activation. (FR-2)
- [ ] WhatsApp Business API: bulk invites, reminders, reveal, winner notification. (FR-11, FR-17)
- [ ] Vercel Crons: reveal scheduling + reminder jobs.
- [ ] Analytics: Mixpanel, Google Analytics, Microsoft Clarity, Sentry.

---

## Open risks (from interviews / PDF §7)
- **Guest adoption** is the #1 risk — table QR alone is weak; "content captains" may need to ship
  earlier than planned. Pilot (M3+) exists to pressure-test this.
- **Pricing unvalidated** with couples directly — why payment is deferred to M7.
- **Quality-filter tuning** — too aggressive risks rejecting sentimental shots.
- **Moment-gating** — MVP defaults to fully open uploads; confirm with a real multi-phase wedding.
