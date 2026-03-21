'use client'

import { useEffect, useRef } from 'react'

/**
 * Nav — Fixed top navigation.
 *
 * Listens for 'intro:done' custom event (dispatched by LogoIntro when the
 * logo finishes its morph travel to the nav position) then fades in.
 * Plain CSS transition is used to avoid Framer Motion scheduler conflicts.
 */
export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onDone = () => {
      nav.style.opacity = '1'
    }

    window.addEventListener('intro:done', onDone)
    return () => window.removeEventListener('intro:done', onDone)
  }, [])

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      style={{
        position  : 'fixed',
        top       : 0,
        left      : 0,
        right     : 0,
        zIndex    : 100,
        display   : 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding   : '1.5rem clamp(1.5rem, 5vw, 5rem)',
        fontFamily: 'Inter, InterVariable, system-ui, sans-serif',
        opacity   : 0,
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        // Subtle backdrop on scroll (set via JS if needed)
      }}
    >
      {/* Brand wordmark */}
      <span
        style={{
          fontWeight   : 900,
          fontSize     : '0.88rem',
          letterSpacing: '0.22em',
          color        : '#fff',
          textTransform: 'uppercase',
          lineHeight   : 1,
        }}
      >
        4TP
      </span>

      {/* Status chip */}
      <span
        style={{
          display     : 'inline-flex',
          alignItems  : 'center',
          gap         : '0.45rem',
          fontWeight  : 500,
          fontSize    : '0.68rem',
          letterSpacing: '0.18em',
          color       : 'rgba(255,255,255,0.28)',
          textTransform: 'uppercase',
        }}
      >
        {/* Pulsing green dot */}
        <span
          aria-hidden="true"
          style={{
            width       : '5px',
            height      : '5px',
            borderRadius: '50%',
            background  : '#4ade80',
            display     : 'inline-block',
            animation   : 'navDotPulse 2.4s ease-in-out infinite',
          }}
        />
        Network
      </span>
    </nav>
  )
}
