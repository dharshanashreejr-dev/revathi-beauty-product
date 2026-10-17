import { useEffect, useState, type ElementType } from 'react'
import { createPortal } from 'react-dom'
import { liveOffers, validateCoupon, type OfferView, type CouponResult } from '../api/offers'
import { useUiLang, type UiLang } from './i18n'
import { authT } from './auth-text'
import { useUser } from './LoginModal'
import './offers.css'

// Offer badges + popup (service cards, product cards) and the coupon picker (booking page, checkout).
// All data comes from Admin > Festival & Offers through api/offers.ts liveOffers(): paused / expired offers vanish by themselves.
// BACKEND: the server re-checks every code when the booking / order is created, so this is display only.

type Scope = 'services' | 'products'
export interface OfferCta { label: string; to: (o: OfferView) => string; Link?: ElementType }

const TagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.2" /></svg>
)

/** Live offers for a scope, each with the result of checking it for the current customer. Re-checks on login / logout / admin changes. */
export function useOffers(scope: Scope, subtotal: number): { o: OfferView; r: CouponResult }[] {
  useUser()
  const [, tick] = useState(0)
  useEffect(() => {
    const on = () => tick((n) => n + 1)
    window.addEventListener('storage', on)
    return () => window.removeEventListener('storage', on)
  }, [])
  return liveOffers(scope).map((o) => ({ o, r: validateCoupon(o.code, subtotal, scope) }))
}
/** Cards only show offers the customer can actually use (or could after logging in). */
const usable = (r: CouponResult) => r.ok || r.reason === 'login' || r.reason === 'min'

const head = (o: OfferView, ui: UiLang) => (o.type === 'percent' ? `${o.value}% OFF` : authT('Free delivery', ui).toUpperCase())
const dateText = (iso: string, ui: UiLang) => new Date(`${iso}T00:00:00`).toLocaleDateString(ui === 'en' ? 'en-IN' : `${ui}-IN`, { day: 'numeric', month: 'short', year: 'numeric' })
const until = (o: OfferView, ui: UiLang, verb: 'Book by' | 'Offer till') =>
  o.daysLeft <= 0 ? authT('Ends today', ui) : o.daysLeft <= 14 ? authT('Ends in {n} days', ui, { n: o.daysLeft }) : authT(verb === 'Book by' ? 'Book by {date}' : 'Offer till {date}', ui, { date: dateText(o.end, ui) })

function OfferPopup({ list, scope, cta, onClose }: { list: { o: OfferView; r: CouponResult }[]; scope: Scope; cta?: OfferCta; onClose: () => void }) {
  const [ui] = useUiLang()
  const [copied, setCopied] = useState('')
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', key)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [onClose])
  const copy = (code: string) => {
    try { void navigator.clipboard?.writeText(code) } catch { /* ignore */ }
    setCopied(code); window.setTimeout(() => setCopied(''), 1800)
  }
  const Link = cta?.Link ?? 'a'
  return createPortal(
    <div className="of-overlay" onClick={(e) => { e.stopPropagation(); onClose() }} role="dialog" aria-modal="true" aria-label={authT('Available offers', ui)}>
      <div className="of-panel" onClick={(e) => e.stopPropagation()}>
        <div className="of-head"><h3>{authT('Available offers', ui)}</h3><button type="button" className="of-x" onClick={onClose} aria-label="Close">&times;</button></div>
        {list.map(({ o, r }) => (
          <div className="of-card" key={o.id}>
            <span className="of-badge">{head(o, ui)}</span>
            <h4>{o.title}</h4>
            {o.desc && <p>{o.desc}</p>}
            <span className="of-valid">{authT('Valid till {date}', ui, { date: dateText(o.end, ui) })}</span>
            <div className="of-code"><code>{o.code}</code><button type="button" className="of-copy" onClick={() => copy(o.code)}>{copied === o.code ? authT('Copied', ui) : authT('Copy code', ui)}</button></div>
            {!r.ok && r.reason === 'login' && <p className="of-note">{authT('Login to use this offer', ui)}</p>}
            {cta
              ? <Link {...(cta.Link ? { to: cta.to(o) } : { href: cta.to(o) })} className="of-cta" onClick={onClose}>{cta.label}</Link>
              : scope === 'products' && <p className="of-note" style={{ color: 'inherit', opacity: .7 }}>{authT('Use at checkout', ui)}</p>}
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}

/** One-line offer badge for a card ("10% OFF  Book by 31 Dec 2026  +2 more offers"). Tap it for details, code and booking link. */
export function OfferStrip({ scope, subtotal, verb = 'Offer till', cta, dark = false }: { scope: Scope; subtotal: number; verb?: 'Book by' | 'Offer till'; cta?: OfferCta; dark?: boolean }) {
  const [ui] = useUiLang()
  const [open, setOpen] = useState(false)
  const list = useOffers(scope, subtotal).filter((x) => usable(x.r))
  if (!list.length) return null
  const top = list[0].o
  return (
    <div className={`of-strip ${dark ? 'is-dark' : ''}`} onClick={(e) => e.stopPropagation()}>
      <button type="button" className="of-pill" onClick={(e) => { e.stopPropagation(); setOpen(true) }} aria-haspopup="dialog">
        <TagIcon /><b>{head(top, ui)}</b><span>{until(top, ui, verb)}</span>
        {list.length > 1 && <em>{authT('+{n} more offers', ui, { n: list.length - 1 })}</em>}
      </button>
      {open && <OfferPopup list={list} scope={scope} cta={cta} onClose={() => setOpen(false)} />}
    </div>
  )
}

/** Coupons shown automatically on the booking page / checkout. Tap one to apply it. */
export function CouponPicker({ scope, subtotal, applied, onApply, reasonText, fmt }: {
  scope: Scope; subtotal: number; applied: string; onApply: (code: string) => void; reasonText: (reason: string) => string; fmt: (n: number) => string
}) {
  const [ui] = useUiLang()
  const list = useOffers(scope, subtotal)
  if (!list.length) return null
  return (
    <div className="of-picker">
      <span className="of-picker-title">{authT('Coupons for you', ui)}</span>
      {list.map(({ o, r }) => {
        const can = r.ok || (!r.ok && r.reason === 'login')
        const on = applied === o.code
        return (
          <button type="button" key={o.id} className={`of-row ${on ? 'is-applied' : ''}`} disabled={!can || on} onClick={() => onApply(o.code)}>
            <span><span className="of-rc">{o.code}</span><span className="of-rt">{o.title}</span></span>
            <span className="of-ra">
              {on ? authT('Applied', ui) : r.ok ? (r.freeShip ? authT('Tap to apply', ui) : authT('Save {amount}', ui, { amount: fmt(r.discount) })) : r.reason === 'login' ? authT('Login to use this offer', ui) : reasonText(r.reason)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
