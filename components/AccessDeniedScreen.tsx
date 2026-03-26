'use client'

import { motion } from 'framer-motion'

type Props = {
  onTryAgain: () => void
}

export default function AccessDeniedScreen({ onTryAgain }: Props) {
  return (
    <motion.div
      className="denied-screen"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-live="polite"
    >
      <motion.div
        className="denied-inner"
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="denied-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Not this time.
        </motion.h1>
        <motion.p
          className="denied-body"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          4TP is built for people who move with purpose. Not everyone belongs here — and that is intentional.
        </motion.p>
        <motion.p
          className="denied-body"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          If this stings, good. Growth often starts where comfort ends. Rethink how you show up, then decide if you want another pass.
        </motion.p>
        <motion.button
          type="button"
          className="denied-retry"
          onClick={onTryAgain}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.26 }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          Try again
        </motion.button>
      </motion.div>

      <div className="denied-scanlines" aria-hidden="true" />
      <div className="denied-vignette" aria-hidden="true" />
    </motion.div>
  )
}
