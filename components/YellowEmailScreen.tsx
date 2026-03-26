'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import EmailForm from './EmailForm'
import { trackFunnel } from '@/lib/funnel-client'

type Props = {
  onContinueToSite: () => void
}

export default function YellowEmailScreen({ onContinueToSite }: Props) {
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    trackFunnel('yellow_view', {})
  }, [])

  return (
    <motion.div
      className="yellow-email-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="yellow-email-inner">
        <p className="yellow-email-eyebrow">Access granted</p>
        <h2 className="yellow-email-headline">Join the network.</h2>
        <p className="yellow-email-sub">
          Be first to know what we are building — events, releases, and the work ahead.
        </p>
        <div className="yellow-email-form-wrap">
          <EmailForm
            variant="yellow"
            onSuccess={() => {
              setJoined(true)
              trackFunnel('email_success', {})
            }}
          />
        </div>

        {joined && (
          <motion.div
            className="yellow-email-cta-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button type="button" className="yellow-email-continue" onClick={onContinueToSite}>
              Continue to site
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
