'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import GateScreen from './GateScreen'
import AccessDeniedScreen from './AccessDeniedScreen'
import LogoIntro from './LogoIntro'
import Nav from './Nav'
import HeroSection from './HeroSection'
import Cursor from './Cursor'
import { countYes, GATE_QUESTIONS, isAccessGranted } from '@/lib/gate'
import { trackFunnel } from '@/lib/funnel-client'

type Phase = 'gate' | 'denied' | 'granted' | 'logo' | 'site'
type GrantedBeat = 'verdict' | 'static'

export default function GateExperience() {
  const [phase, setPhase] = useState<Phase>('gate')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [yesCount, setYesCount] = useState(0)
  const [grantedBeat, setGrantedBeat] = useState<GrantedBeat>('verdict')

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
      const yc = countYes(next)
      setYesCount(yc)
      trackFunnel('gate_result', {
        granted,
        yesCount: yc,
      })
      if (granted) {
        setGrantedBeat('verdict')
        setPhase('granted')
      } else {
        setPhase('denied')
      }
    },
    [answers]
  )

  const handleTryAgain = useCallback(() => {
    setAnswers([])
    setQuestionIndex(0)
    setYesCount(0)
    setGrantedBeat('verdict')
    setPhase('gate')
    trackFunnel('gate_open', { retry: true })
  }, [])

  const onLogoComplete = useCallback(() => {
    trackFunnel('site_reveal', {})
    setPhase('site')
  }, [])

  useEffect(() => {
    if (phase !== 'granted') return
    const staticTimer = window.setTimeout(() => setGrantedBeat('static'), 720)
    const logoTimer = window.setTimeout(() => {
      trackFunnel('logo_start', {})
      setPhase('logo')
    }, 920)
    return () => {
      clearTimeout(staticTimer)
      clearTimeout(logoTimer)
    }
  }, [phase])

  return (
    <>
      {phase === 'site' && (
        <>
          <div className="grain-overlay" aria-hidden="true" />
          <Cursor />
          <Nav />
          <HeroSection />
        </>
      )}

      <AnimatePresence mode="wait">
        {(phase === 'gate' || phase === 'granted') && (
          <GateScreen
            key="gate"
            questionIndex={questionIndex}
            onAnswer={handleAnswer}
            locked={phase === 'granted'}
            grantedBeat={phase === 'granted' ? grantedBeat : undefined}
          />
        )}
        {phase === 'denied' && (
          <AccessDeniedScreen key="denied" onTryAgain={handleTryAgain} />
        )}
        {phase === 'logo' && <LogoIntro key="logo" onGateComplete={onLogoComplete} />}
      </AnimatePresence>
    </>
  )
}
