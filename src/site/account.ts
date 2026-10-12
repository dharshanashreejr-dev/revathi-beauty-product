// Customer-area mock data (localStorage). Replace with real API calls (orders, appointments, profile).
import { products, byId } from './shop'
import { services } from './data'
import { getBookings } from './store'
import { api } from '../api'

// CRS 4.4: Pending > Packed > Dispatched > Delivered (or Cancelled). The customer sees "Order placed" for the first step.
export const ORDER_STAGES = ['Order placed', 'Packed', 'Dispatched', 'Delivered']
export const ORDER_LAST = ORDER_STAGES.length - 1
// Localized labels when a lang is provided (en/ta/hi/ml/te)
export const ORDER_STAGES_I18N: Record<string, string[]> = {
  en: ORDER_STAGES,
  ta: ['ஆர்டர் வைக்கப்பட்டது', 'பேக் செய்யப்பட்டது', 'அனுப்பப்பட்டது', 'டெலிவரி ஆனது'],
  hi: ['ऑर्डर प्लेस हुआ', 'पैक हो गया', 'भेज दिया गया', 'डिलीवर हो गया'],
  ml: ['ഓർഡർ പ്ലേസ് ചെയ്തു', 'പായ്ക്ക് ചെയ്തു', 'ഷിപ്പ് ചെയ്തു', 'ഡെലിവർ ചെയ്തു'],
  te: ['ఆర్డర్ ప్లేస్ అయింది', 'ప్యాక్ అయింది', 'షిప్ అయింది', 'డెలివర్ అయింది'],
}
export const APPT_STAGES_I18N: Record<string, string[]> = {
  en: ['Confirmed', 'Specialist assigned', 'Check-in', 'In session', 'Completed'],
  ta: ['உறுதிப்படுத்தப்பட்டது', 'நிபுணர் நியமிக்கப்பட்டார்', 'செக்-இன்', 'அமர்வில்', 'முடிந்தது'],
  hi: ['पुष्टि', 'विशेषज्ञ नियुक्त', 'चेक-इन', 'सत्र में', 'पूर्ण'],
  ml: ['സ്ഥിരീകരിച്ചു', 'സ്പെഷ്യലിസ്റ്റ് നിയോഗിച്ചു', 'ചെക്ക്-ഇൻ', 'സെഷനിൽ', 'പൂർത്തിയായി'],
  te: ['నిర్ధారించబడింది', 'స్పెషలిస్ట్ కేటాయించబడ్డారు', 'చెక్-ఇన్', 'సెషన్‌లో', 'పూర్తయింది'],
}
export const APPT_STAGES = ['Confirmed', 'Specialist assigned', 'Check-in', 'In session', 'Completed']
export interface OrderItem { pid: string; name: string; img: string; qty: number; price: number; size: string }
export interface Order { id: string; placed: string; items: OrderItem[]; total: number; stage: number; courier: string; awb: string; eta: string; address: string; payment: string; log: { stage: number; at: string; note: string }[]; v?: number; cancelled?: boolean; customer?: string; phone?: string; dispatchSms?: boolean }
export interface Appt { ref: string; service: string; category: string; img: string; date: string; time: string; duration: number; specialist: string; room: string; price: number; status: 'Upcoming' | 'Pending Review' | 'Rejected' | 'Completed' | 'Cancelled'; stage: number; notes: string; mode?: 'parlour' | 'home'; address?: string; reviewNote?: string }
export interface Profile { name: string; email: string; phone: string; address: string; skin: string; birthday: string; tier: string; points: number; nextTier: number; since: string; notify: { whatsapp: boolean; sms: boolean; email: boolean } }

const OK = 'VELVET TOUCH-orders', AK = 'VELVET TOUCH-appts', PK = 'VELVET TOUCH-profile'
const read = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d } catch { return d } }
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }
const ago = (h: number) => new Date(Date.now() - h * 3600e3).toISOString()
const day = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
const notes = ['Order confirmed and payment received', 'Items quality-checked and packed in gift packaging', 'Handed to courier, on its way from our Coimbatore studio', 'Delivered and signed for']

