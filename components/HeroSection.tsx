'use client'

import EmailForm from './EmailForm'

/**
 * HeroSection — ComplexCon-inspired, signup-focused layout.
 *
 * Background is intentional negative space (solid black + global grain).
 * See docs/DESIGN.md — silhouette + gyro removed as out of client scope.
 *
 * Visual hierarchy (top → bottom):
 *   1. Eyebrow (pillars)
 *   2. "MOVE FORWARD." — supportive headline, not dominant
 *   3. Tagline copy
 *   4. ★ EMAIL FORM — the focal point of the page ★
 *   5. Caption
 *   6. Yellow rule + values marquee
 */

const VALUES = ['EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD']

type Props = {
  variant?: 'dark' | 'yellow'
}

export default function HeroSection({ variant = 'dark' }: Props) {
  const isYellow = variant === 'yellow'

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: isYellow ? '#FEEB3D' : '#000',
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
      <div
        style={{
          position: 'relative',
          zIndex: 1,
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
        <p
          className="eyebrow-text"
          style={{
            color: isYellow ? 'rgba(0,0,0,0.6)' : undefined,
          }}
        >
          Education &nbsp;·&nbsp; Inspiration &nbsp;·&nbsp; Discipline &nbsp;·&nbsp; Innovation
        </p>

        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: isYellow ? '#000' : '#fff',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          MOVE{' '}
          <span style={{ color: isYellow ? '#000' : '#FEEB3D' }}>FORWARD.</span>
        </h1>

        <p
          style={{
            color: isYellow ? 'rgba(0,0,0,0.62)' : 'rgba(255,255,255,0.38)',
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

        <div
          style={{
            width: '100%',
            maxWidth: '520px',
          }}
        >
          <EmailForm variant={isYellow ? 'yellow' : 'dark'} />
        </div>

        <p
          className="caption-text"
          style={{
            color: isYellow ? 'rgba(0,0,0,0.75)' : undefined,
          }}
        >
          Join the network — be first to know
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'calc(100% - clamp(2.5rem, 10vw, 10rem))',
          height: '1.5px',
          background: isYellow ? 'rgba(0,0,0,0.55)' : '#FEEB3D',
          flexShrink: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          padding: '0.85rem 0',
          width: '100%',
          borderBottom: isYellow ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0,
        }}
      >
        <div className="marquee-track">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span
              key={i}
              style={{
                margin: '0 2rem',
                color: isYellow ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.45)',
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
