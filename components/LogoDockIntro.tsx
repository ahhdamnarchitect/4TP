'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  /**
   * When true, skips the intro and renders in its docked position.
   * Used to avoid re-running the animation when the gate locks for granted.
   */
  dockedOnly?: boolean
}

const EXPO = [0.16, 1, 0.3, 1] as const

export default function LogoDockIntro({ dockedOnly = false }: Props) {
  const [docked, setDocked] = useState(dockedOnly)

  useEffect(() => {
    if (dockedOnly) {
      setDocked(true)
      return
    }
    const t = window.setTimeout(() => setDocked(true), 900)
    return () => clearTimeout(t)
  }, [dockedOnly])

  const variants = useMemo(
    () => ({
      center: {
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
        scale: 0.9,
        opacity: 1,
      },
      docked: {
        left: 'clamp(1.25rem, 5vw, 5rem)',
        top: 'clamp(1.25rem, 5vw, 2.25rem)',
        x: '0%',
        y: '0%',
        scale: 0.5,
        opacity: 1,
      },
    }),
    []
  )

  return (
    <motion.div
      className="gate-logo-dock"
      initial={docked ? 'docked' : 'center'}
      animate={docked ? 'docked' : 'center'}
      variants={variants}
      transition={{ duration: 0.85, ease: EXPO }}
      aria-hidden="true"
    >
      <motion.div
        initial={docked ? { scale: 1 } : { scale: 0.05, opacity: 0 }}
        animate={docked ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={docked ? { duration: 0.2 } : { duration: 0.55, ease: EXPO }}
        style={{ transformOrigin: '50% 50%' }}
      >
        <Image
          src="/4.png"
          alt=""
          width={160}
          height={160}
          priority
          style={{ display: 'block' }}
        />
      </motion.div>
    </motion.div>
  )
}

