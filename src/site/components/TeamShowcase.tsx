import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n-site'

type Member = { name: string; role: string; skill: string; img: string }

const DELAY = 4800
const src = (img: string) => (img.startsWith('/') || img.startsWith('http') ? img : `/img/${img}.jpg`)

/** Arch-reveal specialist showcase: circular clip-path wipe between photos, Ken-Burns zoom,
 *  orbiting ring + glow, sliding name text, and thumbnails with live progress rings. */
export default function TeamShowcase({ members }: { members: Member[] }) {
  const { t } = useI18n()
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState(-1)
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)
  const timer = useRef<number | null>(null)
  const n = members.length

  const go = (i: number) => {
    setActive((cur) => {
      if (cur !== i) setPrev(cur)
      return i
    })
    setTick((x) => x + 1)
  }

  useEffect(() => {
    if (paused || n < 2) return
    timer.current = window.setTimeout(() => go((active + 1) % n), DELAY)
    return () => { if (timer.current) window.clearTimeout(timer.current) }
  }, [active, paused, tick, n])

  if (!n) return null
  const m = members[active]
  const R = 22, C = 2 * Math.PI * R

  return (
    <div className={`ts-wrap${paused ? " paused" : ""}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <style>{`
        .ts-wrap{display:grid;gap:2.5rem;align-items:center;justify-items:center;padding:1rem 1.25rem 0}
        @media(min-width:900px){.ts-wrap{grid-template-columns:auto minmax(0,420px);justify-content:center;gap:5rem}}
        .ts-stage{position:relative;width:min(78vw,340px);aspect-ratio:3/4}
        .ts-glow{position:absolute;inset:-14%;border-radius:50%;background:radial-gradient(circle,rgba(242,198,194,.55),transparent 65%);filter:blur(30px);animation:tsPulse 5s ease-in-out infinite}
        .ts-ring{position:absolute;inset:-22px;border-radius:999px 999px 40px 40px;border:1px dashed rgba(242,198,194,.55);animation:tsSpin 28s linear infinite}
        .ts-ring2{position:absolute;inset:-10px;border-radius:999px 999px 30px 30px;border:1px solid rgba(242,198,194,.25)}
        .ts-orbit{position:absolute;inset:-22px;animation:tsSpin 12s linear infinite}
        .ts-orbit i{position:absolute;top:-4px;left:50%;width:8px;height:8px;border-radius:50%;background:#F2C6C2;box-shadow:0 0 14px 3px #F2C6C2}
        .ts-arch{position:absolute;inset:0;border-radius:999px 999px 28px 28px;overflow:hidden;background:#3A2A2E;box-shadow:0 30px 60px -20px rgba(0,0,0,.55)}
        .ts-img{position:absolute;inset:0;clip-path:circle(0% at 50% 100%);transition:clip-path 1.15s cubic-bezier(.77,0,.18,1);z-index:1}
        .ts-img.prev{clip-path:circle(150% at 50% 100%);z-index:2}
        .ts-img.on{clip-path:circle(150% at 50% 100%);z-index:3}
        .ts-img img{width:100%;height:100%;object-fit:cover;transform:scale(1.15)}
        .ts-img.on img{animation:tsZoom 7s ease-out forwards}
        .ts-shine{position:absolute;inset:0;z-index:4;pointer-events:none;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.22) 50%,transparent 60%);transform:translateX(-120%);animation:tsShine 4.8s ease-in-out infinite}
        .ts-badge{position:absolute;z-index:5;right:-14px;bottom:18%;background:#FFFFFF;color:#7A2E4D;border-radius:999px;padding:.55rem .9rem;font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;box-shadow:0 10px 25px -8px rgba(0,0,0,.4);animation:tsFloat 4s ease-in-out infinite}
        .ts-info{width:100%;max-width:420px;text-align:center}
        @media(min-width:900px){.ts-info{text-align:left}}
        .ts-count{font-size:.62rem;letter-spacing:.2em;opacity:.6;font-weight:600}
        .ts-name{overflow:hidden;margin-top:.6rem}
        .ts-name h3{font-family:'Outfit',sans-serif;text-transform:uppercase;letter-spacing:-.045em;line-height:.95;font-size:clamp(2.8rem,8vw,5rem);animation:tsUp .9s cubic-bezier(.2,.8,.2,1) both}
        .ts-role{color:#F2C6C2;margin-top:.9rem;animation:tsUp .9s .08s cubic-bezier(.2,.8,.2,1) both}
        .ts-skill{opacity:.8;font-size:.8rem;margin-top:.5rem;animation:tsUp .9s .16s cubic-bezier(.2,.8,.2,1) both}
        .ts-thumbs{display:flex;gap:1rem;margin-top:2rem;justify-content:center}
        @media(min-width:900px){.ts-thumbs{justify-content:flex-start}}
        .ts-th{position:relative;width:56px;height:56px;border:0;background:none;padding:0;cursor:pointer;transition:transform .3s}
        .ts-th:hover{transform:translateY(-4px)}
        .ts-th img{position:absolute;inset:6px;width:calc(100% - 12px);height:calc(100% - 12px);border-radius:50%;object-fit:cover;opacity:.55;transition:opacity .3s}
        .ts-th.on img{opacity:1}
        .ts-th svg{position:absolute;inset:0;transform:rotate(-90deg)}
        .ts-th circle{fill:none;stroke-width:2}
        .ts-th .bg{stroke:rgba(242,198,194,.25)}
        .ts-th .fg{stroke:#F2C6C2;stroke-linecap:round;stroke-dasharray:${C};stroke-dashoffset:${C}}
        .ts-th.on .fg{animation:tsFill ${DELAY}ms linear forwards}
        .ts-wrap.paused .ts-th.on .fg{animation-play-state:paused}
        @keyframes tsFill{to{stroke-dashoffset:0}}
        @keyframes tsZoom{from{transform:scale(1.15)}to{transform:scale(1)}}
        @keyframes tsUp{from{transform:translateY(110%);opacity:0}to{transform:none;opacity:1}}
        @keyframes tsSpin{to{transform:rotate(360deg)}}
        @keyframes tsPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
        @keyframes tsShine{0%,55%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
        @keyframes tsFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @media(prefers-reduced-motion:reduce){.ts-glow,.ts-ring,.ts-orbit,.ts-shine,.ts-badge,.ts-img.on img{animation:none}.ts-img{transition:none}}
      `}</style>

      <div className="ts-stage">
        <div className="ts-glow" />
        <div className="ts-ring" />
        <div className="ts-ring2" />
        <div className="ts-orbit"><i /></div>
        <div className="ts-arch">
          {members.map((x, i) => (
            <div key={x.name} className={`ts-img ${i === active ? 'on' : i === prev ? 'prev' : ''}`}>
              <img src={src(x.img)} alt={`${x.name} — ${t(x.role)}`} draggable={false} />
            </div>
          ))}
          <div className="ts-shine" />
        </div>
        <div className="ts-badge">{t(m.skill).split('&')[0].trim()}</div>
      </div>

      <div className="ts-info">
        <div className="ts-count">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
        <div className="ts-name"><h3 key={`n${active}`}>{m.name}</h3></div>
        <p key={`r${active}`} className="label ts-role">{t(m.role)}</p>
        <p key={`s${active}`} className="ts-skill">{t(m.skill)}</p>
        <div className="ts-thumbs">
          {members.map((x, i) => (
            <button key={x.name} type="button" aria-label={x.name} className={`ts-th${i === active ? ' on' : ''}`} onClick={() => go(i)}>
              <img src={src(x.img)} alt="" draggable={false} />
              <svg viewBox="0 0 48 48">
                <circle className="bg" cx="24" cy="24" r={R} />
                <circle key={i === active ? `f${tick}` : 'f'} className="fg" cx="24" cy="24" r={R} />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
