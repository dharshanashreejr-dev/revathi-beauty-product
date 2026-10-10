import { useMemo, useState } from 'react';
import { Search, Eye, MapPin } from 'lucide-react';
import { useStore } from '../store.jsx';
import { ORDER_STATUSES, PAYMENT_STATUSES, inr, fmtDate } from '../data/mockData.js';
import { orderTotal, itemCount, productOf } from '../utils.js';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import { useT } from '../i18n.js';

export default function Orders() {
  const { orders, setOrders, products, notify } = useStore();
  const { t, lang } = useT();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [payment, setPayment] = useState('All');
  const [openId, setOpenId] = useState(null);

  const rows = useMemo(
    () =>
      [...orders].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).filter((o) =>
        (status === 'All' || o.status === status) &&
        (payment === 'All' || o.payment === payment) &&
        (!q.trim() || `${o.id} ${o.customer}`.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [orders, q, status, payment]
  );
  const open = orders.find((o) => o.id === openId);

  const update = (id, patch, message, vars) => {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o)));
    notify(message, 'success', vars);
  };

  const summary = (o) => o.items.map((i) => `${productOf(products, i.productId)?.name || t('Discontinued product')} x${i.qty}`).join(', ');

  const columns = [
    { key: 'id', label: t('Order'), render: (o) => <strong>{o.id}</strong> },
    { key: 'customer', label: t('Customer') },
    { key: 'date', label: t('Date'), render: (o) => fmtDate(o.date, lang) },
    { key: 'items', label: t('Items'), render: (o) => <span className="clip" title={summary(o)}>{t('{n} item(s): {summary}', { n: itemCount(o), summary: summary(o) })}</span> },
    { key: 'total', label: t('Total'), render: (o) => <strong>{inr(orderTotal(o, products))}</strong> },
    { key: 'payment', label: t('Payment'), render: (o) => <Badge>{o.payment}</Badge> },
    { key: 'status', label: t('Fulfilment'), render: (o) => (
      <select className="status-select" value={o.status} onClick={(e) => e.stopPropagation()}
        onChange={(e) => update(o.id, { status: e.target.value }, '{id} marked as {status}.', { id: o.id, status: e.target.value })} aria-label={t('Status for {id}', { id: o.id })}>
        {ORDER_STATUSES.map((s) => <option key={s} value={s}>{t(s)}</option>)}
      </select>
    ) },
    { key: 'view', label: '', width: '60px', render: (o) => <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setOpenId(o.id); }} aria-label={t('View {id}', { id: o.id })}><Eye size={17} /></button> }
  ];

  return (
    <div className="page">
      <PageHeader title={t('Order management')} subtitle={t('Sample orders only. No payment gateway or e-commerce backend is connected.')} />
      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search by order ID or customer')} aria-label={t('Search orders')} /></div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={t('Filter by fulfilment status')}>
          <option value="All">{t('All fulfilment statuses')}</option>{ORDER_STATUSES.map((s) => <option key={s} value={s}>{t(s)}</option>)}
        </select>
        <select value={payment} onChange={(e) => setPayment(e.target.value)} aria-label={t('Filter by payment status')}>
          <option value="All">{t('All payment statuses')}</option>{PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{t(s)}</option>)}
        </select>
      </div>
      <div className="card flush"><DataTable columns={columns} rows={rows} onRowClick={(o) => setOpenId(o.id)} /></div>

      {open && (
        <Modal title={t('Order {id}', { id: open.id })} subtitle={t('Placed on {date} by {customer}', { date: fmtDate(open.date, lang), customer: open.customer })} wide onClose={() => setOpenId(null)}
          footer={<button className="btn btn-primary" onClick={() => setOpenId(null)}>{t('Done')}</button>}>
          <div className="detail-grid">
            <div>
              <h4 className="mini-title">{t('Items')}</h4>
              <ul className="list">
                {open.items.map((i) => {
                  const p = productOf(products, i.productId);
                  return (
                    <li key={i.productId}>
                      <div><strong>{p?.name || t('Discontinued product')}</strong><span className="muted">{i.qty} x {inr(p?.price || 0)}</span></div>
                      <strong>{inr((p?.price || 0) * i.qty)}</strong>
                    </li>
                  );
                })}
                <li className="total-row"><strong>{t('Order total')}</strong><strong>{inr(orderTotal(open, products))}</strong></li>
              </ul>
              <p className="muted row-gap"><MapPin size={15} />{open.address}</p>
            </div>
            <div>
              <h4 className="mini-title">{t('Update order')}</h4>
              <label className="field"><span className="field-label">{t('Fulfilment status')}</span>
                <select value={open.status} onChange={(e) => update(open.id, { status: e.target.value }, '{id} marked as {status}.', { id: open.id, status: e.target.value })}>
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{t(s)}</option>)}
                </select>
              </label>
              <label className="field"><span className="field-label">{t('Payment status')}</span>
                <select value={open.payment} onChange={(e) => update(open.id, { payment: e.target.value }, 'Payment for {id} set to {status}.', { id: open.id, status: e.target.value })}>
                  {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{t(s)}</option>)}
                </select>
              </label>
              <div className="row-gap"><Badge>{open.status}</Badge><Badge>{open.payment}</Badge></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
