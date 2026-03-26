# 4TP — Product & experience design

Living reference for UX flow, visual system, and motion. Align implementation and reviews with this file.

- **Last updated:** 2026-03-25  
- **Related:** `docs/DESIGN_RESEARCH.md` (trends, checklist), `docs/AI_INSTRUCTIONS.md` (AI session protocol)

---

## Product story

Users enter a **quiet, almost blank space** (white room), answer **four pillar-aligned questions** (Yes/No), and are either **invited** (logo moment → **yellow screen** with email) or **turned away** with a clear, dignified message. The experience should feel **editorial and intentional**, not like a generic SaaS landing.

---

## User journey (target)

| Phase | Experience |
|--------|------------|
| 1. Entry | Full-viewport **white room** (`whiteroom` imagery or near-white). Minimal chrome. |
| 2. Gate | Four steps, one question each, mapped to **Education · Inspiration · Discipline · Innovation**. **Typewriter** (single line, completes once) → **Yes / No**. |
| 3. Rule | **Access** if **≥3 of 4** answers are Yes (threshold is a named constant in code for easy tuning). |
| 4a. Denied | End state or “rethink” path; copy should invite reflection, not shame. |
| 4b. Granted | **Logo intro** (yellow square → fill → mark). |
| 5. Conversion | **Stay on yellow** — email capture and success states use **yellow field + black type** (not a return to black hero for that beat). |
| 6. (Optional) After signup | Any deeper “network” page can stay dark editorial; see **Post-gate surfaces** below. |

---

## Visual system

| Token | Role |
|--------|------|
| **Yellow** | Brand energy, access granted, CTA. Use **one** primary hex everywhere (currently `#FEEB3D` in code; align with `#F5C842` in older docs if you standardize). |
| **Black** | Depth, type on yellow, email confirmation email. |
| **White / off-white** | Gate, denial, first paint. |
| **Type** | Inter baseline; optional future **display** face for questions only. |
| **Texture** | Grain on **dark** surfaces: subtle. On **white room**: optional, lighter than dark grain or omit (photo already sets mood). |

---

## Motion principles

- Motion **signals state** (next question, granted vs denied, yellow takeover), not decoration.
- **One** focal animation per phase.
- Respect **`prefers-reduced-motion`**: shorter timelines, skip nonessential effects (e.g. shockwave rings).
- Logo sequence: keep **yellow square origin** → expand → **logo punch**; tune timing for a **reward** beat, not a loading spinner.

---

## Background & “filling the space”

### Removed: silhouette + gyro (`HeroBackground`)

That layer was **not** part of the client brief. It added **complexity** (RAF loop, iOS orientation permission, interaction with other animations) and competed with the **white room → gate → yellow** story.

### Recommendation

1. **Default (preferred):** **No** replacement decorative layer on dark post-gate areas. Use **solid black**, existing **grain overlay** (low opacity), and **strong typography + marquee + rule** — many premium landings rely on type and space alone.
2. **If it feels too empty later:** Add **one** subtle, **non-interactive** element only, for example:
   - Very soft **radial gradient** (black → `#111`) behind content, or
   - **Static** low-opacity geometric accent (CSS or SVG), no scroll/gyro/wheel coupling.

Avoid reintroducing **continuous motion** or **sensor-driven** backgrounds unless the product explicitly asks for them.

---

## Post-gate surfaces

If users see a **dark** section after the yellow email step (e.g. expanded site, success continuation):

- Treat it as **secondary** to the gate + yellow story.
- Keep **custom cursor** optional: consider **disabling** on white/yellow phases for clarity and touch devices; retain on dark desktop only if desired.

---

## Forms

- **Dark contexts:** Existing pill input + yellow CTA pattern.
- **Yellow screen:** Inverted — **black** text, borders, and focus rings; submit control readable on yellow.

---

## Analytics (planned)

Instrument funnel steps so the team can see drop-off:

- Question shown / answered (index + yes/no)
- Gate result (granted / denied)
- Email step viewed / submitted / error

Store via a small API + table or approved analytics tool (see implementation tasks).

---

## External inspiration (process, not dependencies)

- **21st.dev:** Borrow **patterns** (e.g. typewriter once-through, compact email row) — avoid importing large dependency trees unless needed.
- **Google Stitch / `DESIGN.md` idea:** Describe vibe and rules in this file; prototype multi-screen flows there if the team uses it.
- **UI/UX Pro Max–style discipline:** One clear aesthetic lane; avoid generic SaaS layouts.

---

## Implementation checklist (high level)

- [x] Gate UI + typewriter + Yes/No + 3/4 rule + denied copy (`GateExperience`, `GateScreen`, `lib/gate.ts`)
- [x] Logo intro hands off to **main landing hero** with a **yellow signup** (no separate email screen)
- [x] `EmailForm` variant for yellow background
- [x] Funnel events + `POST /api/funnel` (requires `funnel_events` table — see `docs/supabase-funnel-events.sql`)
- [ ] `prefers-reduced-motion` pass (typewriter respects reduced motion; logo rings optional)
- [ ] Unify yellow token in code + docs

---

## Asset note

`public/hero-silhouette-2.png` is **unused** after removal of the gyro silhouette layer; delete from the repo when convenient to reduce weight.
