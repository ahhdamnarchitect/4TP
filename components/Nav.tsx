'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Nav — Fixed top navigation (visible on main site after gate + yellow email flow).
 */
export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const get = () => document.body?.dataset?.phase ?? null
    setPhase(get())
    const id = window.setInterval(() => setPhase(get()), 250)
    return () => clearInterval(id)
  }, [])

  const onYellow = phase === 'site'

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem clamp(1.5rem, 5vw, 5rem)',
        fontFamily: 'Inter, InterVariable, system-ui, sans-serif',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        mixBlendMode: onYellow ? 'normal' : 'difference',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}>
        <span
          aria-hidden="true"
          style={{
            width: '26px',
            height: '26px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FEEB3D',
            color: '#000',
            fontWeight: 900,
            borderRadius: '4px',
            lineHeight: 1,
            transform: 'translateY(-0.5px)',
          }}
        >
          4
        </span>
        <span
          style={{
            fontWeight: 900,
            fontSize: '0.88rem',
            letterSpacing: '0.22em',
            color: onYellow ? '#000' : '#fff',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          TP
        </span>
      </span>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontWeight: 500,
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          color: onYellow ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.28)',
          textTransform: 'uppercase',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#4ade80',
            display: 'inline-block',
            animation: 'navDotPulse 2.4s ease-in-out infinite',
          }}
        />
        Network
      </span>
    </nav>
  )
}
