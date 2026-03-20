# 4TP — Design Research & 2026 Web Trends

> Last Updated: March 20, 2026
> Purpose: Living research document. Update on every commit.

---

## 2026 Web Design Trends (Researched March 2026)

### Key Trends — Applied to 4TP

**1. Immersive & Performance-Driven Experiences**
The top sites of 2026 prioritize immersive, performance-driven experiences that blend AI-powered personalization with minimalist yet highly interactive, bold aesthetics. For 4TP: the landing page must feel like an experience, not a page.

**2. Dark Mode as Default**
Over 90% of users prefer dark mode. Dark backgrounds with high-contrast accent colors (like 4TP Yellow #FEEB3D on black) are the dominant aesthetic. 4TP's black + yellow palette is perfectly positioned for this.

**3. Immersive High-Energy Layouts**
Saturated colors combined with surreal 3D-adjacent elements and soft gradients create a futuristic, energetic feel. For 4TP: the yellow-on-black with kinetic typography hits this perfectly.

**4. Guided Scroll Interactions**
Scrolling is now used as a navigation tool, with progress indicators and interactive elements keeping users engaged. For 4TP: the landing page uses scroll-triggered reveals and sticky animations.

**5. Purposeful Motion**
Micro-interactions and animations are designed for utility — providing feedback, enhancing navigation — rather than just decoration. For 4TP: every animation has intent (the logo morph signals brand entry, the scroll reveals signal content depth).

**6. Organic / Asymmetric Layouts**
Moving away from strict grids. 2026 uses asymmetrical, organic layouts with curved dividers and soft shadows. For 4TP: the hero section breaks the grid with the oversized "4" as a design element.

**7. Maximalist Nostalgia**
Futuristic aesthetics blended with bold, opulent typographic choices. For 4TP: Inter Black at display sizes, mixed with editorial spacing.

**8. Accessibility First**
WCAG AA compliance, high-contrast ratios, and keyboard navigation are non-negotiable. The 4TP Yellow (#FEEB3D) on Black (#000000) exceeds WCAG AA contrast requirements.

**9. Performance-First Design**
Sites must load in under 3 seconds. Lightweight visuals, optimized assets, mobile-first. For 4TP: Next.js App Router + Vercel Edge = blazing fast.

**10. AI-Driven Personalization**
Chatbots, voice-activated interfaces, intelligent customization. Not applicable to Phase 1, but relevant to Phase 4 (media platform).

---

## Reference Sites Analysis

### ComplexCon (complexcon.com)
- **What works:** Full-bleed dark background, centered logo lockup, single CTA (email form), massive bold type
- **Email form:** Clean input + inline button, no friction
- **Apply to 4TP:** Mirror this structure. Hero = logo + tagline + email form. Nothing else.

### OuiOui001 (ouioui001.com)
- **What works:** Brand name animates in on page load — staggered letter reveal, editorial timing
- **Animation feel:** Deliberate, slow, confident — not flashy
- **Apply to 4TP:** The yellow square expands/morphs into the 4TP logo on load. Then the tagline fades in. Then the email form rises up.

### Architectural Digest (architecturaldigest.com)
- **What works:** High editorial standard, clean grid, sophisticated typography
- **Apply to 4TP:** Typography hierarchy and spacing. The "below the fold" sections of the landing page use AD-style editorial spacing.

---

## Font Selection

### Primary: Inter
- **Source:** https://rsms.me/inter/
- **Weights used:** 900 (Black) for hero, 700 (Bold) for headings, 400 (Regular) for body
- **Why:** Clean grotesque, highly legible, modern — aligns with ComplexCon and OuiOui references

### Alternative Options (for client review):
1. **Space Grotesk** — Similar to Inter but with more personality, slight geometric quirks. Good for a creative platform. Google Fonts.
2. **Neue Haas Grotesk / Haas Unica** — Ultra-editorial, fashion-forward. Closest to what OuiOui uses. Consider for display headings.
3. **DM Sans** — Clean, slightly more approachable than Inter. Good for body copy pairing. Google Fonts.

---

## Animation Plan — Phase 1

### Logo Entrance Sequence (OuiOui-style)
```
0ms     — Page loads, black screen
200ms   — Yellow square fades in (small, centered)
600ms   — Square morphs/expands via clip-path or SVG path animation
1200ms  — Full 4TP logo mark revealed (bold "4" + "TP" text)
1600ms  — Logo scales slightly and settles
2000ms  — Tagline text fades in (staggered per word)
2600ms  — Email form rises up from below
3000ms  — CTA button pulses once
```

### Tech: GSAP or Framer Motion
- **GSAP:** Best for the morphing shape animation (MorphSVG or clip-path tweens)
- **Framer Motion:** Best for React component-level animations (form entrance, scroll reveals)
- **Decision:** Use Framer Motion for all React component animations. Use CSS animations for the initial logo sequence (no JS dependency on first paint).

### Scroll Interactions
- Section reveals: Framer Motion `whileInView` with `viewport={{ once: true }}`
- Parallax: CSS `transform: translateY()` on scroll event
- Sticky elements: CSS `position: sticky`

---

## Color System

```css
/* 4TP Brand Colors */
--color-yellow: #FEEB3D;
--color-black: #000000;
--color-white: #FFFFFF;
--color-gray-dark: #111111;
--color-gray-mid: #1A1A1A;
--color-gray-light: #333333;

/* Typography */
--font-primary: 'Inter', sans-serif;

/* Spacing Scale (Tailwind) */
/* Uses default Tailwind scale — no customization needed */
```

---

## Competitive Landscape Notes

Sites that 4TP should aim to be compared to:
- **A-COLD-WALL** (acoldwall.com) — Dark, editorial, fashion-culture hybrid
- **Virgil Abloh archive sites** — Culture-forward, text-heavy, high contrast
- **ComplexCon** — Event/culture brand, dark, bold
- **Hypebeast** — Culture media, dark mode, editorial grid

4TP is positioned in this cultural space: **education + streetwear culture aesthetic + media platform ambition**.

---

## Next Steps (Updated per session)

- [x] README updated (pricing removed, animation notes added)
- [x] Design research documented
- [ ] PROGRESS.md created
- [ ] Next.js project scaffolded
- [ ] Tailwind configured with brand tokens
- [ ] Logo SVG created
- [ ] Hero animation built
- [ ] Email form wired to Supabase
- [ ] Resend confirmation email template built
- [ ] Deploy to Vercel
