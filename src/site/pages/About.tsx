import { useState } from 'react'
import { Link } from '../SmartLink'
import { Reveal, Parallax } from '../components/ui'
import { Tilt, Ring3D, Coverflow, Counter, Rail, Photo } from '../components/three'
import { spa, team, amenities } from '../data'
import { useI18n } from '../i18n-site'
import { rich } from '../rich'

const journey: [string, string, string, string][] = [
  ['2018', 'The first treatment room', 'A single suite in Coimbatore, four therapists and one belief: rest should be done properly.', 'foot'],
  ['2020', 'Our first formula', 'A body oil blended for the Abhyanga ritual. Guests kept asking where to buy it.', 'head-massage'],
  ['2022', 'Facials & consultations', 'Beauty experts join, so one visit can cover massage, facials and a personal skin plan.', 'hydra-facial'],
  ['2024', 'The Velvet collection', 'Twelve small-batch products, tested on our treatment tables before they reach a shelf.', 'herbal-mask'],
  ['2026', 'Ships across India', 'Orders tracked end to end, with the same care as a booking at our front desk.', 'reception'],
]
const values: [string, string, string, string][] = [
  ['Slow by design', 'No rushed rooms, no double bookings. Every guest gets the full hour and a quiet minute after.', 'bridal-veil', '01'],
  ['Skin first', 'Every formula is dermatologist reviewed, vegan, cruelty free and free of harsh fillers.', 'facial', '02'],
  ['Small batch', 'We pour in limited runs so each jar is fresh, fragrant and traceable to its batch.', 'close', '03'],
  ['Genuine care', 'Certified specialists who remember your name, your allergies and your favourite tea.', 'foot-soak', '04'],
]
const worlds: [string, string, string, string, string][] = [
  ['The Spa', 'Body massage and facials in a calm, women-only space.', 'head-massage', 'Book a ritual', '/booking'],
  ['Consultation', 'A one-to-one beauty consultation with senior beauticians.', 'hydra-facial', 'Book a consultation', '/booking'],
  ['The Products', 'The exclusive Velvet collection, delivered to your door.', 'herbal-mask', 'Shop the collection', '/products'],
]

function Hero() {
  const { t, lang } = useI18n()
  const sub = lang === 'en' ? spa.sub.toLowerCase().replace(/^./, (c) => c.toUpperCase()) : t(spa.sub)
  return (
    <section className="relative min-h-[88svh] pt-20 grid md:grid-cols-2 bg-[#e4e9d3] text-ink overflow-hidden">
      <div className="relative order-2 md:order-1 flex flex-col justify-center px-5 md:px-10 pt-10 pb-20 md:pt-12 md:pb-28">
        <span className="label block fade-up !tracking-[.28em] opacity-80">{t('About · {name}', { name: spa.name })}</span>
        <h1 className="mt-8 fade-up text-[clamp(2.8rem,6.2vw,6.5rem)] leading-[1.02] tracking-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{rich(t('Where beauty\nmeets *care.*'))}</h1>
        <p className="text-sm md:text-base max-w-md mt-8 opacity-85 fade-up">{sub}. {t('A women\'s luxury salon and a product studio under one quiet roof.')}</p>
        <a href="#story" className="inline-block self-start mt-10 text-sm hover:opacity-70 transition fade-up">{t('Our story ↓')}</a>
      </div>
      <div className="order-1 md:order-2 relative h-[46svh] md:h-auto">
        <img src="/assets/hero/about-hero.webp" alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      </div>
    </section>
  )
}

