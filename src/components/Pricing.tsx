import { Check, Monitor, Sparkles, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const plans = [
  { id: 'standard', Icon: Monitor, accent: 'bg-muted text-foreground' },
  { id: 'pro', Icon: Sparkles, accent: 'bg-[#ece2fa] text-[#633c8e]' },
] as const

type PricingFeature = {
  label: string
  proOnly: boolean
  standardLimit?: string
  websiteOnly?: boolean
}

const featureGroups: ReadonlyArray<{ id: string; features: readonly PricingFeature[] }> = [
  {
    id: 'modes',
    features: [
      { label: 'wallpaperModes.native.title', proOnly: true, websiteOnly: true },
      { label: 'wallpaperModes.codelume.title', proOnly: false, standardLimit: 'partiallySupported' },
    ],
  },
  {
    id: 'types',
    features: [
      { label: 'systemWallpapers.still.title', proOnly: false },
      { label: 'systemWallpapers.video.title', proOnly: false },
      { label: 'systemWallpapers.scene.title', proOnly: true },
      { label: 'systemWallpapers.depth.title', proOnly: true },
      { label: 'systemWallpapers.web.title', proOnly: true },
    ],
  },
  {
    id: 'wallpaperFeatures',
    features: [
      { label: 'pricing.features.displays', proOnly: false, standardLimit: 'mainDisplayOnly' },
      { label: 'pricing.features.lockScreen', proOnly: true, websiteOnly: true },
      { label: 'pricing.features.playlists', proOnly: false, standardLimit: 'mainDisplayOnly' },
      { label: 'pricing.features.library', proOnly: false, standardLimit: 'libraryLimit' },
      { label: 'pricing.features.download', proOnly: false, standardLimit: 'basicTypesOnly' },
      { label: 'pricing.features.import', proOnly: false, standardLimit: 'basicTypesOnly' },
      { label: 'pricing.features.upload', proOnly: true },
      { label: 'pricing.features.export', proOnly: true },
      { label: 'pricing.features.menuBar', proOnly: false },
      { label: 'pricing.features.metrics', proOnly: false },
      { label: 'pricing.features.frameRate', proOnly: true },
      { label: 'pricing.features.storage', proOnly: false },
      { label: 'pricing.features.permissions', proOnly: false },
    ],
  },
]

const planRows = 1 + featureGroups.reduce((rows, group) => rows + 1 + group.features.length, 0)

export function Pricing() {
  const { t } = useTranslation('portfolio')

  return (
    <section aria-labelledby="pricing-title" className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
      <div id="pricing" className="mx-auto max-w-6xl scroll-mt-28">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h2 id="pricing-title" className="shrink-0 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t('pricing.title')}
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--brand-gradient-start)] sm:text-right">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-y-0">
          {plans.map(({ id, Icon, accent }) => (
            <article key={id} style={{ gridRow: `span ${planRows}` }} className={`grid min-w-0 rounded-3xl border p-6 text-card-foreground shadow-sm sm:p-8 md:grid-rows-subgrid ${id === 'pro' ? 'card-surface-lavender' : 'card-surface-peach'}`}>
              <div className="flex items-center gap-3">
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent}`}>
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{t(`pricing.${id}.title`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`pricing.${id}.price`)}</p>
                </div>
              </div>

              {featureGroups.map(({ id: group, features }) => (
                <section
                  key={group}
                  aria-labelledby={`pricing-${id}-${group}`}
                  style={{ gridRow: `span ${features.length + 1}` }}
                  className="grid pt-5 md:grid-rows-subgrid"
                >
                  <h4 id={`pricing-${id}-${group}`} className="pb-2 text-sm font-semibold">
                    {t(`pricing.groups.${group}`)}
                  </h4>
                  <ul
                    role="list"
                    style={{ gridRow: `span ${features.length}` }}
                    className="grid divide-y divide-border/70 border-y border-border/70 md:grid-rows-subgrid"
                  >
                    {features.map(({ label, proOnly, standardLimit, websiteOnly }) => {
                      const supported = id === 'pro' || !proOnly
                      const limit = id === 'standard' ? standardLimit : undefined
                      const StatusIcon = supported ? Check : X

                      return (
                        <li key={label} className="flex items-start gap-2.5 py-3 text-sm leading-relaxed">
                          <StatusIcon size={16} className={`mt-0.5 shrink-0 ${supported ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`} aria-hidden="true" />
                          {!limit && (
                            <span className="sr-only">{t(supported ? 'pricing.supported' : 'pricing.unsupported')}: </span>
                          )}
                          <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                            <span>{t(label)}</span>
                            {limit && (
                              <span className="rounded-full bg-accent-purple px-2.5 py-0.5 text-xs font-semibold text-white">
                                {t(`pricing.${limit}`)}
                              </span>
                            )}
                            {websiteOnly && id === 'pro' && (
                              <span className="rounded-full bg-[color:var(--brand-gradient-start)] px-2.5 py-0.5 text-xs font-semibold text-white">
                                {t('pricing.websiteOnly')}
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
