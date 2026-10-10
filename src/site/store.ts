// Mock backend stored in localStorage. Replace these functions with real API calls (e.g. Spring Boot + MySQL).
// Reminders are simulated here; real SMS / WhatsApp delivery needs a server job calling Twilio / WhatsApp Business API.
import { team, type Category } from './data'

export type Channel = 'SMS' | 'WhatsApp' | 'SMS + WhatsApp'
export interface Reminder { label: string; at: string; channel: Channel; status: 'Sent' | 'Scheduled' | 'Cancelled' }
export interface Booking {
  ref: string; serviceId: string; serviceName: string; category: string; duration: number; date: string; time: string
  specialists: string[]; guests: number; name: string; phone: string; email: string; notes: string
  channel: Channel; remind: boolean; reminders: Reminder[]; status: 'Confirmed' | 'Cancelled'; total: number
}
export const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
export const CLOSE = 21 * 60
const BK = 'serene-bookings', BL = 'serene-blocked'
const pad = (n: number) => String(n).padStart(2, '0')
export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const addDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d) }
export const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const overlap = (a: number, b: number, c: number, d: number) => a < d && c < b

function read<T>(k: string, d: T): T { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d } catch { return d } }
function write(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }

function seed(): Booking[] {
  const mk = (day: number, time: string, spec: string, name: string, svc: string, dur: number, cat: string): Booking => ({
    ref: `SRN-${name.slice(0, 3).toUpperCase()}${day}${time.slice(0, 2)}`, serviceId: '', serviceName: svc, category: cat, duration: dur, date: addDays(day), time,
    specialists: [spec], guests: 1, name, phone: '+91 98000 00000', email: 'demo@example.com', notes: '', channel: 'WhatsApp', remind: false, reminders: [], status: 'Confirmed', total: 0 })
  return [mk(0, '16:00', 'Anika', 'Priya', 'Aromatherapy Massage', 60, 'Massage'), mk(1, '10:00', 'Anika', 'Latha', 'Hot Stone Therapy', 90, 'Massage'),
    mk(1, '11:00', 'Dev', 'Karthik', 'Radiance Rose Facial', 60, 'Facial'), mk(1, '14:00', 'Dr. Nisha', 'Divya', 'Dermatology Consultation', 30, 'Clinic'),
    mk(2, '12:00', 'Kabir', 'Arun', 'Haircut & Styling', 45, 'Salon'), mk(2, '15:00', 'Isha', 'Meena', 'Global Hair Colour', 120, 'Salon')]
}
export function getBookings(): Booking[] { const v = read<Booking[] | null>(BK, null); if (v) return v; const s = seed(); write(BK, s); return s }
export const saveBookings = (b: Booking[]) => write(BK, b)
export const getBlocked = () => read<string[]>(BL, [])
export function toggleBlock(date: string, name: string, time: string) {
  const k = `${date}|${name}|${time}`, b = getBlocked(); write(BL, b.includes(k) ? b.filter((x) => x !== k) : [...b, k])
}

/** A specialist is busy if a slot overlapping the service is blocked or an existing confirmed booking overlaps. */
export function isBusy(name: string, date: string, time: string, dur: number, ignore?: string) {
  const a = toMin(time), b = a + dur, bl = getBlocked()
  if (SLOTS.some((s) => bl.includes(`${date}|${name}|${s}`) && overlap(a, b, toMin(s), toMin(s) + 60))) return true
  return getBookings().some((x) => x.status === 'Confirmed' && x.ref !== ignore && x.date === date && x.specialists.includes(name) && overlap(a, b, toMin(x.time), toMin(x.time) + x.duration))
}
export const freeSpecialists = (cat: Category, date: string, time: string, dur: number, ignore?: string) =>
  team.filter((t) => t.categories.includes(cat) && !isBusy(t.name, date, time, dur, ignore))
export function slotOk(date: string, time: string, dur: number) {
  if (toMin(time) + dur > CLOSE) return false
  if (date === iso(new Date())) { const n = new Date(); return toMin(time) > n.getHours() * 60 + n.getMinutes() + 30 }
  return true
}
export const dayHasSlot = (date: string, cat: Category, dur: number, guests: number) =>
  SLOTS.some((t) => slotOk(date, t, dur) && freeSpecialists(cat, date, t, dur).length >= guests)

function buildReminders(date: string, time: string, channel: Channel): Reminder[] {
  const start = new Date(`${date}T${time}:00`).getTime(), now = Date.now()
  const out: Reminder[] = [{ label: 'Booking confirmation', at: new Date(now).toISOString(), channel, status: 'Sent' }]
  ;([[24, '24 hours before'], [2, '2 hours before']] as [number, string][]).forEach(([h, l]) => {
    const at = start - h * 3600e3
    if (at > now) out.push({ label: `Reminder · ${l}`, at: new Date(at).toISOString(), channel, status: 'Scheduled' })
  })
  return out
}
export function createBooking(i: Omit<Booking, 'ref' | 'reminders' | 'status'>): Booking {
  const b: Booking = { ...i, ref: 'SRN-' + Math.random().toString(36).slice(2, 8).toUpperCase(), status: 'Confirmed', reminders: i.remind ? buildReminders(i.date, i.time, i.channel) : [] }
  saveBookings([...getBookings(), b]); return b
}
export function updateBooking(ref: string, patch: Partial<Booking>) { saveBookings(getBookings().map((b) => (b.ref === ref ? { ...b, ...patch } : b))) }
export function cancelBooking(ref: string) {
  const b = getBookings().find((x) => x.ref === ref); if (!b) return
  updateBooking(ref, { status: 'Cancelled', reminders: b.reminders.map((r) => (r.status === 'Scheduled' ? { ...r, status: 'Cancelled' as const } : r)) })
}
/** Simulated dispatcher: marks reminders whose time has come as Sent. */
export function processDue() {
  const now = Date.now(); let n = 0
  saveBookings(getBookings().map((b) => ({ ...b, reminders: b.reminders.map((r) => (r.status === 'Scheduled' && new Date(r.at).getTime() <= now ? (n++, { ...r, status: 'Sent' as const }) : r)) })))
  return n
}
const storeLocale = () => { try { const l = localStorage.getItem('velvet-lang'); return ({ en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN', te: 'te-IN' } as Record<string,string>)[l || 'en'] || 'en-IN' } catch { return 'en-IN' } }
export const fmtDT = (iso_: string) => new Date(iso_).toLocaleString(storeLocale(), { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
