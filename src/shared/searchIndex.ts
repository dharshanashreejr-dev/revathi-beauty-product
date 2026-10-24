import { catalogue, formatPrice } from '../products/data/products'
import { liveServices, money } from '../site/data'
import { SITE } from '../site-links'

// One search index for the whole website: products AND services.
export type SearchHit = { id: string; type: 'product' | 'service'; title: string; sub: string; price: string; href: string; image?: string }

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

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
  return hits.sort((a, b) => b.s - a.s).slice(0, limit)
}
