'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * MobileCTA — Sticky bottom "Join Early Access" CTA for mobile.
 *
 * Appears only on touch/mobile devices after intro:done.
 * Hides when user scrolls past the hero section email form
 * (because the form becomes inaccessible on mobile without scrolling).
 * Thumb-friendly pill button at bottom of viewport.
 */
export default function MobileCTA() {
  const barRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden]   = useState(false)

  useEffect(() => {
    // Only activate on touch/coarse pointer devices
    if (!window.matchMedia('(pointer: coarse)').matches) return

    const onDone = () => setVisible(true)
    window.addEventListener('intro:done', onDone)

    // Hide bar when user is near the hero form (no need for sticky CTA)
    // Show again when scrolled away
    const onScroll = () => {
      const heroForm = document.getElementById('hero')
      if (!heroForm) return
      const rect = heroForm.getBoundingClientRect()
      // If the hero section bottom is above 40% of viewport, hide sticky CTA
      setHidden(rect.bottom < window.innerHeight * 0.4)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('intro:done', onDone)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollToForm = () => {
    const heroSection = document.getElementById('hero')
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' })
      // Focus the email input after scroll
      setTimeout(() => {
        const input = heroSection.querySelector('input[type="email"]') as HTMLInputElement
        if (input) input.focus()
      }, 600)
    }
  }

  return (
    <div
      ref={barRef}
      aria-hidden={!visible || hidden}
      style={{
        position   : 'fixed',
        bottom     : 0,
        left       : 0,
        right      : 0,
        zIndex     : 90,
        padding    : '0.85rem 1.25rem',
        // Safe area inset for iPhone home indicator
        paddingBottom: 'max(0.85rem, env(safe-area-inset-bottom, 0.85rem))',
        background : 'linear-gradient(to top, rgba(0,0,0,0.95) 60%, transparent)',
        display    : 'flex',
        justifyContent: 'center',
        opacity    : visible && !hidden ? 1 : 0,
        transform  : visible && !hidden ? 'translateY(0)' : 'translateY(100%)',
        transition : 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: visible && !hidden ? 'all' : 'none',
      }}
    >
      <button
        onClick={scrollToForm}
        aria-label="Join Early Access"
        style={{
          width        : '100%',
          maxWidth     : '420px',
          padding      : '1rem 2rem',
          background   : '#FEEB3D',
          color        : '#000',
          border       : 'none',
          borderRadius : '9999px',
          fontSize     : '0.82rem',
          fontWeight   : 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily   : 'Inter, InterVariable, system-ui, sans-serif',
          cursor       : 'pointer',
          // Thumb-friendly tap target
          minHeight    : '52px',
          WebkitTapHighlightColor: 'transparent',
          // Press state via active pseudo
        }}
        onPointerDown={(e) => {
          const btn = e.currentTarget
          btn.style.transform = 'scale(0.97)'
          btn.style.boxShadow = '0 4px 20px rgba(254,235,61,0.3)'
        }}
        onPointerUp={(e) => {
          const btn = e.currentTarget
          btn.style.transform = ''
          btn.style.boxShadow = ''
        }}
        onPointerLeave={(e) => {
          const btn = e.currentTarget
          btn.style.transform = ''
          btn.style.boxShadow = ''
        }}
      >
        Join Early Access
      </button>
    </div>
  )
}
