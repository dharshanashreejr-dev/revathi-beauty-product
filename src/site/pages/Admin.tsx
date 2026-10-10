import { useEffect, useState } from 'react'
import { team, type Category } from '../data'
import { SLOTS, getBookings, getBlocked, toggleBlock, updateBooking, cancelBooking, freeSpecialists, processDue, iso, toMin, overlap, fmtDT } from '../store'
import { Arrow } from '../components/ui'
import { useI18n, fmtDate } from '../i18n-site'

export default function Admin() {
  const { t, lang } = useI18n()
  const [date, setDate] = useState(iso(new Date()))
  const [, tick] = useState(0); const re = () => tick((n) => n + 1)
  useEffect(() => { processDue(); const t = setInterval(() => { if (processDue()) re() }, 30000); return () => clearInterval(t) }, [])
  const all = getBookings(), blocked = getBlocked()
  const day = all.filter((b) => b.date === date && b.status === 'Confirmed')
  const shift = (n: number) => { const d = new Date(date + 'T00:00'); d.setDate(d.getDate() + n); setDate(iso(d)) }
  const queue = all.flatMap((b) => b.reminders.filter((r) => r.status === 'Scheduled').map((r) => ({ b, r }))).sort((x, y) => x.r.at.localeCompare(y.r.at))
  const sendNow = (ref: string, label: string) => { const b = all.find((x) => x.ref === ref)!; updateBooking(ref, { reminders: b.reminders.map((r) => (r.label === label ? { ...r, status: 'Sent' as const } : r)) }); re() }

  return (
    <main className="pt-28 px-5 md:px-10 pb-24 min-h-screen">
      <span className="label block mb-4">{t('Manager view · demo data saved in this browser')}</span>
      <h1 className="h text-[clamp(2rem,4.5vw,4rem)]">{t('Schedule & slots.')}</h1>
      <div className="flex items-center gap-3 mt-8">
        <Arrow dir="l" onClick={() => shift(-1)} /><input type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} className="bg-transparent border border-ink/30 rounded-full px-4 py-2 text-sm" /><Arrow dir="r" onClick={() => shift(1)} />
        <button onClick={() => setDate(iso(new Date()))} className="label ml-2 underline">{t('Today')}</button>
        <span className="text-xs opacity-60 ml-auto">{day.length === 1 ? t('{n} booking on this day', { n: day.length }) : t('{n} bookings on this day', { n: day.length })}</span>
      </div>
      <p className="text-xs opacity-60 mt-3">{t('Click a free cell to block that specialist for the hour, click a blocked cell to reopen it.')}</p>
      <div className="overflow-x-auto mt-4 border border-ink/15">
        <table className="min-w-full text-xs border-collapse">
          <thead><tr><th className="text-left p-3 sticky left-0 bg-sand">{t('Specialist')}</th>{SLOTS.map((s) => <th key={s} className="p-3 font-medium">{s}</th>)}</tr></thead>
          <tbody>{team.map((m) => (
            <tr key={m.name} className="border-t border-ink/10">
              <td className="p-3 sticky left-0 bg-sand whitespace-nowrap"><b className="font-semibold">{m.name}</b><br /><span className="opacity-60">{t(m.role)}</span></td>
              {SLOTS.map((s) => {
                const bk = day.find((x) => x.specialists.includes(m.name) && overlap(toMin(s), toMin(s) + 60, toMin(x.time), toMin(x.time) + x.duration))
                const bl = blocked.includes(`${date}|${m.name}|${s}`)
                return <td key={s} className="p-1 min-w-[84px]">{bk
                  ? <div title={`${bk.name} · ${t(bk.serviceName)}`} className="bg-ink text-sand rounded px-2 py-2 truncate max-w-[84px]">{bk.name}</div>
                  : <button onClick={() => { toggleBlock(date, m.name, s); re() }} className={`w-full rounded px-2 py-2 border transition ${bl ? 'bg-ink/10 border-ink/30 line-through' : 'border-dashed border-ink/20 hover:bg-ink/5'}`}>{bl ? t('Blocked') : t('Free')}</button>}</td>
              })}
            </tr>))}</tbody>
        </table>
      </div>

      <h2 className="h text-3xl mt-16 mb-4">{t('All bookings')}</h2>
      <div className="overflow-x-auto"><table className="min-w-full text-xs text-left">
        <thead className="label opacity-60"><tr>{['Ref', 'Client', 'Service', 'When', 'Specialist', 'Reminders', 'Status', ''].map((h) => <th key={h} className="py-2 pr-4">{t(h)}</th>)}</tr></thead>
        <tbody>{[...all].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map((b) => {
          const opts = Array.from(new Set([b.specialists[0], ...freeSpecialists(b.category as Category, b.date, b.time, b.duration, b.ref).map((m) => m.name)]))
          return (
            <tr key={b.ref} className={`border-t border-ink/10 ${b.status === 'Cancelled' ? 'opacity-40' : ''}`}>
              <td className="py-3 pr-4">{b.ref}</td><td className="pr-4">{b.name}<br /><span className="opacity-60">{b.phone}</span></td><td className="pr-4">{t(b.serviceName)}</td><td className="pr-4 whitespace-nowrap">{fmtDate(b.date, lang)} · {b.time}</td>
              <td className="pr-4">{b.guests > 1 ? b.specialists.join(', ') : <select disabled={b.status !== 'Confirmed'} value={b.specialists[0]} onChange={(e) => { updateBooking(b.ref, { specialists: [e.target.value] }); re() }} className="bg-transparent border border-ink/25 rounded-full px-2 py-1">{opts.map((o) => <option key={o}>{o}</option>)}</select>}</td>
              <td className="pr-4">{b.remind ? t('{channel} · {n} queued', { channel: b.channel, n: b.reminders.filter((r) => r.status === 'Scheduled').length }) : t('Off')}</td>
              <td className="pr-4">{t(b.status)}</td>
              <td>{b.status === 'Confirmed' && <button onClick={() => { cancelBooking(b.ref); re() }} className="underline">{t('Cancel')}</button>}</td>
            </tr>)})}</tbody></table></div>

      <h2 className="h text-3xl mt-16 mb-2">{t('Reminder queue')}</h2>
      <p className="text-xs opacity-60 mb-4">{t('Scheduled SMS / WhatsApp messages. Due ones are sent automatically (simulated) while this page is open.')}</p>
      {!queue.length ? <p className="text-xs opacity-60">{t('Nothing queued.')}</p> : queue.map(({ b, r }) => (
        <p key={b.ref + r.label} className="flex justify-between gap-4 border-t border-ink/10 py-3 text-xs"><span>{t('{when} · {channel} to {phone} · {label} ({name})', { when: fmtDT(r.at), channel: r.channel, phone: b.phone, label: t(r.label), name: b.name })}</span><button onClick={() => sendNow(b.ref, r.label)} className="underline whitespace-nowrap">{t('Send now')}</button></p>))}
    </main>
  )
}
