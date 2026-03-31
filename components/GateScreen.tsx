'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import WordFade from './WordFade'
import { GATE_QUESTIONS } from '@/lib/gate'
import { trackFunnel } from '@/lib/funnel-client'
import { useCallback, useEffect, useState } from 'react'
import LogoDockIntro from './LogoDockIntro'

const EASE = [0.16, 1, 0.3, 1] as const

type Props = {
  questionIndex: number
  onAnswer: (yes: boolean) => void
  locked?: boolean
  grantedBeat?: 'verdict' | 'static'
}

export default function GateScreen({ questionIndex, onAnswer, locked = false, grantedBeat }: Props) {
  const q = GATE_QUESTIONS[questionIndex]
  const [typingDone, setTypingDone] = useState(false)
  const [logoDocked, setLogoDocked] = useState(false)
  const [glyphVisible, setGlyphVisible] = useState(true)

  // Entrance glyph: large ghost "4" fades out as the logo begins docking
  useEffect(() => {
    const t = setTimeout(() => setGlyphVisible(false), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setTypingDone(false)
  }, [questionIndex])

  useEffect(() => {
    trackFunnel('question_view', { index: questionIndex, pillar: q.pillar })
  }, [questionIndex, q.pillar])

  const handleDocked = useCallback(() => setLogoDocked(true), [])

  const handle = (yes: boolean) => {
    trackFunnel('question_answer', { index: questionIndex, pillar: q.pillar, yes })
    onAnswer(yes)
  }

  return (
    <motion.div
      className="gate-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* Background: whiteroom photo + graded overlays */}
      <div className="gate-screen-bg" aria-hidden="true">
        <Image
          src="/whiteroom.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="gate-screen-bg-fade" />
        <div className="gate-screen-bg-grade" />
      </div>

      {/* Entrance glyph — ghost "4" emerges from the white room then gives way to the logo */}
      <AnimatePresence>
        {glyphVisible && (
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span
              style={{
                fontFamily: 'Inter, InterVariable, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(10rem, 38vw, 22rem)',
                lineHeight: 1,
                color: 'rgba(0, 0, 0, 0.07)',
                userSelect: 'none',
                letterSpacing: '-0.05em',
              }}
            >
              4
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo docks first; questions appear only after docking */}
      <LogoDockIntro dockedOnly={locked} onDocked={handleDocked} />

      <div className="gate-screen-inner">
        <p className="gate-pillar">{q.pillar}</p>

        <div className="gate-question-wrap">
          <AnimatePresence mode="wait">
            <motion.h1
              key={questionIndex}
              className="gate-question"
              aria-label={q.text}
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Only start word-fade once logo has docked */}
              {logoDocked && (
                <WordFade
                  text={q.text}
                  onComplete={() => setTypingDone(true)}
                />
              )}
            </motion.h1>
          </AnimatePresence>
        </div>

        <div className="gate-actions" aria-live="polite">
          {typingDone && !locked && (
            <motion.div
              className="gate-yes-no"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              {q.choices?.length ? (
                q.choices.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    className={c.yes ? 'gate-btn gate-btn-yes' : 'gate-btn gate-btn-no'}
                    onClick={() => handle(c.yes)}
                  >
                    {c.label}
                  </button>
                ))
              ) : (
                <>
                  <button type="button" className="gate-btn gate-btn-yes" onClick={() => handle(true)}>
                    Yes
                  </button>
                  <button type="button" className="gate-btn gate-btn-no" onClick={() => handle(false)}>
                    No
                  </button>
                </>
              )}
            </motion.div>
          )}
        </div>

        <p className="gate-progress" aria-live="polite">
          {questionIndex + 1} / {GATE_QUESTIONS.length}
        </p>
      </div>

      {/* ACCESS GRANTED — solid yellow takeover */}
      <AnimatePresence>
        {locked && (
          <motion.div
            className="gate-granted-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE }}
            aria-live="polite"
          >
            {/* Shockwave ring */}
            <motion.div
              className="gate-granted-ring"
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />

            <div className="gate-granted-box">
              <p className="gate-granted-eyebrow">Access granted</p>

              {/* ACCESS slams down, GRANTED slams up — simultaneous */}
              <motion.span
                className="gate-granted-word"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                ACCESS
              </motion.span>

              <motion.span
                className="gate-granted-word"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                GRANTED
              </motion.span>

              {/* Rule draws across */}
              <motion.div
                className="gate-granted-rule"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
              />

              <motion.p
                className="gate-granted-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              >
                Welcome to 4TP
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
