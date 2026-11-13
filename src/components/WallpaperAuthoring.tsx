import { ArrowUpRight, Code2, Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CODELUME_WALLPAPER_SKILLS_URL } from '@/constants/externalLinks'

export function WallpaperAuthoring() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="wallpaper-authoring" aria-labelledby="wallpaper-authoring-title" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="wallpaper-authoring-title" className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('wallpaperAuthoring.title')}
        </h2>

        <div className="flex flex-col gap-5 rounded-3xl border border-border/70 bg-card p-6 text-card-foreground shadow-sm sm:flex-row sm:items-start sm:gap-7 sm:p-9">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#ece2fa] text-[#633c8e]">
            <Code2 size={23} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
              {t('wallpaperAuthoring.headline')}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('wallpaperAuthoring.intro')}
            </p>
            {CODELUME_WALLPAPER_SKILLS_URL ? (
              <a href={CODELUME_WALLPAPER_SKILLS_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#6244a1] px-4 py-2 text-sm font-semibold text-white hover:bg-[#50348c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                {t('wallpaperAuthoring.repository')}
                <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Github size={16} className="shrink-0" aria-hidden="true" />
                {t('wallpaperAuthoring.pending')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
