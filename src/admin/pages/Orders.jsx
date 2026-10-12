import { useEffect, useMemo, useState } from 'react';
import { Search, Eye, MapPin, Phone } from 'lucide-react';
import { useStore } from '../store.jsx';
import { api } from '../../api';
import { getOrders, setOrderStage, cancelOrder, updateShipping } from '../../site/account';
import { inr } from '../data/mockData.js';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import { useT } from '../i18n.js';

// CRS 4.4 Order Fulfilment Pipeline: Pending > Packed > Dispatched > Delivered (or Cancelled).
// These are the REAL orders placed from the customer shop (same store the customer's Tracking page reads).
// Marking an order Dispatched sends the "Product Dispatched" DLT SMS to the customer's phone (once).
// BACKEND: GET /api/orders, PATCH /api/orders/:id/status. The server sends the SMS and writes the audit entry; stages only move forward.
const STAGES = ['Pending', 'Packed', 'Dispatched', 'Delivered'];
const FILTERS = [...STAGES, 'Cancelled'];
const statusOf = (o) => (o.cancelled ? 'Cancelled' : STAGES[o.stage]);
const when = (iso) => { const d = new Date(iso); return Number.isNaN(+d) ? iso : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
const whenTime = (iso) => { const d = new Date(iso); return Number.isNaN(+d) ? iso : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); };

