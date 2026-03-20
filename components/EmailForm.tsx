'use client'

  import { useState } from 'react'
    import { motion, AnimatePresence } from 'framer-motion'

    type FormState = 'idle' | 'loading' | 'success' | 'error'

    export default function EmailForm() {
      const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
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

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
})

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
}

      setState('success')
      setEmail('')
} catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong.'
      setErrorMsg(message)
      setState('error')
}
}

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
{state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-6"
          >
            <p
              className="font-bold text-sm tracking-[0.1em] uppercase mb-2"
              style={{ color: '#FEEB3D' }}
            >
              You're in.
            </p>
            <p className="text-white/40 text-xs tracking-wider">
              Check your inbox — confirmation on the way.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            noValidate
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === 'error') setState('idle')
}}
                placeholder="Your email address"
                className="email-input w-full px-5 py-4 text-sm"
                disabled={state === 'loading'}
                aria-label="Email address"
                aria-describedby={state === 'error' ? 'email-error' : undefined}
                autoComplete="email"
                required
              />
            </div>

            <button
              type="submit"
              className="cta-button px-8 py-4 whitespace-nowrap"
              disabled={state === 'loading'}
              aria-label="Join the network"
            >
{state === 'loading' ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 border border-black/40 border-t-black rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  Joining...
                </span>
              ) : (
                'Join'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

{/* Error message */}
      <AnimatePresence>
{state === 'error' && errorMsg && (
          <motion.p
            id="email-error"
            role="alert"
            className="mt-3 text-xs text-red-400/80 tracking-wide"
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
