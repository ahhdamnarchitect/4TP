'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * LogoIntro — 5-beat cinematic entrance sequence.
 *
 * Beat 0 (0ms):     Black screen.
 * Beat 1 (200ms):   Yellow square [4] springs in at center.
 * Beat 2 (900ms):   "TP" text fades in right of square → full wordmark "4TP".
 * Beat 3 (1600ms):  TP fades out, square scales up to fill the entire screen (yellow flash).
 * Beat 4 (2200ms):  Square shrinks to top-left nav position; "TP" fades in beside it.
 * Beat 5 (2900ms):  onGateComplete fires; overlay exits.
 */

const EXPO = [0.76, 0, 0.24, 1] as const
const SPRING_POP = { type: 'spring', stiffness: 400, damping: 25 } as const
const SPRING_DOCK = { type: 'spring', stiffness: 280, damping: 28 } as const

const SQUARE_SIZE = 88   // center wordmark square, px
const DOCK_SIZE   = 48   // final nav logo size, px
const DOCK_LEFT   = 24   // px from left edge
const DOCK_TOP    = 24   // px from top edge

type Props = { onGateComplete?: () => void }

export default function LogoIntro({ onGateComplete }: Props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1600),
      setTimeout(() => setStep(4), 2200),
      setTimeout(() => setStep(5), 2900),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (step === 5) onGateComplete?.()
  }, [step, onGateComplete])

  const squareInner = (size: number) => (
    <div
      style={{
        width: size,
        height: size,
        background: '#FEEB3D',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Inter, InterVariable, sans-serif',
          fontWeight: 900,
          fontSize: size * 0.62,
          color: '#000',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        4
      </span>
    </div>
  )

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          key="logo-intro-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          initial={{ background: '#000000' }}
          animate={{ background: step >= 3 ? '#FEEB3D' : '#000000' }}
          transition={{
            background: step === 3
              ? { duration: 0.35, delay: 0.45 }
              : { duration: 0 },
          }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: EXPO } }}
        >
          {/* ── BEAT 3: yellow square expands to fill screen ── */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                key="flash"
                style={{
                  position: 'absolute',
                  width: SQUARE_SIZE,
                  height: SQUARE_SIZE,
                  background: '#FEEB3D',
                  left: '50%',
                  top: '50%',
                  marginLeft: -(SQUARE_SIZE / 2),
                  marginTop: -(SQUARE_SIZE / 2),
                  zIndex: 5,
                }}
                initial={{ scale: 1 }}
                animate={{ scale: 45 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.55, ease: EXPO }}
              />
            )}
          </AnimatePresence>

          {/* ── BEATS 1–2: centered wordmark ── */}
          <AnimatePresence>
            {(step === 1 || step === 2) && (
              <motion.div
                key="wordmark-center"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10,
                  position: 'relative',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={SPRING_POP}
              >
                {squareInner(SQUARE_SIZE)}

                <AnimatePresence>
                  {step === 2 && (
                    <motion.span
                      key="tp-center"
                      style={{
                        fontFamily: 'Inter, InterVariable, sans-serif',
                        fontWeight: 900,
                        fontSize: SQUARE_SIZE * 0.62,
                        color: '#FEEB3D',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        userSelect: 'none',
                        paddingLeft: 7,
                      }}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.38, ease: EXPO }}
                    >
                      TP
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── BEAT 4: docked top-left with TP ── */}
            {step === 4 && (
              <motion.div
                key="wordmark-docked"
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10,
                  transformOrigin: 'top left',
                }}
                initial={{
                  left: `calc(50% - ${SQUARE_SIZE / 2}px)`,
                  top: `calc(50% - ${SQUARE_SIZE / 2}px)`,
                  scale: 1,
                  opacity: 0,
                }}
                animate={{
                  left: DOCK_LEFT,
                  top: DOCK_TOP,
                  scale: DOCK_SIZE / SQUARE_SIZE,
                  opacity: 1,
                }}
                transition={SPRING_DOCK}
              >
                {squareInner(SQUARE_SIZE)}
                <motion.span
                  style={{
                    fontFamily: 'Inter, InterVariable, sans-serif',
                    fontWeight: 900,
                    fontSize: SQUARE_SIZE * 0.62,
                    color: '#000000',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    userSelect: 'none',
                    paddingLeft: 7,
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.28, ease: EXPO }}
                >
                  TP
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanline texture */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 20,
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
