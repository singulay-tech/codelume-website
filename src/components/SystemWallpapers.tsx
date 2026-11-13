import { Film, Globe, Image, Layers3, Shapes } from 'lucide-react'
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
  { id: 'still', Icon: Image, preview: stillPreview, accent: 'bg-muted text-muted-foreground' },
  { id: 'video', preview: videoPreview, poster: videoPoster, Icon: Film, accent: 'bg-[#ECE2FA] text-[#633C8E]' },
  { id: 'scene', preview: scenePreview, poster: scenePoster, Icon: Shapes, accent: 'bg-[#DCEAF7] text-[#234E73]' },
  { id: 'depth', preview: undefined, Icon: Layers3, accent: 'bg-[#F9E8E2] text-[#894831]' },
  { id: 'web', preview: webPreview, poster: webPoster, Icon: Globe, accent: 'bg-[#DCEEEA] text-[#23594F]' },
] as const

export function SystemWallpapers() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="system-wallpapers" aria-labelledby="system-wallpapers-title" className="scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="system-wallpapers-title" className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('systemWallpapers.title')}
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          {wallpaperTypes.map((type) => {
            const { id, Icon, preview, accent } = type
            const title = t(`systemWallpapers.${id}.title`)

            return (
              <article
                key={id}
                className="grid min-w-0 grid-rows-[auto_1fr] overflow-hidden rounded-3xl border border-border/70 bg-card text-card-foreground shadow-sm"
              >
                <div className="relative grid aspect-video w-full place-items-center overflow-hidden border-b border-border/70 bg-muted">
                  {!preview ? (
                    <span className={`grid size-16 place-items-center rounded-2xl ${accent}`}>
                      <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  ) : 'poster' in type ? (
                    <WallpaperDemoVideo src={preview} poster={type.poster} label={id === 'video' ? t('systemWallpapers.video.example') : title} />
                  ) : (
                    <img src={preview} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
                  )}
                </div>
                <div className="min-w-0 px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                    {id === 'still' && (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        {t('systemWallpapers.still.basic')}
                      </span>
                    )}
                  </div>
                  {preview && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t(`systemWallpapers.${id}.description`)}
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
