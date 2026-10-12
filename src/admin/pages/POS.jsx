import { useEffect, useMemo, useState } from 'react';
import {
  Search, Plus, Minus, Trash2, Receipt, Smartphone, CreditCard, Banknote,
  Printer, MessageSquare, ShoppingBag, Sparkles, User, X
} from 'lucide-react';
import { useStore } from '../store.jsx';
import { api } from '../../api';
import { catalogue, sellable } from '../../products/data/products';
import { SERVICES, INITIAL_CUSTOMERS, inr } from '../data/mockData.js';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import { useT } from '../i18n.js';

const PAY_METHODS = [
  { id: 'Cash', icon: Banknote, label: 'Cash' },
  { id: 'UPI', icon: Smartphone, label: 'UPI' },
  { id: 'Card', icon: CreditCard, label: 'Card' },
  { id: 'Razorpay', icon: CreditCard, label: 'Razorpay' },
];
const GST = api.pos.GST_RATE;

export default function POS() {
  const { user, notify } = useStore();
  const { t } = useT();
  const [, tick] = useState(0);
  const re = () => tick((n) => n + 1);
  useEffect(() => api.stock.subscribe(re), []);

  const [tab, setTab] = useState('products'); // products | services
  const [q, setQ] = useState('');
  const [cart, setCart] = useState([]); // PosLine[]
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pay, setPay] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [lastInvoice, setLastInvoice] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const products = useMemo(
    () =>
      sellable().map((p) => {
        const stock = api.stock.stockOverride(p.id) ?? p.baseStock ?? p.stock;
        return { ...p, stock };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick]
  );

  const filteredProducts = products.filter(
    (p) =>
      p.stock > 0 &&
      (!q.trim() ||
        `${p.name} ${p.sku} ${p.subcategory}`.toLowerCase().includes(q.trim().toLowerCase()))
  );
  const filteredServices = SERVICES.filter(
    (s) => !q.trim() || s.name.toLowerCase().includes(q.trim().toLowerCase())
  );

  const gst = api.pos.cartGst(cart);

  const addProduct = (p) => {
    if (p.stock <= 0) {
      notify('Out of stock', 'error');
      return;
    }
    setCart((c) => {
      const i = c.findIndex((l) => l.kind === 'product' && l.id === p.id);
      if (i >= 0) {
        const next = [...c];
        if (next[i].qty >= p.stock) {
          notify('Only {n} in stock', 'error', { n: p.stock });
          return c;
        }
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [
        ...c,
        {
          kind: 'product',
          id: p.id,
          sku: p.sku,
          name: p.name,
          qty: 1,
          unitPrice: p.price,
          gstRate: GST,
        },
      ];
    });
  };

  const addService = (s) => {
    setCart((c) => {
      const key = s.name;
      const i = c.findIndex((l) => l.kind === 'service' && l.id === key);
      if (i >= 0) {
        const next = [...c];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [
        ...c,
        {
          kind: 'service',
          id: key,
          sku: 'SVC',
          name: s.name,
          qty: 1,
          unitPrice: s.price,
          gstRate: GST,
        },
      ];
    });
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
    try {
      const result = api.pos.createInvoice({
        customerName: customerName || 'Walk-in',
        customerPhone,
        lines: cart,
        payment: pay,
        cashier: user?.name || 'Staff',
        cashierRole: user?.role || 'Staff',
        notes,
        deductStock: true,
        baseStockOf: (id) => {
          const p = catalogue().find((x) => x.id === id);
          return p?.baseStock ?? p?.stock ?? 0;
        },
      });
      if (result.stockErrors.length) {
        notify('Stock warning: {list}', 'info', { list: result.stockErrors.join(', ') });
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
        {/* Catalogue */}
        <div className="pos-catalogue card">
          <div className="pos-tabs">
            <button
              className={tab === 'products' ? 'active' : ''}
              onClick={() => setTab('products')}
            >
              <ShoppingBag size={16} /> {t('Products')}
            </button>
            <button
              className={tab === 'services' ? 'active' : ''}
              onClick={() => setTab('services')}
            >
              <Sparkles size={16} /> {t('Services')}
            </button>
          </div>
          <div className="search-box" style={{ marginBottom: 14 }}>
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('Search name or SKU')}
              aria-label={t('Search catalogue')}
            />
          </div>
          <div className="pos-grid">
            {tab === 'products' &&
              filteredProducts.slice(0, 48).map((p) => (
                <button key={p.id} className="pos-tile" onClick={() => addProduct(p)} type="button">
                  <strong className="pos-tile-name">{p.name}</strong>
                  <span className="muted">{p.sku}</span>
                  <div className="pos-tile-foot">
                    <strong>{inr(p.price)}</strong>
                    <Badge>{p.stock} left</Badge>
                  </div>
                </button>
              ))}
            {tab === 'services' &&
              filteredServices.map((s) => (
                <button key={s.name} className="pos-tile" onClick={() => addService(s)} type="button">
                  <strong className="pos-tile-name">{s.name}</strong>
                  <span className="muted">{s.duration} min</span>
                  <div className="pos-tile-foot">
                    <strong>{inr(s.price)}</strong>
                    <Badge>Service</Badge>
                  </div>
                </button>
              ))}
            {tab === 'products' && !filteredProducts.length && (
              <p className="muted" style={{ gridColumn: '1/-1', padding: 12 }}>
                {t('No products match')}
              </p>
            )}
          </div>
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
            {!cart.length ? (
              <p className="muted" style={{ padding: '12px 0' }}>
                {t('Tap products or services to add them to the bill.')}
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
              {INITIAL_CUSTOMERS.slice(0, 4).map((c) => (
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
              {t('Prices include 18% GST. CGST + SGST shown on the bill. SMS uses the demo outbox.')}
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
                onClick={() => {
                  notify('Print preview is demo-only', 'info');
                }}
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
                    <td>{inr(inv.cgst)}</td>
                    <td>{inr(inv.sgst)}</td>
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
