import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body.event !== 'string') {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { error } = await supabase.from('funnel_events').insert({
      event: body.event,
      meta: body.meta ?? {},
    })

    if (error) {
      console.error('funnel_events insert:', error.message)
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('funnel route', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
