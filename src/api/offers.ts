// Festival campaigns, coupons and bundle offers (CRS 4.3).
// BACKEND: `campaigns`, `coupons`, `bundles` tables. validateCoupon() / redeemCoupon() run on the server inside the order
//          transaction (never trust the browser for the discount). The festival SMS goes through the DLT "Promotional"
//          template; the start / end dates drive a scheduled job that activates and expires each offer.
import { read, write, uid } from './storage'

export type Scope = 'products' | 'services' | 'both'
export type OfferStatus = 'Scheduled' | 'Active' | 'Expired' | 'Paused'

export interface Campaign { id: string; name: string; pct: number; code: string; scope: Scope; start: string; end: string; active: boolean; used: number; smsSent: number }
export interface Coupon { id: string; code: string; type: 'percent' | 'flat'; value: number; minOrder: number; maxUses: number; used: number; scope: Scope; start: string; end: string; active: boolean }
export interface Bundle { id: string; name: string; service: string; product: string; price: number; start: string; end: string; active: boolean }
interface Data { campaigns: Campaign[]; coupons: Coupon[]; bundles: Bundle[] }

const OK = 'rhbc:offers'
const seed: Data = {
  campaigns: [
    { id: 'cmp-1', name: 'Deepavali Glow Offer', pct: 15, code: 'DEEPAVALI15', scope: 'both', start: '2026-11-01', end: '2026-11-14', active: true, used: 0, smsSent: 0 },
    { id: 'cmp-2', name: 'Pongal Special', pct: 20, code: 'PONGAL20', scope: 'both', start: '2027-01-12', end: '2027-01-18', active: true, used: 0, smsSent: 0 },
  ],
  coupons: [
    { id: 'cpn-1', code: 'WELCOME10', type: 'percent', value: 10, minOrder: 999, maxUses: 0, used: 0, scope: 'products', start: '2026-01-01', end: '2026-12-31', active: true },
    { id: 'cpn-2', code: 'FLAT200', type: 'flat', value: 200, minOrder: 1999, maxUses: 100, used: 14, scope: 'both', start: '2026-10-01', end: '2026-12-31', active: true },
  ],
  bundles: [
    { id: 'bun-1', name: 'Glow Ritual Combo', service: 'Normal Facial', product: 'Aurelia Hyaluronic Dew Serum', price: 4199, start: '2026-10-01', end: '2026-12-31', active: true },
    { id: 'bun-2', name: 'New Year Bundle', service: 'Body Massage', product: 'Nuage Whipped Body Butter', price: 4299, start: '2026-12-26', end: '2027-01-05', active: true },
  ],
}
const load = (): Data => ({ ...seed, ...read<Partial<Data>>(OK, {}) })
const save = (d: Data) => write(OK, d)

/** Today as YYYY-MM-DD in the browser's local time. */
export const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
export const statusOf = (o: { active: boolean; start: string; end: string }): OfferStatus =>
  !o.active ? 'Paused' : today() < o.start ? 'Scheduled' : today() > o.end ? 'Expired' : 'Active'

export const list = () => load()
export const codeTaken = (code: string, exceptId?: string) => {
  const c = code.trim().toUpperCase(), d = load()
  return [...d.campaigns, ...d.coupons].some((x) => x.code === c && x.id !== exceptId)
}
export const newId = (p: 'cmp' | 'cpn' | 'bun') => uid(p)

function upsert<T extends { id: string }>(arr: T[], item: T): T[] { return arr.some((x) => x.id === item.id) ? arr.map((x) => (x.id === item.id ? item : x)) : [item, ...arr] }
export const saveCampaign = (c: Campaign) => { const d = load(); save({ ...d, campaigns: upsert(d.campaigns, { ...c, code: c.code.trim().toUpperCase() }) }) }
export const saveCoupon = (c: Coupon) => { const d = load(); save({ ...d, coupons: upsert(d.coupons, { ...c, code: c.code.trim().toUpperCase() }) }) }
export const saveBundle = (b: Bundle) => { const d = load(); save({ ...d, bundles: upsert(d.bundles, b) }) }
export const removeOffer = (kind: 'campaign' | 'coupon' | 'bundle', id: string) => {
  const d = load()
  save(kind === 'campaign' ? { ...d, campaigns: d.campaigns.filter((x) => x.id !== id) } : kind === 'coupon' ? { ...d, coupons: d.coupons.filter((x) => x.id !== id) } : { ...d, bundles: d.bundles.filter((x) => x.id !== id) })
}
export const markSmsSent = (id: string, n: number) => { const d = load(); save({ ...d, campaigns: d.campaigns.map((c) => (c.id === id ? { ...c, smsSent: c.smsSent + n } : c)) }) }

export type CouponReason = 'empty' | 'invalid' | 'inactive' | 'early' | 'expired' | 'scope' | 'used-up' | 'min'
export type CouponResult = { ok: true; code: string; label: string; discount: number } | { ok: false; reason: CouponReason; min?: number }

/** Checks a code typed by the customer. Campaign codes work like percent coupons during their dates. */
export function validateCoupon(code: string, subtotal: number, forScope: 'products' | 'services' = 'products'): CouponResult {
  const c = code.trim().toUpperCase()
  if (!c) return { ok: false, reason: 'empty' }
  const d = load()
  const cp = d.coupons.find((x) => x.code === c)
  const ca = d.campaigns.find((x) => x.code === c)
  const item = cp ?? ca
  if (!item) return { ok: false, reason: 'invalid' }
  if (!item.active) return { ok: false, reason: 'inactive' }
  if (today() < item.start) return { ok: false, reason: 'early' }
  if (today() > item.end) return { ok: false, reason: 'expired' }
  if (item.scope !== 'both' && item.scope !== forScope) return { ok: false, reason: 'scope' }
  if (cp) {
    if (cp.maxUses > 0 && cp.used >= cp.maxUses) return { ok: false, reason: 'used-up' }
    if (subtotal < cp.minOrder) return { ok: false, reason: 'min', min: cp.minOrder }
    const discount = cp.type === 'percent' ? Math.round((subtotal * cp.value) / 100) : Math.min(cp.value, subtotal)
    return { ok: true, code: c, label: cp.type === 'percent' ? `${cp.value}%` : `₹${cp.value}`, discount }
  }
  return { ok: true, code: c, label: `${ca!.pct}%`, discount: Math.round((subtotal * ca!.pct) / 100) }
}
/** Counts one use after the order is placed. */
export function redeemCoupon(code: string) {
  const c = code.trim().toUpperCase(), d = load()
  save({ ...d, coupons: d.coupons.map((x) => (x.code === c ? { ...x, used: x.used + 1 } : x)), campaigns: d.campaigns.map((x) => (x.code === c ? { ...x, used: x.used + 1 } : x)) })
}
