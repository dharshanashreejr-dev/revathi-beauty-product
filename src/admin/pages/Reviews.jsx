import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import { useT } from '../i18n.js';
import { deleteReview, useReviews } from '../../shared/reviews';

// Customer reviews submitted on the website (products and services).
export default function Reviews() {
  const { notify } = useStore();
  const { t } = useT();
  const reviews = useReviews();
  const [kind, setKind] = useState('all');
  const rows = reviews.filter((r) => kind === 'all' || r.kind === kind);

  return (
    <div className="page">
      <PageHeader title={t('Reviews')} subtitle="What customers say about your products and services." />
      <div className="filters">
        <select value={kind} onChange={(e) => setKind(e.target.value)} aria-label={t('Filter by type')}>
          <option value="all">All reviews</option><option value="product">Products</option><option value="service">Services</option>
        </select>
      </div>
      <div className="card flush">
        {rows.length === 0 && <p className="muted" style={{ padding: 22 }}>No reviews yet.</p>}
        <ul className="list">
          {rows.map((r) => (
            <li key={r.id}>
              <div>
                <strong>{r.name}</strong> <span style={{ color: '#c9a24a' }}>{'★'.repeat(r.rating)}</span><span style={{ opacity: 0.3 }}>{'★'.repeat(5 - r.rating)}</span>
                <span className="muted block">{r.targetName} · <Badge>{r.kind === 'product' ? 'Product' : 'Service'}</Badge> · {new Date(r.at).toLocaleDateString('en-IN')}</span>
                <p style={{ margin: '6px 0 0' }}>{r.text}</p>
              </div>
              <button className="icon-btn" aria-label="Delete review" onClick={() => { deleteReview(r.id); notify('Review deleted.'); }}><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
