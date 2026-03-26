'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * LogoIntro — 4TP brand entrance animation.
 *
 * Default (no callback): overlay slides up and unmounts (legacy hero reveal).
 * Gate flow (`onGateComplete`): yellow + logo hold, then callback — no slide to black.
 */

const EXPO = [0.76, 0, 0.24, 1] as const
const SPRING = [0.34, 1.56, 0.64, 1] as const

type Props = {
  onGateComplete?: () => void
}

export default function LogoIntro({ onGateComplete }: Props) {
  const gateMode = typeof onGateComplete === 'function'
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (gateMode) {
      const schedule: [number, () => void][] = [
        [100, () => setStep(1)],
        [700, () => setStep(2)],
        [1300, () => setStep(3)],
        [3200, () => onGateComplete()],
      ]
      const timers = schedule.map(([ms, fn]) => setTimeout(fn, ms))
      return () => timers.forEach(clearTimeout)
    }
    const schedule: [number, () => void][] = [
      [100, () => setStep(1)],
      [700, () => setStep(2)],
      [1300, () => setStep(3)],
      [2500, () => setStep(4)],
      [3300, () => setDone(true)],
    ]
    const timers = schedule.map(([ms, fn]) => setTimeout(fn, ms))
    return () => timers.forEach(clearTimeout)
  }, [gateMode, onGateComplete])

  if (!gateMode && done) return null

  const slideUp = !gateMode && step >= 4

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
        pointerEvents: gateMode || step >= 4 ? 'none' : 'all',
      }}
      animate={{ y: slideUp ? '-100%' : '0%' }}
      transition={slideUp ? { duration: 0.85, ease: EXPO } : { duration: 0 }}
    >
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
        <motion.div
          style={{ background: '#FEEB3D', flexShrink: 0 }}
          animate={{
            width: step === 0 ? 0 : step === 1 ? 200 : 5000,
            height: step === 0 ? 0 : step === 1 ? 200 : 5000,
            rotate: step === 1 ? -7 : 0,
          }}
          transition={
            step === 1
              ? { duration: 0.45, ease: SPRING }
              : step === 2
                ? { duration: 0.5, ease: EXPO }
                : { duration: 0 }
          }
        />

        {step === 2 &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                border: '2px solid #FEEB3D',
                flexShrink: 0,
              }}
              initial={{ width: 200, height: 200, opacity: 0 }}
              animate={{
                width: 200 + (i + 1) * 380,
                height: 200 + (i + 1) * 380,
                opacity: [0, 0.7, 0],
              }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EXPO }}
            />
          ))}
      </div>

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
