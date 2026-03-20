'use client'

  import { useEffect, useState, useRef } from 'react'
    import { motion, AnimatePresence } from 'framer-motion'

    /**
     * LogoIntro — The 4TP brand entrance animation.
     *
     * Animation sequence (OuiOui001-inspired, square version):
 * 0ms     — Black screen
 * 200ms   — Small yellow square appears (scale 0 → 0.15)
 * 600ms   — Square expands rapidly (scale 0.15 → 1, fills screen)
 * 1000ms  — "4" text fades in inside square
 * 1400ms  — "TP" slides in from right
 * 1800ms  — Full logo holds
 * 2400ms  — Overlay slides up and exits, revealing the hero
 */

    export default function LogoIntro() {
      const [phase, setPhase] = useState<'square' | 'logo' | 'exit' | 'done'>('square')
  const hasPlayed = useRef(false)

  useEffect(() => {
    // Only play once per session
    if (hasPlayed.current) {
      setPhase('done')
              return
        }
    hasPlayed.current = true

          const timers = [
            setTimeout(() => setPhase('logo'), 900),
            setTimeout(() => setPhase('exit'), 2200),
            setTimeout(() => setPhase('done'), 3000),
          ]

          return () => timers.forEach(clearTimeout)
      }, [])

        if (phase === 'done') return null

        return (
          <AnimatePresence>
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
            {/* Yellow square that expands */}
                      <motion.div
                        className="relative flex items-center justify-center"
                        style={{ backgroundColor: '#FEEB3D' }}
            initial={{ scale: 0.04, borderRadius: '4px' }}
                          animate={
                            phase === 'square'
                              ? { scale: 0.22, borderRadius: '2px' }
                : { scale: 18, borderRadius: '0px' }
  }
            transition={
              phase === 'square'
                              ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                              : { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
}
                        >
              {/* The "4" — sized relative to the square */}
                          <motion.span
                            className="font-black text-black select-none"
              style={{
                fontSize: '5rem',
                lineHeight: '1',
                fontFamily: 'Inter, sans-serif',
                                            fontWeight: 900,
                letterSpacing: '-0.05em',
                width: '6rem',
                height: '6rem',
                display: 'flex',
                alignItems: 'center',
                                            justifyContent: 'center',
}}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'logo' || phase === 'exit' ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              4
            </motion.span>
          </motion.div>

{/* "TP" text — appears to the right of the square during logo phase */}
          <motion.div
            className="absolute"
            style={{
                                          fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              mixBlendMode: 'difference',
}}
            initial={{ opacity: 0, x: 40 }}
            animate={
              phase === 'logo' || phase === 'exit'
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 40 }
}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            TP
          </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}
