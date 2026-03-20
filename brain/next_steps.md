# Next Steps

_Last updated: 2026-03-20 (Session 6)_

---

## Immediate / Resume Here

- [ ] **Verify email subscribe flow end-to-end** — submit a test email on https://4-tp.vercel.app, confirm Supabase insert and Resend confirmation delivery.
- [ ] **Mobile responsiveness check** — view site on a mobile viewport. The display font (`clamp(4.5rem, 14.5vw, 17rem)`) may overflow on small screens. Adjust if needed.
- [ ] **Decide on `4TPCirclePppl.png`** — either remove from `/public` (unused), or source a clean version without baked-in text for future use as a hero background or section image.

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
