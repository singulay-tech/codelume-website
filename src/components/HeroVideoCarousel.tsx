import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const clips = ['fluffy-black-cat', 'futuristic-motorcycle', 'lotus-pond'].map((name) => ({
  source: `/images/hero/${name}.mp4`,
  poster: `/images/hero/${name}.webp`,
}))
const loadTimeout = 8000
const initialClip = Math.floor(Math.random() * clips.length)

export function HeroVideoCarousel() {
  const { t } = useTranslation('hero')
  const [selected, setSelected] = useState(initialClip)
  const container = useRef<HTMLDivElement>(null)
  const first = useRef<HTMLVideoElement>(null)
  const second = useRef<HTMLVideoElement>(null)
  const selectClip = useRef<(index: number) => void>()

  useEffect(() => {
    if (!container.current || !first.current || !second.current) return

    const players = [first.current, second.current].map((video) => ({
      video,
      layer: video.parentElement!,
      index: -1,
      ready: false,
    }))
    let current = players[0]
    let next = players[1]
    const failed = new Set<number>()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let advancing = false
    let transitioning = false
    let disposed = false
    let timer: number | undefined
    let animations: Animation[] = []

    function clearTimer() {
      window.clearTimeout(timer)
      timer = undefined
    }

    function load(player: typeof current, index: number) {
      if (player.index === index) return
      player.index = index
      player.ready = false
      player.video.pause()
      player.video.style.visibility = 'hidden'
      player.layer.style.backgroundImage = `url("${clips[index].poster}")`
      player.video.src = clips[index].source
      player.video.load()
    }

    function prepareNext() {
      if (transitioning || !visible || document.hidden) return
      for (let offset = 1; offset < clips.length; offset++) {
        const index = (current.index + offset) % clips.length
        if (!failed.has(index)) {
          load(next, index)
          return
        }
      }
    }

    function play(player: typeof current) {
      void player.video.play().catch((error: DOMException) => {
        if (disposed || error.name !== 'NotAllowedError') return
        clearTimer()
      })
    }

    function advance() {
      if (transitioning || !visible || document.hidden) return
      if (next.index < 0 || failed.has(next.index)) prepareNext()
      if (next.index < 0 || failed.has(next.index)) return
      if (next.ready) play(next)
      if (timer === undefined) {
        timer = window.setTimeout(() => {
          timer = undefined
          if (disposed || !advancing) return
          fail(next)
        }, loadTimeout)
      }
    }

    function showNext() {
      if (!advancing || transitioning) return
      clearTimer()
      transitioning = true
      advancing = false
      const outgoing = current
      current = next
      next = outgoing
      setSelected(current.index)
      current.layer.style.zIndex = '1'

      function finish() {
        if (disposed) return
        animations.forEach((animation) => animation.cancel())
        animations = []
        outgoing.layer.style.transform = 'translateX(100%)'
        current.layer.style.transform = 'translateX(0)'
        current.layer.style.zIndex = ''
        outgoing.video.pause()
        outgoing.video.removeAttribute('src')
        outgoing.video.load()
        outgoing.index = -1
        outgoing.ready = false
        transitioning = false
        prepareNext()
        if (current.video.ended || advancing) {
          advancing = true
          advance()
        }
      }

      if (reducedMotion.matches) {
        finish()
      } else {
        const timing = { duration: 1000, easing: 'ease-in-out', fill: 'both' } as const
        animations = [
          outgoing.layer.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }], timing),
          current.layer.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }], timing),
        ]
        void Promise.all(animations.map((animation) => animation.finished)).then(finish, () => {})
      }
    }

    function fail(player: typeof current) {
      if (player.index < 0 || (transitioning && player === next)) return
      clearTimer()
      failed.add(player.index)
      player.video.pause()
      if (!player.ready) player.video.style.visibility = 'hidden'
      if (player === current) advancing = true
      if (advancing) advance()
      else prepareNext()
    }

    const cleanup = players.map((player) => {
      const onCanPlay = () => {
        if (player.index < 0 || failed.has(player.index)) return
        player.ready = true
        if (visible && !document.hidden) {
          if (player === current && !advancing) play(player)
          else if (player === next && advancing && !transitioning) play(player)
        }
      }
      const onPlaying = () => {
        if (!visible || document.hidden || failed.has(player.index)) {
          player.video.pause()
          return
        }
        player.video.style.visibility = 'visible'
        if (player === next && advancing) showNext()
        else if (player === current && !advancing && !transitioning) {
          clearTimer()
          prepareNext()
        }
      }
      const onEnded = () => {
        if (player !== current) return
        advancing = true
        advance()
      }
      const onError = () => fail(player)
      player.video.addEventListener('canplay', onCanPlay)
      player.video.addEventListener('playing', onPlaying)
      player.video.addEventListener('ended', onEnded)
      player.video.addEventListener('error', onError)
      return () => {
        player.video.removeEventListener('canplay', onCanPlay)
        player.video.removeEventListener('playing', onPlaying)
        player.video.removeEventListener('ended', onEnded)
        player.video.removeEventListener('error', onError)
        player.video.pause()
        player.video.removeAttribute('src')
        player.video.load()
      }
    })

    function syncVisibility() {
      if (!visible || document.hidden) {
        clearTimer()
        players.forEach(({ video }) => video.pause())
        return
      }
      if (current.index < 0) load(current, initialClip)
      if (advancing || current.video.ended) {
        advancing = true
        advance()
      } else if (current.ready) {
        play(current)
      } else {
        clearTimer()
        timer = window.setTimeout(() => fail(current), loadTimeout)
      }
    }

    selectClip.current = (index) => {
      if (transitioning || index === current.index) return
      clearTimer()
      if (failed.delete(index) && next.index === index) next.index = -1
      load(next, index)
      advancing = true
      advance()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncVisibility()
    })
    observer.observe(container.current)
    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      disposed = true
      clearTimer()
      animations.forEach((animation) => animation.cancel())
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
      selectClip.current = undefined
      cleanup.forEach((removeListeners) => removeListeners())
    }
  }, [])

  return (
    <>
      <div ref={container} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[first, second].map((ref, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-black bg-cover bg-center"
            style={index === 0 ? { backgroundImage: `url("${clips[initialClip].poster}")` } : { transform: 'translateX(100%)' }}
          >
            <video ref={ref} preload="auto" muted playsInline className="invisible h-full w-full object-cover">
              {t('video.unsupported')}
            </video>
          </div>
        ))}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_90%_64%_at_left_bottom,#0C0A10F5,transparent_100%),linear-gradient(to_top,#0C0A1066,transparent_18%)] sm:bg-[radial-gradient(ellipse_65%_57%_at_left_bottom,#0C0A10ED,transparent_100%),linear-gradient(to_top,#0C0A1066,transparent_18%)]" />
      </div>
      <div className="absolute bottom-1 left-1/2 z-50 flex -translate-x-1/2 items-center">
        {clips.map(({ source }, index) => (
          <button
            key={source}
            type="button"
            aria-label={t('video.select', { number: index + 1 })}
            aria-pressed={index === selected}
            onClick={() => selectClip.current?.(index)}
            className="group grid size-11 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className={`h-1.5 rounded-full shadow-[0_1px_4px_#000b] transition-colors ${index === selected ? 'w-5 bg-white' : 'w-1.5 bg-white/65 group-hover:bg-white'}`} />
          </button>
        ))}
      </div>
    </>
  )
}
