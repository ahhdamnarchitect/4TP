import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function GET() {
  // Serve a lightweight favicon without committing binary .ico.
  // Browsers will request /favicon.ico; we return the existing PNG logo.
  const filePath = join(process.cwd(), 'public', '4.png')
  const bytes = await readFile(filePath)

  return new Response(bytes, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}

