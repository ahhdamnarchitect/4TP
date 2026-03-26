'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import { GATE_QUESTIONS } from '@/lib/gate'
import { trackFunnel } from '@/lib/funnel-client'
import { useEffect, useState } from 'react'

type Props = {
  questionIndex: number
  onAnswer: (yes: boolean) => void
}

export default function GateScreen({ questionIndex, onAnswer }: Props) {
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
      </div>

      <div className="gate-screen-inner">
        <p className="gate-pillar">{q.pillar}</p>

        <p className="sr-only">{q.text}</p>

        <motion.div
          key={questionIndex}
          className="gate-question-wrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="gate-question" id={`gate-q-${questionIndex}`}>
            <TypewriterText
              text={q.text}
              msPerChar={16}
              onComplete={() => setTypingDone(true)}
            />
          </h1>
        </motion.div>

        <div className="gate-actions" aria-live="polite">
          {typingDone && (
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
    </motion.div>
  )
}
