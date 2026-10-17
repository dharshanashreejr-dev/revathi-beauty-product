// Product photos that sit on a plain white / light-grey backdrop get "multiply" blending so the
// backdrop melts into the page. Photos with real scenery are left untouched (no colour change).
const SEL = '.product-picture img, [data-product-img] img, img[data-product-art]'

function isPlainLight(img: HTMLImageElement): boolean {
  try {
    const c = document.createElement('canvas')
    c.width = c.height = 16
    const g = c.getContext('2d', { willReadFrequently: true })
    if (!g) return false
    g.drawImage(img, 0, 0, 16, 16)
    const pts: Array<[number, number]> = [[0, 0], [15, 0], [0, 15], [15, 15], [8, 0], [8, 15], [0, 8], [15, 8]]
    return pts.every(([x, y]) => {
      const [r, gr, b, a] = g.getImageData(x, y, 1, 1).data
      if (a < 200) return false
      return Math.min(r, gr, b) >= 225 && Math.max(r, gr, b) - Math.min(r, gr, b) <= 14
    })
  } catch { return false } // cross-origin / unreadable → leave as is
}

function check(img: HTMLImageElement) {
  if (!img.matches(SEL) || !img.complete || !img.naturalWidth) return
  img.classList.toggle('bg-white-photo', isPlainLight(img))
}

function scan(root: ParentNode) { root.querySelectorAll<HTMLImageElement>(SEL).forEach(check) }

if (typeof document !== 'undefined') {
  document.addEventListener('load', e => { if (e.target instanceof HTMLImageElement) check(e.target) }, true)
  new MutationObserver(ms => ms.forEach(m => {
    m.addedNodes.forEach(n => { if (n instanceof HTMLElement) { scan(n); if (n instanceof HTMLImageElement) check(n) } })
    if (m.type === 'attributes' && m.target instanceof HTMLImageElement) check(m.target)
  })).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] })
  scan(document)
}