export default function Orders() {
  const { notify, user } = useStore();
  const { t } = useT();
  const [, tick] = useState(0);
  const re = () => tick((n) => n + 1);
  useEffect(() => { window.addEventListener('storage', re); return () => window.removeEventListener('storage', re); }, []);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [openId, setOpenId] = useState(null);
  const [ship, setShip] = useState(null); // { courier, awb, eta }
  const actor = user?.name || 'Admin', role = user?.role || 'Admin';

  const orders = getOrders();
  const rows = useMemo(
    () => [...orders].sort((a, b) => String(b.placed).localeCompare(String(a.placed))).filter((o) =>
      (status === 'All' || statusOf(o) === status) &&
      (!q.trim() || `${o.id} ${o.customer || ''} ${o.phone || ''}`.toLowerCase().includes(q.trim().toLowerCase()))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(orders), q, status]
  );
  const open = orders.find((o) => o.id === openId);
  useEffect(() => { if (open) setShip({ courier: open.courier, awb: open.awb, eta: String(open.eta).slice(0, 10) }); }, [openId]); // eslint-disable-line

  const change = (o, target) => {
    if (target === 'Cancelled') {
      const r = cancelOrder(o.id);
      if (!r.ok) { notify(r.reason === 'dispatched' ? 'A dispatched order cannot be cancelled.' : 'This order cannot be cancelled.', 'error'); re(); return; }
      api.audit.log(actor, role, 'order.status', `${o.id} cancelled`, { orderId: o.id });
      notify('{id} marked as {status}.', 'success', { id: o.id, status: 'Cancelled' });
    } else {
      const r = setOrderStage(o.id, STAGES.indexOf(target));
      if (!r.ok) { notify(r.reason === 'backwards' ? 'An order can only move forward.' : 'This order cannot be updated.', 'error'); re(); return; }
      api.audit.log(actor, role, 'order.status', `${o.id} marked as ${target}`, { orderId: o.id });
      notify('{id} marked as {status}.', 'success', { id: o.id, status: target });
      if (r.smsSent) notify('Dispatch SMS sent to the customer.', 'info');
    }
    re();
  };
  const optionsFor = (o) => FILTERS.map((s) => {
    const idx = STAGES.indexOf(s);
    const disabled = o.cancelled ? s !== 'Cancelled' : s === 'Cancelled' ? o.stage >= 2 : idx < o.stage;
    return <option key={s} value={s} disabled={disabled && s !== statusOf(o)}>{t(s)}</option>;
  });

  const saveShip = () => {
    updateShipping(open.id, { courier: ship.courier.trim() || open.courier, awb: ship.awb.trim() || open.awb, eta: ship.eta || open.eta });
    api.audit.log(actor, role, 'order.status', `${open.id} shipping details updated`, { orderId: open.id });
    notify('Shipping details saved.'); re();
  };

  const summary = (o) => o.items.map((i) => `${i.name} x${i.qty}`).join(', ');
  const columns = [
    { key: 'id', label: t('Order'), render: (o) => <strong>{o.id}</strong> },
    { key: 'customer', label: t('Customer'), render: (o) => <div><strong>{o.customer || t('Customer')}</strong>{o.phone && <span className="muted block">{o.phone}</span>}</div> },
    { key: 'date', label: t('Date'), render: (o) => when(o.placed) },
    { key: 'items', label: t('Items'), render: (o) => <span className="clip" title={summary(o)}>{t('{n} item(s): {summary}', { n: o.items.reduce((s, i) => s + i.qty, 0), summary: summary(o) })}</span> },
    { key: 'total', label: t('Total'), render: (o) => <strong>{inr(o.total)}</strong> },
    { key: 'payment', label: t('Payment'), render: (o) => <span className="muted">{o.payment}</span> },
    { key: 'status', label: t('Fulfilment'), render: (o) => (
      <select className="status-select" value={statusOf(o)} onClick={(e) => e.stopPropagation()} disabled={o.cancelled || o.stage === 3}
        onChange={(e) => change(o, e.target.value)} aria-label={t('Status for {id}', { id: o.id })}>
        {optionsFor(o)}
      </select>
    ) },
    { key: 'view', label: '', width: '60px', render: (o) => <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setOpenId(o.id); }} aria-label={t('View {id}', { id: o.id })}><Eye size={17} /></button> }
  ];

  return (
    <div className="page">
      <PageHeader title={t('Order management')} subtitle={t('Orders placed from the customer shop. Stages move forward only: Pending, Packed, Dispatched, Delivered. Marking Dispatched sends the SMS.')} />
      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search by order ID or customer')} aria-label={t('Search orders')} /></div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={t('Filter by fulfilment status')}>
          <option value="All">{t('All fulfilment statuses')}</option>{FILTERS.map((s) => <option key={s} value={s}>{t(s)}</option>)}
        </select>
      </div>
      <div className="card flush"><DataTable columns={columns} rows={rows} onRowClick={(o) => setOpenId(o.id)} /></div>

      {open && ship && (
        <Modal title={t('Order {id}', { id: open.id })} subtitle={t('Placed on {date} by {customer}', { date: when(open.placed), customer: open.customer || t('Customer') })} wide onClose={() => setOpenId(null)}
          footer={<button className="btn btn-primary" onClick={() => setOpenId(null)}>{t('Done')}</button>}>
          <div className="detail-grid">
            <div>
              <h4 className="mini-title">{t('Items')}</h4>
              <ul className="list">
                {open.items.map((i, k) => (
                  <li key={i.pid + k}>
                    <div><strong>{i.name}</strong><span className="muted">{i.qty} x {inr(i.price)}{i.size ? ` · ${i.size}` : ''}</span></div>
                    <strong>{inr(i.price * i.qty)}</strong>
                  </li>
                ))}
                <li className="total-row"><strong>{t('Order total')}</strong><strong>{inr(open.total)}</strong></li>
              </ul>
              <p className="muted row-gap"><MapPin size={15} />{open.address}</p>
              {open.phone && <p className="muted row-gap"><Phone size={15} />{open.phone}</p>}
              <h4 className="mini-title" style={{ marginTop: 16 }}>{t('Order timeline')}</h4>
              <ul className="list">
                {open.log.map((l, k) => <li key={k}><div><strong>{t(STAGES[l.stage])}</strong><span className="muted">{l.note}</span></div><span className="muted">{whenTime(l.at)}</span></li>)}
              </ul>
            </div>
            <div>
              <h4 className="mini-title">{t('Update order')}</h4>
              <label className="field"><span className="field-label">{t('Fulfilment status')}</span>
                <select value={statusOf(open)} disabled={open.cancelled || open.stage === 3} onChange={(e) => change(open, e.target.value)}>{optionsFor(open)}</select>
              </label>
              <p className="muted" style={{ fontSize: 13, margin: '0 0 12px' }}>{open.dispatchSms ? t('Dispatch SMS has been sent.') : t('The dispatch SMS is sent when you mark the order Dispatched.')}</p>
              <label className="field"><span className="field-label">{t('Courier')}</span><input value={ship.courier} onChange={(e) => setShip({ ...ship, courier: e.target.value })} /></label>
              <label className="field"><span className="field-label">{t('Tracking number')}</span><input value={ship.awb} onChange={(e) => setShip({ ...ship, awb: e.target.value })} /></label>
              <label className="field"><span className="field-label">{t('Expected delivery')}</span><input type="date" value={ship.eta} onChange={(e) => setShip({ ...ship, eta: e.target.value })} /></label>
              <button className="btn btn-soft" onClick={saveShip} disabled={open.cancelled}>{t('Save shipping details')}</button>
              <div className="row-gap" style={{ marginTop: 14 }}><Badge>{statusOf(open)}</Badge><span className="muted">{open.payment}</span></div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
