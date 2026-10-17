import { useEffect, useState, type FormEvent } from 'react'
import { requireLogin, useUser } from '../../shared/LoginModal'
import { Link } from '../SmartLink'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { services, team, spa, categories, money, img, servicePricesVisible, type Category } from '../data'
import { SLOTS, slotOk, freeSpecialists, dayHasSlot, type Channel } from '../store'
import { api, type BookingMode } from '../../api'
import Calendar from '../components/Calendar'
import { useI18n, fmtDate } from '../i18n-site'
import { useSlotLock, mmss } from '../useSlotLock'
import { useUiLang } from '../../shared/i18n'
import { authT } from '../../shared/auth-text'
import { CouponPicker } from '../../shared/Offers'

const channels: Channel[] = ['SMS', 'WhatsApp', 'SMS + WhatsApp']
function HoldTimer({ msLeft, dark }: { msLeft: number; dark?: boolean }) {
  const { t } = useI18n(), urgent = msLeft <= 60_000
  const pct = Math.max(0, Math.min(100, (msLeft / api.booking.LOCK_TTL_MS) * 100))
  return (
    <div role="timer" className={`border px-4 py-3 text-xs ${dark ? 'border-sand/30' : 'border-ink/25'} ${urgent ? (dark ? 'text-red-300' : 'text-red-700') : ''}`}>
      <div className="flex items-center justify-between gap-3"><span className="label">{t('Slot held for you')}</span><span className="h text-2xl tabular-nums" aria-label={t('Time left to confirm')}>{mmss(msLeft)}</span></div>
      <div className={`h-1 mt-2 ${dark ? 'bg-sand/20' : 'bg-ink/10'}`}><div className="h-full bg-current transition-[width] duration-1000 ease-linear" style={{ width: pct + '%' }} /></div>
      <p className="mt-2 opacity-70" aria-live="polite">{urgent ? t('Hurry, your held slot ends soon.') : t('If the timer ends, the slot is released for other customers.')}</p>
    </div>
  )
}
const MODES: BookingMode[] = ['parlour', 'home']
const fld = 'w-full bg-transparent border-b border-ink/30 py-3 text-sm outline-none focus:border-ink'
const chip = (on: boolean) => `px-4 py-2 rounded-full border text-xs transition ${on ? 'bg-ink text-sand border-ink' : 'border-ink/25 hover:border-ink'} disabled:opacity-25 disabled:line-through disabled:cursor-not-allowed`

