'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * ContentSections — Scroll-driven content below the hero.
 *
 * Sections:
 *   1. "Move Different." — Large cinematic typographic statement
 *   2. The Pillars — 4-column breakdown of the 4TP foundation
 *   3. Community CTA — Final sign-up push
 *
 * All reveals use GSAP ScrollTrigger with expo eases.
 * Only transform + opacity used for GPU acceleration.
 */

const PILLARS = [
  {
    number: '01',
    title : 'Education',
    body  : 'Knowledge without limits. Tools and content designed to sharpen the mind and unlock new perspectives.',
  },
  {
    number: '02',
    title : 'Inspiration',
    body  : 'The spark that ignites change. Stories, art, and moments that remind you why you started.',
  },
  {
    number: '03',
    title : 'Discipline',
    body  : 'Consistency over motivation. The daily practice of showing up — even when you don\'t want to.',
  },
  {
    number: '04',
    title : 'Innovation',
    body  : 'Don\'t just follow the path. Build a new one. Question everything. Create what doesn\'t exist yet.',
  },
]

export default function ContentSections() {
  const moveDiffRef = useRef<HTMLElement>(null)
  const pillarsRef  = useRef<HTMLElement>(null)
  const ctaRef      = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── "Move Different." section ──────────────────────────────────────────
    const mdCtx = gsap.context(() => {
      // Big text lines split reveal
      gsap.from('.md-line', {
        opacity : 0,
        y       : 80,
        duration: 1.1,
        stagger : 0.15,
        ease    : 'expo.out',
        scrollTrigger: {
          trigger: moveDiffRef.current,
          start  : 'top 75%',
          once   : true,
        },
      })

      // Yellow rule expand
      gsap.from('.md-rule', {
        scaleX  : 0,
        opacity : 0,
        duration: 1.2,
        ease    : 'expo.out',
        delay   : 0.4,
        scrollTrigger: {
          trigger: moveDiffRef.current,
          start  : 'top 75%',
          once   : true,
        },
      })

      // Sub-copy
      gsap.from('.md-sub', {
        opacity : 0,
        y       : 24,
        duration: 0.9,
        ease    : 'expo.out',
        delay   : 0.6,
        scrollTrigger: {
          trigger: moveDiffRef.current,
          start  : 'top 75%',
          once   : true,
        },
      })
    }, moveDiffRef)

    // ── Pillars section ───────────────────────────────────────────────────
    const pilCtx = gsap.context(() => {
      gsap.from('.pillar-header', {
        opacity : 0,
        y       : 40,
        duration: 0.9,
        ease    : 'expo.out',
        scrollTrigger: {
          trigger: pillarsRef.current,
          start  : 'top 80%',
          once   : true,
        },
      })

      gsap.from('.pillar-card', {
        opacity : 0,
        y       : 60,
        duration: 0.8,
        stagger : 0.1,
        ease    : 'expo.out',
        delay   : 0.2,
        scrollTrigger: {
          trigger: pillarsRef.current,
          start  : 'top 75%',
          once   : true,
        },
      })
    }, pillarsRef)

    // ── Final CTA section ─────────────────────────────────────────────────
    const ctaCtx = gsap.context(() => {
      gsap.from('.cta-final-content', {
        opacity : 0,
        y       : 50,
        duration: 1.0,
        ease    : 'expo.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start  : 'top 80%',
          once   : true,
        },
      })
    }, ctaRef)

    return () => {
      mdCtx.revert()
      pilCtx.revert()
      ctaCtx.revert()
    }
  }, [])

  return (
    <>
      {/* ── Section 1: Move Different. ─────────────────────────────────────── */}
      <section
        ref={moveDiffRef}
        style={{
          position  : 'relative',
          minHeight : '100vh',
          background: '#000',
          display   : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding   : 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 8vw, 8rem)',
          overflow  : 'hidden',
        }}
      >
        {/* Background grid lines */}
        <div aria-hidden="true" className="section-grid-lines" />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px' }}>
          {/* Large typographic lines */}
          <div
            style={{
              fontWeight   : 900,
              fontSize     : 'clamp(4.5rem, 14vw, 11rem)',
              lineHeight   : 0.85,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color        : '#fff',
              marginBottom : 'clamp(2rem, 4vw, 3.5rem)',
              overflow     : 'hidden',
            }}
          >
            <div className="md-line" style={{ overflow: 'hidden' }}>
              <span style={{ display: 'block' }}>Not just</span>
            </div>
            <div className="md-line" style={{ overflow: 'hidden' }}>
              <span style={{ display: 'block', color: '#FEEB3D' }}>forward.</span>
            </div>
            <div className="md-line" style={{ overflow: 'hidden' }}>
              <span style={{ display: 'block' }}>Different.</span>
            </div>
          </div>

          {/* Yellow accent rule */}
          <div
            className="md-rule"
            style={{
              width        : 'clamp(80px, 20vw, 200px)',
              height       : '2px',
              background   : '#FEEB3D',
              marginBottom : 'clamp(1.5rem, 3vw, 2.5rem)',
              transformOrigin: 'left center',
            }}
          />

          {/* Sub-copy */}
          <p
            className="md-sub"
            style={{
              color        : 'rgba(255,255,255,0.38)',
              fontSize     : 'clamp(0.85rem, 2vw, 1.05rem)',
              lineHeight   : 1.8,
              fontWeight   : 300,
              maxWidth     : '480px',
              letterSpacing: '0.01em',
            }}
          >
            The world doesn&apos;t need more people going in the same direction.
            It needs people who move in ways no one has mapped.
          </p>
        </div>

        {/* Decorative large background text */}
        <div
          aria-hidden="true"
          style={{
            position    : 'absolute',
            bottom      : '-2vw',
            right       : '-2vw',
            fontWeight  : 900,
            fontSize    : 'clamp(8rem, 28vw, 22rem)',
            lineHeight  : 1,
            letterSpacing: '-0.06em',
            textTransform: 'uppercase',
            color       : 'rgba(255,255,255,0.02)',
            userSelect  : 'none',
            pointerEvents: 'none',
            whiteSpace  : 'nowrap',
          }}
        >
          4TP
        </div>
      </section>

      {/* ── Section 2: The Pillars ────────────────────────────────────────── */}
      <section
        ref={pillarsRef}
        style={{
          position  : 'relative',
          background: '#0a0a0a',
          padding   : 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem)',
          borderTop : '1px solid rgba(255,255,255,0.05)',
          overflow  : 'hidden',
        }}
      >
        {/* Section header */}
        <div
          className="pillar-header"
          style={{
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            display     : 'flex',
            alignItems  : 'flex-end',
            justifyContent: 'space-between',
            gap         : '2rem',
            flexWrap    : 'wrap',
          }}
        >
          <div>
            <p
              style={{
                color        : '#FEEB3D',
                fontSize     : '0.62rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight   : 600,
                marginBottom : '0.75rem',
              }}
            >
              The Foundation
            </p>
            <h2
              style={{
                fontWeight   : 900,
                fontSize     : 'clamp(2rem, 6vw, 4rem)',
                lineHeight   : 0.92,
                letterSpacing: '-0.03em',
                color        : '#fff',
                textTransform: 'uppercase',
                margin       : 0,
              }}
            >
              Four Pillars.<br />One Direction.
            </h2>
          </div>
        </div>

        {/* Pillar cards grid */}
        <div
          style={{
            display             : 'grid',
            gridTemplateColumns : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap                 : 'clamp(1rem, 2.5vw, 2rem)',
          }}
        >
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="pillar-card"
              style={{
                borderTop  : '1px solid rgba(255,255,255,0.08)',
                paddingTop : 'clamp(1.5rem, 3vw, 2rem)',
                paddingRight: '1rem',
              }}
            >
              <span
                style={{
                  display      : 'block',
                  fontWeight   : 700,
                  fontSize     : '0.6rem',
                  letterSpacing: '0.28em',
                  color        : '#FEEB3D',
                  marginBottom : '0.85rem',
                  textTransform: 'uppercase',
                }}
              >
                {pillar.number}
              </span>
              <h3
                style={{
                  fontWeight   : 800,
                  fontSize     : 'clamp(1.4rem, 3vw, 1.9rem)',
                  letterSpacing: '-0.02em',
                  lineHeight   : 1,
                  color        : '#fff',
                  textTransform: 'uppercase',
                  marginBottom : '1rem',
                  margin       : 0,
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  color      : 'rgba(255,255,255,0.35)',
                  fontSize   : 'clamp(0.78rem, 1.6vw, 0.9rem)',
                  lineHeight : 1.7,
                  fontWeight : 300,
                  marginTop  : '0.9rem',
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Final CTA ──────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        style={{
          position  : 'relative',
          background: '#000',
          padding   : 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 8vw, 8rem)',
          borderTop : '1px solid rgba(255,255,255,0.04)',
          textAlign : 'center',
          overflow  : 'hidden',
        }}
      >
        {/* Glowing yellow radial background */}
        <div
          aria-hidden="true"
          style={{
            position  : 'absolute',
            inset     : 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(254,235,61,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="cta-final-content"
          style={{
            position : 'relative',
            zIndex   : 1,
            maxWidth : '680px',
            margin   : '0 auto',
          }}
        >
          <p
            style={{
              color        : '#FEEB3D',
              fontSize     : '0.6rem',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              fontWeight   : 600,
              marginBottom : '1.5rem',
            }}
          >
            Early Access
          </p>

          <h2
            style={{
              fontWeight   : 900,
              fontSize     : 'clamp(2.5rem, 8vw, 6rem)',
              lineHeight   : 0.9,
              letterSpacing: '-0.03em',
              color        : '#fff',
              textTransform: 'uppercase',
              marginBottom : 'clamp(1.5rem, 3vw, 2rem)',
            }}
          >
            Be Among<br />
            <span style={{ color: '#FEEB3D' }}>The First.</span>
          </h2>

          <p
            style={{
              color      : 'rgba(255,255,255,0.35)',
              fontSize   : 'clamp(0.82rem, 1.8vw, 0.95rem)',
              lineHeight : 1.75,
              fontWeight : 300,
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            The 4TP Network launches soon. Join the waitlist and be first to
            access exclusive content, early tools, and community drops.
          </p>

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              const hero = document.getElementById('hero')
              if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' })
                setTimeout(() => {
                  const input = hero.querySelector('input[type="email"]') as HTMLInputElement
                  if (input) input.focus()
                }, 600)
              }
            }}
            style={{
              display      : 'inline-block',
              padding      : '1rem 3rem',
              background   : '#FEEB3D',
              color        : '#000',
              borderRadius : '9999px',
              fontSize     : '0.82rem',
              fontWeight   : 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily   : 'Inter, InterVariable, system-ui, sans-serif',
              transition   : 'transform 0.2s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.transform  = 'translateY(-2px)'
              el.style.boxShadow  = '0 12px 40px rgba(254,235,61,0.4)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.transform  = ''
              el.style.boxShadow  = ''
            }}
          >
            Join Early Access
          </a>
        </div>

        {/* Footer note */}
        <p
          style={{
            position     : 'relative',
            zIndex       : 1,
            marginTop    : 'clamp(3rem, 6vw, 5rem)',
            color        : 'rgba(255,255,255,0.14)',
            fontSize     : '0.62rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          © 2025 4TP Network — Education · Inspiration · Discipline · Innovation
        </p>
      </section>
    </>
  )
}
