import { useEffect, useState } from 'react'
import { Link } from '../SmartLink'
import { Navigate } from 'react-router-dom'
import { money, spa, servicePricesVisible } from '../data'
import { getBookings, cancelBooking, processDue, fmtDT } from '../store'
import { useI18n, fmtDate } from '../i18n-site'

export default function Success() {
  const ref = sessionStorage.getItem('serene-last')
  const [, tick] = useState(0)
  const { t, lang } = useI18n()
  useEffect(() => { processDue() }, [])
  const b = getBookings().find((x) => x.ref === ref)
  if (!b) return <Navigate to="/services" replace />
  const dt = (add = 0) => { const x = new Date(`${b.date}T${b.time}:00`); x.setMinutes(x.getMinutes() + add); return x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' }
  const ics = () => {
    const s = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nUID:${b.ref}@serene\r\nDTSTAMP:${dt()}\r\nDTSTART:${dt()}\r\nDTEND:${dt(b.duration)}\r\nSUMMARY:${t('{svc} at {spa}', { svc: t(b.serviceName), spa: spa.name })}\r\nLOCATION:${t(spa.address)}\r\nEND:VEVENT\r\nEND:VCALENDAR`
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([s], { type: 'text/calendar;charset=utf-8' })); a.download = `${b.ref}.ics`; a.click()
  }
  const off = b.status === 'Cancelled' || b.status === 'Rejected', pending = b.status === 'Pending Review', rejected = b.status === 'Rejected'
  return (
    <main className="min-h-screen bg-ink text-sand flex items-center justify-center px-5 py-28">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto h-20 w-20 rounded-full border border-sand/50 flex items-center justify-center" style={{ animation: 'tick .7s cubic-bezier(.2,.7,.2,1) both' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={off ? 'M6 6l12 12M18 6L6 18' : 'M4 12.5l5 5L20 6.5'} /></svg></div>
        <h1 className="h text-[clamp(2.4rem,6vw,4.5rem)] mt-8 fade-up">{rejected ? t('Booking not approved.') : off ? t('Booking cancelled.') : pending ? t('Request received.') : t('Booking confirmed.')}</h1>
        <p className="text-xs mt-4 opacity-70 fade-up">{off ? t('Your slot has been released.') : pending ? t('Thank you, {name}. Our team will review your request and confirm by SMS.', { name: b.name }) : t('Thank you, {name}. We have sent the details to {email}.', { name: b.name, email: b.email })}</p>
        <div className="border border-sand/20 text-left text-xs p-6 mt-10 space-y-3 fade-up">
          {[['Reference', b.ref], ['Status', t(b.status)], ['Place', b.mode === 'home' ? t('Home visit') : t('Parlour')], ...(b.mode === 'home' && b.address ? [['Address', `${b.address.line1}, ${b.address.city}, ${b.address.state} ${b.address.pin}`]] : []), ['Service', t(b.serviceName)], ['When', `${fmtDate(b.date, lang)} · ${b.time}`], ['Specialist', b.specialists.join(', ')], ['Guests', b.guests]].map(([a, v]) => <p key={a} className="flex justify-between gap-4"><span>{t(a as string)}</span><span className="text-right">{v}</span></p>)}
          {servicePricesVisible() ? <p className="flex justify-between border-t border-sand/20 pt-3 text-sm"><span>{t('Total (pay at visit)')}</span><span>{money(b.total)}</span></p> : <p className="border-t border-sand/20 pt-3 text-sm">{t('Pay at the salon (offline)')}</p>}
        </div>
        <div className="border border-sand/20 text-left text-xs p-6 mt-4 fade-up">
          <h3 className="label mb-3">{b.remind ? t('Reminders via {channel}', { channel: b.channel }) : t('Reminders are off')}</h3>
          {b.reminders.map((r) => <p key={r.label} className="flex justify-between gap-4 py-1.5 border-t border-sand/10"><span>{t(r.label)}<span className="opacity-50"> · {fmtDT(r.at)}</span></span><span className={r.status === 'Sent' ? 'text-green-400' : 'opacity-60'}>{t(r.status)}</span></p>)}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Link to="/" className="bg-sand text-ink rounded-full px-7 py-4 label">{t('Back to home')}</Link>
          {!off && !pending && <button onClick={ics} className="border border-sand/40 rounded-full px-7 py-4 label hover:bg-sand hover:text-ink transition">{t('Add to calendar')}</button>}
          {!off && <button onClick={() => { cancelBooking(b.ref); tick((n) => n + 1) }} className="border border-sand/40 rounded-full px-7 py-4 label hover:bg-red-900/50 transition">{t('Cancel booking')}</button>}
        </div>
      </div>
    </main>
  )
}
