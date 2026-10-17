import { createRoot } from 'react-dom/client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { api, type User } from '../api'
import { getUiLang, setLang, type UiLang } from './i18n'
import { authT } from './auth-text'

// Phone + SMS-OTP login popup (CRS 3.1). Mounted from every public entry point, like the language popup.
//   requireLogin(() => doCheckout())  -> runs the action now if logged in, otherwise opens the popup first.
//   useUser()                         -> current customer (or null), re-renders on login / logout.

let pending: (() => void) | null = null
let gateMode = false // true when shown as the full-page login right after the language page
const OPEN = 'rhbc-login-open'

export const useUser = (): User | null => useSyncExternalStore(api.auth.subscribe, api.auth.currentUser, () => null)
export function openLogin(then?: () => void, gate = false) { pending = then ?? null; gateMode = gate; window.dispatchEvent(new Event(OPEN)) }
export function requireLogin(then: () => void) { if (api.auth.currentUser()) then(); else openLogin(then) }

const mmss = (ms: number) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` }
const ERR = { expired: 'OTP expired. Please resend.', wrong: 'Wrong OTP. Please try again.', locked: 'Too many wrong attempts. Please resend the OTP.', none: 'OTP expired. Please resend.' } as const

const input: React.CSSProperties = { width: '100%', padding: '13px 14px', borderRadius: 12, border: '1px solid #c7d2aa', background: '#eef2e4', color: 'inherit', fontSize: 16, outline: 'none', boxSizing: 'border-box' }
const btn: React.CSSProperties = { width: '100%', padding: 13, borderRadius: 999, border: 0, cursor: 'pointer', background: '#262c1f', color: '#eaefde', fontSize: 15, letterSpacing: '.08em' }
const link: React.CSSProperties = { background: 'none', border: 0, cursor: 'pointer', color: '#5d6a3a', textDecoration: 'underline', fontSize: 13, padding: 4 }

function Modal({ onClose, onDone, gate }: { onClose: () => void; onDone: (u: User) => void; gate: boolean }) {
  const [lang, setL] = useState<UiLang>(getUiLang())
  useEffect(() => { const f = () => setL(getUiLang()); window.addEventListener('velvet-lang-change', f); return () => window.removeEventListener('velvet-lang-change', f) }, [])
  const t = (s: string, v?: Record<string, string | number>) => authT(s, lang, v)
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState(''), [code, setCode] = useState(''), [name, setName] = useState('')
  const [err, setErr] = useState(''), [demo, setDemo] = useState(''), [exp, setExp] = useState(0), [now, setNow] = useState(Date.now())
  const isNew = useRef(true)
  useEffect(() => { if (step !== 'otp') return; const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i) }, [step])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])

  const send = () => {
    const r = api.auth.requestOtp(phone)
    if (!r.ok) return setErr('Enter a valid 10-digit mobile number')
    isNew.current = api.auth.isNewUser(phone)
    setErr(''); setCode(''); setDemo(r.demoOtp ?? ''); setExp(r.expiresAt ?? 0); setNow(Date.now()); setStep('otp')
  }
  const verify = () => {
    const r = api.auth.verifyOtp(phone, code, name, lang)
    if (!r.ok) return setErr(ERR[r.error])
    if (r.user.lang && r.user.lang !== lang) setLang(r.user.lang as UiLang) // returning customer: restore their language
    else if (!r.user.lang) api.auth.updateProfile({ lang })
    onDone(r.user)
  }
  const left = exp - now

  return (
    <div role="dialog" aria-modal="true" aria-label={t('Login to continue')} onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 2147482000, display: 'grid', placeItems: 'center', background: gate ? 'linear-gradient(160deg,#e8edda 0%,#e1e7cf 100%)' : 'rgba(18, 20, 15,.62)', backdropFilter: gate ? undefined : 'blur(6px)', padding: 16 }}>
      <div style={{ position: 'relative', width: 'min(420px,100%)', background: '#eaefde', color: '#262c1f', borderRadius: 20, padding: '30px 26px', boxShadow: '0 30px 80px rgba(0,0,0,.35)', textAlign: 'center', fontFamily: 'inherit' }}>
        <button type="button" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 10, right: 14, background: 'none', border: 0, fontSize: 20, cursor: 'pointer', color: 'inherit', opacity: .6 }}>✕</button>
        <div style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', opacity: .7 }}>REVATHI HERBAL BEAUTY CARE</div>
        <h2 style={{ margin: '10px 0 6px', fontSize: 24, fontWeight: 600 }}>{t('Login to continue')}</h2>
        {step === 'phone' ? (
          <>
            <p style={{ margin: '0 0 18px', fontSize: 14, opacity: .75 }}>{t('Enter your mobile number. We will send a 6-digit OTP by SMS.')}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ ...input, width: 64, display: 'grid', placeItems: 'center', padding: 0 }}>+91</span>
              <input style={input} inputMode="numeric" autoFocus maxLength={10} placeholder={t('10-digit mobile number')} aria-label={t('10-digit mobile number')} value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErr('') }} onKeyDown={(e) => e.key === 'Enter' && send()} />
            </div>
            {err && <p role="alert" style={{ color: '#a33', fontSize: 13, margin: '10px 0 0' }}>{t(err)}</p>}
            <button type="button" style={{ ...btn, marginTop: 18 }} onClick={send}>{t('Send OTP')}</button>
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 14px', fontSize: 14, opacity: .75 }}>{t('Enter the 6-digit OTP sent to +91 {phone}', { phone })}</p>
            {demo && <p style={{ margin: '0 0 12px', padding: '8px 10px', borderRadius: 10, background: '#e3e9d3', fontSize: 13 }}>{t('Demo mode: your OTP is {otp}', { otp: demo })}</p>}
            <input style={{ ...input, textAlign: 'center', letterSpacing: '.5em', fontSize: 22 }} inputMode="numeric" autoFocus maxLength={6} aria-label="OTP" value={code}
              onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setErr('') }} onKeyDown={(e) => e.key === 'Enter' && code.length === 6 && verify()} />
            {isNew.current && <input style={{ ...input, marginTop: 10 }} placeholder={t('Your name (optional)')} aria-label={t('Your name (optional)')} value={name} onChange={(e) => setName(e.target.value)} />}
            <p style={{ fontSize: 12, opacity: .7, margin: '10px 0 0' }}>{left > 0 ? t('OTP valid for {time}', { time: mmss(left) }) : t(ERR.expired)}</p>
            {err && <p role="alert" style={{ color: '#a33', fontSize: 13, margin: '8px 0 0' }}>{t(err)}</p>}
            <button type="button" style={{ ...btn, marginTop: 16, opacity: code.length === 6 ? 1 : .55 }} disabled={code.length !== 6} onClick={verify}>{t('Verify & continue')}</button>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 14 }}>
              <button type="button" style={link} onClick={send}>{t('Resend OTP')}</button>
              <button type="button" style={link} onClick={() => { setStep('phone'); setErr('') }}>{t('Change number')}</button>
            </div>
          </>
        )}
        {gate && <button type="button" style={{ ...link, marginTop: 14 }} onClick={onClose}>{t('Skip for now')}</button>}
      </div>
    </div>
  )
}

function Host() {
  const [open, setOpen] = useState(false)
  const [gate, setGate] = useState(false)
  useEffect(() => { const f = () => { setGate(gateMode); setOpen(true) }; window.addEventListener(OPEN, f); return () => window.removeEventListener(OPEN, f) }, [])
  if (!open) return null
  const close = () => { pending = null; setOpen(false) }
  return <Modal gate={gate} onClose={close} onDone={() => { const p = pending; pending = null; setOpen(false); if (p) setTimeout(p, 0) }} />
}

export function mountLogin() {
  const host = document.createElement('div')
  document.body.appendChild(host)
  createRoot(host).render(<Host />)
}
