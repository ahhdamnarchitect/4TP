import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion'

/**
 * HeroBg — 12s looping yellow-background composition.
 *
 * Three diagonal sweep bands (thin, very low opacity) drift left→right
 * at staggered offsets, evoking a broadcast signal.
 * A large ghost square (the logo shape) breathes and slowly rotates.
 * All elements use rgba(0,0,0,*) so mix-blend-mode: multiply in HeroSection
 * tints into the yellow without introducing new colours.
 */

const TOTAL_FRAMES = 360  // 12s × 30fps
const BRAND_YELLOW = '#FEEB3D'

// Maps a looped frame position to an x coordinate for a sweep band.
// Each band traverses from far-left (-500px) to far-right (width+500px).
function sweepX(frame: number, offsetFrames: number, width: number): number {
  const shifted = (frame + offsetFrames) % TOTAL_FRAMES
  return interpolate(shifted, [0, TOTAL_FRAMES], [-500, width + 500], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

export const HeroBg: React.FC = () => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()

  // ─── Breathing scale (1.0 → 1.018 → 1.0 over the full 12s) ─────────
  const breathe = interpolate(
    frame % TOTAL_FRAMES,
    [0, TOTAL_FRAMES / 2, TOTAL_FRAMES],
    [1, 1.018, 1],
    { easing: Easing.inOut(Easing.ease), extrapolateRight: 'clamp' }
  )

  // ─── Ghost square rotation (0 → 8° over 12s, seamless loop) ─────────
  const squareRot = interpolate(
    frame % TOTAL_FRAMES,
    [0, TOTAL_FRAMES],
    [0, 8],
    { easing: Easing.inOut(Easing.ease), extrapolateRight: 'clamp' }
  )

  // ─── Sweep X positions (3 bands staggered by 120 frames / 4s) ────────
  const sx0 = sweepX(frame, 0,   width)
  const sx1 = sweepX(frame, 120, width)
  const sx2 = sweepX(frame, 240, width)

  // ─── Sweep opacity — each band fades in from the left edge and out
  //     at the right edge for a soft entry/exit ────────────────────────
  const sweepAlpha = (x: number) =>
    interpolate(x, [-500, -200, width + 200, width + 500], [0, 0.06, 0.06, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })

  const SWEEP_W  = 3     // px — width of each band at 0° before blur
  const SWEEP_H  = height * 2.2
  const ANGLE    = -14   // degrees — slight diagonal, like a broadcast signal
  const BLUR     = 18    // px softness

  // Large ghost square (logo shape), off-centre, very low opacity
  const squareSize = Math.min(width, height) * 0.72
  const squareX    = width  * 0.52 - squareSize / 2
  const squareY    = height * 0.46 - squareSize / 2

  return (
    <AbsoluteFill style={{ background: BRAND_YELLOW, overflow: 'hidden' }}>

      {/* ── Breathing wrapper ─────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${breathe})`,
          transformOrigin: 'center center',
        }}
      >

        {/* ── Ghost square (logo geometry) ────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            left: squareX,
            top:  squareY,
            width:  squareSize,
            height: squareSize,
            border: '3px solid rgba(0,0,0,0.045)',
            transform: `rotate(${squareRot}deg)`,
            transformOrigin: 'center center',
          }}
        />

        {/* ── Inner concentric square (adds depth) ────────────────── */}
        <div
          style={{
            position: 'absolute',
            left: squareX + squareSize * 0.18,
            top:  squareY + squareSize * 0.18,
            width:  squareSize * 0.64,
            height: squareSize * 0.64,
            border: '1.5px solid rgba(0,0,0,0.028)',
            transform: `rotate(${-squareRot * 0.6}deg)`,
            transformOrigin: 'center center',
          }}
        />

        {/* ── Sweep band 0 ────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            left:  sx0,
            top:   -SWEEP_H * 0.1,
            width: SWEEP_W,
            height: SWEEP_H,
            background: `rgba(0,0,0,${sweepAlpha(sx0)})`,
            transform: `rotate(${ANGLE}deg)`,
            transformOrigin: 'top center',
            filter: `blur(${BLUR}px)`,
          }}
        />

        {/* ── Sweep band 1 ────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            left:  sx1,
            top:   -SWEEP_H * 0.1,
            width: SWEEP_W,
            height: SWEEP_H,
            background: `rgba(0,0,0,${sweepAlpha(sx1)})`,
            transform: `rotate(${ANGLE}deg)`,
            transformOrigin: 'top center',
            filter: `blur(${BLUR}px)`,
          }}
        />

        {/* ── Sweep band 2 ────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            left:  sx2,
            top:   -SWEEP_H * 0.1,
            width: SWEEP_W,
            height: SWEEP_H,
            background: `rgba(0,0,0,${sweepAlpha(sx2)})`,
            transform: `rotate(${ANGLE}deg)`,
            transformOrigin: 'top center',
            filter: `blur(${BLUR}px)`,
          }}
        />

      </div>
    </AbsoluteFill>
  )
}
