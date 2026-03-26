# Next Steps

_Last updated: 2026-03-25_

---

## Immediate / Resume Here

- [ ] **Implement client flow** per `docs/DESIGN.md` — white room, gate (typewriter + Yes/No, ≥3/4), denied, logo, **yellow hold** + email variant, funnel tracking.
- [ ] **Verify latest deploy** on https://4-tp.vercel.app after gate work lands.
- [ ] **Verify `49dc1fd` deploy is READY** — confirm Vercel deployed the eyebrow + caption fix to production. Check https://4-tp.vercel.app on a real mobile device.
- [ ] **Mobile smoke test** — confirm: (1) eyebrow "Education · Inspiration · Discipline · Innovation" all on one line, no clipping; (2) "JOIN THE NETWORK — BE FIRST TO KNOW" caption is clearly readable; (3) no horizontal scroll; (4) form stacks vertically on narrow screens.
- [ ] **Verify email subscribe flow end-to-end** — submit a test email on https://4-tp.vercel.app, confirm Supabase insert and Resend confirmation delivery.
- [ ] **Decide on `4TPCirclePppl.png`** — either remove from `/public` (unused), or source a clean version without baked-in text for future use.

---

## Design / UX

- [ ] Gate + yellow email (see `docs/DESIGN.md`) — primary; old “add sections below hero” is **post–Phase 1** unless client asks.
- [ ] Review Nav after gate ships — links when real destinations exist.

---

## Infrastructure / Reliability

- [ ] Add lightweight smoke test for `/api/subscribe` (valid email, duplicate email, invalid email).
- [ ] Add production monitoring or alerting on Supabase subscriber inserts.
- [ ] Confirm custom domain configuration if planned (beyond `4-tp.vercel.app`).

---

## Backlog

- [ ] Refactor HTML email template in `/api/subscribe/route.ts` into a separate template module.
- [ ] Add periodic architecture/context refresh after major milestones.
- [ ] Explore adding a `robots.txt` and sitemap for SEO readiness.

---

## Blockers

- None currently. Deployment is live and verified.
