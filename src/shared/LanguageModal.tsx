import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import { LANGS, getUiLang, setLang, type UiLang } from './i18n'
import { api } from '../api'
import { openLogin } from './LoginModal'

// First page of the site: the visitor picks a language, then the login page shows, then they enter the site.
// Shown once per browser session.
// Mounted from every public entry point (landing, products, services...). Uses the shared
// language store, so choosing a language updates every page immediately.

const SEEN = 'revathi-lang-modal-seen'

const COPY: Record<UiLang, { title: string; sub: string; cont: string }> = {
  en: { title: 'Choose your language', sub: 'Select the language you prefer for the website.', cont: 'Continue' },
  ta: { title: 'உங்கள் மொழியைத் தேர்வு செய்யுங்கள்', sub: 'இணையதளத்திற்கான விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்.', cont: 'தொடரவும்' },
  hi: { title: 'अपनी भाषा चुनें', sub: 'वेबसाइट के लिए अपनी पसंदीदा भाषा चुनें।', cont: 'जारी रखें' },
  ml: { title: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക', sub: 'വെബ്സൈറ്റിനായി ഇഷ്ടഭാഷ തിരഞ്ഞെടുക്കുക.', cont: 'തുടരുക' },
  te: { title: 'మీ భాషను ఎంచుకోండి', sub: 'వెబ్‌సైట్ కోసం మీకు ఇష్టమైన భాషను ఎంచుకోండి.', cont: 'కొనసాగించండి' },
  kn: { title: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ', sub: 'ವೆಬ್‌ಸೈಟ್‌ಗೆ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆರಿಸಿ.', cont: 'ಮುಂದುವರಿಸಿ' },
  mr: { title: 'तुमची भाषा निवडा', sub: 'वेबसाइटसाठी तुमची पसंतीची भाषा निवडा.', cont: 'पुढे जा' },
  bn: { title: 'আপনার ভাষা নির্বাচন করুন', sub: 'ওয়েবসাইটের জন্য আপনার পছন্দের ভাষা বেছে নিন।', cont: 'চালিয়ে যান' },
}
const NAMES: Record<UiLang, string> = { en: 'English', ta: 'தமிழ்', hi: 'हिन्दी', ml: 'മലയാളം', te: 'తెలుగు', kn: 'ಕನ್ನಡ', mr: 'मराठी', bn: 'বাংলা' }

function Modal({ onDone }: { onDone: () => void }) {
  const [sel, setSel] = useState<UiLang>(getUiLang())
  const c = COPY[sel]
  const pick = (l: UiLang) => { setSel(l); setLang(l) }
  return (
    <div role="dialog" aria-modal="true" aria-label={c.title} style={{ position: 'fixed', inset: 0, zIndex: 2147483000, display: 'grid', placeItems: 'center', background: 'linear-gradient(160deg,#fbf3e6 0%,#f1e0c8 100%)', padding: 16, overflowY: 'auto' }}>
      <div style={{ width: 'min(440px,100%)', background: '#fffaf3', color: '#3b2a1e', borderRadius: 20, padding: '30px 26px', boxShadow: '0 30px 80px rgba(0,0,0,.35)', textAlign: 'center', fontFamily: 'inherit' }}>
        <div style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', opacity: .7 }}>REVATHI HERBAL</div>
        <h2 style={{ margin: '10px 0 6px', fontSize: 24, fontWeight: 600 }}>{c.title}</h2>
        <p style={{ margin: '0 0 20px', fontSize: 14, opacity: .75 }}>{c.sub}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {LANGS.map((l) => (
            <button key={l.code} type="button" onClick={() => pick(l.code)} aria-pressed={sel === l.code}
              style={{ padding: '13px 10px', borderRadius: 12, cursor: 'pointer', fontSize: 16, border: sel === l.code ? '2px solid #7a5a2f' : '1px solid #d9c9b2', background: sel === l.code ? '#f3e6d0' : '#fff', color: 'inherit', fontWeight: sel === l.code ? 700 : 500 }}>
              {NAMES[l.code]}
            </button>
          ))}
        </div>
        <button type="button" onClick={onDone} style={{ marginTop: 20, width: '100%', padding: '13px', borderRadius: 999, border: 0, cursor: 'pointer', background: '#3b2a1e', color: '#fffaf3', fontSize: 15, letterSpacing: '.08em' }}>{c.cont}</button>
      </div>
    </div>
  )
}

export function mountLanguageModal() {
  try { if (sessionStorage.getItem(SEEN)) return } catch {}
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = createRoot(host)
  const prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  const close = () => {
    try { sessionStorage.setItem(SEEN, '1') } catch {}
    document.body.style.overflow = prevOverflow
    root.unmount(); host.remove()
    // Next page: login (skipped if the visitor is already logged in).
    if (!api.auth.currentUser()) openLogin(undefined, true)
  }
  root.render(<Modal onDone={close} />)
}
