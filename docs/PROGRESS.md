# 4TP - Development Progress Log

Update this file at the end of every session.

- Last Updated: 2026-03-25
- Current Status: Phase 1 — gate flow shipped on `main` (`6b4173e`); rebase merged remote sections/CTA with gate orchestration

---

## Session Log

### Session 9 - 2026-03-25

Completed:

- Finished **rebase** of gate commit onto remote `main` (remote had `ContentSections`, `MobileCTA`, GSAP `LogoIntro` path); resolved conflicts in favor of gate funnel + editorial hero + Framer gate `LogoIntro`.
- **`GateExperience`**: mounts `ContentSections` + `MobileCTA` after hero; dispatches **`intro:done`** when `phase === 'site'`.
- **`globals.css`**: gate styles from gate branch plus **`section-grid-lines`** + **`navDotPulse`** for downstream components.
- Removed **`HeroBackground`** (delete confirmed).
- **`npm run build`** green; **pushed** `origin/main` at `6b4173e`.
- Brain + this log updated post-push.

Next:

- Vercel production verification; run Supabase funnel SQL if needed; full-device QA.

### Session 6 - 2026-03-25

Completed:

- Added `docs/DESIGN.md` (full product journey, motion principles, 3/4 gate, yellow email beat, analytics intent, inspiration notes).
- Removed silhouette + gyro `HeroBackground` (out of client scope); hero uses intentional negative space + global grain.
- Pointed `docs/DESIGN_RESEARCH.md` and `docs/AI_INSTRUCTIONS.md` at `DESIGN.md`.

Next:

- Implement gate + typewriter + yellow-hold email + funnel tracking per `DESIGN.md` checklist.
- Optionally delete `public/hero-silhouette-2.png` when ready to trim assets.

### Session 7 - 2026-03-25

Completed:

- Added `scripts/install.cmd` and `scripts/build.cmd` — prepend `C:\Users\e159305\node\node-v25.8.2-win-x64` to PATH for **cmd** npm/next.
- Ran `npm install` and `npm run build` successfully via those scripts.
- Refactored `app/api/subscribe/route.ts` to create Supabase (and optional Resend) **inside** `POST` so `next build` does not require env vars at module load.
- Updated brain (`current_state`, `next_steps`, `decisions`, `change_log`, `cheat_sheet`).

Next:

- Commit and push when ready.

### Session 8 - 2026-03-25

Completed:

- Implemented full **gate flow** per `docs/DESIGN.md`: white room (`/whiteroom.jpg`), 4 pillar questions with typewriter + Yes/No, **≥3 yes** grants access, denied screen with retry, logo reward on yellow (no slide to black), **yellow email** screen with `EmailForm` variant, main site (grain + cursor + hero) after successful join + **Continue to site**.
- Added `POST /api/funnel`, `docs/supabase-funnel-events.sql`, client `trackFunnel` + session id.
- `public/whiteroom.jpg` copied from repo root for static serving.

Next:

- Run `docs/supabase-funnel-events.sql` in Supabase so funnel events persist.
- Manual QA: full flow on mobile + desktop.

### Session 1 - 2026-03-20

Completed:

- Project foundation created (`app`, `components`, API route, Tailwind, configs).
- Initial landing page implementation built with logo intro, hero, and email form.
- `docs/PROGRESS.md` and `docs/DESIGN_RESEARCH.md` created.
- `next.config.mjs` added after identifying `next.config.ts` incompatibility with Next.js 14.

Decisions:

- Locked stack: Next.js 14 App Router, Tailwind, Framer Motion, Supabase, Resend, Vercel.
- Visual direction: dark editorial style with yellow square intro morph into 4TP logo.

### Session 2 - 2026-03-20

Completed:

- Confirmed Supabase subscribers table exists.
- Diagnosed deployment issue from `next.config.ts` usage.
- Defined requirement to add standing AI handoff protocol.

Open at end of session:

- Supabase-Vercel integration still incomplete.
- `RESEND_API_KEY` not yet added in Vercel.
- `docs/AI_INSTRUCTIONS.md` not yet created.

### Session 3 - 2026-03-20

Completed:

- Supabase -> Vercel native integration completed.
- Supabase env vars auto-injected in Vercel.
- `RESEND_API_KEY` added to Vercel.
- `next.config.ts` deleted.
- `docs/AI_INSTRUCTIONS.md` created.
- `app/layout.tsx` JSX corruption fixed.

