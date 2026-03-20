'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/**
 * LogoIntro — 4TP brand entrance animation.
 *
 * Sequence:
 *   80ms   — Small yellow square springs in (slightly rotated)
 *   700ms  — Square explodes to fill screen + 3 shockwave rings radiate out
 *   1350ms — 4.png logo punches in from center
 *   2400ms — Entire overlay slides up off screen (curtain rise)
 *   3300ms — Component unmounts
 */

const EASE_EXPO   = [0.76, 0, 0.24, 1] as const
const EASE_BOUNCE = [0.34, 1.56, 0.64, 1] as const

type Phase = 'init' | 'square' | 'expand' | 'logo' | 'exit' | 'gone'

export default function LogoIntro() {
  const [phase, setPhase] = useState<Phase>('init')

  useEffect(() => {
    const schedule: [number, Phase][] = [
      [80,   'square'],
      [700,  'expand'],
      [1350, 'logo'],
      [2400, 'exit'],
      [3300, 'gone'],
    ]
    const timers = schedule.map(([ms, p]) => setTimeout(() => setPhase(p), ms))
    return () => timers.forEach(clearTimeout)
  }, [])

  if (phase === 'gone') return null

  const isExpanded = phase === 'expand' || phase === 'logo' || phase === 'exit'

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden flex items-center justify-center"
      style={{ pointerEvents: phase === 'exit' ? 'none' : 'all' }}
      animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
      transition={phase === 'exit' ? { duration: 0.9, ease: EASE_EXPO } : { duration: 0 }}
    >
      {/* ── Shockwave rings ── visible against dark bg as square explodes */}
      {phase === 'expand' && [0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute"
          style={{ border: '2px solid #FEEB3D', flexShrink: 0 }}
          initial={{ width: 200, height: 200, opacity: 0 }}
          animate={{
            width: 200 + (i + 1) * 360,
            height: 200 + (i + 1) * 360,
            opacity: [0, 0.65, 0],
          }}
          transition={{ duration: 0.55, delay: i * 0.07, ease: EASE_EXPO }}
        />
      ))}

      {/* ── Main yellow block ── starts 200×200, then fills screen */}
      <motion.div
        className="absolute"
        style={{ background: '#FEEB3D', flexShrink: 0 }}
        animate={{
          width:  phase === 'init' ? 0 : isExpanded ? 5000 : 200,
          height: phase === 'init' ? 0 : isExpanded ? 5000 : 200,
          rotate: phase === 'square' ? -7 : 0,
        }}
        transition={
          phase === 'square'
            ? { duration: 0.48, ease: EASE_BOUNCE }
            : phase === 'expand'
            ? { duration: 0.48, ease: EASE_EXPO }
            : { duration: 0 }
        }
      />

      {/* ── 4TP logo image ── punches in on yellow background */}
      <AnimatePresence>
        {(phase === 'logo' || phase === 'exit') && (
          <motion.div
            key="logo-img"
            className="relative z-10"
            initial={{ scale: 0.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, ease: EASE_BOUNCE }}
          >
            <Image
              src="/4.png"
              alt="4TP"
              width={230}
              height={230}
              priority
              style={{ display: 'block' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scanline texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </motion.div>
  )
}
