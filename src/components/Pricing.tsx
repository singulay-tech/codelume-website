import { Check, Monitor, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const plans = [
  { id: 'standard', Icon: Monitor, accent: 'bg-muted text-foreground' },
  { id: 'pro', Icon: Sparkles, accent: 'bg-[#ece2fa] text-[#633c8e]' },
] as const

export function Pricing() {
  const { t } = useTranslation('portfolio')

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="pricing-title" className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('pricing.title')}
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {plans.map(({ id, Icon, accent }) => (
            <article key={id} className={`min-w-0 rounded-3xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8 ${id === 'pro' ? 'border-[#a68ad8]/60' : 'border-border/70'}`}>
              <div className="flex items-center gap-3">
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent}`}>
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{t(`pricing.${id}.title`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`pricing.${id}.price`)}</p>
                </div>
              </div>

              <ul className="mt-5 divide-y divide-border/70 border-t border-border/70">
                {([0, 1, 2, 3] as const).map((index) => (
                  <li key={index} className="flex items-start gap-2.5 py-3 text-sm leading-relaxed">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-purple" aria-hidden="true" />
                    {t(`pricing.${id}.features.${index}`)}
                  </li>
                ))}
              </ul>
              {id === 'pro' && (
                <p className="mt-2 rounded-xl bg-muted px-3 py-2.5 text-sm leading-relaxed text-muted-foreground">
                  {t('pricing.pro.availability')}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
