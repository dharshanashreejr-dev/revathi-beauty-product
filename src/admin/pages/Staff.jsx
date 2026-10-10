import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pencil, Eye, Mail, Phone } from 'lucide-react';
import { useStore } from '../store.jsx';
import { STAFF_ROLES, AVAILABILITY, TODAY, fmtDate } from '../data/mockData.js';
import { nextId } from '../utils.js';
import PageHeader from '../components/PageHeader.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import Field from '../components/Field.jsx';
import Avatar from '../components/Avatar.jsx';
import { useT } from '../i18n.js';

const SERVICE_ROLES = ['Skin Specialist', 'Hair Therapist', 'Beauty Specialist', 'Wellness Specialist'];
const blank = { name: '', email: '', phone: '', role: STAFF_ROLES[1], availability: 'Available', experience: '', bio: '' };

export default function Staff({ intent, onIntentHandled }) {
  const { staff, setStaff, appointments, setAppointments, notify } = useStore();
  const { t, lang } = useT();
  const [q, setQ] = useState('');
  const [role, setRole] = useState('All');
  const [avail, setAvail] = useState('All');
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [viewId, setViewId] = useState(null);
  const [assignId, setAssignId] = useState('');

  useEffect(() => {
    if (intent === 'add') { setErrors({}); setForm({ mode: 'add', data: { ...blank } }); onIntentHandled(); }
  }, [intent, onIntentHandled]);

  const assigned = (id) => appointments.filter((a) => a.specialistId === id && a.status !== 'Cancelled');
  const rows = useMemo(
    () => staff.filter((s) =>
      (role === 'All' || s.role === role) && (avail === 'All' || s.availability === avail) &&
      (!q.trim() || `${s.name} ${s.email}`.toLowerCase().includes(q.trim().toLowerCase()))),
    [staff, q, role, avail]
  );
  const viewing = staff.find((s) => s.id === viewId);

  const set = (k, v) => setForm((f) => ({ ...f, data: { ...f.data, [k]: v } }));
  const save = () => {
    const d = form.data;
    const e = {};
    if (!d.name.trim()) e.name = 'Full name is required.';
    if (!d.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Enter a valid email address.';
    else if (staff.some((s) => s.id !== d.id && s.email.toLowerCase() === d.email.trim().toLowerCase())) e.email = 'This email is already used by another team member.';
    if (!d.phone.trim()) e.phone = 'Phone number is required.';
    else if (!/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(d.phone.trim())) e.phone = 'Use an Indian number, e.g. +91 98400 11201.';
    setErrors(e);
    if (Object.keys(e).length) { notify('Please fix the highlighted fields.', 'error'); return; }
    const clean = { ...d, name: d.name.trim(), email: d.email.trim(), phone: d.phone.trim() };
    if (form.mode === 'add') {
      setStaff((list) => [...list, { ...clean, id: nextId('S', list, 6) }]);
      notify(`${clean.name} joined the team.`);
    } else {
      setStaff((list) => list.map((s) => (s.id === clean.id ? clean : s)));
      notify(`${clean.name}'s details were updated.`);
    }
    setForm(null);
  };

  const setAvailability = (s, v) => {
    setStaff((list) => list.map((x) => (x.id === s.id ? { ...x, availability: v } : x)));
    notify(`${s.name} is now ${v}.`);
  };

  const assign = () => {
    const a = appointments.find((x) => x.id === assignId);
    if (!a) { notify('Select an appointment to assign.', 'error'); return; }
    if (appointments.some((x) => x.id !== a.id && x.specialistId === viewing.id && x.date === a.date && x.time === a.time && x.status !== 'Cancelled')) {
      notify(`${viewing.name} already has an appointment at ${a.time} on ${fmtDate(a.date)}.`, 'error');
      return;
    }
    setAppointments((list) => list.map((x) => (x.id === a.id ? { ...x, specialistId: viewing.id } : x)));
    notify(`${a.id} assigned to ${viewing.name}.`);
    setAssignId('');
  };

  const assignable = appointments.filter((a) => a.date >= TODAY && a.status !== 'Cancelled' && a.status !== 'Completed' && a.specialistId !== viewing?.id);

  return (
    <div className="page">
      <PageHeader title={t('Staff and specialists')} subtitle={`${staff.length} team members, ${staff.filter((s) => s.availability === 'Available').length} available now`}
        actions={<button className="btn btn-primary" onClick={() => { setErrors({}); setForm({ mode: 'add', data: { ...blank } }); }}><Plus size={17} />{t('Add staff')}</button>} />
      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search by name or email')} aria-label={t('Search staff')} /></div>
        <select value={role} onChange={(e) => setRole(e.target.value)} aria-label={t('Filter by role')}><option value="All">{t('All roles')}</option>{STAFF_ROLES.map((r) => <option key={r}>{r}</option>)}</select>
        <select value={avail} onChange={(e) => setAvail(e.target.value)} aria-label={t('Filter by availability')}><option value="All">{t('All availability')}</option>{AVAILABILITY.map((r) => <option key={r}>{r}</option>)}</select>
      </div>

      <div className="staff-grid">
        {rows.length === 0 && <p className="muted">{t('No team members match your filters.')}</p>}
        {rows.map((s, i) => (
          <article key={s.id} className="staff-card">
            <div className="staff-top"><Avatar name={s.name} size={64} index={staff.findIndex((x) => x.id === s.id)} /><Badge>{s.availability}</Badge></div>
            <h4>{s.name}</h4>
            <span className="role-tag">{s.role}</span>
            <p className="muted"><Mail size={14} />{s.email}</p>
            <div className="between"><span className="muted">{t('Assigned appointments')}</span><strong>{assigned(s.id).length}</strong></div>
            <select className="status-select" value={s.availability} onChange={(e) => setAvailability(s, e.target.value)} aria-label={`Availability for ${s.name}`}>
              {AVAILABILITY.map((a) => <option key={a}>{a}</option>)}
            </select>
            <div className="card-actions">
              <button className="btn btn-ghost small" onClick={() => { setAssignId(''); setViewId(s.id); }}><Eye size={15} />{t('Profile')}</button>
              <button className="btn btn-ghost small" onClick={() => { setErrors({}); setForm({ mode: 'edit', data: { ...s } }); }}><Pencil size={15} />{t('Edit')}</button>
            </div>
          </article>
        ))}
      </div>

      {form && (
        <Modal title={form.mode === 'add' ? t('Add staff member') : t('Edit staff details')} onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>{t('Cancel')}</button><button className="btn btn-primary" onClick={save}>{form.mode === 'add' ? t('Add staff') : t('Save changes')}</button></>}>
          <div className="form-grid">
            <Field label={t('Full name')} error={errors.name}><input value={form.data.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Anjali Desai" /></Field>
            <Field label={t('Email address')} error={errors.email}><input type="email" value={form.data.email} onChange={(e) => set('email', e.target.value)} placeholder="name@maisonbloom.demo" /></Field>
            <Field label={t('Phone')} error={errors.phone}><input value={form.data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98400 11201" /></Field>
            <Field label={t('Role or speciality')}><select value={form.data.role} onChange={(e) => set('role', e.target.value)}>{STAFF_ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
            <Field label={t('Availability')}><select value={form.data.availability} onChange={(e) => set('availability', e.target.value)}>{AVAILABILITY.map((r) => <option key={r}>{r}</option>)}</select></Field>
            <Field label={t('Experience')}><input value={form.data.experience} onChange={(e) => set('experience', e.target.value)} placeholder="e.g. 5 years" /></Field>
            <Field label={t('Short bio')}><textarea rows={3} value={form.data.bio} onChange={(e) => set('bio', e.target.value)} /></Field>
          </div>
        </Modal>
      )}

      {viewing && (
        <Modal title={viewing.name} subtitle={`${viewing.role} - ${viewing.id}`} wide onClose={() => setViewId(null)}
          footer={<button className="btn btn-primary" onClick={() => setViewId(null)}>{t('Close')}</button>}>
          <div className="profile-head">
            <Avatar name={viewing.name} size={68} index={staff.findIndex((x) => x.id === viewing.id)} />
            <div className="profile-meta">
              <Badge>{viewing.availability}</Badge>
              <span><Mail size={15} />{viewing.email}</span>
              <span><Phone size={15} />{viewing.phone}</span>
              <span className="muted">{viewing.experience ? `${viewing.experience} experience. ` : ''}{viewing.bio}</span>
            </div>
          </div>
          <div className="detail-grid">
            <div>
              <h4 className="mini-title">Assigned appointments ({assigned(viewing.id).length})</h4>
              <ul className="list">
                {assigned(viewing.id).length === 0 && <li className="muted">{t('No appointments assigned.')}</li>}
                {assigned(viewing.id).sort((a, b) => a.date.localeCompare(b.date)).map((a) => (
                  <li key={a.id}><div><strong>{a.customer}</strong><span className="muted">{a.service}, {fmtDate(a.date)} {a.time}</span></div><Badge>{a.status}</Badge></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mini-title">{t('Assign to an appointment')}</h4>
              {SERVICE_ROLES.includes(viewing.role) ? (
                <>
                  <Field label={t('Upcoming appointment')}>
                    <select value={assignId} onChange={(e) => setAssignId(e.target.value)}>
                      <option value="">{t('Select an appointment')}</option>
                      {assignable.map((a) => <option key={a.id} value={a.id}>{a.id} - {a.customer}, {fmtDate(a.date)} {a.time}</option>)}
                    </select>
                  </Field>
                  <button className="btn btn-primary" onClick={assign}>Assign {viewing.name.split(' ')[0]}</button>
                </>
              ) : <p className="muted">{viewing.role} roles do not take client appointments. Choose a specialist instead.</p>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
