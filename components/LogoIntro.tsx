'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

/**
 * LogoIntro — cinematic brand entrance that seamlessly morphs into the site.
 *
 * Phase 1 (0.1s): Small yellow square springs in from center
 * Phase 2 (0.6s): Square explodes to fill entire screen
 * Phase 3 (1.1s): 4TP logo punches in on yellow background
 * Phase 4 (2.2s): MORPH — logo scales to nav size + travels to nav position,
 *                  yellow background fades to black, hero is revealed beneath
 * Phase 5 (3.2s): Logo fades at nav position → dispatch intro:done → unmount
 *
 * The hero silhouette is always rendering behind this overlay.
 * As the overlay fades, it appears to emerge naturally from darkness.
 * The text/form content is hidden until intro:done, then fades in.
 */
export default function LogoIntro() {
  const [alive, setAlive] = useState(true)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const squareRef   = useRef<HTMLDivElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay  = overlayRef.current
    const square   = squareRef.current
    const logoWrap = logoWrapRef.current
    const logo     = logoRef.current
    if (!overlay || !square || !logoWrap || !logo) return

    const tl = gsap.timeline()

    // ── Phase 1: Yellow square springs in ───────────────────────────────────
    tl.to(square, {
      width: 200,
      height: 200,
      rotation: -7,
      duration: 0.45,
      delay: 0.1,
      ease: 'back.out(1.7)',
    })

    // ── Phase 2: Square explodes to fill screen ──────────────────────────────
    .to(square, {
      width: '300vmax',
      height: '300vmax',
      rotation: 0,
      duration: 0.5,
      ease: 'expo.in',
    })

    // ── Phase 3: Logo punches in on yellow ───────────────────────────────────
    .set(logoWrap, { opacity: 1 })
    .from(logo, {
      scale: 0.06,
      opacity: 0,
      duration: 0.65,
      ease: 'back.out(1.5)',
    })

    // Dwell — let the logo breathe
    .to({}, { duration: 0.55 })

    // ── Phase 4: MORPH ───────────────────────────────────────────────────────
    // All three animations start simultaneously via .call()
    .call(() => {
      const rect    = logo.getBoundingClientRect()
      const centerX = rect.left + rect.width  / 2
      const centerY = rect.top  + rect.height / 2

      // Target: nav logo area (top-left of screen)
      const targetSize   = 40
      const navPadLeft   = Math.min(Math.max(window.innerWidth * 0.05, 24), 80)
      const navPadTop    = 36
      const targetCX     = navPadLeft + targetSize / 2
      const targetCY     = navPadTop
      const targetScale  = targetSize / rect.width

      // Logo morphs toward nav position
      gsap.to(logo, {
        x: targetCX - centerX,
        y: targetCY - centerY,
        scale: targetScale,
        duration: 0.95,
        ease: 'expo.inOut',
      })

      // Yellow square fades first (slightly ahead of overlay)
      gsap.to(square, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })

      // Overlay fades out — hero is revealed
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.9,
        delay: 0.05,
        ease: 'power2.inOut',
        onStart: () => {
          overlay.style.pointerEvents = 'none'
          // Hero silhouette revealed — fire morph event for content layer
          window.dispatchEvent(new CustomEvent('intro:morph'))
        },
      })
    })

    // Wait for morph to complete
    .to({}, { duration: 0.95 })

    // ── Phase 5: Logo arrives at nav, fades out ──────────────────────────────
    .to(logo, {
      opacity: 0,
      duration: 0.28,
      ease: 'power1.in',
      onComplete: () => {
        // Nav text and hero content fade in
        window.dispatchEvent(new CustomEvent('intro:done'))
      },
    })

    // Brief pause then unmount
    .to({}, {
      duration: 0.25,
      onComplete: () => setAlive(false),
    })

    return () => { tl.kill() }
  }, [])

  if (!alive) return null

  return (
    <>
      {/* ── Overlay: Black background + Yellow square ── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position  : 'fixed',
          inset     : 0,
          zIndex    : 200,
          background: '#000',
          display   : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow  : 'hidden',
        }}
      >
        {/* Yellow expanding square */}
        <div
          ref={squareRef}
          style={{
            background: '#FEEB3D',
            width     : 0,
            height    : 0,
            flexShrink: 0,
            willChange: 'transform, width, height',
          }}
        />

        {/* Film grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position    : 'absolute',
            inset       : 0,
            pointerEvents: 'none',
            zIndex      : 2,
            opacity     : 0.04,
            background  : 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E") repeat',
            backgroundSize: '128px 128px',
          }}
        />

        {/* Scanlines */}
        <div
          aria-hidden="true"
          style={{
            position    : 'absolute',
            inset       : 0,
            pointerEvents: 'none',
            zIndex      : 3,
            background  : 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)',
          }}
        />
      </div>

      {/* ── Logo layer — above overlay so it can travel to nav position ── */}
      <div
        ref={logoWrapRef}
        aria-hidden="true"
        style={{
          position  : 'fixed',
          inset     : 0,
          zIndex    : 201,
          display   : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity   : 0,
        }}
      >
        <div
          ref={logoRef}
          style={{
            transformOrigin: 'center center',
            willChange     : 'transform, opacity',
          }}
        >
          <Image
            src="/4.png"
            alt="4TP"
            width={220}
            height={220}
            priority
            draggable={false}
            style={{ display: 'block', userSelect: 'none' }}
          />
        </div>
      </div>
    </>
  )
}
