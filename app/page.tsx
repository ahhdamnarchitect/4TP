import LogoIntro from '@/components/LogoIntro'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'
import Cursor from '@/components/Cursor'

export default function Home() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Custom cursor (desktop only — CSS hides system cursor on pointer devices) */}
      <Cursor />

      {/* Logo intro animation — covers page, then slides up */}
      <LogoIntro />

      {/* Top nav — fades in after intro */}
      <Nav />

      {/* Main content — always rendered, revealed when LogoIntro exits */}
      <HeroSection />
    </main>
  )
}
