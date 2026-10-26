import { createRoot } from 'react-dom/client'
import { useEffect, useState, type CSSProperties } from 'react'
import { LANGS, getUiLang, setLang, type UiLang } from './i18n'
import { api } from '../api'
import { openLogin } from './LoginModal'
import { authT } from './auth-text'
import Stepper, { Step } from './reactbits/Stepper'

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
  sa: { title: 'भवतः भाषां चिनुत', sub: 'जालस्थानाय भवतः प्रियां भाषां चिनुत।', cont: 'अनुवर्तताम्' },
}
const NAMES: Record<UiLang, string> = { en: 'English', ta: 'தமிழ்', hi: 'हिन्दी', ml: 'മലയാളം', te: 'తెలుగు', kn: 'ಕನ್ನಡ', mr: 'मराठी', bn: 'বাংলা', sa: 'संस्कृतम्' }

// Step 1 of the first visit: a short brand animation, then the language page, then login (OTP), then the site.
const SPLASH_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');
.rv-splash{position:fixed;inset:0;z-index:2147483100;display:grid;place-items:center;background:#f5f2fd;color:#4c1d92;text-align:center;padding:24px;cursor:pointer;transition:opacity .7s ease,visibility 0s .7s}
.rv-splash::before{content:'';position:absolute;inset:18px;border:1px solid rgba(201,162,75,.6);pointer-events:none}
.rv-splash::after{content:'';position:absolute;inset:27px;border:1px solid rgba(201,162,75,.28);pointer-events:none}
.rv-splash.is-out{opacity:0;visibility:hidden;pointer-events:none}
.rv-splash-in{display:flex;flex-direction:column;align-items:center}
.rv-splash .rv-up{opacity:0;transform:translateY(14px);animation:rvUp .9s cubic-bezier(.2,.7,.2,1) forwards;animation-delay:var(--d,0s)}
.rv-splash .rv-lotus{width:64px;height:auto;overflow:visible}
.rv-splash .rv-lotus path{stroke-dasharray:140;stroke-dashoffset:140;animation:rvDraw 1.6s ease forwards}
.rv-splash .rv-lotus path:nth-child(2){animation-delay:.15s}.rv-splash .rv-lotus path:nth-child(3){animation-delay:.3s}
.rv-splash .rv-lotus path:nth-child(4){animation-delay:.45s}.rv-splash .rv-lotus path:nth-child(5){animation-delay:.6s}
.rv-splash .rv-lotus path:nth-child(6){animation-delay:.75s}
.rv-name{font-family:'Cormorant Garamond',Georgia,serif;font-weight:400;font-size:clamp(24px,4.6vw,56px);letter-spacing:.2em;margin:26px 0 0 .2em;line-height:1.1}
.rv-sub{font-family:'Jost',system-ui,sans-serif;font-size:clamp(11px,1.2vw,14px);letter-spacing:.24em;margin:18px 0 0 .24em}
.rv-tag{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:clamp(15px,2vw,24px);letter-spacing:.2em;color:#5922ac;margin-top:14px}
.rv-rule{width:0;height:1px;background:linear-gradient(90deg,transparent,#c9a24b,transparent);margin:26px auto 0;animation:rvRule 1.2s .5s ease forwards}
.rv-velvet{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:clamp(22px,3vw,38px);margin-top:26px;background:linear-gradient(100deg,#8a6a1f 0%,#c9a24b 25%,#f1dc8f 45%,#b8902f 62%,#8a6a1f 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:rvUp .9s cubic-bezier(.2,.7,.2,1) forwards,rvShine 5s linear 2.6s infinite}
.rv-women{font-family:'Jost',system-ui,sans-serif;font-weight:500;font-size:clamp(11px,1.3vw,15px);letter-spacing:.42em;margin:30px 0 0 .42em;color:#4c1d92;padding:9px 20px;border-top:1px solid #c9a24b;border-bottom:1px solid #c9a24b}
.rv-cats{font-family:'Jost',system-ui,sans-serif;font-size:clamp(10px,1vw,12px);letter-spacing:.3em;color:#b08a2e;margin-top:26px}
@keyframes rvUp{to{opacity:1;transform:none}}
@keyframes rvShine{to{background-position:-220% 0}}
@keyframes rvDraw{to{stroke-dashoffset:0}}
@keyframes rvRule{to{width:min(216px,50vw)}}
@media (prefers-reduced-motion:reduce){.rv-velvet{animation:none;opacity:1;transform:none}.rv-splash .rv-up{animation-duration:.01s;animation-delay:0s}.rv-splash .rv-lotus path{animation:none;stroke-dashoffset:0}.rv-rule{animation-duration:.01s;animation-delay:0s}}
`
const SPLASH_MS = 5600

function Splash({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false)
  const finish = () => { if (out) return; setOut(true); setTimeout(onDone, 600) }
  useEffect(() => { const id = setTimeout(finish, SPLASH_MS); return () => clearTimeout(id) }, [])
  const up = (d: number) => ({ ['--d' as never]: `${d}s` }) as CSSProperties
  return (
    <div className={`rv-splash ${out ? 'is-out' : ''}`} onClick={finish} role="presentation">
      <style>{SPLASH_CSS}</style>
      <div className="rv-splash-in">
        <svg className="rv-lotus" viewBox="0 0 64 40" aria-hidden="true">
          <g fill="none" stroke="#4c1d92" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round">
            <path d="M32 3.5C25.6 11.5 25.6 23.5 32 32.5C38.4 23.5 38.4 11.5 32 3.5Z" stroke="#c9a24b" strokeWidth="1.5" />
            <path d="M32 32.5C24.6 30.6 19.4 22.8 19.8 12.6C25.2 15.4 29.6 21.6 32 32.5Z" />
            <path d="M32 32.5C39.4 30.6 44.6 22.8 44.2 12.6C38.8 15.4 34.4 21.6 32 32.5Z" />
            <path d="M32 32.5C22.6 33.6 13.4 29 9 20.6C17.6 19.8 26.6 24.4 32 32.5Z" />
            <path d="M32 32.5C41.4 33.6 50.6 29 55 20.6C46.4 19.8 37.4 24.4 32 32.5Z" />
            <path d="M21.5 36.2Q32 39.4 42.5 36.2" stroke="#c9a24b" strokeWidth="1.5" />
          </g>
        </svg>
        <h1 className="rv-name rv-up" style={up(0.7)}>REVATHI HERBAL BEAUTY CARE</h1>
        <div className="rv-sub rv-up" style={up(1.2)}>BEAUTY &amp; SALON</div>
        <div className="rv-tag rv-up" style={up(1.6)}>Where Nature meets beauty</div>
        <div className="rv-rule" />
        <div className="rv-velvet rv-up" style={up(2.2)}>Beauty that feels like velvet</div>
        <div className="rv-women rv-up" style={up(3)}>EXCLUSIVELY FOR WOMEN</div>
        <div className="rv-cats rv-up" style={up(3.6)}>BEAUTY · SALON · BOUTIQUE</div>
      </div>
    </div>
  )
}

function Modal({ onDone }: { onDone: () => void }) {
  const [sel, setSel] = useState<UiLang>(getUiLang())
  const c = COPY[sel]
  const pick = (l: UiLang) => { setSel(l); setLang(l) }
  const sh = (k: string, fb: string) => { const v = authT(k, sel); return v === k ? fb : v }
  return (
    <div role="dialog" aria-modal="true" aria-label={c.title} style={{ position: 'fixed', inset: 0, zIndex: 2147483000, display: 'grid', placeItems: 'center', background: 'linear-gradient(160deg,#f4f0fc 0%,#f0e9fb 100%)', padding: 16, overflowY: 'auto' }}>
      <div style={{ width: 'min(480px,100%)', color: '#4c1d92', textAlign: 'center', fontFamily: 'inherit' }}>
        <Stepper
          step={1}
          theme="violetgold"
          accentColor="#4c1d92"
          width={480}
          radius={22}
          disableStepIndicators
          nextButtonText={c.cont}
          nextButtonProps={{ style: { boxShadow: '0 0 0 1px #c9a24b, 0 6px 14px -6px rgba(201,162,75,.8)' }, onClick: (e: React.MouseEvent) => { e.preventDefault(); onDone() } }}
          backButtonProps={{ style: { display: 'none' } }}
        >
          <Step title={sh('Language', 'Language')}>
            <div style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#a8812f', fontWeight: 500 }}>REVATHI HERBAL</div>
            <h2 style={{ margin: '10px 0 6px', fontSize: 24, fontWeight: 600 }}>{c.title}</h2>
            <p style={{ margin: '0 0 18px', fontSize: 14, opacity: .75 }}>{c.sub}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {LANGS.map((l) => (
                <button key={l.code} type="button" onClick={() => pick(l.code)} aria-pressed={sel === l.code}
                  style={{ padding: '13px 10px', borderRadius: 12, cursor: 'pointer', fontSize: 16, border: sel === l.code ? '2px solid #c9a24b' : '1px solid #ddd2fb', background: sel === l.code ? '#ddd2fb' : '#fff', boxShadow: sel === l.code ? '0 0 0 3px rgba(201,162,75,.22), 0 6px 16px -8px rgba(201,162,75,.8)' : 'none', color: 'inherit', fontWeight: sel === l.code ? 700 : 500 }}>
                  {NAMES[l.code]}
                </button>
              ))}
            </div>
          </Step>
          <Step title={sh('Mobile', 'Mobile')}><div /></Step>
          <Step title="OTP"><div /></Step>
          <Step title={sh('Name', 'Name')}><div /></Step>
        </Stepper>
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
  // 1) brand splash  2) language page  3) login / OTP  4) website
  const showLanguage = () => root.render(<Modal onDone={close} />)
  root.render(<Splash onDone={showLanguage} />)
}
