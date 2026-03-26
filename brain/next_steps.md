# Next Steps

## Last updated

2026-03-26

---

## Immediate / Resume Here

- [ ] **Confirm Vercel production** for commit `6b4173e` — `https://4-tp.vercel.app` (gate → yellow → site with sections + mobile CTA).
- [ ] Confirm the **new flow** matches client: cinematic gate (no full-screen fade per question) → in-place granted overlay + brief static → logo → **yellow hero signup**.
- [ ] Confirm **favicon 404 is gone** after latest deploy (new `/favicon.ico` route).
- [ ] **Run `docs/supabase-funnel-events.sql`** in the Supabase SQL editor if funnel analytics should persist.
- [ ] **Manual QA** — full gate flow on mobile and desktop; verify question typography wrapping, button tap targets, and the granted overlay timing; sticky mobile CTA after site reveal; email subscribe from hero.
- [ ] **Verify email subscribe end-to-end** — test address on production; confirm Supabase row + Resend (if key set).

---

## Design / UX

- [ ] Review Nav when real destinations exist (links, etc.).
- [ ] Visual QA: Nav lockup on yellow hero (blend mode + contrast).
- [ ] Optional: trim unused assets (`hero-silhouette-2.png`, `4TPCirclePppl.png`) when ready.

---

## Infrastructure / Reliability

- [ ] Add lightweight smoke tests for `/api/subscribe` and `/api/funnel`.
- [ ] Plan Next.js security upgrade when feasible (`npm audit`).

---

## Backlog

- [ ] Extract Resend HTML template from `subscribe` route into a module.
- [ ] `robots.txt` / sitemap if SEO becomes a priority.

---

## Blockers

- None currently.
