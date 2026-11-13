import { useEffect, useRef, useState } from 'react'
import { Film, Globe, Image, Layers3, Shapes } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
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

const scrollLayoutQuery = '(min-width: 769px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'
const lastCardIndex = wallpaperTypes.length - 1

export function SystemWallpapers() {
  const { t } = useTranslation('portfolio')
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const type = wallpaperTypes[activeIndex]
  const { id, Icon, preview, accent } = type
  const title = t(`systemWallpapers.${id}.title`)

  function measureTrack() {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return
    const top = Number.parseFloat(getComputedStyle(stage).top)
    const travel = track.offsetHeight - stage.offsetHeight
    if (Number.isFinite(top) && travel > 0) return { track, top, travel }
  }

  useEffect(() => {
    const layout = window.matchMedia(scrollLayoutQuery)

    function updateActiveCard() {
      if (!layout.matches) return
      const geometry = measureTrack()
      if (!geometry) return
      const { track, top, travel } = geometry
      const progress = (top - track.getBoundingClientRect().top) / travel
      const index = Math.min(lastCardIndex, Math.floor(Math.max(0, progress) * wallpaperTypes.length))
      setActiveIndex(index)
    }

    let frame = 0
    function scheduleUpdate() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateActiveCard()
      })
    }

    updateActiveCard()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    layout.addEventListener('change', scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      layout.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  function selectCard(index: number) {
    if (window.matchMedia(scrollLayoutQuery).matches) {
      const geometry = measureTrack()
      if (geometry) {
        const { track, top, travel } = geometry
        window.scrollTo({
          top: window.scrollY + track.getBoundingClientRect().top - top + travel * (index + 0.5) / wallpaperTypes.length,
          behavior: 'instant',
        })
      }
    }
    setActiveIndex(index)
  }

  return (
    <section id="system-wallpapers" aria-labelledby="system-wallpapers-title" className="scroll-mt-20 px-[var(--wallpaper-gutter)] py-14 [--wallpaper-gutter:1.25rem] sm:py-20 sm:[--wallpaper-gutter:2rem] lg:[--wallpaper-gutter:3rem]">
      <div ref={trackRef} className="wallpaper-scroll-track mx-auto max-w-5xl">
        <div ref={stageRef} className="wallpaper-scroll-stage">
          <h2 id="system-wallpapers-title" className="sr-only">
            {t('systemWallpapers.title')}
          </h2>

          <div className="mb-4 flex flex-wrap gap-2">
            {wallpaperTypes.map(({ id: type }, index) => (
              <button
                key={type}
                type="button"
                aria-pressed={index === activeIndex}
                onClick={() => selectCard(index)}
                className="min-h-11 rounded-full border border-border/70 bg-card px-4 text-sm font-medium text-card-foreground transition-colors hover:border-[#6244a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-pressed:border-[#6244a1] aria-pressed:bg-[#6244a1] aria-pressed:text-white"
              >
                {t(`systemWallpapers.${type}.title`)}
              </button>
            ))}
          </div>
          <div className="h-0.5 overflow-hidden rounded-full bg-foreground/10" aria-hidden="true">
            <div className="h-full origin-left rounded-full bg-[#6244a1] motion-safe:transition-transform motion-safe:duration-300" style={{ transform: `scaleX(${(activeIndex + 1) / wallpaperTypes.length})` }} />
          </div>
          <motion.article
            key={id}
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            className="wallpaper-scroll-card mx-auto mt-3 grid w-full min-w-0 content-start gap-3"
          >
            <div className="relative grid aspect-video w-full place-items-center overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-sm">
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
            <div className="min-w-0 rounded-2xl border border-border/70 bg-card px-5 py-4 text-card-foreground shadow-sm sm:px-6">
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
          </motion.article>
        </div>
      </div>
    </section>
  )
}