export default function Booking() {
  const [sp] = useSearchParams(); const nav = useNavigate()
  const { t, lang } = useI18n()
  const mins = (n: number) => `${n} ${t('min')}`
  const who = team.find((m) => m.name === sp.get('therapist'))
  const first = services.find((s) => s.id === sp.get('service')) ?? (who ? services.find((s) => who.categories.includes(s.category)) : undefined)
  const [f, setF] = useState({ cat: (first?.category ?? 'All') as 'All' | Category, service: first?.id ?? services[0].id, date: '', time: '', specialist: who && first ? who.name : 'auto', guests: 1, name: '', phone: '', email: '', notes: '', remind: true, channel: 'WhatsApp' as Channel, mode: 'parlour' as BookingMode, line1: '', city: '', state: '', pin: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const user = useUser()
  const { lock: held, msLeft } = useSlotLock()
  // When the 5 minutes run out the chosen time is cleared and the customer picks again.
  useEffect(() => {
    if (f.time && !api.booking.getMyLock()) { setF((p) => ({ ...p, time: '', specialist: 'auto' })); setErr((x) => ({ ...x, time: 'Your held slot expired. Please pick a time again.' })) }
  }, [msLeft, f.time])
  // After login, fill the contact details from the customer's account.
  useEffect(() => { if (user) setF((x) => { const a = user.addresses[0]; return { ...x, name: x.name || user.name, phone: x.phone || user.phone, line1: x.line1 || a?.line1 || '', city: x.city || a?.city || '', state: x.state || a?.state || '', pin: x.pin || a?.pin || '' } }) }, [user])
  // Leaving the page gives the held slot back.
  useEffect(() => () => api.booking.releaseLock(), [])
  const svc = services.find((s) => s.id === f.service)!
  const list = services.filter((s) => (f.cat === 'All' || s.category === f.cat) && (f.mode === 'parlour' || api.catalog.homeServiceAvailable(s.id)))
  const qualified = team.filter((m) => m.categories.includes(svc.category))
  const free = f.date && f.time ? freeSpecialists(svc.category, f.date, f.time, svc.duration, undefined, f.mode) : []
  const review = api.booking.needsReview(f.mode, svc.category)
  const base = svc.price * f.guests
  // Coupon (e.g. FIRSTSERVICE10 = 10% off a customer's first service). It is re-checked every render, so changing the service or guests updates the discount.
  const [ui] = useUiLang()
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState('')
  const [cnote, setCnote] = useState<{ ok: boolean; text: string } | null>(null)
  const cres = applied ? api.offers.validateCoupon(applied, base, 'services') : null
  const discount = cres && cres.ok ? cres.discount : 0
  const total = Math.max(0, base - discount)
  const REASON: Record<string, string> = { empty: 'Enter a coupon code.', invalid: 'Invalid coupon code.', inactive: 'Invalid coupon code.', early: 'This coupon is not active yet.', expired: 'This coupon has expired.', scope: 'This coupon does not apply to service bookings.', 'used-up': 'This coupon has been fully used.', login: 'Please log in to use this coupon.', 'not-first-order': 'This coupon is only for your first product order.', 'not-first-service': 'This coupon is only for your first service booking.', 'need-booking': 'Book a service first to use this coupon.', 'has-order': 'This coupon is only for customers who have not bought products yet.' }
  const applyCoupon = (c: string = code) => requireLogin(() => {
    const r = api.offers.validateCoupon(c, base, 'services')
    if (r.ok) { setCode(r.code); setApplied(r.code); setCnote({ ok: true, text: authT('Coupon {code} applied. You save {amount}.', ui, { code: r.code, amount: money(r.discount) }) }) }
    else { setApplied(''); setCnote({ ok: false, text: r.reason === 'min' ? authT('Add items worth {amount} more to use this coupon.', ui, { amount: money((r.min ?? 0) - base) }) : authT(REASON[r.reason] ?? 'Invalid coupon code.', ui) }) }
  })
  const clearCoupon = () => { setApplied(''); setCode(''); setCnote(null) }
  // Arriving from a service card's offer ("Book with this offer") puts that code in the box and applies it once the customer is logged in.
  const urlCoupon = (sp.get('coupon') || '').toUpperCase()
  useEffect(() => { if (urlCoupon && !applied) { setCode(urlCoupon); if (user) applyCoupon(urlCoupon) } }, [urlCoupon, user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k: string, v: string | number | boolean) => setF((p) => {
    const n = { ...p, [k]: v } as typeof p
    if (k === 'mode') { const l = services.filter((s) => (p.cat === 'All' || s.category === p.cat) && (v === 'parlour' || api.catalog.homeServiceAvailable(s.id))); if (!l.some((s) => s.id === n.service)) n.service = (l[0] ?? services.find((s) => api.catalog.homeServiceAvailable(s.id))!).id; if (!l.length) n.cat = 'All' }
    if (k === 'cat') { const l = services.filter((s) => v === 'All' || s.category === v); if (!l.some((s) => s.id === n.service)) n.service = l[0].id }
    if (['cat', 'service', 'guests', 'date', 'mode'].includes(k)) { n.time = ''; n.specialist = 'auto'; api.booking.releaseLock() }
    if (k === 'time') n.specialist = 'auto'
    return n
  })

  // Picking a time (or a specialist) holds that slot for 5 minutes; the countdown screen comes in the next step.
  const hold = (time: string, specialist: string) => {
    const r = api.booking.acquireLock({ serviceId: svc.id, category: svc.category, date: f.date, time, duration: svc.duration, guests: f.guests, specialist, mode: f.mode })
    if (!r.ok) { setErr((x) => ({ ...x, time: 'That slot was just taken. Please pick another.' })); setF((p) => ({ ...p, time: '', specialist: 'auto' })); return }
    setErr((x) => { const { time: _t, ...rest } = x; return rest }); setF((p) => ({ ...p, time, specialist }))
  }
  const submit = (e: FormEvent) => { e.preventDefault(); requireLogin(run) }
  const run = () => {
    const x: Record<string, string> = {}
    if (!f.date) x.date = 'Pick a date'
    if (!f.time) x.time = 'Pick a time'
    if (f.name.trim().length < 2) x.name = 'Enter your name'
    if (!/^[+\d\s-]{8,15}$/.test(f.phone)) x.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email'
    if (f.mode === 'home') {
      if (f.line1.trim().length < 5) x.line1 = 'Enter your full address'
      if (!f.city.trim() || !f.state.trim()) x.city = 'Enter city and state'
      if (!/^\d{6}$/.test(f.pin.trim())) x.pin = 'Enter a valid 6-digit PIN code'
    }
    const lock = api.booking.getMyLock()
    if (f.time && (!lock || lock.date !== f.date || lock.time !== f.time)) { x.time = 'Your held slot expired. Please pick a time again.'; setF((p) => ({ ...p, time: '' })) }
    setErr(x); if (Object.keys(x).length || !lock) return
    if (applied && !(cres && cres.ok)) { setCnote({ ok: false, text: authT(cres && !cres.ok ? (REASON[cres.reason] ?? 'Invalid coupon code.') : 'Invalid coupon code.', ui) }); setApplied(''); return }
    const res = api.booking.submitBooking({ serviceId: svc.id, serviceName: svc.name, category: svc.category, duration: svc.duration, date: f.date, time: f.time, specialists: [], guests: f.guests, name: f.name, phone: f.phone, email: f.email, notes: f.notes, channel: f.channel, remind: f.remind, total, mode: f.mode, coupon: applied || undefined, discount: discount || undefined,
      address: f.mode === 'home' ? { line1: f.line1.trim(), city: f.city.trim(), state: f.state.trim(), pin: f.pin.trim() } : undefined }, lock.id)
    if (!res.ok) { setErr({ time: 'Your held slot expired. Please pick a time again.' }); setF((p) => ({ ...p, time: '' })); return }
    if (applied) api.offers.redeemCoupon(applied)
    sessionStorage.setItem('serene-last', res.booking.ref); nav('/success')
  }
  const E = ({ k }: { k: string }) => err[k] ? <p className="text-[11px] text-red-700 mt-2">{t(err[k])}</p> : null

  return (
    <main className="pt-28 px-5 md:px-10 pb-20 min-h-screen">
      <span className="label block mb-4">{t('Women\'s luxury salon')}</span>
      <h1 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{t('Book your appointment.')}</h1>
      <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_380px] gap-12 mt-12">
        <div className="space-y-10">
          <section><h3 className="label mb-3">{t('Where would you like your service?')}</h3>
            <div className="grid sm:grid-cols-2 gap-3">{MODES.map((m) => <button key={m} type="button" aria-pressed={f.mode === m} onClick={() => set('mode', m)} className={`text-left border px-5 py-4 transition ${f.mode === m ? 'bg-ink text-sand border-ink' : 'border-ink/25 hover:border-ink'}`}>
              <span className="h text-xl block">{t(m === 'home' ? 'Home Service' : 'Parlour')}</span><span className="text-[11px] opacity-70">{t(m === 'home' ? 'At your home' : 'At our parlour')}</span></button>)}</div>
            {review && <p className="text-[11px] opacity-70 mt-3">{t(f.mode === 'home' ? 'Home Service requests are checked by our team before they are confirmed.' : 'Bridal bookings are checked by our team before they are confirmed.')}</p>}
            {f.mode === 'home' && <p className="text-[11px] opacity-50 mt-1">{t('Some services are available at the parlour only.')}</p>}</section>
          <section><h3 className="label mb-3">{t('Service')}</h3>
            <div className="flex flex-wrap gap-2 mb-4">{categories.map((c) => <button key={c} type="button" onClick={() => set('cat', c)} className={chip(f.cat === c)}>{t(c)}</button>)}</div>
            {f.cat === 'Bridal Makeup' ? (
              <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t('Choose a package')}>{list.map((s) => (
                <button key={s.id} type="button" role="radio" aria-checked={f.service === s.id} onClick={() => set('service', s.id)} className={`text-left border p-4 transition ${f.service === s.id ? 'bg-ink text-sand border-ink' : 'border-ink/25 hover:border-ink'}`}>
                  <span className="h text-lg block">{t(s.name.replace('Bridal Makeup – ', ''))}</span>
                  <span className="label opacity-70 block mt-1">{mins(s.duration)}{servicePricesVisible() ? ` · ${money(s.price)}` : ''}</span>
                  <span className="block text-[11px] opacity-80 mt-2">{s.desc.split(' · ').map((x) => t(x)).join(' · ')}</span></button>))}</div>
            ) : (
            <select value={f.service} onChange={(e) => set('service', e.target.value)} className={fld + ' bg-sand'}>
              {list.map((s) => <option key={s.id} value={s.id}>{t(s.name)} · {mins(s.duration)}{servicePricesVisible() ? ` · ${money(s.price)}` : ''}</option>)}</select>
            )}</section>
          <section className="grid md:grid-cols-[auto_1fr] gap-10">
            <div><h3 className="label mb-3">{t('Date')}</h3>
              <Calendar value={f.date} onChange={(d) => set('date', d)} isOpen={(d) => dayHasSlot(d, svc.category, svc.duration, f.guests, f.mode)} /><E k="date" /></div>
            <div><h3 className="label mb-3">{t('Time')}</h3>
              {!f.date ? <p className="text-xs opacity-60">{t('Select a date to see live availability.')}</p> :
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">{SLOTS.map((slot) => {
                  const n = freeSpecialists(svc.category, f.date, slot, svc.duration, undefined, f.mode).length, off = !slotOk(f.date, slot, svc.duration) || n < f.guests
                  return <button key={slot} type="button" disabled={off} onClick={() => requireLogin(() => hold(slot, 'auto'))} className={chip(f.time === slot) + ' !rounded-2xl !py-3'}>{slot}<span className="block text-[10px] opacity-60 no-underline">{off ? t('full') : t('{n} free', { n })}</span></button>
                })}</div>}
              <E k="time" />
              {f.time && held && <div className="mt-4"><HoldTimer msLeft={msLeft} /></div>}
              <div className="flex items-center gap-4 mt-8"><h3 className="label">{t('Guests')}</h3>
                <button type="button" aria-label={t('Decrease guests')} onClick={() => set('guests', Math.max(1, f.guests - 1))} className="h-9 w-9 rounded-full border border-ink/30">−</button><span className="w-4 text-center">{f.guests}</span>
                <button type="button" aria-label={t('Increase guests')} onClick={() => set('guests', Math.min(4, f.guests + 1))} className="h-9 w-9 rounded-full border border-ink/30">+</button></div></div>
          </section>
          <section><h3 className="label mb-3">{t('Specialist')}</h3>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => (f.time ? hold(f.time, 'auto') : set('specialist', 'auto'))} className={chip(f.specialist === 'auto')}>{t('Auto-assign')}</button>
              {qualified.map((m) => <button key={m.name} type="button" disabled={f.guests > 1 || (!!f.time && !free.some((x) => x.name === m.name))} onClick={() => (f.time ? hold(f.time, m.name) : set('specialist', m.name))} className={chip(f.specialist === m.name)}>{m.name}<span className="opacity-60"> · {t(m.role)}</span></button>)}</div>
            <p className="text-[11px] opacity-60 mt-3">{f.guests > 1 ? t('Groups are assigned automatically.') : f.time ? (f.specialist === 'auto' ? t('We will assign {name}.', { name: free[0]?.name ?? t('the next available specialist') }) : t('{name} is confirmed for you.', { name: f.specialist })) : t('Pick a time to see who is free.')}</p></section>
          <section><h3 className="label mb-3">{t('Your details')}</h3><div className="grid sm:grid-cols-2 gap-8">
            <div><input placeholder={t('Full name')} value={f.name} onChange={(e) => set('name', e.target.value)} className={fld} /><E k="name" /></div>
            <div><input placeholder={t('Phone (for reminders)')} value={f.phone} onChange={(e) => set('phone', e.target.value)} className={fld} /><E k="phone" /></div>
            <div className="sm:col-span-2"><input type="email" placeholder={t('Email')} value={f.email} onChange={(e) => set('email', e.target.value)} className={fld} /><E k="email" /></div>
            <textarea placeholder={t('Allergies, medical notes or preferences (optional)')} rows={2} value={f.notes} onChange={(e) => set('notes', e.target.value)} className={fld + ' sm:col-span-2'} /></div></section>
          {f.mode === 'home' && <section><h3 className="label mb-3">{t('Service address')}</h3><div className="grid sm:grid-cols-2 gap-8">
            <div className="sm:col-span-2"><input placeholder={t('House no., street, area')} value={f.line1} onChange={(e) => set('line1', e.target.value)} className={fld} /><E k="line1" /></div>
            <div><input placeholder={t('City')} value={f.city} onChange={(e) => set('city', e.target.value)} className={fld} /><E k="city" /></div>
            <div><input placeholder={t('State')} value={f.state} onChange={(e) => set('state', e.target.value)} className={fld} /></div>
            <div><input inputMode="numeric" maxLength={6} placeholder={t('PIN code')} value={f.pin} onChange={(e) => set('pin', e.target.value.replace(/\D/g, ''))} className={fld} /><E k="pin" /></div></div></section>}
          <section><h3 className="label mb-3">{t('Reminders')}</h3>
            <label className="flex items-center gap-3 text-sm cursor-pointer"><input type="checkbox" checked={f.remind} onChange={(e) => set('remind', e.target.checked)} className="accent-ink h-4 w-4" />{t('Send me automatic booking reminders')}</label>
            {f.remind && <><div className="flex flex-wrap gap-2 mt-4">{channels.map((c) => <button key={c} type="button" onClick={() => set('channel', c)} className={chip(f.channel === c)}>{c}</button>)}</div>
              <p className="text-[11px] opacity-60 mt-3">{t('You will get a confirmation now, then reminders 24 hours and 2 hours before your visit via {channel}.', { channel: f.channel })}</p></>}</section>
        </div>
        <aside className="lg:sticky lg:top-24 self-start bg-ink text-sand">
          <img src={img(svc.img)} alt="" className="w-full aspect-[16/10] object-cover" />
          <div className="p-6 space-y-3 text-xs">
            <h3 className="h text-2xl">{t(svc.name)}</h3><p className="opacity-70">{t(svc.category)} · {mins(svc.duration)}</p>
            <div className="border-t border-sand/20 pt-3 space-y-2">
              {[['Place', f.mode === 'home' ? t('Home visit') : t('Parlour')], ['Date', f.date ? fmtDate(f.date, lang) : '—'], ['Time', f.time || '—'], ['Specialist', f.specialist === 'auto' ? (free.slice(0, f.guests).map((m) => m.name).join(', ') || t('Auto')) : f.specialist], ['Guests', f.guests], ['Reminders', f.remind ? f.channel : t('Off')]].map(([a, b]) => <p key={a} className="flex justify-between gap-4"><span>{t(a as string)}</span><span className="text-right">{b}</span></p>)}</div>
            {servicePricesVisible() ? <div className="border-t border-sand/20 pt-3 space-y-2">
              {discount > 0 && <><p className="flex justify-between"><span>{t('Subtotal')}</span><span>{money(base)}</span></p><p className="flex justify-between text-emerald-300"><span>{authT('Coupon discount', ui)}</span><span>−{money(discount)}</span></p></>}
              <p className="flex justify-between text-base"><span>{t('Total')}</span><span>{money(total)}</span></p></div> : <p className="border-t border-sand/20 pt-3 text-sm">{t(f.mode === 'home' ? 'Payment is made offline, after your service.' : 'Payment is made offline, at the salon, after your service.')}</p>}
            <div className="border-t border-sand/20 pt-3">
              <label className="label block mb-2" htmlFor="svc-coupon">{authT('Coupon code', ui)}</label>
              <div className="flex gap-2">
                <input id="svc-coupon" value={code} disabled={!!applied} maxLength={15} onChange={(e) => { setCode(e.target.value.toUpperCase()); setCnote(null) }} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (!applied) applyCoupon() } }} placeholder="FIRSTSERVICE10" className="min-w-0 flex-1 bg-transparent border-b border-sand/40 py-2 text-sm uppercase outline-none focus:border-sand" />
                {applied
                  ? <button type="button" onClick={clearCoupon} className="rounded-full border border-sand/50 px-4 py-2 hover:bg-sand hover:text-ink">{authT('Remove coupon', ui)}</button>
                  : <button type="button" onClick={() => applyCoupon()} className="rounded-full bg-sand text-ink px-4 py-2 hover:opacity-90">{authT('Apply', ui)}</button>}
              </div>
              {cnote && <p className={`mt-2 ${cnote.ok ? 'text-emerald-300' : 'text-red-300'}`} role={cnote.ok ? 'status' : 'alert'}>{cnote.text}</p>}
              <CouponPicker scope="services" subtotal={base} applied={applied} onApply={(c) => applyCoupon(c)} reasonText={(r) => authT(REASON[r] ?? 'Invalid coupon code.', ui)} fmt={money} />
            </div>
            {f.time && held && <HoldTimer msLeft={msLeft} dark />}
            <button className="w-full bg-sand text-ink rounded-full py-4 label mt-3 hover:opacity-90">{t(review ? 'Send booking request' : 'Confirm booking')}</button>
            <Link to="/services#menu" className="block text-center opacity-60 hover:opacity-100 pt-1">{t('← Back to menu')}</Link><p className="opacity-50 text-center">{spa.phone}</p>
          </div>
        </aside>
      </form>
    </main>
  )
}