Open at end of session:

- Deployment had moved from config/syntax failures to a TypeScript error in `components/LogoIntro.tsx`.

### Session 4 - 2026-03-20

Completed:

- Picked up continuity using docs and repository state.
- Verified `components/LogoIntro.tsx` includes `'done'` in phase union type.
- Verified `app/layout.tsx` is syntactically clean.
- Normalized docs formatting so session memory files are readable and maintainable.
- Checked live URL response: `https://4-tp.vercel.app` currently returns `404 NOT_FOUND`.
- Applied a proactive Next.js 14 type-safety fix in `app/layout.tsx`: moved `viewport` out of `metadata` to `export const viewport`.
- Fixed Vercel-blocking TypeScript error in `components/LogoIntro.tsx` by removing unreachable `phase !== 'done'` condition after the early return.

Blocked / limitations:

- Could not run local build in this shell because `npm` is unavailable in current environment.
- Vercel dashboard/build logs are not directly accessible from this local tooling session.

Next session priority:

1. Confirm latest Vercel deployment is green.
2. If failing, inspect Vercel logs and continue TypeScript/build fixes.
3. Run end-to-end test of live site and email submission.
4. Polish logo intro pacing and mobile responsiveness.

### Session 5 - 2026-03-20

Completed:

- Audited full repo state from commit history (25 commits confirmed).
- Confirmed Vercel deployment H7sLwXEeC is green (Current, Ready, 29s build).
- Confirmed live site loads at https://4-tp.vercel.app.
- Diagnosed LogoIntro animation issues: AnimatePresence exit was not triggering correctly, yellow square expansion had incorrect scale approach.
- Rewrote LogoIntro.tsx from scratch: proper AnimatePresence conditional rendering, width/height pixel expansion instead of scale, black overlay with centered yellow square, correct slide-up exit via y transform.
- Fixed trailing quote syntax error in LogoIntro.tsx (type tool artifact) that caused build failure.
- Verified Vercel deployment passes with new LogoIntro animation.
- Confirmed live site hero section renders correctly after animation.

Open at end of session:

- Logo intro animation completes too quickly (~3.4s total) to visually confirm full sequence via screenshot. Functional but pacing may need review.
- Hero section has tight left-edge layout (content starts at x=0) - padding/margin polish needed.
- Email form submission not yet end-to-end tested (Supabase insert + Resend send).
- Mobile responsiveness not yet verified.
- docs/DESIGN_RESEARCH.md Next Steps not yet updated this session.

---

## Phase Checklist

### Phase 1: Landing Page + Waitlist

- [x] README created (private pricing removed)
- [x] Vercel project setup
- [x] Supabase project setup
- [x] Resend setup
- [x] Core file structure created
- [x] `package.json` dependencies added
- [x] Tailwind brand tokens configured
- [x] `app/layout.tsx` implemented
- [x] `app/page.tsx` implemented
- [x] `app/globals.css` implemented
- [x] `components/LogoIntro.tsx` implemented
- [x] `components/HeroSection.tsx` implemented
- [x] `components/EmailForm.tsx` implemented
- [x] `app/api/subscribe/route.ts` implemented
- [x] `next.config.mjs` in place
- [x] `next.config.ts` removed
- [x] Supabase `subscribers` table created
- [x] Supabase -> Vercel integration active
- [x] `RESEND_API_KEY` set in Vercel
- [x] Core env vars present in Vercel
- [x] `docs/AI_INSTRUCTIONS.md` created
- [x] Vercel deployment green confirmed
- [ ] Live site tested end-to-end
- [ ] Email form tested (Supabase insert + Resend send)
- [ ] Logo intro animation polished
- [ ] Mobile responsiveness verified

### Phase 2: Design Polish

- [ ] Custom cursor
- [ ] Scroll-triggered reveals
- [ ] Parallax sections
- [ ] Performance optimization pass
- [ ] Accessibility audit

### Phase 3: Content + Launch

- [ ] Final copy review with client
- [ ] Social/meta preview tags
- [ ] Custom domain setup
- [ ] Privacy-first analytics
- [ ] Launch checklist complete

---

## Environment Variables (Expected in Vercel)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `SUPABASE_PUBLISHABLE_KEY`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`
- `RESEND_API_KEY`

---

## Supabase Table Reference

```sql
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page'
);
```
