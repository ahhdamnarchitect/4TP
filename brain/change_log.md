# Change Log

## Format
- Date:
- Change:
- Files Modified:
- Reason:

---

## Entries

- Date: 2026-03-25
- Change: Add ESLint config so `npm run lint` runs non-interactively; fix `react/no-unescaped-entities` in `EmailForm`; update Supabase funnel SQL to include `pgcrypto`.
- Files Modified: `.eslintrc.json`, `components/EmailForm.tsx`, `docs/supabase-funnel-events.sql`
- Reason: `next lint` was prompting for setup; keep lint runnable in CI/local and ensure Supabase SQL works with `gen_random_uuid()`.

- Date: 2026-03-25
- Change: Serve `/favicon.ico` via a route handler returning `public/4.png` (avoid committing binary `.ico`).
- Files Modified: `app/favicon.ico/route.ts`
- Reason: Production was logging a 404 for `/favicon.ico`.

- Date: 2026-03-25
- Change: Post-push brain + `docs/PROGRESS.md` sync (commit `901c20e`).
- Files Modified: `brain/current_state.md`, `brain/change_log.md`, `brain/next_steps.md`, `brain/decisions.md`, `docs/PROGRESS.md`
- Reason: Reflect shipped gate rebase, `intro:done` bridge, and next QA steps.

- Date: 2026-03-25
- Change: Rebased gate work onto remote `main`, resolved conflicts (gate-first `LogoIntro`, editorial `HeroSection`, lazy subscribe, merged `globals.css` with gate + `section-grid-lines` + `navDotPulse`), removed `HeroBackground`, wired `ContentSections` + `MobileCTA` inside `GateExperience` and dispatch `intro:done` on site phase; pushed `6b4173e`.
- Files Modified:
  - `app/page.tsx`, `app/globals.css`, `app/api/subscribe/route.ts`
  - `components/GateExperience.tsx`, `components/LogoIntro.tsx`, `components/HeroSection.tsx`, `components/Nav.tsx`
  - `components/HeroBackground.tsx` (deleted)
  - `package-lock.json`
  - `brain/*`, `docs/PROGRESS.md` (post-push sync)
- Reason: Remote had GSAP intro + sections; local had full gate funnel — unified product path per `DESIGN.md` and shipped to GitHub.

- Date: 2026-03-25
- Change: Windows npm helpers (`scripts\install.cmd`, `scripts\build.cmd`); lazy Supabase/Resend in subscribe API; brain + cheat sheet updated; `npm install` + `npm run build` verified via cmd.
- Files Modified:
  - `scripts/install.cmd`
  - `scripts/build.cmd`
  - `app/api/subscribe/route.ts`
  - `brain/current_state.md`
  - `brain/next_steps.md`
  - `brain/decisions.md`
  - `brain/change_log.md`
  - `brain/cheat_sheet.md`
- Reason: User needs Node on PATH via cmd; build failed without env at import time; sync brain with DESIGN.md-era state and removed HeroBackground.

- Date: 2026-03-20 (Session 7)
- Change: Brightened caption text, fixed mobile eyebrow clipping.
- Files Modified:
  - `components/HeroSection.tsx` (eyebrow → `.eyebrow-text` class; caption → `.caption-text` class; removed inline styles for both)
  - `app/globals.css` (added `.eyebrow-text` with `@media (max-width: 479px)` override at 0.44rem/0.055em; added `.caption-text` at rgba(255,255,255,0.78))
- Reason: Caption "JOIN THE NETWORK — BE FIRST TO KNOW" was too dark (0.55 opacity) on mobile. Eyebrow text was cut off on small screens because `whiteSpace: nowrap` with wide letter-spacing overflowed the viewport — inline styles can't respond to breakpoints, so a CSS class + media query was required.
- Commits: `49dc1fd`
- Deployment: auto-triggered via git push to main