const ADDR = '12, Race Course Road, Coimbatore, Tamil Nadu 641018'
function mkItem(pid: string, qty = 1, size?: string): OrderItem {
  const p = byId(pid) ?? products[0]
  return { pid: p.id, name: p.name, img: p.img, qty, price: p.price, size: size ?? p.sizes[0] }
}
function mkOrder(id: string, items: OrderItem[], stage: number, hoursAgo: number, eta: string, courier: string, awb: string): Order {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const log = Array.from({ length: stage + 1 }, (_, s) => ({ stage: s, at: ago(Math.max(hoursAgo - s * (hoursAgo / (stage + 1.3)), 0.2)), note: notes[s] }))
  return { id, placed: ago(hoursAgo), items, total, stage, courier, awb, eta, address: ADDR, payment: 'UPI · Paid', log, v: 2 }
}
function seedOrders(): Order[] {
  return [
    mkOrder('VT-ORD-10482', [mkItem('rose-serum'), mkItem('gold-cream')], 2, 52, day(0), 'BlueDart Express', 'BD7741820931'),
    mkOrder('VT-ORD-10455', [mkItem('gift-ritual')], 1, 20, day(3), 'DTDC Premium', 'DT5520031187'),
    mkOrder('VT-ORD-10391', [mkItem('body-oil', 1, '200 ml'), mkItem('candle', 2)], 3, 190, day(-4), 'BlueDart Express', 'BD7741209384'),
    mkOrder('VT-ORD-10302', [mkItem('hair-elixir'), mkItem('scalp-ritual')], 3, 520, day(-18), 'DTDC Premium', 'DT5519004412'),
  ]
}
// Orders saved before the 4-step pipeline had 5 stages (…Shipped, Out for delivery, Delivered): fold them into the new steps once.
const fold = (n: number) => (n >= 4 ? 3 : n === 3 ? 2 : n)
function migrate(list: Order[]): Order[] {
  if (list.every((o) => o.v === 2)) return list
  const out = list.map((o) => {
    if (o.v === 2) return o
    const seen = new Set<number>(), log = [...o.log].reverse().map((l) => ({ ...l, stage: fold(l.stage) })).filter((l) => !seen.has(l.stage) && !!seen.add(l.stage)).reverse()
    return { ...o, stage: fold(o.stage), log, v: 2 }
  })
  write(OK, out); return out
}
export const getOrders = (): Order[] => { const v = read<Order[] | null>(OK, null); if (v) return migrate(v); const s = seedOrders(); write(OK, s); return s }
export function addOrder(items: OrderItem[]): Order {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const id = 'VT-ORD-' + (10500 + Math.floor(Math.random() * 400))
  const o: Order = { id, placed: new Date().toISOString(), items, total, stage: 0, courier: 'To be assigned', awb: 'Pending', eta: day(4), address: getProfile().address, payment: 'Razorpay · Paid', log: [{ stage: 0, at: new Date().toISOString(), note: notes[0] }], v: 2, customer: getProfile().name, phone: getProfile().phone }
  write(OK, [o, ...getOrders()]); return o
}
const fmtEta = (iso: string) => { const d = new Date(iso); return isNaN(+d) ? iso : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }
export interface StageResult { ok: boolean; reason?: string; order?: Order; smsSent?: boolean }
/** Moves an order forward (Pending > Packed > Dispatched > Delivered). Marking it Dispatched sends the "Product Dispatched" SMS once.
 *  BACKEND: PATCH /api/orders/:id/status (Admin + Staff). The server sends the SMS and writes the audit entry. */
export function setOrderStage(id: string, next: number, note?: string): StageResult {
  const all = getOrders(), o = all.find((x) => x.id === id)
  if (!o) return { ok: false, reason: 'missing' }
  if (o.cancelled) return { ok: false, reason: 'cancelled' }
  if (next <= o.stage) return { ok: false, reason: 'backwards' }
  if (next > ORDER_LAST) return { ok: false, reason: 'range' }
  const at = new Date().toISOString()
  const log = [...o.log]
  for (let st = o.stage + 1; st <= next; st++) log.push({ stage: st, at, note: st === next && note ? note : notes[st] })
  let upd: Order = { ...o, stage: next, log }
  if (next >= 2 && upd.courier === 'To be assigned') upd = { ...upd, courier: 'BlueDart Express' }
  if (next >= 2 && upd.awb === 'Pending') upd = { ...upd, awb: 'BD' + Math.floor(1e9 + Math.random() * 9e9) }
  let smsSent = false
  if (next >= 2 && !o.dispatchSms) {
    api.sms.sendSms('orderDispatched', o.phone || getProfile().phone || 'Customer', [o.id, fmtEta(o.eta)])
    upd = { ...upd, dispatchSms: true }; smsSent = true
  }
  write(OK, all.map((x) => (x.id === id ? upd : x)))
  return { ok: true, order: upd, smsSent }
}
/** Cancel is allowed until the order is dispatched. */
export function cancelOrder(id: string): StageResult {
  const all = getOrders(), o = all.find((x) => x.id === id)
  if (!o) return { ok: false, reason: 'missing' }
  if (o.cancelled || o.stage >= 2) return { ok: false, reason: o.cancelled ? 'cancelled' : 'dispatched' }
  const upd: Order = { ...o, cancelled: true, log: [...o.log, { stage: o.stage, at: new Date().toISOString(), note: 'Order cancelled' }] }
  write(OK, all.map((x) => (x.id === id ? upd : x)))
  return { ok: true, order: upd }
}
export function updateShipping(id: string, patch: { courier?: string; awb?: string; eta?: string }) {
  write(OK, getOrders().map((o) => (o.id === id ? { ...o, ...patch } : o)))
}
export const advanceOrder = (id: string) => { const o = getOrders().find((x) => x.id === id); if (o) setOrderStage(id, o.stage + 1) }

