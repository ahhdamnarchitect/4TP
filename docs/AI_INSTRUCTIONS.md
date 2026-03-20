# AI Instructions for 4TP

Standing protocol for any AI assistant (Cursor, Claude, GPT, Copilot) working on this repository.

- Last updated: 2026-03-20

---

## Mandatory Session Protocol

### At Session Start

1. Read `docs/PROGRESS.md`.
2. Read `docs/DESIGN_RESEARCH.md`.
3. Continue from the latest logged state before making any changes.

### At Session End

1. Add a dated session entry in `docs/PROGRESS.md`:
   - what was completed
   - what is blocked or unverified
   - next actions
2. Update the checklist in `docs/PROGRESS.md`.
3. Update `docs/DESIGN_RESEARCH.md` "Next Steps" section.
4. Commit docs updates using:
   - `docs: update PROGRESS.md and DESIGN_RESEARCH.md — session YYYY-MM-DD`

Do not skip this. These files are the continuity layer between AI sessions.

---

## Project Overview

- Client brand: 4TP
- Project type: landing page + waitlist
- Live URL: `https://4-tp.vercel.app`
- GitHub: `https://github.com/ahhdamnarchitect/4TP`
- Vercel project: `ahhdamndev/4-tp`

---

## Locked Stack (Do Not Change)

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- Supabase
- Resend
- Vercel
- Inter font

Do not introduce Mailchimp, Jotform, Google Sheets, Next.js 15, or paid tools.

---

## Brand and Design Constraints

- Logo intro must start with a **yellow square** (not a circle).
- Sequence: square -> morph/expand -> full 4TP logo reveal.
- Pacing reference: OuiOui001 style (confident, deliberate timing).
- Color tokens:
  - `#F5C842` yellow
  - `#0A0A0A` black
  - `#FAFAFA` white

---

## Operational Rules

1. No spending money and no subscription upgrades.
2. Never commit secrets (`.env.local`, API keys, tokens).
3. Do not publish private pricing/developer payment details.
4. Confirm deployment health after meaningful fixes.
5. Keep docs updated every session.

---

## Environment Variables

Expected in Vercel (Supabase integration + manual Resend):

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
