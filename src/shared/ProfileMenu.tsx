import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { api } from '../api'
import { SITE } from '../site-links'
import { authT } from './auth-text'
import type { UiLang } from './i18n'
import type { User } from '../api/auth'
import './profile-menu.css'

// Navbar profile button for a logged-in customer: tap it for a small menu with "View profile" and "Logout".
// Used by the shared navbar (products / services / about / tracking) and by the landing page navbar.

type LinkComp = ComponentType<{ to: string; className?: string; onClick?: () => void; children?: ReactNode; role?: string }>
const Plain: LinkComp = ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>

const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
)
const Chevron = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}><path d="m6 9 6 6 6-6" /></svg>
)

export const profileHref = () => SITE.tracking + '?tab=profile'

/** Signs the customer out. On pages that only make sense when logged in (tracking / account) it goes back to the home page. */
export function logoutCustomer() {
  api.auth.logout()
  const p = window.location.pathname
  if (p.startsWith('/track') || p.startsWith('/account')) window.location.assign(SITE.home)
}

export default function ProfileMenu({ user, ui, Link = Plain, className, nameClassName }: { user: User; ui: UiLang; Link?: LinkComp; className: string; nameClassName: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const who = authT('Hi, {name}', ui, { name: user.name.split(' ')[0] || user.phone.slice(-4) })
  useEffect(() => {
    if (!open) return undefined
    const down = (e: MouseEvent | TouchEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', down); document.addEventListener('touchstart', down); document.addEventListener('keydown', key)
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('touchstart', down); document.removeEventListener('keydown', key) }
  }, [open])
  return (
    <div className="pm" ref={ref}>
      <button type="button" className={className} aria-haspopup="menu" aria-expanded={open} aria-label={who} onClick={() => setOpen((o) => !o)}>
        <ProfileIcon /><span className={nameClassName}>{who}</span><Chevron open={open} />
      </button>
      {open && (
        <div className="pm-menu" role="menu">
          <div className="pm-head"><strong>{user.name || user.phone}</strong>{user.name && <small>{user.phone}</small>}</div>
          <Link to={profileHref()} className="pm-item" role="menuitem" onClick={() => setOpen(false)}>{authT('View profile', ui)}</Link>
          <button type="button" className="pm-item pm-logout" role="menuitem" onClick={() => { setOpen(false); logoutCustomer() }}>{authT('Logout', ui)}</button>
        </div>
      )}
    </div>
  )
}
