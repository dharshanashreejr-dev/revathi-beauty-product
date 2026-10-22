import { useEffect, useState } from 'react'
import Counter from './reactbits/Counter'

// "Book / pay within the time and get an extra discount" (React Bits Counter shows the minutes and seconds left).
// The window starts the first time the customer opens the checkout / booking page in this browser tab and is kept in
// sessionStorage, so a refresh does not restart it.
// BACKEND: the server must re-check the window and the percentage when it creates the order / booking (never trust the browser).
export const FLASH_PCT = 5
export const FLASH_MINUTES = 10

export function useFlashOffer(key: string, minutes = FLASH_MINUTES) {
  const k = `rhbc-flash-${key}`
  const [end] = useState(() => {
    try {
      const saved = Number(sessionStorage.getItem(k))
      if (saved) return saved
      const e = Date.now() + minutes * 60_000
      sessionStorage.setItem(k, String(e))
      return e
    } catch { return Date.now() + minutes * 60_000 }
  })
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i) }, [])
  const left = Math.max(0, Math.ceil((end - now) / 1000))
  return { left, active: left > 0, pct: FLASH_PCT, reset: () => { try { sessionStorage.removeItem(k) } catch { /* ignore */ } } }
}

export const flashAmount = (amount: number, active: boolean, pct = FLASH_PCT) => (active ? Math.round((amount * pct) / 100) : 0)

export function FlashBanner({ left, pct = FLASH_PCT, text, endedText, dark = false }: { left: number; pct?: number; text: string; endedText: string; dark?: boolean }) {
  const m = Math.floor(left / 60), s = left % 60
  const ink = dark ? '#f3e1b0' : '#7a5a1c'
  const digit = { fontSize: 26, fontWeight: 600, textColor: ink, minDigits: 2, intro: false, duration: 0.5, stagger: 0.02, fade: 0.2 } as const
  return (
    <div role="status" aria-live="off" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', padding: '12px 16px', borderRadius: 14, border: `1px solid ${dark ? 'rgba(201,163,91,.65)' : '#c9a35b'}`, background: dark ? 'rgba(201,163,91,.14)' : '#f9f0d9', color: ink, opacity: left > 0 ? 1 : 0.65 }}>
      <span style={{ fontSize: 13, lineHeight: 1.4, flex: '1 1 180px' }}>{left > 0 ? text.replace('{pct}', String(pct)) : endedText}</span>
      <span aria-label={`${m}:${String(s).padStart(2, '0')}`} style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, fontVariantNumeric: 'tabular-nums' }}>
        <Counter value={m} {...digit} /><span style={{ fontSize: 22, fontWeight: 600 }}>:</span><Counter value={s} {...digit} />
      </span>
    </div>
  )
}
