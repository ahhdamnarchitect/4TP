'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  text: string
  onComplete?: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

export default function WordFade({ text, onComplete }: Props) {
  const [reduced, setReduced] = useState(false)
  const fired = useRef(false)

  useEffect(() => {
    fired.current = false
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [text])

  const words = text.split(' ')

  const handleLast = () => {
    if (fired.current) return
    fired.current = true
    onComplete?.()
  }

  if (reduced) {
    // Instant reveal — fire onComplete on mount
    return (
      <span
        ref={(el) => {
          if (el && !fired.current) {
            fired.current = true
            onComplete?.()
          }
        }}
      >
        {text}
      </span>
    )
  }

  return (
    <span aria-hidden="true">
      {words.map((word, i) => (
        <motion.span
          key={`${text}-${i}`}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.28,
            delay: i * 0.045,
            ease: EASE,
          }}
          onAnimationComplete={i === words.length - 1 ? handleLast : undefined}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