function seedAppts(): Appt[] {
  const s = (id: string) => services.find((x) => x.id === id) ?? services[0]
  const mk = (ref: string, id: string, d: number, time: string, spec: string, room: string, status: Appt['status'], stage: number, n = ''): Appt => {
    const v = s(id); return { ref, service: v.name, category: v.category, img: v.img, date: day(d), time, duration: v.duration, specialist: spec, room, price: v.price, status, stage, notes: n }
  }
  return [
    mk('VT-APT-7731', 'body-massage', 2, '16:00', 'Anika', 'Suite 3 · Lotus', 'Upcoming', 1, 'Lower back sensitivity, medium pressure please.'),
    mk('VT-APT-7742', 'hydra-facial', 9, '11:00', 'Isha', 'Suite 1 · Rose', 'Upcoming', 0),
    mk('VT-APT-7690', 'beauty-consultation', -12, '17:00', 'Nisha', 'Consultation room', 'Completed', 4, 'Skin routine planning.'),
    mk('VT-APT-7611', 'normal-facial', -30, '10:00', 'Isha', 'Suite 2 · Sandal', 'Completed', 4),
  ]
}
export function getAppts(): Appt[] {
  const mine = read<Appt[] | null>(AK, null) ?? (() => { const s = seedAppts(); write(AK, s); return s })()
  const placed = getBookings().filter((b) => b.email !== 'demo@example.com' && !mine.some((m) => m.ref === b.ref)).map((b): Appt => ({
    ref: b.ref, service: b.serviceName, category: b.category, img: services.find((x) => x.id === b.serviceId)?.img ?? 'close', date: b.date, time: b.time, duration: b.duration,
    specialist: b.specialists.join(', '), room: b.mode === 'home' ? 'At your home' : 'Assigned at check-in', price: b.total, status: b.status === 'Cancelled' ? 'Cancelled' : b.status === 'Rejected' ? 'Rejected' : b.status === 'Pending Review' ? 'Pending Review' : b.status === 'Completed' ? 'Completed' : 'Upcoming', stage: 0, notes: b.notes,
    mode: b.mode, address: b.address ? `${b.address.line1}, ${b.address.city}, ${b.address.state} ${b.address.pin}` : undefined, reviewNote: b.reviewNote }))
  return [...placed, ...mine]
}
export function cancelAppt(ref: string) { api.booking.cancelBooking(ref); write(AK, (read<Appt[] | null>(AK, null) ?? []).map((a) => (a.ref === ref ? { ...a, status: 'Cancelled' as const } : a))) }
export function advanceAppt(ref: string) { write(AK, (read<Appt[] | null>(AK, null) ?? []).map((a) => (a.ref === ref && a.stage < 4 ? { ...a, stage: a.stage + 1, status: a.stage + 1 === 4 ? ('Completed' as const) : a.status } : a))) }

const defProfile: Profile = { name: 'Aarthi Rajan', email: 'aarthi.rajan@example.com', phone: '+91 98765 43210', address: ADDR, skin: 'Combination', birthday: '1994-03-18', tier: 'Velvet Gold', points: 2480, nextTier: 3500, since: '2023', notify: { whatsapp: true, sms: true, email: false } }
export const getProfile = (): Profile => {
  const u = api.auth.currentUser(), a = u?.addresses[0]
  // The logged-in customer's own details always win over the sample profile.
  const mine: Partial<Profile> = u ? { name: u.name || 'Valued customer', phone: '+91 ' + u.phone, email: u.email, address: a ? `${a.line1}, ${a.city}, ${a.state} ${a.pin}` : '', since: String(new Date(u.createdAt).getFullYear()) } : {}
  return { ...defProfile, ...read<Partial<Profile>>(PK, {}), ...mine }
}
export const saveProfile = (p: Profile) => { write(PK, p); api.auth.updateProfile({ name: p.name, email: p.email }) }
const locale = () => { try { const l = localStorage.getItem('velvet-lang'); return ({ en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN', te: 'te-IN' } as Record<string,string>)[l || 'en'] || 'en-IN' } catch { return 'en-IN' } }
export const fmtDay = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString(locale(), { weekday: 'short', day: 'numeric', month: 'short' })
export const fmtWhen = (iso: string) => new Date(iso).toLocaleString(locale(), { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
