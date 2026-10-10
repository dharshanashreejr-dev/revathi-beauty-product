import { useEffect, useSyncExternalStore } from 'react'

// ONE language store for the whole website (landing, products, services, admin...).
// Same key as the landing page: localStorage "velvet-lang".

export type Lang = 'en' | 'ta' | 'hi' | 'ml' | 'te'
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'te', label: 'తెలుగు' },
]
export const LANG_LOCALES: Record<Lang, string> = { en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN', te: 'te-IN' }

const KEY = 'velvet-lang'
const EVT = 'velvet-lang-change'

export function getLang(): Lang {
  try {
    const s = localStorage.getItem(KEY)
    if (s && LANGS.some((l) => l.code === s)) return s as Lang
  } catch {}
  return 'en'
}

export function setLang(l: Lang) {
  try { localStorage.setItem(KEY, l) } catch {}
  document.documentElement.lang = l
  window.dispatchEvent(new Event(EVT))
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVT, cb)
  window.addEventListener('storage', cb) // other tab changed the language
  return () => { window.removeEventListener(EVT, cb); window.removeEventListener('storage', cb) }
}

/** Current language; every component using it re-renders live when the language changes. */
export function useLang(): [Lang, (l: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, getLang, () => 'en' as Lang)
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return [lang, setLang]
}

/** Text in every language; falls back to English if one is missing. */
export type Tr = { en: string } & Partial<Record<Lang, string>>
export const tr = (d: Tr, lang: Lang) => d[lang] ?? d.en
