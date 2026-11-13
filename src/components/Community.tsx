import { useTranslation } from 'react-i18next'

export function Community() {
  const { t } = useTranslation('portfolio')

  return (
    <section aria-labelledby="community-title" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div id="community" className="mx-auto max-w-6xl scroll-mt-28">
        <h2 id="community-title" className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('community.title')}
        </h2>
        <p className="rounded-3xl border border-border/70 bg-card p-6 text-sm text-muted-foreground shadow-sm sm:p-8">
          {t('community.pending')}
        </p>
      </div>
    </section>
  )
}
