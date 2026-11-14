import { DIRECT_LEGAL_DOC_VERSION, LEGAL_DOC_VERSION, REFUND_POLICY_VERSION, type LegalContentLocale, type LegalDocKey } from '@/constants/legalDocs'
import termsZh from '../../docs/legal/zh/terms.md?raw'
import privacyZh from '../../docs/legal/zh/privacy.md?raw'
import ugcZh from '../../docs/legal/zh/ugc.md?raw'
import termsEn from '../../docs/legal/en/terms.md?raw'
import privacyEn from '../../docs/legal/en/privacy.md?raw'
import ugcEn from '../../docs/legal/en/ugc.md?raw'
import refundZh from '../../docs/legal/zh/refund.md?raw'
import refundEn from '../../docs/legal/en/refund.md?raw'
import directTermsZh from '../../docs/legal/zh/terms.2026.11.13.md?raw'
import directPrivacyZh from '../../docs/legal/zh/privacy.2026.11.13.md?raw'
import directUgcZh from '../../docs/legal/zh/ugc.2026.11.13.md?raw'
import directTermsEn from '../../docs/legal/en/terms.2026.11.13.md?raw'
import directPrivacyEn from '../../docs/legal/en/privacy.2026.11.13.md?raw'
import directUgcEn from '../../docs/legal/en/ugc.2026.11.13.md?raw'

const MARKDOWN_BY_KEY_LOCALE: Record<LegalDocKey, Record<LegalContentLocale, string>> = {
  terms: { zh: termsZh, en: termsEn },
  privacy: { zh: privacyZh, en: privacyEn },
  ugc: { zh: ugcZh, en: ugcEn },
  refund: { zh: refundZh, en: refundEn },
}

const DIRECT_MARKDOWN: Record<Exclude<LegalDocKey, 'refund'>, Record<LegalContentLocale, string>> = {
  terms: { zh: directTermsZh, en: directTermsEn },
  privacy: { zh: directPrivacyZh, en: directPrivacyEn },
  ugc: { zh: directUgcZh, en: directUgcEn },
}

export function getLegalMarkdown(docKey: LegalDocKey, locale: LegalContentLocale, version?: string): string | null {
  if (docKey === 'refund') {
    return version === undefined || version === REFUND_POLICY_VERSION ? MARKDOWN_BY_KEY_LOCALE.refund[locale] : null
  }
  if (version === DIRECT_LEGAL_DOC_VERSION) return DIRECT_MARKDOWN[docKey][locale]
  if (version === undefined || version === LEGAL_DOC_VERSION) return MARKDOWN_BY_KEY_LOCALE[docKey][locale]
  return null
}
