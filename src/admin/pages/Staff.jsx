import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pencil, Eye, Mail, Phone, Clock, MapPin, Shield } from 'lucide-react';
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
const PERM_OPTIONS = ['appointments', 'customers', 'inventory', 'services', 'pos', 'all'];
const blank = { name: '', email: '', phone: '', role: STAFF_ROLES[1], availability: 'Available', experience: '', bio: '', workstationBay: '', shiftHours: '09:00-18:00', permissions: ['appointments'] };

export default function Staff({ intent, onIntentHandled }) {
  const { staff, setStaff, appointments, setAppointments, notify, user, addAudit } = useStore();
  const { t } = useT();
  const [q, setQ] = useState('');
  const [role, setRole] = useState('All');
  const [avail, setAvail] = useState('All');
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [viewId, setViewId] = useState(null);
  const [assignId, setAssignId] = useState('');
  const [myShiftOnly, setMyShiftOnly] = useState(false);

  useEffect(() => {
    if (intent === 'add') { setErrors({}); setForm({ mode: 'add', data: { ...blank } }); onIntentHandled(); }
  }, [intent, onIntentHandled]);

  const assigned = (id) => appointments.filter((a) => a.specialistId === id && a.status !== 'Cancelled' && a.status !== 'No-Show');
  const rows = useMemo(() => {
    let list = staff.filter((s) =>
      (role === 'All' || s.role === role) && (avail === 'All' || s.availability === avail) &&
      (!q.trim() || `${s.name} ${s.email} ${s.workstationBay || ''}`.toLowerCase().includes(q.trim().toLowerCase())));
    if (myShiftOnly && user) {
      // Staff can view their own shift: match by name/email
      list = list.filter((s) => s.email === user.email || s.name === user.name);
    }
    return list;
  }, [staff, q, role, avail, myShiftOnly, user]);

  const viewing = staff.find((s) => s.id === viewId);

  const set = (k, v) => setForm((f) => ({ ...f, data: { ...f.data, [k]: v } }));
  const togglePerm = (p) => {
    setForm((f) => {
      const cur = f.data.permissions || [];
      const next = cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p];
      return { ...f, data: { ...f.data, permissions: next } };
    });
  };

  const save = () => {
    const d = form.data;
    const e = {};
    if (!d.name.trim()) e.name = 'Full name is required.';
    if (!d.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'Enter a valid email address.';
    else if (staff.some((s) => s.id !== d.id && s.email.toLowerCase() === d.email.trim().toLowerCase())) e.email = 'This email is already used by another team member.';
    if (!d.phone.trim()) e.phone = 'Phone number is required.';
    setErrors(e);
    if (Object.keys(e).length) { notify('Please fix the highlighted fields.', 'error'); return; }
    const clean = { ...d, name: d.name.trim(), email: d.email.trim(), phone: d.phone.trim(), workstationBay: (d.workstationBay || '').trim(), shiftHours: d.shiftHours || '09:00-18:00', permissions: d.permissions || [] };
    if (form.mode === 'add') {
      setStaff((list) => [...list, { ...clean, id: nextId('S', list, 6) }]);
      notify(`${clean.name} joined the team.`);
      addAudit?.('Staff added', clean.name, user?.name);
    } else {
      setStaff((list) => list.map((s) => (s.id === clean.id ? clean : s)));
      notify(`${clean.name}'s details were updated.`);
      addAudit?.('Staff updated / privilege', `${clean.name} permissions: ${(clean.permissions || []).join(', ')}`, user?.name);
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

  const assignable = appointments.filter((a) => a.date >= TODAY && a.status !== 'Cancelled' && a.status !== 'Completed' && a.status !== 'No-Show' && a.specialistId !== viewing?.id);

  return (
    <div className="page">
      <PageHeader title={t('Staff Management')} subtitle={t('Directory, workstation bays, shifts and permission delegation.')}
        actions={user?.role === 'Admin' ? <button className="btn btn-primary" onClick={() => { setErrors({}); setForm({ mode: 'add', data: { ...blank } }); }}><Plus size={17} />{t('Add staff')}</button> : null} />

      <div className="filters">
        <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search name, email or bay')} /></div>
        <select value={role} onChange={(e) => setRole(e.target.value)}><option value="All">{t('All roles')}</option>{STAFF_ROLES.map((r) => <option key={r}>{r}</option>)}</select>
        <select value={avail} onChange={(e) => setAvail(e.target.value)}><option value="All">{t('All availability')}</option>{AVAILABILITY.map((a) => <option key={a}>{a}</option>)}</select>
        {user?.role === 'Staff' && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={myShiftOnly} onChange={(e) => setMyShiftOnly(e.target.checked)} />
            {t('My shift only')}
          </label>
        )}
      </div>

      <div className="card flush">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('Staff')}</th>
              <th>{t('Role')}</th>
              <th>{t('Bay')}</th>
              <th>{t('Shift hours')}</th>
              <th>{t('Availability')}</th>
              <th>{t('Permissions')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={s.name} />
                    <div>
                      <strong>{s.name}</strong>
                      <div className="muted" style={{ fontSize: 12 }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td>{s.role}</td>
                <td><MapPin size={13} style={{ verticalAlign: 'middle' }} /> {s.workstationBay || '—'}</td>
                <td><Clock size={13} style={{ verticalAlign: 'middle' }} /> {s.shiftHours || '—'}</td>
                <td><Badge>{s.availability}</Badge></td>
                <td style={{ fontSize: 12 }}>{(s.permissions || []).join(', ') || '—'}</td>
                <td>
                  <button className="icon-btn" onClick={() => setViewId(s.id)} title={t('View')}><Eye size={16} /></button>
                  {user?.role === 'Admin' && <button className="icon-btn" onClick={() => { setErrors({}); setForm({ mode: 'edit', data: { ...s, permissions: s.permissions || [] } }); }} title={t('Edit')}><Pencil size={16} /></button>}
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={7} className="muted" style={{ textAlign: 'center', padding: 24 }}>{t('No staff match the filters.')}</td></tr>}
          </tbody>
        </table>
      </div>

      {viewing && (
        <Modal title={viewing.name} subtitle={`${viewing.role} · ${viewing.workstationBay || 'No bay'} · ${viewing.shiftHours || 'No shift'}`} wide onClose={() => setViewId(null)}
          footer={<button className="btn btn-primary" onClick={() => setViewId(null)}>{t('Done')}</button>}>
          <div className="detail-grid">
            <div>
              <h4 className="mini-title">{t('Profile')}</h4>
              <dl className="dl">
                <dt>{t('Email')}</dt><dd><Mail size={13} /> {viewing.email}</dd>
                <dt>{t('Phone')}</dt><dd><Phone size={13} /> {viewing.phone}</dd>
                <dt>{t('Experience')}</dt><dd>{viewing.experience}</dd>
                <dt>{t('Bay')}</dt><dd>{viewing.workstationBay || '—'}</dd>
                <dt>{t('Shift')}</dt><dd>{viewing.shiftHours || '—'}</dd>
                <dt>{t('Permissions')}</dt><dd>{(viewing.permissions || []).join(', ') || '—'}</dd>
                <dt>{t('Bio')}</dt><dd>{viewing.bio || '—'}</dd>
              </dl>
              <Field label={t('Availability')}>
                <select value={viewing.availability} onChange={(e) => setAvailability(viewing, e.target.value)}>
                  {AVAILABILITY.map((a) => <option key={a}>{a}</option>)}
                </select>
              </Field>
            </div>
            <div>
              <h4 className="mini-title">{t('Assigned appointments')}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {assigned(viewing.id).slice(0, 8).map((a) => (
                  <li key={a.id} style={{ padding: '6px 0', borderBottom: '1px solid var(--border,#eee)' }}>
                    <strong>{a.service}</strong> · {fmtDate(a.date)} {a.time} · <Badge>{a.status}</Badge>
                  </li>
                ))}
                {assigned(viewing.id).length === 0 && <li className="muted">{t('No upcoming appointments.')}</li>}
              </ul>
              {user?.role === 'Admin' && (
                <div style={{ marginTop: 12 }}>
                  <Field label={t('Assign appointment')}>
                    <select value={assignId} onChange={(e) => setAssignId(e.target.value)}>
                      <option value="">{t('Select…')}</option>
                      {assignable.map((a) => <option key={a.id} value={a.id}>{a.id} · {a.customer} · {a.date} {a.time}</option>)}
                    </select>
                  </Field>
                  <button className="btn btn-soft" onClick={assign} disabled={!assignId}>{t('Assign')}</button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {form && (
        <Modal title={form.mode === 'add' ? t('Add staff') : t('Edit staff')} wide onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>{t('Cancel')}</button><button className="btn btn-primary" onClick={save}>{t('Save')}</button></>}>
          <div className="form-grid">
            <Field label={t('Full name')} error={errors.name}><input value={form.data.name} onChange={(e) => set('name', e.target.value)} /></Field>
            <Field label={t('Email')} error={errors.email}><input value={form.data.email} onChange={(e) => set('email', e.target.value)} /></Field>
            <Field label={t('Phone')} error={errors.phone}><input value={form.data.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
            <Field label={t('Role')}><select value={form.data.role} onChange={(e) => set('role', e.target.value)}>{STAFF_ROLES.map((r) => <option key={r}>{r}</option>)}</select></Field>
            <Field label={t('Workstation bay')}><input value={form.data.workstationBay || ''} onChange={(e) => set('workstationBay', e.target.value)} placeholder="Bay-A1 / Front-Desk" /></Field>
            <Field label={t('Shift hours')}><input value={form.data.shiftHours || ''} onChange={(e) => set('shiftHours', e.target.value)} placeholder="09:00-18:00" /></Field>
            <Field label={t('Experience')}><input value={form.data.experience} onChange={(e) => set('experience', e.target.value)} /></Field>
            <Field label={t('Availability')}><select value={form.data.availability} onChange={(e) => set('availability', e.target.value)}>{AVAILABILITY.map((a) => <option key={a}>{a}</option>)}</select></Field>
          </div>
          <Field label={t('Permission delegation')}>
            <div className="chip-row">
              {PERM_OPTIONS.map((p) => (
                <button type="button" key={p} className={`chip ${(form.data.permissions || []).includes(p) ? 'active' : ''}`} onClick={() => togglePerm(p)}>
                  <Shield size={12} /> {p}
                </button>
              ))}
            </div>
          </Field>
          <Field label={t('Bio')}><textarea rows={2} value={form.data.bio} onChange={(e) => set('bio', e.target.value)} /></Field>
        </Modal>
      )}
    </div>
  );
}
