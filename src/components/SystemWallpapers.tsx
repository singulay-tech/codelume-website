import { Layers3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { WallpaperDemoVideo } from './WallpaperDemoVideo'

const previewAssets = import.meta.glob<string>('../assets/system-wallpapers/{static-wallpaper.webp,video-wallpaper.mp4,video-wallpaper-poster.webp,scene-wallpaper.mp4,scene-wallpaper-poster.webp,web-wallpaper.webp,web-wallpaper.mp4}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const stillPreview = previewAssets['../assets/system-wallpapers/static-wallpaper.webp']

const videoPreview = previewAssets['../assets/system-wallpapers/video-wallpaper.mp4']
const videoPoster = previewAssets['../assets/system-wallpapers/video-wallpaper-poster.webp']

const scenePreview = previewAssets['../assets/system-wallpapers/scene-wallpaper.mp4']
const scenePoster = previewAssets['../assets/system-wallpapers/scene-wallpaper-poster.webp']

const webPreview = previewAssets['../assets/system-wallpapers/web-wallpaper.mp4']
const webPoster = previewAssets['../assets/system-wallpapers/web-wallpaper.webp']

const wallpaperTypes = [
  { id: 'still', preview: stillPreview },
  { id: 'video', preview: videoPreview, poster: videoPoster },
  { id: 'scene', preview: scenePreview, poster: scenePoster },
  { id: 'depth', preview: undefined },
  { id: 'web', preview: webPreview, poster: webPoster },
] as const

export function SystemWallpapers() {
  const { t } = useTranslation('portfolio')

  return (
    <section aria-labelledby="system-wallpapers-title" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div id="system-wallpapers" className="mx-auto max-w-6xl scroll-mt-28">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h2 id="system-wallpapers-title" className="shrink-0 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t('systemWallpapers.title')}
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--brand-gradient-start)] sm:text-right">
            {t('systemWallpapers.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          {wallpaperTypes.map((type, index) => {
            const { id, preview } = type
            const title = t(`systemWallpapers.${id}.title`)

            return (
              <article
                key={id}
                className={`grid min-w-0 grid-rows-[auto_1fr] overflow-hidden rounded-3xl border text-card-foreground shadow-sm ${index % 2 === 0 ? 'card-surface-lavender' : 'card-surface-peach'}`}
              >
                <div className="relative grid aspect-video w-full place-items-center overflow-hidden bg-muted">
                  {!preview ? (
                    <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#f9ecdf] via-[#f1eafa] to-[#dde9fa]">
                      <div className="relative aspect-video w-[55%] max-w-72">
                        <div className="absolute inset-0 -translate-x-[12%] -translate-y-[17%] rounded-2xl border border-white/80 bg-[#fcf6f1]/80 shadow-sm" />
                        <div className="absolute inset-0 translate-x-[12%] translate-y-[17%] rounded-2xl border border-white/80 bg-[#dfd8f0]/80 shadow-sm" />
                        <div className="absolute inset-0 grid place-items-center rounded-2xl border border-white/80 bg-gradient-to-br from-white via-[#f3e9fb] to-[#e0e8fa] text-[#6244a1] shadow-md">
                          <Layers3 className="size-[24%]" strokeWidth={1.4} />
                        </div>
                      </div>
                    </div>
                  ) : 'poster' in type ? (
                    <WallpaperDemoVideo src={preview} poster={type.poster} label={id === 'video' ? t('systemWallpapers.video.example') : title} />
                  ) : (
                    <img src={preview} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
                  )}
                </div>
                <div className="min-w-0 px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                    {(id === 'scene' || id === 'web' || id === 'depth') && (
                      <span className="rounded-full bg-accent-purple px-2.5 py-1 text-xs font-semibold text-white">
                        Pro
                      </span>
                    )}
                    <span className="ml-auto text-right text-sm font-medium text-[color:var(--brand-gradient-end)]">
                      {t(id === 'depth' ? 'systemWallpapers.depth.status' : `systemWallpapers.${id}.performance`)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t(`systemWallpapers.${id}.description`)}
                  </p>
                  {id === 'video' && (
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {t('systemWallpapers.video.requirements')}
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
