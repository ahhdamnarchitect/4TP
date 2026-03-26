'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import { GATE_QUESTIONS } from '@/lib/gate'
import { trackFunnel } from '@/lib/funnel-client'
import { useEffect, useState } from 'react'

type Props = {
  questionIndex: number
  onAnswer: (yes: boolean) => void
  locked?: boolean
  grantedBeat?: 'verdict' | 'static'
}

export default function GateScreen({ questionIndex, onAnswer, locked = false, grantedBeat }: Props) {
  const q = GATE_QUESTIONS[questionIndex]
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    setTypingDone(false)
    trackFunnel('question_view', { index: questionIndex, pillar: q.pillar })
  }, [questionIndex, q.pillar])

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
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
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

      <div className="gate-screen-inner">
        <p className="gate-pillar">{q.pillar}</p>

        <p className="sr-only">{q.text}</p>

        <div className="gate-question-wrap">
          <AnimatePresence mode="wait">
            <motion.h1
              key={questionIndex}
              className="gate-question"
              id={`gate-q-${questionIndex}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <TypewriterText text={q.text} msPerChar={16} onComplete={() => setTypingDone(true)} />
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
              <button type="button" className="gate-btn gate-btn-yes" onClick={() => handle(true)}>
                Yes
              </button>
              <button type="button" className="gate-btn gate-btn-no" onClick={() => handle(false)}>
                No
              </button>
            </motion.div>
          )}
        </div>

        <p className="gate-progress" aria-live="polite">
          {questionIndex + 1} / {GATE_QUESTIONS.length}
        </p>
      </div>

      <AnimatePresence>
        {locked && (
          <motion.div
            className="gate-granted-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
          >
            <div className="gate-granted-bg" aria-hidden="true">
              <div className="gate-granted-code" />
              <div className="gate-granted-scan" />
              <div className="gate-granted-vignette" />
            </div>

            <motion.div
              className="gate-granted-box"
              initial={{ y: 16, filter: 'blur(10px)' }}
              animate={{ y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="gate-granted-eyebrow">Access granted</p>
              <div className="gate-granted-title">WELCOME</div>
              <p className="gate-granted-sub">Proceeding to 4TP</p>
            </motion.div>

            <AnimatePresence>
              {/* brief static interruption beat */}
              {grantedBeat === 'static' && (
                <motion.div
                  className="gate-granted-static"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.08 }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
