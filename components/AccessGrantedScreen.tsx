'use client'

import { motion } from 'framer-motion'

type Props = {
  yesCount: number
}

export default function AccessGrantedScreen({ yesCount }: Props) {
  return (
    <motion.div
      className="granted-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-live="polite"
    >
      <motion.div
        className="granted-inner"
        initial={{ y: 18, filter: 'blur(10px)' }}
        animate={{ y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="granted-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Access granted
        </motion.p>

        <motion.h1
          className="granted-title"
          initial={{ opacity: 0, y: 14, letterSpacing: '0.35em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.03em' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Welcome.
        </motion.h1>

        <motion.p
          className="granted-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          Alignment score: <strong>{yesCount}</strong> / 4
        </motion.p>
      </motion.div>

      <div className="granted-scanlines" aria-hidden="true" />
      <div className="granted-vignette" aria-hidden="true" />
    </motion.div>
  )
}

