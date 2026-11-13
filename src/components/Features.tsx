import { Layers3, ListVideo, Monitor, MonitorPlay } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const wallpaperFeatures = [
  { id: 'native', Icon: Monitor, image: 'lotus-pond.webp', accent: 'bg-[#DCEAF7] text-[#234E73]' },
  { id: 'extended', Icon: Layers3, image: 'futuristic-motorcycle.webp', accent: 'bg-[#ECE2FA] text-[#633C8E]' },
] as const

const desktopFeatures = [
  { id: 'displays', Icon: MonitorPlay },
  { id: 'playlists', Icon: ListVideo },
] as const

export function Features() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 sm:mb-12">
          <h2 id="features-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('features.title')}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('features.intro')}
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {wallpaperFeatures.map(({ id, Icon, image, accent }) => (
            <article key={id} className="flex flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card text-card-foreground shadow-sm">
              <img src={`/images/hero/${image}`} alt="" loading="lazy" width="960" height="540" className="aspect-[16/8] w-full bg-muted object-cover" />
              <div className="flex-1 p-6 sm:p-8">
                <div className={`mb-4 grid size-11 place-items-center rounded-xl ${accent}`}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{t(`features.${id}.title`)}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{t(`features.${id}.description`)}</p>
              </div>
            </article>
          ))}

          {desktopFeatures.map(({ id, Icon }) => (
            <article key={id} className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/90 p-5 text-card-foreground sm:p-6">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#F9E8E2] text-[#894831]">
                <Icon size={20} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t(`features.${id}.title`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`features.${id}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
