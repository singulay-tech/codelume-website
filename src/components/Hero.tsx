'use client'

import { motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CODELUME_MAC_APP_STORE_URL } from '@/constants/externalLinks'

const HERO_VIDEO_URLS = [
  'https://assets.codelume.cn/codelume-web-preview/preview_0.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_1.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_2.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_1.mp4',
  'https://assets.codelume.cn/codelume-web-preview/preview_0.mp4',
]

// 可调：固定只播放前 N 个视频
const HERO_ACTIVE_VIDEO_COUNT = 3
const HERO_INITIAL_START_INDEX = Math.floor(
  Math.random() * Math.max(1, Math.min(HERO_ACTIVE_VIDEO_COUNT, HERO_VIDEO_URLS.length)),
)

export function Hero() {
  const { t } = useTranslation(['hero', 'navigation', 'footer'])
  const heroVideos = HERO_VIDEO_URLS.slice(0, Math.max(1, Math.min(HERO_ACTIVE_VIDEO_COUNT, HERO_VIDEO_URLS.length)))
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(HERO_INITIAL_START_INDEX)
  /** 轨道位移索引：0..heroVideos.length 为「克隆首帧」，用于无缝从最后一张继续向左滑 */
  const [trackIndex, setTrackIndex] = useState(HERO_INITIAL_START_INDEX)
  const [isTrackTransitionEnabled, setIsTrackTransitionEnabled] = useState(true)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [readyVideos, setReadyVideos] = useState<boolean[]>(
    () => Array(heroVideos.length).fill(false)
  )
  const isCarouselReady = readyVideos.length > 0 && readyVideos.every(Boolean)

  useEffect(() => {
    setReadyVideos(Array(heroVideos.length).fill(false))
  }, [heroVideos.length])

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50) // 滚动超过 50px 后显示背景
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 始终只播放当前轨道上的那一格视频；
  // 当显示克隆位时，让真正的 video[0] 影子同步播放，以便瞬时复位到 0 时画面无缝衔接（避免“倒回开头”观感）。
  useEffect(() => {
    if (!isCarouselReady) return

    const cloneIdx = heroVideos.length
    const clone = videoRefs.current[cloneIdx]

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === trackIndex) {
        const playPromise = video.play()
        if (playPromise !== undefined) playPromise.catch(() => {})
      } else if (trackIndex === cloneIdx && index === 0) {
        try {
          if (clone) video.currentTime = clone.currentTime
        } catch {
          // 部分浏览器在未就绪时 set currentTime 会抛错，忽略即可
        }
        const playPromise = video.play()
        if (playPromise !== undefined) playPromise.catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [trackIndex, isCarouselReady, heroVideos.length])

  // 滑到克隆帧后瞬时复位到 0，视觉上永远向左、不会从右弹回
  useEffect(() => {
    if (trackIndex !== heroVideos.length) return
    const timer = window.setTimeout(() => {
      // 复位前把克隆位的进度同步给真正的 video[0]，确保接管时画面连续
      const clone = videoRefs.current[heroVideos.length]
      const first = videoRefs.current[0]
      if (clone && first) {
        try {
          first.currentTime = clone.currentTime
        } catch {
          // 忽略未就绪时的赋值错误
        }
      }
      setIsTrackTransitionEnabled(false)
      setTrackIndex(0)
      setCurrentVideoIndex(0)
      window.requestAnimationFrame(() => {
        setIsTrackTransitionEnabled(true)
      })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [trackIndex, heroVideos.length])

  // 移动端菜单打开时锁定页面滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // 卸载时清理
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // 滚动时关闭移动端菜单
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobileMenuOpen])



  return (
    <>
      <div className="relative isolate grid min-h-screen w-full items-end overflow-hidden bg-black">
        {/* 背景视频轮播 */}
        <div
          className={`absolute inset-0 flex h-full w-full ${
            isTrackTransitionEnabled ? 'transition-transform duration-1000 ease-in-out' : ''
          }`}
          style={{ transform: `translateX(-${trackIndex * 100}%)` }}
        >
          {[...heroVideos, heroVideos[0]].map((url, index) => {
            const logicalIndex = index % heroVideos.length
            return (
            <video
              key={`${url}-${index}`}
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              preload="auto"
              onCanPlayThrough={() => {
                if (index >= heroVideos.length) return
                setReadyVideos((prev) => {
                  if (prev[logicalIndex]) return prev
                  const next = [...prev]
                  next[logicalIndex] = true
                  return next
                })
              }}
              onEnded={() => {
                if (!isCarouselReady) return
                if (index !== trackIndex) return
                const last = heroVideos.length - 1
                if (index < last) {
                  setCurrentVideoIndex(index + 1)
                  setTrackIndex(index + 1)
                } else if (index === last) {
                  setCurrentVideoIndex(0)
                  setTrackIndex(heroVideos.length)
                } else {
                  setIsTrackTransitionEnabled(false)
                  setTrackIndex(0)
                  setCurrentVideoIndex(0)
                  window.requestAnimationFrame(() => setIsTrackTransitionEnabled(true))
                }
              }}
              onError={() => {
                if (index !== trackIndex) return
                const n = heroVideos.length
                if (index < n - 1) {
                  setCurrentVideoIndex(index + 1)
                  setTrackIndex(index + 1)
                } else if (index === n - 1) {
                  setCurrentVideoIndex(0)
                  setTrackIndex(n)
                } else {
                  setIsTrackTransitionEnabled(false)
                  setTrackIndex(0)
                  setCurrentVideoIndex(0)
                  window.requestAnimationFrame(() => setIsTrackTransitionEnabled(true))
                }
              }}
              className="h-full min-w-full flex-shrink-0 object-cover"
              autoPlay={index === HERO_INITIAL_START_INDEX}
              muted
              loop={false}
              playsInline
            >
              <source src={url} />
              {t('hero:video.unsupported')}
            </video>
          )})}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(37,37,42,0.74),transparent_50%)]"
        />

        {/* 轮播指示器：激活点永远居中，其它点跟随轨道左移 */}
        <div
          className={`absolute bottom-6 left-1/2 z-50 -translate-x-1/2 overflow-hidden rounded-full bg-black/35 backdrop-blur-sm gentle-animation ${
            isCarouselReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '6.5rem', height: '1.75rem' }}
        >
          {/* 内部轨道：通过 translate 让 active 圆点对齐到容器水平中心；
              尺寸基于 dot=10px、active=24px、gap=8px，center 偏移 = trackIndex*18 + 12px */}
          <div
            className={`absolute top-1/2 left-1/2 flex items-center gap-2 ${
              isTrackTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''
            }`}
            style={{ transform: `translate(-${trackIndex * 18 + 12}px, -50%)` }}
          >
            {[...heroVideos, heroVideos[0]].map((_, index) => {
              const isActive = trackIndex === index
              return (
                <button
                  key={`hero-indicator-${index}`}
                  type="button"
                  aria-label={`切换到第 ${(index % heroVideos.length) + 1} 张背景`}
                  onClick={() => {
                    const i = index % heroVideos.length
                    setCurrentVideoIndex(i)
                    setTrackIndex(i)
                  }}
                  className={`h-2.5 flex-shrink-0 rounded-full gentle-animation ${
                    isActive ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              )
            })}
          </div>
        </div>

        <div className="relative z-40 w-full px-6 pb-[60px] pt-28 sm:px-8 lg:px-12">
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {t('hero:title')}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-lg">
            {t('hero:subtitle')}
          </p>
          <a
            href={CODELUME_MAC_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="relative isolate mt-5 inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-full bg-[#241B35]/60 px-5 backdrop-blur-md text-sm font-semibold text-white hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-12 sm:px-6 sm:text-base"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 -z-10 bg-[linear-gradient(110deg,#FBB453,#FA884E_24%,#F85374_46%,#8B58F4_73%,#5D9DF6)] opacity-75 blur-[34px]"
            />
            <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.57-2.33 4.5-3.74 4.25z" />
            </svg>
            {t('hero:cta.download')}
          </a>
          <p className="mt-3 max-w-xl text-[11px] leading-relaxed text-white/90 sm:text-xs">
            {t('hero:editionNote')}
          </p>
        </div>
      </div>

      {/* 全宽导航栏 */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div 
          className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* 徽标 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="flex items-center gap-3">
                <img src="/codelume-icon.svg" alt="" className="h-7 w-7" />
                <span className="font-bagel bg-[linear-gradient(110deg,#FBB453,#FA884E_24%,#F85374_46%,#8B58F4_73%,#5D9DF6)] bg-clip-text text-xl tracking-wider text-transparent forced-colors:text-[CanvasText]">{t('footer:brand')}</span>
              </div>
            </motion.div>

            {/* 导航菜单 */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#hero"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:brand')}
              </a>
              <a
                href="#workshop"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:workshop')}
              </a>
              <a
                href="#about-us"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:about')}
              </a>
              <Link
                to="/help"
                className="text-white hover:text-white/80 font-medium gentle-animation hover:scale-105"
              >
                {t('navigation:help')}
              </Link>
            </div>

            {/* 右侧 - 语言切换 + 下载按钮 + 移动菜单 */}
            <div className="flex items-center space-x-3 relative">
              {/* 语言切换 */}
              <LanguageSwitcher />

              <a
                href={CODELUME_MAC_APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#B49CE8] px-3 text-xs font-semibold text-white hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-5 sm:text-sm"
              >
                <Download size={15} className="shrink-0" aria-hidden="true" />
                {t('hero:cta.download')}
              </a>

              {/* 移动端汉堡菜单按钮 */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer z-[120] relative"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* 移动端菜单遮罩 */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-md z-[80] cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 移动端菜单面板 */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-black/90 backdrop-blur-xl border-l border-white/10 z-[90] mobile-menu-panel pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* 顶部关闭按钮 */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-effect p-3 rounded-full text-white hover:bg-white/20 active:bg-white/30 gentle-animation cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            {/* 移动端导航链接 */}
            <div className="flex flex-col space-y-4 text-white">
              <a
                href="#hero"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:brand')}
              </a>
              <a
                href="#workshop"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:workshop')}
              </a>
              <a
                href="#about-us"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:about')}
              </a>
              <Link
                to="/help"
                className="mobile-menu-link px-4 py-3 hover:text-white/80 hover:bg-white/10 rounded-lg gentle-animation font-medium text-lg active:bg-white/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation:help')}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
