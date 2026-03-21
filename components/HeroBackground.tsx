'use client'

/**
 * HeroBackground — Cinematic silhouette that responds to:
 *   Desktop: base auto-spin + scroll velocity burst + mouse parallax
 *   Mobile:  base auto-spin + device gyroscope (gamma tilt = left/right rotation)
 *
 * IMPORTANT: Uses native requestAnimationFrame — NOT Framer Motion's
 * useAnimationFrame — to avoid starving Framer Motion's animation scheduler,
 * which broke the Nav fade-in and LogoIntro when both ran concurrently.
 * DOM transform is applied directly via ref to bypass React rendering entirely.
 *
 * VISUAL:
 *   brightness(3) contrast(2) — boosts subtle tonal differences in the dark
 *   image so the silhouette lifts above the black background.
 *   mix-blend-mode: screen — near-black → transparent; lighter → visible.
 *   No invert() — that was making the entire image rectangle glow as a square.
 *   Radial gradient mask fades the edges so the rotating corners never peek in.
 */

import Image from 'next/image'
import { useRef, useEffect } from 'react'

const BASE_DEG_PER_MS = 360 / 75_000  // 1 full revolution per 75 seconds
const SCROLL_SCALE     = 18            // how much scroll velocity (px/ms) → degrees
const SCROLL_DECAY     = 0.90          // how fast scroll influence fades per frame
const POINTER_MAX_DEG  = 14            // max ±° from mouse horizontal position
const GYRO_MAX_DEG     = 28            // max ±° from device tilt (gamma)

export default function HeroBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    let rafId: number
    let baseAngle      = 0
    let scrollInfluence = 0
    let pointerOffset  = 0   // desktop: mouse horizontal parallax
    let gyroOffset     = 0   // mobile:  device tilt
    let lastScrollY    = window.scrollY
    let lastScrollTime = performance.now()
    let lastFrameTime: number | null = null

    // ── Scroll (desktop, page-level) ──────────────────────────────────────
    const onScroll = () => {
      const now = performance.now()
      const dt  = now - lastScrollTime
      const dy  = window.scrollY - lastScrollY
      if (dt > 0) {
        const velocity = dy / dt                   // px/ms
        scrollInfluence += velocity * SCROLL_SCALE // accumulate burst
      }
      lastScrollY    = window.scrollY
      lastScrollTime = now
    }

    // ── Mouse parallax (desktop only) ─────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const cx = window.innerWidth / 2
      const nx = (e.clientX - cx) / cx            // −1 → +1
      pointerOffset = nx * POINTER_MAX_DEG
    }

    // ── Gyroscope (mobile) ────────────────────────────────────────────────
    // gamma = left/right tilt: –90° (tilt left) → +90° (tilt right)
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma   = e.gamma ?? 0
      gyroOffset = (gamma / 90) * GYRO_MAX_DEG
    }

    // ── Main animation loop (native RAF, not Framer Motion) ───────────────
    const tick = (time: number) => {
      const delta   = lastFrameTime != null ? time - lastFrameTime : 0
      lastFrameTime = time

      baseAngle      += BASE_DEG_PER_MS * delta    // constant slow drift
      scrollInfluence *= SCROLL_DECAY              // decay scroll burst

      const angle = baseAngle + scrollInfluence + pointerOffset + gyroOffset
      el.style.transform = `rotate(${angle}deg)`

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    window.addEventListener('scroll',          onScroll,      { passive: true })
    window.addEventListener('pointermove',     onPointerMove, { passive: true })
    window.addEventListener('deviceorientation', onOrientation, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll',           onScroll)
      window.removeEventListener('pointermove',      onPointerMove)
      window.removeEventListener('deviceorientation', onOrientation)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position : 'absolute',
        inset    : 0,
        zIndex   : 0,
        pointerEvents: 'none',
        overflow : 'hidden',
        display  : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        // Radial mask: center visible → transparent edges
        // Prevents rotating corners from ever clipping into the viewport
        WebkitMaskImage: 'radial-gradient(ellipse 65% 62% at 50% 52%, black 5%, transparent 100%)',
        maskImage       : 'radial-gradient(ellipse 65% 62% at 50% 52%, black 5%, transparent 100%)',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          width    : 'min(115vw, 115vh)',
          height   : 'min(115vw, 115vh)',
          position : 'relative',
          flexShrink: 0,
          willChange: 'transform',
        }}
      >
        <Image
          src="/hero-silhouette.png"
          alt=""
          fill
          priority
          draggable={false}
          style={{
            objectFit: 'contain',
            // brightness boosts subtle tonal difference → silhouette lifts above black bg
            // contrast pushes near-black areas back to pure black → transparent via screen
            // screen blend: black = invisible, lighter = shows through
            // No invert() — invert was making the entire rectangle glow as a visible square
            filter      : 'brightness(4) contrast(2.2) blur(0.5px)',
            opacity     : 0.18,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  )
}
