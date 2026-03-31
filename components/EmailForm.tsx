'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackFunnel } from '@/lib/funnel-client'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type EmailFormProps = {
  /**
   * dark   — white-on-black (legacy dark hero)
   * yellow — black-on-yellow (yellow screen)
   * light  — black-on-white (Living Paper hero — default)
   */
  variant?: 'dark' | 'yellow' | 'light'
  onSuccess?: () => void
}

export default function EmailForm({ variant = 'light', onSuccess }: EmailFormProps) {
  const [email, setEmail]     = useState('')
  const [state, setState]     = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      setState('error')
      return
    }

    setState('loading')
    setErrorMsg('')
    trackFunnel('email_submit', {})

    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong.')

      setState('success')
      setEmail('')
      onSuccess?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      trackFunnel('email_error', { message })
      setErrorMsg(message)
      setState('error')
    }
  }

  const isYellow = variant === 'yellow'
  const isLight  = variant === 'light'

  return (
    <div style={{ width: '100%' }} data-email-variant={variant}>
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', padding: '1.5rem 0' }}
          >
            <p
              style={{
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isYellow || isLight ? '#000' : '#FEEB3D',
                marginBottom: '0.5rem',
              }}
            >
              You&apos;re in.
            </p>
            <p
              style={{
                color: isYellow || isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
              }}
            >
              Check your inbox — confirmation on the way.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              width: '100%',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            noValidate
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                width: '100%',
              }}
              className="email-form-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === 'error') setState('idle')
                }}
                placeholder="Email Address"
                className={
                  isYellow ? 'email-input email-input-yellow'
                  : isLight ? 'email-input email-input-light'
                  : 'email-input'
                }
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  fontSize: '0.9rem',
                  color: isYellow || isLight ? '#0a0a0a' : '#fff',
                  borderRadius: '9999px',
                  boxSizing: 'border-box',
                }}
                disabled={state === 'loading'}
                aria-label="Email address"
                aria-describedby={state === 'error' ? 'email-error' : undefined}
                autoComplete="email"
                required
              />

              <button
                type="submit"
                className={
                  isYellow ? 'cta-button cta-button-yellow'
                  : isLight ? 'cta-button cta-button-light'
                  : 'cta-button'
                }
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                }}
                disabled={state === 'loading'}
                aria-label="Join the network"
              >
                {state === 'loading' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        border: '1.5px solid rgba(0,0,0,0.3)',
                        borderTopColor: isYellow || isLight ? '#FEEB3D' : '#000',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                      }}
                      aria-hidden="true"
                    />
                    Joining...
                  </span>
                ) : (
                  'Join'
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {state === 'error' && errorMsg && (
          <motion.p
            id="email-error"
            role="alert"
            style={{
              marginTop: '0.75rem',
              fontSize: '0.75rem',
              color: isYellow || isLight ? 'rgba(127,29,29,0.9)' : 'rgba(248,113,113,0.85)',
              letterSpacing: '0.03em',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
