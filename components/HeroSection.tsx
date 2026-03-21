'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import EmailForm from './EmailForm'
import HeroBackground from './HeroBackground'

/**
 * HeroSection — Full-viewport hero with cinematic silhouette and signup.
 *
 * Content is hidden (opacity 0) until the LogoIntro fires 'intro:done'.
 * Then GSAP staggers in each element with an expo ease for a premium reveal.
 *
 * The HeroBackground silhouette is always rendered — it becomes visible
 * naturally as the LogoIntro overlay fades away during the morph phase.
 */

const VALUES = ['EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD']

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [, setRevealed] = useState(false)

  useEffect(() => {
    const onDone = () => {
      setRevealed(true)
      const el = contentRef.current
      if (!el) return

      // Stagger each direct child element in
      gsap.from(el.children, {
        opacity : 0,
        y       : 28,
        duration: 0.85,
        stagger : 0.12,
        ease    : 'expo.out',
        delay   : 0.05,
        clearProps: 'all',
      })

      el.style.opacity = '1'
    }

    window.addEventListener('intro:done', onDone)
    return () => window.removeEventListener('intro:done', onDone)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position  : 'relative',
        minHeight : '100dvh',
        background: '#000',
        display   : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Inter, InterVariable, system-ui, sans-serif',
        overflowX : 'hidden',
        width     : '100%',
        boxSizing : 'border-box',
      }}
      aria-label="4TP Hero"
    >
      {/* Silhouette background — revealed as LogoIntro overlay fades */}
      <HeroBackground />

      {/* Main content — hidden until intro:done, then staggered in */}
      <div
        ref={contentRef}
        style={{
          position  : 'relative',
          zIndex    : 1,
          flex      : 1,
          display   : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign : 'center',
          width     : '100%',
          maxWidth  : '720px',
          padding   : 'clamp(5.5rem, 12vw, 8rem) clamp(1.25rem, 5vw, 2.5rem) clamp(2rem, 5vw, 3rem)',
          boxSizing : 'border-box',
          opacity   : 0,  // hidden until intro:done fires
        }}
      >
        {/* Eyebrow */}
        <p className="eyebrow-text">
          Education &nbsp;·&nbsp; Inspiration &nbsp;·&nbsp; Discipline &nbsp;·&nbsp; Innovation
        </p>

        {/* Primary headline */}
        <h1
          style={{
            fontWeight  : 900,
            fontSize    : 'clamp(3rem, 10vw, 8rem)',
            lineHeight  : 0.88,
            letterSpacing: '-0.03em',
            color       : '#fff',
            textTransform: 'uppercase',
            margin      : 0,
            marginBottom: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          }}
        >
          Move{' '}
          <span style={{ color: '#FEEB3D' }}>Different.</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            color      : 'rgba(255,255,255,0.36)',
            fontSize   : 'clamp(0.78rem, 2vw, 0.95rem)',
            lineHeight : 1.75,
            fontWeight : 300,
            maxWidth   : '420px',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          A creative network built to inspire, push boundaries, and empower
          individuals to move forward with clarity and purpose.
        </p>

        {/* Email form */}
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <EmailForm />
        </div>

        {/* Caption */}
        <p className="caption-text" style={{ marginTop: '1.1rem' }}>
          Join the network — be first to know
        </p>
      </div>

      {/* Yellow rule */}
      <div
        style={{
          position  : 'relative',
          zIndex    : 1,
          width     : 'calc(100% - clamp(2.5rem, 10vw, 10rem))',
          height    : '1px',
          background: 'rgba(254,235,61,0.6)',
          flexShrink: 0,
        }}
      />

      {/* Values marquee */}
      <div
        style={{
          position  : 'relative',
          zIndex    : 1,
          overflow  : 'hidden',
          padding   : '0.9rem 0',
          width     : '100%',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        <div className="marquee-track">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span
              key={i}
              style={{
                margin      : '0 2.5rem',
                color       : 'rgba(255,255,255,0.35)',
                fontSize    : '0.58rem',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                fontWeight  : 500,
                whiteSpace  : 'nowrap',
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
