import { useEffect, useMemo, useRef, useState } from 'react'
import { Photo } from '../components/three'
import { useUser, openLogin } from '../../shared/LoginModal'
import { useUiLang } from '../../shared/i18n'
import { addReview, deleteReview, useReviews, type Review } from '../../shared/reviews'
import { getMyOrders, getAppts, ORDER_LAST } from '../account'
import { services } from '../data'
import { Link } from '../SmartLink'

// Logged in  -> "Reviews": review the products you ordered and the services you booked, plus everyone's reviews.
// Logged out -> "Testimonials": a read-only wall of all product and service reviews.

type T = Record<string, string>
const TXT: Record<string, T> = {
  en: { eyeLogged: 'Your reviews', hLogged: 'Tell us how it felt', subLogged: 'Rate the products you ordered and the services you booked. Your words help others choose.', eyeOut: 'Testimonials', hOut: 'Loved by our guests', subOut: 'Real words about our herbal products and salon services.', mine: 'Ready for your review', none: 'Order a product or book a service and it will appear here for review.', product: 'Product', service: 'Service', rate: 'Your rating', share: 'Share your experience', submit: 'Post review', done: 'Thank you! Your review is live.', yours: 'Your review', remove: 'Delete', all: 'All', products: 'Products', services: 'Services', wall: 'What everyone is saying', reviewsN: 'reviews', avg: 'average rating', five: '5-star reviews', loginCta: 'Login to write a review', loginSub: 'Ordered or booked with us? Log in to review it.', err: 'Please write at least a short review.', empty: 'No reviews yet.', shop: 'Shop products', book: 'Book a service' },
  ta: { eyeLogged: 'உங்கள் மதிப்புரைகள்', hLogged: 'உங்கள் அனுபவத்தைச் சொல்லுங்கள்', subLogged: 'நீங்கள் ஆர்டர் செய்த பொருட்களுக்கும் முன்பதிவு செய்த சேவைகளுக்கும் மதிப்பீடு அளியுங்கள்.', eyeOut: 'சான்றுகள்', hOut: 'எங்கள் விருந்தினர்களின் அன்பு', subOut: 'எங்கள் மூலிகைப் பொருட்கள் மற்றும் சலூன் சேவைகள் பற்றிய உண்மையான கருத்துகள்.', mine: 'மதிப்புரைக்குத் தயார்', none: 'பொருள் ஆர்டர் செய்தால் அல்லது சேவை முன்பதிவு செய்தால் இங்கே தோன்றும்.', product: 'பொருள்', service: 'சேவை', rate: 'உங்கள் மதிப்பீடு', share: 'உங்கள் அனுபவத்தைப் பகிருங்கள்', submit: 'மதிப்புரையை இடுக', done: 'நன்றி! உங்கள் மதிப்புரை பதிவாகிவிட்டது.', yours: 'உங்கள் மதிப்புரை', remove: 'நீக்கு', all: 'அனைத்தும்', products: 'பொருட்கள்', services: 'சேவைகள்', wall: 'அனைவரும் என்ன சொல்கிறார்கள்', reviewsN: 'மதிப்புரைகள்', avg: 'சராசரி மதிப்பீடு', five: '5-நட்சத்திர மதிப்புரைகள்', loginCta: 'மதிப்புரை எழுத உள்நுழையவும்', loginSub: 'ஆர்டர் அல்லது முன்பதிவு செய்தீர்களா? உள்நுழைந்து மதிப்புரை எழுதுங்கள்.', err: 'சிறிய மதிப்புரையாவது எழுதுங்கள்.', empty: 'இன்னும் மதிப்புரைகள் இல்லை.', shop: 'பொருட்களை வாங்க', book: 'சேவை முன்பதிவு' },
  hi: { eyeLogged: 'आपकी समीक्षाएँ', hLogged: 'अपना अनुभव बताइए', subLogged: 'आपने जो उत्पाद मँगाए और जो सेवाएँ बुक कीं, उन्हें रेट करें।', eyeOut: 'प्रशंसापत्र', hOut: 'हमारे मेहमानों का प्यार', subOut: 'हमारे हर्बल उत्पादों और सैलून सेवाओं पर असली राय।', mine: 'समीक्षा के लिए तैयार', none: 'उत्पाद ऑर्डर करें या सेवा बुक करें, वह यहाँ दिखेगी।', product: 'उत्पाद', service: 'सेवा', rate: 'आपकी रेटिंग', share: 'अपना अनुभव साझा करें', submit: 'समीक्षा पोस्ट करें', done: 'धन्यवाद! आपकी समीक्षा जुड़ गई।', yours: 'आपकी समीक्षा', remove: 'हटाएँ', all: 'सभी', products: 'उत्पाद', services: 'सेवाएँ', wall: 'सब क्या कह रहे हैं', reviewsN: 'समीक्षाएँ', avg: 'औसत रेटिंग', five: '5-स्टार समीक्षाएँ', loginCta: 'समीक्षा लिखने के लिए लॉगिन करें', loginSub: 'ऑर्डर या बुकिंग की है? लॉगिन करके समीक्षा लिखें।', err: 'कृपया छोटी समीक्षा लिखें।', empty: 'अभी कोई समीक्षा नहीं।', shop: 'उत्पाद खरीदें', book: 'सेवा बुक करें' },
}
const tx = (ui: string): T => ({ ...TXT.en, ...(TXT[ui] ?? {}) })

