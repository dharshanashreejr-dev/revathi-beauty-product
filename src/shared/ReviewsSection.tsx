import { useMemo, useState } from 'react'
import { useLang, type Lang } from './i18n'
import { addReview, useReviews } from './reviews'

// Drop-in review block: lists reviews for one product / service and lets visitors add their own.
const L: Record<Lang, Record<string, string>> = {
  en: { title: 'Customer reviews', none: 'No reviews yet. Be the first to share your experience.', write: 'Write a review', name: 'Your name', rating: 'Your rating', text: 'Share your experience', submit: 'Submit review', thanks: 'Thank you! Your review has been added.', err: 'Please enter your name and at least a short review.', avg: 'average' },
  ta: { title: 'வாடிக்கையாளர் மதிப்புரைகள்', none: 'இன்னும் மதிப்புரைகள் இல்லை. முதலில் உங்கள் அனுபவத்தைப் பகிருங்கள்.', write: 'மதிப்புரை எழுதுங்கள்', name: 'உங்கள் பெயர்', rating: 'உங்கள் மதிப்பீடு', text: 'உங்கள் அனுபவத்தைப் பகிருங்கள்', submit: 'மதிப்புரையை சமர்ப்பிக்கவும்', thanks: 'நன்றி! உங்கள் மதிப்புரை சேர்க்கப்பட்டது.', err: 'பெயரையும் சிறிய மதிப்புரையையும் உள்ளிடவும்.', avg: 'சராசரி' },
  hi: { title: 'ग्राहक समीक्षाएँ', none: 'अभी कोई समीक्षा नहीं है। अपना अनुभव सबसे पहले साझा करें।', write: 'समीक्षा लिखें', name: 'आपका नाम', rating: 'आपकी रेटिंग', text: 'अपना अनुभव साझा करें', submit: 'समीक्षा जमा करें', thanks: 'धन्यवाद! आपकी समीक्षा जोड़ दी गई है।', err: 'कृपया अपना नाम और छोटी समीक्षा लिखें।', avg: 'औसत' },
  ml: { title: 'ഉപഭോക്തൃ അവലോകനങ്ങൾ', none: 'ഇതുവരെ അവലോകനങ്ങളില്ല. ആദ്യം നിങ്ങളുടെ അനുഭവം പങ്കിടൂ.', write: 'അവലോകനം എഴുതുക', name: 'നിങ്ങളുടെ പേര്', rating: 'നിങ്ങളുടെ റേറ്റിംഗ്', text: 'നിങ്ങളുടെ അനുഭവം പങ്കിടുക', submit: 'അവലോകനം സമർപ്പിക്കുക', thanks: 'നന്ദി! നിങ്ങളുടെ അവലോകനം ചേർത്തു.', err: 'പേരും ചെറിയ അവലോകനവും നൽകുക.', avg: 'ശരാശരി' },
  te: { title: 'కస్టమర్ రివ్యూలు', none: 'ఇంకా రివ్యూలు లేవు. మీ అనుభవాన్ని మొదట పంచుకోండి.', write: 'రివ్యూ రాయండి', name: 'మీ పేరు', rating: 'మీ రేటింగ్', text: 'మీ అనుభవాన్ని పంచుకోండి', submit: 'రివ్యూ సమర్పించండి', thanks: 'ధన్యవాదాలు! మీ రివ్యూ జోడించబడింది.', err: 'దయచేసి మీ పేరు మరియు చిన్న రివ్యూ నమోదు చేయండి.', avg: 'సగటు' },
  kn: { title: 'ಗ್ರಾಹಕ ವಿಮರ್ಶೆಗಳು', none: 'ಇನ್ನೂ ವಿಮರ್ಶೆಗಳಿಲ್ಲ. ಮೊದಲು ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.', write: 'ವಿಮರ್ಶೆ ಬರೆಯಿರಿ', name: 'ನಿಮ್ಮ ಹೆಸರು', rating: 'ನಿಮ್ಮ ರೇಟಿಂಗ್', text: 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ', submit: 'ವಿಮರ್ಶೆ ಸಲ್ಲಿಸಿ', thanks: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಮರ್ಶೆ ಸೇರಿಸಲಾಗಿದೆ.', err: 'ದಯವಿಟ್ಟು ಹೆಸರು ಮತ್ತು ಸಣ್ಣ ವಿಮರ್ಶೆ ನಮೂದಿಸಿ.', avg: 'ಸರಾಸರಿ' },
  mr: { title: 'ग्राहक पुनरावलोकने', none: 'अजून पुनरावलोकने नाहीत. प्रथम तुमचा अनुभव शेअर करा.', write: 'पुनरावलोकन लिहा', name: 'तुमचे नाव', rating: 'तुमची रेटिंग', text: 'तुमचा अनुभव शेअर करा', submit: 'पुनरावलोकन सबमिट करा', thanks: 'धन्यवाद! तुमचे पुनरावलोकन जोडले आहे.', err: 'कृपया नाव आणि छोटी समीक्षा लिहा.', avg: 'सरासरी' },
  bn: { title: 'গ্রাহক পর্যালোচনা', none: 'এখনও কোনো পর্যালোচনা নেই। প্রথমে আপনার অভিজ্ঞতা শেয়ার করুন।', write: 'পর্যালোচনা লিখুন', name: 'আপনার নাম', rating: 'আপনার রেটিং', text: 'আপনার অভিজ্ঞতা শেয়ার করুন', submit: 'পর্যালোচনা জমা দিন', thanks: 'ধন্যবাদ! আপনার পর্যালোচনা যোগ করা হয়েছে।', err: 'অনুগ্রহ করে নাম ও সংক্ষিপ্ত পর্যালোচনা লিখুন।', avg: 'গড়' },
}

