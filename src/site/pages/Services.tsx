import { servicePricesVisible } from '../data'
import { useSiteConfig, promoPrice } from '../../shared/siteConfig'
import ReviewsSection from '../../shared/ReviewsSection'
import { useEffect, useMemo, useState } from 'react'
import { Link } from '../SmartLink'
import { Reveal, Parallax, DragRail, Arrow, ArrowUR, Lines } from '../components/ui'
import { useI18n, COUNT_TREATMENTS } from '../i18n-site'
import { services, categories, amenities, policies, spa, team, img, money, type Category } from '../data'

const Img = ({ k, className = '', alt = '' }: { k: string; className?: string; alt?: string }) => <img src={img(k)} alt={alt} draggable={false} loading="lazy" className={`object-cover ${className}`} />
const Cap = ({ children }: { children: string }) => <p className="label !font-medium mt-3 max-w-[16rem] opacity-80">{children}</p>

// Full-width auto-scrolling image banner at the top of the Services page.
// Replace the images in public/assets/services-hero/ (or add more here).
const HERO_SLIDES = [
  { src: '/assets/services-hero/sh-festive.webp', alt: 'Revathi Herbal Spa festive offers' },
  { src: '/assets/services-hero/sh-bridal.webp', alt: 'Revathi bridal makeover' },
  { src: '/assets/services-hero/sh-spa.webp', alt: 'Revathi herbal spa' },
]

