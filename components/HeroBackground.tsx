'use client'

/**
 * HeroBackground — Cinematic silhouette layer.
 *
 * DESKTOP INTERACTIONS:
 *   Mouse move  → subtle 3D perspective tilt (rotateX/rotateY) on the wrapper
 *   Mouse wheel → velocity burst to rotation speed
 *
 * MOBILE INTERACTIONS:
 *   Device gyroscope (left/right tilt) → drives rotation offset ±30°
 *   Android:  navigator.vibrate haptics at ±12° and ±22° thresholds
 *   iOS:      visual yellow flash substitute (no Taptic Engine API)
 *
 * IDLE ANIMATION:
 *   When scroll velocity ≈ 0 for >2s → subtle opacity pulse (sinusoidal)
 *
 * SCROLL:
 *   Scroll down → clockwise burst (positive scrollInfluence)
 *   Scroll up   → counter-clockwise burst (negative scrollInfluence)
 *   Decay: 0.92 per frame (smooth return to base speed)
 *
 * PERFORMANCE:
 *   All transforms applied directly via ref.style (no React re-renders)
 *   Native requestAnimationFrame (never fights Framer Motion's scheduler)
 *   willChange: transform on both rotating layers
 */

import { useRef, useEffect } from 'react'

const BASE_DEG_PER_MS = 360 / 75_000   // 1 rev per 75s base
const WHEEL_SCALE     = 0.28
const SCROLL_DECAY    = 0.92
const GYRO_MAX_DEG    = 30
const HAPTIC_SOFT_DEG = 12
const HAPTIC_HARD_DEG = 22
const TILT_MAX_DEG    = 8              // max perspective tilt in degrees
const TILT_LERP       = 0.04           // smoothing factor for tilt

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltRef      = useRef<HTMLDivElement>(null)   // perspective 3D tilt (desktop)
  const wrapperRef   = useRef<HTMLDivElement>(null)   // flat rotation
  const imgRef       = useRef<HTMLImageElement>(null) // opacity for idle pulse
  const flashRef     = useRef<HTMLDivElement>(null)   // iOS visual haptic substitute

  useEffect(() => {
    const container = containerRef.current
    const tiltEl    = tiltRef.current
    const wrapper   = wrapperRef.current
    const imgEl     = imgRef.current
    if (!container || !tiltEl || !wrapper || !imgEl) return

    let rafId: number
    let baseAngle       = 0
    let scrollInfluence = 0
    let gyroOffset      = 0
    let lastTime: number | null = null
    let lastGamma       = 0
    let lastScrollTime  = Date.now()
    let flashTimer: ReturnType<typeof setTimeout> | null = null

    // Tilt state (desktop)
    let tiltX = 0
    let tiltY = 0
    let targetTiltX = 0
    let targetTiltY = 0

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canVibrate = typeof (navigator as any).vibrate === 'function'

    // ── iOS visual snap flash ───────────────────────────────────────────────
    const triggerVisualSnap = (intensity: 'soft' | 'hard') => {
      const flashEl = flashRef.current
      if (!flashEl || canVibrate) return
      flashEl.style.opacity = intensity === 'hard' ? '0.14' : '0.07'
      if (flashTimer) clearTimeout(flashTimer)
      flashTimer = setTimeout(() => {
        if (flashEl) flashEl.style.opacity = '0'
      }, intensity === 'hard' ? 180 : 110)
    }

    // ── Mouse move → perspective tilt (desktop only) ─────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      const cx  = window.innerWidth  / 2
      const cy  = window.innerHeight / 2
      const dx  = (e.clientX - cx) / cx   // −1…1
      const dy  = (e.clientY - cy) / cy   // −1…1
      targetTiltX = -dy * TILT_MAX_DEG    // pitch (mouse up → tilt back)
      targetTiltY =  dx * TILT_MAX_DEG    // yaw  (mouse right → tilt right)
    }

    const onMouseLeave = () => {
      targetTiltX = 0
      targetTiltY = 0
    }

    // ── Wheel → rotation burst ────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      scrollInfluence += e.deltaY * WHEEL_SCALE
      // Hard clamp so it doesn't go wild on trackpads
      scrollInfluence = Math.max(-600, Math.min(600, scrollInfluence))
      lastScrollTime = Date.now()
    }

    // ── Gyroscope (mobile) ────────────────────────────────────────────────
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0
      gyroOffset = (gamma / 90) * GYRO_MAX_DEG

      const prev = lastGamma
      const curr = gamma
      const crossedHard = (Math.abs(prev) < HAPTIC_HARD_DEG) !== (Math.abs(curr) < HAPTIC_HARD_DEG)
      const crossedSoft = (Math.abs(prev) < HAPTIC_SOFT_DEG) !== (Math.abs(curr) < HAPTIC_SOFT_DEG)

      if (crossedHard) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (canVibrate) (navigator as any).vibrate([20, 10, 20])
        else triggerVisualSnap('hard')
      } else if (crossedSoft) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (canVibrate) (navigator as any).vibrate(10)
        else triggerVisualSnap('soft')
      }
      lastGamma = gamma
    }

    const addOrientationListener = () =>
      window.addEventListener('deviceorientation', onOrientation, { passive: true })

    const requestiOSPermission = async () => {
      try {
        const DOE = DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<'granted' | 'denied'>
        }
        if (typeof DOE.requestPermission === 'function') {
          const res = await DOE.requestPermission()
          if (res === 'granted') addOrientationListener()
        } else {
          addOrientationListener()
        }
      } catch {
        addOrientationListener()
      }
    }

    // ── RAF loop ──────────────────────────────────────────────────────────
    const tick = (time: number) => {
      const delta   = lastTime != null ? time - lastTime : 0
      lastTime      = time

      baseAngle       += BASE_DEG_PER_MS * delta
      scrollInfluence *= SCROLL_DECAY

      // Lerp perspective tilt toward target
      tiltX += (targetTiltX - tiltX) * TILT_LERP
      tiltY += (targetTiltY - tiltY) * TILT_LERP

      // Apply perspective tilt to outer wrapper
      tiltEl.style.transform =
        `perspective(1100px) rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg)`

      // Apply flat rotation to inner wrapper
      wrapper.style.transform = `rotate(${(baseAngle + scrollInfluence + gyroOffset).toFixed(3)}deg)`

      // Idle pulse: subtle opacity oscillation when scroll is quiet
      const idleSecs = (Date.now() - lastScrollTime) / 1000
      if (idleSecs > 2.0 && Math.abs(scrollInfluence) < 2) {
        const pulse = 0.18 + Math.sin(time * 0.0009) * 0.04
        imgEl.style.opacity = pulse.toFixed(4)
      } else {
        imgEl.style.opacity = '0.18'
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }
    if (typeof DOE.requestPermission === 'function') {
      window.addEventListener('touchstart', requestiOSPermission, { once: true, passive: true })
    } else {
      addOrientationListener()
    }

    return () => {
      cancelAnimationFrame(rafId)
      if (flashTimer) clearTimeout(flashTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('deviceorientation', onOrientation)
      window.removeEventListener('touchstart', requestiOSPermission)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position : 'absolute',
        inset    : 0,
        zIndex   : 0,
        pointerEvents: 'none',
        overflow : 'hidden',
        display  : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Radial vignette — edges fade to black
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 52%, black 15%, transparent 100%)',
        maskImage       : 'radial-gradient(ellipse 80% 90% at 50% 52%, black 15%, transparent 100%)',
      }}
    >
      {/* Perspective tilt wrapper (desktop mouse follow) */}
      <div
        ref={tiltRef}
        style={{
          width    : 'max(140vw, 140vh)',
          height   : 'max(140vw, 140vh)',
          display  : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          willChange: 'transform',
        }}
      >
        {/* Rotation wrapper */}
        <div
          ref={wrapperRef}
          style={{
            width    : '100%',
            height   : '100%',
            display  : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/hero-silhouette-2.png"
            alt=""
            draggable={false}
            style={{
              width       : '100%',
              height      : '100%',
              objectFit   : 'contain',
              filter      : 'brightness(4) contrast(2.2) blur(0.4px)',
              opacity     : 0.18,
              mixBlendMode: 'screen',
              display     : 'block',
              userSelect  : 'none',
            }}
          />
        </div>
      </div>

      {/* iOS visual snap flash */}
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