- Date: 2026-03-20 (Session 7)
- Change: Signup form as focal point, centered layout, pill input, mobile overflow fix, "2026" removed.
- Files Modified:
  - `components/HeroSection.tsx` (full centered redesign — all content center-aligned; headline reduced to clamp(2.8rem,9vw,7.5rem); "2026" removed; email form at maxWidth 520px as visual anchor; 100dvh viewport; overflowX hidden)
  - `components/EmailForm.tsx` (placeholder → "Email Address"; borderRadius 9999px; color #fff; .email-form-row wrapper)
  - `app/globals.css` (overflow-x hidden + max-width 100vw on html/body; .email-input pill radius + yellow focus glow; .email-form-row responsive media query at 480px)
- Reason: User feedback — make signup the main focus, not "MOVE FORWARD."; mobile horizontal scroll bug; input too dim; placeholder wording; "2026" irrelevant to brand theme.
- Commits: `f0e7ea1`
- Deployment: `dpl_E6UdKiht1zFSU9NWLMnUq7Sr6TYq` — READY — https://4-tp.vercel.app

- Date: 2026-03-20 (Session 6)
- Change: Complete site rebuild — ComplexCon layout, working logo animation, cursor fix.
- Files Modified:
  - `components/LogoIntro.tsx` (complete rewrite — step-based animation, black overlay curtain)
  - `components/HeroSection.tsx` (complete rewrite — solid black bg, always-visible content, complexcon layout)
  - `components/Nav.tsx` (rewrite — cleaner markup, same fade-in behavior)
  - `components/Cursor.tsx` (new — JS mouse tracker fixing invisible cursor bug)
  - `app/page.tsx` (updated — adds Cursor component)
  - `app/globals.css` (updated — .custom-cursor uses width/height transition, not scale)
  - `public/4.png` (added — 4TP logo for LogoIntro animation)
  - `public/4TPCirclePppl.png` (added — NOT used in UI; rejected due to baked-in text watermarks)
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
- Reason: Previous build had invisible cursor, content hidden by failed animation delays, blurry/broken background image, and layout not matching complexcon.com reference. Full rebuild resolved all issues.
- Commits: `94c8832` (rebuild), `088656b` (first redesign attempt, prior iteration)
- Deployment: `dpl_Q4dcFYLQBAq1mx4WQd96GPfJgQda` — READY — https://4-tp.vercel.app
- Verified: ✅ Chrome browser — animation plays, content visible, cursor visible, email form accessible.
- Date: 2026-03-20
- Change: Added non-Windows collaborator guide and linked it from Cursor OS README.
- Files Modified:
  - `cursor-os/non-windows-notes.md`
  - `cursor-os/README.md`
  - `brain/current_state.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
- Reason: Ensure Repo OS onboarding is clear for macOS/Linux collaborators.

- Date: 2026-03-20
- Change: Added quickstart guide for first-use and daily command flow, and linked it from Cursor OS README.
- Files Modified:
  - `cursor-os/quickstart.md`
  - `cursor-os/README.md`
  - `brain/current_state.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
- Reason: Reduce onboarding friction and make command usage explicit.

- Date: 2026-03-20
- Change: Removed Node bootstrap path and standardized Repo OS bootstrap on PowerShell script.
- Files Modified:
  - `scripts/init-cursor-os.js` (deleted)
  - `cursor-os/bootstrap-usage.md`
  - `cursor-os/global-template.md`
  - `README.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
- Reason: Keep setup aligned with locked-down environment that cannot install Node.

- Date: 2026-03-20
- Change: Added PowerShell bootstrap script and updated docs to support environments without Node.
- Files Modified:
  - `scripts/init-cursor-os.ps1`
  - `cursor-os/bootstrap-usage.md`
  - `README.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
- Reason: Enable Repo OS initialization on locked-down machines where Node cannot be installed.

- Date: 2026-03-20
- Change: Migrated repository to standardized Repo OS layout with refreshed brain schema, rules, docs, and bootstrap automation.
- Files Modified:
  - `brain/project_context.md`
  - `brain/architecture.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
  - `.cursor/rules/00-repo-brain.mdc`
  - `.cursor/rules/01-code-quality.mdc`
  - `.cursor/rules/02-debugging.mdc`
  - `.cursor/rules/03-planning.mdc`
  - `cursor-os/README.md`
  - `cursor-os/skills.md`
  - `cursor-os/subagents.md`
  - `cursor-os/commands.md`
  - `cursor-os/global-template.md`
  - `cursor-os/bootstrap-usage.md`
  - `scripts/init-cursor-os.js`
  - `README.md`
- Reason: Establish a portable, resumable AI workspace standard that can be reused across repositories.

- Date: 2026-03-20
- Change: Fixed malformed debug rule frontmatter and added heading to satisfy markdown lint.
- Files Modified:
  - `.cursor/rules/debug-systematically.mdc`
  - `brain/current_state.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`

- Date: 2026-03-20
- Change: Added brain cheat sheet and normalized rule naming with explicit rule names and descriptive filenames.
- Files Modified:
  - `brain/cheat_sheet.md`
  - `.cursor/rules/brain-enforcement-system.mdc`
  - `.cursor/rules/code-quality-enforcement.mdc`
  - `.cursor/rules/debug-systematically.mdc`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`

- Date: 2026-03-20
- Change: Added role-based workflow command presets for Architect, Executor, Debugger, and Analyst, and synced brain memory.
- Files Modified:
  - `.cursor/commands/architect.md`
  - `.cursor/commands/executor.md`
  - `.cursor/commands/debugger.md`
  - `.cursor/commands/analyst.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`

- Date: 2026-03-20
- Change: Added requested repo baseline for brain files, Cursor rules, reusable skills, and slash commands.
- Files Modified:
  - `brain/project_context.md`
  - `brain/architecture.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`
  - `.cursor/rules/brain-enforcement-system.mdc`
  - `.cursor/rules/code-standards.mdc`
  - `.cursor/rules/debugging.mdc`
  - `.cursor/skills/brain_update/SKILL.md`
  - `.cursor/skills/repo_analyze/SKILL.md`
  - `.cursor/skills/debug_mode/SKILL.md`
  - `.cursor/commands/start.md`
  - `.cursor/commands/resume.md`
  - `.cursor/commands/update-brain.md`
  - `.cursor/commands/plan.md`

- Date: 2026-03-20
- Change: Standardized brain templates and added `brain/architecture.md`.
- Files Modified:
  - `brain/project_context.md`
  - `brain/architecture.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`

- Date: 2026-03-20
- Change: Created initial persistent memory files in `brain/`.
- Files Modified:
  - `brain/project_context.md`
  - `brain/current_state.md`
  - `brain/decisions.md`
  - `brain/next_steps.md`
  - `brain/change_log.md`

- Date: 2026-03-20
- Change: Created and lint-fixed `.cursor/skills/update-brain/SKILL.md`.
- Files Modified:
  - `.cursor/skills/update-brain/SKILL.md`
