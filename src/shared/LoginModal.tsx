import { createRoot } from 'react-dom/client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { api, type User } from '../api'
import { getUiLang, setLang, type UiLang } from './i18n'
import { authT } from './auth-text'
import Stepper, { Step } from './reactbits/Stepper'

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

const input: React.CSSProperties = { width: '100%', padding: '13px 14px', borderRadius: 12, border: '1px solid #B8924F', background: '#FBEDEB', color: 'inherit', fontSize: 16, outline: 'none', boxSizing: 'border-box' }
const btn: React.CSSProperties = { width: '100%', padding: 13, borderRadius: 999, cursor: 'pointer', background: '#7A2E4D', color: '#E8D3A9', border: '1px solid #B8924F', fontSize: 15, letterSpacing: '.08em' }
const link: React.CSSProperties = { background: 'none', border: 0, cursor: 'pointer', color: '#7A2E4D', textDecoration: 'underline', fontSize: 13, padding: 4 }

function Modal({ onClose, onDone, gate }: { onClose: () => void; onDone: (u: User) => void; gate: boolean }) {
  const [lang, setL] = useState<UiLang>(getUiLang())
  useEffect(() => { const f = () => setL(getUiLang()); window.addEventListener('velvet-lang-change', f); return () => window.removeEventListener('velvet-lang-change', f) }, [])
  const t = (s: string, v?: Record<string, string | number>) => authT(s, lang, v)
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState(''), [code, setCode] = useState(''), [name, setName] = useState('')
  const [err, setErr] = useState(''), [demo, setDemo] = useState(''), [exp, setExp] = useState(0), [now, setNow] = useState(Date.now())
  const isNew = useRef(true)
  const [otpOk, setOtpOk] = useState(false)
  useEffect(() => { if (step !== 'otp') return; const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i) }, [step])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])

  const send = () => {
    const r = api.auth.requestOtp(phone)
    if (!r.ok) return setErr('Enter a valid 10-digit mobile number')
    isNew.current = api.auth.isNewUser(phone)
    setOtpOk(false); setErr(''); setCode(''); setDemo(r.demoOtp ?? ''); setExp(r.expiresAt ?? 0); setNow(Date.now()); setStep('otp')
  }
  const verify = () => {
    const r = api.auth.verifyOtp(phone, code, name, lang)
    if (!r.ok) { setOtpOk(false); return setErr(ERR[r.error]) }
    if (r.user.lang && r.user.lang !== lang) setLang(r.user.lang as UiLang) // returning customer: restore their language
    else if (!r.user.lang) api.auth.updateProfile({ lang })
    onDone(r.user)
  }
  const left = exp - now

  // Stepper: [Language] -> Mobile -> OTP -> Name. Language is already done when this popup is the full-page gate.
  const shown = (key: string, fb: string) => { const v = t(key); return v === key ? fb : v }
  const base = gate ? 2 : 1
  const at = (step === 'phone' ? 1 : otpOk ? 3 : 2) + (gate ? 1 : 0)
  const phoneStep = (
    <>
      <p style={{ margin: '0 0 14px', fontSize: 14, opacity: .75 }}>{t('Enter your mobile number. We will send a 6-digit OTP by SMS.')}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={{ ...input, width: 64, display: 'grid', placeItems: 'center', padding: 0 }}>+91</span>
        <input style={input} inputMode="numeric" autoFocus maxLength={10} placeholder={t('10-digit mobile number')} aria-label={t('10-digit mobile number')} value={phone}
          onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErr('') }} onKeyDown={(e) => e.key === 'Enter' && send()} />
      </div>
      {err && <p role="alert" style={{ color: '#a33', fontSize: 13, margin: '10px 0 0' }}>{t(err)}</p>}
    </>
  )
  const otpStep = (
    <>
      <p style={{ margin: '0 0 14px', fontSize: 14, opacity: .75 }}>{t('Enter the 6-digit OTP sent to +91 {phone}', { phone })}</p>
      {demo && <p style={{ margin: '0 0 12px', padding: '8px 10px', borderRadius: 10, background: '#FBEDEB', border: '1px solid #B8924F', fontSize: 13 }}>{t('Demo mode: your OTP is {otp}', { otp: demo })}</p>}
      <input style={{ ...input, textAlign: 'center', letterSpacing: '.5em', fontSize: 22 }} inputMode="numeric" autoFocus maxLength={6} aria-label="OTP" value={code}
        onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setErr('') }} onKeyDown={(e) => e.key === 'Enter' && code.length === 6 && goNext()} />
      <p style={{ fontSize: 12, opacity: .7, margin: '10px 0 0' }}>{left > 0 ? t('OTP valid for {time}', { time: mmss(left) }) : t(ERR.expired)}</p>
      {err && <p role="alert" style={{ color: '#a33', fontSize: 13, margin: '8px 0 0' }}>{t(err)}</p>}
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 14 }}>
        <button type="button" style={link} onClick={send}>{t('Resend OTP')}</button>
        <button type="button" style={link} onClick={() => { setStep('phone'); setOtpOk(false); setErr('') }}>{t('Change number')}</button>
      </div>
    </>
  )
  const nameStep = (
    <>
      <p style={{ margin: '0 0 14px', fontSize: 14, opacity: .75 }}>{shown('What should we call you?', 'What should we call you?')}</p>
      <input style={input} autoFocus placeholder={t('Your name (optional)')} aria-label={t('Your name (optional)')} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && verify()} />
    </>
  )

  // Continue button logic per step
  function goNext() {
    if (step === 'phone') return send()
    if (!otpOk) {
      if (code.length !== 6) return
      // returning customers have no name step: verify straight away
      if (!isNew.current) return verify()
      setOtpOk(true); setErr('')
      return
    }
    verify()
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={t('Login to continue')} onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 2147482000, display: 'grid', placeItems: 'center', background: gate ? 'linear-gradient(160deg,#FFFFFF 0%,#FBEDEB 100%)' : 'rgba(122,46,77, .62)', backdropFilter: gate ? undefined : 'blur(6px)', padding: 16, overflowY: 'auto' }}>
      <div style={{ position: 'relative', width: 'min(460px,100%)', color: '#7A2E4D', textAlign: 'center', fontFamily: 'inherit' }}>
        <button type="button" onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 10, right: 14, zIndex: 5, background: 'none', border: 0, fontSize: 20, cursor: 'pointer', color: 'inherit', opacity: .6 }}>✕</button>
        <Stepper
          step={at}
          theme="violetgold"
          accentColor="#7A2E4D"
          width={460}
          radius={22}
          indicator="numbers"
          disableStepIndicators
          nextButtonText={at === base + 2 || (at === base + 1 && !isNew.current) ? t('Verify & continue') : at === base ? t('Send OTP') : t('Continue')}
          backButtonText="Back"
          onStepChange={(n: number) => { if (n < at) { if (n === base) { setStep('phone'); setOtpOk(false) } else if (n === base + 1) setOtpOk(false); setErr('') } }}
          onFinalStepCompleted={() => {}}
          backButtonProps={{ style: gate && at === base ? { visibility: 'hidden' } : undefined, onClick: (e: React.MouseEvent) => {
            if (at === base) { e.preventDefault(); return }
            e.preventDefault()
            if (at === base + 1) { setStep('phone'); setOtpOk(false) } else setOtpOk(false)
            setErr('')
          } }}
          nextButtonProps={{ style: { boxShadow: '0 0 0 1px #B8924F, 0 6px 14px -6px rgba(184,146,79,.8)' }, disabled: (at === base + 1 && code.length !== 6) || (at === base && phone.length < 10), onClick: (e: React.MouseEvent) => { e.preventDefault(); goNext() } }}
          style={{ textAlign: 'center' }}
        >
          {gate && <Step title={shown('Language', 'Language')}><div style={{ padding: 8 }} /></Step>}
          <Step title={shown('Mobile', 'Mobile')}>
            <img src="/revathi-logo.svg" alt="Revathi Herbal Care" width={84} height={84} style={{ display: 'block', margin: '0 auto 10px', borderRadius: '50%' }} />
            <div style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8F6E36', fontWeight: 500 }}>REVATHI HERBAL BEAUTY CARE</div>
            <h2 style={{ margin: '10px 0 8px', fontSize: 22, fontWeight: 600 }}>{t('Login to continue')}</h2>
            {phoneStep}
          </Step>
          <Step title="OTP">
            <h2 style={{ margin: '4px 0 8px', fontSize: 22, fontWeight: 600 }}>OTP</h2>
            {otpStep}
          </Step>
          <Step title={shown('Name', 'Name')}>
            <h2 style={{ margin: '4px 0 8px', fontSize: 22, fontWeight: 600 }}>{shown('Name', 'Name')}</h2>
            {nameStep}
          </Step>
        </Stepper>
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
