// Shared order constants / helpers used by the Orders list and the Order details page.
// CRS 4.4 Order Fulfilment Pipeline: Placed > Confirmed > Packed > Shipped > Delivered (or Cancelled).
export const STAGES = ['Order placed', 'Order confirmed', 'Order packed', 'Order shipped', 'Order delivered'];
export const FILTERS = [...STAGES, 'Cancelled'];
export const statusOf = (o) => (o.cancelled ? 'Cancelled' : STAGES[o.stage]);
export const when = (iso) => { const d = new Date(iso); return Number.isNaN(+d) ? iso : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
export const whenTime = (iso) => { const d = new Date(iso); return Number.isNaN(+d) ? iso : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); };

const PRINTED_KEY = 'rhbc:printed-orders';
export const loadPrinted = () => { try { return JSON.parse(localStorage.getItem(PRINTED_KEY) || '[]'); } catch { return []; } };
/** Remember which orders were printed (so "Select next 50" skips them). Returns the new list. */
export const addPrinted = (ids) => {
  const next = [...new Set([...loadPrinted(), ...ids])].slice(-2000);
  try { localStorage.setItem(PRINTED_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  return next;
};
