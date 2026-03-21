'use client'

/**
 * HeroBackground — Slow-spinning silhouette that responds to scroll velocity.
 *
 * ROTATION LOGIC:
 *   baseAngle  — accumulates at a fixed rate (1 rev / 70 seconds). Always running.
 *   influence  — derived from smoothed scroll velocity. Positive velocity (scroll
 *                down) pushes the rotation clockwise; negative (scroll up) pushes
 *                counterclockwise. Springs back to 0 when scrolling stops, letting
 *                the base take over again seamlessly.
 *   final      — rotate.set(baseAngle + influence), applied every animation frame.
 *
 * The spring on scrollVelocity prevents the jitter you'd get from raw px/s values
 * and gives a natural ease-in/ease-out feel to the scroll burst.
 *
 * GPU path: Framer Motion drives transform: rotate() via a MotionValue, keeping
 * everything off the main thread with will-change: transform.
 */

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion'

// Degrees per millisecond for the base auto-spin (one revolution per 70 seconds)
const BASE_DEG_PER_MS = 360 / 70_000

// How much scroll velocity (px/s) influences the rotation offset
// Lower = subtler. 0.010–0.018 is the sweet spot for "cinematic, not distracting"
const SCROLL_INFLUENCE = 0.013

// Spring config for smoothing raw scroll velocity
const VELOCITY_SPRING = { damping: 55, stiffness: 350, restDelta: 0.001 }

export default function HeroBackground() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)

  // Smooth the raw velocity to remove frame-by-frame jitter
  const smoothVelocity = useSpring(scrollVelocity, VELOCITY_SPRING)

  // MotionValue that drives the CSS transform
  const rotate = useMotionValue(0)

  // Mutable ref for the accumulating base angle — avoids re-renders
  const baseAngle = useRef(0)

  useAnimationFrame((_, delta) => {
    // Accumulate base rotation continuously
    baseAngle.current += BASE_DEG_PER_MS * delta

    // Scroll influence: positive = down = CW, negative = up = CCW
    const influence = smoothVelocity.get() * SCROLL_INFLUENCE

    rotate.set(baseAngle.current + influence)
  })

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Radial mask: center is visible, edges fade cleanly to black
        // Prevents the rotating corners from ever peeking into the frame
        WebkitMaskImage:
          'radial-gradient(ellipse 62% 58% at 50% 52%, black 10%, transparent 100%)',
        maskImage:
          'radial-gradient(ellipse 62% 58% at 50% 52%, black 10%, transparent 100%)',
      }}
    >
      <motion.div
        style={{
          rotate,
          willChange: 'transform',
          // Square container — same dimension either way so rotation is circular
          width: 'min(110vw, 110vh)',
          height: 'min(110vw, 110vh)',
          position: 'relative',
          flexShrink: 0,
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
            // invert(1): turns near-black silhouette into a white presence
            // sepia + hue-rotate: slight warm tint toward the brand yellow
            // opacity: 0.08 keeps it "shadow-like" without fighting the text
            filter: 'invert(1) sepia(0.15) hue-rotate(5deg) blur(1px)',
            opacity: 0.08,
            // screen mode makes pure black transparent, only lighter areas show
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>
    </div>
  )
}
