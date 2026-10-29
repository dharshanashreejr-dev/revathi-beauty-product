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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@400;500&display=swap');
.rv-splash{position:fixed;inset:0;z-index:2147483100;display:grid;place-items:center;overflow:hidden;background:radial-gradient(ellipse at 50% 42%,#FFFFFF 0%,#FFFBF3 55%,#F7EEDC 100%);color:#7A2E4D;text-align:center;padding:24px;cursor:pointer;transition:opacity .7s ease,visibility 0s .7s}
.rv-splash::before{content:'';position:absolute;inset:18px;border:1px solid rgba(184,146,79,.6);pointer-events:none}
.rv-splash::after{content:'';position:absolute;inset:27px;border:1px solid rgba(184,146,79,.28);pointer-events:none}
.rv-splash.is-out{opacity:0;visibility:hidden;pointer-events:none}
.rv-splash-in{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.rv-glow{position:absolute;left:50%;top:44%;width:min(80vw,760px);height:min(80vw,760px);transform:translate(-50%,-50%) scale(.6);border-radius:50%;background:radial-gradient(circle,rgba(201,138,20,.22) 0%,rgba(201,138,20,.08) 40%,transparent 68%);opacity:0;animation:rvGlow 2.4s .2s ease-out forwards,rvBreath 4.5s 2.6s ease-in-out infinite}
.rv-dust{position:absolute;inset:0;z-index:1;pointer-events:none}
.rv-dust i{position:absolute;bottom:-12px;width:6px;height:6px;border-radius:50%;background:radial-gradient(circle,#E8C77A,#B8924F);opacity:0;animation:rvRise var(--t,7s) var(--d,0s) ease-in infinite}
.rv-logo-wrap{position:relative;width:clamp(200px,min(40vw,43vh),440px);aspect-ratio:1/1;display:grid;place-items:center}
.rv-logo-clip{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;box-shadow:0 18px 60px rgba(143,110,54,.30);clip-path:circle(0% at 50% 50%);animation:rvReveal 1.5s .15s cubic-bezier(.2,.75,.2,1) forwards,rvFloat 6s 2s ease-in-out infinite}
.rv-splash-logo{display:block;width:100%;height:100%;object-fit:cover;transform:scale(.85);animation:rvZoom 1.7s .15s cubic-bezier(.2,.75,.2,1) forwards}
.rv-logo-clip::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 38%,rgba(255,255,255,.75) 50%,transparent 62%);transform:translateX(-120%);animation:rvSheen 3.4s 1.9s ease-in-out infinite}
.rv-ring{position:absolute;inset:-14px;width:calc(100% + 28px);height:calc(100% + 28px);transform:rotate(-90deg);pointer-events:none}
.rv-ring circle{fill:none;stroke:#B8924F;stroke-width:.5;stroke-linecap:round;stroke-dasharray:308;stroke-dashoffset:308;animation:rvDraw 2.2s .5s ease forwards}
.rv-ring circle+circle{stroke:rgba(184,146,79,.35);stroke-dasharray:3 5;stroke-dashoffset:0;animation:rvSpin 40s linear infinite;transform-origin:50% 50%}
.rv-quote{margin-top:clamp(22px,4vh,40px);font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(22px,3.6vw,44px);letter-spacing:.14em;line-height:1.2;display:flex;flex-wrap:wrap;justify-content:center;gap:0 .4em}
.rv-word{display:inline-block;overflow:hidden;padding:.12em .02em .18em;margin:-.12em 0 -.18em}
.rv-word span{display:inline-block;transform:translateY(115%);opacity:0;background:linear-gradient(100deg,#7A2E4D 0%,#8F6E36 30%,#C98A14 48%,#8F6E36 66%,#7A2E4D 100%);background-size:240% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:rvWord .9s var(--d,0s) cubic-bezier(.2,.7,.2,1) forwards,rvShine 5s 3.2s linear infinite}
.rv-orn{display:flex;align-items:center;gap:12px;margin-top:clamp(16px,3vh,28px);opacity:0;animation:rvFade 1s 3s ease forwards}
.rv-orn b{display:block;width:0;height:1px;background:linear-gradient(90deg,transparent,#B8924F);animation:rvLine 1.2s 3s ease forwards}
.rv-orn b+i+b{background:linear-gradient(90deg,#B8924F,transparent)}
.rv-orn i{width:7px;height:7px;background:#B8924F;transform:rotate(45deg)}
.rv-women{margin-top:clamp(14px,2.6vh,24px);padding:9px 22px;border-top:1px solid #B8924F;border-bottom:1px solid #B8924F;font-family:'Jost',system-ui,sans-serif;font-weight:500;font-size:clamp(11px,1.3vw,15px);letter-spacing:.42em;text-indent:.42em;color:#7A2E4D;opacity:0;transform:translateY(12px);animation:rvUp .9s 3.3s cubic-bezier(.2,.7,.2,1) forwards}
.rv-start{margin-top:clamp(18px,3.4vh,32px);padding:15px 40px;border:0;border-radius:999px;cursor:pointer;background:linear-gradient(135deg,#7A2E4D,#963f55);color:#fff;font-family:'Jost',system-ui,sans-serif;font-weight:500;font-size:clamp(12px,1.2vw,14px);letter-spacing:.28em;text-indent:.28em;text-transform:uppercase;box-shadow:0 10px 28px -8px rgba(122,46,77,.65);opacity:0;transform:translateY(12px);animation:rvUp .9s 3.9s cubic-bezier(.2,.7,.2,1) forwards;transition:transform .25s,box-shadow .25s}
.rv-start:hover{transform:translateY(-2px);box-shadow:0 14px 34px -8px rgba(122,46,77,.8)}
@keyframes rvUp{to{opacity:1;transform:none}}
.rv-bar{position:absolute;left:50%;bottom:44px;width:min(220px,50vw);height:2px;transform:translateX(-50%);background:rgba(184,146,79,.25);overflow:hidden;z-index:2}
.rv-bar i{display:block;height:100%;width:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#B8924F,#E8C77A);animation:rvBar var(--ms,4.8s) linear forwards}
@keyframes rvReveal{to{clip-path:circle(75% at 50% 50%)}}
@keyframes rvZoom{to{transform:scale(1)}}
@keyframes rvFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes rvSheen{0%{transform:translateX(-120%)}55%,100%{transform:translateX(120%)}}
@keyframes rvDraw{to{stroke-dashoffset:0}}
@keyframes rvSpin{to{transform:rotate(360deg)}}
@keyframes rvGlow{to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes rvBreath{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.08)}}
@keyframes rvRise{0%{opacity:0;transform:translateY(0) scale(.6)}15%{opacity:.9}100%{opacity:0;transform:translateY(-105vh) translateX(var(--x,0px)) scale(1.1)}}
@keyframes rvWord{to{transform:none;opacity:1}}
@keyframes rvShine{to{background-position:-240% 0}}
@keyframes rvFade{to{opacity:1}}
@keyframes rvLine{to{width:clamp(50px,9vw,110px)}}
@keyframes rvBar{to{transform:scaleX(1)}}
@media (prefers-reduced-motion:reduce){.rv-logo-clip,.rv-splash-logo,.rv-glow,.rv-ring circle,.rv-orn,.rv-orn b,.rv-word span,.rv-logo-clip::after,.rv-women,.rv-start,.rv-dust i{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}.rv-dust{display:none}}
`

const QUOTE = 'Where Nature meets beauty'.split(' ')
const DUST = [8, 17, 26, 35, 44, 53, 62, 71, 80, 89, 13, 48, 76, 92]

/** First page: the Revathi logo at full size, the quote below it, gold glow, ring, sheen and floating dust. */
function Splash({ onDone }: { onDone: () => void }) {
  const [out, setOut] = useState(false)
  const finish = () => { if (out) return; setOut(true); setTimeout(onDone, 600) }
  return (
    <div className={`rv-splash ${out ? 'is-out' : ''}`} onClick={finish} role="presentation">
      <style>{SPLASH_CSS}</style>
      <div className="rv-glow" />
      <div className="rv-dust" aria-hidden="true">
        {DUST.map((x, i) => <i key={i} style={{ left: `${x}%`, ['--d' as never]: `${(i * 0.55) % 5}s`, ['--t' as never]: `${6 + (i % 4)}s`, ['--x' as never]: `${(i % 2 ? 1 : -1) * (12 + (i % 5) * 7)}px` } as CSSProperties} />)}
      </div>
      <div className="rv-splash-in">
        <div className="rv-logo-wrap">
          <svg className="rv-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" /><circle cx="50" cy="50" r="49.6" /></svg>
          <div className="rv-logo-clip">
            <img className="rv-splash-logo" src="/revathi-logo.svg" alt="Revathi Herbal Care" />
          </div>
        </div>
        <div className="rv-quote" aria-label="Where Nature meets beauty">
          {QUOTE.map((w, i) => <span className="rv-word" key={i} aria-hidden="true"><span style={{ ['--d' as never]: `${1.7 + i * 0.28}s` } as CSSProperties}>{w}</span></span>)}
        </div>
        <div className="rv-orn" aria-hidden="true"><b /><i /><b /></div>
        <div className="rv-women">EXCLUSIVELY FOR WOMEN</div>
        <button type="button" className="rv-start" onClick={(e) => { e.stopPropagation(); finish() }}>Get started</button>
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
    <div role="dialog" aria-modal="true" aria-label={c.title} style={{ position: 'fixed', inset: 0, zIndex: 2147483000, display: 'grid', placeItems: 'center', background: 'linear-gradient(160deg,#FFFFFF 0%,#FBEDEB 100%)', padding: 16, overflowY: 'auto' }}>
      <div style={{ width: 'min(480px,100%)', color: '#7A2E4D', textAlign: 'center', fontFamily: 'inherit' }}>
        <Stepper
          step={1}
          theme="violetgold"
          accentColor="#7A2E4D"
          width={480}
          radius={22}
          disableStepIndicators
          nextButtonText={c.cont}
          nextButtonProps={{ style: { boxShadow: '0 0 0 1px #B8924F, 0 6px 14px -6px rgba(184,146,79,.8)' }, onClick: (e: React.MouseEvent) => { e.preventDefault(); onDone() } }}
          backButtonProps={{ style: { display: 'none' } }}
        >
          <Step title={sh('Language', 'Language')}>
            <div style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8F6E36', fontWeight: 500 }}>REVATHI HERBAL</div>
            <h2 style={{ margin: '10px 0 6px', fontSize: 24, fontWeight: 600 }}>{c.title}</h2>
            <p style={{ margin: '0 0 18px', fontSize: 14, opacity: .75 }}>{c.sub}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {LANGS.map((l) => (
                <button key={l.code} type="button" onClick={() => pick(l.code)} aria-pressed={sel === l.code}
                  style={{ padding: '13px 10px', borderRadius: 12, cursor: 'pointer', fontSize: 16, border: sel === l.code ? '2px solid #B8924F' : '1px solid #FBEDEB', background: sel === l.code ? '#FBEDEB' : '#fff', boxShadow: sel === l.code ? '0 0 0 3px rgba(184,146,79,.22), 0 6px 16px -8px rgba(184,146,79,.8)' : 'none', color: 'inherit', fontWeight: sel === l.code ? 700 : 500 }}>
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
