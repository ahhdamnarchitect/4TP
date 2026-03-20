# 4TP — Development Progress Log

> **Update this file every commit.** This is the source of truth for project state.
> Last Updated: March 20, 2026

---

## Current Status: Phase 1 — Landing Page IN PROGRESS

---

## Session Log

### Session 1 — March 20, 2026
**What was done:**
- Initial project setup and strategy (Claude consultation)
- README.md created with full project brief, tech stack, phases
- Vercel project connected: https://vercel.com/ahhdamndev/4-tp
- Supabase project created: https://supabase.com/dashboard/project/nhgwjshndtoudvmrzhup
- Resend account connected

**What was decided:**
- Stack: Next.js (App Router) + Tailwind + Vercel + Supabase + Resend
- No Mailchimp, Jotform, or Google Sheets
- Phase 1 deliverable: landing page with email capture + confirmation email

### Session 2 — March 20, 2026
**What was done:**
- README updated: pricing section removed (private), animation notes clarified
- docs/DESIGN_RESEARCH.md created: 2026 trends, animation plan, font system, color tokens
- docs/PROGRESS.md created (this file)
- Full project file structure scaffolded
- Landing page built: app/page.tsx with full hero, animation, email form

**Animation Spec Confirmed:**
- Client video reference: shape starts as a circle → morphs/blends → expands into full logo
- For 4TP: **yellow square** → morphs/expands into **full 4TP logo mark**
- OuiOui001 pacing reference: slow, deliberate, confident

**What still needs to be done:**
- Supabase `subscribers` table setup (run SQL in dashboard)
- Resend API key wired in `.env.local`
- Email confirmation template finalized
- Deploy to Vercel and verify live URL

---

## File Structure

```
4TP/
├── README.md                          # Project brief (public-facing)
├── docs/
│   ├── DESIGN_RESEARCH.md             # 2026 trends + animation + font research
│   └── PROGRESS.md                    # This file — session log + status
├── app/
│   ├── layout.tsx                     # Root layout with Inter font + metadata
│   ├── page.tsx                       # Landing page (hero + email form)
│   ├── globals.css                    # Global styles + CSS variables
│   └── api/
│       └── subscribe/
│           └── route.ts               # POST /api/subscribe → Supabase + Resend
├── components/
│   ├── LogoIntro.tsx                  # Animated logo entrance sequence
│   ├── HeroSection.tsx                # Full-screen hero with email form
│   ├── EmailForm.tsx                  # Email capture form component
│   └── ScrollReveal.tsx               # Scroll-triggered reveal wrapper
├── lib/
│   ├── supabase.ts                    # Supabase client
│   └── resend.ts                      # Resend client
├── public/
│   └── 4tp-logo.svg                   # SVG logo mark
├── .env.local                         # (NOT committed) env variables
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Environment Variables Required

Create `.env.local` in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key

# App
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
```

Get these from:
- Supabase: https://supabase.com/dashboard/project/nhgwjshndtoudvmrzhup/settings/api
- Resend: https://resend.com/api-keys

---

## Supabase Setup

Run this SQL in the Supabase SQL editor to create the subscribers table:

```sql
create table subscribers (
  id uuid default gen_random_uuid() primary key,
    email text unique not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        source text default 'landing_page'
        );

        -- Enable RLS
        alter table subscribers enable row level security;

        -- Allow inserts from anon (landing page form)
        create policy "Allow anon inserts" on subscribers
          for insert with check (true);
          ```

          ---

          ## Deployment

          - **Vercel Project:** https://vercel.com/ahhdamndev/4-tp
          - **GitHub Repo:** https://github.com/ahhdamnarchitect/4TP
          - Connected: Vercel auto-deploys on push to `main`
          - Add env variables in Vercel dashboard → Settings → Environment Variables

          ---

          ## Design Tokens Reference

          | Token | Value | Usage |
          |-------|-------|-------|
          | Yellow | #FEEB3D | Primary accent, logo bg, CTA hover |
          | Black | #000000 | Page background, logo "4" |
          | White | #FFFFFF | Body text, form input text |
          | Gray Dark | #111111 | Section backgrounds |
          | Gray Mid | #1A1A1A | Card backgrounds |
          | Inter Black | weight 900 | Hero headline |
          | Inter Bold | weight 700 | Section headings |
          | Inter Regular | weight 400 | Body copy |

          ---

          ## Phase Checklist

          ### Phase 1 — Landing Page
          - [x] README finalized
          - [x] Research documented
          - [x] Progress tracking set up
          - [x] File structure planned
          - [ ] Next.js project initialized locally
          - [x] app/layout.tsx created
          - [x] app/page.tsx created (landing page)
          - [x] app/globals.css created
          - [x] app/api/subscribe/route.ts created
          - [x] components/LogoIntro.tsx created
          - [x] components/HeroSection.tsx created
          - [x] components/EmailForm.tsx created
          - [x] tailwind.config.ts created with brand tokens
          - [ ] Supabase subscribers table created
          - [ ] .env.local configured (local only)
          - [ ] Resend API key set
          - [ ] Test email flow locally
          - [ ] Deploy to Vercel
          - [ ] Verify live URL

          ### Phase 2 — Event Registration (July/August 2026)
          - [ ] TBD

          ### Phase 3 — Products (TBD)
          - [ ] TBD

          ### Phase 4 — Media Platform (TBD)
          - [ ] TBD
