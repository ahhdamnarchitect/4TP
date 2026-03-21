'use client'

/**
 * HeroBackground — Cinematic silhouette background layer.
 *
 * INTERACTIONS:
 *   Desktop  — mouse wheel (↑/↓) drives rotation burst
 *   Mobile   — device gyroscope (left/right tilt) rotates image ±30°
 *
 * HAPTICS — platform reality:
 *   Android Chrome   → navigator.vibrate() works ✓
 *                       soft pulse (10ms) at ±12° tilt
 *                       double tap ([20,10,20]ms) at ±22° tilt
 *
 *   iOS Safari       → no web vibration API. Apple does not expose the Taptic
 *   iOS Chrome       → Engine to ANY browser on iOS (Chrome/Firefox/Safari all
 *                       run WebKit; Apple mandates this via App Store rules).
 *                       navigator.vibrate is undefined on all iOS browsers.
 *                       Visual snap flash used instead (see flashRef below).
 *
 * GYRO PERMISSION:
 *   iOS 13+ (Safari AND Chrome) require DeviceOrientationEvent.requestPermission()
 *   which MUST be called from a user gesture. We hook it on the first touchstart.
 *   Android / non-iOS: listener fires directly, no permission needed.
 *
 * SCHEDULER:
 *   Uses native requestAnimationFrame — NOT Framer Motion's useAnimationFrame —
 *   to avoid starving FM's scheduler (which broke Nav fade-in and LogoIntro).
 *   Rotation applied directly via ref.style.transform — zero React renders.
 */

import { useRef, useEffect } from 'react'

const BASE_DEG_PER_MS  = 360 / 75_000  // 1 revolution per 75 seconds
const WHEEL_SCALE      = 0.25           // wheel deltaY → degrees burst
const SCROLL_DECAY     = 0.93           // per-frame velocity decay
const GYRO_MAX_DEG     = 30             // ±° from full left/right tilt
const HAPTIC_SOFT_DEG  = 12             // threshold for soft feedback
const HAPTIC_HARD_DEG  = 22             // threshold for strong feedback

export default function HeroBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const flashRef   = useRef<HTMLDivElement>(null)  // iOS visual snap substitute

  useEffect(() => {
    const el      = wrapperRef.current
    const flashEl = flashRef.current
    if (!el) return

    let rafId: number
    let baseAngle       = 0
    let scrollInfluence = 0
    let gyroOffset      = 0
    let lastFrameTime: number | null = null
    let lastGamma       = 0
    let flashTimer: ReturnType<typeof setTimeout> | null = null

    // ── Visual snap flash (iOS substitute for haptics) ────────────────────
    // Fires a brief yellow glow when tilt thresholds are crossed.
    // On Android, we use vibrate() instead and skip the flash.
    const triggerVisualSnap = (intensity: 'soft' | 'hard') => {
      if (!flashEl || navigator.vibrate) return  // Android uses vibrate, not flash
      flashEl.style.opacity = intensity === 'hard' ? '0.12' : '0.06'
      if (flashTimer) clearTimeout(flashTimer)
      flashTimer = setTimeout(() => {
        if (flashEl) flashEl.style.opacity = '0'
      }, intensity === 'hard' ? 160 : 100)
    }

    // ── Mouse wheel (desktop) ─────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      scrollInfluence += e.deltaY * WHEEL_SCALE
    }

    // ── Device orientation / gyroscope (mobile) ───────────────────────────
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      gyroOffset = (gamma / 90) * GYRO_MAX_DEG

      const prev = lastGamma
      const curr = gamma

      const crossedSoft = Math.abs(prev) < HAPTIC_SOFT_DEG && Math.abs(curr) >= HAPTIC_SOFT_DEG
                       || Math.abs(prev) >= HAPTIC_SOFT_DEG && Math.abs(curr) < HAPTIC_SOFT_DEG
      const crossedHard = Math.abs(prev) < HAPTIC_HARD_DEG && Math.abs(curr) >= HAPTIC_HARD_DEG
                       || Math.abs(prev) >= HAPTIC_HARD_DEG && Math.abs(curr) < HAPTIC_HARD_DEG

      if (crossedHard) {
        if (navigator.vibrate) navigator.vibrate([20, 10, 20])  // Android
        else triggerVisualSnap('hard')                          // iOS
      } else if (crossedSoft) {
        if (navigator.vibrate) navigator.vibrate(10)            // Android
        else triggerVisualSnap('soft')                          // iOS
      }

      lastGamma = gamma
    }

    // ── Gyro listener setup ───────────────────────────────────────────────
    const addOrientationListener = () => {
      window.addEventListener('deviceorientation', onOrientation, { passive: true })
    }

    const requestiOSPermission = async () => {
      try {
        const DOE = DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<'granted' | 'denied'>
        }
        if (typeof DOE.requestPermission === 'function') {
          const result = await DOE.requestPermission()
          if (result === 'granted') addOrientationListener()
        } else {
          addOrientationListener()
        }
      } catch {
        addOrientationListener()
      }
    }

    // ── Animation loop (native RAF) ───────────────────────────────────────
    const tick = (time: number) => {
      const delta   = lastFrameTime != null ? time - lastFrameTime : 0
      lastFrameTime = time

      baseAngle       += BASE_DEG_PER_MS * delta
      scrollInfluence *= SCROLL_DECAY

      el.style.transform = `rotate(${baseAngle + scrollInfluence + gyroOffset}deg)`
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('wheel', onWheel, { passive: true })

    // iOS 13+ (Safari + Chrome on iOS): requestPermission on first touch
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>
    }
    if (typeof DOE.requestPermission === 'function') {
      window.addEventListener('touchstart', requestiOSPermission, {
        once: true,
        passive: true,
      })
    } else {
      addOrientationListener()
    }

    return () => {
      cancelAnimationFrame(rafId)
      if (flashTimer) clearTimeout(flashTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('deviceorientation', onOrientation)
      window.removeEventListener('touchstart', requestiOSPermission)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position      : 'absolute',
        inset         : 0,
        zIndex        : 0,
        pointerEvents : 'none',
        overflow      : 'hidden',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 52%, black 20%, transparent 100%)',
        maskImage       : 'radial-gradient(ellipse 75% 85% at 50% 52%, black 20%, transparent 100%)',
      }}
    >
      {/* Rotating silhouette — plain img bypasses Next.js optimization pipeline
          which was failing on the C2PA metadata chunks in this PNG file.
          This is a decorative layer; optimization benefits don't apply here. */}
      <div
        ref={wrapperRef}
        style={{
          width    : 'max(130vw, 130vh)',
          height   : 'max(130vw, 130vh)',
          position : 'relative',
          flexShrink: 0,
          willChange: 'transform',
          display  : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-silhouette-2.png"
          alt=""
          draggable={false}
          style={{
            width       : '100%',
            height      : '100%',
            objectFit   : 'contain',
            filter      : 'brightness(4) contrast(2.2) blur(0.5px)',
            opacity     : 0.18,
            mixBlendMode: 'screen',
            display     : 'block',
          }}
        />
      </div>

      {/* iOS visual snap flash — yellow pulse on tilt threshold crossing */}
      {/* opacity driven by JS; transition handles the fade-out smoothly   */}
      <div
        ref={flashRef}
        style={{
          position  : 'absolute',
          inset     : 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(254,235,61,1) 0%, transparent 70%)',
          opacity   : 0,
          transition: 'opacity 0.15s ease-out',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
