'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import EmailForm from './EmailForm'

/**
 * HeroSection — Full-screen landing page.
 *
 * Design:
 * - 4TPCirclePppl.png as cinematic faded background
 * - Centered max-width container (complexcon-style editorial layout)
 * - Large bold headline, tagline, email CTA
 * - Values ticker at bottom
 */

const DELAY = 3.3 // seconds — waits for LogoIntro + Nav to appear

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: DELAY + i * 0.1,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const VALUES = [
  'EDUCATION',
  'INSPIRATION',
  'DISCIPLINE',
  'INNOVATION',
  'MOVE FORWARD',
]

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="4TP Landing Hero"
    >
      {/* ── Cinematic background — people image, deeply dimmed ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/4TPCirclePppl.png"
          alt=""
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          aria-hidden="true"
          priority
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10, 10, 10, 0.70)' }}
        />
        {/* Vignette gradient — bottom fade to black */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '55%',
            background: 'linear-gradient(to bottom, transparent, #0A0A0A 90%)',
          }}
        />
        {/* Vignette gradient — top fade for nav legibility */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '30%',
            background: 'linear-gradient(to top, transparent, rgba(10,10,10,0.6))',
          }}
        />
      </div>

      {/* ── Centered editorial container ── */}
      <div className="relative z-10 flex flex-col flex-1 max-w-screen-xl mx-auto w-full px-8 md:px-16">

        {/* Main content block */}
        <div className="flex flex-col justify-end flex-1 pb-24 md:pb-32 pt-40">

          {/* Tagline */}
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-white/40 tracking-[0.28em] uppercase text-xs font-medium mb-10"
          >
            Education &nbsp;·&nbsp; Inspiration &nbsp;·&nbsp; Discipline &nbsp;·&nbsp; Innovation
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3.8rem, 11vw, 10rem)',
              lineHeight: '0.91',
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
            }}
          >
            Move<br />
            <span style={{ color: '#FEEB3D' }}>Forward.</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 mb-8"
            style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.15)' }}
          />

          {/* Supporting copy */}
          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-white/50 max-w-sm text-base leading-relaxed font-light mb-10"
          >
            A creative space for those who push boundaries,
            challenge perspectives, and move through life with purpose.
          </motion.p>

          {/* Email form */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-md"
          >
            <EmailForm />
          </motion.div>

          <motion.p
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-white/20 text-xs tracking-wider mt-4"
          >
            Join the network. Be first to know.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-20 right-8 md:right-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: DELAY + 0.9, duration: 0.6 }}
          aria-hidden="true"
        >
          <div className="w-px bg-white/20" style={{ height: '52px' }} />
          <span
            className="text-white/25 text-[10px] tracking-[0.2em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
        </motion.div>
      </div>

      {/* ── Bottom values ticker ── */}
      <motion.div
        className="relative z-10 border-t border-white/[0.06] overflow-hidden py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY + 0.7, duration: 0.8 }}
      >
        <div className="marquee-track">
          {[...VALUES, ...VALUES].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-white/20 text-xs tracking-[0.3em] uppercase font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
