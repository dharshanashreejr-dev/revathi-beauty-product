import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { searchSite, type SearchHit } from './searchIndex'
import { useUiLang } from './i18n'
import { content, type ContentLang } from '../landing/content'
import './global-search.css'

// ONE search for the whole website — every page opens the SAME full-screen "What speaks to you?"
// panel the landing page has. Results are TEXT ONLY (no images): products, services and pages.
// variant "nav" = round icon in the navbar, "hero" = bar inside the mobile menu. Both open the panel.

const SearchIcon = ({ s = 18 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
)
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
)

const BRAND = 'REVATHI HERBAL BEAUTY CARE'
const TYPE_LABEL: Record<SearchHit['type'], string> = { product: 'Product', service: 'Service', page: 'Page' }

// shown before anything is typed: the main pages
const defaults = (): SearchHit[] => {
  const seen = new Set<string>()
  const out: SearchHit[] = []
  for (const k of ['products', 'services', 'booking', 'about', 'tracking', 'reviews']) {
    for (const h of searchSite(k, 4)) {
      const key = h.type + h.id
      if (h.type === 'page' && !seen.has(key)) { seen.add(key); out.push(h) }
    }
  }
  return out.slice(0, 7)
}

const CSS = `
.gsp-overlay{position:fixed;inset:0;z-index:100000;display:flex;align-items:flex-start;justify-content:center;padding:28px 86px;background:rgba(76,29,149,.28);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);animation:gspFade .2s ease}
.gsp-panel{position:relative;width:100%;max-width:1230px;max-height:calc(100vh - 56px);overflow:auto;background:#f6f1ff;color:#4c1d95;border-radius:28px;padding:65px 65px 55px;box-sizing:border-box;box-shadow:0 30px 80px rgba(76,29,149,.28);font-family:'Jost',system-ui,sans-serif;text-transform:none;letter-spacing:normal;text-shadow:none;animation:gspRise .25s ease}
.gsp-close{position:absolute;top:20px;right:20px;width:46px;height:46px;border-radius:50%;border:0;background:#fff;color:#4c1d95;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 14px rgba(76,29,149,.15)}
.gsp-close:hover{background:#ece3ff}
.gsp-eyebrow{display:block;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#4c1d95}
.gsp-panel h2{font-family:var(--serif,'Cormorant Garamond',Georgia,serif);font-weight:400;font-size:48px;letter-spacing:-.035em;line-height:1;margin:23px 0 30px;color:#4c1d95}
.gsp-input{display:flex;align-items:center;gap:14px;padding:10px 22px;border:2px solid #c9a24a;border-radius:999px;background:linear-gradient(135deg,#fffbf0,#fbf1d4);box-shadow:0 8px 24px rgba(154,116,36,.18);transition:box-shadow .2s,border-color .2s}
.gsp-input:focus-within{border-color:#9a7424;box-shadow:0 0 0 4px rgba(201,162,74,.3),0 10px 28px rgba(154,116,36,.25)}
.gsp-input>svg{color:#9a7424;flex:none}
.gsp-input input{min-width:0;width:100%;border:0;outline:0;background:none;font:inherit;font-size:24px;padding:8px;color:#4a3610}
.gsp-input input::placeholder{color:#a88a45}
.gsp-results{padding-top:25px}
.gsp-results>button.is-cur strong{color:#8a641a}
.gsp-results>button{display:flex;gap:25px;width:100%;padding:18px 0;text-align:left;border:0;border-bottom:1px solid #4c1d951c;background:transparent;color:inherit;font:inherit;cursor:pointer;align-items:center}
.gsp-results>button.is-cur{background:linear-gradient(90deg,#f8efd6,transparent)}
.gsp-results>button>span{flex:1;min-width:0}
.gsp-results strong{display:block;font-family:var(--serif,'Cormorant Garamond',Georgia,serif);font-size:26px;font-weight:400;color:#4c1d95}
.gsp-results small{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px;margin-top:7px;color:#6b55a3}
.gsp-tag{font-style:normal;font-size:10px;text-transform:uppercase;letter-spacing:.08em;padding:2px 9px;border-radius:999px;background:#e3d8fb;color:#4c1d95}
.gsp-tag.gsp-service{background:#fde8f4;color:#a21c6e}
.gsp-tag.gsp-product{background:#f6e9c2;color:#7a5a1c}
.gsp-results>button svg{flex:none;color:#4c1d95}
.gsp-empty{padding:18px 0;font-size:15px;color:#6b55a3}
@keyframes gspFade{from{opacity:0}to{opacity:1}}
@keyframes gspRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media(max-width:900px){.gsp-overlay{padding:12px}.gsp-panel{padding:56px 24px 32px;border-radius:22px;max-height:calc(100vh - 24px)}.gsp-panel h2{font-size:34px}.gsp-input input{font-size:18px}.gsp-results strong{font-size:21px}.gsp-close{top:12px;right:12px;width:40px;height:40px}}
/* mobile-menu trigger bar */
.gs-hero .gs-box{cursor:pointer}
.gs-hero .gs-fake{flex:1;text-align:left;font-size:15px;color:#a88a45;background:none;border:0;font-family:inherit;padding:12px 0;cursor:pointer}
`

