import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n-site'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>{children}</div>
}

export function Parallax({ children, speed = 0.15, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const f = () => { const r = el.getBoundingClientRect(); el.style.transform = `translate3d(0,${-(r.top + r.height / 2 - window.innerHeight / 2) * speed}px,0)` }
    f(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f) }
  }, [speed])
  return <div ref={ref} className={`will-change-transform ${className}`}>{children}</div>
}

/** Text with "\n" line breaks (translations keep their own line breaks). */
export function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((l, i) => <Fragment key={i}>{i > 0 && <br />}{l}</Fragment>)}</>
}

export function Arrow({ dir, onClick, disabled, light }: { dir: 'l' | 'r'; onClick: () => void; disabled?: boolean; light?: boolean }) {
  const { t } = useI18n()
  return (
    <button onClick={onClick} disabled={disabled} aria-label={dir === 'l' ? t('Previous') : t('Next')}
      className={`h-9 w-9 rounded-full border flex items-center justify-center transition disabled:opacity-30 ${light ? 'border-sand/40 text-sand hover:bg-sand hover:text-ink' : 'border-ink/30 hover:bg-ink hover:text-sand'}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={dir === 'l' ? 'rotate-180' : ''}><path d="M4 12h16M14 6l6 6-6 6" /></svg>
    </button>
  )
}

export function ArrowUR({ className = '' }: { className?: string }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}><path d="M6 18L18 6M8 6h10v10" /></svg>
}

/** Drag-to-scroll horizontal rail with arrow buttons (mouse drag + touch swipe). */
export function DragRail({ label, children, light }: { label: string; children: ReactNode; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const d = useRef({ down: false, x: 0, l: 0 })
  const [edge, setEdge] = useState({ start: true, end: false })
  const upd = () => { const el = ref.current; if (el) setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 }) }
  useEffect(upd, [])
  const by = (n: number) => ref.current?.scrollBy({ left: n * ref.current.clientWidth * 0.55, behavior: 'smooth' })
  return (
    <div>
      <div className="flex items-center justify-between px-5 md:px-10 mb-6">
        <span className="label">{label}</span>
        <div className="flex gap-2"><Arrow dir="l" disabled={edge.start} onClick={() => by(-1)} light={light} /><Arrow dir="r" disabled={edge.end} onClick={() => by(1)} light={light} /></div>
      </div>
      <div ref={ref} onScroll={upd}
        onPointerDown={(e) => { if (e.pointerType === 'mouse' && ref.current) d.current = { down: true, x: e.clientX, l: ref.current.scrollLeft } }}
        onPointerMove={(e) => { if (d.current.down && ref.current) ref.current.scrollLeft = d.current.l - (e.clientX - d.current.x) }}
        onPointerUp={() => (d.current.down = false)} onPointerLeave={() => (d.current.down = false)}
        className="flex items-start gap-5 overflow-x-auto no-scrollbar px-5 md:px-10 cursor-grab active:cursor-grabbing select-none">
        {children}
      </div>
    </div>
  )
}
