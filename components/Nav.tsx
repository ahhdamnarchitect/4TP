'use client'

import { motion } from 'framer-motion'

/**
 * Nav — Fixed top navigation bar.
 * Fades in after LogoIntro exits (~3.3s).
 */

const DELAY = 3.3

export default function Nav() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-16 py-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: DELAY, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
    >
      {/* Brand name */}
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: '0.9rem',
          letterSpacing: '0.22em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
        }}
      >
        4TP
      </span>

      {/* Right-side nav placeholder */}
      <div className="flex items-center gap-8">
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Network
        </span>
      </div>
    </motion.nav>
  )
}
