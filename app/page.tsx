import LogoIntro       from '@/components/LogoIntro'
import Nav             from '@/components/Nav'
import HeroSection     from '@/components/HeroSection'
import ContentSections from '@/components/ContentSections'
import MobileCTA       from '@/components/MobileCTA'
import Cursor          from '@/components/Cursor'

export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
      {/* Film grain overlay — fixed, z=50 */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom cursor (desktop pointer devices only) */}
      <Cursor />

      {/* Logo intro — covers page, morphs logo to nav, then unmounts */}
      <LogoIntro />

      {/* Fixed top navigation — fades in after intro:done */}
      <Nav />

      {/* Sticky mobile bottom CTA — appears after intro:done */}
      <MobileCTA />

      {/* ── Page sections ── */}
      <HeroSection />
      <ContentSections />
    </main>
  )
}
