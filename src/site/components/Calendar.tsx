import { useState } from 'react'
import { Arrow } from './ui'
import { iso } from '../store'
import { LANG_LOCALES } from '../../shared/i18n'
import { useI18n, weekdayLetters } from '../i18n-site'

export default function Calendar({ value, onChange, isOpen }: { value: string; onChange: (d: string) => void; isOpen: (d: string) => boolean }) {
  const { lang, t } = useI18n()
  const today = iso(new Date())
  const [m, setM] = useState(() => { const d = value ? new Date(value + 'T00:00') : new Date(); return new Date(d.getFullYear(), d.getMonth(), 1) })
  const lead = m.getDay(), n = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate()
  const cells = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)] as (number | null)[]
  const shift = (k: number) => setM(new Date(m.getFullYear(), m.getMonth() + k, 1))
  const atStart = m.getFullYear() === new Date().getFullYear() && m.getMonth() <= new Date().getMonth()
  return (
    <div className="max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="h text-2xl">{m.toLocaleString(LANG_LOCALES[lang], { month: 'long', year: 'numeric' })}</span>
        <div className="flex gap-2"><Arrow dir="l" disabled={atStart} onClick={() => shift(-1)} /><Arrow dir="r" onClick={() => shift(1)} /></div>
      </div>
      <div className="grid grid-cols-7 text-center label opacity-50 mb-2">{weekdayLetters(lang).map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          if (!c) return <span key={i} />
          const d = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(c).padStart(2, '0')}`
          const off = d < today || !isOpen(d), sel = d === value
          return <button key={i} type="button" disabled={off} onClick={() => onChange(d)}
            className={`aspect-square rounded-full text-xs transition ${sel ? 'bg-ink text-sand' : 'hover:bg-ink/10'} ${off ? 'opacity-25 line-through cursor-not-allowed hover:bg-transparent' : ''} ${d === today && !sel ? 'ring-1 ring-ink/40' : ''}`}>{c}</button>
        })}
      </div>
      <p className="text-[11px] opacity-50 mt-3">{t('Struck-through dates are past or fully booked.')}</p>
    </div>
  )
}
