'use client'

import { useEffect, useRef, useState } from 'react'

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}

type Props = {
  text: string
  msPerChar?: number
  onComplete?: () => void
}

export default function TypewriterText({ text, msPerChar = 18, onComplete }: Props) {
  const reduced = usePrefersReducedMotion()
  const [len, setLen] = useState(0)
  const fired = useRef(false)

  useEffect(() => {
    fired.current = false
    setLen(reduced ? text.length : 0)
  }, [text, reduced])

  useEffect(() => {
    if (reduced) return
    if (len >= text.length) return
    const id = window.setTimeout(() => setLen((l) => l + 1), msPerChar)
    return () => clearTimeout(id)
  }, [len, text, msPerChar, reduced, text.length])

  useEffect(() => {
    if (len < text.length || fired.current) return
    fired.current = true
    onComplete?.()
  }, [len, text.length, onComplete])

  const shown = text.slice(0, len)

  return (
    <span className="typewriter-line">
      {shown}
      {!reduced && len < text.length && (
        <span className="typewriter-caret" aria-hidden="true">
          |
        </span>
      )}
    </span>
  )
}
