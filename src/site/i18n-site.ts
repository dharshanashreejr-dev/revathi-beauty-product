import { useLang, tr, LANG_LOCALES, type Lang, type Tr } from '../shared/i18n'
import { DATA_TEXT } from './i18n-data'
import { SERVICES_TEXT } from './i18n-services'
import { BOOKING_TEXT } from './i18n-booking'
import { ABOUT_TEXT } from './i18n-about'
import { TRACK_TEXT } from './i18n-track'
import { MANAGER_TEXT } from './i18n-manager'

// Text for the /services /booking /success /about /track /manager app, keyed by the ENGLISH text
// (same convention as src/products). Anything missing stays English.
// Batch 3a: Services, Booking, Success (+ shared data, Calendar, page titles).
// Batch 3b: About, Track, Manager (+ its Schedule tab). Add a new i18n-*.ts file and spread it in here.
const TEXT: Record<string, Tr> = { ...DATA_TEXT, ...SERVICES_TEXT, ...BOOKING_TEXT, ...ABOUT_TEXT, ...TRACK_TEXT, ...MANAGER_TEXT }

export type Vars = Record<string, string | number>

/** Translate an English phrase. `{name}`-style placeholders are filled from `vars`. */
export function translate(en: string, lang: Lang, vars?: Vars): string {
  const s = tr(TEXT[en] ?? { en }, lang)
  return vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? '')) : s
}

/** Components using this re-render live when the language changes. */
export function useI18n() {
  const [lang] = useLang()
  const t = (en: string, vars?: Vars) => translate(en, lang, vars)
  return { lang, t }
}

/** "5 treatments" in every language. */
export const COUNT_TREATMENTS: Record<Lang, (n: number) => string> = {
  en: (n) => `${n} treatment${n !== 1 ? 's' : ''}`,
  ta: (n) => `${n} சிகிச்சை${n !== 1 ? 'கள்' : ''}`,
  hi: (n) => `${n} ट्रीटमेंट`,
  ml: (n) => `${n} ചികിത്സ${n !== 1 ? 'കൾ' : ''}`,
  te: (n) => `${n} చికిత్స${n !== 1 ? 'లు' : ''}`,
  kn: (n) => `${n} ಚಿಕಿತ್ಸೆ${n !== 1 ? 'ಗಳು' : ''}`,
  mr: (n) => `${n} ट्रीटमेंट`,
  bn: (n) => `${n} ট্রিটমেন্ট`,
  sa: (n) => `${n} चिकित्सा${n !== 1 ? 'ः' : ''}`,
}

/** "2026-10-12" -> "Mon, 12 Oct 2026" in the chosen language. */
export function fmtDate(d: string, lang: Lang): string {
  const x = new Date(`${d}T00:00:00`)
  if (isNaN(x.getTime())) return d
  return x.toLocaleDateString(LANG_LOCALES[lang], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

/** Narrow weekday labels, Sunday first (S M T W T F S in English). */
export function weekdayLetters(lang: Lang): string[] {
  const f = new Intl.DateTimeFormat(LANG_LOCALES[lang], { weekday: 'narrow' })
  return Array.from({ length: 7 }, (_, i) => f.format(new Date(2026, 0, 4 + i))) // 4 Jan 2026 is a Sunday
}
