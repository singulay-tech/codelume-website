'use client'

import { motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HeroVideoCarousel } from './HeroVideoCarousel'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CODELUME_MAC_APP_STORE_URL } from '@/constants/externalLinks'

export function Hero() {
  const { t } = useTranslation(['hero', 'navigation', 'footer'])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50) // 滚动超过 50px 后显示背景
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <div className="relative isolate grid min-h-[100svh] w-full items-end overflow-hidden bg-black">
        <HeroVideoCarousel />

        <div className="relative z-40 w-full px-5 pb-[60px] pt-28 sm:px-8 lg:px-12">
          <h1 className="max-w-2xl text-balance font-sans text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.14] tracking-tight text-[#FFF9F4]">
            {t('hero:title')}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#E4DFE3]">
            {t('hero:subtitle')}
          </p>
          <a
            href={CODELUME_MAC_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-[linear-gradient(110deg,#A54D2D,#954064_52%,#6244A1)] px-5 text-sm font-semibold text-white shadow-[0_4px_16px_#1d102c55] transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-6"
          >
            <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.57-2.33 4.5-3.74 4.25z" />
            </svg>
            {t('hero:cta.download')}
          </a>
          <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-[#CEC6CD]">
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
          className={`w-full px-5 sm:px-8 lg:px-12 py-4 transition-all duration-300 ease-out ${
            isScrolled 
              ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
              : 'bg-gradient-to-b from-black/50 to-transparent'
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
                <span className="font-bagel bg-[linear-gradient(110deg,#FBB453,#FA884E_24%,#F85374_46%,#8B58F4_73%,#5D9DF6)] bg-clip-text text-base tracking-wider text-transparent sm:text-xl forced-colors:text-[CanvasText]">{t('footer:brand')}</span>
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
            <div className="relative flex items-center gap-2 sm:gap-3">
              {/* 语言切换 */}
              <LanguageSwitcher />

              <a
                href={CODELUME_MAC_APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/40 bg-black/35 px-3 text-xs font-medium text-[#FFF9F4] backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-4 sm:text-sm"
              >
                <Download size={15} className="shrink-0" aria-hidden="true" />
                <span className="sr-only min-[400px]:not-sr-only">{t('hero:cta.download')}</span>
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
