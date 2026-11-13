import { AppWaveBackground } from '@/components/AppWaveBackground'
import { Hero } from '@/components/Hero'
import { Portfolio } from '@/components/Portfolio'
import { WorkshopTeaser } from '@/components/WorkshopTeaser'
import { AboutUs } from '@/components/AboutUs'
import { Footer } from '@/components/Footer'

export function HomePage() {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <AppWaveBackground />
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <Portfolio />
        <WorkshopTeaser />
        <AboutUs />
      </main>
      <Footer />
    </div>
  )
}
