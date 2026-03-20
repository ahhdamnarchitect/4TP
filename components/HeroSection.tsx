'use client'

  import { motion } from 'framer-motion'
    import EmailForm from './EmailForm'

    /**
     * HeroSection — Full-screen landing page hero.
     *
     * Design references:
   * - ComplexCon: dark bg, centered logo, clean email CTA
 * - Architectural Digest: editorial spacing, bold type hierarchy
 * - 2026 trends: dark mode default, guided scroll, purposeful motion
 *
 * Layout:
 * - Full viewport height
 * - Centered content column
 * - Oversized "4" as background design element (bottom-left, like OuiOui treatment)
 * - Brand wordmark
 * - Tagline
 * - Email form
 * - Core values ticker at bottom
 */

    const DELAY_OFFSET = 3.0 // seconds — waits for LogoIntro to finish

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
      opacity: 1,
            y: 0,
            transition: {
      delay: DELAY_OFFSET + i * 0.12,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
        },
        }),
        }

        export default function HeroSection() {
            return (
                  <section
                    className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
                    aria-label="4TP Landing Hero"
                  >
              {/* Background — Oversized decorative "4" */}
      <motion.div
                      className="absolute bottom-0 left-0 select-none pointer-events-none leading-none"
                      style={{
          fontSize: 'clamp(20rem, 60vw, 80rem)',
                      fontWeight: 900,
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(254, 235, 61, 0.035)',
                      lineHeight: '0.85',
                      letterSpacing: '-0.06em',
                      userSelect: 'none',
            }}
        initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: DELAY_OFFSET + 0.3, duration: 1.2 }}
                  aria-hidden="true"
                >
                  4
                </motion.div>

          {/* Main content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8 md:gap-12">

{/* Logo wordmark */}
        <motion.div
          className="flex items-center gap-0"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
        >
{/* The yellow square logo mark */}
          <div
                      className="flex items-center justify-center"
                      style={{
              width: 'clamp(3rem, 6vw, 5.5rem)',
                              height: 'clamp(3rem, 6vw, 5.5rem)',
                              backgroundColor: '#FEEB3D',
                              flexShrink: 0,
}}
            aria-hidden="true"
                        >
            <span
                            style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#000000',
                lineHeight: 1,
                letterSpacing: '-0.04em',
}}
            >
              4
            </span>
          </div>
{/* TP */}
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              color: '#FFFFFF',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              }}
                        >
            TP
          </span>
        </motion.div>

{/* Tagline */}
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-white/40 tracking-[0.25em] uppercase text-xs md:text-sm font-medium"
        >
          Education &nbsp;&bull;&nbsp; Inspiration &nbsp;&bull;&nbsp; Discipline &nbsp;&bull;&nbsp; Innovation
        </motion.p>

{/* Headline */}
        <motion.h1
          custom={2}
          initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 900,
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            lineHeight: '0.95',
                          letterSpacing: '-0.04em',
                          color: '#FFFFFF',
              }}
                      >
                        Move<br />
          <span style={{ color: '#FEEB3D' }}>Forward.</span>
                      </motion.h1>

{/* Supporting copy */}
                      <motion.p
                        custom={3}
                        initial="hidden"
          animate="visible"
                        variants={fadeUp}
                        className="text-white/50 max-w-md text-base md:text-lg leading-relaxed font-light"
                      >
                        A creative space built for those who push boundaries,
          challenge perspectives, and move through life with purpose.
                      </motion.p>

              {/* Email form */}
        <motion.div
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="w-full max-w-md"
                      >
                        <EmailForm />
                      </motion.div>

              {/* Small print */}
        <motion.p
                        custom={5}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="text-white/20 text-xs tracking-wider"
                      >
                        Join the network. Be first to know.
                      </motion.p>
                    </div>

              {/* Bottom values ticker */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 border-t border-white/[0.06] overflow-hidden py-4"
                      initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
                  transition={{ delay: DELAY_OFFSET + 1, duration: 0.8 }}
                >
                  <div className="marquee-track">
          {['EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD', 'EDUCATION', 'INSPIRATION', 'DISCIPLINE', 'INNOVATION', 'MOVE FORWARD'].map((item, i) => (
                      <span
                        key={i}
                        className="mx-8 text-white/20 text-xs tracking-[0.3em] uppercase font-medium"
                      >
          {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

          {/* Scroll indicator */}
      <motion.div
                  className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY_OFFSET + 1.2, duration: 0.6 }}
                  aria-hidden="true"
                >
                  <div
                    className="w-px bg-white/20"
                    style={{ height: '48px' }}
        />
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
                  </motion.div>
                </section>
              )
            }
