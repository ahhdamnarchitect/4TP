# Current State

_Last updated: 2026-03-25_

---

## Local dev (Windows)

- **Node** is installed at `C:\Users\e159305\node\node-v25.8.2-win-x64` but may not be on the default PATH in PowerShell.
- **Use cmd** with PATH set, or run the repo helpers:
  - `scripts\install.cmd` — `npm install` with Node prepended to PATH
  - `scripts\build.cmd` — `npm run build` with the same PATH
- **`node_modules`** is expected after `install.cmd`; `npm run build` succeeds without `.env.local` (API routes no longer instantiate Supabase at import time).

---

## Deployment

- **Live URL**: https://4-tp.vercel.app (production)
- **Latest known commit** (brain): prior session `49dc1fd` — confirm git for newer commits after doc updates.

---

## What Exists

- **`docs/DESIGN.md`** — Product journey: white room → gate (≥3/4 yes) → logo → yellow email hold; motion rules; silhouette/gyro removed by design.
- **`components/LogoIntro.tsx`** — Yellow square → fill → logo → overlay slides up (reveals black hero today; yellow-hold spec pending).
- **`components/HeroSection.tsx`** — Centered dark editorial hero; **no** `HeroBackground` (silhouette + gyro removed). Solid black + global grain only.
- **`components/EmailForm.tsx`**, **`components/Nav.tsx`**, **`components/Cursor.tsx`** — Unchanged behavior from prior sessions unless noted in git.
- **`app/api/subscribe/route.ts`** — Supabase **client created inside `POST`** after env check; Resend send only if `RESEND_API_KEY` set. **Local `next build` works without env vars.**

- **`public/hero-silhouette-2.png`** — Unused after removal of gyro layer; safe to delete to reduce size (see `docs/DESIGN.md`).

- **`public/4TPCirclePppl.png`** — Still in `/public`, not used in UI (watermarks).

---

## Known Issues

- `docs/PROGRESS.md` and brain may lag latest git commits until next sync.
- **npm audit** reports vulnerabilities (see `npm install` output); Next 14.2.5 has known security advisory — plan upgrade when feasible.

---

## Open Questions

- Implement gate + typewriter + yellow email per `docs/DESIGN.md`.
- Custom domain beyond `4-tp.vercel.app`?
- Remove `hero-silhouette-2.png` / `4TPCirclePppl.png` when ready?
