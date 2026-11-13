import { AppWaveBackground } from '@/components/AppWaveBackground'
import { Hero } from '@/components/Hero'
import { AppPreview } from '@/components/AppPreview'
import { WallpaperModes } from '@/components/WallpaperModes'
import { SystemWallpapers } from '@/components/SystemWallpapers'
import { Community } from '@/components/Community'
import { Pricing } from '@/components/Pricing'
import { Footer } from '@/components/Footer'

export function HomePage() {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <AppWaveBackground />
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <AppPreview />
        <WallpaperModes />
        <SystemWallpapers />
        <Community />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
