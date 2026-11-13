import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { defaultNS, fallbackLng, getLanguagePreference, languageStorageKey, normalizeLanguage, supportedLngs } from './config'

// English language packs
import enCommon from './locales/en/common.json'
import enNavigation from './locales/en/navigation.json'
import enHero from './locales/en/hero.json'
import enPortfolio from './locales/en/portfolio.json'
import enFooter from './locales/en/footer.json'
import enWorkshop from './locales/en/workshop.json'
import enHelp from './locales/en/help.json'
import enLegal from './locales/en/legal.json'

// Simplified Chinese language packs
import zhCommon from './locales/zh/common.json'
import zhNavigation from './locales/zh/navigation.json'
import zhHero from './locales/zh/hero.json'
import zhPortfolio from './locales/zh/portfolio.json'
import zhFooter from './locales/zh/footer.json'
import zhWorkshop from './locales/zh/workshop.json'
import zhHelp from './locales/zh/help.json'
import zhLegal from './locales/zh/legal.json'

// Traditional Chinese language packs
import zhTWCommon from './locales/zh-TW/common.json'
import zhTWNavigation from './locales/zh-TW/navigation.json'
import zhTWHero from './locales/zh-TW/hero.json'
import zhTWPortfolio from './locales/zh-TW/portfolio.json'
import zhTWFooter from './locales/zh-TW/footer.json'
import zhTWWorkshop from './locales/zh-TW/workshop.json'
import zhTWHelp from './locales/zh-TW/help.json'

// Japanese language packs
import jaCommon from './locales/ja/common.json'
import jaNavigation from './locales/ja/navigation.json'
import jaHero from './locales/ja/hero.json'
import jaPortfolio from './locales/ja/portfolio.json'
import jaFooter from './locales/ja/footer.json'
import jaWorkshop from './locales/ja/workshop.json'
import jaHelp from './locales/ja/help.json'

// Korean language packs
import koCommon from './locales/ko/common.json'
import koNavigation from './locales/ko/navigation.json'
import koHero from './locales/ko/hero.json'
import koPortfolio from './locales/ko/portfolio.json'
import koFooter from './locales/ko/footer.json'
import koWorkshop from './locales/ko/workshop.json'
import koHelp from './locales/ko/help.json'

import fr from './locales/fr/site.json'
import de from './locales/de/site.json'
import es from './locales/es/site.json'
import ptBR from './locales/pt-BR/site.json'

const resources = {
  fr,
  de,
  es,
  'pt-BR': ptBR,
  en: {
    common: enCommon,
    navigation: enNavigation,
    hero: enHero,
    portfolio: enPortfolio,
    footer: enFooter,
    workshop: enWorkshop,
    help: enHelp,
    legal: enLegal,
  },
  zh: {
    common: zhCommon,
    navigation: zhNavigation,
    hero: zhHero,
    portfolio: zhPortfolio,
    footer: zhFooter,
    workshop: zhWorkshop,
    help: zhHelp,
    legal: zhLegal,
  },
  'zh-TW': {
    common: zhTWCommon,
    navigation: zhTWNavigation,
    hero: zhTWHero,
    portfolio: zhTWPortfolio,
    footer: zhTWFooter,
    workshop: zhTWWorkshop,
    help: zhTWHelp,
    legal: zhLegal,
  },
  ja: {
    common: jaCommon,
    navigation: jaNavigation,
    hero: jaHero,
    portfolio: jaPortfolio,
    footer: jaFooter,
    workshop: jaWorkshop,
    help: jaHelp,
    legal: zhLegal,
  },
  ko: {
    common: koCommon,
    navigation: koNavigation,
    hero: koHero,
    portfolio: koPortfolio,
    footer: koFooter,
    workshop: koWorkshop,
    help: koHelp,
    legal: zhLegal,
  },
} as const

i18n.use(LanguageDetector)

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng
    document.title = i18n.t('common:siteTitle')
  }
})

i18n.use(initReactI18next).init({
    resources,
    fallbackLng,
    supportedLngs: [...supportedLngs],
    // Resolve zh-TW before falling back to its base language.
    load: 'all',
    defaultNS,
    ns: [
      'common',
      'navigation',
      'hero',
      'portfolio',
      'footer',
      'workshop',
      'help',
      'legal',
    ],

    interpolation: {
      escapeValue: false // React already handles XSS
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: [],
      lookupLocalStorage: languageStorageKey,
      convertDetectedLanguage: normalizeLanguage,
    },

    react: {
      useSuspense: true
    }
  })

if (typeof window !== 'undefined') {
  window.addEventListener('languagechange', () => {
    if (!getLanguagePreference()) void i18n.changeLanguage()
  })
}

export default i18n
