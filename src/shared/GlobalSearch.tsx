import { useEffect, useRef, useState } from 'react'
import { searchSite } from './searchIndex'
import './global-search.css'

// Search box for products + services. variant "nav" = navbar, "hero" = big bar under the navbar.
const SearchIcon = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)

export default function GlobalSearch({ variant = 'nav' }: { variant?: 'nav' | 'hero' }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [cur, setCur] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const hits = searchSite(q, variant === 'hero' ? 8 : 6)
  const go = (href: string) => { setOpen(false); window.location.href = href }

  useEffect(() => {
    const off = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', off)
    return () => document.removeEventListener('mousedown', off)
  }, [])
  useEffect(() => setCur(0), [q])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCur((c) => Math.min(c + 1, hits.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCur((c) => Math.max(c - 1, 0)) }
    else if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'Enter' && hits[cur]) go(hits[cur].href)
  }

  return (
    <div ref={box} className={`gs gs-${variant} ${open && q ? 'is-open' : ''}`} role="search">
      <div className="gs-box">
        <span className="gs-ico"><SearchIcon s={variant === 'hero' ? 22 : 17} /></span>
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={variant === 'hero' ? 'Search products & services — serums, facials, bridal makeup…' : 'Search…'}
          aria-label="Search products and services"
          autoComplete="off"
        />
        {variant === 'hero' && <button type="button" className="gs-go" onClick={() => hits[cur] ? go(hits[cur].href) : setOpen(true)}>Search</button>}
      </div>
      {open && q.trim() && (
        <ul className="gs-list">
          {hits.length ? hits.map((h, i) => (
            <li key={h.type + h.id}>
              <button type="button" className={i === cur ? 'is-cur' : ''} onMouseEnter={() => setCur(i)} onClick={() => go(h.href)}>
                <span className="gs-title">{h.title}</span>
                <span className="gs-meta"><em className={`gs-tag gs-${h.type}`}>{h.type === 'product' ? 'Product' : 'Service'}</em>{h.sub}</span>
                <span className="gs-price">{h.price}</span>
              </button>
            </li>
          )) : <li className="gs-empty">No products or services found for “{q}”</li>}
        </ul>
      )}
    </div>
  )
}
