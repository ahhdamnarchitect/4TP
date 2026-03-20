# Current State

_Last updated: 2026-03-20 (Session 6)_

---

## Deployment

- **Live URL**: https://4-tp.vercel.app (production)
- **Latest commit**: `94c8832` — "fix: complete site rebuild — complexcon layout, working animation, cursor"
- **Vercel deployment ID**: `dpl_Q4dcFYLQBAq1mx4WQd96GPfJgQda` — state: **READY**
- **Verified in Chrome**: ✅ Animation plays correctly, content visible, cursor visible, email form persists

---

## What Exists

- **`components/LogoIntro.tsx`**
  - Status: Rebuilt and working
  - Animation: step-based (0→1→2→3→4→done). Black overlay covers page → small yellow square springs in → shockwave rings radiate → square fills screen → 4.png logo punches in → overlay slides up (curtain exit)
  - Content underneath always rendered — overlay reveals it on exit. No hydration issues.

- **`components/HeroSection.tsx`**
  - Status: Rebuilt and working
  - Design: ComplexCon-inspired. Solid black bg. No background image.
  - Large display headline "MOVE FORWARD." always visible (no opacity-0 delays)
  - Two-column bottom: description + email form (left) | faded "2026" year stamp (right)
  - Yellow accent rule + values marquee at bottom

- **`components/Nav.tsx`**
  - Status: Working. "4TP" left / "NETWORK" right. Fades in at 3.2s after intro exits.

- **`components/Cursor.tsx`**
  - Status: New — working. JS mouse tracker that moves `.custom-cursor` div. Fixes invisible cursor bug.
  - Root cause fixed: `cursor: none` CSS existed but no JS was moving the element.

- **`components/EmailForm.tsx`**
  - Status: Unchanged — working. Submit → Supabase insert → Resend confirmation.

- **`app/page.tsx`**
  - Status: Updated. Renders: grain overlay → Cursor → LogoIntro → Nav → HeroSection

- **`app/globals.css`**
  - Status: Updated. `.custom-cursor` now uses width/height transition (not scale). `cursor: none` active on pointer devices.

- **`app/api/subscribe/route.ts`**
  - Status: Unchanged — working. Validates email, inserts to Supabase, sends via Resend.

- **`public/4.png`**
  - Status: Added. 4TP logo (yellow bg, black "4"). Used in LogoIntro animation.

- **`public/4TPCirclePppl.png`**
  - Status: Added to /public but NOT used in UI. Image has baked-in text overlays and is blurry — user rejected it.

- **Brain / Repo OS**
  - Status: Active. brain/ files, .cursor/ rules/commands/skills, cursor-os/ docs.

---

## Known Issues

- **`4TPCirclePppl.png`**: In `/public` but not used. Has baked-in text watermarks. May be removable or replaced with a clean version in a future session.
- **No automated test suite**: Validation is manual. Risk on future refactors.
- **Email delivery reliability**: Not monitored beyond manual log inspection.

---

## Open Questions

- Should `4TPCirclePppl.png` be replaced with a clean version for use as a future section background?
- Is a custom domain (beyond 4-tp.vercel.app) being configured?
- Are Supabase subscriber records being monitored?
