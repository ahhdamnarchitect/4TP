# AI Instructions for 4TP Project

This file contains standing instructions for any AI assistant (Claude, Cursor, GPT, Copilot, etc.) working on this project.
Read this file before touching any code.

---

## MANDATORY SESSION PROTOCOL

### START of every session:
1. Read `docs/PROGRESS.md` — understand what was done, what's next, and what's blocked
2. Read `docs/DESIGN_RESEARCH.md` — understand the design direction, animation spec, and current Next Steps checklist
3. Never skip this step. The files are your source of truth.

### END of every session:
1. Add a new dated entry to `docs/PROGRESS.md` with:
   - Session date (YYYY-MM-DD)
      - What was completed this session
         - What is still in progress or blocked
            - What should be done next session
            2. Check off completed items in the Phase Checklist in `docs/PROGRESS.md`
            3. Update the "Next Steps" section in `docs/DESIGN_RESEARCH.md`
            4. Commit both files together with this message format:
               `docs: update PROGRESS.md and DESIGN_RESEARCH.md — session YYYY-MM-DD`

               **Never skip the end-of-session update. This is what keeps the project continuity alive across AI sessions.**

               ---

               ## PROJECT OVERVIEW

               **Client:** 4TP brand
               **Project:** Landing page / waitlist site
               **Live URL:** https://4-tp.vercel.app
               **GitHub:** https://github.com/ahhdamnarchitect/4TP
               **Vercel Project:** ahhdamndev / 4-tp

               ---

               ## TECH STACK (LOCKED — do not change)

               | Layer | Tech |
               |-------|------|
               | Framework | Next.js 14 (App Router) |
               | Styling | Tailwind CSS |
               | Animation | Framer Motion |
               | Database | Supabase (subscribers table) |
               | Email | Resend |
               | Deployment | Vercel |
               | Font | Inter (Google Fonts) |

               **Do NOT introduce:** Mailchimp, Jotform, Google Sheets, Next.js 15, or any paid services.

               ---

               ## COMMIT MESSAGE CONVENTIONS

               | Type | When to use |
               |------|------------|
               | `feat:` | New features or components |
               | `fix:` | Bug fixes |
               | `docs:` | Documentation updates |
               | `chore:` | Config, tooling, dependencies |
               | `style:` | CSS/styling only changes |
               | `refactor:` | Code restructuring, no behavior change |

               ---

               ## ENVIRONMENT VARIABLES

               All env vars are set in Vercel. Never hardcode secrets.

               Required variables (all set via Supabase-Vercel integration + manual Resend):
               - `NEXT_PUBLIC_SUPABASE_URL`
               - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
               - `SUPABASE_SERVICE_ROLE_KEY`
               - `RESEND_API_KEY`

               For local development, create `.env.local` (gitignored). Never commit `.env.local`.

               ---

               ## DESIGN SYSTEM

               **Colors:**
               - Brand Yellow: `#F5C842` (Tailwind: `brand-yellow`)
               - Brand Black: `#0A0A0A` (Tailwind: `brand-black`)
               - Brand White: `#FAFAFA` (Tailwind: `brand-white`)

               **Typography:**
               - Font: Inter
               - Weights: 400 (regular), 700 (bold), 900 (black)

               **Animation (Logo Intro):**
               - A yellow square morphs/expands to reveal the full 4TP logo on page load
               - Pacing reference: OuiOui001.com
               - Key constraint: START with a SQUARE (not a circle)
               - See `components/LogoIntro.tsx` for implementation

               ---

               ## RULES

               1. **No money**: Do not upgrade any subscription plans or use paid APIs beyond what's already active
               2. **No permanent deletes** without explicit user confirmation
               3. **No sharing/permissions changes** to any files or services
               4. **Always update docs** at end of session — this is non-negotiable
               5. **Pricing info is private** — never include developer rates or payment details in any public file
               6. **Check Vercel deployment** after any config changes — confirm build passes before ending session

               ---

               ## SUPABASE SCHEMA

               ```sql
               CREATE TABLE IF NOT EXISTS subscribers (
                 id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                   email TEXT UNIQUE NOT NULL,
                     created_at TIMESTAMPTZ DEFAULT NOW(),
                       source TEXT DEFAULT 'landing_page'
                       );
                       ```

                       ---

                       ## CURRENT DEPLOYMENT STATUS

                       - Vercel auto-deploys from `main` branch
                       - Supabase-Vercel native integration is active (auto-syncs Supabase env vars)
                       - RESEND_API_KEY is set manually in Vercel env vars

                       ---

                       ## HOW TO USE THIS FILE IN CURSOR

                       Add this to your Cursor `.cursorrules` or project rules:

                       ```
                       Read docs/AI_INSTRUCTIONS.md, docs/PROGRESS.md, and docs/DESIGN_RESEARCH.md before starting work.
                       Update docs/PROGRESS.md and docs/DESIGN_RESEARCH.md at end of every session.
                       Commit both with: docs: update PROGRESS.md and DESIGN_RESEARCH.md — session YYYY-MM-DD
                       ```

                       ---

                       *Last updated: 2026-03-20*
