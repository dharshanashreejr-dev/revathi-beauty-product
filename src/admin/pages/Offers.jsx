import { useState } from 'react';
import { Plus, Pencil, Trash2, Gift, Ticket, Layers, Send, Pause, Play } from 'lucide-react';
import { useStore } from '../store.jsx';
import { api } from '../../api';
import { catalogue, sellable } from '../../products/data/products';
import { SERVICES, fmtDate, inr } from '../data/mockData.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import Field from '../components/Field.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useT } from '../i18n.js';
import { heroSlides } from '../../landing/hero-slides';

// CRS 4.3 Discount & Festival Offer Module.
//  - Festival Campaign Creator: Pongal Special, Deepavali Glow Offer, New Year Bundles ... (+ promotional SMS)
//  - Promotional Engines: coupon rules, Service + Product bundles, start and expiry dates (status follows the dates)
// The customer shop already accepts these codes at the payment step (src/products/components/Payment.tsx).
// BACKEND: api/offers.ts becomes REST endpoints; dates drive a scheduler that activates / expires each offer.
const PRESETS = ['Pongal Special', 'Deepavali Glow Offer', 'New Year Bundles', 'Custom festival'];
const SCOPES = [['both', 'Products and services'], ['products', 'Products only'], ['services', 'Services only']];
const TONE = { Active: 'green', Scheduled: 'blue', Expired: 'red', Paused: 'sand' };
const scopeLabel = (s) => (SCOPES.find((x) => x[0] === s) || SCOPES[0])[1];
const blank = {
  campaign: () => ({ id: '', name: '', pct: '', code: '', scope: 'both', start: '', end: '', active: true, used: 0, smsSent: 0 }),
  coupon: () => ({ id: '', code: '', type: 'percent', value: '', minOrder: '0', maxUses: '', used: 0, scope: 'products', start: '', end: '', active: true }),
  bundle: () => ({ id: '', name: '', service: SERVICES[0].name, product: sellable()[0].name, price: '', start: '', end: '', active: true })
};

