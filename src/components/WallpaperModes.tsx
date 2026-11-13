import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppleLogo } from './AppleLogo'
import { WallpaperDemoVideo } from './WallpaperDemoVideo'

const previewAssets = import.meta.glob<string>('../assets/system-wallpapers/screensaver-*.{webp,mp4}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const nativeDemo = previewAssets['../assets/system-wallpapers/screensaver-transition.mp4']
const codelumeDemo = previewAssets['../assets/system-wallpapers/screensaver-continuous.mp4']
const poster = previewAssets['../assets/system-wallpapers/screensaver-poster.webp']

const modes = [
  { id: 'native', demo: nativeDemo },
  { id: 'codelume', demo: codelumeDemo },
] as const

function ModeDemo({ source, title }: { source: string; title: string }) {
  const { t } = useTranslation('portfolio')

  return (
    <figure className="mt-auto pt-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <WallpaperDemoVideo src={source} poster={poster} label={title} />
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">{t('wallpaperModes.native.demo')}</figcaption>
    </figure>
  )
}

export function WallpaperModes() {
  const { t } = useTranslation('portfolio')

  return (
    <section aria-labelledby="wallpaper-modes-title" className="px-5 pt-14 sm:px-8 sm:pt-20 lg:px-12">
      <div id="wallpaper-modes" className="mx-auto max-w-6xl scroll-mt-28">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h2 id="wallpaper-modes-title" className="shrink-0 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t('wallpaperModes.title')}
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--brand-gradient-start)] sm:text-right">
            {t('wallpaperModes.subtitle')}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {modes.map(({ id, demo }) => (
            <article key={id} className="flex min-w-0 flex-col rounded-3xl border border-border/70 bg-card p-5 text-card-foreground shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                {id === 'native' ? (
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#DCEAF7] text-[#234E73]">
                    <AppleLogo size={24} />
                  </span>
                ) : (
                  <img src="/codelume-icon.svg" alt="" width={44} height={44} className="size-11 shrink-0 rounded-xl" />
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-xl font-semibold tracking-tight">{t(`wallpaperModes.${id}.title`)}</h3>
                  {id === 'native' && (
                    <span className="rounded-full bg-accent-purple px-2.5 py-1 text-xs font-semibold text-white">
                      Pro
                    </span>
                  )}
                </div>
              </div>
              <ul className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {([0, 1, 2] as const).map((index) => (
                  <li key={index} className="flex items-start gap-2.5 py-3 text-sm leading-relaxed text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-purple" aria-hidden="true" />
                    {t(`wallpaperModes.${id}.points.${index}`)}
                  </li>
                ))}
              </ul>
              {id === 'native' && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t('wallpaperModes.native.availability')}</p>
              )}
              {demo && <ModeDemo source={demo} title={t(`wallpaperModes.${id}.title`)} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
