import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../api';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import { useT } from '../i18n.js';

// Fake SMS gateway screen: shows every message the system would send (OTP, order, booking, stock alerts).
// BACKEND: this becomes the real SMS log from the DLT gateway (delivery status per message). Admin only.
const KEYS = { all: 'All messages', otp: 'OTP', orderSuccess: 'Order placed', orderDispatched: 'Order shipped', apptConfirmed: 'Booking confirmed', apptReminder: 'Booking reminder', invoice: 'Invoice', backInStock: 'Back in stock', lowStock: 'Low stock', festival: 'Festival offer' };

export default function SmsOutbox() {
  const { t } = useT();
  const [, tick] = useState(0);
  useEffect(() => { const id = setInterval(() => tick((n) => n + 1), 3000); return () => clearInterval(id); }, []);
  const [key, setKey] = useState('all');
  const [q, setQ] = useState('');
  const all = api.sms.getOutbox();
  const rows = useMemo(() => all.filter((m) => (key === 'all' || m.key === key) && (!q.trim() || `${m.to} ${m.text}`.toLowerCase().includes(q.trim().toLowerCase()))), [all, key, q]);
  return (
    <div className="page">
      <PageHeader title={t('SMS Outbox')} subtitle={t('Nothing is really sent. This screen shows the SMS each customer would receive.')} />
      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search messages')} aria-label={t('Search messages')} /></div>
        <select value={key} onChange={(e) => setKey(e.target.value)} aria-label={t('Type')}>{Object.entries(KEYS).map(([k, l]) => <option key={k} value={k}>{t(l)}</option>)}</select>
      </div>
      <div className="card">
        {rows.length === 0 ? <p className="muted">{t('No messages yet.')}</p> : (
          <ul className="list">
            {rows.map((m) => (
              <li key={m.id}>
                <div className="grow">
                  <div className="row-gap"><strong>{m.to}</strong><Badge>{t(KEYS[m.key] || m.key)}</Badge><span className="muted">{m.category}</span></div>
                  <p>{m.text}</p>
                  <span className="muted">{new Date(m.at).toLocaleString('en-IN')} · {t('Simulated')}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
