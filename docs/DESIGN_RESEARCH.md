# 4TP - Design Research and Creative Direction

- Last Updated: 2026-03-25
- Purpose: Living design reference and implementation checklist for each session.
- **Product journey, gate flow, and background strategy:** see **`docs/DESIGN.md`**.

---

## 2026 Trend Signals Applied to 4TP

1. **Immersive but fast**  
   Build an experience-first hero while keeping performance budgets tight.
2. **Dark-first interfaces**  
   Use black base with high-contrast yellow accents for brand recognition.
3. **Purposeful motion**  
   Animation should communicate hierarchy and flow, not decoration.
4. **Asymmetric editorial composition**  
   Use confident type scale and broken-grid rhythm for premium identity.
5. **Accessibility as baseline**  
   Preserve high contrast, clear focus states, and keyboard-safe interactions.

---

## Reference Direction

- `ComplexCon`: minimal structure, bold hero, single clear CTA.
- `OuiOui001`: pacing and confidence of logo reveal sequence.
- `Architectural Digest`: editorial spacing and high-trust typography.

---

## Locked Visual System

- Font: Inter (`400`, `700`, `900`)
- Core colors:
  - `#F5C842` (brand yellow)
  - `#0A0A0A` (brand black)
  - `#FAFAFA` (brand white)
- Brand animation requirement:
  - Start with a **yellow square** (never a circle)
  - Morph/expand into full 4TP logo treatment
  - Timing should feel deliberate (OuiOui001-like)

---

## Animation Sequence (Target Timing)

```text
0ms    - black screen
200ms  - yellow square appears, centered
600ms  - square expands/morphs
1200ms - 4TP mark fully revealed
1800ms - brief hold
2200ms - transition out to hero
3000ms - hero fully interactive
```

Implementation note: keep current Framer Motion approach unless performance or quality demands a targeted CSS/SVG refactor.

---

## Current Product Notes

- Phase 1 scope remains: one high-impact landing page + waitlist capture.
- Do not add paid tooling or subscription upgrades.
- Keep stack unchanged (Next.js 14, Tailwind, Framer Motion, Supabase, Resend, Vercel).

---

## Next Steps (Session-Driven Checklist)

- [x] Initial trend research captured
- [x] Brand direction locked (dark + yellow, editorial tone)
- [x] Logo intro concept implemented in code
- [x] Product/UX spec documented in `docs/DESIGN.md` (gate, yellow hold, no gyro hero)
- [ ] Implement items in `docs/DESIGN.md` implementation checklist
- [ ] Vercel deployment confirmed green after latest fixes (latest known blocker in `LogoIntro.tsx` has been fixed)
- [ ] Validate intro pacing on desktop and mobile
- [ ] Verify email form end-to-end (API, Supabase insert, Resend send)
- [ ] Run mobile spacing and typography polish pass
