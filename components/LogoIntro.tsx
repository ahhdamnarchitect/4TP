'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * LogoIntro — 4TP brand entrance animation.
 *
 * Steps:
 *   0 → nothing (overlay is solid black, hides page content)
 *   1 (100ms)  → small yellow square springs in from center
 *   2 (700ms)  → square explodes to fill entire screen
 *   3 (1300ms) → 4TP logo image punches in on yellow bg
 *   4 (2500ms) → entire overlay slides UP, revealing page
 *   done(3300ms) → component unmounts
 *
 * The page content is always rendered underneath — the overlay
 * simply covers and then uncovers it. No content animation delays needed.
 */

const EXPO   = [0.76, 0, 0.24, 1] as const
const SPRING = [0.34, 1.56, 0.64, 1] as const

export default function LogoIntro() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const schedule: [number, () => void][] = [
      [100,  () => setStep(1)],
      [700,  () => setStep(2)],
      [1300, () => setStep(3)],
      [2500, () => setStep(4)],
      [3300, () => setDone(true)],
    ]
    const timers = schedule.map(([ms, fn]) => setTimeout(fn, ms))
    return () => timers.forEach(clearTimeout)
  }, [])

  if (done) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        overflow: 'hidden',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: step >= 4 ? 'none' : 'all',
      }}
      animate={{ y: step >= 4 ? '-100%' : '0%' }}
      transition={step >= 4 ? { duration: 0.85, ease: EXPO } : { duration: 0 }}
    >
      {/* ── Centered flex wrapper so yellow block auto-centers ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Yellow block: 0 → 200px square → 5000px (fills screen) */}
        <motion.div
          style={{ background: '#FEEB3D', flexShrink: 0 }}
          animate={{
            width:  step === 0 ? 0 : step === 1 ? 200 : 5000,
            height: step === 0 ? 0 : step === 1 ? 200 : 5000,
            rotate: step === 1 ? -7 : 0,
          }}
          transition={
            step === 1
              ? { duration: 0.45, ease: SPRING }
              : step === 2
              ? { duration: 0.5,  ease: EXPO }
              : { duration: 0 }
          }
        />

        {/* Shockwave rings — radiate outward as square expands */}
        {step === 2 && [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              border: '2px solid #FEEB3D',
              flexShrink: 0,
            }}
            initial={{ width: 200, height: 200, opacity: 0 }}
            animate={{
              width:   200 + (i + 1) * 380,
              height:  200 + (i + 1) * 380,
              opacity: [0, 0.7, 0],
            }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EXPO }}
          />
        ))}
      </div>

      {/* ── 4TP logo — punches in on yellow background ── */}
      {step >= 3 && (
        <motion.div
          style={{ position: 'relative', zIndex: 10 }}
          initial={{ scale: 0.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: SPRING }}
        >
          <Image
            src="/4.png"
            alt="4TP"
            width={220}
            height={220}
            priority
            style={{ display: 'block' }}
          />
        </motion.div>
      )}

      {/* Scanlines texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 20,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </motion.div>
  )
}
