import { useEffect, useRef, useState, type ReactNode, type PointerEvent as RPE } from 'react'
import { useI18n } from '../i18n-site'

/** Mouse-tracking 3D tilt with moving glare. */
export function Tilt({ children, className = '', max = 10, scale = 1.03 }: { children: ReactNode; className?: string; max?: number; scale?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const gl = useRef<HTMLSpanElement>(null)
  const move = (e: RPE<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg) scale3d(${scale},${scale},${scale})`
    if (gl.current) { gl.current.style.opacity = '1'; gl.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.25), transparent 55%)` }
  }
  const leave = () => { if (ref.current) ref.current.style.transform = ''; if (gl.current) gl.current.style.opacity = '0' }
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ transformStyle: 'preserve-3d' }} className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}>
      {children}<span ref={gl} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
    </div>
  )
}

export function useWidth() {
  const [w, setW] = useState(typeof window === 'undefined' ? 1200 : window.innerWidth)
  useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return w
}

export interface RingItem { img: string; title: string; sub: string }
/** Auto-rotating, draggable 3D carousel ring made of photo cards. */
export function Ring3D({ items, onPick }: { items: RingItem[]; onPick?: (i: number) => void }) {
  const w = useWidth()
  const cw = w < 640 ? 150 : w < 1024 ? 190 : 230, ch = Math.round(cw * 1.38)
  const radius = Math.round((cw / 2) / Math.tan(Math.PI / items.length)) + 30
  const stage = useRef<HTMLDivElement>(null)
  const st = useRef({ a: 0, v: 0, down: false, x: 0, moved: 0, idx: -1 })
  useEffect(() => {
    let raf = 0
    const loop = () => {
      const s = st.current
      if (!s.down) { s.v *= 0.95; s.a += s.v + 0.12 }
      if (stage.current) stage.current.style.transform = `translateZ(${-radius}px) rotateY(${s.a}deg)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf)
  }, [radius])
  const step = 360 / items.length
  return (
    <div className="relative mx-auto touch-pan-y select-none cursor-grab active:cursor-grabbing" style={{ width: '100%', height: ch + 60, perspective: 1400 }}
      onPointerDown={(e) => { const t = (e.target as HTMLElement).closest('[data-i]'); st.current = { ...st.current, down: true, x: e.clientX, moved: 0, idx: t ? Number(t.getAttribute('data-i')) : -1, v: 0 } }}
      onPointerMove={(e) => { const s = st.current; if (!s.down) return; const dx = e.clientX - s.x; s.x = e.clientX; s.moved += Math.abs(dx); s.v = dx * 0.35; s.a += dx * 0.35 }}
      onPointerUp={() => { const s = st.current; if (s.down && s.moved < 6 && s.idx >= 0) onPick?.(s.idx); s.down = false }}
      onPointerLeave={() => { st.current.down = false }}>
      <div ref={stage} className="absolute left-1/2 top-6" style={{ width: cw, height: ch, marginLeft: -cw / 2, transformStyle: 'preserve-3d' }}>
        {items.map((it, i) => (
          <div key={it.title} data-i={i} className="absolute inset-0 overflow-hidden shadow-2xl border border-sand/20" style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: 'hidden' }}>
            <img src={`/img/${it.img}.jpg`} alt={it.title} draggable={false} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-3 text-sand"><p className="h text-sm leading-none">{it.title}</p><p className="label !font-medium !text-[.5rem] mt-1 text-gold">{it.sub}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export interface CoverItem { img: string; title: string; sub: string; badge?: string }
/** Coverflow-style 3D slider with autoplay, swipe/drag and arrows. */
export function Coverflow({ items, index, onChange }: { items: CoverItem[]; index: number; onChange: (i: number) => void }) {
  const w = useWidth(), n = items.length
  const cw = Math.min(300, Math.round(w * 0.58)), ch = Math.round(cw * 1.25)
  const hover = useRef(false), sx = useRef<number | null>(null)
  const go = (d: number) => onChange((index + d + n) % n)
  useEffect(() => { const t = setInterval(() => { if (!hover.current) onChange((index + 1) % n) }, 4800); return () => clearInterval(t) }, [index, n, onChange])
  return (
    <div className="relative" onPointerEnter={() => (hover.current = true)} onPointerLeave={() => (hover.current = false)}>
      <div className="relative mx-auto select-none touch-pan-y" style={{ height: ch + 40, perspective: 1300 }}
        onPointerDown={(e) => { sx.current = e.clientX }}
        onPointerUp={(e) => { if (sx.current !== null) { const d = e.clientX - sx.current; if (Math.abs(d) > 45) go(d < 0 ? 1 : -1); sx.current = null } }}>
        {items.map((it, i) => {
          let o = i - index; if (o > n / 2) o -= n; if (o < -n / 2) o += n
          const a = Math.abs(o)
          return (
            <button key={it.title} onClick={() => onChange(i)} aria-label={it.title}
              className="absolute left-1/2 top-4 overflow-hidden border border-sand/20 shadow-2xl transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{ width: cw, height: ch, marginLeft: -cw / 2, zIndex: 20 - a, opacity: a > 3 ? 0 : 1 - a * 0.18, pointerEvents: a > 3 ? 'none' : 'auto', filter: a === 0 ? 'none' : `brightness(${1 - a * 0.18})`,
                transform: `translateX(${o * cw * 0.62}px) translateZ(${-a * 160}px) rotateY(${-o * 38}deg) scale(${a === 0 ? 1.04 : 1})` }}>
              <img src={`/img/${it.img}.jpg`} alt="" draggable={false} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {it.badge && <span className="label absolute top-3 left-3 bg-gold text-ink px-3 py-1 rounded-full">{it.badge}</span>}
              <div className="absolute bottom-0 left-0 p-4 text-left text-sand"><p className="h text-lg">{it.title}</p><p className="label !font-medium text-gold mt-1">{it.sub}</p></div>
            </button>
          )
        })}
      </div>
      <div className="flex items-center justify-center gap-5 mt-4">
        <NavBtn onClick={() => go(-1)} label="Previous">←</NavBtn>
        <span className="flex gap-1.5">{items.map((_, i) => <i key={i} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-gold' : 'w-1.5 bg-sand/30'}`} />)}</span>
        <NavBtn onClick={() => go(1)} label="Next">→</NavBtn>
      </div>
    </div>
  )
}