export default function GlobalSearch({ variant = 'nav' }: { variant?: 'nav' | 'hero' }) {
  const [ui] = useUiLang()
  const t = (content[ui as ContentLang] ?? content.en) as typeof content.en
  const [openPanel, setOpenPanel] = useState(false)
  const [q, setQ] = useState('')
  const [cur, setCur] = useState(0)
  const inp = useRef<HTMLInputElement>(null)

  const hits = useMemo(() => (q.trim() ? searchSite(q, 14) : openPanel ? defaults() : []), [q, openPanel])
  const go = (href: string) => { setOpenPanel(false); window.location.href = href }
  const close = () => { setOpenPanel(false); setQ('') }

  useEffect(() => setCur(0), [q])
  useEffect(() => {
    if (!openPanel) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => inp.current?.focus(), 30)
    return () => { document.body.style.overflow = prev }
  }, [openPanel])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCur((c) => Math.min(c + 1, hits.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCur((c) => Math.max(c - 1, 0)) }
    else if (e.key === 'Escape') close()
    else if (e.key === 'Enter' && hits[cur]) { e.preventDefault(); go(hits[cur].href) }
  }

  const panel = openPanel && createPortal(
    <div className="gsp-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }} onKeyDown={(e) => { if (e.key === 'Escape') close() }}>
      <style>{CSS}</style>
      <div className="gsp-panel" role="dialog" aria-modal="true" aria-label={t.searchTitle} data-lenis-prevent>
        <button type="button" className="gsp-close" onClick={close} aria-label="Close"><CloseIcon /></button>
        <span className="gsp-eyebrow">{BRAND}</span>
        <h2>{t.searchTitle}</h2>
        <div className="gsp-input">
          <SearchIcon s={24} />
          <input ref={inp} type="search" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder={t.searchPlaceholder} aria-label={t.searchPlaceholder} autoComplete="off" />
        </div>
        <div className="gsp-results">
          {hits.length ? hits.map((h, i) => (
            <button key={h.type + h.id} type="button" className={i === cur ? 'is-cur' : ''} onMouseEnter={() => setCur(i)} onClick={() => go(h.href)}>
              <span>
                <strong>{h.title}</strong>
                <small><em className={`gsp-tag gsp-${h.type}`}>{TYPE_LABEL[h.type]}</em>{h.sub}{h.price ? ` · ${h.price}` : ''}</small>
              </span>
              <PlusIcon />
            </button>
          )) : q.trim() ? <p className="gsp-empty">{t.searchEmpty}</p> : null}
        </div>
      </div>
    </div>,
    document.body,
  )

  return (
    <div className={`gs gs-${variant}`} role="search">
      {variant === 'nav' ? (
        <button type="button" className="gs-box" onClick={() => setOpenPanel(true)} aria-label={t.searchTitle} aria-haspopup="dialog">
          <span className="gs-ico"><SearchIcon s={17} /></span>
        </button>
      ) : (
        <div className="gs-box" onClick={() => setOpenPanel(true)}>
          <span className="gs-ico"><SearchIcon s={22} /></span>
          <button type="button" className="gs-fake">{t.searchPlaceholder}</button>
        </div>
      )}
      {panel}
    </div>
  )
}
