import { useMemo, useState } from 'react';
import { Search, Boxes, Layers, AlertTriangle, PackageX, Minus, Plus, PackagePlus } from 'lucide-react';
import { useStore, normaliseProduct } from '../store.jsx';
import { CATEGORIES, LOW_STOCK } from '../data/mockData.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import Field from '../components/Field.jsx';
import ProductThumb from '../components/ProductThumb.jsx';
import { useT } from '../i18n.js';

const stockState = (p) => (p.stock === 0 ? 'Out of Stock' : p.stock <= LOW_STOCK ? 'Low Stock' : 'In Stock');

export default function Inventory() {
  const { products, setProducts, notify } = useStore();
  const { t, lang } = useT();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [state, setState] = useState('All');
  const [edit, setEdit] = useState(null); // { product, qty, error }

  const stats = useMemo(() => ({
    skus: products.length,
    units: products.reduce((s, p) => s + p.stock, 0),
    low: products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK).length,
    out: products.filter((p) => p.stock === 0).length
  }), [products]);

  const rows = products.filter((p) =>
    (cat === 'All' || p.category === cat) &&
    (state === 'All' || stockState(p) === state) &&
    (!q.trim() || `${p.name} ${p.id}`.toLowerCase().includes(q.trim().toLowerCase()))
  );

  const setStock = (id, stock, message) => {
    setProducts((list) => list.map((p) => (p.id === id ? normaliseProduct({ ...p, stock, capacity: Math.max(p.capacity || 0, stock) }) : p)));
    notify(message);
  };

  const bump = (p, delta) => {
    const next = Math.max(0, p.stock + delta);
    if (next === p.stock) return;
    setStock(p.id, next, `${p.name} stock is now ${next}.`);
  };

  const needRestock = products.filter((p) => p.stock <= LOW_STOCK).sort((a, b) => a.stock - b.stock);
  const restock = (p) => setStock(p.id, Math.max(p.capacity || 30, p.stock), `${p.name} restocked to ${Math.max(p.capacity || 30, p.stock)} units.`);

  const saveEdit = () => {
    const v = edit.qty.trim();
    if (v === '' || !/^\d+$/.test(v)) { setEdit({ ...edit, error: 'Enter a whole number, zero or more.' }); return; }
    setStock(edit.product.id, Number(v), `${edit.product.name} stock updated to ${Number(v)}.`);
    setEdit(null);
  };

  return (
    <div className="page">
      <PageHeader title={t('Inventory')} subtitle={`Low stock is ${LOW_STOCK} units or fewer. Updates apply instantly across the panel.`} />
      <div className="stat-grid four">
        <StatCard icon={Boxes} label={t('Total SKUs')} value={stats.skus} tone="sage" />
        <StatCard icon={Layers} label={t('Total stock units')} value={stats.units.toLocaleString('en-IN')} tone="forest" />
        <StatCard icon={AlertTriangle} label={t('Low-stock products')} value={stats.low} tone="amber" />
        <StatCard icon={PackageX} label={t('Out-of-stock products')} value={stats.out} tone="rose" />
      </div>

      {needRestock.length > 0 && (
        <div className="card restock">
          <div className="card-head"><h3>{t('Restocking visibility')}</h3><span className="muted">{needRestock.length} product(s) need attention</span></div>
          <ul className="list">
            {needRestock.map((p) => (
              <li key={p.id}>
                <div className="row-gap"><AlertTriangle size={17} className={p.stock === 0 ? 'ic-red' : 'ic-amber'} /><div><strong>{p.name}</strong><span className="muted">{p.stock === 0 ? 'Out of stock, restock now' : `Only ${p.stock} left`}</span></div></div>
                <button className="btn btn-soft" onClick={() => restock(p)}><PackagePlus size={16} />Restock to {Math.max(p.capacity || 30, p.stock)}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search inventory')} aria-label={t('Search inventory')} /></div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label={t('Filter by category')}><option value="All">{t('All categories')}</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        <select value={state} onChange={(e) => setState(e.target.value)} aria-label={t('Filter by stock status')}><option value="All">{t('All stock levels')}</option><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select>
      </div>

      <div className="inv-grid">
        {rows.length === 0 && <p className="muted">{t('No products match your filters.')}</p>}
        {rows.map((p) => {
          const st = stockState(p);
          const cap = Math.max(p.capacity || 1, p.stock, 1);
          const pct = Math.min(100, Math.round((p.stock / cap) * 100));
          return (
            <article key={p.id} className={`inv-card ${st === 'Out of Stock' ? 'is-out' : st === 'Low Stock' ? 'is-low' : ''}`}>
              <div className="row-gap"><ProductThumb product={p} index={products.findIndex((x) => x.id === p.id)} /><div className="grow"><strong>{p.name}</strong><span className="muted block">{p.id} - {p.category}</span></div><Badge>{st}</Badge></div>
              <div className="between"><span className="muted">{t('Stock level')}</span><strong>{p.stock} / {cap}</strong></div>
              <div className="progress"><div className={`progress-fill ${st === 'Out of Stock' ? 'red' : st === 'Low Stock' ? 'amber' : 'green'}`} style={{ width: `${pct}%` }} /></div>
              {st === 'Out of Stock' && <p className="warn red">Out of Stock. Customers cannot order this product.</p>}
              {st === 'Low Stock' && <p className="warn amber">Low stock warning. Consider restocking soon.</p>}
              <div className="stock-controls">
                <button className="icon-btn" onClick={() => bump(p, -1)} aria-label={`Decrease ${p.name}`}><Minus size={16} /></button>
                <button className="icon-btn" onClick={() => bump(p, 1)} aria-label={`Increase ${p.name}`}><Plus size={16} /></button>
                <button className="btn btn-ghost small" onClick={() => setEdit({ product: p, qty: String(p.stock), error: '' })}>{t('Update quantity')}</button>
              </div>
            </article>
          );
        })}
      </div>

      {edit && (
        <Modal title={t('Update stock quantity')} subtitle={edit.product.name} onClose={() => setEdit(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setEdit(null)}>{t('Cancel')}</button><button className="btn btn-primary" onClick={saveEdit}>{t('Save quantity')}</button></>}>
          <Field label={t('New stock quantity')} error={edit.error} hint="Setting zero marks the product as Out of Stock">
            <input autoFocus inputMode="numeric" value={edit.qty} onChange={(e) => setEdit({ ...edit, qty: e.target.value, error: '' })} />
          </Field>
        </Modal>
      )}
    </div>
  );
}
