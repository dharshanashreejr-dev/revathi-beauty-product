import { useState } from 'react';
import { Plus, Pencil, Trash2, Gift, Ticket, Layers, Send, Pause, Play, ImagePlus, RefreshCw } from 'lucide-react';
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
  campaign: () => ({ id: '', name: '', title: '', description: '', banner: '', pct: '', code: '', scope: 'both', start: '', end: '', active: true, used: 0, smsSent: 0 }),
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
      if ((d.description || '').length > 200) e.description = 'Description can be 200 characters at most.';
      const n = Number(d.pct);
      if (!/^\d+$/.test(String(d.pct).trim()) || n < 1 || n > 90) e.pct = 'Discount must be 1 to 90 percent.';
    }
    if (type === 'coupon') {
      if (d.type === 'percent') {
        const n = Number(d.value);
        if (!/^\d+$/.test(String(d.value).trim()) || n < 1) e.value = 'Enter a whole number above zero.';
        else if (n > 90) e.value = 'Percentage cannot be more than 90.';
      }
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
      const saved = api.offers.saveCampaign({ ...d, id: d.id || api.offers.newId('cmp'), name: d.name.trim(), title: (d.title || '').trim(), description: (d.description || '').trim(), banner: d.banner || '', pct: Number(d.pct) });
      if (!saved) { notify('Could not save: the banner image is too big. Use a smaller image.', 'error'); return; }
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
      {kind !== 'coupon' && <button className="icon-btn danger" onClick={() => setToDelete({ kind, item: o, label: o.name || o.code })} aria-label={t('Delete')} title={t('Delete')}><Trash2 size={16} /></button>}
    </div>
  );

  const columns = {
    campaigns: [
      { key: 'name', label: t('Campaign'), render: (o) => (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {o.banner ? <img src={o.banner} alt="" style={{ width: 64, height: 36, objectFit: 'cover', borderRadius: 6, flex: 'none' }} /> : null}
          <div><strong>{o.title || o.name}</strong>{o.title && o.title !== o.name ? <span className="muted block">{o.name}</span> : null}{o.description ? <span className="muted block" style={{ whiteSpace: 'normal', maxWidth: 320 }}>{o.description}</span> : null}<span className="muted block">{t('Code')}: {o.code}</span></div>
        </div>
      ) },
      { key: 'pct', label: t('Discount'), render: (o) => `${o.pct}%` },
      { key: 'scope', label: t('Applies to'), render: (o) => t(scopeLabel(o.scope)) },
      { key: 'runs', label: t('Runs'), render: runs },
      { key: 'status', label: t('Status'), render: status },
      { key: 'sms', label: t('SMS sent'), render: (o) => `${o.smsSent} · ${t('used')} ${o.used}` },
      { key: 'actions', label: '', width: '170px', render: (o) => rowActions('campaign', o, <button className="icon-btn" onClick={() => setToSms(o)} aria-label={t('Send festival SMS')} title={t('Send festival SMS')}><Send size={16} /></button>) }
    ],
    coupons: [
      { key: 'code', label: t('Coupon'), render: (o) => <div><strong>{o.code}</strong><span className="muted block">{t(o.title)}</span></div> },
      { key: 'value', label: t('Benefit'), render: (o) => (o.type === 'percent' ? `${o.value}% ${t('off')}` : t('Free delivery')) },
      { key: 'rule', label: t('Who gets it'), render: (o) => <span style={{ whiteSpace: 'normal' }}>{t(o.desc)}</span> },
      { key: 'scope', label: t('Applies to'), render: (o) => t(scopeLabel(o.scope)) },
      { key: 'runs', label: t('Runs'), render: runs },
      { key: 'used', label: t('Used'), render: (o) => (o.maxUses ? `${o.used} / ${o.maxUses}` : `${o.used} / ${t('Unlimited')}`) },
      { key: 'status', label: t('Status'), render: status },
      { key: 'actions', label: '', width: '100px', render: (o) => rowActions('coupon', o) }
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
  const tabs = [['campaigns', t('Festival campaigns')], ['coupons', t('Coupons')], ['bundles', t('Service + product bundles')]];

  const d = form?.data;
  const er = form?.errors || {};
  const worth = form?.type === 'bundle' ? (SERVICES.find((s) => s.name === d.service)?.price || 0) + (catalogue().find((p) => p.name === d.product)?.price || 0) : 0;

  return (
    <div className="page">
      <PageHeader title={t('Festival & Offers')} subtitle={t('Create festival campaigns, coupon rules and service + product bundles with start and expiry dates.')}
        actions={tab !== 'coupons' && <button className="btn btn-primary" onClick={() => open(addType)}><Plus size={17} />{t(addLabel)}</button>} />

      <div className="stat-grid four">
        <StatCard icon={Gift} label={t('Active offers')} value={count('Active')} tone="forest" />
        <StatCard icon={Ticket} label={t('Scheduled')} value={count('Scheduled')} tone="sage" />
        <StatCard icon={Layers} label={t('Expired')} value={count('Expired')} tone="rose" />
        <StatCard icon={Send} label={t('Coupon redemptions')} value={redemptions} tone="amber" />
      </div>

      <div className="tabs" role="tablist">
        {tabs.map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{label}</button>)}
      </div>
      <div className="card flush"><DataTable columns={columns[tab]} rows={rows} empty="No offers yet. Use the button above to create one." /></div>

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
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label={t('Offer title (shown on the website)')}><input value={d.title || ''} onChange={(e) => set('title', e.target.value)} placeholder="Deepavali Glow - 15% off everything" maxLength={80} /></Field>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label={t('Offer description')} error={er.description && t(er.description)} hint={`${(d.description || '').length} / 200`}>
                  <textarea rows={3} style={{ width: '100%' }} value={d.description || ''} onChange={(e) => set('description', e.target.value)} placeholder="Hair oils, soaps and gift sets at festival prices." maxLength={200} />
                </Field>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <BannerPicker t={t} value={d.banner} onChange={(img) => set('banner', img)} notify={notify} />
              </div>
            </>)}
            {form.type === 'coupon' && (<>
              <div style={{ gridColumn: '1 / -1' }}><p className="muted" style={{ margin: 0 }}><strong>{t(d.title)}.</strong> {t(d.desc)}</p></div>
              <Field label={t('Coupon code')} error={er.code && t(er.code)}><input value={d.code} onChange={(e) => set('code', e.target.value.toUpperCase())} placeholder="FIRSTORDER" maxLength={15} /></Field>
              {d.type === 'percent' && <Field label={t('Discount (%)')} error={er.value && t(er.value)}><input inputMode="numeric" value={d.value} onChange={(e) => set('value', e.target.value)} /></Field>}
              <Field label={t('Maximum uses')} error={er.maxUses && t(er.maxUses)} hint={t('Leave empty for unlimited.')}><input inputMode="numeric" value={d.maxUses} onChange={(e) => set('maxUses', e.target.value)} /></Field>
            </>)}
            {form.type === 'bundle' && (<>
              <Field label={t('Bundle name')} error={er.name && t(er.name)}><input value={d.name} onChange={(e) => set('name', e.target.value)} placeholder="Glow Ritual Combo" /></Field>
              <Field label={t('Service')}><select value={d.service} onChange={(e) => set('service', e.target.value)}>{SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name} - {inr(s.price)}</option>)}</select></Field>
              <Field label={t('Product')}><select value={d.product} onChange={(e) => set('product', e.target.value)}>{sellable().map((p) => <option key={p.id} value={p.name}>{p.name} - {inr(p.price)}</option>)}</select></Field>
              <Field label={t('Bundle price (₹)')} error={er.price && t(er.price, { n: inr(worth) })} hint={t('Together they cost {n}', { n: inr(worth) })}><input inputMode="numeric" value={d.price} onChange={(e) => set('price', e.target.value)} /></Field>
            </>)}
            {form.type === 'campaign' && (
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


// Reads a chosen image file and shrinks it (max 1600px wide) so it fits in browser storage.
const readImage = (file) => new Promise((resolve, reject) => {
  if (!file || !file.type.startsWith('image/')) { reject(new Error('type')); return; }
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    const k = Math.min(1, 1600 / img.width);
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * k);
    c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    let out = c.toDataURL('image/webp', 0.82);
    if (!out.startsWith('data:image/webp')) out = c.toDataURL('image/jpeg', 0.82);
    resolve(out);
  };
  img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('read')); };
  img.src = url;
});