const POOL = ['facial', 'facial2', 'back', 'close', 'foot', 'foot2', 'reception', 'wide']
const imgFor = (r: Review) => (r.kind === 'service' ? services.find((s) => s.id === r.targetId)?.img : undefined) ?? POOL[[...r.targetId].reduce((n, c) => n + c.charCodeAt(0), 0) % POOL.length]

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return <span aria-label={`${n} / 5`} style={{ color: '#c9a96a', fontSize: size, letterSpacing: 2 }}>{'★'.repeat(n)}<span style={{ opacity: 0.25 }}>{'★'.repeat(5 - n)}</span></span>
}

/** Fades / slides children in as they scroll into view. */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`rv-reveal ${on ? 'rv-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Count({ to, dec = 0 }: { to: number; dec?: number }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf = 0; const t0 = performance.now()
    const step = (t: number) => { const p = Math.min(1, (t - t0) / 1200); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [to])
  return <>{v.toFixed(dec)}</>
}

function Wall({ list, t, ui }: { list: Review[]; t: T; ui: string }) {
  const [f, setF] = useState<'all' | 'product' | 'service'>('all')
  const shown = list.filter((r) => f === 'all' || r.kind === f)
  const chips: ['all' | 'product' | 'service', string][] = [['all', t.all], ['product', t.products], ['service', t.services]]
  return (
    <section className="px-5 md:px-10 py-16">
      <Reveal><h2 className="h text-3xl md:text-4xl text-center">{t.wall}</h2></Reveal>
      <div className="flex gap-3 justify-center mt-8 flex-wrap">
        {chips.map(([k, l]) => <button key={k} onClick={() => setF(k)} className={`label px-5 py-2 rounded-full border transition ${f === k ? 'bg-ink text-sand border-ink' : 'border-ink/20 hover:border-ink'}`}>{l}</button>)}
      </div>
      {shown.length === 0 && <p className="text-center opacity-60 mt-10">{t.empty}</p>}
      <div className="mt-10 max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-5">
        {shown.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 90} className="mb-5 break-inside-avoid">
            <article className="rv-card bg-white rounded-2xl overflow-hidden shadow-sm border border-ink/5">
              <div className="relative h-36 overflow-hidden">
                <Photo k={imgFor(r)} className="rv-zoom h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <span className="label absolute left-4 top-3 bg-sand/90 text-ink rounded-full px-3 py-1 text-[10px]">{r.kind === 'product' ? t.product : t.service}</span>
                <span className="absolute left-4 bottom-3 right-4 text-sand text-sm font-medium truncate">{r.targetName}</span>
              </div>
              <div className="p-5">
                <Stars n={r.rating} />
                <p className="mt-3 text-[15px] leading-relaxed">“{r.text}”</p>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-gold/25 text-[#8c6d35] font-semibold">{r.name.charAt(0).toUpperCase()}</span>
                  <div><strong className="block leading-tight">{r.name}</strong><span className="opacity-50 text-xs">{new Date(r.at).toLocaleDateString(ui === 'en' ? 'en-IN' : ui, { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Composer({ item, t, uid, name }: { item: { kind: 'product' | 'service'; id: string; name: string; img: string }; t: T; uid: string; name: string }) {
  const all = useReviews()
  const mine = all.find((r) => r.uid === uid && r.kind === item.kind && r.targetId === item.id)
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState(false)
  const submit = () => {
    if (text.trim().length < 3) { setErr(t.err); return }
    addReview({ kind: item.kind, targetId: item.id, targetName: item.name, name, rating, text: text.trim(), uid })
    setText(''); setErr(''); setOk(true)
  }
  return (
    <div className="bg-white rounded-2xl border border-ink/5 shadow-sm overflow-hidden flex flex-col sm:flex-row">
      <div className="relative sm:w-44 h-40 sm:h-auto shrink-0 overflow-hidden"><Photo k={item.img} className="rv-zoom h-full w-full" /><span className="label absolute left-3 top-3 bg-sand/90 rounded-full px-3 py-1 text-[10px]">{item.kind === 'product' ? t.product : t.service}</span></div>
      <div className="p-5 flex-1">
        <h3 className="font-medium text-lg">{item.name}</h3>
        {mine ? (
          <div className="mt-3">
            <span className="label opacity-60">{t.yours}</span>
            <div className="mt-1"><Stars n={mine.rating} /></div>
            <p className="mt-2 text-[15px]">“{mine.text}”</p>
            {ok && <p role="status" className="mt-2 text-sm text-green-700">{t.done}</p>}
            <button onClick={() => { deleteReview(mine.id); setOk(false) }} className="label mt-3 underline opacity-60 hover:opacity-100">{t.remove}</button>
          </div>
        ) : (
          <div className="mt-3 grid gap-3">
            <div role="radiogroup" aria-label={t.rate} className="flex items-center gap-1"><span className="text-sm mr-2 opacity-70">{t.rate}</span>
              {[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n}`} onClick={() => setRating(n)} className="rv-star text-2xl leading-none" style={{ color: n <= rating ? '#c9a96a' : '#c9c4b8' }}>★</button>)}
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={400} placeholder={t.share} aria-label={t.share} className="w-full min-h-[84px] rounded-xl border border-ink/15 bg-sand/50 p-3 text-[15px] outline-none focus:border-gold" />
            {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
            <button onClick={submit} className="justify-self-start bg-ink text-sand rounded-full px-7 py-3 label hover:bg-stone transition">{t.submit}</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Reviews() {
  const [ui] = useUiLang()
  const t = tx(ui)
  const user = useUser()
  const all = useReviews()
  const stats = useMemo(() => ({ n: all.length, avg: all.length ? all.reduce((s, r) => s + r.rating, 0) / all.length : 0, five: all.filter((r) => r.rating === 5).length }), [all])

  // What this customer has ordered / booked.
  const items = useMemo(() => {
    if (!user) return []
    const out: { kind: 'product' | 'service'; id: string; name: string; img: string }[] = []
    const seen = new Set<string>()
    for (const o of getMyOrders()) {
      if (o.cancelled || o.stage < ORDER_LAST) continue // review only after the order is delivered
      for (const i of o.items) { const k = 'p' + i.pid; if (!seen.has(k)) { seen.add(k); out.push({ kind: 'product', id: i.pid, name: i.name, img: i.img }) } }
    }
    for (const a of getAppts()) {
      if (a.status !== 'Completed') continue // review only after the service is completed
      const svc = services.find((s) => s.name === a.service)
      const id = svc?.id ?? a.service.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const k = 's' + id; if (!seen.has(k)) { seen.add(k); out.push({ kind: 'service', id, name: a.service, img: a.img }) }
    }
    return out
  }, [user])

  const logged = !!user
  const name = user ? (user.name?.trim() || 'Guest ' + user.phone.slice(-4)) : ''
  return (
    <main className="bg-[#eeede9] min-h-screen overflow-x-clip">
      <section className="relative pt-36 pb-20 px-5 text-center bg-ink text-sand overflow-hidden">
        <div className="rv-orb rv-orb1" /><div className="rv-orb rv-orb2" />
        <div className="relative max-w-2xl mx-auto">
          <span className="label text-gold rv-rise" style={{ animationDelay: '0ms' }}>{logged ? t.eyeLogged : t.eyeOut}</span>
          <h1 className="h text-4xl md:text-6xl mt-4 rv-rise" style={{ animationDelay: '120ms' }}>{logged ? t.hLogged : t.hOut}</h1>
          <p className="mt-5 opacity-75 rv-rise" style={{ animationDelay: '240ms' }}>{logged ? t.subLogged : t.subOut}</p>
          <div className="mt-10 flex justify-center gap-8 md:gap-14 rv-rise" style={{ animationDelay: '360ms' }}>
            <div><div className="h text-4xl text-gold"><Count to={stats.n} /></div><div className="label opacity-60 mt-1">{t.reviewsN}</div></div>
            <div><div className="h text-4xl text-gold"><Count to={stats.avg} dec={1} /></div><div className="label opacity-60 mt-1">{t.avg}</div></div>
            <div><div className="h text-4xl text-gold"><Count to={stats.five} /></div><div className="label opacity-60 mt-1">{t.five}</div></div>
          </div>
          {!logged && <button onClick={() => openLogin()} className="mt-10 bg-gold text-ink rounded-full px-8 py-4 label hover:bg-sand transition rv-rise" style={{ animationDelay: '480ms' }}>{t.loginCta}</button>}
        </div>
      </section>

      <div className="rv-marquee" aria-hidden>
        <div className="rv-track">{[...POOL, ...POOL].map((k, i) => <img key={i} src={`/img/${k}.jpg`} alt="" loading="lazy" />)}</div>
      </div>

      {logged && (
        <section className="px-5 md:px-10 pt-16 max-w-5xl mx-auto">
          <Reveal><h2 className="h text-3xl">{t.mine}</h2></Reveal>
          {items.length === 0 ? (
            <Reveal><div className="mt-6 bg-white rounded-2xl p-8 text-center border border-ink/5"><p className="opacity-70">{t.none}</p>
              <div className="mt-5 flex gap-3 justify-center flex-wrap"><Link to="/products/" className="bg-ink text-sand rounded-full px-6 py-3 label">{t.shop}</Link><Link to="/services" className="border border-ink rounded-full px-6 py-3 label">{t.book}</Link></div></div></Reveal>
          ) : (
            <div className="mt-6 grid gap-5">{items.map((it, i) => <Reveal key={it.kind + it.id} delay={i * 70}><Composer item={it} t={t} uid={user!.id} name={name} /></Reveal>)}</div>
          )}
        </section>
      )}

      <Wall list={all} t={t} ui={ui} />

      {!logged && (
        <Reveal><section className="text-center px-5 pb-24"><p className="opacity-70">{t.loginSub}</p>
          <button onClick={() => openLogin()} className="mt-5 bg-ink text-sand rounded-full px-8 py-4 label hover:bg-stone transition">{t.loginCta}</button></section></Reveal>
      )}
    </main>
  )
}
