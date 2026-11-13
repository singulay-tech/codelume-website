import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { defaultNS, fallbackLng, getLanguagePreference, languageStorageKey, normalizeLanguage, supportedLngs } from './config'

// English language packs
import enCommon from './locales/en/common.json'
import enNavigation from './locales/en/navigation.json'
import enHero from './locales/en/hero.json'
import enPortfolio from './locales/en/portfolio.json'
import enTeam from './locales/en/team.json'
import enContact from './locales/en/contact.json'
import enFooter from './locales/en/footer.json'
import enAwards from './locales/en/awards.json'
import enAboutUs from './locales/en/aboutUs.json'
import enWorkshop from './locales/en/workshop.json'
import enHelp from './locales/en/help.json'
import enLegal from './locales/en/legal.json'
import enErrors from './locales/en/errors.json'

// Simplified Chinese language packs
import zhCommon from './locales/zh/common.json'
import zhNavigation from './locales/zh/navigation.json'
import zhHero from './locales/zh/hero.json'
import zhPortfolio from './locales/zh/portfolio.json'
import zhTeam from './locales/zh/team.json'
import zhContact from './locales/zh/contact.json'
import zhFooter from './locales/zh/footer.json'
import zhAwards from './locales/zh/awards.json'
import zhAboutUs from './locales/zh/aboutUs.json'
import zhWorkshop from './locales/zh/workshop.json'
import zhHelp from './locales/zh/help.json'
import zhLegal from './locales/zh/legal.json'
import zhErrors from './locales/zh/errors.json'

// Traditional Chinese language packs
import zhTWCommon from './locales/zh-TW/common.json'
import zhTWNavigation from './locales/zh-TW/navigation.json'
import zhTWHero from './locales/zh-TW/hero.json'
import zhTWPortfolio from './locales/zh-TW/portfolio.json'
import zhTWTeam from './locales/zh-TW/team.json'
import zhTWContact from './locales/zh-TW/contact.json'
import zhTWFooter from './locales/zh-TW/footer.json'
import zhTWAwards from './locales/zh-TW/awards.json'
import zhTWAboutUs from './locales/zh-TW/aboutUs.json'
import zhTWWorkshop from './locales/zh-TW/workshop.json'
import zhTWHelp from './locales/zh-TW/help.json'
import zhTWErrors from './locales/zh-TW/errors.json'

// Japanese language packs
import jaCommon from './locales/ja/common.json'
import jaNavigation from './locales/ja/navigation.json'
import jaHero from './locales/ja/hero.json'
import jaPortfolio from './locales/ja/portfolio.json'
import jaTeam from './locales/ja/team.json'
import jaContact from './locales/ja/contact.json'
import jaFooter from './locales/ja/footer.json'
import jaAwards from './locales/ja/awards.json'
import jaAboutUs from './locales/ja/aboutUs.json'
import jaWorkshop from './locales/ja/workshop.json'
import jaHelp from './locales/ja/help.json'
import jaErrors from './locales/ja/errors.json'

// Korean language packs
import koCommon from './locales/ko/common.json'
import koNavigation from './locales/ko/navigation.json'
import koHero from './locales/ko/hero.json'
import koPortfolio from './locales/ko/portfolio.json'
import koTeam from './locales/ko/team.json'
import koContact from './locales/ko/contact.json'
import koFooter from './locales/ko/footer.json'
import koAwards from './locales/ko/awards.json'
import koAboutUs from './locales/ko/aboutUs.json'
import koWorkshop from './locales/ko/workshop.json'
import koHelp from './locales/ko/help.json'
import koErrors from './locales/ko/errors.json'

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
    team: enTeam,
    contact: enContact,
    footer: enFooter,
    awards: enAwards,
    aboutUs: enAboutUs,
    workshop: enWorkshop,
    help: enHelp,
    legal: enLegal,
    errors: enErrors,
  },
  zh: {
    common: zhCommon,
    navigation: zhNavigation,
    hero: zhHero,
    portfolio: zhPortfolio,
    team: zhTeam,
    contact: zhContact,
    footer: zhFooter,
    awards: zhAwards,
    aboutUs: zhAboutUs,
    workshop: zhWorkshop,
    help: zhHelp,
    legal: zhLegal,
    errors: zhErrors,
  },
  'zh-TW': {
    common: zhTWCommon,
    navigation: zhTWNavigation,
    hero: zhTWHero,
    portfolio: zhTWPortfolio,
    team: zhTWTeam,
    contact: zhTWContact,
    footer: zhTWFooter,
    awards: zhTWAwards,
    aboutUs: zhTWAboutUs,
    workshop: zhTWWorkshop,
    help: zhTWHelp,
    legal: zhLegal,
    errors: zhTWErrors,
  },
  ja: {
    common: jaCommon,
    navigation: jaNavigation,
    hero: jaHero,
    portfolio: jaPortfolio,
    team: jaTeam,
    contact: jaContact,
    footer: jaFooter,
    awards: jaAwards,
    aboutUs: jaAboutUs,
    workshop: jaWorkshop,
    help: jaHelp,
    legal: zhLegal,
    errors: jaErrors,
  },
  ko: {
    common: koCommon,
    navigation: koNavigation,
    hero: koHero,
    portfolio: koPortfolio,
    team: koTeam,
    contact: koContact,
    footer: koFooter,
    awards: koAwards,
    aboutUs: koAboutUs,
    workshop: koWorkshop,
    help: koHelp,
    legal: zhLegal,
    errors: koErrors,
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
      'team',
      'contact',
      'footer',
      'awards',
      'aboutUs',
      'workshop',
      'help',
      'legal',
      'errors',
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
