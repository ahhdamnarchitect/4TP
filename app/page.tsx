import LogoIntro from '@/components/LogoIntro'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
      <main className="relative min-h-screen bg-black overflow-hidden">
            {/* Grain overlay for texture */}
                  <div className="grain-overlay" aria-hidden="true" />

                        {/* Logo intro animation — plays once on load */}
                              <LogoIntro />

                                    {/* Main hero section */}
                                          <HeroSection />
                                              </main>
                                                )
                                                }
