import { useEffect, useRef } from 'react'

type WallpaperDemoVideoProps = {
  src: string
  poster?: string
  label: string
}

export function WallpaperDemoVideo({ src, poster, label }: WallpaperDemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let inView = false

    const updatePlayback = () => {
      if (!inView || document.hidden) {
        video.pause()
      } else {
        void video.play().catch(() => {})
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.4
      updatePlayback()
    }, { threshold: 0.4 })

    observer.observe(video)
    document.addEventListener('visibilitychange', updatePlayback)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updatePlayback)
      video.pause()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full bg-black object-contain"
    />
  )
}
