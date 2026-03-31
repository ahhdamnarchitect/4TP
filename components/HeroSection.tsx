'use client'

import { motion } from 'framer-motion'
import EmailForm from './EmailForm'

/**
 * HeroSection — single-panel, email-capture focused.
 *
 * Background: solid brand yellow (#FEEB3D), continuing seamlessly
 * from the LogoIntro yellow flash. Black typography throughout.
 */

const VALUES = ['EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD']

const EASE = [0.16, 1, 0.3, 1] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
})

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: '#FEEB3D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
      aria-label="4TP Hero"
    >
      {/* Remotion motion overlay — silently absent until public/hero-bg.webm is rendered */}
      {/* mix-blend-mode: multiply keeps everything in the yellow palette */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <source src="/hero-bg.webm" type="video/webm" />
      </video>

      {/* Content */}
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
          maxWidth: '680px',
          padding: 'clamp(5.5rem, 12vw, 8rem) clamp(1.25rem, 5vw, 2.5rem) clamp(2rem, 5vw, 3rem)',
          boxSizing: 'border-box',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0)}
          style={{
            color: 'rgba(0, 0, 0, 0.55)',
            fontSize: 'clamp(0.5rem, 2.2vw, 0.65rem)',
            letterSpacing: 'clamp(0.12em, 0.5vw, 0.32em)',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, InterVariable, sans-serif',
          }}
        >
          Education &nbsp;·&nbsp; Inspiration &nbsp;·&nbsp; Discipline &nbsp;·&nbsp; Innovation
        </motion.p>

        {/* Headline — DM Serif Display */}
        <div style={{ marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <motion.div
            {...fadeUp(0.08)}
            style={{
              fontFamily: 'var(--font-display), "DM Serif Display", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(4rem, 13vw, 9.5rem)',
              lineHeight: 0.88,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            Move
          </motion.div>
          <motion.div
            {...fadeUp(0.16)}
            style={{
              fontFamily: 'var(--font-display), "DM Serif Display", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(4rem, 13vw, 9.5rem)',
              lineHeight: 0.88,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            Forward.
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.28)}
          style={{
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
            lineHeight: 1.75,
            fontWeight: 400,
            maxWidth: '400px',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
            fontFamily: 'Inter, InterVariable, sans-serif',
          }}
        >
          A creative network where education feels human,
          <br />
          vulnerability is welcomed, and growth is shared.
        </motion.p>

        {/* Email form */}
        <motion.div
          {...fadeUp(0.42)}
          style={{ width: '100%', maxWidth: '520px' }}
        >
          <EmailForm variant="yellow" />
        </motion.div>

        {/* Caption */}
        <motion.p
          {...fadeUp(0.56)}
          style={{
            color: 'rgba(0, 0, 0, 0.5)',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: '1rem',
            fontFamily: 'Inter, InterVariable, sans-serif',
          }}
        >
          Join the network — be first to know
        </motion.p>
      </div>

      {/* Black rule */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'calc(100% - clamp(2.5rem, 10vw, 10rem))',
          height: '1.5px',
          background: 'rgba(0,0,0,0.18)',
          flexShrink: 0,
        }}
      />

      {/* Values marquee */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          padding: '0.85rem 0',
          width: '100%',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          flexShrink: 0,
        }}
      >
        <div className="marquee-track">
          {[...VALUES, ...VALUES].map((v, i) => (
            <span
              key={i}
              style={{
                margin: '0 2rem',
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: '0.6rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, InterVariable, sans-serif',
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
