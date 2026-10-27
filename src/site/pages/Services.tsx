import { servicePricesVisible } from '../data'
import { useSiteConfig, promoPrice } from '../../shared/siteConfig'
import ReviewsSection from '../../shared/ReviewsSection'
import { useEffect, useState } from 'react'
import { Link } from '../SmartLink'
import { Reveal, DragRail, ArrowUR, Lines } from '../components/ui'
import { useI18n, COUNT_TREATMENTS } from '../i18n-site'
import { OfferStrip } from '../../shared/Offers'
import { useUiLang } from '../../shared/i18n'
import { authT } from '../../shared/auth-text'
import { services, spa, team, img, money } from '../data'

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
    <section className="relative w-full overflow-hidden bg-ink pt-20" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative w-full aspect-[9/5] min-h-[260px] max-h-[620px]">
        {HERO_SLIDES.map((s, n) => (
          <img key={s.src} src={s.src} alt={s.alt} draggable={false} loading={n === 0 ? 'eager' : 'lazy'} className={`absolute inset-0 h-full w-full object-cover object-[50%_30%] ${n === i ? 'opacity-100 scale-[1.06]' : 'opacity-0 scale-100'}`} style={{ transition: 'opacity 700ms ease, transform 6000ms ease-out' }} />
        ))}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {HERO_SLIDES.map((s, n) => <button key={s.src} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} className={`h-2 rounded-full transition-all ${n === i ? 'w-7 bg-sand' : 'w-2 bg-sand/50'}`} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ s, n }: { s: (typeof services)[number]; n: number }) {
  const { t } = useI18n()
  const [ui] = useUiLang()
  return (
    <article style={{ animationDelay: `${n * 50}ms` }} className="fade-up group flex h-full flex-col">
      <div className="overflow-hidden relative"><Img k={s.img} alt={t(s.name)} className="w-full aspect-[4/3] group-hover:scale-105 transition duration-700" />
        {(s.popular || s.signature) && (
          <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
            {s.popular && <span className="label bg-sand px-3 py-1 rounded-full shadow">{t('Most loved')}</span>}
            {s.signature && <span className="label bg-ink text-sand px-3 py-1 rounded-full shadow">{authT('Our signature service', ui)}</span>}
          </div>
        )}
        {s.promo && <span className="label absolute top-3 right-3 bg-gold text-ink px-3 py-1 rounded-full shadow font-bold">{t(s.promo)}</span>}</div>
      <div className="flex justify-between gap-4 mt-4"><h3 className="h text-xl">{t(s.name)}</h3>{servicePricesVisible() && <span className="text-sm font-medium whitespace-nowrap text-right">{s.basePrice ? <s className="opacity-50 mr-2 font-normal">{money(s.basePrice)}</s> : null}{money(s.price)}{s.promo && <span className="label block !text-[10px] text-gold">{t(s.promo)}</span>}</span>}</div>
      <p className="label !font-medium opacity-60 mt-2">{t(s.category)}  {s.duration} {t('min')}</p>
      <p className="text-xs mt-3 opacity-80">{t(s.desc)}</p>
      {s.care && <p className="text-xs mt-2 opacity-70"><span className="label !font-medium">{t('Before your visit')}:</span> {t(s.care)}</p>}
      <OfferStrip scope="services" subtotal={s.price} verb="Book by" cta={{ label: authT('Book with this offer', ui), Link, to: (o) => `/booking?service=${s.id}&coupon=${o.code}` }} />
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
      <div className="flex flex-col w-full max-w-6xl max-h-[92vh] bg-[#FFFFFF] shadow-2xl" onClick={(e) => e.stopPropagation()}>
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
    <section id="menu" className="bg-[#FFFFFF] px-5 md:px-10 pt-24 pb-24 scroll-mt-0">
      <Reveal>
        <span className="label block mb-4">{t('The ritual menu')}</span>
        <h2 className="h text-[clamp(2.4rem,5.5vw,5rem)]">{t('Services & Consulting')}</h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {big.map((c, n) => (
          <Reveal key={c.key} delay={n * 150} className="h-full">
          <button onClick={() => setOpen(c.key)} className="group w-full text-left bg-[#FBEDEB]/60 border border-ink/15 hover:border-ink hover:-translate-y-1 hover:shadow-xl transition duration-500">
            <div className="overflow-hidden relative">
              {c.src ? <img src={c.src} alt={t(c.title)} loading="lazy" draggable={false} className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition duration-700" /> : <Img k={c.k} alt={t(c.title)} className="w-full aspect-[16/9] group-hover:scale-105 transition duration-700" />}
            </div>
            <div className="p-6 flex items-end justify-between gap-4">
              <div><h3 className="h text-3xl">{t(c.title)}</h3><p className="text-xs mt-3 opacity-75 max-w-sm">{t(c.desc)}</p><p className="label opacity-60 mt-3">{c.count}</p></div>
              <span className="label flex items-center gap-2 whitespace-nowrap">{t(c.btn)} <ArrowUR /></span>
            </div>
          </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <Reveal>
          <span className="label block mb-4">{t('Body Massage')} &amp; {t('Consultation')}</span>
          <h3 className="h text-[clamp(1.8rem,3.4vw,3rem)]">{t('Massage & Consultation')}</h3>
        </Reveal>
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
  const [ui] = useUiLang()
  const pk = useSiteConfig().bridalPackages
  return (
    <div>
      <p className="text-xs max-w-xl opacity-70">{t('Pick a package, choose a date, and our team confirms your booking after a quick review.')} {t('Available at our parlour or at your home.')}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {pk.map((b) => (
          <article key={b.id} className={`flex flex-col border p-6 ${b.popular ? 'bg-ink text-sand border-ink' : 'bg-[#FBEDEB]/60 border-ink/15'}`}>
            {b.popular && <span className="label mb-3 text-gold">{t('Most loved')}</span>}
            <h3 className="h text-2xl">{t(b.name)}</h3>
            <p className="label opacity-60 mt-2">{b.duration} {t('min')}{servicePricesVisible() && <>  {(b.discountValue ?? 0) > 0 && <s className="opacity-60 mr-1">{money(b.price)}</s>}{money(promoPrice(b.price, b.discountType, b.discountValue))}{(b.discountValue ?? 0) > 0 && <span className="text-gold">  {t(b.discountType === 'flat' ? `${b.discountValue} off` : `${b.discountValue}% off`)}</span>}</>}</p>
            <ul className="mt-5 space-y-2 text-xs flex-1">{b.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden></span><span>{t(f)}</span></li>)}</ul>
            {b.care && <p className="text-xs mt-4 opacity-70"><span className="label !font-medium">{t('Before your visit')}:</span> {t(b.care)}</p>}
            <OfferStrip scope="services" dark={b.popular} subtotal={promoPrice(b.price, b.discountType, b.discountValue)} verb="Book by" cta={{ label: authT('Book with this offer', ui), Link, to: (o) => `/booking?service=${b.id}&coupon=${o.code}` }} />
            <Link to={`/booking?service=${b.id}`} className={`inline-flex items-center justify-center gap-2 mt-6 rounded-full px-5 py-3 label transition ${b.popular ? 'bg-sand text-ink hover:opacity-90' : 'bg-ink text-sand hover:bg-stone'}`}>{t('Book this package')} <ArrowUR /></Link>
          </article>
        ))}
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
          <Reveal key={m.name} delay={n * 120} className={`shrink-0 w-[64vw] md:w-[22vw] ${n % 2 ? 'mt-10' : ''}`}>
            <div className="overflow-hidden"><Img k={m.img} alt={m.name} className="w-full aspect-[4/5] hover:scale-105 transition duration-700" /></div>
            <h3 className="h text-2xl mt-4">{m.name}</h3><p className="label !font-medium opacity-60 mt-1">{t(m.role)}</p><p className="text-xs mt-2 opacity-80">{t(m.skill)}</p>
            <Link to={`/booking?therapist=${m.name}`} className="inline-flex items-center gap-2 label mt-3 hover:opacity-60">{t('Book with {name}', { name: m.name })} <ArrowUR /></Link>
          </Reveal>))}
      </DragRail>
    </section>
  )
}

function ServiceReviews() {
  const { t } = useI18n()
  const [id, setId] = useState(services[0].id)
  const svc = services.find((s) => s.id === id) ?? services[0]
  return (
    <section id="reviews" className="bg-sand px-5 md:px-10 py-20">
      <Reveal>
      <span className="label block mb-4">{t('Customer reviews')}</span>
      <label className="flex items-center gap-3 text-xs mb-2"><span className="label">{t('Service')}</span>
        <select value={id} onChange={(e) => setId(e.target.value)} className="bg-transparent border border-ink/25 rounded-full px-3 py-2">
          {services.map((s) => <option key={s.id} value={s.id}>{t(s.name)}</option>)}
        </select></label>
      <div className="max-w-2xl"><ReviewsSection key={svc.id} kind="service" targetId={svc.id} targetName={svc.name} /></div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  const { t } = useI18n()
  return (
    <main className="svc-page">
      <Hero /><Menu />
      <Team /><ServiceReviews />
      <footer className="bg-sand px-5 md:px-10 py-16 flex flex-col md:flex-row md:justify-end gap-8 items-start md:items-end">
        <Reveal>
        <div className="text-xs space-y-1"><Link to="/booking" className="inline-block bg-ink text-sand rounded-full px-7 py-4 label mb-4">{t('Book appointment ↗')}</Link><p>{t(spa.address)}</p><Link to="/manager" className="underline opacity-60">{t('Manager view')}</Link><p>© {new Date().getFullYear()} {spa.name} {t(spa.sub)}</p></div>
        </Reveal>
      </footer>
    </main>
  )
}
