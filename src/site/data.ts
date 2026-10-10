export type Category = 'Massage' | 'Facial' | 'Body' | 'Hands & Feet' | 'Packages' | 'Salon' | 'Clinic'
export interface Service { id: string; name: string; category: Category; duration: number; price: number; img: string; desc: string; popular?: boolean }

export const spa = {
  name: 'REVATHI HERBAL BEAUTY CARE', sub: 'THE EXCLUSIVE BEAUTY PRODUCTS AND SPA', short: 'EXCLUSIVE BEAUTY & SPA', phone: '+91 90000 00000', email: 'hello@revathiherbal.com',
  address: '24 Lotus Garden Road, City Centre', hours: [['Monday – Friday', '9:00 am – 9:00 pm'], ['Saturday', '9:00 am – 10:00 pm'], ['Sunday', '10:00 am – 8:00 pm']],
}
export const categories: ('All' | Category)[] = ['All', 'Massage', 'Facial', 'Body', 'Hands & Feet', 'Packages', 'Salon', 'Clinic']
export const amenities = ['Steam & sauna lounge', 'Private treatment suites', 'Couple\'s suite', 'Herbal tea bar', 'Lockers & fresh towels', 'Free parking', 'Vegan & organic products', 'Wheelchair accessible']
export const policies = ['Arrive 10 minutes early to unwind', 'Free rescheduling up to 12 hours before', 'Please share allergies or injuries in the notes', 'Gift cards available at reception']

