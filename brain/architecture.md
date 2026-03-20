# Architecture

## High-Level Design
The system is a Next.js App Router web app with a single primary landing route
and one server API endpoint for email subscription. Client components drive the
animated hero and signup UX, while the API route validates input, writes to
Supabase, and attempts confirmation email via Resend.

## Key Modules
- Module / directory: `app/`
  - Responsibility: route composition, root layout metadata, API route mounting.
  - Notes: `app/page.tsx` is the primary landing entry.
- Module / directory: `components/`
  - Responsibility: visual sections and interaction components (`LogoIntro`, `HeroSection`, `EmailForm`).
  - Notes: heavy use of Framer Motion for entrance/timing choreography.
- Module / directory: `app/api/subscribe/route.ts`
  - Responsibility: subscription intake, validation, database insert, email send.
  - Notes: duplicate key handling is implemented (`23505`).
- Module / directory: `docs/`
  - Responsibility: progress and design continuity notes.
  - Notes: useful as operational memory but not runtime logic.

## Entry Points
- File: `app/page.tsx`
  - Purpose: renders landing scene and orchestrates intro + hero flow.
- File: `app/layout.tsx`
  - Purpose: global metadata, viewport, base HTML/body shell.
- File: `app/api/subscribe/route.ts`
  - Purpose: POST API for waitlist submissions.

## Data Flow
User enters email in `EmailForm` -> client posts to `/api/subscribe` -> server
normalizes and validates email -> server inserts into Supabase `subscribers` ->
server attempts confirmation email via Resend -> API returns success/error JSON
for client UI state transitions.

## External Integrations
- Service: Supabase
  - Purpose: persistent storage for subscriber records.
- Service: Resend
  - Purpose: transactional confirmation email delivery.
- Service: Vercel
  - Purpose: hosting and deployment runtime.

## Risks / Fragile Areas
- Environment-dependent behavior (missing env vars can break subscribe flow).
- No clearly defined automated tests for API and critical user flow.
- Motion-heavy UI may cause regressions on low-power/mobile devices without profiling.
