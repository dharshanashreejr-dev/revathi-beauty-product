import { useState } from 'react';
import { Eye, EyeOff, Save, RotateCcw, Plus } from 'lucide-react';
import { useStore } from '../store.jsx';
import { api } from '../../api';
import PageHeader from '../components/PageHeader.jsx';
import Field from '../components/Field.jsx';
import { useT } from '../i18n.js';
import { DEFAULT_BRIDAL, DEFAULT_SERVICES, promoPrice, saveSiteConfig, useSiteConfig } from '../../shared/siteConfig';
import { inr } from '../data/mockData.js';

// CRS 4.2 Services & Consultations Management. Admin controls for the public website:
//  1. show / hide service prices
//  2. Service Catalog: name, duration, pre-service care instructions, base fee, promotional discount (normal services + consultations)
//  3. the four Bridal Makeup packages (Silver, Gold, Platinum, Trial Pack): details, price, promo discount, care instructions
// BACKEND: `services` and `service_packages` tables; price visibility = a row in `settings`. Admin only.
const CATS = ['Body Massage', 'Facial', 'Consultation'];
const toSvc = (list) => list.map((s) => ({ ...s, price: String(s.price), duration: String(s.duration), discountValue: String(s.discountValue ?? 0) }));
const toPkg = (list) => list.map((b) => ({ ...b, price: String(b.price), duration: String(b.duration), features: b.features.join('\n'), discountType: b.discountType || 'percent', discountValue: String(b.discountValue ?? 0), care: b.care || '' }));
const slug = (n) => n.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function checkMoney(x, i, e, kind) {
  if (!/^\d+$/.test(x.price.trim()) || Number(x.price) <= 0) e[`${kind}${i}-price`] = 'Enter a price in rupees.';
  if (!/^\d+$/.test(x.duration.trim()) || Number(x.duration) <= 0) e[`${kind}${i}-duration`] = 'Enter minutes.';
  const v = Number(x.discountValue);
  if (x.discountValue === '' || Number.isNaN(v) || v < 0) e[`${kind}${i}-disc`] = 'Enter zero or a positive discount.';
  else if (x.discountType === 'percent' && v > 100) e[`${kind}${i}-disc`] = 'Percentage cannot be more than 100.';
  else if (x.discountType === 'flat' && v >= Number(x.price)) e[`${kind}${i}-disc`] = 'Flat discount must be less than the fee.';
}

function PriceRow({ x, i, kind, errors, set, t }) {
  const eff = promoPrice(Number(x.price) || 0, x.discountType, Number(x.discountValue) || 0);
  return (
    <>
      <div className="form-grid">
        <Field label={t('Base service fee (₹)')} error={errors[`${kind}${i}-price`]}><input inputMode="numeric" value={x.price} onChange={(e) => set(i, 'price', e.target.value)} /></Field>
        <Field label={t('Duration (min)')} error={errors[`${kind}${i}-duration`]}><input inputMode="numeric" value={x.duration} onChange={(e) => set(i, 'duration', e.target.value)} /></Field>
        <Field label={t('Promo discount type')}><select value={x.discountType} onChange={(e) => set(i, 'discountType', e.target.value)}><option value="percent">Percentage (%)</option><option value="flat">Flat amount (₹)</option></select></Field>
        <Field label={x.discountType === 'percent' ? t('Promo discount (%)') : t('Promo discount (₹)')} error={errors[`${kind}${i}-disc`]} hint="0 means no promotion"><input inputMode="numeric" value={x.discountValue} onChange={(e) => set(i, 'discountValue', e.target.value)} /></Field>
      </div>
      <p className="muted" style={{ margin: '4px 0 10px', fontSize: 13 }}>{t('Customers pay')}: <strong>{inr(eff)}</strong></p>
    </>
  );
}

