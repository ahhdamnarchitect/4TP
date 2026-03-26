'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import GateScreen from './GateScreen'
import AccessDeniedScreen from './AccessDeniedScreen'
import LogoIntro from './LogoIntro'
import YellowEmailScreen from './YellowEmailScreen'
import Nav from './Nav'
import HeroSection from './HeroSection'
import ContentSections from './ContentSections'
import MobileCTA from './MobileCTA'
import Cursor from './Cursor'
import { countYes, GATE_QUESTIONS, isAccessGranted } from '@/lib/gate'
import { trackFunnel } from '@/lib/funnel-client'

type Phase = 'gate' | 'denied' | 'logo' | 'yellow' | 'site'

export default function GateExperience() {
  const [phase, setPhase] = useState<Phase>('gate')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  useEffect(() => {
    trackFunnel('gate_open', {})
  }, [])

  useEffect(() => {
    document.body.dataset.phase = phase
    return () => {
      delete document.body.dataset.phase
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'site') return
    window.dispatchEvent(new CustomEvent('intro:done'))
  }, [phase])

  const handleAnswer = useCallback(
    (yes: boolean) => {
      const next = [...answers, yes]
      setAnswers(next)
      if (next.length < GATE_QUESTIONS.length) {
        setQuestionIndex(next.length)
        return
      }
      const granted = isAccessGranted(next)
      trackFunnel('gate_result', {
        granted,
        yesCount: countYes(next),
      })
      if (granted) {
        trackFunnel('logo_start', {})
        setPhase('logo')
      } else {
        setPhase('denied')
      }
    },
    [answers]
  )

  const handleTryAgain = useCallback(() => {
    setAnswers([])
    setQuestionIndex(0)
    setPhase('gate')
    trackFunnel('gate_open', { retry: true })
  }, [])

  const onLogoComplete = useCallback(() => {
    trackFunnel('yellow_view', {})
    setPhase('yellow')
  }, [])

  const handleContinueToSite = useCallback(() => {
    trackFunnel('site_reveal', {})
    setPhase('site')
  }, [])

  return (
    <>
      {phase === 'site' && (
        <>
          <div className="grain-overlay" aria-hidden="true" />
          <Cursor />
          <Nav />
          <HeroSection />
          <ContentSections />
          <MobileCTA />
        </>
      )}

      <AnimatePresence mode="wait">
        {phase === 'gate' && (
          <GateScreen
            key={`q-${questionIndex}`}
            questionIndex={questionIndex}
            onAnswer={handleAnswer}
          />
        )}
        {phase === 'denied' && (
          <AccessDeniedScreen key="denied" onTryAgain={handleTryAgain} />
        )}
        {phase === 'logo' && <LogoIntro key="logo" onGateComplete={onLogoComplete} />}
        {phase === 'yellow' && (
          <YellowEmailScreen key="yellow" onContinueToSite={handleContinueToSite} />
        )}
      </AnimatePresence>
    </>
  )
}
