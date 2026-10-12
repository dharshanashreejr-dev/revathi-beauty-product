<<<<<<< HEAD
import { getSiteConfig, promoPrice } from '../shared/siteConfig'
import { team, type Category } from '../api/catalog'

export { team }
export type { Category }

export interface Service { id: string; name: string; category: Category; duration: number; price: number; basePrice?: number; promo?: string; care?: string; img: string; desc: string; popular?: boolean }
=======
export type Category = 'Body Massage' | 'Facial' | 'Consultation'
export interface Service { id: string; name: string; category: Category; duration: number; price: number; img: string; desc: string; popular?: boolean }
>>>>>>> origin/main

export const spa = {
  name: 'REVATHI HERBAL BEAUTY CARE', sub: 'WOMEN\'S LUXURY SALON', short: 'WOMEN\'S LUXURY SALON', phone: '+91 90000 00000', email: 'hello@revathiherbal.com',
  address: '24 Lotus Garden Road, City Centre', hours: [['Monday – Friday', '9:00 am – 9:00 pm'], ['Saturday', '9:00 am – 10:00 pm'], ['Sunday', '10:00 am – 8:00 pm']],
}
<<<<<<< HEAD
export const categories: ('All' | Category)[] = ['All', 'Body Massage', 'Facial', 'Consultation', 'Bridal Makeup']
export const amenities = ['Women-only luxury space', 'Private treatment suites', 'Herbal tea bar', 'Lockers & fresh towels', 'Free parking', 'Vegan & organic products', 'Wheelchair accessible']
export const policies = ['Arrive 10 minutes early to unwind', 'Free rescheduling up to 12 hours before', 'Please share allergies or injuries in the notes', 'Gift cards available at reception']

// Normal services and consultations are edited by the admin (admin panel -> Services & Pricing). `price` is the price AFTER the
// active promotional discount; `basePrice` is the base fee, shown struck through when a promo is running.
const SERVICE_IMG: Record<string, string> = { 'body-massage': 'close', 'normal-facial': 'facial', 'hydra-facial': 'facial2', 'beauty-consultation': 'reception' }
const promoTag = (type?: 'flat' | 'percent', v = 0) => (v > 0 ? (type === 'flat' ? `₹${v} off` : `${v}% off`) : undefined)
const baseServices = (): Service[] => getSiteConfig().services.filter((s) => s.active).map((s) => ({
  id: s.id, name: s.name, category: s.category as Category, duration: s.duration, price: promoPrice(s.price, s.discountType, s.discountValue),
  basePrice: s.discountValue > 0 ? s.price : undefined, promo: promoTag(s.discountType, s.discountValue), care: s.care || undefined,
  img: SERVICE_IMG[s.id] ?? 'facial', popular: s.popular, desc: s.desc,
}))
// Bridal makeup packages are edited by the admin too.
const bridalServices = (): Service[] => getSiteConfig().bridalPackages.map((b) => ({
  id: b.id, name: `Bridal Makeup – ${b.name}`, category: 'Bridal Makeup' as Category, duration: b.duration,
  price: promoPrice(b.price, b.discountType, b.discountValue), basePrice: (b.discountValue ?? 0) > 0 ? b.price : undefined, promo: promoTag(b.discountType, b.discountValue), care: b.care || undefined,
  img: 'facial2', popular: b.popular, desc: b.features.join(' · '),
}))
export const services: Service[] = [...baseServices(), ...bridalServices()]

/** Admin switch: service prices are hidden on the public site unless the admin turns them on. */
export const servicePricesVisible = () => getSiteConfig().showServicePrices
=======
export const categories: ('All' | Category)[] = ['All', 'Body Massage', 'Facial', 'Consultation']
export const amenities = ['Women-only luxury space', 'Private treatment suites', 'Herbal tea bar', 'Lockers & fresh towels', 'Free parking', 'Vegan & organic products', 'Wheelchair accessible']
export const policies = ['Arrive 10 minutes early to unwind', 'Free rescheduling up to 12 hours before', 'Please share allergies or injuries in the notes', 'Gift cards available at reception']

export const services: Service[] = [
  { id: 'body-massage', name: 'Body Massage', category: 'Body Massage', duration: 60, price: 2800, img: 'close', popular: true, desc: 'A calming full-body massage with warm herbal oils, made for women to unwind in our private suites.' },
  { id: 'normal-facial', name: 'Normal Facial', category: 'Facial', duration: 60, price: 2200, img: 'facial', popular: true, desc: 'Cleanse, gentle exfoliation, massage and a glow mask for fresh, healthy-looking skin.' },
  { id: 'hydra-facial', name: 'Hydra Facial', category: 'Facial', duration: 75, price: 3200, img: 'facial2', desc: 'Deep cleansing and intense hydration for a fresher, brighter, smoother look.' },
  { id: 'beauty-consultation', name: 'Beauty Consultation', category: 'Consultation', duration: 30, price: 500, img: 'reception', desc: 'A one-to-one session with our beauty expert to plan the right skin and beauty routine for you.' },
]
>>>>>>> origin/main
export const img = (k: string) => `/img/${k}.jpg`
const moneyLocale = () => { try { const l = localStorage.getItem('velvet-lang'); return ({ en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN', te: 'te-IN' } as Record<string,string>)[l || 'en'] || 'en-IN' } catch { return 'en-IN' } }
export const money = (n: number) => '₹' + n.toLocaleString(moneyLocale())

<<<<<<< HEAD
=======
export const team: { name: string; role: string; skill: string; img: string; categories: Category[] }[] = [
  { name: 'Anika', role: 'Lead massage therapist', skill: 'Body massage & aromatherapy', img: 'reception', categories: ['Body Massage'] },
  { name: 'Meera', role: 'Senior therapist', skill: 'Body massage & aromatherapy', img: 'close', categories: ['Body Massage'] },
  { name: 'Isha', role: 'Senior beautician', skill: 'Facials & hydra facial', img: 'facial2', categories: ['Facial', 'Consultation'] },
  { name: 'Nisha', role: 'Beauty consultant', skill: 'Skin & beauty consultation', img: 'facial', categories: ['Consultation', 'Facial'] },
]
>>>>>>> origin/main
