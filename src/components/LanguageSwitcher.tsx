import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  fallbackLng,
  getLanguagePreference,
  languageNames,
  languageStorageKey,
  supportedLngs,
} from '@/i18n/config'
import { cn } from '@/lib/utils'

export type LanguageSwitcherVariant = 'onDarkVideo' | 'onSurface'

export function LanguageSwitcher({ variant = 'onDarkVideo' }: { variant?: LanguageSwitcherVariant }) {
  const { t, i18n } = useTranslation('common')
  const [preference, setPreference] = useState(() => getLanguagePreference() ?? 'system')
  const currentLanguage = supportedLngs.find((language) => language === i18n.resolvedLanguage) ?? fallbackLng
  const isSurface = variant === 'onSurface'

  function changeLanguage(value: string) {
    setPreference(value)
    try {
      if (value === 'system') window.localStorage.removeItem(languageStorageKey)
      else window.localStorage.setItem(languageStorageKey, value)
    } catch {
      // Apply the choice for this visit when storage is unavailable.
    }

    void i18n.changeLanguage(value === 'system' ? undefined : value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${t('language')} · ${languageNames[currentLanguage]}`}
          className={cn(
            'inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-2 sm:px-3 sm:text-sm',
            isSurface
              ? 'border-border bg-card text-foreground hover:bg-muted'
              : 'border-white/40 bg-black/35 text-white backdrop-blur-sm hover:bg-black/60'
          )}
        >
          <Globe className="size-4 shrink-0" aria-hidden="true" />
          <span lang={currentLanguage}>{languageNames[currentLanguage]}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[130] min-w-44">
        <DropdownMenuRadioGroup value={preference} onValueChange={changeLanguage}>
          <DropdownMenuRadioItem value="system" className="min-h-9 cursor-pointer">
            {t('followSystem')}
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          {supportedLngs.map((language) => (
            <DropdownMenuRadioItem key={language} value={language} lang={language} className="min-h-9 cursor-pointer">
              {languageNames[language]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
