import LogoIntro from '@/components/LogoIntro'
import Nav from '@/components/Nav'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh', position: 'relative' }}>
      {/* Grain overlay for texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Logo intro animation — plays once on load */}
      <LogoIntro />

      {/* Top navigation — fades in after intro */}
      <Nav />

      {/* Main hero content */}
      <HeroSection />
    </main>
  )
}