function Story() {
  const { t } = useI18n()
  return (
    <section id="story" className="relative px-5 md:px-10 py-28 grid md:grid-cols-2 gap-14 items-center overflow-hidden">
      <div>
        <Reveal><span className="label block mb-5">{t('Our story')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{rich(t('Born in a treatment room.\nPoured in a studio.'))}</h2></Reveal>
        <Reveal delay={150}><p className="text-sm mt-8 max-w-md opacity-80">{t('Revathi Herbal began as a small day spa with a simple rule: use only what we would trust on our own skin. When guests started asking for the oils and creams we used in the room, we began making them ourselves.')}</p>
          <p className="text-sm mt-4 max-w-md opacity-80">{t('Today the spa and the product studio feed each other. Every formula is tested on our treatment tables first, and every ritual is shaped by what our guests tell us.')}</p></Reveal>
      </div>
      <div className="relative h-[460px] md:h-[600px]">
        <Parallax speed={0.1} className="absolute left-0 top-0 w-[68%]"><Tilt max={8}><Photo k="close" className="w-full aspect-[4/5] shadow-2xl" /></Tilt></Parallax>
        <Parallax speed={-0.1} className="absolute right-0 bottom-0 w-[55%]"><Tilt max={10}><Photo k="foot-soak" className="w-full aspect-[4/5] shadow-2xl border-4 border-sand" /></Tilt></Parallax>
      </div>
    </section>
  )
}

function Strip() {
  const { t } = useI18n()
  const w = ['Body Massage', 'Facial', 'Consultation', 'Beauty products', 'Women\'s luxury salon']
  return <div className="bg-ink text-sand overflow-hidden py-5 border-y border-sand/10"><div className="flex w-max marquee">{[...w, ...w, ...w, ...w].map((x, i) => <span key={i} className="h text-3xl md:text-5xl px-6 flex items-center gap-12 whitespace-nowrap">{t(x)}<i className="h-1.5 w-1.5 rounded-full bg-gold" /></span>)}</div></div>
}

function Stats() {
  const { t } = useI18n()
  const s: [number, string, string][] = [[8, '+ yrs', 'Of craft'], [12, 'k+', 'Guests cared for'], [24, '', 'Treatments'], [98, '%', 'Say they return']]
  return (
    <section className="relative h-[90svh] min-h-[560px] overflow-hidden bg-ink text-sand">
      <Parallax speed={0.08} className="absolute -inset-y-[10%] inset-x-0"><Photo k="bridal-saree" className="h-full w-full" /></Parallax>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex flex-col justify-between px-5 md:px-10 pt-28 pb-10">
        <Reveal><span className="label text-gold block mb-4">{t('By the numbers')}</span><h2 className="h text-[clamp(2.4rem,6.5vw,6rem)]">{rich(t('Trusted,\none visit at a time.'))}</h2></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{s.map(([n, u, l]) => <Tilt key={l} max={12} className="glass p-5"><p className="h text-4xl md:text-5xl text-gold" style={{ transform: 'translateZ(30px)' }}><Counter to={n} suffix={t(u)} /></p><p className="label mt-2">{t(l)}</p></Tilt>)}</div>
      </div>
    </section>
  )
}

function Journey() {
  const { t } = useI18n()
  return (
    <section id="journey" className="py-28 bg-sand">
      <div className="px-5 md:px-10 mb-10"><Reveal><span className="label block mb-4">{t('The journey')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{rich(t('Eight years,\nfive chapters.'))}</h2></Reveal></div>
      <Rail label={t('Drag to travel through time')}>
        {journey.map(([y, ti, d, k]) => (
          <Tilt key={y} max={7} className="shrink-0 w-[78vw] sm:w-[360px] bg-ink text-sand overflow-hidden group">
            <div className="overflow-hidden"><Photo k={k} className="w-full aspect-[4/3] group-hover:scale-110 transition duration-[1400ms]" /></div>
            <div className="p-6" style={{ transform: 'translateZ(30px)' }}><p className="h text-5xl gold-text">{y}</p><h3 className="h text-xl mt-3">{t(ti)}</h3><p className="text-xs mt-3 opacity-75">{t(d)}</p></div>
          </Tilt>))}
      </Rail>
    </section>
  )
}

function Values() {
  const { t } = useI18n()
  const [on, setOn] = useState<number | null>(null)
  return (
    <section id="values" className="py-28 bg-[#e5ead5] px-5 md:px-10">
      <Reveal><span className="label block mb-4">{t('What we stand for')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{rich(t('Four promises.\nHover to flip.'))}</h2></Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {values.map(([ti, d, k, n], i) => (
          <div key={ti} onClick={() => setOn(on === i ? null : i)} className={`flip h-[400px] relative cursor-pointer ${on === i ? 'on' : ''}`}>
            <div className="flip-inner absolute inset-0">
              <div className="flip-face overflow-hidden shadow-xl"><Photo k={k} className="h-full w-full" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute bottom-0 p-6 text-sand"><p className="h text-5xl gold-text">{n}</p><h3 className="h text-2xl mt-2">{t(ti)}</h3></div></div>
              <div className="flip-face flip-back bg-ink text-sand p-7 flex flex-col justify-center shadow-xl"><p className="label text-gold">{n} · {t(ti)}</p><p className="text-sm mt-5 opacity-85">{t(d)}</p></div>
            </div>
          </div>))}
      </div>
    </section>
  )
}

function Worlds() {
  const { t } = useI18n()
  const [a, setA] = useState(0)
  return (
    <section className="bg-ink text-sand">
      <div className="px-5 md:px-10 pt-24 pb-10"><Reveal><span className="label text-gold block mb-4">{t('One brand, three worlds')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{rich(t('Pick your\nway in.'))}</h2></Reveal></div>
      <div className="flex flex-col md:flex-row h-[1020px] md:h-[78vh] md:min-h-[520px]">
        {worlds.map(([ti, d, k, cta, to], i) => (
          <div key={ti} onMouseEnter={() => setA(i)} onClick={() => setA(i)} className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${a === i ? 'flex-[3]' : 'flex-1'}`}>
            <Photo k={k} className="absolute inset-0 h-full w-full transition duration-[1400ms]" />
            <div className={`absolute inset-0 transition-all duration-700 ${a === i ? 'bg-black/30' : 'bg-black/65'}`} />
            <div className="absolute bottom-0 p-6 md:p-8"><h3 className="h text-3xl md:text-5xl">{t(ti)}</h3>
              <div className={`transition-all duration-700 overflow-hidden ${a === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}><p className="text-xs max-w-xs opacity-90">{t(d)}</p><Link to={to} className="inline-block mt-4 bg-gold text-ink rounded-full px-6 py-3 label hover:bg-sand transition">{t(cta)} ↗</Link></div></div>
          </div>))}
      </div>
    </section>
  )
}

function Team() {
  const { t } = useI18n()
  return (
    <section id="team" className="relative bg-ink text-sand pt-24 pb-16 overflow-hidden border-t border-sand/10">
      <div className="px-5 md:px-10 mb-6"><Reveal><span className="label text-gold block mb-4">{t('The people')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{rich(t('Hands you\ncan trust.'))}</h2><p className="label mt-4 opacity-60">{t('Drag the ring')}</p></Reveal></div>
      <Ring3D items={team.map((m) => ({ img: m.img, title: m.name, sub: t(m.role) }))} />
      <div className="px-5 md:px-10 mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">{team.slice(0, 4).map((m) => <Tilt key={m.name} max={10} className="glass p-4"><p className="h text-xl">{m.name}</p><p className="label !font-medium text-gold mt-1">{t(m.role)}</p><p className="text-xs mt-2 opacity-75">{t(m.skill)}</p></Tilt>)}</div>
    </section>
  )
}

function Gallery() {
  const { t } = useI18n()
  const g = [['foot-soak', 'The lounge'], ['head-massage', 'Treatment suite'], ['hydra-facial', 'Facial studio'], ['herbal-mask', 'Consultation room'], ['close', 'Body ritual'], ['reception', 'Reception']]
  const [i, setI] = useState(0)
  return (
    <section className="py-24 bg-[#171915] text-sand overflow-hidden">
      <div className="px-5 md:px-10 mb-10"><Reveal><span className="label text-gold block mb-4">{t('Inside Revathi Herbal')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{rich(t('A look\naround.'))}</h2></Reveal></div>
      <Coverflow items={g.map(([k, ti]) => ({ img: k, title: t(ti), sub: 'Revathi Herbal' }))} index={i} onChange={setI} />
    </section>
  )
}

function Visit() {
  const { t } = useI18n()
  return (
    <section id="visit" className="bg-sand px-5 md:px-10 py-28">
      <Reveal><span className="label block mb-4">{t('Visit us')}</span><h2 className="h text-[clamp(2.2rem,5vw,4.6rem)] max-w-3xl">{t('Come in. Slow down.')}</h2></Reveal>
      <div className="grid md:grid-cols-3 gap-10 mt-14 text-xs leading-relaxed">
        <div><h4 className="label mb-4">{t('Opening hours')}</h4>{spa.hours.map(([d, h]) => <p key={d} className="flex justify-between gap-4 border-b border-ink/15 py-2"><span>{t(d)}</span><span className="opacity-70">{t(h)}</span></p>)}</div>
        <div><h4 className="label mb-4">{t('Find us')}</h4><p className="opacity-80">{t(spa.address)}<br />{spa.phone}<br />{spa.email}</p></div>
        <div><h4 className="label mb-4">{t('Amenities')}</h4><ul className="space-y-2 opacity-80">{amenities.slice(0, 6).map((a) => <li key={a}>— {t(a)}</li>)}</ul></div>
      </div>
      <div className="flex flex-wrap gap-3 mt-14"><Link to="/booking" className="bg-ink text-sand rounded-full px-7 py-4 label">{t('Book appointment ↗')}</Link><Link to="/products" className="border border-ink/40 rounded-full px-7 py-4 label hover:bg-ink hover:text-sand transition">{t('Shop products')}</Link><Link to="/track" className="border border-ink/40 rounded-full px-7 py-4 label hover:bg-ink hover:text-sand transition">{t('Track order')}</Link></div>
    </section>
  )
}

export default function About() { return <main><Hero /><Story /><Strip /><Stats /><Journey /><Values /><Worlds /><Team /><Gallery /><Visit /></main> }