export function NavBtn({ children, onClick, label, dark, disabled }: { children: ReactNode; onClick: () => void; label: string; dark?: boolean; disabled?: boolean }) {
  const { t } = useI18n()
  return <button onClick={onClick} disabled={disabled} aria-label={t(label)} className={`h-10 w-10 rounded-full border flex items-center justify-center text-sm transition disabled:opacity-30 ${dark ? 'border-ink/30 hover:bg-ink hover:text-sand' : 'border-sand/40 hover:bg-sand hover:text-ink'}`}>{children}</button>
}

/** Number that counts up when scrolled into view. */
export function Counter({ to, suffix = '', prefix = '', decimals = 0 }: { to: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect()
      const t0 = performance.now(), dur = 1600
      const f = (t: number) => { const p = Math.min((t - t0) / dur, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f) }
      requestAnimationFrame(f)
    }, { threshold: 0.4 })
    io.observe(el); return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}

/** Drag-scroll rail with text arrows (no icons). */
export function Rail({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null), d = useRef({ down: false, x: 0, l: 0 })
  const by = (n: number) => ref.current?.scrollBy({ left: n * ref.current.clientWidth * 0.6, behavior: 'smooth' })
  return (
    <div>
      <div className="flex items-center justify-between px-5 md:px-10 mb-6"><span className="label">{label}</span><div className="flex gap-2"><NavBtn dark label="Previous" onClick={() => by(-1)}>←</NavBtn><NavBtn dark label="Next" onClick={() => by(1)}>→</NavBtn></div></div>
      <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar px-5 md:px-10 pb-6 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={(e) => { if (e.pointerType === 'mouse' && ref.current) d.current = { down: true, x: e.clientX, l: ref.current.scrollLeft } }}
        onPointerMove={(e) => { if (d.current.down && ref.current) ref.current.scrollLeft = d.current.l - (e.clientX - d.current.x) }}
        onPointerUp={() => (d.current.down = false)} onPointerLeave={() => (d.current.down = false)}>{children}</div>
    </div>
  )
}

export const Photo = ({ k, className = '', alt = '' }: { k: string; className?: string; alt?: string }) => <img src={`/img/${k}.jpg`} alt={alt} draggable={false} loading="lazy" className={`object-cover ${className}`} />
