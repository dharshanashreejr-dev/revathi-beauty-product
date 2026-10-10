// Manager-view sample data (localStorage). Replace with real API calls.
import { products } from './shop'
import { ORDER_STAGES } from './account'
export { ORDER_STAGES }
export interface MOrder { id: string; customer: string; phone: string; city: string; items: string; qty: number; total: number; stage: number; cancelled: boolean; payment: string; placed: string }
export interface Customer { name: string; phone: string; city: string; tier: 'Velvet Platinum' | 'Velvet Gold' | 'Velvet Silver' | 'New'; orders: number; visits: number; spent: number; last: string }
const OK = 'VELVET TOUCH-m-orders', SK = 'VELVET TOUCH-m-stock'
const read = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d } catch { return d } }
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }
const ago = (h: number) => new Date(Date.now() - h * 3600e3).toISOString()

export const customers: Customer[] = [
  { name: 'Aarthi Rajan', phone: '+91 98765 43210', city: 'Coimbatore', tier: 'Velvet Gold', orders: 9, visits: 14, spent: 86400, last: 'Today' },
  { name: 'Divya Menon', phone: '+91 98430 11223', city: 'Coimbatore', tier: 'Velvet Platinum', orders: 21, visits: 32, spent: 214800, last: 'Yesterday' },
  { name: 'Karthik Raja', phone: '+91 97890 55421', city: 'Tiruppur', tier: 'Velvet Silver', orders: 5, visits: 6, spent: 31200, last: '3 days ago' },
  { name: 'Anjali Prakash', phone: '+91 99620 88012', city: 'Erode', tier: 'Velvet Gold', orders: 12, visits: 9, spent: 98700, last: '5 days ago' },
  { name: 'Meena Subramani', phone: '+91 98940 33781', city: 'Coimbatore', tier: 'Velvet Silver', orders: 4, visits: 8, spent: 27450, last: '1 week ago' },
  { name: 'Arun Kumar', phone: '+91 90030 76655', city: 'Salem', tier: 'New', orders: 1, visits: 1, spent: 4200, last: '2 weeks ago' },
  { name: 'Priya Sundar', phone: '+91 97910 20934', city: 'Coimbatore', tier: 'Velvet Platinum', orders: 18, visits: 27, spent: 189300, last: 'Today' },
  { name: 'Latha Venkat', phone: '+91 98652 41100', city: 'Pollachi', tier: 'Velvet Silver', orders: 3, visits: 5, spent: 19800, last: '4 days ago' },
]
const pr = (id: string) => products.find((p) => p.id === id)?.price ?? 0
function seed(): MOrder[] {
  const rows: [string, number, string, number, number, string, number][] = [
    ['rose-serum', 2, 'Aarthi Rajan', 1, 40, 'UPI', 3], ['gift-ritual', 1, 'Divya Menon', 0, 4, 'Card', 0], ['body-oil', 1, 'Priya Sundar', 1, 9, 'UPI', 1], ['gold-cream', 1, 'Anjali Prakash', 3, 30, 'Card', 2],
    ['candle', 3, 'Karthik Raja', 2, 60, 'COD', 4], ['clay-mask', 2, 'Meena Subramani', 0, 2, 'UPI', 0], ['hair-elixir', 1, 'Latha Venkat', 1, 26, 'UPI', 1], ['salt-scrub', 2, 'Arun Kumar', 2, 75, 'COD', 2],
    ['cleansing-balm', 1, 'Divya Menon', 4, 120, 'Card', 4], ['pillow-mist', 2, 'Priya Sundar', 4, 150, 'UPI', 4], ['hand-cream', 3, 'Aarthi Rajan', 4, 200, 'UPI', 4], ['scalp-ritual', 1, 'Anjali Prakash', 4, 260, 'Card', 4],
  ]
  return rows.map(([pid, q, cust, stage, h, pay, _c], i) => {
    const c = customers.find((x) => x.name === cust) ?? customers[0], p = products.find((x) => x.id === pid) ?? products[0]
    return { id: `VT-ORD-${10520 - i}`, customer: c.name, phone: c.phone, city: c.city, items: `${p.name}${q > 1 ? ` ×${q}` : ''}`, qty: q, total: pr(pid) * q, stage, cancelled: false, payment: pay, placed: ago(h) }
  })
}
export const getMOrders = (): MOrder[] => { const v = read<MOrder[] | null>(OK, null); if (v) return v; const s = seed(); write(OK, s); return s }
export const advanceMOrder = (id: string) => write(OK, getMOrders().map((o) => (o.id === id && !o.cancelled && o.stage < 4 ? { ...o, stage: o.stage + 1 } : o)))
export const cancelMOrder = (id: string) => write(OK, getMOrders().map((o) => (o.id === id && o.stage < 4 ? { ...o, cancelled: true } : o)))

const defStock: Record<string, number> = { 'rose-serum': 64, 'gold-cream': 12, 'clay-mask': 48, 'cleansing-balm': 8, 'body-oil': 71, 'salt-scrub': 35, 'hand-cream': 90, 'hair-elixir': 6, 'scalp-ritual': 29, candle: 18, 'pillow-mist': 52, 'gift-ritual': 15 }
export const getStock = (): Record<string, number> => ({ ...defStock, ...read<Record<string, number>>(SK, {}) })
export const setStock = (id: string, n: number) => write(SK, { ...getStock(), [id]: Math.max(0, n) })
export const REORDER = 15
export const week: [string, number, number][] = [['Mon', 42, 31], ['Tue', 38, 35], ['Wed', 51, 40], ['Thu', 47, 38], ['Fri', 66, 52], ['Sat', 82, 71], ['Sun', 58, 49]] // [day, products ₹k, spa ₹k]
export const topSold: [string, number][] = [['Velvet Rose Glow Serum', 812], ['Velvet Hour Soy Candle', 640], ['Sandalwood Amber Body Oil', 588], ['24K Gold Renewal Cream', 410], ['Argan Silk Hair Elixir', 302]]