function Hero() {
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (hover) return
    const id = window.setInterval(() => setI((n) => (n + 1) % HERO_SLIDES.length), 4500)
    return () => window.clearInterval(id)
  }, [hover])
  return (
    <section className="relative w-full overflow-hidden bg-ink" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative w-full aspect-[2352/1008] max-h-[480px]">
        {HERO_SLIDES.map((s, n) => (
          <img key={s.src} src={s.src} alt={s.alt} draggable={false} loading={n === 0 ? 'eager' : 'lazy'} className={`absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {HERO_SLIDES.map((s, n) => <button key={s.src} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} className={`h-2 rounded-full transition-all ${n === i ? 'w-7 bg-sand' : 'w-2 bg-sand/50'}`} />)}
        </div>
      </div>
    </section>
  )
}


function Bleed({ k, label, title, body, right }: { k: string; label: string; title: string; body: string; right?: boolean }) {
  const { t } = useI18n()
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-sand">
      <Parallax speed={0.08} className="absolute -inset-y-[10%] inset-x-0"><Img k={k} className="h-full w-full" /></Parallax>
      <div className="absolute inset-0 bg-black/30" />
      <span className="label absolute top-24 left-5 md:left-10">{t(label)}</span>
      <div className={`absolute bottom-8 md:bottom-10 ${right ? 'right-5 md:right-10 text-right' : 'left-5 md:left-10'}`}>
        <Reveal><h2 className="h text-[clamp(2.4rem,6.5vw,6rem)]">{t(title)}</h2></Reveal>
        <p className={`text-xs mt-4 max-w-[19rem] opacity-90 ${right ? 'ml-auto' : ''}`}>{t(body)}</p>
      </div>
    </section>
  )
}


function Motion() {
  const { t } = useI18n()
  return (
    <section className="relative h-[100vh] min-h-[640px] overflow-hidden">
      <Parallax speed={-0.12} className="absolute inset-x-0 top-1/3"><p className="h text-[clamp(4rem,15vw,15rem)] text-center text-ink/20 leading-[.85]"><Lines text={t('Stillness\nin motion.')} /></p></Parallax>
      <Parallax speed={0.18} className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[min(72vw,380px)]"><Img k="facial" className="w-full aspect-[4/5] shadow-2xl" /></Parallax>
      <span className="label absolute bottom-24 left-5 md:left-10">{t('Petal, clay, oil. An entirely new composition.')}</span>
      <p className="absolute bottom-10 right-5 md:right-10 max-w-sm text-xs">{t('Our palette moves from bright citrus to soft floral, from dry wood to warm amber. The interesting part is what happens between them.')}</p>
    </section>
  )
}


function Moments() {
  const { t } = useI18n()
  const m = [['Morning', 'herbal-mask', 'Morning. Bright, awakening facials and a cup of ginger tea.'], ['Afternoon', 'head-massage', 'Afternoon. A full-body massage to release the weight of a long day.'], ['Evening', 'foot-soak', 'Evening. Slow aromatherapy massage to close the day softly.']]
  const [i, setI] = useState(0)
  return (
    <section className="bg-[#171915] text-sand min-h-[100svh] grid md:grid-cols-2 items-center gap-10 px-5 md:px-10 py-28 border-t border-sand/10">
      <div>
        <span className="label block mb-5">{t('A change of mood')}</span>
        <h2 className="h text-[clamp(2.2rem,4.5vw,4.2rem)]"><Lines text={t('A ritual\nfor this\nmoment.')} /></h2>
        <div className="flex gap-6 mt-8 text-sm">{m.map(([title], n) => <button key={title} onClick={() => setI(n)} className={`pb-1 border-b transition ${n === i ? 'border-sand' : 'border-transparent opacity-50 hover:opacity-100'}`}>{t(title)}</button>)}</div>
      </div>
      <div key={i} className="slide-in">
        <Img k={m[i][1]} className="w-full aspect-[4/3] md:aspect-square max-h-[70vh]" />
        <p className="text-xs mt-3 max-w-md">{t(m[i][2])}</p>
      </div>
    </section>
  )
}

function Ingredients() {
  const { t } = useI18n()
  const s = [['Lavender', 'facial2', 'Soft doesn\'t mean simple.', 'Calming and quietly powerful. Lavender slows the breath and settles the nervous system.'], ['Rose', 'foot2', 'A petal-soft beginning.', 'Hand-picked petals for our soaks and facials, gentle on even the most sensitive skin.'], ['Sandalwood', 'back', 'Warmth that stays.', 'Creamy, grounding wood notes carried in our massage oils and ritual candles.'], ['Himalayan salt', 'close', 'Clean, mineral, honest.', 'Fine crystals polish away dullness and leave skin smooth, soft and glowing.'], ['Jasmine', 'foot', 'Light in the shadows.', 'A small white flower with an expansive presence, used in our evening rituals.']]
  const [i, setI] = useState(0)
  const go = (d: number) => setI((i + d + s.length) % s.length)
  return (
    <section id="ingredients" className="bg-ink text-sand min-h-[100svh] pt-24 pb-10 px-5 md:px-10 flex flex-col">
      <div className="flex justify-between items-start">
        <h2 className="h text-[clamp(1.6rem,3.2vw,3rem)]"><Lines text={t('Raw materials.\nRich possibilities.')} /></h2>
        <div className="flex items-center gap-4 label"><span className="flex gap-1.5">{s.map((_, n) => <i key={n} className={`h-1.5 w-1.5 rounded-full transition ${n === i ? 'bg-sand' : 'bg-sand/30'}`} />)}</span><Arrow dir="l" light onClick={() => go(-1)} /><Arrow dir="r" light onClick={() => go(1)} /></div>
      </div>
      <div key={i} className="flex-1 grid md:grid-cols-[1fr_62%] gap-8 items-end mt-10">
        <div className="slide-in order-2 md:order-1 pb-4">
          <span className="label block mb-4">{t(s[i][0])}</span>
          <h3 className="h text-[clamp(1.5rem,2.6vw,2.4rem)]">{t(s[i][2])}</h3><p className="text-xs mt-4 max-w-xs opacity-80">{t(s[i][3])}</p>
        </div>
        <Img k={s[i][1]} className="slide-in order-1 md:order-2 w-full aspect-[4/3] md:max-h-[62vh]" />
      </div>
      <div className="h-px bg-sand/20 mt-6"><div className="h-px bg-sand transition-all duration-700" style={{ width: `${((i + 1) / s.length) * 100}%` }} /></div>
    </section>
  )
}


function ServiceCard({ s, n }: { s: (typeof services)[number]; n: number }) {
  const { t } = useI18n()
  return (
    <article style={{ animationDelay: `${n * 50}ms` }} className="fade-up group flex h-full flex-col">
      <div className="overflow-hidden relative"><Img k={s.img} alt={t(s.name)} className="w-full aspect-[4/3] group-hover:scale-105 transition duration-700" />
        {s.popular && <span className="label absolute top-3 left-3 bg-sand px-3 py-1 rounded-full">{t('Most loved')}</span>}</div>
      <div className="flex justify-between gap-4 mt-4"><h3 className="h text-xl">{t(s.name)}</h3>{servicePricesVisible() && <span className="text-sm font-medium whitespace-nowrap text-right">{s.basePrice ? <s className="opacity-50 mr-2 font-normal">{money(s.basePrice)}</s> : null}{money(s.price)}{s.promo && <span className="label block !text-[10px] text-gold">{t(s.promo)}</span>}</span>}</div>
      <p className="label !font-medium opacity-60 mt-2">{t(s.category)}  {s.duration} {t('min')}</p>
      <p className="text-xs mt-3 opacity-80">{t(s.desc)}</p>
      {s.care && <p className="text-xs mt-2 opacity-70"><span className="label !font-medium">{t('Before your visit')}:</span> {t(s.care)}</p>}
      <div className="mt-auto pt-4">
        <Link to={`/booking?service=${s.id}`} className="inline-flex items-center gap-2 bg-ink text-sand rounded-full px-5 py-3 label hover:bg-stone transition">{t('Book appointment')} <ArrowUR /></Link>
      </div>
    </article>
  )
}

function Popup({ label, title, onClose, children }: { label: string; title: string; onClose: () => void; children: React.ReactNode }) {
  const { t } = useI18n()
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', key)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-black/60 md:p-8" onClick={onClose} role="dialog" aria-modal="true" aria-label={t(title)}>
      <div className="flex flex-col w-full max-w-6xl max-h-[92vh] bg-[#e5ead5] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-6 px-6 md:px-10 pt-6 pb-4 border-b border-ink/10">
          <div><span className="label block mb-2">{t(label)}</span><h2 className="h text-[clamp(1.8rem,3.6vw,3.2rem)]">{t(title)}</h2></div>
          <button onClick={onClose} aria-label={t('Close')} className="shrink-0 h-10 w-10 rounded-full border border-ink/30 hover:bg-ink hover:text-sand transition text-lg leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-6 md:px-10 py-8">{children}</div>
      </div>
    </div>
  )
}

function Menu() {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState<null | 'facial' | 'bridal'>(null)
  const pk = useSiteConfig().bridalPackages
  const facials = services.filter((s) => s.category === 'Facial')
  const others = services.filter((s) => s.category === 'Body Massage' || s.category === 'Consultation')
  const close = () => setOpen(null)
  const big = [
    { key: 'facial' as const, title: 'Facial', k: 'facial2', src: '', count: COUNT_TREATMENTS[lang](facials.length), desc: 'Hydra, normal and herbal facials for every skin type.', btn: 'View facials' },
    { key: 'bridal' as const, title: 'Bridal Makeup', k: '', src: '/assets/services-hero/bridal.webp', count: `${pk.length} ${t('packages')}`, desc: 'Silver, Gold and Platinum bridal packages, plus a trial pack.', btn: 'View packages' },
  ]
  return (
    <section id="menu" className="bg-[#e5ead5] px-5 md:px-10 pt-24 pb-24 scroll-mt-0">
      <span className="label block mb-4">{t('The ritual menu')}</span>
      <h2 className="h text-[clamp(2.4rem,5.5vw,5rem)]">{t('Services & Consulting')}</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {big.map((c) => (
          <button key={c.key} onClick={() => setOpen(c.key)} className="group text-left bg-white/60 border border-ink/15 hover:border-ink transition">
            <div className="overflow-hidden relative">
              {c.src ? <img src={c.src} alt={t(c.title)} loading="lazy" draggable={false} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition duration-700" /> : <Img k={c.k} alt={t(c.title)} className="w-full aspect-[16/9] group-hover:scale-105 transition duration-700" />}
            </div>
            <div className="p-6 flex items-end justify-between gap-4">
              <div><h3 className="h text-3xl">{t(c.title)}</h3><p className="text-xs mt-3 opacity-75 max-w-sm">{t(c.desc)}</p><p className="label opacity-60 mt-3">{c.count}</p></div>
              <span className="label flex items-center gap-2 whitespace-nowrap">{t(c.btn)} <ArrowUR /></span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-24">
        <span className="label block mb-4">{t('Body Massage')} &amp; {t('Consultation')}</span>
        <h3 className="h text-[clamp(1.8rem,3.4vw,3rem)]">{t('Massage & Consultation')}</h3>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-12 mt-10">
          {others.map((s, n) => <ServiceCard key={s.id} s={s} n={n} />)}
        </div>
      </div>

      {open === 'facial' && (
        <Popup label="Facial" title="Facial treatments" onClose={close}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">{facials.map((s, n) => <ServiceCard key={s.id} s={s} n={n} />)}</div>
        </Popup>
      )}
      {open === 'bridal' && (
        <Popup label="Bridal Makeup" title="Bridal packages" onClose={close}>
          <BridalPackages />
        </Popup>
      )}
    </section>
  )
}

function BridalPackages() {
  const { t } = useI18n()
  const pk = useSiteConfig().bridalPackages
  return (
    <div>
      <p className="text-xs max-w-xl opacity-70">{t('Pick a package, choose a date, and our team confirms your booking after a quick review.')} {t('Available at our parlour or at your home.')}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {pk.map((b) => (
          <article key={b.id} className={`flex flex-col border p-6 ${b.popular ? 'bg-ink text-sand border-ink' : 'bg-white/60 border-ink/15'}`}>
            {b.popular && <span className="label mb-3 text-gold">{t('Most loved')}</span>}
            <h3 className="h text-2xl">{t(b.name)}</h3>
            <p className="label opacity-60 mt-2">{b.duration} {t('min')}{servicePricesVisible() && <>  {(b.discountValue ?? 0) > 0 && <s className="opacity-60 mr-1">{money(b.price)}</s>}{money(promoPrice(b.price, b.discountType, b.discountValue))}{(b.discountValue ?? 0) > 0 && <span className="text-gold">  {t(b.discountType === 'flat' ? `${b.discountValue} off` : `${b.discountValue}% off`)}</span>}</>}</p>
            <ul className="mt-5 space-y-2 text-xs flex-1">{b.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden></span><span>{t(f)}</span></li>)}</ul>
            {b.care && <p className="text-xs mt-4 opacity-70"><span className="label !font-medium">{t('Before your visit')}:</span> {t(b.care)}</p>}
            <Link to={`/booking?service=${b.id}`} className={`inline-flex items-center justify-center gap-2 mt-6 rounded-full px-5 py-3 label transition ${b.popular ? 'bg-sand text-ink hover:opacity-90' : 'bg-ink text-sand hover:bg-stone'}`}>{t('Book this package')} <ArrowUR /></Link>
          </article>
        ))}
      </div>
    </div>
  )
}

function Visit() {
  const { t } = useI18n()
  return (
    <section id="visit" className="bg-ink text-sand px-5 md:px-10 py-28">
      <span className="label block mb-4">{t('Visit our salon')}</span>
      <h2 className="h text-[clamp(2.2rem,5vw,4.6rem)] max-w-3xl">{t('A sanctuary in the middle of the day.')}</h2>
      <div className="grid md:grid-cols-4 gap-10 mt-16 text-xs leading-relaxed">
        <div><h4 className="label mb-4">{t('About')}</h4><p className="opacity-80">{t('Revathi Herbal is a women\'s luxury salon offering body massage, facials and beauty consultations. Certified specialists, organic products and private suites.')}</p></div>
        <div><h4 className="label mb-4">{t('Opening hours')}</h4>{spa.hours.map(([d, hrs]) => <p key={d} className="flex justify-between gap-4 border-b border-sand/15 py-2"><span>{t(d)}</span><span className="opacity-70">{t(hrs)}</span></p>)}</div>
        <div><h4 className="label mb-4">{t('Amenities')}</h4><ul className="space-y-2 opacity-80">{amenities.map((a) => <li key={a}>— {t(a)}</li>)}</ul></div>
        <div><h4 className="label mb-4">{t('Good to know')}</h4><ul className="space-y-2 opacity-80">{policies.map((a) => <li key={a}>— {t(a)}</li>)}</ul>
          <h4 className="label mt-8 mb-3">{t('Find us')}</h4><p className="opacity-80">{t(spa.address)}<br />{spa.phone}<br />{spa.email}</p></div>
      </div>
      <Faq />
    </section>
  )
}


function Marquee() {
  const { t } = useI18n()
  const w = ['Festive holiday offers', '10% off your first service', 'Body massage offers', 'Facial offers', 'Bridal package offers']
  return (
    <div className="bg-ink text-sand overflow-hidden pt-24 pb-3">
      <div className="flex w-max" style={{ animation: 'marquee 30s linear infinite' }}>
        {[...w, ...w, ...w, ...w].map((word, i) => <span key={i} className="h text-base md:text-xl px-4 flex items-center gap-8 whitespace-nowrap">{t(word)}<i className="h-1.5 w-1.5 rounded-full bg-sand/50" /></span>)}
      </div>
    </div>
  )
}

function Team() {
  const { t } = useI18n()
  return (
    <section className="py-24">
      <div className="px-5 md:px-10 mb-10"><Reveal><h2 className="h text-[clamp(2rem,4vw,3.6rem)]"><Lines text={t('Meet your\nspecialists.')} /></h2></Reveal></div>
      <DragRail label={t('Drag to explore')}>
        {team.map((m, n) => (
          <div key={m.name} className={`shrink-0 w-[64vw] md:w-[22vw] ${n % 2 ? 'mt-10' : ''}`}>
            <Img k={m.img} alt={m.name} className="w-full aspect-[4/5]" />
            <h3 className="h text-2xl mt-4">{m.name}</h3><p className="label !font-medium opacity-60 mt-1">{t(m.role)}</p><p className="text-xs mt-2 opacity-80">{t(m.skill)}</p>
            <Link to={`/booking?therapist=${m.name}`} className="inline-flex items-center gap-2 label mt-3 hover:opacity-60">{t('Book with {name}', { name: m.name })} <ArrowUR /></Link>
          </div>))}
      </DragRail>
    </section>
  )
}

function Reviews() {
  const { t } = useI18n()
  const q = [['The best hour of my month. I walked out lighter.', 'Priya S.', 'Body Massage'], ['Quiet, spotless and genuinely caring. That facial glows for days.', 'Karthika R.', 'Normal Facial'], ['They actually listen. My shoulders thank them.', 'Divya L.', 'Body Massage']]
  const [i, setI] = useState(0)
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % q.length), 5000); return () => clearInterval(t) }, [q.length])
  return (
    <section className="bg-sand px-5 md:px-10 py-28 text-center">
      <span className="label block mb-8">{t('Kind words')}</span>
      <div key={i} className="fade-up max-w-4xl mx-auto min-h-[200px]">
        <p className="h text-[clamp(1.6rem,3.6vw,3.2rem)]">“{t(q[i][0])}”</p>
        <p className="text-xs mt-6 opacity-70">{q[i][1]} · {t(q[i][2])}</p>
      </div>
      <div className="flex justify-center gap-2 mt-8">{q.map((_, n) => <button key={n} aria-label={t('Show review')} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-8 bg-ink' : 'w-1.5 bg-ink/30'}`} />)}</div>
    </section>
  )
}

