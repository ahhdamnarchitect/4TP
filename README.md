# 4TP — Website Design Brief & Project Roadmap

> **Designer:** ahhdamnarchitect
> > **Client:** 4TP Network
> > > **Phase 1 Deadline:** April 1, 2025
> > > > **Repo:** Private — ahhdamnarchitect/4TP
> > > >
> > > > ---
> > > >
> > > > ## What is 4TP?
> > > >
> > > > 4TP Network is a creative media and education platform built around four core values: **Education, Inspiration, Discipline, and Innovation**. The brand is not carving out a single niche — it is a creative space designed to inspire people to discover new direction, unlock breakthroughs, and move forward through powerful visual storytelling.
> > > >
> > > > ---
> > > >
> > > > ## Brand Identity
> > > >
> > > > ### Mission Statement
> > > > > "At 4TP, our mission is to inspire, push boundaries, and create experiences where education feels human, vulnerability is welcomed, and growth is shared. By encouraging curiosity and challenging perspectives, we aim to empower individuals to move forward with clarity and purpose."
> > > > >
> > > > > ### Vision Statement
> > > > > > "Our vision is to help people discover new direction and unlock breakthroughs that move them forward. Through powerful visual storytelling, we aim to transform complex ideas and discoveries into relatable narratives that inspire individuals to reach their greatest potential."
> > > > > >
> > > > > > ### Core Values
> > > > > > - **Education** — Knowledge should be accessible, engaging, and impactful.
> > > > > > - - **Inspiration** — Content and experiences should motivate people to pursue meaningful growth.
> > > > > >   - - **Discipline** — Discipline should feel like progress and consistent effort leads to transformation.
> > > > > >     - - **Innovation** — We challenge perspectives and push creative boundaries to create new ways of learning and storytelling.
> > > > > >      
> > > > > >       - ---
> > > > > >
> > > > > > ## Visual Identity
> > > > > >
> > > > > > ### Logo
> > > > > > Bold black "4" on a yellow (`#FEEB3D`) background — **square format** (not circular)
> > > > > > > The owner noted: "I can see the 4TP logo starting like [a box] but instead of a circle it's a box"
> > > > > > >
> > > > > > > ### Color Palette
> > > > > > >
> > > > > > > | Name | Hex |
> > > > > > > |------|-----|
> > > > > > > | 4TP Yellow | `#FEEB3D` |
> > > > > > > | Black | `#000000` |
> > > > > > > | White | `#FFFFFF` (implied) |
> > > > > > >
> > > > > > > ### Typography
> > > > > > > - **Primary typeface:** Inter (https://rsms.me/inter/)
> > > > > > > -   - Clean, modern, grotesque sans-serif — highly readable at all sizes
> > > > > > >     - - Owner wants to see 3 additional font options drawn from design references provided
> > > > > > >      
> > > > > > >       - ---
> > > > > > >
> > > > > > > ## Design References & Aesthetic Direction
> > > > > > >
> > > > > > > ### ComplexCon — complexcon.com
> > > > > > > > What the owner said: "Reference landing page — I like how it's clean and simple to receive email submissions"
> > > > > > > > - Dark background, large bold typography, centered logo, prominent email input field with inline CTA button
> > > > > > > > - - Minimal navigation, event-forward, high-impact visual treatment
> > > > > > > >  
> > > > > > > >   - ### OuiOui001 — ouioui001.com
> > > > > > > >   - > What the owner said: "When you enter this website I like how the name ouioui appears as you enter the website"
> > > > > > > >     > - Features an animated brand name intro on page load — text-forward, typographic, editorial feel
> > > > > > > >     > - - Avant-garde fashion archive aesthetic — large type, lots of white space, monochrome
> > > > > > > >     >   - - **Logo animation reference:** Client provided a screen recording showing a shape that starts as a circle, blends/morphs and expands into the full logo. For 4TP, this becomes: **a square that morphs and expands into the full 4TP logo mark on page load**, similar to the OuiOui name entrance animation.
> > > > > > > >     >    
> > > > > > > >     >     - ### Architectural Digest — architecturaldigest.com
> > > > > > > >     >     - - High editorial standard, clean grid layout, sophisticated typography
> > > > > > > >     >       - - Strong contrast between imagery and text, content-forward design
> > > > > > > >     >        
> > > > > > > >     >         - ### Motion / Animation Reference
> > > > > > > >     >         - - Owner shared a screen recording demonstrating blended motion (morphing/fluid logo animation)
> > > > > > > >     >           - - Wants interactive, abstract entry animations — not static
> > > > > > > >     >             - - The OuiOui brand-name entrance animation is a direct reference for the 4TP landing experience
> > > > > > > >     >              
> > > > > > > >     >               - ---
> > > > > > > >     >
> > > > > > > >     > ## Tech Stack
> > > > > > > >     >
> > > > > > > >     > | Layer | Tool |
> > > > > > > >     > |-------|------|
> > > > > > > >     > | Framework | Next.js (App Router) |
> > > > > > > >     > | Styling | Tailwind CSS |
> > > > > > > >     > | Hosting | Vercel |
> > > > > > > >     > | Database / Auth / Storage | Supabase |
> > > > > > > >     > | Transactional Email | Resend |
> > > > > > > >     > | Campaign Email (later) | Loops.so or Kit (kit.com) |
> > > > > > > >     > | Video Streaming (Phase 4) | Mux |
> > > > > > > >     > | Payments | Stripe |
> > > > > > > >     > | Font | Inter (rsms.me/inter) |
> > > > > > > >     >
> > > > > > > >     > > **Skip:** Jotform, Google Sheets, Mailchimp — Supabase covers all of those use cases.
> > > > > > > >     > >
> > > > > > > >     > > ---
> > > > > > > >     > >
> > > > > > > >     > > ## Project Phases
> > > > > > > >     > >
> > > > > > > >     > > ### Phase 1 — Landing Page (Due: April 1, 2025)
> > > > > > > >     > > - Full-screen, animated, interactive landing page
> > > > > > > >     > > - - Animated logo entrance: **square morphs/expands into 4TP logo** (OuiOui-style)
> > > > > > > >     > >   - - Email capture form — clean, prominent, minimal (ComplexCon-style)
> > > > > > > >     > >     - - Confirmation email sent to subscriber on signup (via Resend)
> > > > > > > >     > >       - - Emails stored in Supabase
> > > > > > > >     > >         - - Responsive across all breakpoints
> > > > > > > >     > >           - - Deploy to Vercel
> > > > > > > >     > >             - - **Vibe:** Creative, abstract, bold. Yellow + Black palette. Inter typeface. Motion-forward.
> > > > > > > >     > >              
> > > > > > > >     > >               - ### Phase 2 — Event Registration (July/August 2025)
> > > > > > > >     > >               - - Eventbrite-style ticket flow
> > > > > > > >     > >                 - - Event page accessible via toggled link (on/off switch in admin)
> > > > > > > >     > >                   - - RSVP confirmation email (via Resend)
> > > > > > > >     > >                     - - Customer data stored in Supabase
> > > > > > > >     > >                       - - Stripe payment integration (TBC)
> > > > > > > >     > >                         - - Email campaign blast sent from stored list (Loops.so or Kit)
> > > > > > > >     > >                          
> > > > > > > >     > >                           - ### Phase 3 — Product Pages (TBD)
> > > > > > > >     > >                           - - Product listing pages
> > > > > > > >     > >                             - - Cart and/or Stripe Payment Links
> > > > > > > >     > >                               - - May happen before Phase 2 depending on demand
> > > > > > > >     > >                                
> > > > > > > >     > >                                 - ### Phase 4 — Media Network / Content Platform (TBD)
> > > > > > > >     > >                                 - - Netflix/YouTube-style content experience
> > > > > > > >     > >                                   - - Subscription-gated content
> > > > > > > >     > >                                     - - Mux for video streaming and adaptive bitrate
> > > > > > > >     > >                                       - - User authentication (Supabase Auth)
> > > > > > > >     > >                                         - - Subscription billing (Stripe)
> > > > > > > >     > >                                          
> > > > > > > >     > >                                           - ---
> > > > > > > >     > >
> > > > > > > >     > > ## Key Design Principles for Phase 1
> > > > > > > >     > >
> > > > > > > >     > > 1. **Bold entrance** — The 4TP square/logo should morph and animate in on load, similar to how OuiOui's name appears on entry
> > > > > > > >     > > 2. 2. **Email capture is the CTA** — Everything on the landing page serves the email signup, like ComplexCon
> > > > > > > >     > >    3. 3. **Yellow + Black** — The brand's signature palette should dominate
> > > > > > > >     > >       4. 4. **Inter typeface** — Clean, heavy weight for headlines, lighter for body
> > > > > > > >     > >          5. 5. **Abstract and interactive** — Not a standard template; motion, blended transitions, and creative layout
> > > > > > > >     > >             6. 6. **Mobile-first responsive** — Must look great on all screens
> > > > > > > >     > >                7. 7. **Cutting-edge 2026 design** — Immersive, performance-driven, guided scroll interactions, dark mode aesthetic
> > > > > > > >     > >                  
> > > > > > > >     > >                   8. ---
> > > > > > > >     > >                  
> > > > > > > >     > >                   9. ## Resources & Links
> > > > > > > >     > >                  
> > > > > > > >     > >                   10. - **Milanote Design Board:** https://app.milanote.com/1W2Yp41EtzNset/website-reference
> > > > > > > > - **Inter Font:** https://rsms.me/inter/
> > > > > > > > - - **ComplexCon Reference:** https://www.complexcon.com/
> > > > > > > >   - - **OuiOui Reference:** https://www.ouioui001.com/
> > > > > > > >     - - **Architectural Digest Reference:** https://www.architecturaldigest.com/
> > > > > > > >       - - **Vercel:** https://vercel.com
> > > > > > > >         - - **Supabase:** https://supabase.com
> > > > > > > >           - - **Resend:** https://resend.com
> > > > > > > >             - - **Loops.so:** https://loops.so
> > > > > > > >               - - **Mux:** https://mux.com
> > > > > > > >                 - - **Stripe:** https://stripe.com
