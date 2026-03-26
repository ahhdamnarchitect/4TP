# Decisions Log

## Format

- Date:
- Decision:
- Reason:
- Alternatives Considered:
- Impact:

## Decisions

Append entries below as relevant.

- Date: 2026-03-26
- Decision: Extend `GATE_QUESTIONS` schema with optional `choices` metadata and keep `onAnswer(yes:boolean)` flow unchanged; map Q4 (`Keep It` / `Share It`) to boolean so scoring/funnel events stay intact.
- Reason: Client-required question copy/choices needed richer UI than plain Yes/No, but gate rule (`>=3 yes`) and analytics pipeline should not change.
- Alternatives Considered: Switch answers to a richer discriminated union across all phases; hardcode Q4 button labels in `GateScreen`.
- Impact: Backward-compatible gate engine; question content remains single-source in `lib/gate.ts`; minimal surface-area change.

- Date: 2026-03-26
- Decision: Keep the gate experience as a **single mounted scene**; animate only the question line between steps and render **Access Granted** as an in-place overlay with a brief static beat before `LogoIntro`.
- Reason: Removes the “full-screen reload” feeling between questions and keeps the verdict theatrical without teleporting to a separate screen.
- Alternatives Considered: Key/unmount the full `GateScreen` per question; show `AccessGrantedScreen` as its own full-screen phase.
- Impact: Smoother mobile/desktop feel; fewer large scene transitions; `AccessGrantedScreen` remains in repo but is no longer used by the gate flow.

- Date: 2026-03-25
- Decision: After rebasing gate work onto remote, keep **one** site shell: `GateExperience` renders hero + **`ContentSections`** + **`MobileCTA`** when `phase === 'site'`. Dispatch a single **`intro:done`** custom event when entering the site phase so existing `MobileCTA` logic (touch + scroll) keeps working without a separate GSAP `LogoIntro` morph path.
- Reason: Remote had scroll-driven sections and a mobile CTA tied to `intro:done`; gate flow replaces the old logo morph but components still expect the event once the main site is shown.
- Alternatives Considered: Refactor `MobileCTA` to use `data-phase` or props only; duplicate GSAP intro for non-gate.
- Impact: Cohesive funnel-first UX; minimal changes to `MobileCTA`.

- Date: 2026-03-25
- Decision: On Windows, document Node path `C:\Users\e159305\node\node-v25.8.2-win-x64` and provide `scripts\install.cmd` / `scripts\build.cmd` so `npm` works from **cmd** when Node is not on the default PATH.
- Reason: PowerShell sessions used by tooling may not inherit Node; user preference for cmd + explicit PATH.
- Alternatives Considered: Rely on global PATH only; document PowerShell `$env:Path` prepend only.
- Impact: Reproducible local install/build without hunting PATH.

- Date: 2026-03-25
- Decision: Remove `HeroBackground` (silhouette + gyro); do not replace with another interactive background layer by default.
- Reason: Not in client brief; added complexity (RAF, gyro permissions) and competed with planned white-room → gate story.
- Alternatives Considered: Static gradient or geometric accent only; keep gyro.
- Impact: Simpler hero; editorial negative space + grain. See `docs/DESIGN.md`.

- Date: 2026-03-25
- Decision: Instantiate Supabase and Resend clients **inside** `POST` for `/api/subscribe`, not at module top level.
- Reason: `next build` collects route modules without env vars locally; top-level `createClient(undefined, …)` threw and failed the build.
- Alternatives Considered: Require `.env.local` for every build; use dynamic import.
- Impact: CI and local `npm run build` succeed without secrets; runtime still requires env on Vercel.

- Date: 2026-03-20 (Session 6)
- Decision: Rebuild HeroSection with solid black background — no background image.
- Reason: `4TPCirclePppl.png` was blurry and had baked-in text watermarks making it unusable as a background. Solid black is cleaner and more editorial.
- Alternatives Considered: Source a clean version of the image; use a different image.
- Impact: Cleaner, faster-loading page. Image still in /public for potential future use.