export default function Offers() {
  const { notify, user, customers } = useStore();
  const { t } = useT();
  const [, tick] = useState(0);
  const re = () => tick((n) => n + 1);
  const [tab, setTab] = useState('campaigns');
  const [form, setForm] = useState(null); // { type, data, errors }
  const [toDelete, setToDelete] = useState(null); // { kind, item, label }
  const [toSms, setToSms] = useState(null);

  const data = api.offers.list();
  const all = [...data.campaigns, ...data.coupons, ...data.bundles];
  const count = (s) => all.filter((o) => api.offers.statusOf(o) === s).length;
  const redemptions = [...data.campaigns, ...data.coupons].reduce((n, o) => n + (o.used || 0), 0);
  const actor = user?.name || 'Admin';
  const audit = (summary) => api.audit.log(actor, user?.role || 'Admin', 'offer.updated', summary);

  const open = (type, row) => setForm({
    type,
    errors: {},
    data: row
      ? { ...row, pct: String(row.pct ?? ''), value: String(row.value ?? ''), minOrder: String(row.minOrder ?? ''), maxUses: row.maxUses ? String(row.maxUses) : '', price: String(row.price ?? '') }
      : blank[type]()
  });
  const set = (k, v) => setForm((f) => ({ ...f, errors: { ...f.errors, [k]: undefined }, data: { ...f.data, [k]: v } }));

  const validate = (type, d) => {
    const e = {};
    if (type !== 'coupon' && d.name.trim().length < 3) e.name = 'Enter a name (at least 3 letters).';
    if (type !== 'bundle') {
      const code = d.code.trim().toUpperCase();
      if (!/^[A-Z0-9]{4,15}$/.test(code)) e.code = 'Code must be 4 to 15 letters or numbers.';
      else if (api.offers.codeTaken(code, d.id || undefined)) e.code = 'This code is already in use.';
    }
    if (type === 'campaign') {
      const n = Number(d.pct);
      if (!/^\d+$/.test(String(d.pct).trim()) || n < 1 || n > 90) e.pct = 'Discount must be 1 to 90 percent.';
    }
    if (type === 'coupon') {
      const n = Number(d.value);
      if (!/^\d+$/.test(String(d.value).trim()) || n <= 0) e.value = 'Enter a whole number above zero.';
      else if (d.type === 'percent' && n > 90) e.value = 'Percentage cannot be more than 90.';
      if (d.minOrder !== '' && !/^\d+$/.test(String(d.minOrder).trim())) e.minOrder = 'Enter a whole number, zero or more.';
      if (d.maxUses !== '' && !/^\d+$/.test(String(d.maxUses).trim())) e.maxUses = 'Enter a whole number or leave empty for unlimited.';
    }
    if (type === 'bundle') {
      const worth = (SERVICES.find((s) => s.name === d.service)?.price || 0) + (catalogue().find((p) => p.name === d.product)?.price || 0);
      const n = Number(d.price);
      if (!/^\d+$/.test(String(d.price).trim()) || n <= 0) e.price = 'Enter the bundle price.';
      else if (n >= worth) e.price = `Bundle price must be less than ${inr(worth)} (service + product).`;
    }
    if (!d.start) e.start = 'Choose a start date.';
    if (!d.end) e.end = 'Choose an expiry date.';
    else if (d.start && d.end < d.start) e.end = 'Expiry cannot be before the start date.';
    return e;
  };

  const submit = () => {
    const { type, data: d } = form;
    const errors = validate(type, d);
    if (Object.keys(errors).length) { setForm({ ...form, errors }); notify('Please fix the highlighted fields.', 'error'); return; }
    const isNew = !d.id;
    if (type === 'campaign') {
      api.offers.saveCampaign({ ...d, id: d.id || api.offers.newId('cmp'), name: d.name.trim(), pct: Number(d.pct) });
      audit(`${isNew ? 'Created' : 'Edited'} festival campaign ${d.name.trim()} (${d.code.trim().toUpperCase()}, ${d.pct}%)`);
    } else if (type === 'coupon') {
      api.offers.saveCoupon({ ...d, id: d.id || api.offers.newId('cpn'), value: Number(d.value), minOrder: Number(d.minOrder || 0), maxUses: Number(d.maxUses || 0) });
      audit(`${isNew ? 'Created' : 'Edited'} coupon ${d.code.trim().toUpperCase()}`);
    } else {
      api.offers.saveBundle({ ...d, id: d.id || api.offers.newId('bun'), name: d.name.trim(), price: Number(d.price) });
      audit(`${isNew ? 'Created' : 'Edited'} bundle offer ${d.name.trim()}`);
    }
    notify(isNew ? 'Offer created.' : 'Offer updated.');
    setForm(null);
    re();
  };

  const toggle = (kind, o) => {
    const next = { ...o, active: !o.active };
    if (kind === 'campaign') api.offers.saveCampaign(next); else if (kind === 'coupon') api.offers.saveCoupon(next); else api.offers.saveBundle(next);
    audit(`${next.active ? 'Resumed' : 'Paused'} ${kind} ${o.name || o.code}`);
    notify(next.active ? '{name} resumed.' : '{name} paused.', 'success', { name: o.name || o.code });
    re();
  };
  const remove = () => {
    api.offers.removeOffer(toDelete.kind, toDelete.item.id);
    audit(`Deleted ${toDelete.kind} ${toDelete.label}`);
    notify('Offer deleted.');
    setToDelete(null);
    re();
  };
  const sendSms = () => {
    const c = toSms;
    customers.forEach((x) => api.sms.sendSms('festival', x.phone, [c.pct, c.code]));
    api.offers.markSmsSent(c.id, customers.length);
    audit(`Sent festival SMS for ${c.name} to ${customers.length} customers`);
    notify('Festival SMS sent to {n} customers (see SMS Outbox).', 'success', { n: customers.length });
    setToDelete(null);
    setToSms(null);
    re();
  };

  const status = (o) => { const s = api.offers.statusOf(o); return <Badge tone={TONE[s]}>{s}</Badge>; };
  const runs = (o) => <span>{fmtDate(o.start)}<span className="muted block">→ {fmtDate(o.end)}</span></span>;
  const rowActions = (kind, o, extra) => (
    <div className="row-actions" onClick={(e) => e.stopPropagation()}>
      {extra}
      <button className="icon-btn" onClick={() => toggle(kind, o)} aria-label={o.active ? t('Pause') : t('Resume')} title={o.active ? t('Pause') : t('Resume')}>{o.active ? <Pause size={16} /> : <Play size={16} />}</button>
      <button className="icon-btn" onClick={() => open(kind, o)} aria-label={t('Edit')} title={t('Edit')}><Pencil size={16} /></button>
      <button className="icon-btn danger" onClick={() => setToDelete({ kind, item: o, label: o.name || o.code })} aria-label={t('Delete')} title={t('Delete')}><Trash2 size={16} /></button>
    </div>
  );

  const columns = {
    campaigns: [
      { key: 'name', label: t('Campaign'), render: (o) => <div><strong>{o.name}</strong><span className="muted block">{t('Code')}: {o.code}</span></div> },
      { key: 'pct', label: t('Discount'), render: (o) => `${o.pct}%` },
      { key: 'scope', label: t('Applies to'), render: (o) => t(scopeLabel(o.scope)) },
      { key: 'runs', label: t('Runs'), render: runs },
      { key: 'status', label: t('Status'), render: status },
      { key: 'sms', label: t('SMS sent'), render: (o) => `${o.smsSent} · ${t('used')} ${o.used}` },
      { key: 'actions', label: '', width: '170px', render: (o) => rowActions('campaign', o, <button className="icon-btn" onClick={() => setToSms(o)} aria-label={t('Send festival SMS')} title={t('Send festival SMS')}><Send size={16} /></button>) }
    ],
    coupons: [
      { key: 'code', label: t('Coupon'), render: (o) => <strong>{o.code}</strong> },
      { key: 'value', label: t('Discount'), render: (o) => (o.type === 'percent' ? `${o.value}%` : inr(o.value)) },
      { key: 'minOrder', label: t('Minimum order'), render: (o) => (o.minOrder ? inr(o.minOrder) : t('None')) },
      { key: 'scope', label: t('Applies to'), render: (o) => t(scopeLabel(o.scope)) },
      { key: 'runs', label: t('Runs'), render: runs },
      { key: 'used', label: t('Used'), render: (o) => (o.maxUses ? `${o.used} / ${o.maxUses}` : `${o.used} / ${t('Unlimited')}`) },
      { key: 'status', label: t('Status'), render: status },
      { key: 'actions', label: '', width: '130px', render: (o) => rowActions('coupon', o) }
    ],
    bundles: [
      { key: 'name', label: t('Bundle'), render: (o) => <div><strong>{o.name}</strong><span className="muted block">{o.service} + {o.product}</span></div> },
      { key: 'price', label: t('Bundle price'), render: (o) => { const w = (SERVICES.find((s) => s.name === o.service)?.price || 0) + (catalogue().find((p) => p.name === o.product)?.price || 0); return <div><strong>{inr(o.price)}</strong>{w > o.price && <span className="muted block">{t('Save {n}', { n: inr(w - o.price) })}</span>}</div>; } },
      { key: 'runs', label: t('Runs'), render: runs },
      { key: 'status', label: t('Status'), render: status },
      { key: 'actions', label: '', width: '130px', render: (o) => rowActions('bundle', o) }
    ]
  };
  const rows = { campaigns: data.campaigns, coupons: data.coupons, bundles: data.bundles }[tab] || [];
  const addLabel = { campaigns: 'New festival campaign', coupons: 'New coupon', bundles: 'New bundle' }[tab];
  const addType = { campaigns: 'campaign', coupons: 'coupon', bundles: 'bundle' }[tab];
  const tabs = [['campaigns', t('Festival campaigns')], ['coupons', t('Coupons')], ['bundles', t('Service + product bundles')], ['gallery', t('Brochures & festive images')]];

  const d = form?.data;
  const er = form?.errors || {};
  const worth = form?.type === 'bundle' ? (SERVICES.find((s) => s.name === d.service)?.price || 0) + (catalogue().find((p) => p.name === d.product)?.price || 0) : 0;

  return (
    <div className="page">
      <PageHeader title={t('Festival & Offers')} subtitle={t('Create festival campaigns, coupon rules and service + product bundles with start and expiry dates.')}
        actions={tab !== 'gallery' && <button className="btn btn-primary" onClick={() => open(addType)}><Plus size={17} />{t(addLabel)}</button>} />

      <div className="stat-grid four">
        <StatCard icon={Gift} label={t('Active offers')} value={count('Active')} tone="forest" />
        <StatCard icon={Ticket} label={t('Scheduled')} value={count('Scheduled')} tone="sage" />
        <StatCard icon={Layers} label={t('Expired')} value={count('Expired')} tone="rose" />
        <StatCard icon={Send} label={t('Coupon redemptions')} value={redemptions} tone="amber" />
      </div>

      <div className="tabs" role="tablist">
        {tabs.map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{label}</button>)}
      </div>
      {tab === 'gallery'
        ? <Gallery t={t} />
        : <div className="card flush"><DataTable columns={columns[tab]} rows={rows} empty="No offers yet. Use the button above to create one." /></div>}

      {form && (
        <Modal wide title={t(`${d.id ? 'Edit' : 'New'} ${{ campaign: 'festival campaign', coupon: 'coupon', bundle: 'bundle' }[form.type]}`)} subtitle={t('Offers follow their start and expiry dates automatically.')} onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>{t('Cancel')}</button><button className="btn btn-primary" onClick={submit}>{t('Save offer')}</button></>}>
          <div className="form-grid">
            {form.type === 'campaign' && (<>
              <Field label={t('Festival template')}>
                <select value={PRESETS.includes(d.name) ? d.name : 'Custom festival'} onChange={(e) => set('name', e.target.value === 'Custom festival' ? '' : e.target.value)}>{PRESETS.map((p) => <option key={p}>{p}</option>)}</select>
              </Field>
              <Field label={t('Campaign name')} error={er.name && t(er.name)}><input value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="Deepavali Glow Offer" /></Field>
              <Field label={t('Discount (%)')} error={er.pct && t(er.pct)}><input inputMode="numeric" value={d.pct} onChange={(e) => set('pct', e.target.value)} placeholder="15" /></Field>
              <Field label={t('Offer code')} error={er.code && t(er.code)} hint={t('Customers type this code at checkout and it is sent in the festival SMS.')}><input value={d.code} onChange={(e) => set('code', e.target.value.toUpperCase())} placeholder="DEEPAVALI15" maxLength={15} /></Field>
            </>)}
            {form.type === 'coupon' && (<>
              <Field label={t('Coupon code')} error={er.code && t(er.code)}><input value={d.code} onChange={(e) => set('code', e.target.value.toUpperCase())} placeholder="WELCOME10" maxLength={15} /></Field>
              <Field label={t('Discount type')}><select value={d.type} onChange={(e) => set('type', e.target.value)}><option value="percent">{t('Percentage')}</option><option value="flat">{t('Flat amount (₹)')}</option></select></Field>
              <Field label={d.type === 'percent' ? t('Discount (%)') : t('Discount amount (₹)')} error={er.value && t(er.value)}><input inputMode="numeric" value={d.value} onChange={(e) => set('value', e.target.value)} /></Field>
              <Field label={t('Minimum order (₹)')} error={er.minOrder && t(er.minOrder)}><input inputMode="numeric" value={d.minOrder} onChange={(e) => set('minOrder', e.target.value)} /></Field>
              <Field label={t('Maximum uses')} error={er.maxUses && t(er.maxUses)} hint={t('Leave empty for unlimited.')}><input inputMode="numeric" value={d.maxUses} onChange={(e) => set('maxUses', e.target.value)} /></Field>
            </>)}
            {form.type === 'bundle' && (<>
              <Field label={t('Bundle name')} error={er.name && t(er.name)}><input value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="Glow Ritual Combo" /></Field>
              <Field label={t('Service')}><select value={d.service} onChange={(e) => set('service', e.target.value)}>{SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name} - {inr(s.price)}</option>)}</select></Field>
              <Field label={t('Product')}><select value={d.product} onChange={(e) => set('product', e.target.value)}>{sellable().map((p) => <option key={p.id} value={p.name}>{p.name} - {inr(p.price)}</option>)}</select></Field>
              <Field label={t('Bundle price (₹)')} error={er.price && t(er.price, { n: inr(worth) })} hint={t('Together they cost {n}', { n: inr(worth) })}><input inputMode="numeric" value={d.price} onChange={(e) => set('price', e.target.value)} /></Field>
            </>)}
            {form.type !== 'bundle' && (
              <Field label={t('Applies to')}><select value={d.scope} onChange={(e) => set('scope', e.target.value)}>{SCOPES.map(([v, l]) => <option key={v} value={v}>{t(l)}</option>)}</select></Field>
            )}
            <Field label={t('Start date')} error={er.start && t(er.start)}><input type="date" value={d.start} onChange={(e) => set('start', e.target.value)} /></Field>
            <Field label={t('Expiry date')} error={er.end && t(er.end)}><input type="date" value={d.end} min={d.start || undefined} onChange={(e) => set('end', e.target.value)} /></Field>
          </div>
        </Modal>
      )}

      {toSms && (
        <ConfirmDialog title={t('Send festival SMS')} confirmLabel="Send SMS" message={t('Send the {name} offer ({pct}% off, code {code}) by SMS to all {n} customers? This uses the Promotional DLT template.', { name: toSms.name, pct: toSms.pct, code: toSms.code, n: customers.length })} onConfirm={sendSms} onCancel={() => setToSms(null)} />
      )}
      {toDelete && !toSms && (
        <ConfirmDialog title={t('Delete offer')} message={t('Delete "{name}"? Customers will no longer be able to use it.', { name: toDelete.label })} onConfirm={remove} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}


// Brochures, festive offers, seasonal offers and ads shown on the customer website (hero banner), for the admin to view.
const EXTRA = [
  { id: 'b1', image: '/assets/banners/best-sellers.webp', label: 'Best sellers banner', kind: 'Banner' },
  { id: 'b2', image: '/assets/banners/combos.webp', label: 'Combos banner', kind: 'Banner' }
];
const KIND = { festive: 'Festive offer', seasonal: 'Seasonal offer', brochure: 'Brochure', daily: "Today's deal" };
function Gallery({ t }) {
  const [big, setBig] = useState(null);
  const items = [
    ...heroSlides.map((s) => ({ id: s.id, image: s.image, kind: KIND[s.id], title: s.title?.en || '', badge: s.badge?.en || '' })),
    ...EXTRA.map((e) => ({ id: e.id, image: e.image, kind: e.kind, title: e.label, badge: '' }))
  ];
  return (
    <>
      <p className="muted" style={{ marginTop: 0 }}>{t('These brochures and festive / seasonal offer images are what customers see on the website home banner.')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {items.map((it) => (
          <div key={it.id} className="card" style={{ padding: 12, cursor: 'zoom-in' }} onClick={() => setBig(it)}>
            <img src={it.image} alt={it.title} loading="lazy" style={{ width: '100%', borderRadius: 10, display: 'block', background: '#f3ece2' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 10, alignItems: 'center' }}>
              <strong style={{ fontSize: 14 }}>{it.title || t(it.kind)}</strong>
              <Badge tone={it.id === 'festive' ? 'sand' : it.id === 'brochure' ? 'blue' : 'green'}>{t(it.kind)}</Badge>
            </div>
            {it.badge && <span className="muted block" style={{ fontSize: 12 }}>{it.badge}</span>}
          </div>
        ))}
      </div>
      {big && (
        <div onClick={() => setBig(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 999, display: 'grid', placeItems: 'center', padding: 20, cursor: 'zoom-out' }}>
          <img src={big.image} alt={big.title} style={{ maxWidth: '95vw', maxHeight: '90vh', borderRadius: 12 }} />
        </div>
      )}
    </>
  );
}
