export const defaultNS = 'common'
export const fallbackLng = 'en'
export const supportedLngs = ['zh', 'en', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'pt-BR'] as const
export const languageStorageKey = 'codelume.language'

export type SupportedLanguage = (typeof supportedLngs)[number]

export const languageNames: Record<SupportedLanguage, string> = {
  zh: '简体中文',
  en: 'English',
  'zh-TW': '繁體中文',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  'pt-BR': 'Português (Brasil)',
}

export function normalizeLanguage(language: string): string {
  const [base, ...subtags] = language.toLowerCase().split('-')
  if (base === 'zh' && subtags.includes('hans')) return 'zh'
  if (base === 'zh' && subtags.some((tag) => ['hant', 'tw', 'hk', 'mo'].includes(tag))) return 'zh-TW'
  if (base === 'pt') return 'pt-BR'
  return base
}

export function getLanguagePreference(): SupportedLanguage | null {
  try {
    const saved = window.localStorage.getItem(languageStorageKey)
    return supportedLngs.find((language) => language === saved) ?? null
  } catch {
    return null
  }
}
