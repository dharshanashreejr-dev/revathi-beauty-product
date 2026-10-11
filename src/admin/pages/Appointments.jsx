import { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Clock, ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { useStore } from '../store.jsx';
import {
  SERVICES, APPOINTMENT_STATUSES, TIME_SLOTS, TODAY, fmtDate, inr
} from '../data/mockData.js';
import { nextId, servicePrice } from '../utils.js';
import PageHeader from '../components/PageHeader.jsx';
import DataTable from '../components/DataTable.jsx';
import Badge from '../components/Badge.jsx';
import Modal from '../components/Modal.jsx';
import Field from '../components/Field.jsx';
import { useT } from '../i18n.js';

const SERVICE_ROLES = ['Skin Specialist', 'Hair Therapist', 'Beauty Specialist', 'Wellness Specialist'];
const addDays = (iso, n) => {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};
const dayLabel = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });

export default function Appointments({ intent, onIntentHandled }) {
  const { appointments, setAppointments, customers, staff, notify } = useStore();
  const { t, lang } = useT();
  const [tab, setTab] = useState('schedule');
  const [date, setDate] = useState(TODAY);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [specialist, setSpecialist] = useState('All');
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  const specialists = staff.filter((s) => SERVICE_ROLES.includes(s.role));
  const staffName = (id) => staff.find((s) => s.id === id)?.name || t('Unassigned');
  const isBusy = (sid, d, time, ignore) => appointments.some((a) => a.id !== ignore && a.specialistId === sid && a.date === d && a.time === time && a.status !== 'Cancelled');

  const blankForm = (time = '', d = date) => ({
    customerId: customers[0].id, service: SERVICES[0].name, date: d, time,
    specialistId: specialists[0]?.id || '', notes: ''
  });
  const openAdd = (time = '', d = date) => { setErrors({}); setForm(blankForm(time, d)); };

  useEffect(() => {
    if (intent === 'add') { openAdd(); onIntentHandled(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent]);

  const filtered = useMemo(
    () =>
      appointments.filter((a) =>
        (status === 'All' || a.status === status) &&
        (specialist === 'All' || a.specialistId === specialist) &&
        (!q.trim() || `${a.customer} ${a.service} ${a.id}`.toLowerCase().includes(q.trim().toLowerCase()))
      ).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)),
    [appointments, q, status, specialist]
  );

  const listRows = useMemo(() => {
    if (tab === 'today') return filtered.filter((a) => a.date === TODAY);
    if (tab === 'upcoming') return filtered.filter((a) => a.date > TODAY);
    return filtered;
  }, [filtered, tab]);

  const open = appointments.find((a) => a.id === openId);
  const patch = (id, changes, message) => {
    setAppointments((list) => list.map((a) => (a.id === id ? { ...a, ...changes } : a)));
    notify(message);
  };

  const reassign = (a, sid) => {
    if (isBusy(sid, a.date, a.time, a.id)) {
      notify(`${staffName(sid)} already has an appointment at ${a.time} on ${fmtDate(a.date)}.`, 'error');
      return;
    }
    patch(a.id, { specialistId: sid }, `${a.id} reassigned to ${staffName(sid)}.`);
  };

  const submit = () => {
    const e = {};
    if (!form.date) e.date = 'Choose a date.';
    else if (form.date < TODAY) e.date = 'Date cannot be in the past.';
    if (!form.time) e.time = 'Pick an available time slot.';
    else if (isBusy(form.specialistId, form.date, form.time)) e.time = 'This specialist is already booked at that time.';
    if (!form.specialistId) e.specialistId = 'Select a specialist.';
    setErrors(e);
    if (Object.keys(e).length) { notify('Please fix the highlighted fields.', 'error'); return; }
    const c = customers.find((x) => x.id === form.customerId);
    const appt = { id: nextId('APT', appointments, 3010), customerId: c.id, customer: c.name, service: form.service, date: form.date, time: form.time, specialistId: form.specialistId, status: 'Pending', notes: form.notes.trim() };
    setAppointments((list) => [...list, appt]);
    notify(`Appointment ${appt.id} booked for ${c.name}.`);
    setDate(form.date);
    setForm(null);
  };

  const week = Array.from({ length: 7 }, (_, i) => addDays(TODAY, i - 1));
  const dayAppts = appointments.filter((a) => a.date === date && a.status !== 'Cancelled');

  const columns = [
    { key: 'when', label: t('Date and time'), render: (a) => <div><strong>{fmtDate(a.date)}</strong><span className="muted block">{a.time}</span></div> },
    { key: 'customer', label: t('Customer'), render: (a) => <div><strong>{a.customer}</strong><span className="muted block">{a.id}</span></div> },
    { key: 'service', label: t('Service') },
    { key: 'specialist', label: t('Specialist'), render: (a) => staffName(a.specialistId) },
    { key: 'status', label: t('Status'), render: (a) => <Badge>{a.status}</Badge> }
  ];

  const tabs = [['schedule', t('Schedule')], ['today', t("Today's")], ['upcoming', t('Upcoming')], ['all', t('All appointments')]];

  return (
    <div className="page">
      <PageHeader title={t('Appointments')} subtitle={t('Plan the day, assign specialists and keep every booking on track.')}
        actions={<button className="btn btn-primary" onClick={() => openAdd()}><Plus size={17} />{t('New appointment')}</button>} />

      <div className="tabs" role="tablist">
        {tabs.map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{label}</button>)}
      </div>

      {tab !== 'schedule' && (
        <div className="filters">
          <div className="search-box"><Search size={17} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search customer, service or ID')} aria-label={t('Search appointments')} /></div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={t('Filter by status')}><option value="All">{t('All statuses')}</option>{APPOINTMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <select value={specialist} onChange={(e) => setSpecialist(e.target.value)} aria-label={t('Filter by specialist')}><option value="All">{t('All specialists')}</option>{specialists.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
        </div>
      )}

      {tab === 'schedule' ? (
        <div className="card">
          <div className="date-strip">
            <button className="icon-btn" onClick={() => setDate(addDays(date, -1))} aria-label={t('Previous day')}><ChevronLeft size={18} /></button>
            <div className="date-chips">
              {week.map((d) => (
                <button key={d} className={`date-chip ${d === date ? 'active' : ''}`} onClick={() => setDate(d)}>
                  <span>{dayLabel(d)}</span>
                  {d === TODAY && <em>{t('Today')}</em>}
                  <i>{appointments.filter((a) => a.date === d && a.status !== 'Cancelled').length}</i>
                </button>
              ))}
            </div>
            <button className="icon-btn" onClick={() => setDate(addDays(date, 1))} aria-label={t('Next day')}><ChevronRight size={18} /></button>
          </div>
          <h3 className="section-title">{fmtDate(date)} <span className="muted">{dayAppts.length} booked, {TIME_SLOTS.length - new Set(dayAppts.map((a) => a.time)).size} slots free</span></h3>
          <div className="schedule">
            {TIME_SLOTS.map((slot) => {
              const items = dayAppts.filter((a) => a.time === slot);
              return (
                <div className="slot-row" key={slot}>
                  <span className="slot-time"><Clock size={14} />{slot}</span>
                  <div className="slot-body">
                    {items.map((a) => (
                      <button key={a.id} className={`appt-card st-${a.status.replace(' ', '').toLowerCase()}`} onClick={() => setOpenId(a.id)}>
                        <strong>{a.customer}</strong>
                        <span>{a.service}</span>
                        <span className="appt-meta"><UserRound size={13} />{staffName(a.specialistId)}</span>
                        <Badge>{a.status}</Badge>
                      </button>
                    ))}
                    {items.length === 0 && <button className="slot-free" onClick={() => openAdd(slot, date)}><Plus size={14} />{t('Available, book this slot')}</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="card flush"><DataTable columns={columns} rows={listRows} onRowClick={(a) => setOpenId(a.id)} empty={t('No appointments in this view.')} /></div>
      )}

      {open && (
        <Modal title={`Appointment ${open.id}`} subtitle={`${open.service} on ${fmtDate(open.date)} at ${open.time}`} wide onClose={() => setOpenId(null)}
          footer={<button className="btn btn-primary" onClick={() => setOpenId(null)}>{t('Done')}</button>}>
          <div className="detail-grid">
            <div>
              <h4 className="mini-title">{t('Booking details')}</h4>
              <dl className="dl">
                <dt>Customer</dt><dd>{open.customer}</dd>
                <dt>Service</dt><dd>{open.service}</dd>
                <dt>Price</dt><dd>{inr(servicePrice(open.service))}</dd>
                <dt>Date</dt><dd>{fmtDate(open.date)}, {open.time}</dd>
                <dt>Specialist</dt><dd>{staffName(open.specialistId)}</dd>
                <dt>Notes</dt><dd>{open.notes || t('No notes')}</dd>
              </dl>
            </div>
            <div>
              <h4 className="mini-title">{t('Manage')}</h4>
              <Field label={t('Status')}>
                <select value={open.status} onChange={(e) => patch(open.id, { status: e.target.value }, `${open.id} marked as ${e.target.value}.`)}>
                  {APPOINTMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label={t('Assigned specialist')}>
                <select value={open.specialistId} onChange={(e) => reassign(open, e.target.value)}>
                  {specialists.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                </select>
              </Field>
              <Badge>{open.status}</Badge>
            </div>
          </div>
        </Modal>
      )}

      {form && (
        <Modal title={t('New appointment')} subtitle={t('Choose an available slot for the selected specialist')} wide onClose={() => setForm(null)}
          footer={<><button className="btn btn-ghost" onClick={() => setForm(null)}>{t('Cancel')}</button><button className="btn btn-primary" onClick={submit}>{t('Book appointment')}</button></>}>
          <div className="form-grid">
            <Field label={t('Customer')}><select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })}>{customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
            <Field label={t('Service')}><select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>{SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name} - {inr(s.price)}</option>)}</select></Field>
            <Field label={t('Date')} error={errors.date}><input type="date" min={TODAY} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: '' })} /></Field>
            <Field label={t('Specialist')} error={errors.specialistId}><select value={form.specialistId} onChange={(e) => setForm({ ...form, specialistId: e.target.value, time: '' })}>{specialists.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}</select></Field>
          </div>
          <Field label={t('Available time slots')} error={errors.time}>
            <div className="chip-row">
              {TIME_SLOTS.map((slot) => {
                const busy = isBusy(form.specialistId, form.date, slot);
                return <button type="button" key={slot} disabled={busy} className={`chip ${form.time === slot ? 'active' : ''}`} onClick={() => setForm({ ...form, time: slot })}>{slot}</button>;
              })}
            </div>
          </Field>
          <Field label={t('Notes (optional)')}><textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder={t('Allergies, preferences or special requests')} /></Field>
        </Modal>
      )}
    </div>
  );
}
