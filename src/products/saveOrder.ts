import { getOrders, emitData } from '../site/account';
import { api } from '../api';
import type { Order } from './types';
import { photoFor } from './components/ProductArt';

// Saves a products-page order into the Tracking page's storage (top of the list, old orders kept).
export function saveToTracking(o: Order) {
  try {
    const t = {
      id: o.id,
      placed: o.date,
      items: o.items.map(i => ({ pid: i.product.id, name: i.product.name, img: photoFor(i.product.art, i.colour?.name, i.colour?.photo), qty: i.qty, price: i.product.price, size: i.size })),
      total: o.total,
      stage: 0,
      v: 3,
      userId: api.auth.currentUser()?.id,
      customer: o.address.name,
      phone: o.address.phone,
      courier: 'To be assigned',
      awb: 'Pending',
      eta: o.eta.slice(0, 10),
      address: `${o.address.line1}, ${o.address.city}, ${o.address.state} ${o.address.pin}`,
      payment: o.pay,
      log: [{ stage: 0, at: o.date, note: 'Order placed and payment received' }],
    };
    localStorage.setItem('VELVET TOUCH-orders', JSON.stringify([t, ...getOrders()]));
    emitData();
  } catch (e) {
    console.error('Tracking save failed', e);
  }
}