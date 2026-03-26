'use client'

export type FunnelEventName =
  | 'gate_open'
  | 'question_view'
  | 'question_answer'
  | 'gate_result'
  | 'logo_start'
  | 'yellow_view'
  | 'email_submit'
  | 'email_success'
  | 'email_error'
  | 'site_reveal'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  const key = '4tp_funnel_sid'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
  }
  return id
}

export function trackFunnel(
  event: FunnelEventName,
  meta: Record<string, unknown> = {}
): void {
  const session_id = getSessionId()
  const body = JSON.stringify({ event, meta: { ...meta, session_id } })

  if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon('/api/funnel', blob)
    return
  }

  void fetch('/api/funnel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}
