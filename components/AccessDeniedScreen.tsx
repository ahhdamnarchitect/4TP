'use client'

import { motion } from 'framer-motion'

type Props = {
  onTryAgain: () => void
}

export default function AccessDeniedScreen({ onTryAgain }: Props) {
  return (
    <motion.div
      className="denied-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="denied-inner">
        <h1 className="denied-title">Not this time.</h1>
        <p className="denied-body">
          4TP is built for people who move with purpose. Not everyone belongs here — and that is intentional.
        </p>
        <p className="denied-body">
          If this stings, good. Growth often starts where comfort ends. Rethink how you show up, then decide if you want another pass.
        </p>
        <button type="button" className="denied-retry" onClick={onTryAgain}>
          Try again
        </button>
      </div>
    </motion.div>
  )
}
