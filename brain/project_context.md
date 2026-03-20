# Project Context

## Purpose
This repository powers the 4TP landing experience and waitlist capture flow.
It delivers a motion-heavy brand-first homepage with an email signup API that
saves subscribers and sends a confirmation email. The codebase appears focused
on Phase 1 launch readiness while preserving room for future event, product,
and media-platform phases.

## Tech Stack
- Language: TypeScript
- Framework: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
- Runtime: Node.js (Next.js server/runtime)
- Infra: Vercel deployment
- Database: Supabase (`subscribers` table)
- Tooling: ESLint, TypeScript strict mode, PostCSS/Autoprefixer

## Primary Goals
- Ship and stabilize the Phase 1 landing page + waitlist flow.
- Maintain a resumable workflow so future contributors can continue quickly.

## Constraints
- Maintain strong visual identity (black/yellow editorial style, motion-forward UX).
- Keep submission flow reliable even when email delivery degrades (already partly handled).
- Avoid leaking sensitive credentials and keep server-side integration secure.

## Success Criteria
- Landing page renders correctly across target breakpoints.
- `/api/subscribe` reliably validates, stores, and responds for email submissions.
- Deployment is healthy and key user flow is end-to-end verified.
- Brain files remain updated so the next session can resume without re-discovery.

## Assumptions / Unknowns
- Exact production status and latest Vercel deployment health are not fully verified from this environment.
- No automated test suite is currently evident; validation appears mostly manual.
