'use client'

import EmailForm from './EmailForm'

/**
 * HeroSection — ComplexCon-inspired dark editorial layout.
 *
 * Design principles:
 * - Solid black background (no background image)
 * - Oversized display typography fills the viewport width
 * - Content is ALWAYS visible — LogoIntro overlay reveals it on exit
 * - Yellow (#FEEB3D) as the sole brand accent
 * - Two-column bottom split: copy + form on left, year stamp on right
 * - Thin yellow rule + values marquee at the bottom
 */

const VALUES = ['EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD']

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, InterVariable, system-ui, sans-serif',
      }}
      aria-label="4TP Hero"
    >
      {/* ── Main hero body ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vw, 3.5rem)',
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >

        {/* ── Eyebrow line ── */}
        <p
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '0.68rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          Education &nbsp;·&nbsp; Inspiration &nbsp;·&nbsp; Discipline &nbsp;·&nbsp; Innovation
        </p>

        {/* ── Display headline ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(4.5rem, 14.5vw, 17rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              color: '#fff',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            MOVE
            <br />
            <span style={{ color: '#FEEB3D' }}>FORWARD.</span>
          </h1>
        </div>

        {/* ── Bottom row: copy + form | year stamp ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '3rem',
          }}
        >
          {/* Left: description + email form */}
          <div style={{ maxWidth: '420px', flex: '1 1 300px' }}>
            {/* Yellow rule */}
            <div
              style={{
                width: '48px',
                height: '2px',
                background: '#FEEB3D',
                marginBottom: '1.5rem',
              }}
            />

            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.95rem',
                lineHeight: 1.65,
                marginBottom: '1.75rem',
                fontWeight: 300,
              }}
            >
              A creative network for those who push boundaries,
              challenge perspectives, and move through life with purpose.
            </p>

            <EmailForm />

            <p
              style={{
                color: 'rgba(255,255,255,0.15)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '0.75rem',
              }}
            >
              Join the network — be first to know
            </p>
          </div>

          {/* Right: large faded year */}
          <div
            style={{
              fontWeight: 900,
              fontSize: 'clamp(5rem, 12vw, 11rem)',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              color: 'rgba(255,255,255,0.04)',
              userSelect: 'none',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            2026
          </div>
        </div>
      </div>

      {/* ── Yellow accent rule ── */}
      <div
        style={{
          height: '2px',
          background: '#FEEB3D',
          margin: '0 clamp(1.5rem, 5vw, 5rem)',
        }}
      />

      {/* ── Values marquee ── */}
      <div
        style={{
          overflow: 'hidden',
          padding: '1rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="marquee-track">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span
              key={i}
              style={{
                margin: '0 2.5rem',
                color: 'rgba(255,255,255,0.18)',
                fontSize: '0.65rem',
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
