# Next Steps

_Last updated: 2026-03-20 (Session 7)_

---

## Immediate / Resume Here

- [ ] **Verify `49dc1fd` deploy is READY** — confirm Vercel deployed the eyebrow + caption fix to production. Check https://4-tp.vercel.app on a real mobile device.
- [ ] **Mobile smoke test** — confirm: (1) eyebrow "Education · Inspiration · Discipline · Innovation" all on one line, no clipping; (2) "JOIN THE NETWORK — BE FIRST TO KNOW" caption is clearly readable; (3) no horizontal scroll; (4) form stacks vertically on narrow screens.
- [ ] **Verify email subscribe flow end-to-end** — submit a test email on https://4-tp.vercel.app, confirm Supabase insert and Resend confirmation delivery.
- [ ] **Decide on `4TPCirclePppl.png`** — either remove from `/public` (unused), or source a clean version without baked-in text for future use.

---

## Design / UX

- [ ] Add a second content section below the hero (e.g., about, values, or upcoming events) to give the page depth — like complexcon's multi-section layout.
- [ ] Consider adding a scroll-triggered reveal for any future sections.
- [ ] Review Nav — currently only shows "4TP" and "NETWORK". May want to add actual links when content sections exist.

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