export const services: Service[] = [
  { id: 'aroma-massage', name: 'Signature Aromatherapy Massage', category: 'Massage', duration: 60, price: 2500, img: 'close', popular: true, desc: 'Long, flowing strokes with a warm blend of essential oils to melt tension.' },
  { id: 'deep-tissue', name: 'Deep Tissue Release', category: 'Massage', duration: 75, price: 3200, img: 'back', desc: 'Firm, focused work on knots and tight muscle groups for lasting relief.' },
  { id: 'hot-stone', name: 'Hot Stone Therapy', category: 'Massage', duration: 90, price: 3800, img: 'wide', desc: 'Heated basalt stones loosen the body from the inside out.' },
  { id: 'four-hand', name: 'Four-Hand Harmony', category: 'Massage', duration: 60, price: 5200, img: 'wide', desc: 'Two therapists, one rhythm. Deeply synchronised and unforgettable.' },
  { id: 'neck-shoulder', name: 'Head, Neck & Shoulder Relief', category: 'Massage', duration: 30, price: 1400, img: 'back', desc: 'A quick reset for desk-bound shoulders and tired minds.' },
  { id: 'rose-facial', name: 'Radiance Rose Facial', category: 'Facial', duration: 60, price: 2800, img: 'facial', popular: true, desc: 'Rose-infused cleansing, gentle exfoliation and a glow-boosting mask.' },
  { id: 'clay-facial', name: 'Hydra Clay Mask Facial', category: 'Facial', duration: 75, price: 3300, img: 'facial2', desc: 'Purifying clay and deep hydration to calm and refine the skin.' },
  { id: 'antiage-facial', name: 'Anti-Age Glow Facial', category: 'Facial', duration: 90, price: 4200, img: 'facial', desc: 'Lifting massage with peptide serums for firmer, brighter skin.' },
  { id: 'salt-scrub', name: 'Himalayan Salt Scrub', category: 'Body', duration: 60, price: 3000, img: 'close', desc: 'Mineral-rich polish that leaves skin silky and renewed.' },
  { id: 'abhyanga', name: 'Ayurvedic Abhyanga', category: 'Body', duration: 90, price: 3900, img: 'back', popular: true, desc: 'Warm herbal oil massage rooted in tradition, followed by steam.' },
  { id: 'foot-soak', name: 'Petal Foot Soak & Massage', category: 'Hands & Feet', duration: 45, price: 1600, img: 'foot', desc: 'A rose-petal soak, then reflexology to ground the whole body.' },
  { id: 'mani-pedi', name: 'Manicure & Pedicure Ritual', category: 'Hands & Feet', duration: 90, price: 2400, img: 'foot2', desc: 'Shaping, soothing and polish, finished with a hand and foot massage.' },
  { id: 'haircut', name: 'Haircut & Styling', category: 'Salon', duration: 45, price: 900, img: 'reception', desc: 'Consultation, precision cut, wash and blow-dry with a senior stylist.' },
  { id: 'hair-colour', name: 'Global Hair Colour', category: 'Salon', duration: 120, price: 3500, img: 'facial2', popular: true, desc: 'Ammonia-free colour with a gloss finish and bond-protecting care.' },
  { id: 'keratin', name: 'Keratin Smoothening', category: 'Salon', duration: 150, price: 5500, img: 'back', desc: 'Frizz-free, glossy hair that lasts for months.' },
  { id: 'bridal-makeup', name: 'Bridal Makeup', category: 'Salon', duration: 120, price: 8000, img: 'facial', desc: 'Long-wear HD makeup with a trial look and hair styling.' },
  { id: 'waxing', name: 'Waxing & Threading', category: 'Salon', duration: 45, price: 800, img: 'foot2', desc: 'Gentle, hygienic hair removal using single-use strips.' },
  { id: 'derm', name: 'Dermatology Consultation', category: 'Clinic', duration: 30, price: 800, img: 'facial2', desc: 'Skin and hair assessment with a clear treatment plan.' },
  { id: 'acne', name: 'Acne Clinical Treatment', category: 'Clinic', duration: 45, price: 2200, img: 'facial', desc: 'Medical-grade peel and extraction supervised by our doctor.' },
  { id: 'physio', name: 'Physiotherapy Session', category: 'Clinic', duration: 60, price: 1500, img: 'close', desc: 'Posture, mobility and pain relief with guided exercises.' },
  { id: 'checkup', name: 'Wellness Check-up', category: 'Clinic', duration: 45, price: 1200, img: 'reception', desc: 'Vitals, lifestyle review and personalised wellness advice.' },
  { id: 'couples', name: 'Couple’s Serenity', category: 'Packages', duration: 120, price: 9500, img: 'wide', popular: true, desc: 'Side-by-side massage, foot soak and tea in our private suite.' },
  { id: 'full-day', name: 'Full Day Reset', category: 'Packages', duration: 240, price: 12500, img: 'reception', desc: 'Massage, facial, scrub and lunch. A complete day of restoration.' },
  { id: 'bridal', name: 'Bridal Glow Prep', category: 'Packages', duration: 180, price: 10800, img: 'facial2', desc: 'Facial, body polish and hand and foot care before the big day.' },
]
export const img = (k: string) => `/img/${k}.jpg`
const moneyLocale = () => { try { const l = localStorage.getItem('velvet-lang'); return ({ en: 'en-IN', ta: 'ta-IN', hi: 'hi-IN', ml: 'ml-IN', te: 'te-IN' } as Record<string,string>)[l || 'en'] || 'en-IN' } catch { return 'en-IN' } }
export const money = (n: number) => '₹' + n.toLocaleString(moneyLocale())

export const team: { name: string; role: string; skill: string; img: string; categories: Category[] }[] = [
  { name: 'Anika', role: 'Lead aromatherapist', skill: 'Aromatherapy & hot stone', img: 'reception', categories: ['Massage', 'Body', 'Packages'] },
  { name: 'Meera', role: 'Senior therapist', skill: 'Deep tissue & Abhyanga', img: 'close', categories: ['Massage', 'Body', 'Packages'] },
  { name: 'Rohan', role: 'Sports & recovery', skill: 'Deep tissue & neck relief', img: 'wide', categories: ['Massage', 'Packages'] },
  { name: 'Dev', role: 'Skin & foot specialist', skill: 'Facials & reflexology', img: 'foot2', categories: ['Facial', 'Hands & Feet'] },
  { name: 'Isha', role: 'Senior stylist', skill: 'Colour, bridal & nails', img: 'facial2', categories: ['Salon', 'Hands & Feet', 'Facial'] },
  { name: 'Kabir', role: 'Hair stylist', skill: 'Cuts, keratin & grooming', img: 'back', categories: ['Salon'] },
  { name: 'Dr. Nisha', role: 'Dermatologist', skill: 'Skin & acne clinic', img: 'facial', categories: ['Clinic', 'Facial'] },
  { name: 'Dr. Arjun', role: 'Physiotherapist', skill: 'Pain & mobility care', img: 'foot', categories: ['Clinic'] },
]