export default function ServicesPricing() {
  const { notify, user } = useStore();
  const { t } = useT();
  const cfg = useSiteConfig();
  const [svc, setSvc] = useState(() => toSvc(cfg.services));
  const [pkg, setPkg] = useState(() => toPkg(cfg.bridalPackages));
  const [errors, setErrors] = useState({});
  const actor = user?.name || 'Admin', role = user?.role || 'Admin';

  const toggle = () => {
    saveSiteConfig({ ...cfg, showServicePrices: !cfg.showServicePrices });
    api.audit.log(actor, role, 'settings.changed', `Service prices ${cfg.showServicePrices ? 'hidden' : 'shown'} on the website`);
    notify(cfg.showServicePrices ? 'Service prices are now hidden on the website.' : 'Service prices are now visible on the website.');
  };
  const setS = (i, k, v) => setSvc((d) => d.map((b, n) => (n === i ? { ...b, [k]: v } : b)));
  const setP = (i, k, v) => setPkg((d) => d.map((b, n) => (n === i ? { ...b, [k]: v } : b)));

  const addService = () => setSvc((d) => [...d, { id: '', name: '', category: 'Facial', duration: '45', price: '', discountType: 'percent', discountValue: '0', care: '', desc: '', active: true, isNew: true }]);

  const save = () => {
    const e = {};
    svc.forEach((s, i) => {
      if (!s.name.trim()) e[`s${i}-name`] = 'Enter a service name.';
      checkMoney(s, i, e, 's');
    });
    pkg.forEach((b, i) => {
      if (!b.name.trim()) e[`p${i}-name`] = 'Enter a package name.';
      checkMoney(b, i, e, 'p');
    });
    const ids = new Set(svc.filter((s) => !s.isNew).map((s) => s.id));
    svc.forEach((s, i) => { if (s.isNew && s.name.trim()) { const id = slug(s.name); if (!id || ids.has(id) || svc.some((o, j) => j !== i && o.name.trim().toLowerCase() === s.name.trim().toLowerCase())) e[`s${i}-name`] = 'A service with this name already exists.'; } });
    setErrors(e);
    if (Object.keys(e).length) { notify('Please fix the highlighted fields.', 'error'); return; }
    const services = svc.map((s) => ({
      id: s.isNew ? slug(s.name) : s.id, name: s.name.trim(), category: s.category, duration: Number(s.duration), price: Number(s.price),
      discountType: s.discountType, discountValue: Number(s.discountValue) || 0, care: s.care.trim(), desc: s.desc.trim() || s.name.trim(), active: !!s.active, popular: !!s.popular,
    }));
    if (!services.some((s) => s.active)) { notify('Keep at least one service active.', 'error'); return; }
    const bridalPackages = pkg.map((b) => ({
      id: b.id, name: b.name.trim(), price: Number(b.price), duration: Number(b.duration), popular: !!b.popular,
      discountType: b.discountType, discountValue: Number(b.discountValue) || 0, care: b.care.trim(),
      features: b.features.split('\n').map((x) => x.trim()).filter(Boolean)
    }));
    // Audit: record price / promo changes against the saved config.
    const changes = [];
    services.forEach((s) => { const o = cfg.services.find((x) => x.id === s.id); if (!o) changes.push(`added ${s.name}`); else { if (o.price !== s.price) changes.push(`${s.name} fee ${inr(o.price)} to ${inr(s.price)}`); if ((o.discountValue ?? 0) !== s.discountValue) changes.push(`${s.name} promo ${s.discountValue}`); if (o.active !== s.active) changes.push(`${s.name} ${s.active ? 'activated' : 'deactivated'}`); } });
    bridalPackages.forEach((b) => { const o = cfg.bridalPackages.find((x) => x.id === b.id); if (o && o.price !== b.price) changes.push(`${b.name} package ${inr(o.price)} to ${inr(b.price)}`); });
    saveSiteConfig({ ...cfg, services, bridalPackages });
    if (changes.length) api.audit.log(actor, role, 'product.updated', `Services updated: ${changes.join(', ')}`);
    setSvc(toSvc(services)); setPkg(toPkg(bridalPackages));
    notify('Services and packages saved. The website now shows the new details and prices.');
  };
  const reset = () => { setSvc(toSvc(DEFAULT_SERVICES)); setPkg(toPkg(DEFAULT_BRIDAL)); setErrors({}); };

  return (
    <div className="page">
      <PageHeader title={t('Services & Pricing')} subtitle="Control what customers see on the website: service price visibility, the service catalogue and the Bridal Makeup packages." />

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <h3>{t('Service price visibility')}</h3>
          <span className="muted">{cfg.showServicePrices ? 'Prices are visible to customers' : 'Prices are hidden from customers'}</span>
        </div>
        <p className="muted" style={{ marginBottom: 14 }}>When turned off, the landing page, services page and booking form show no service prices. Services are always paid offline at the salon.</p>
        <button className={`btn ${cfg.showServicePrices ? 'btn-soft' : 'btn-primary'}`} onClick={toggle} aria-pressed={cfg.showServicePrices}>
          {cfg.showServicePrices ? <EyeOff size={16} /> : <Eye size={16} />}
          {cfg.showServicePrices ? t('Hide prices') : t('Show prices')}
        </button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <h3>{t('Services & consultations')}</h3>
          <button className="btn btn-soft" onClick={addService}><Plus size={16} />{t('Add service')}</button>
        </div>
        <p className="muted" style={{ marginBottom: 14 }}>Edit the name, duration, care instructions, base fee and promotional discount. Turn a service off to hide it from the website and booking.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {svc.map((s, i) => (
            <div key={s.id || `new-${i}`} className="card" style={{ boxShadow: 'none', opacity: s.active ? 1 : 0.65 }}>
              <Field label={t('Service name')} error={errors[`s${i}-name`]}><input value={s.name} onChange={(e) => setS(i, 'name', e.target.value)} /></Field>
              <Field label={t('Category')}>
                <select value={s.category} disabled={!s.isNew} onChange={(e) => setS(i, 'category', e.target.value)}>{CATS.map((c) => <option key={c} value={c}>{t(c)}</option>)}</select>
              </Field>
              <PriceRow x={s} i={i} kind="s" errors={errors} set={setS} t={t} />
              <Field label={t('Pre-service care instructions')} hint="Shown to customers on the Services page"><textarea rows={3} value={s.care} onChange={(e) => setS(i, 'care', e.target.value)} /></Field>
              <Field label={t('Description')}><textarea rows={2} value={s.desc} onChange={(e) => setS(i, 'desc', e.target.value)} /></Field>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, marginBottom: 6 }}>
                <input type="checkbox" checked={!!s.active} onChange={(e) => setS(i, 'active', e.target.checked)} /> {t('Active on website')}
              </label>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5 }}>
                <input type="checkbox" checked={!!s.popular} onChange={(e) => setS(i, 'popular', e.target.checked)} /> {t('Mark as most loved')}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3>{t('Bridal Makeup packages')}</h3>
          <span className="muted">Edit the name, price, promotion, care instructions and what is included.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {pkg.map((b, i) => (
            <div key={b.id} className="card" style={{ boxShadow: 'none' }}>
              <Field label={t('Package name')} error={errors[`p${i}-name`]}><input value={b.name} onChange={(e) => setP(i, 'name', e.target.value)} /></Field>
              <PriceRow x={b} i={i} kind="p" errors={errors} set={setP} t={t} />
              <Field label={t('Services included')} hint="One per line"><textarea rows={6} value={b.features} onChange={(e) => setP(i, 'features', e.target.value)} /></Field>
              <Field label={t('Pre-service care instructions')}><textarea rows={3} value={b.care} onChange={(e) => setP(i, 'care', e.target.value)} /></Field>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5 }}>
                <input type="checkbox" checked={!!b.popular} onChange={(e) => setP(i, 'popular', e.target.checked)} /> {t('Mark as most loved')}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="card-actions" style={{ marginTop: 18 }}>
        <button className="btn btn-ghost" onClick={reset}><RotateCcw size={16} />{t('Reset to defaults')}</button>
        <button className="btn btn-primary" onClick={save}><Save size={16} />{t('Save changes')}</button>
      </div>
    </div>
  );
}
