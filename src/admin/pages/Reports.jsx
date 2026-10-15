import { useMemo, useState } from 'react';
import { Download, IndianRupee, Package, CalendarCheck, ShoppingBag, Receipt, FlaskConical } from 'lucide-react';
import { useStore } from '../store.jsx';
import { api } from '../../api';
import { inr, ORDER_STATUSES, SERVICES } from '../data/mockData.js';
import { revenueSeries, productRevenue, appointmentRevenue, orderTotal, countsAsRevenue, productOf, downloadCsv } from '../utils.js';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';
import { BarChart, Donut, HBars, chartColor } from '../components/Charts.jsx';
import { useT } from '../i18n.js';

const RANGES = [
  { id: '3', label: 'Last 3 months', n: 3 },
  { id: '6', label: 'Last 6 months', n: 6 },
  { id: '7', label: 'April to October', n: 7 },
  { id: '1', label: 'Current month (October)', n: 1 }
];

export default function Reports() {
  const { orders, appointments, products, notify } = useStore();
  const { t } = useT();
  const [range, setRange] = useState('7');

  const all = useMemo(() => revenueSeries(orders, appointments, products), [orders, appointments, products]);
  const series = all.slice(-RANGES.find((r) => r.id === range).n);
  const sum = (key) => series.reduce((s, m) => s + m[key], 0);
  const productSales = sum('products');
  const serviceRevenue = sum('appointments');
  const totalRevenue = productSales + serviceRevenue;

  const paidOrders = orders.filter(countsAsRevenue);
  const aov = paidOrders.length ? Math.round(productRevenue(orders, products) / paidOrders.length) : 0;

  const revenueByProduct = useMemo(() => {
    const map = {};
    paidOrders.forEach((o) => o.items.forEach((i) => {
      const p = productOf(products, i.productId);
      if (p) map[p.name] = (map[p.name] || 0) + p.price * i.qty;
    }));
    return Object.entries(map).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 6);
  }, [paidOrders, products]);

  const byService = SERVICES.map((s, i) => ({ label: s.name, value: appointments.filter((a) => a.service === s.name && a.status !== 'Cancelled').length, color: chartColor(i) }));
  const byOrderStatus = ORDER_STATUSES.map((s) => ({ label: s, value: orders.filter((o) => o.status === s).length }));
  const posSummary = api.pos.posRevenueSummary();

  const exportCsv = () => {
    const rows = [
      ['Revathi Herbal Beauty Care - Revenue report (SAMPLE / DEMO DATA)'],
      ['Range', RANGES.find((r) => r.id === range).label],
      [],
      ['Month', 'Product sales (INR)', 'Appointment revenue (INR)', 'Total (INR)'],
      ...series.map((m) => [m.month, m.products, m.appointments, m.total]),
      [],
      ['Orders', 'Customer', 'Payment', 'Status', 'Total (INR)'],
      ...orders.map((o) => [o.id, o.customer, o.payment, o.status, orderTotal(o, products)])
    ];
    downloadCsv('maison-bloom-demo-report.csv', rows);
    notify('Demo report exported as a CSV file.');
  };

  return (
    <div className="page">
      <PageHeader title={t('Revenue and reports')} subtitle={t('Sample data for presentation. No accounting system is connected.')}
        actions={
          <>
            <label className="select-inline"><span>{t('Date range')}</span>
              <select value={range} onChange={(e) => setRange(e.target.value)}>{RANGES.map((r) => <option key={r.id} value={r.id}>{t(r.label)}</option>)}</select>
            </label>
            <button className="btn btn-primary" onClick={exportCsv}><Download size={17} />{t('Export report')}</button>
          </>
        } />
      <div className="stat-grid">
        <StatCard icon={IndianRupee} label={t('Total revenue')} value={inr(totalRevenue)} hint={t(RANGES.find((r) => r.id === range).label)} tone="forest" />
        <StatCard icon={Package} label={t('Product sales')} value={inr(productSales)} tone="rose" />
        <StatCard icon={CalendarCheck} label={t('Appointment revenue')} value={inr(serviceRevenue)} tone="sage" />
        <StatCard icon={ShoppingBag} label={t('Total orders')} value={orders.length} hint={t('{n} paid', { n: paidOrders.length })} tone="sand" />
        <StatCard icon={Receipt} label={t('Average order value')} value={inr(aov)} hint={t('Paid orders')} tone="amber" />
        <StatCard icon={CalendarCheck} label={t('Completed services')} value={appointments.filter((a) => a.status === 'Completed').length} hint={t('{amount} this month', { amount: inr(appointmentRevenue(appointments)) })} tone="sage" />
      </div>

      <div className="card" style={{ marginBottom: 22 }}>
        <div className="card-head">
          <h3>{t('POS billing (GST)')}</h3>
          <span className="muted">{t('{n} invoices', { n: posSummary.count })}</span>
        </div>
        <div className="stat-grid four" style={{ marginBottom: 0 }}>
          <StatCard icon={Receipt} label={t('POS total')} value={inr(posSummary.total)} tone="forest" />
          <StatCard icon={IndianRupee} label="CGST collected" value={inr(posSummary.cgst)} tone="sage" />
          <StatCard icon={IndianRupee} label="SGST collected" value={inr(posSummary.sgst)} tone="sage" />
          <StatCard icon={ShoppingBag} label={t('Invoices')} value={posSummary.count} hint={Object.entries(posSummary.byPay).map(([k, v]) => `${k}: ${inr(v)}`).join(' · ') || '—'} tone="sand" />
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-head"><h3>{t('Revenue by month')}</h3><span className="muted">{t('INR, sample data')}</span></div>
          <BarChart data={series} xKey="month" stacked series={[{ key: 'products', label: 'Product sales', color: '#c98f84' }, { key: 'appointments', label: 'Appointments', color: '#1f3a2e' }]} />
        </div>
        <div className="card">
          <div className="card-head"><h3>{t('Product sales chart')}</h3><span className="muted">{t('Revenue by product')}</span></div>
          <HBars data={revenueByProduct} format={inr} />
        </div>
        <div className="card">
          <div className="card-head"><h3>{t('Appointment statistics')}</h3><span className="muted">{t('Bookings by service')}</span></div>
          <Donut data={byService} centerLabel="Bookings" centerValue={byService.reduce((s, d) => s + d.value, 0)} />
        </div>
        <div className="card">
          <div className="card-head"><h3>{t('Order status summary')}</h3><span className="muted">{t('All orders')}</span></div>
          <Donut data={byOrderStatus} centerLabel="Orders" centerValue={orders.length} />
          <div className="chip-row summary-badges">{byOrderStatus.map((s) => <span key={s.label} className="row-gap"><Badge>{s.label}</Badge><strong>{s.value}</strong></span>)}</div>
        </div>
      </div>
    </div>
  );
}
