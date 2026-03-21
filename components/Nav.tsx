'use client'

import { useEffect, useState } from 'react'

/**
 * Nav — Fixed top navigation.
 * Fades in after LogoIntro exits (~3.2s).
 *
 * Uses useEffect + setTimeout instead of Framer Motion's animate delay.
 * Framer Motion's animation scheduler can be starved when useAnimationFrame
 * (HeroBackground) is also running, causing the Nav to stay invisible.
 * Plain CSS transition is immune to that conflict.
 */
export default function Nav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <nav
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
        opacity   : visible ? 1 : 0,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Brand */}
      <span
        style={{
          fontWeight  : 900,
          fontSize    : '0.85rem',
          letterSpacing: '0.24em',
          color       : '#fff',
          textTransform: 'uppercase',
        }}
      >
        4TP
      </span>

      {/* Right side */}
      <span
        style={{
          fontWeight  : 500,
          fontSize    : '0.7rem',
          letterSpacing: '0.2em',
          color       : 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        Network
      </span>
    </nav>
  )
}
