import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { SITE } from '../site-links'
import { LANGS, NAV_LANG_NAMES, useLang, useUiLang, type UiLang } from './i18n'
import { NAV_EXTRA } from './i18n-nav-extra'
import { NAV_LABELS as LABELS } from './i18n-nav'
import { openLogin, useUser } from './LoginModal'
import { authT } from './auth-text'
import { reviewNav } from './i18n-reviews'
import ProfileMenu, { logoutCustomer, profileHref } from './ProfileMenu'
import './site-header.css'

// ONE navbar for the whole website (same look as the landing page).
// Used by the Products page and the Services / About / Tracking pages.

export type NavLinkComp = ComponentType<{ to: string; className?: string; onClick?: () => void; children?: ReactNode; 'aria-current'?: 'page' }>

const PlainLink: NavLinkComp = ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>

const LEFT: [string, string][] = [['Products', SITE.products], ['Services', SITE.services]]
const RIGHT_BASE: [string, string][] = [['About', SITE.about], ['Tracking', SITE.tracking]]
const menuFor = (right: [string, string][]): [string, string][] => [['Home', SITE.home], ...LEFT, ...right]


const BagIcon = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
)

const savedBagCount = () => {
  try {
    const s = JSON.parse(localStorage.getItem('velvet-bag') || '{}') as Record<string, unknown>
    return Object.values(s).reduce<number>((n, q) => n + (Number(q) > 0 ? Number(q) : 0), 0)
  } catch { return 0 }
}

type Props = {
  Link?: NavLinkComp
  /** Which top-level link is the current page: 'Products' | 'Services' | 'About' | 'Tracking' */
  current?: string
  /** Number in the cart. If omitted, the bag saved on this device is used. */
  cartCount?: number
  /** Click on the cart. If omitted, the cart icon opens the Products page. */
  onCart?: () => void
  /** Always show the solid dark bar (for pages that start with plain content). */
  solid?: boolean
}

export default function SiteHeader({ Link = PlainLink, current, cartCount, onCart, solid = false }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(0)
  const [lang, setLang] = useLang()
  const [ui] = useUiLang()
  const user = useUser()
  const reviewKey = user ? 'Reviews' : 'Testimonials'
  const RIGHT: [string, string][] = [...RIGHT_BASE, [reviewKey, SITE.reviews]]
  const L: Record<string, string> = { ...LABELS[lang], ...(NAV_EXTRA[ui] ?? {}), [reviewKey]: reviewNav(ui, !!user) }
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setSaved(savedBagCount()) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' ; return () => { document.body.style.overflow = '' } }, [open])
  const count = cartCount ?? saved
  const item = ([t, to]: [string, string]) => (
    <Link key={t} to={to} className={current === t || (current === 'Reviews' && t === 'Testimonials') ? 'is-current' : ''} aria-current={current === t ? 'page' : undefined}>{L[t] ?? t}</Link>
  )
  return (
    <>
      <header className={`vt-header ${scrolled || solid ? 'is-solid' : ''}`}>
        <nav className="vt-nav vt-left" aria-label={L.SitePages}>{LEFT.map(item)}</nav>
        <button className="vt-icon vt-burger" aria-label={L.Menu} onClick={() => setOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
        <Link to={SITE.home} className="vt-brand" aria-label={L.HomeLink}>
          <span className="vt-word">REVATHI HERBAL CARE</span>
          <span className="vt-tagline">{L.BrandTagline ?? 'Where Nature meets beauty'}</span>
        </Link>
        <div className="vt-rightwrap">
        <nav className="vt-nav vt-right" aria-label={L.SitePages}>{RIGHT.map(item)}</nav>
        <div className="vt-tools">
          <select className="vt-lang" value={ui} onChange={(e) => setLang(e.target.value as UiLang)} aria-label={L.Language}>
            {LANGS.map((l) => <option key={l.code} value={l.code}>{NAV_LANG_NAMES[l.code]}</option>)}
          </select>
          {onCart
            ? <button className="vt-bag" onClick={onCart} aria-label={`${L.Cart} (${count})`}><BagIcon /><span>({count})</span></button>
            : <Link to={SITE.products} className="vt-bag" aria-label={`${L.Cart} (${count})`}><BagIcon /><span>({count})</span></Link>}
          {user
            ? <ProfileMenu user={user} ui={ui} Link={Link} className="vt-admin vt-profile" nameClassName="vt-profile-name" />
            : <button type="button" className="vt-admin vt-profile" onClick={() => openLogin()} aria-label={authT('Login', ui)}><ProfileIcon /><span className="vt-profile-name">{authT('Login', ui)}</span></button>}
        </div>
        </div>
      </header>
      <div className={`vt-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button className="vt-close" onClick={() => setOpen(false)} aria-label={L.Close}>✕</button>
        <nav aria-label={L.MenuNav}>
          {menuFor(RIGHT).map(([t, to]) => <Link key={t} to={to} onClick={() => setOpen(false)}>{L[t] ?? t}</Link>)}
          {user
            ? <>
                <Link to={profileHref()} onClick={() => setOpen(false)}>{authT('View profile', ui)}</Link>
                <a href="#" onClick={(e) => { e.preventDefault(); setOpen(false); logoutCustomer() }}>{authT('Logout', ui)}</a>
              </>
            : <a href="#" onClick={(e) => { e.preventDefault(); setOpen(false); openLogin() }}>{authT('Login', ui)}</a>}
          <select className="vt-lang vt-lang-menu" value={ui} onChange={(e) => setLang(e.target.value as UiLang)} aria-label={L.Language}>
            {LANGS.map((l) => <option key={l.code} value={l.code}>{NAV_LANG_NAMES[l.code]}</option>)}
          </select>
        </nav>
      </div>
    </>
  )
}