const Stars = ({ n, size = 16 }: { n: number; size?: number }) => (
  <span aria-label={`${n} / 5`} style={{ color: '#c9a24a', fontSize: size, letterSpacing: 2 }}>{'★'.repeat(n)}<span style={{ opacity: 0.3 }}>{'★'.repeat(5 - n)}</span></span>
)

export default function ReviewsSection({ kind, targetId, targetName, dark = false }: { kind: 'product' | 'service'; targetId: string; targetName: string; dark?: boolean }) {
  const [lang] = useLang()
  const t = L[lang] ?? L.en
  const all = useReviews()
  const list = useMemo(() => all.filter((r) => r.kind === kind && r.targetId === targetId), [all, kind, targetId])
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ name: '', rating: 5, text: '' })
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0
  const fg = dark ? '#f5ece0' : '#3b2a1e'
  const box: React.CSSProperties = { border: `1px solid ${dark ? 'rgba(255,255,255,.2)' : '#e3d6c3'}`, borderRadius: 12, padding: '12px 14px', background: dark ? 'rgba(255,255,255,.05)' : '#fffdf9' }
  const input: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d9c9b2', background: '#fff', color: '#3b2a1e', font: 'inherit', fontSize: 14 }

  const submit = () => {
    if (f.name.trim().length < 2 || f.text.trim().length < 3) { setErr(t.err); return }
    addReview({ kind, targetId, targetName, name: f.name.trim(), rating: f.rating, text: f.text.trim() })
    setF({ name: '', rating: 5, text: '' }); setErr(''); setMsg(t.thanks); setOpen(false)
  }

  return (
    <section aria-label={t.title} style={{ color: fg, marginTop: 24, textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{t.title} {list.length > 0 && <small style={{ fontWeight: 400, opacity: 0.7 }}>· <Stars n={Math.round(avg)} size={14} /> {avg.toFixed(1)} {t.avg} ({list.length})</small>}</h3>
        <button type="button" onClick={() => { setOpen(!open); setMsg('') }} style={{ padding: '8px 16px', borderRadius: 999, border: `1px solid ${fg}`, background: 'transparent', color: fg, cursor: 'pointer', fontSize: 13 }}>{t.write}</button>
      </div>
      {msg && <p role="status" style={{ margin: '10px 0 0', fontSize: 13, color: dark ? '#b8e0b0' : '#2f6b3a' }}>{msg}</p>}
      {open && (
        <div style={{ ...box, marginTop: 12, display: 'grid', gap: 10 }}>
          <input style={input} placeholder={t.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-label={t.name} maxLength={40} />
          <div role="radiogroup" aria-label={t.rating} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 13, marginRight: 6 }}>{t.rating}</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={f.rating === n} aria-label={`${n}`} onClick={() => setF({ ...f, rating: n })} style={{ background: 'none', border: 0, cursor: 'pointer', fontSize: 24, color: n <= f.rating ? '#c9a24a' : '#bba98f', padding: 0 }}>★</button>
            ))}
          </div>
          <textarea style={{ ...input, minHeight: 80, resize: 'vertical' }} placeholder={t.text} value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} aria-label={t.text} maxLength={400} />
          {err && <p role="alert" style={{ margin: 0, fontSize: 13, color: '#b3261e' }}>{err}</p>}
          <button type="button" onClick={submit} style={{ justifySelf: 'start', padding: '10px 22px', borderRadius: 999, border: 0, background: '#3b2a1e', color: '#fffaf3', cursor: 'pointer', fontSize: 14 }}>{t.submit}</button>
        </div>
      )}
      <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
        {list.length === 0 && <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>{t.none}</p>}
        {list.slice(0, 6).map((r) => (
          <article key={r.id} style={box}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}><strong>{r.name}</strong><Stars n={r.rating} size={14} /></div>
            <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5 }}>{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
