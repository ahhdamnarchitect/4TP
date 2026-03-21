# Current State

_Last updated: 2026-03-20 (Session 7)_

---

## Deployment

- **Live URL**: https://4-tp.vercel.app (production)
- **Latest commit**: `49dc1fd` — "fix: brighten caption text, fix mobile eyebrow overflow"
- **Previous commit**: `f0e7ea1` — "feat: signup as focal point, centered layout, pill input, mobile overflow fix, remove 2026"
- **Vercel deployment ID (last known READY)**: `dpl_E6UdKiht1zFSU9NWLMnUq7Sr6TYq` — commit `f0e7ea1`
- **Auto-deploy triggered**: ✅ for `49dc1fd` via git push to main

---

## What Exists

- **`components/LogoIntro.tsx`**
  - Status: Working
  - Animation: step-based (0→1→2→3→4→done). Black overlay covers page → small yellow square springs in → shockwave rings radiate → square fills screen → 4.png logo punches in → overlay slides up (curtain exit)
  - Content underneath always rendered — overlay reveals it on exit. No hydration issues.

- **`components/HeroSection.tsx`**
  - Status: Updated (Session 7). All content center-aligned.
  - Design: ComplexCon-inspired focal hierarchy. Solid black bg. No background image.
  - Eyebrow: "Education · Inspiration · Discipline · Innovation" — uses `.eyebrow-text` CSS class
  - Headline: "MOVE FORWARD." at `clamp(2.8rem, 9vw, 7.5rem)` — supporting role, not dominant
  - Tagline: subdued body copy
  - **EMAIL FORM** = focal point, `maxWidth: 520px`, pill input
  - Caption: "Join the network — be first to know" — uses `.caption-text` CSS class
  - "2026" removed entirely
  - Yellow accent rule + values marquee at bottom
  - `minHeight: 100dvh`, `overflowX: hidden`, `width: 100%`

- **`components/EmailForm.tsx`**
  - Status: Updated (Session 7). Placeholder = "Email Address". Input is pill-shaped (`borderRadius: 9999px`), text bright white (`color: #fff`). `.email-form-row` wrapper for responsive stacking.

- **`components/Nav.tsx`**
  - Status: Working. "4TP" left / "NETWORK" right. Fades in at 3.2s after intro exits.

- **`components/Cursor.tsx`**
  - Status: Working. JS mouse tracker that moves `.custom-cursor` div. Fixes invisible cursor bug.

- **`app/page.tsx`**
  - Status: Working. Renders: grain overlay → Cursor → LogoIntro → Nav → HeroSection

- **`app/globals.css`**
  - Status: Updated (Session 7). Key additions:
    - `overflow-x: hidden` + `max-width: 100vw` on html and body
    - `.eyebrow-text` class: desktop letter-spacing/size + `@media (max-width: 479px)` override for mobile (0.44rem / 0.055em) so all 4 pillars stay on one line
    - `.caption-text` class: `color: rgba(255,255,255,0.78)` — brighter than previous 0.55
    - `.email-input`: `border-radius: 9999px`, `color: #ffffff`, yellow focus glow
    - `.email-form-row` + `@media (min-width: 480px)` for side-by-side form layout
    - `.custom-cursor` uses width/height transition (not scale)

- **`app/api/subscribe/route.ts`**
  - Status: Unchanged — working. Validates email, inserts to Supabase, sends via Resend.

- **`public/4.png`**
  - Status: In use. 4TP logo (yellow bg, black "4"). Used in LogoIntro animation.

- **`public/4TPCirclePppl.png`**
  - Status: In `/public` but NOT used in UI. Has baked-in text watermarks — user rejected.

- **Brain / Repo OS**
  - Status: Active. brain/ files, .cursor/ rules/commands/skills, cursor-os/ docs.

---

## Known Issues

- **`4TPCirclePppl.png`**: In `/public` but not used. Has baked-in text watermarks. Removable or replaceable in future session.
- **No automated test suite**: Validation is manual.
- **Email delivery reliability**: Not monitored beyond manual log inspection.

---

## Open Questions

- Should `4TPCirclePppl.png` be replaced with a clean version for future use as a hero/section background?
- Is a custom domain (beyond `4-tp.vercel.app`) being configured?
- Are Supabase subscriber records being monitored?
