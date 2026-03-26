# Current State

## Last updated

2026-03-26

---

## Local dev (Windows)

- **Node** is installed at `C:\Users\e159305\node\node-v25.8.2-win-x64` but may not be on the default PATH in PowerShell.
- **Use cmd** with PATH set, or run the repo helpers:
  - `scripts\install.cmd` — `npm install` with Node prepended to PATH
  - `scripts\build.cmd` — `npm run build` with the same PATH
- **`node_modules`** is expected after `install.cmd`; `npm run build` succeeds without `.env.local` (API routes no longer instantiate Supabase at import time).

---

## Deployment

- **Live URL**: `https://4-tp.vercel.app` (production)
- **Shipped feature commit** (gate + rebase + unified site shell): `6b4173e` on `main`. Tip of `main` may include doc-only commits — use `git log -1` locally for the exact hash.

---

## What Exists

- **`docs/DESIGN.md`** — Product journey: white room → gate (≥3/4 yes) → logo → yellow email hold; motion rules; silhouette/gyro removed by design.
- **`components/GateExperience.tsx`** — Orchestrates **single-scene gate** → denied or **in-place granted overlay** → logo → **site**. Gate screen stays mounted across questions; only the question line transitions. Dispatches **`intro:done`** once when the site phase mounts so `MobileCTA` (still event-driven) can show on touch devices.
- **`components/GateScreen.tsx`** — White-room gate scene with cinematic grade + bold question headline; renders Q1–Q3 as **Yes/No** and Q4 as **Keep It / Share It** from question metadata; renders an **Access Granted** overlay (boxed, on-brand) and a brief static beat when locked.
- **`components/LogoDockIntro.tsx`** — New gated-load logo beat: `public/4.png` (black “4” in yellow square) animates center-in and docks to top-left to keep brand orientation during questionnaire.
- **`lib/gate.ts`** — Gate copy now matches Milanote wording; Q4 supports explicit choice metadata (`choices`) while preserving boolean scoring path.
- **`components/LogoIntro.tsx`** — Gate flow: Framer yellow square → rings → logo hold → `onGateComplete` to site. In gate mode, overlay background is **semi-transparent** (less black-screen cut). Non-gate legacy path still slides overlay up.
- **`components/AccessDeniedScreen.tsx`** — Denied screen beat (still a separate phase). `AccessGrantedScreen` currently exists but is no longer used by the gate flow.
- **`components/HeroSection.tsx`** — Now supports `variant="yellow"` for the main email-entry landing hero (matches the logo yellow); `id="hero"` for scroll targets.
- **`components/EmailForm.tsx`**, **`components/Nav.tsx`** (400ms fade-in), **`components/Cursor.tsx`** — As implemented in tree; Nav does not depend on `intro:done`.
- **`app/api/subscribe/route.ts`** — Supabase **client created inside `POST`** after env check; Resend send only if `RESEND_API_KEY` set. **Local `next build` works without env vars.**
- **`.eslintrc.json`** — Ensures `npm run lint` runs without an interactive setup prompt.
- **`app/favicon.ico/route.ts`** — Returns `public/4.png` for `/favicon.ico` to avoid a favicon 404 in production logs.

- **`public/hero-silhouette-2.png`** — Unused after removal of gyro layer; safe to delete to reduce size (see `docs/DESIGN.md`).

- **`public/4TPCirclePppl.png`** — Still in `/public`, not used in UI (watermarks).

---

## Known Issues

- `docs/PROGRESS.md` and brain may lag latest git commits until next sync.
- **npm audit** reports vulnerabilities (see `npm install` output); Next 14.2.5 has known security advisory — plan upgrade when feasible.
- Nav mark is now a brand lockup (yellow boxed “4” + “TP”) and uses a phase-aware blend mode; visually QA on yellow hero recommended.

---

## Open Questions

- Run `docs/supabase-funnel-events.sql` in Supabase if funnel persistence is desired.
- Custom domain beyond `4-tp.vercel.app`?
- Remove `hero-silhouette-2.png` / `4TPCirclePppl.png` when ready?
