import { useEffect, useRef } from 'react'
import { ArrowDownToLine, ArrowLeft, ArrowUpRight, Clock, Info, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppWaveBackground } from '@/components/AppWaveBackground'
import { Footer } from '@/components/Footer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { CODELUME_MAC_APP_STORE_URL, CODELUME_WEBSITE_DOWNLOAD_URL } from '@/constants/externalLinks'
import { legalDocPath } from '@/constants/legalDocs'

export function DownloadPage() {
  const { t } = useTranslation(['hero', 'help'])
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    heading.current?.focus({ preventScroll: true })
  }, [])

  return (
    <div className="relative isolate flex min-h-[100svh] flex-col bg-background text-foreground">
      <AppWaveBackground />
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium hover:text-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          <ArrowLeft size={16} aria-hidden="true" />
          {t('help:back')}
        </Link>
        <LanguageSwitcher variant="onSurface" />
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-10 pt-3 sm:px-8 sm:pb-12 sm:pt-5">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <img src="/codelume-icon.svg" alt="" width="36" height="36" className="size-9 shrink-0" />
          <h1 ref={heading} tabIndex={-1} className="text-xl font-semibold leading-snug tracking-tight outline-none sm:text-2xl">
            {t('hero:cta.download')}
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border card-surface-lavender p-5 text-[#221a31] shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e7d9fb] text-[#61359c]">
                <Store size={20} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold leading-snug tracking-tight">{t('hero:cta.appStore')}</h2>
            </div>
            <p className="mb-5 mt-3 text-sm leading-relaxed text-[#554962]">{t('hero:cta.appStoreDescription')}</p>
            <a
              href={CODELUME_MAC_APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#6244a1] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#50348c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {t('hero:cta.openAppStore')}
              <ArrowUpRight size={16} className="shrink-0" aria-hidden="true" />
            </a>
          </article>

          <article className="flex flex-col rounded-2xl border card-surface-peach p-5 text-[#302018] shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fae3d3] text-[#974c2b]">
                <ArrowDownToLine size={20} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold leading-snug tracking-tight">{t('hero:cta.website')}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#645247]">{t('hero:cta.websiteDescription')}</p>
            <p className="mb-5 mt-2 border-l-2 border-[#e9cdbb] pl-3 text-[13px] leading-relaxed text-[#645247]">
              {t('hero:cta.websiteReason')}
            </p>
            {CODELUME_WEBSITE_DOWNLOAD_URL ? (
              <a href={CODELUME_WEBSITE_DOWNLOAD_URL} className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#8d4125] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#73341e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                {t('hero:cta.download')}
                <ArrowDownToLine size={16} className="shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-auto inline-flex min-h-12 w-fit items-center gap-2 py-2 text-sm font-medium text-[#645247]">
                <Clock size={15} className="shrink-0" aria-hidden="true" />
                {t('hero:cta.comingSoon')}
              </p>
            )}
          </article>
        </div>
        <section aria-labelledby="download-pro" className="mt-4 rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed">
          <h2 id="download-pro" className="font-semibold">{t('hero:cta.pro.title')}</h2>
          <p className="mt-1 font-medium">{t('hero:cta.pro.price')}</p>
          <p className="mt-1 text-foreground/80">{t('hero:cta.pro.features')}</p>
          <p className="mt-1 text-foreground/80">{t('hero:cta.pro.purchase')}</p>
          <Link to={legalDocPath('refund')} className="mt-2 inline-block text-foreground underline underline-offset-4">
            {t('common:refundPolicy')}
          </Link>
        </section>
        {CODELUME_WEBSITE_DOWNLOAD_URL && (
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground/80">
            <Info size={16} className="mt-0.5 shrink-0 text-foreground/70" aria-hidden="true" />
            <span>{t('hero:cta.existingAccount')}</span>
          </p>
        )}
        <section aria-labelledby="download-system-requirements" className="mt-4 rounded-xl border border-border bg-background px-4 py-3 text-sm leading-relaxed">
          <h2 id="download-system-requirements" className="font-semibold">
            {t('hero:cta.systemRequirements.title')}
          </h2>
          <p className="mt-1 text-foreground/80">{t('hero:cta.systemRequirements.description')}</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
