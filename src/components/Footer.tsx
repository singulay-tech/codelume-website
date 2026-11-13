'use client'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation(['footer', 'common'])
  const tools = t('tools.items', { returnObjects: true }) as string[]

  return (
    <footer className="relative border-t border-foreground/10 pb-6 pt-10 text-foreground sm:pt-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-[1.3fr_0.8fr_1fr] md:gap-x-8 lg:gap-x-12">
          {/* 徽标与描述 */}
          <div className="col-span-2 min-w-0 md:col-span-1">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <img src="/codelume-icon.svg" alt="" width="32" height="32" className="size-8 shrink-0" />
                <div className="font-bagel text-lg leading-none tracking-wide sm:text-xl">
                  {t('brand')}
                </div>
              </div>
              <p className="mb-3 max-w-[34ch] text-sm leading-relaxed text-foreground/80">
                {t('description')}
              </p>
              {/* 社交媒体图标 */}
              <div className="-ml-2 flex items-center gap-1.5">
                {/* App Store */}
                <a
                  href={t('links.appStore')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 shrink-0 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  aria-label={t('labels.appStore')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9.2 4.5 5.5 10.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M14.8 4.5 18.5 10.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7.2 14.2h9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10.9 10.9 7.8 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M13.1 10.9 16.2 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>

                {/* Douyin */}
                <a
                  href={t('links.douyin')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 shrink-0 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  aria-label={t('labels.douyin')}
                  title={t('labels.douyinId')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M14 3v9.2a3.7 3.7 0 1 1-2.6-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M14 6.1c1 .9 2.2 1.4 3.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${t('links.email')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 shrink-0 place-items-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  aria-label={t('labels.email')}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13l8-6.99V6H4zm0 12h16V8.24l-8 6.99-8-6.99V18z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* 我们使用的工具区 */}
          <div className="min-w-0">
            <h2 className="mb-3 text-sm font-semibold leading-6 text-foreground">{t('legal.title')}</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/legal/terms" className="inline-block rounded py-1 leading-5 text-foreground/80 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  {t('legal.terms')}
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="inline-block rounded py-1 leading-5 text-foreground/80 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/legal/ugc" className="inline-block rounded py-1 leading-5 text-foreground/80 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  {t('legal.ugc')}
                </Link>
              </li>
              <li>
                <Link to="/legal/refund" className="inline-block rounded py-1 leading-5 text-foreground/80 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  {t('common:refundPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <div>
              <h2 className="mb-3 text-sm font-semibold leading-6 text-foreground">{t('tools.title')}</h2>

              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm leading-6 text-foreground/80">
                {tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 底部栏：标语 + 版权 */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-foreground/15 pt-4 text-xs leading-relaxed text-foreground/75 sm:mt-9">
          <p>{t('tagline')}</p>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
