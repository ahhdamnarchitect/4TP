'use client'

/**
 * HeroBackground — Cinematic silhouette background layer.
 *
 * INTERACTIONS:
 *   Desktop  — mouse wheel (up/down) drives rotation burst (not cursor position)
 *   Mobile   — device gyroscope (left/right tilt) rotates the image ±30°
 *              haptic feedback fires on Android Chrome when crossing tilt thresholds
 *              iOS 13+ requests DeviceOrientationEvent permission on first touch
 *
 * NOTE ON HAPTICS:
 *   navigator.vibrate() is supported on Android Chrome.
 *   iOS Safari has no web vibration API — haptics are Android-only on web.
 *
 * NOTE ON SCHEDULER:
 *   Uses native requestAnimationFrame (NOT Framer Motion's useAnimationFrame)
 *   to avoid starving Framer Motion's animation scheduler which would break
 *   the LogoIntro and Nav fade-in animations running concurrently.
 *   Rotation is applied directly via ref.style.transform — zero React renders.
 */

import Image from 'next/image'
import { useRef, useEffect } from 'react'

const BASE_DEG_PER_MS  = 360 / 75_000  // 1 full revolution per 75 seconds
const WHEEL_SCALE      = 0.25           // wheel deltaY (px) → degrees
const SCROLL_DECAY     = 0.93           // per-frame velocity decay (closer to 1 = longer coast)
const GYRO_MAX_DEG     = 30             // ±° rotation from full left/right device tilt
const HAPTIC_SOFT_DEG  = 12             // gamma threshold for soft haptic pulse
const HAPTIC_HARD_DEG  = 22             // gamma threshold for strong haptic pulse

export default function HeroBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    let rafId: number
    let baseAngle       = 0
    let scrollInfluence = 0
    let gyroOffset      = 0
    let lastFrameTime: number | null = null
    let lastGamma       = 0

    // ── Mouse wheel (desktop) ─────────────────────────────────────────────
    // deltaY > 0 = scrolling DOWN = clockwise
    // deltaY < 0 = scrolling UP   = counter-clockwise
    const onWheel = (e: WheelEvent) => {
      scrollInfluence += e.deltaY * WHEEL_SCALE
    }

    // ── Device orientation / gyroscope (mobile) ───────────────────────────
    // gamma = device left/right tilt: -90 (full left) → +90 (full right)
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      gyroOffset = (gamma / 90) * GYRO_MAX_DEG

      // Haptic feedback on threshold crossings (Android Chrome only)
      if (navigator.vibrate) {
        const prev = lastGamma
        const curr = gamma

        // Soft pulse at ±HAPTIC_SOFT_DEG
        const crossedSoft =
          (prev > -HAPTIC_SOFT_DEG && curr <= -HAPTIC_SOFT_DEG) ||
          (prev < -HAPTIC_SOFT_DEG && curr >= -HAPTIC_SOFT_DEG) ||
          (prev < HAPTIC_SOFT_DEG  && curr >= HAPTIC_SOFT_DEG)  ||
          (prev > HAPTIC_SOFT_DEG  && curr <= HAPTIC_SOFT_DEG)

        // Hard pulse at ±HAPTIC_HARD_DEG
        const crossedHard =
          (prev > -HAPTIC_HARD_DEG && curr <= -HAPTIC_HARD_DEG) ||
          (prev < -HAPTIC_HARD_DEG && curr >= -HAPTIC_HARD_DEG) ||
          (prev < HAPTIC_HARD_DEG  && curr >= HAPTIC_HARD_DEG)  ||
          (prev > HAPTIC_HARD_DEG  && curr <= HAPTIC_HARD_DEG)

        if (crossedHard)      navigator.vibrate([20, 10, 20])  // double tap feel
        else if (crossedSoft) navigator.vibrate(10)             // single soft pulse
      }

      lastGamma = gamma
    }

    // ── iOS 13+ gyroscope permission ──────────────────────────────────────
    // requestPermission() MUST be called from a user gesture (touch/tap).
    // Android and most non-iOS devices don't need this — listener works directly.
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
          // Android / non-iOS — no permission needed
          addOrientationListener()
        }
      } catch {
        // Fallback: add listener anyway, event simply won't fire if denied
        addOrientationListener()
      }
    }

    // ── Animation loop (native RAF) ───────────────────────────────────────
    const tick = (time: number) => {
      const delta   = lastFrameTime != null ? time - lastFrameTime : 0
      lastFrameTime = time

      baseAngle       += BASE_DEG_PER_MS * delta  // constant slow clockwise drift
      scrollInfluence *= SCROLL_DECAY              // velocity decay

      const angle = baseAngle + scrollInfluence + gyroOffset
      el.style.transform = `rotate(${angle}deg)`

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    // Wheel: desktop scroll-driven rotation
    window.addEventListener('wheel', onWheel, { passive: true })

    // iOS: request on first touch; Android: add listener immediately
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>
    }
    if (typeof DOE.requestPermission === 'function') {
      // iOS 13+ — needs user gesture
      window.addEventListener('touchstart', requestiOSPermission, {
        once: true,
        passive: true,
      })
    } else {
      // Android / desktop — just add listener
      addOrientationListener()
    }

    return () => {
      cancelAnimationFrame(rafId)
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
        // Radial gradient mask: large visible center that fades at edges.
        // Percentages are relative to this container (viewport-sized).
        // 75%/85% makes the visible circle extend close to viewport edges
        // before fading — matching the user's gray reference lines.
        WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 52%, black 20%, transparent 100%)',
        maskImage       : 'radial-gradient(ellipse 75% 85% at 50% 52%, black 20%, transparent 100%)',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          // max() ensures it always extends BEYOND the viewport on both axes.
          // On landscape desktop (1600×731): max(1600*1.3, 731*1.3) = 2080px
          // The image is clipped by overflow:hidden + mask — corners never show.
          width    : 'max(130vw, 130vh)',
          height   : 'max(130vw, 130vh)',
          position : 'relative',
          flexShrink: 0,
          willChange: 'transform',
        }}
      >
        <Image
          src="/hero-silhouette-2.png"
          alt=""
          fill
          priority
          draggable={false}
          style={{
            objectFit   : 'contain',
            filter      : 'brightness(4) contrast(2.2) blur(0.5px)',
            opacity     : 0.18,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  )
}