function Offers() {
  const { t } = useI18n()
  const o = [['First visit', '15% off your first ritual, on any treatment.', 'Claim offer', '/booking'], ['Membership', 'One ritual a month at a better price, with priority booking.', 'Ask us', '/booking'], ['Gift cards', 'Give the gift of calm, for any amount or treatment.', 'Gift a ritual', '/booking']]
  return (
    <section className="bg-[#e5ead5] px-5 md:px-10 pb-28 grid md:grid-cols-3 gap-5">
      {o.map(([title, d, b, to], n) => (
        <Reveal key={title} delay={n * 100}><div className="bg-ink text-sand p-7 h-full flex flex-col justify-between min-h-[250px] hover:-translate-y-1 transition duration-500">
          <div><h3 className="h text-3xl">{t(title)}</h3><p className="text-xs mt-4 opacity-75 max-w-[16rem]">{t(d)}</p></div>
          <Link to={to} className="label mt-8 flex items-center gap-2">{t(b)} <ArrowUR /></Link></div></Reveal>))}
    </section>
  )
}

function Faq() {
  const { t } = useI18n()
  const f = [['Do I need to book in advance?', 'Walk-ins are welcome when there is space, but booking guarantees your time and therapist.'], ['What should I bring?', 'Nothing at all. Robes, towels, slippers and lockers are provided.'], ['Can I reschedule?', 'Yes, free of charge up to 12 hours before your appointment.'], ['Are the products safe for sensitive skin?', 'We use organic, vegan products. Tell us about any allergies and we will adapt.']]
  return (
    <div className="mt-20 border-t border-sand/15">
      <h4 className="label py-6">{t('Questions')}</h4>
      {f.map(([qq, a]) => <details key={qq} className="group border-t border-sand/15 py-4"><summary className="cursor-pointer list-none flex justify-between text-sm">{t(qq)}<span className="group-open:rotate-45 transition">+</span></summary><p className="text-xs opacity-70 mt-3 max-w-lg">{t(a)}</p></details>)}
    </div>
  )
}