// Upload / replace / remove the banner of one festival campaign (inside the campaign form).
function BannerPicker({ t, value, onChange, notify }) {
  const choose = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    try { onChange(await readImage(f)); } catch { notify('Please choose a valid image file.', 'error'); }
  };
  return (
    <div className="field">
      <span className="field-label">{t('Offer banner')}</span>
      {value
        ? <img src={value} alt="" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 10, background: '#e5ead5' }} />
        : <div className="muted" style={{ padding: 18, border: '1px dashed #c8d1ae', borderRadius: 10, textAlign: 'center' }}>{t('No banner yet. Upload one to show this offer on the website home banner.')}</div>}
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <label className="btn btn-ghost" style={{ cursor: 'pointer' }}>
          {value ? <RefreshCw size={16} /> : <ImagePlus size={16} />}{value ? t('Replace banner') : t('Upload banner')}
          <input type="file" accept="image/*" onChange={choose} style={{ display: 'none' }} />
        </label>
        {value && <button type="button" className="btn btn-ghost" onClick={() => onChange('')}><Trash2 size={16} />{t('Remove banner')}</button>}
      </div>
      <span className="field-hint">{t('Best size 1920 x 823 pixels. The banner shows on the website only while the campaign is Active.')}</span>
    </div>
  );
}