- Date: 2026-03-20 (Session 6)
- Decision: Content in HeroSection is always visible (no `initial="hidden"` animation delays).
- Reason: Previous approach used Framer Motion variants with 3.3s delays. If animation misfired, content stayed permanently invisible. LogoIntro overlay covers content until it exits — no animation dependency needed.
- Alternatives Considered: Keep delayed reveal animations per element.
- Impact: Reliable content visibility regardless of animation state. Page works even if JS fails to animate.

- Date: 2026-03-20 (Session 6)
- Decision: Created `Cursor.tsx` client component to drive `.custom-cursor` div with mouse position via JS.
- Reason: `globals.css` had `cursor: none` and a `.custom-cursor` CSS class but no JS was moving the element — cursor was completely invisible.
- Alternatives Considered: Remove custom cursor entirely; use CSS-only cursor tricks.
- Impact: Custom yellow cursor now works correctly on desktop pointer devices.

- Date: 2026-03-20 (Session 6)
- Decision: LogoIntro uses a step-based integer state (0–4) + `done` boolean instead of string phase union.
- Reason: Simpler to reason about, avoids string comparison bugs, cleaner conditional rendering.
- Alternatives Considered: String phase enum ('init' | 'square' | 'expand' | 'logo' | 'exit' | 'gone').
- Impact: More readable animation sequencing code.

- Date: 2026-03-20 (Session 7)
- Decision: Move eyebrow and caption styles to CSS classes (`.eyebrow-text`, `.caption-text`) instead of inline styles.
- Reason: Inline styles cannot respond to CSS media query breakpoints. To shrink the eyebrow text on small phones without wrapping, a `@media (max-width: 479px)` override is required — impossible with inline styles.
- Alternatives Considered: JavaScript-driven responsive sizing; `clamp()` with more aggressive minimum values.
- Impact: Eyebrow stays on one line across all screen sizes. Caption color can be updated globally from one place in globals.css.

- Date: 2026-03-20 (Session 7)
- Decision: Email form is the primary focal point of the hero — not the headline.
- Reason: User feedback: "make the sign up the main focus of the screen." Headline reduced to `clamp(2.8rem, 9vw, 7.5rem)` (was 4.5–17rem). Form centered at `maxWidth: 520px` with generous surrounding whitespace.
- Alternatives Considered: Keep large headline as dominant; use split-screen layout.
- Impact: Visual hierarchy mirrors the goal of the page — capturing waitlist emails.

- Date: 2026-03-20 (Session 6)
- Decision: Adopt ComplexCon-style layout — large display type fills viewport, two-column bottom, yellow accent rule, values ticker.
- Reason: User explicitly requested the site feel like complexcon.com — bold, editorial, dark, event-brand energy.
- Alternatives Considered: Previous centered layout with background image.
- Impact: Strong brand presence. "MOVE FORWARD." headline dominates; email form remains accessible below the fold.

- Date: 2026-03-20
- Decision: Standardize Repo OS memory/rules/docs structure under `brain/`, `.cursor/rules/`, and `cursor-os/`.
- Reason: Ensure future sessions can resume with minimal rediscovery cost.
- Alternatives Considered: Keep ad-hoc notes only in `docs/`.
- Impact: Better handoff continuity and lower context drift across sessions.

- Date: 2026-03-20
- Decision: Keep subscription persistence and transactional email in one API endpoint (`app/api/subscribe/route.ts`).
- Reason: Current scope is Phase 1 waitlist delivery; single endpoint keeps implementation simple.
- Alternatives Considered: Split database write and email into separate services/jobs.
- Impact: Faster delivery, but reliability and observability depend on one path.

- Date: 2026-03-20
- Decision: Provide a PowerShell bootstrap path as first-class Repo OS initialization option.
- Reason: Current environment does not have Node and cannot install it.
- Alternatives Considered: Keep Node-only bootstrap script.
- Impact: Repo OS remains usable on locked-down Windows machines.

- Date: 2026-03-20
- Decision: Remove Node bootstrap script and standardize on PowerShell bootstrap only.
- Reason: User environment cannot install Node and requires one consistent operational path.
- Alternatives Considered: Keep dual bootstrap scripts (.js + .ps1).
- Impact: Simpler docs and reduced toolchain ambiguity across locked-down Windows setups.
