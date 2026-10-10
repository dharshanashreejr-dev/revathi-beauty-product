import { useState, type FormEvent } from 'react'
import { Link } from '../SmartLink'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { services, team, spa, categories, money, img, type Category } from '../data'
import { SLOTS, slotOk, freeSpecialists, dayHasSlot, createBooking, type Channel } from '../store'
import Calendar from '../components/Calendar'
import { useI18n, fmtDate } from '../i18n-site'

const channels: Channel[] = ['SMS', 'WhatsApp', 'SMS + WhatsApp']
const fld = 'w-full bg-transparent border-b border-ink/30 py-3 text-sm outline-none focus:border-ink'
const chip = (on: boolean) => `px-4 py-2 rounded-full border text-xs transition ${on ? 'bg-ink text-sand border-ink' : 'border-ink/25 hover:border-ink'} disabled:opacity-25 disabled:line-through disabled:cursor-not-allowed`

export default function Booking() {
  const [sp] = useSearchParams(); const nav = useNavigate()
  const { t, lang } = useI18n()
  const mins = (n: number) => `${n} ${t('min')}`
  const who = team.find((m) => m.name === sp.get('therapist'))
  const first = services.find((s) => s.id === sp.get('service')) ?? (who ? services.find((s) => who.categories.includes(s.category)) : undefined)
  const [f, setF] = useState({ cat: (first?.category ?? 'All') as 'All' | Category, service: first?.id ?? services[0].id, date: '', time: '', specialist: who && first ? who.name : 'auto', guests: 1, name: '', phone: '', email: '', notes: '', remind: true, channel: 'WhatsApp' as Channel })
  const [err, setErr] = useState<Record<string, string>>({})
  const svc = services.find((s) => s.id === f.service)!
  const list = services.filter((s) => f.cat === 'All' || s.category === f.cat)
  const qualified = team.filter((m) => m.categories.includes(svc.category))
  const free = f.date && f.time ? freeSpecialists(svc.category, f.date, f.time, svc.duration) : []
  const total = svc.price * f.guests

  const set = (k: string, v: string | number | boolean) => setF((p) => {
    const n = { ...p, [k]: v } as typeof p
    if (k === 'cat') { const l = services.filter((s) => v === 'All' || s.category === v); if (!l.some((s) => s.id === n.service)) n.service = l[0].id }
    if (['cat', 'service', 'guests', 'date'].includes(k)) { n.time = ''; n.specialist = 'auto' }
    if (k === 'time') n.specialist = 'auto'
    return n
  })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (!f.date) x.date = 'Pick a date'
    if (!f.time) x.time = 'Pick a time'
    if (f.name.trim().length < 2) x.name = 'Enter your name'
    if (!/^[+\d\s-]{8,15}$/.test(f.phone)) x.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email'
    const now = f.date && f.time ? freeSpecialists(svc.category, f.date, f.time, svc.duration) : []
    if (f.time && now.length < f.guests) x.time = 'That slot was just taken. Please pick another.'
    setErr(x); if (Object.keys(x).length) return
    const specialists = f.specialist === 'auto' ? now.slice(0, f.guests).map((m) => m.name) : [f.specialist]
    const b = createBooking({ serviceId: svc.id, serviceName: svc.name, category: svc.category, duration: svc.duration, date: f.date, time: f.time, specialists, guests: f.guests, name: f.name, phone: f.phone, email: f.email, notes: f.notes, channel: f.channel, remind: f.remind, total })
    sessionStorage.setItem('serene-last', b.ref); nav('/success')
  }
  const E = ({ k }: { k: string }) => err[k] ? <p className="text-[11px] text-red-700 mt-2">{t(err[k])}</p> : null

  return (
    <main className="pt-28 px-5 md:px-10 pb-20 min-h-screen">
      <span className="label block mb-4">{t('Spa · Salon · Clinic')}</span>
      <h1 className="h text-[clamp(2.2rem,5vw,4.6rem)]">{t('Book your appointment.')}</h1>
      <form onSubmit={submit} noValidate className="grid lg:grid-cols-[1fr_380px] gap-12 mt-12">
        <div className="space-y-10">
          <section><h3 className="label mb-3">{t('Service')}</h3>
            <div className="flex flex-wrap gap-2 mb-4">{categories.map((c) => <button key={c} type="button" onClick={() => set('cat', c)} className={chip(f.cat === c)}>{t(c)}</button>)}</div>
            <select value={f.service} onChange={(e) => set('service', e.target.value)} className={fld + ' bg-sand'}>
              {list.map((s) => <option key={s.id} value={s.id}>{t(s.name)} · {mins(s.duration)} · {money(s.price)}</option>)}</select></section>
          <section className="grid md:grid-cols-[auto_1fr] gap-10">
            <div><h3 className="label mb-3">{t('Date')}</h3>
              <Calendar value={f.date} onChange={(d) => set('date', d)} isOpen={(d) => dayHasSlot(d, svc.category, svc.duration, f.guests)} /><E k="date" /></div>
            <div><h3 className="label mb-3">{t('Time')}</h3>
              {!f.date ? <p className="text-xs opacity-60">{t('Select a date to see live availability.')}</p> :
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">{SLOTS.map((slot) => {
                  const n = freeSpecialists(svc.category, f.date, slot, svc.duration).length, off = !slotOk(f.date, slot, svc.duration) || n < f.guests
                  return <button key={slot} type="button" disabled={off} onClick={() => set('time', slot)} className={chip(f.time === slot) + ' !rounded-2xl !py-3'}>{slot}<span className="block text-[10px] opacity-60 no-underline">{off ? t('full') : t('{n} free', { n })}</span></button>
                })}</div>}
              <E k="time" />
              <div className="flex items-center gap-4 mt-8"><h3 className="label">{t('Guests')}</h3>
                <button type="button" aria-label={t('Decrease guests')} onClick={() => set('guests', Math.max(1, f.guests - 1))} className="h-9 w-9 rounded-full border border-ink/30">−</button><span className="w-4 text-center">{f.guests}</span>
                <button type="button" aria-label={t('Increase guests')} onClick={() => set('guests', Math.min(4, f.guests + 1))} className="h-9 w-9 rounded-full border border-ink/30">+</button></div></div>
          </section>
          <section><h3 className="label mb-3">{t('Specialist')}</h3>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => set('specialist', 'auto')} className={chip(f.specialist === 'auto')}>{t('Auto-assign')}</button>
              {qualified.map((m) => <button key={m.name} type="button" disabled={f.guests > 1 || (!!f.time && !free.some((x) => x.name === m.name))} onClick={() => set('specialist', m.name)} className={chip(f.specialist === m.name)}>{m.name}<span className="opacity-60"> · {t(m.role)}</span></button>)}</div>
            <p className="text-[11px] opacity-60 mt-3">{f.guests > 1 ? t('Groups are assigned automatically.') : f.time ? (f.specialist === 'auto' ? t('We will assign {name}.', { name: free[0]?.name ?? t('the next available specialist') }) : t('{name} is confirmed for you.', { name: f.specialist })) : t('Pick a time to see who is free.')}</p></section>
          <section><h3 className="label mb-3">{t('Your details')}</h3><div className="grid sm:grid-cols-2 gap-8">
            <div><input placeholder={t('Full name')} value={f.name} onChange={(e) => set('name', e.target.value)} className={fld} /><E k="name" /></div>
            <div><input placeholder={t('Phone (for reminders)')} value={f.phone} onChange={(e) => set('phone', e.target.value)} className={fld} /><E k="phone" /></div>
            <div className="sm:col-span-2"><input type="email" placeholder={t('Email')} value={f.email} onChange={(e) => set('email', e.target.value)} className={fld} /><E k="email" /></div>
            <textarea placeholder={t('Allergies, medical notes or preferences (optional)')} rows={2} value={f.notes} onChange={(e) => set('notes', e.target.value)} className={fld + ' sm:col-span-2'} /></div></section>
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
              {[['Date', f.date ? fmtDate(f.date, lang) : '—'], ['Time', f.time || '—'], ['Specialist', f.specialist === 'auto' ? (free.slice(0, f.guests).map((m) => m.name).join(', ') || t('Auto')) : f.specialist], ['Guests', f.guests], ['Reminders', f.remind ? f.channel : t('Off')]].map(([a, b]) => <p key={a} className="flex justify-between gap-4"><span>{t(a as string)}</span><span className="text-right">{b}</span></p>)}</div>
            <p className="flex justify-between border-t border-sand/20 pt-3 text-base"><span>{t('Total')}</span><span>{money(total)}</span></p>
            <button className="w-full bg-sand text-ink rounded-full py-4 label mt-3 hover:opacity-90">{t('Confirm booking')}</button>
            <Link to="/services#menu" className="block text-center opacity-60 hover:opacity-100 pt-1">{t('← Back to menu')}</Link><p className="opacity-50 text-center">{spa.phone}</p>
          </div>
        </aside>
      </form>
    </main>
  )
}
