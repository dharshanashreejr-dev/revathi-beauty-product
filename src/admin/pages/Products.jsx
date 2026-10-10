import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, LayoutGrid, List } from 'lucide-react';
import { useStore, normaliseProduct } from '../store.jsx';
import { CATEGORIES, PRODUCT_STATUSES, inr } from '../data/mockData.js';
import { nextId } from '../utils.js';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Field from '../components/Field.jsx';
import ProductThumb from '../components/ProductThumb.jsx';
import { useT } from '../i18n.js';

const blank = { name: '', category: CATEGORIES[0], price: '', stock: '', status: 'Active', description: '' };

export default function Products({ intent, onIntentHandled }) {
  const { products, setProducts, notify } = useStore();
  const { t, lang } = useT();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [status, setStatus] = useState('All');
  const [view, setView] = useState('table');
  const [form, setForm] = useState(null); // { mode, data }
  const [errors, setErrors] = useState({});
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    if (intent === 'add') {
      setForm({ mode: 'add', data: { ...blank } });
      onIntentHandled();
    }
  }, [intent, onIntentHandled]);

  const rows = useMemo(
    () =>
      products.filter((p) =>
        (cat === 'All' || p.category === cat) &&
        (status === 'All' || p.status === status) &&
        (!q.trim() || `${p.name} ${p.id}`.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [products, q, cat, status]
  );
  const indexOf = (id) => products.findIndex((p) => p.id === id);

  const openEdit = (p) => { setErrors({}); setForm({ mode: 'edit', data: { ...p, price: String(p.price), stock: String(p.stock) } }); };
  const openAdd = () => { setErrors({}); setForm({ mode: 'add', data: { ...blank } }); };
  const set = (k, v) => setForm((f) => ({ ...f, data: { ...f.data, [k]: v } }));

  const validate = (d) => {
    const e = {};
    if (!d.name.trim()) e.name = 'Product name is required.';
    else if (d.name.trim().length < 3) e.name = 'Name must be at least 3 characters.';
    if (d.price === '' || Number.isNaN(Number(d.price))) e.price = 'Enter a valid price.';
    else if (Number(d.price) <= 0) e.price = 'Price must be greater than zero.';
    if (d.stock === '' || Number.isNaN(Number(d.stock))) e.stock = 'Enter a stock quantity.';
    else if (!Number.isInteger(Number(d.stock)) || Number(d.stock) < 0) e.stock = 'Stock must be a whole number, zero or more.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    const d = form.data;
    if (!validate(d)) { notify('Please fix the highlighted fields.', 'error'); return; }
    const clean = normaliseProduct({
      ...d, name: d.name.trim(), price: Number(d.price), stock: Number(d.stock),
      capacity: Math.max(Number(d.capacity) || 0, Number(d.stock), 20)
    });
    if (form.mode === 'add') {
      setProducts((list) => [{ ...clean, id: nextId('MB', list, 1010) }, ...list]);
      notify(`${clean.name} was added to the catalogue.`);
    } else {
      setProducts((list) => list.map((p) => (p.id === clean.id ? clean : p)));
      notify(`${clean.name} was updated.`);
    }
    setForm(null);
  };

  const remove = () => {
    setProducts((list) => list.filter((p) => p.id !== toDelete.id));
    notify(`${toDelete.name} was deleted.`);
    setToDelete(null);
  };

  const stockCell = (p) => (p.stock === 0 ? <span className="stock-zero">{t('Out of stock')}</span> : <span className={p.stock <= 10 ? 'stock-low' : ''}>{p.stock} units</span>);
  const actions = (p) => (
    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
      <button className="icon-btn" onClick={() => openEdit(p)} aria-label={`Edit ${p.name}`}><Pencil size={16} /></button>
      <button className="icon-btn danger" onClick={() => setToDelete(p)} aria-label={`Delete ${p.name}`}><Trash2 size={16} /></button>
    </div>
  );

  const columns = [
    { key: 'name', label: t('Product'), render: (p) => (
      <div className="row-gap"><ProductThumb product={p} index={indexOf(p.id)} /><div><strong>{p.name}</strong><span className="muted block">{p.id}</span></div></div>
    ) },
    { key: 'category', label: t('Category') },
    { key: 'price', label: t('Price'), render: (p) => inr(p.price) },
    { key: 'stock', label: t('Stock'), render: stockCell },
    { key: 'status', label: t('Status'), render: (p) => <Badge>{p.status}</Badge> },
    { key: 'actions', label: '', width: '96px', render: actions }
  ];

  return (
    <div className="page">
      <PageHeader
        title={t('Product catalogue')}
        subtitle={`${products.length} products across ${CATEGORIES.length} categories`}
        actions={<button className="btn btn-primary" onClick={openAdd}><Plus size={17} />{t('Add product')}</button>}
      />

      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search by name or product ID')} aria-label={t('Search products')} /></div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label={t('Filter by category')}>
          <option value="All">{t('All categories')}</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={t('Filter by status')}>
          <option value="All">{t('All statuses')}</option>{PRODUCT_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="view-toggle">
          <button className={view === 'table' ? 'active' : ''} onClick={() => setView('table')} aria-label="Table view"><List size={17} /></button>
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Card view"><LayoutGrid size={17} /></button>
        </div>
      </div>

      {view === 'table' ? (
        <div className="card flush"><DataTable columns={columns} rows={rows} /></div>
      ) : (
        <div className="product-grid">
          {rows.length === 0 && <p className="muted">No products match your filters.</p>}
          {rows.map((p) => (
            <article key={p.id} className="product-card">
              <div className="product-card-art"><ProductThumb product={p} size={88} index={indexOf(p.id)} /></div>
              <div className="product-card-body">
                <div className="between"><Badge>{p.status}</Badge><span className="muted">{p.id}</span></div>
                <h4>{p.name}</h4>
                <span className="muted">{p.category}</span>
                <div className="between"><strong>{inr(p.price)}</strong>{stockCell(p)}</div>
                {actions(p)}
              </div>
            </article>
          ))}
        </div>
      )}

      {form && (
        <Modal
          title={form.mode === 'add' ? t('Add product') : t('Edit product')}
          subtitle={form.mode === 'edit' ? form.data.id : 'A new ID is generated automatically'}
          onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>{t('Cancel')}</button><button className="btn btn-primary" onClick={save}>{form.mode === 'add' ? t('Add product') : t('Save changes')}</button></>}
        >
          <div className="form-grid">
            <Field label={t('Product name')} error={errors.name}><input value={form.data.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Rose Petal Radiance Serum" /></Field>
            <Field label={t('Category')}><select value={form.data.category} onChange={(e) => set('category', e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label={t('Price (INR)')} error={errors.price}><input inputMode="decimal" value={form.data.price} onChange={(e) => set('price', e.target.value)} placeholder="2450" /></Field>
            <Field label={t('Stock quantity')} error={errors.stock} hint="Zero marks the product as Out of Stock"><input inputMode="numeric" value={form.data.stock} onChange={(e) => set('stock', e.target.value)} placeholder="25" /></Field>
            <Field label={t('Status')}><select value={form.data.status} onChange={(e) => set('status', e.target.value)}>{PRODUCT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <Field label={t('Description')}><textarea rows={3} value={form.data.description} onChange={(e) => set('description', e.target.value)} placeholder="Short product description" /></Field>
          </div>
        </Modal>
      )}
      {toDelete && (
        <ConfirmDialog title={t('Delete product')} message={`Delete "${toDelete.name}" (${toDelete.id})? This removes it from the catalogue and inventory in this demo.`} onConfirm={remove} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}
