'use client'

import EmailForm from './EmailForm'

/**
 * HeroSection — ComplexCon-inspired, signup-focused layout.
 *
 * Visual hierarchy (top → bottom):
 *   1. Eyebrow (pillars)
 *   2. "MOVE FORWARD." — supportive headline, not dominant
 *   3. Tagline copy
 *   4. ★ EMAIL FORM — the focal point of the page ★
 *   5. Caption
 *   6. Yellow rule + values marquee
 *
 * Everything is center-aligned. Form sits in the lower visual center,
 * where the eye naturally lands — mirroring ComplexCon's structure.
 */

const VALUES = ['EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD']

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Inter, InterVariable, system-ui, sans-serif',
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
      aria-label="4TP Hero"
    >
      {/* ── Main centered content ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '720px',
          padding: 'clamp(5.5rem, 12vw, 8rem) clamp(1.25rem, 5vw, 2.5rem) clamp(2rem, 5vw, 3rem)',
          boxSizing: 'border-box',
          gap: '0',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            color: 'rgba(255,255,255,0.28)',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.7rem)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          Education &nbsp;·&nbsp; Inspiration &nbsp;·&nbsp; Discipline &nbsp;·&nbsp; Innovation
        </p>

        {/* Headline — secondary supporting role */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#fff',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          MOVE{' '}
          <span style={{ color: '#FEEB3D' }}>FORWARD.</span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.38)',
            fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: '440px',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          A creative network built to inspire, push boundaries, and empower
          individuals to move forward with clarity and purpose.
        </p>

        {/* ── EMAIL FORM — FOCAL POINT ── */}
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
          }}
        >
          <EmailForm />
        </div>

        {/* Caption */}
        <p
          style={{
            color: 'rgba(255,255,255,0.18)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}
        >
          Join the network — be first to know
        </p>
      </div>

      {/* ── Yellow accent rule ── */}
      <div
        style={{
          width: 'calc(100% - clamp(2.5rem, 10vw, 10rem))',
          height: '1.5px',
          background: '#FEEB3D',
          flexShrink: 0,
        }}
      />

      {/* ── Values marquee ── */}
      <div
        style={{
          overflow: 'hidden',
          padding: '0.85rem 0',
          width: '100%',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0,
        }}
      >
        <div className="marquee-track">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span
              key={i}
              style={{
                margin: '0 2rem',
                color: 'rgba(255,255,255,0.18)',
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight: 500,
                whiteSpace: 'nowrap',
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
