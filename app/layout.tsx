
import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

export const metadata: Metadata = {
    title: '4TP — Move Forward',
    description: 'A creative space designed to inspire people to discover new direction, unlock breakthroughs, and move forward through powerful visual storytelling.',
    keywords: ['4TP', '4TP Network', 'creative media', 'education', 'inspiration', 'discipline', 'innovation'],
    authors: [{ name: '4TP Network' }],
    openGraph: {
          title: '4TP — Move Forward',
          description: 'Education. Inspiration. Discipline. Innovation.',
          type: 'website',
          locale: 'en_US',
    },
    twitter: {
          card: 'summary_large_image',
          title: '4TP — Move Forward',
          description: 'Education. Inspiration. Discipline. Innovation.',
    },
    robots: {
          index: true,
          follow: true,
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
          <html lang="en" className={`scroll-smooth ${dmSerif.variable}`}>
                <head>
                        <link rel="preconnect" href="https://rsms.me/" />
                        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                </head>
                <body className="bg-black text-white antialiased">
                  {children}
                </body>
          </html>
        )
}
