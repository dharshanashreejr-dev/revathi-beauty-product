import { MONTHLY_REVENUE, SERVICES } from './data/mockData.js';

export const productOf = (products, id) => products.find((p) => p.id === id);

export const orderTotal = (order, products) =>
  order.items.reduce((sum, it) => sum + (productOf(products, it.productId)?.price || 0) * it.qty, 0);

export const itemCount = (order) => order.items.reduce((s, i) => s + i.qty, 0);

// Paid orders that were not cancelled count as product revenue.
export const countsAsRevenue = (o) => o.payment === 'Paid' && o.status !== 'Cancelled';

export const productRevenue = (orders, products) =>
  orders.filter(countsAsRevenue).reduce((s, o) => s + orderTotal(o, products), 0);

export const servicePrice = (name) => SERVICES.find((s) => s.name === name)?.price || 0;

export const appointmentRevenue = (appointments) =>
  appointments.filter((a) => a.status === 'Completed' || a.status === 'Checked In').reduce((s, a) => s + servicePrice(a.service), 0);

// Apr to Sep are fixed sample history; the current month is computed live from the demo orders and appointments.
export const revenueSeries = (orders, appointments, products) => {
  const live = {
    month: 'Oct',
    products: productRevenue(orders, products),
    appointments: appointmentRevenue(appointments)
  };
  return [...MONTHLY_REVENUE.filter((m) => m.month !== 'Oct'), live].map((m) => ({ ...m, total: m.products + m.appointments }));
};

export const unitsSold = (orders, products) => {
  const map = {};
  orders.filter((o) => o.status !== 'Cancelled').forEach((o) =>
    o.items.forEach((i) => {
      const p = productOf(products, i.productId);
      if (p) map[p.name] = (map[p.name] || 0) + i.qty;
    })
  );
  return Object.entries(map).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
};

export const countBy = (list, key, order) =>
  order.map((label) => ({ label, value: list.filter((x) => x[key] === label).length }));

export const nextId = (prefix, list, start) => {
  const nums = list.map((x) => parseInt(String(x.id).split('-')[1], 10)).filter(Number.isFinite);
  return `${prefix}-${Math.max(start, ...nums) + 1}`;
};

export const downloadCsv = (filename, rows) => {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = rows.map((r) => r.map(esc).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
