import { catalogue, formatPrice } from '../products/data/products'
import { liveServices, money } from '../site/data'
import { SITE } from '../site-links'

// One search index for the whole website: products AND services.
export type SearchHit = { id: string; type: 'product' | 'service' | 'page'; title: string; sub: string; price: string; href: string; image?: string }

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// Website pages — so searching "reviews", "track order", "about" … also finds the page itself.
const PAGES: { id: string; title: string; sub: string; href: string; keys: string }[] = [
  { id: 'home', title: 'Home', sub: 'Landing page', href: SITE.home, keys: 'main start welcome revathi herbal beauty care' },
  { id: 'products', title: 'Products', sub: 'Shop all products', href: SITE.products, keys: 'shop store buy order cart serum lipstick skincare herbal' },
  { id: 'services', title: 'Services', sub: 'Salon & beauty services', href: SITE.services, keys: 'salon facial bridal makeup massage hair spa treatments menu' },
  { id: 'booking', title: 'Book appointment', sub: 'Reserve a service slot', href: SITE.booking, keys: 'booking book appointment slot reserve schedule visit' },
  { id: 'about', title: 'About', sub: 'Our story & team', href: SITE.about, keys: 'about us story team staff who we are contact location address' },
  { id: 'tracking', title: 'Tracking', sub: 'Track your order or appointment', href: SITE.tracking, keys: 'track tracking order status delivery appointment my orders customer area' },
  { id: 'reviews', title: 'Reviews', sub: 'Testimonials & ratings', href: SITE.reviews, keys: 'reviews review testimonials testimonial feedback rating ratings stars customers' },
]

export function searchSite(raw: string, limit = 8): SearchHit[] {
  const q = norm(raw.trim())
  if (!q) return []
  const words = q.split(/\s+/)
  const score = (title: string, extra: string) => {
    const t = norm(title), all = `${t} ${norm(extra)}`
    if (!words.every((w) => all.includes(w))) return 0
    return t.startsWith(q) ? 3 : t.includes(q) ? 2 : 1
  }
  const hits: (SearchHit & { s: number })[] = []
  for (const p of catalogue()) {
    if (p.archived || p.status === 'Draft') continue
    const s = score(p.name, `${p.subcategory} ${p.category} ${p.description} ${p.sku}`)
    if (s) hits.push({ s, id: p.id, type: 'product', title: p.name, sub: `${p.subcategory}`, price: formatPrice(p.price), image: /^(data:|https?:|\/)/.test(String(p.art)) ? String(p.art) : undefined, href: `${SITE.products}?q=${encodeURIComponent(p.name)}#/` })
  }
  for (const v of liveServices()) {
    const s = score(v.name, `${v.category} ${v.desc}`)
    if (s) hits.push({ s, id: v.id, type: 'service', title: v.name, sub: v.category, price: money(v.price), href: `${SITE.services}#menu` })
  }
  for (const g of PAGES) {
    const s = score(g.title, `${g.sub} ${g.keys}`)
    if (s) hits.push({ s: s + 1, id: g.id, type: 'page', title: g.title, sub: g.sub, price: '', href: g.href })
  }
  return hits.sort((a, b) => b.s - a.s).slice(0, limit)
}