function ServiceReviews() {
  const { t } = useI18n()
  const [id, setId] = useState(services[0].id)
  const svc = services.find((s) => s.id === id) ?? services[0]
  return (
    <section id="reviews" className="bg-sand px-5 md:px-10 py-20">
      <span className="label block mb-4">{t('Customer reviews')}</span>
      <label className="flex items-center gap-3 text-xs mb-2"><span className="label">{t('Service')}</span>
        <select value={id} onChange={(e) => setId(e.target.value)} className="bg-transparent border border-ink/25 rounded-full px-3 py-2">
          {services.map((s) => <option key={s.id} value={s.id}>{t(s.name)}</option>)}
        </select></label>
      <div className="max-w-2xl"><ReviewsSection key={svc.id} kind="service" targetId={svc.id} targetName={svc.name} /></div>
    </section>
  )
}

export default function Home() {
  const { t } = useI18n()
  return (
    <main>
      <Marquee /><Hero /><Menu />
      <Bleed k="wide" label="The ritual" title="Calm. Slow. Unhurried." body="Warm oil. Steady hands. The instant a whole room exhales." />
      <Motion /><Moments /><Team /><Ingredients /><Reviews /><ServiceReviews /><Offers /><Visit />
      <footer className="bg-sand px-5 md:px-10 py-16 flex flex-col md:flex-row justify-between gap-8 items-start md:items-end">
        <h2 className="h text-[clamp(2rem,5vw,4.5rem)]"><Lines text={t('Your calm\nis waiting.')} /></h2>
        <div className="text-xs space-y-1"><Link to="/booking" className="inline-block bg-ink text-sand rounded-full px-7 py-4 label mb-4">{t('Book appointment ↗')}</Link><p>{t(spa.address)}</p><Link to="/manager" className="underline opacity-60">{t('Manager view')}</Link><p>© {new Date().getFullYear()} {spa.name} {t(spa.sub)}</p></div>
      </footer>
    </main>
  )
}
