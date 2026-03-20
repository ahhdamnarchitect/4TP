'use client'

import { motion } from 'framer-motion'

/**
 * Nav — Fixed top navigation.
 * Always renders but fades in after LogoIntro exits (~3.2s).
 */
export default function Nav() {
  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem clamp(1.5rem, 5vw, 5rem)',
        fontFamily: 'Inter, InterVariable, system-ui, sans-serif',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Main navigation"
    >
      {/* Brand */}
      <span
        style={{
          fontWeight: 900,
          fontSize: '0.85rem',
          letterSpacing: '0.24em',
          color: '#fff',
          textTransform: 'uppercase',
        }}
      >
        4TP
      </span>

      {/* Right side */}
      <span
        style={{
          fontWeight: 500,
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        Network
      </span>
    </motion.nav>
  )
}
