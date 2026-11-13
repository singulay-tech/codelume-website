import { Check, Layers3, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
  { id: 'native', demo: nativeDemo, Icon: Monitor, accent: 'bg-[#DCEAF7] text-[#234E73]' },
  { id: 'codelume', demo: codelumeDemo, Icon: Layers3, accent: 'bg-[#ECE2FA] text-[#633C8E]' },
] as const

function ModeDemo({ source, title }: { source: string; title: string }) {
  const { t } = useTranslation('portfolio')

  return (
    <figure className="mt-auto pt-4">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <WallpaperDemoVideo src={source} poster={poster} label={title} />
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">{t('wallpaperModes.native.demo')}</figcaption>
    </figure>
  )
}

export function WallpaperModes() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="wallpaper-modes" aria-labelledby="wallpaper-modes-title" className="scroll-mt-24 px-5 pt-14 sm:px-8 sm:pt-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="wallpaper-modes-title" className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('wallpaperModes.title')}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {modes.map(({ id, demo, Icon, accent }) => (
            <article key={id} className="flex min-w-0 flex-col rounded-3xl border border-border/70 bg-card p-5 text-card-foreground shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent}`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{t(`wallpaperModes.${id}.title`)}</h3>
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
