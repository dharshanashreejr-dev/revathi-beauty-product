import { useEffect, useMemo, useState } from 'react';
import {
  Plus, Minus, Trash2, Receipt, Smartphone, CreditCard, Banknote,
  Printer, MessageSquare, ShoppingBag, User, X, Inbox, CalendarDays, Check
} from 'lucide-react';
import { useStore } from '../store.jsx';
import { api } from '../../api';
import { catalogue, sellable } from '../../products/data/products';
import { inr } from '../data/mockData.js';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import PrintPreview from '../components/PrintPreview.jsx';
import { buildInvoiceDocs } from '../lib/orderPrint.js';
import { useT } from '../i18n.js';

const PAY_METHODS = [
  { id: 'Cash', icon: Banknote, label: 'Cash' },
  { id: 'UPI', icon: Smartphone, label: 'UPI' },
  { id: 'Card', icon: CreditCard, label: 'Card' },
  { id: 'Razorpay', icon: CreditCard, label: 'Razorpay' },
];
const GST = api.pos.GST_RATE;
const BILLED_KEY = 'rhbc-pos-billed';
const OPEN_APPT = ['Pending Review', 'Scheduled', 'Checked-In', 'In Session', 'Rescheduled'];

export default function POS() {
  const { user, notify, customers, orders, appointments, messages, markMessageRead } = useStore();
  const { t } = useT();
  const [ver, tick] = useState(0);
  const re = () => tick((n) => n + 1);
  useEffect(() => api.stock.subscribe(re), []);
  useEffect(() => api.catalogue.subscribe(re), []);

  const [tab, setTab] = useState('all'); // inbox filter: all | orders | appointments | messages
  const [cart, setCart] = useState([]); // PosLine[]
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pay, setPay] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [lastInvoice, setLastInvoice] = useState(null);
  const [withGst, setWithGst] = useState(true); // bill type toggle: with GST / without GST
  const [gstin, setGstin] = useState(''); // customer GSTIN (optional, with-GST bills only)
  const [custom, setCustom] = useState({ name: '', price: '', qty: '1' }); // item typed in at the counter
  const [printInv, setPrintInv] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [sources, setSources] = useState([]); // inbox items loaded into the current bill
  const [billed, setBilled] = useState(() => { try { return JSON.parse(localStorage.getItem(BILLED_KEY) || '[]'); } catch { return []; } });

  const products = useMemo(
    () =>
      sellable().map((p) => {
        const stock = api.stock.stockOverride(p.id) ?? p.baseStock ?? p.stock;
        return { ...p, stock };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ver]
  );

  // Inbox: online orders, appointments and staff messages that are waiting for the counter.
  const inbox = useMemo(() => {
    const rows = [
      ...orders
        .filter((o) => o.status !== 'Cancelled' && !billed.includes(o.id))
        .map((o) => ({ key: o.id, type: 'orders', at: o.placedAt || o.date, title: o.customer, sub: o.items.map((i) => `${i.name} × ${i.qty}`).join(', '), meta: `${o.id} · ${o.status}`, total: o.total, phone: o.phone, order: o })),
      ...appointments
        .filter((a) => OPEN_APPT.includes(a.status) && !billed.includes(a.id))
        .map((a) => ({ key: a.id, type: 'appointments', at: a.createdAt || a.date, title: a.customer, sub: a.service, meta: `${a.id} · ${a.date} ${a.time}`, total: a.price || 0, phone: a.phone, appt: a })),
      ...messages.map((m) => ({ key: `msg-${m.id}`, type: 'messages', at: m.at, title: m.from || 'System', sub: m.text, meta: new Date(m.at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), unread: !m.read, msgId: m.id })),
    ];
    const ms = (v) => (typeof v === 'number' ? v : Date.parse(v) || 0);
    return rows.sort((x, y) => ms(y.at) - ms(x.at));
  }, [orders, appointments, messages, billed]);
  const count = (k) => inbox.filter((r) => k === 'all' || r.type === k).length;
  const shown = inbox.filter((r) => tab === 'all' || r.type === tab);

  const gross = api.pos.cartGst(cart);
  // Without GST: same prices, no tax split.
  const gst = withGst ? gross : { taxable: gross.total, cgst: 0, sgst: 0, total: gross.total };

  const addCustom = () => {
    const name = custom.name.trim();
    if (name.length < 2) { notify('Enter the item name.', 'error'); return; }
    if (!/^\d+(\.\d{1,2})?$/.test(custom.price.trim()) || Number(custom.price) <= 0) { notify('Enter a valid price.', 'error'); return; }
    if (!/^\d+$/.test(custom.qty.trim()) || Number(custom.qty) < 1 || Number(custom.qty) > 999) { notify('Enter a quantity from 1 to 999.', 'error'); return; }
    setCart((c) => [...c, { kind: 'custom', id: `custom-${Date.now().toString(36)}`, sku: 'CUSTOM', name, qty: Number(custom.qty), unitPrice: Number(custom.price), gstRate: GST }]);
    setCustom({ name: '', price: '', qty: '1' });
  };

  // Loads an inbox order / appointment into the bill. Online orders already reduced stock when they were placed,
  // so they are added as plain lines (no second stock deduction).
  const addFromInbox = (r) => {
    if (sources.includes(r.key)) { notify('Already added to the bill.', 'info'); return; }
    if (r.order) {
      setCart((c) => [...c, ...r.order.items.map((i) => ({ kind: 'custom', id: `${r.key}-${i.productId || i.name}`, sku: r.key, name: i.name, qty: i.qty, unitPrice: i.price, gstRate: GST }))]);
    } else {
      setCart((c) => [...c, { kind: 'service', id: `${r.key}-${r.appt.service}`, sku: r.key, name: r.appt.service, qty: 1, unitPrice: r.appt.price || 0, gstRate: GST }]);
    }
    if (!customerName) setCustomerName(r.title || '');
    if (!customerPhone) setCustomerPhone(String(r.phone || '').replace(/\D/g, '').slice(-10));
    setSources((x) => [...x, r.key]);
    notify('Added to the bill.');
  };

  const setQty = (idx, qty) => {
    setCart((c) => {
      const next = [...c];
      const line = next[idx];
      if (qty <= 0) {
        next.splice(idx, 1);
        return next;
      }
      if (line.kind === 'product') {
        const p = products.find((x) => x.id === line.id);
        const max = p?.stock ?? 0;
        if (qty > max) {
          notify('Only {n} in stock', 'error', { n: max });
          return c;
        }
      }
      next[idx] = { ...line, qty };
      return next;
    });
  };

  const removeLine = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  const clearCart = () => {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
    setGstin('');
    setSources([]);
  };

  const pickCustomer = (c) => {
    setCustomerName(c.name);
    setCustomerPhone((c.phone || '').replace(/\D/g, '').slice(-10));
  };

  const checkout = () => {
    if (!cart.length) {
      notify('Add at least one item', 'error');
      return;
    }
    if (customerPhone && !/^[6-9]\d{9}$/.test(customerPhone)) {
      notify('Enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (withGst && gstin.trim() && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(gstin.trim().toUpperCase())) {
      notify('Enter a valid 15-character GSTIN or leave it empty.', 'error');
      return;
    }
    try {
      const result = api.pos.createInvoice({
        customerName: customerName || 'Walk-in',
        customerPhone,
        lines: cart,
        payment: pay,
        cashier: user?.name || 'Staff',
        cashierRole: user?.role || 'Staff',
        notes,
        withGst,
        gstin,
        deductStock: true,
        baseStockOf: (id) => {
          const p = catalogue().find((x) => x.id === id);
          return p?.baseStock ?? p?.stock ?? 0;
        },
      });
      if (result.stockErrors.length) {
        notify('Stock warning: {list}', 'info', { list: result.stockErrors.join(', ') });
      }
      if (sources.length) {
        const next = [...billed, ...sources];
        setBilled(next);
        try { localStorage.setItem(BILLED_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      }
      setLastInvoice(result.invoice);
      notify('Invoice {id} created · {total}', 'success', {
        id: result.invoice.id,
        total: inr(result.invoice.total),
      });
      clearCart();
      re();
    } catch (e) {
      notify(e.message || 'Could not create invoice', 'error');
    }
  };

  const invoices = api.pos.listInvoices(30);

  return (
    <div className="page">
      <PageHeader
        title={t('POS Billing')}
        subtitle={t('In-store billing with GST (18% inclusive). Demo only — no real payments.')}
        actions={
          <button className="btn btn-ghost" onClick={() => setShowHistory(true)}>
            <Receipt size={17} />
            {t('Recent invoices')}
          </button>
        }
      />

      <div className="pos-layout">
        {/* Inbox */}
        <div className="pos-catalogue card">
          <div className="pos-tabs" style={{ flexWrap: 'wrap' }}>
            {[['all', Inbox, 'All'], ['orders', ShoppingBag, 'Orders'], ['appointments', CalendarDays, 'Appointments'], ['messages', MessageSquare, 'Messages']].map(([id, Icon, label]) => (
              <button key={id} type="button" className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
                <Icon size={16} /> {t(label)} ({count(id)})
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 2fr) minmax(80px, 1fr) 70px auto', gap: 8, marginBottom: 6 }}>
            <input value={custom.name} onChange={(e) => setCustom({ ...custom, name: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && addCustom()} placeholder={t('Item name (product or service)')} aria-label={t('Item name')} />
            <input value={custom.price} inputMode="decimal" onChange={(e) => setCustom({ ...custom, price: e.target.value.replace(/[^\d.]/g, '') })} onKeyDown={(e) => e.key === 'Enter' && addCustom()} placeholder={t('Price (₹)')} aria-label={t('Price')} />
            <input value={custom.qty} inputMode="numeric" onChange={(e) => setCustom({ ...custom, qty: e.target.value.replace(/\D/g, '').slice(0, 3) })} onKeyDown={(e) => e.key === 'Enter' && addCustom()} placeholder={t('Qty')} aria-label={t('Quantity')} />
            <button type="button" className="btn btn-soft" onClick={addCustom}><Plus size={16} />{t('Add item')}</button>
          </div>
          <p className="muted" style={{ margin: '0 0 12px', fontSize: 12.5 }}>{t('Type an item (name and price) and add it to the bill. It is billed only, not saved in the catalogue.')}</p>

          <ul className="list" style={{ maxHeight: 560, overflowY: 'auto' }}>
            {shown.map((r) => (
              <li key={r.key} style={{ alignItems: 'flex-start', gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <strong>{r.title}</strong>{' '}{r.unread && <Badge tone="blue">{t('New')}</Badge>}
                  <span className="muted block" style={{ whiteSpace: 'normal' }}>{r.sub}</span>
                  <span className="muted block" style={{ fontSize: 12 }}>{r.meta}</span>
                </div>
                {r.type === 'messages' ? (
                  r.unread && <button type="button" className="btn btn-ghost small" onClick={() => markMessageRead(r.msgId)}><Check size={15} /> {t('Mark read')}</button>
                ) : (
                  <div style={{ textAlign: 'right' }}>
                    <strong>{inr(r.total)}</strong>
                    <button type="button" className="btn btn-soft small" style={{ display: 'flex', marginTop: 6 }} disabled={sources.includes(r.key)} onClick={() => addFromInbox(r)}>
                      <Plus size={15} /> {sources.includes(r.key) ? t('Added') : t('Add to bill')}
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {!shown.length && <p className="muted" style={{ padding: 12 }}>{t('Your inbox is empty. New orders, appointments and messages will appear here.')}</p>}
        </div>

        {/* Cart + checkout */}
        <div className="pos-side">
          <div className="card pos-cart">
            <div className="card-head">
              <h3>{t('Bill')}</h3>
              {cart.length > 0 && (
                <button className="btn btn-ghost small" onClick={clearCart}>
                  <Trash2 size={15} /> {t('Clear')}
                </button>
              )}
            </div>
            <div role="group" aria-label={t('Bill type')} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <button type="button" aria-pressed={withGst} className={`btn small ${withGst ? 'btn-primary' : 'btn-ghost'}`} style={{ flex: 1 }} onClick={() => setWithGst(true)}>{t('With GST')}</button>
              <button type="button" aria-pressed={!withGst} className={`btn small ${!withGst ? 'btn-primary' : 'btn-ghost'}`} style={{ flex: 1 }} onClick={() => setWithGst(false)}>{t('Without GST')}</button>
            </div>
            {!cart.length ? (
              <p className="muted" style={{ padding: '12px 0' }}>
                {t('Add items from the inbox or type an item to start the bill.')}
              </p>
            ) : (
              <ul className="pos-lines">
                {cart.map((l, idx) => (
                  <li key={`${l.kind}-${l.id}`}>
                    <div className="pos-line-main">
                      <strong>{l.name}</strong>
                      <span className="muted">
                        {l.sku} · {inr(l.unitPrice)}
                      </span>
                    </div>
                    <div className="pos-line-qty">
                      <button
                        className="icon-btn"
                        onClick={() => setQty(idx, l.qty - 1)}
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{l.qty}</span>
                      <button
                        className="icon-btn"
                        onClick={() => setQty(idx, l.qty + 1)}
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <strong className="pos-line-total">{inr(l.unitPrice * l.qty)}</strong>
                    <button className="icon-btn" onClick={() => removeLine(idx)} aria-label="Remove">
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="pos-gst">
              {withGst && (
                <>
                  <div>
                    <span className="muted">{t('Taxable value')}</span>
                    <strong>{inr(gst.taxable)}</strong>
                  </div>
                  <div>
                    <span className="muted">CGST ({GST / 2}%)</span>
                    <strong>{inr(gst.cgst)}</strong>
                  </div>
                  <div>
                    <span className="muted">SGST ({GST / 2}%)</span>
                    <strong>{inr(gst.sgst)}</strong>
                  </div>
                </>
              )}
              <div className="pos-grand">
                <span>{t('Grand total')}</span>
                <strong>{inr(gst.total)}</strong>
              </div>
            </div>
          </div>

          <div className="card pos-checkout">
            <h4 className="mini-title">
              <User size={16} /> {t('Customer')}
            </h4>
            <div className="pos-customer-fields">
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t('Name (optional)')}
                aria-label={t('Customer name')}
              />
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder={t('Mobile for SMS bill')}
                aria-label={t('Mobile')}
                inputMode="numeric"
              />
            </div>
            <div className="pos-quick-customers">
              {customers.slice(0, 4).map((c) => (
                <button key={c.id} type="button" className="chip" onClick={() => pickCustomer(c)}>
                  {c.name.split(' ')[0]}
                </button>
              ))}
              <button
                type="button"
                className="chip"
                onClick={() => {
                  setCustomerName('Walk-in');
                  setCustomerPhone('');
                }}
              >
                Walk-in
              </button>
            </div>

            {withGst && (
              <input
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15))}
                placeholder={t('Customer GSTIN (optional)')}
                aria-label={t('Customer GSTIN')}
                style={{ width: '100%', marginTop: 10 }}
              />
            )}

            <h4 className="mini-title" style={{ marginTop: 16 }}>
              {t('Payment')}
            </h4>
            <div className="pos-pay-methods">
              {PAY_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={pay === m.id ? 'active' : ''}
                    onClick={() => setPay(m.id)}
                  >
                    <Icon size={18} />
                    {t(m.label)}
                  </button>
                );
              })}
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('Notes (optional)')}
              rows={2}
              style={{ width: '100%', marginTop: 12, resize: 'vertical' }}
            />

            <button
              className="btn btn-primary btn-block"
              style={{ marginTop: 14, height: 48 }}
              onClick={checkout}
              disabled={!cart.length}
            >
              <Receipt size={18} />
              {t('Charge')} {gst.total > 0 ? inr(gst.total) : ''}
            </button>
            <p className="muted" style={{ marginTop: 8, fontSize: 12.5 }}>
              {withGst ? t('Prices include 18% GST. CGST + SGST shown on the bill. SMS uses the demo outbox.') : t('Bill without GST: same prices, no tax breakup is shown on the bill.')}
            </p>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {lastInvoice && (
        <Modal
          title={t('Invoice {id}', { id: lastInvoice.id })}
          subtitle={t('Payment recorded · {method}', { method: lastInvoice.payment })}
          onClose={() => setLastInvoice(null)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setLastInvoice(null)}>
                {t('Close')}
              </button>
              <button
                className="btn btn-soft"
                onClick={() => setPrintInv(lastInvoice)}
              >
                <Printer size={16} /> {t('Print')}
              </button>
              {lastInvoice.customerPhone && (
                <button className="btn btn-primary" onClick={() => setLastInvoice(null)}>
                  <MessageSquare size={16} /> {t('SMS sent')}
                </button>
              )}
            </>
          }
        >
          <div className="detail-grid">
            <div>
              <h4 className="mini-title">{t('Customer')}</h4>
              <p>
                <strong>{lastInvoice.customerName}</strong>
                {lastInvoice.customerPhone && (
                  <span className="muted block">{lastInvoice.customerPhone}</span>
                )}
              </p>
              <h4 className="mini-title" style={{ marginTop: 14 }}>
                {t('Items')}
              </h4>
              <ul className="list">
                {lastInvoice.lines.map((l) => (
                  <li key={`${l.kind}-${l.id}`}>
                    <div>
                      <strong>{l.name}</strong>
                      <span className="muted">
                        {l.qty} × {inr(l.unitPrice)}
                      </span>
                    </div>
                    <strong>{inr(l.unitPrice * l.qty)}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mini-title">{t('GST breakup')}</h4>
              <ul className="list">
                {lastInvoice.withGst !== false ? (
                  <>
                    <li>
                      <span>{t('Taxable value')}</span>
                      <strong>{inr(lastInvoice.taxable)}</strong>
                    </li>
                    <li>
                      <span>CGST 9%</span>
                      <strong>{inr(lastInvoice.cgst)}</strong>
                    </li>
                    <li>
                      <span>SGST 9%</span>
                      <strong>{inr(lastInvoice.sgst)}</strong>
                    </li>
                  </>
                ) : (
                  <li>
                    <span className="muted">{t('Bill without GST')}</span>
                  </li>
                )}
                {lastInvoice.gstin && (
                  <li>
                    <span>GSTIN</span>
                    <strong>{lastInvoice.gstin}</strong>
                  </li>
                )}
                <li>
                  <span>
                    <strong>{t('Total')}</strong>
                  </span>
                  <strong>{inr(lastInvoice.total)}</strong>
                </li>
              </ul>
              <h4 className="mini-title" style={{ marginTop: 14 }}>
                {t('Bill link')}
              </h4>
              <p className="muted" style={{ wordBreak: 'break-all' }}>
                {lastInvoice.shortLink}
              </p>
              <p className="muted" style={{ marginTop: 8, fontSize: 12.5 }}>
                {t('Cashier')}: {lastInvoice.cashier} ({lastInvoice.cashierRole})
              </p>
            </div>
          </div>
        </Modal>
      )}

      {printInv && (
        <PrintPreview title={t('Print bill')} subtitle={printInv.id} html={buildInvoiceDocs([printInv])} onClose={() => setPrintInv(null)} />
      )}

      {/* History */}
      {showHistory && (
        <Modal
          title={t('Recent POS invoices')}
          subtitle={t('Sample + live demo invoices')}
          wide
          onClose={() => setShowHistory(false)}
          footer={
            <button className="btn btn-primary" onClick={() => setShowHistory(false)}>
              {t('Done')}
            </button>
          }
        >
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('Invoice')}</th>
                  <th>{t('Customer')}</th>
                  <th>{t('Payment')}</th>
                  <th>{t('CGST')}</th>
                  <th>{t('SGST')}</th>
                  <th>{t('Total')}</th>
                  <th>{t('Cashier')}</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <strong>{inv.id}</strong>
                      <span className="muted block">
                        {new Date(inv.at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                    <td>
                      {inv.customerName}
                      {inv.customerPhone && (
                        <span className="muted block">{inv.customerPhone}</span>
                      )}
                    </td>
                    <td>
                      <Badge>{inv.payment}</Badge>
                    </td>
                    <td>{inv.withGst === false ? '-' : inr(inv.cgst)}</td>
                    <td>{inv.withGst === false ? '-' : inr(inv.sgst)}</td>
                    <td>
                      <strong>{inr(inv.total)}</strong>
                    </td>
                    <td>{inv.cashier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
}
