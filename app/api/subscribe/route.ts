import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
    try {
          const { email } = await req.json()

          // Validate
          if (!email || typeof email !== 'string') {
                  return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
                }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(email)) {
                  return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
                }

          const normalizedEmail = email.toLowerCase().trim()

          // Store in Supabase
          const { error: dbError } = await supabase
            .from('subscribers')
            .insert([{ email: normalizedEmail, source: 'landing_page' }])

          if (dbError) {
                  // Handle duplicate email gracefully
                  if (dbError.code === '23505') {
                            return NextResponse.json(
                                        { error: "You're already on the list." },
                                        { status: 409 }
                                      )
                          }
                  console.error('Supabase error:', dbError)
                  return NextResponse.json(
                            { error: 'Failed to save your email. Please try again.' },
                            { status: 500 }
                          )
                }

          // Send confirmation email via Resend
          const { error: emailError } = await resend.emails.send({
                  from: '4TP Network <hello@4tp.network>',
                  to: normalizedEmail,
                  subject: "You're in — 4TP Network",
                  html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Welcome to 4TP</title>
                    </head>
                    <body style="margin:0;padding:0;background:#000000;font-family:Inter,-apple-system,sans-serif;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:48px 24px;">
                        <tr>
                          <td align="center">
                            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

                              <!-- Logo -->
                              <tr>
                                <td style="padding-bottom:48px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="background:#FEEB3D;width:48px;height:48px;text-align:center;vertical-align:middle;">
                                        <span style="font-family:Inter,sans-serif;font-weight:900;font-size:28px;color:#000000;line-height:1;display:block;padding-top:6px;">4</span>
                                      </td>
                                      <td style="padding-left:0;">
                                        <span style="font-family:Inter,sans-serif;font-weight:900;font-size:32px;color:#FFFFFF;letter-spacing:-0.04em;line-height:1;">TP</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                              <!-- Headline -->
                              <tr>
                                <td style="padding-bottom:24px;">
                                  <h1 style="margin:0;font-family:Inter,sans-serif;font-weight:900;font-size:48px;color:#FFFFFF;line-height:0.95;letter-spacing:-0.04em;">
                                    You're<br><span style="color:#FEEB3D;">in.</span>
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding-bottom:40px;">
                      <p style="margin:0;font-family:Inter,sans-serif;font-size:16px;color:rgba(255,255,255,0.5);line-height:1.7;font-weight:300;">
                        Welcome to the 4TP Network. You're now on the list for events, releases, and everything we're building — the creative space for people who move forward with purpose.
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="border-top:1px solid rgba(255,255,255,0.08);padding-bottom:40px;"></td>
                  </tr>

                  <!-- Core Values -->
                  <tr>
                    <td style="padding-bottom:48px;">
                      <p style="margin:0 0 16px;font-family:Inter,sans-serif;font-size:10px;color:rgba(255,255,255,0.2);letter-spacing:0.2em;text-transform:uppercase;">What we're about</p>
                                  <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                                        <span style="font-family:Inter,sans-serif;font-size:12px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase;">Education</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                                        <span style="font-family:Inter,sans-serif;font-size:12px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase;">Inspiration</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                                        <span style="font-family:Inter,sans-serif;font-size:12px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase;">Discipline</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="padding:8px 0;">
                                        <span style="font-family:Inter,sans-serif;font-size:12px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;text-transform:uppercase;">Innovation</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                              <!-- Footer -->
                              <tr>
                                <td>
                                  <p style="margin:0;font-family:Inter,sans-serif;font-size:11px;color:rgba(255,255,255,0.15);line-height:1.6;">
                                    You're receiving this because you signed up at 4tp.network.<br>
                        We'll never spam you or share your email.
                                  </p>
                                </td>
                              </tr>

                            </table>
                          </td>
                        </tr>
                      </table>
                    </body>
                    </html>
                  `,
                })

          if (emailError) {
                  // Don't fail the whole request if email fails — subscriber is already saved
      console.error('Resend error:', emailError)
    }

    return NextResponse.json({
      success: true,
      message: "You're in. Check your inbox.",
    })

  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
