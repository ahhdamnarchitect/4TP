'use client'

import { useEffect, useRef } from 'react'

/**
 * Cursor — Custom yellow dot cursor for desktop (pointer) devices.
 * Tracks mouse position via JS and expands on interactive elements.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('a, button, input, [role="button"], label')) {
        el.classList.add('expanded')
      } else {
        el.classList.remove('expanded')
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div ref={ref} className="custom-cursor" aria-hidden="true" />
}
