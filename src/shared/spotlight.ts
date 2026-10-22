// Sets --mx / --my on .spot cards so the CSS spotlight glow follows the cursor.
if (typeof document !== 'undefined') {
  document.addEventListener('pointermove', (e) => {
    const el = (e.target as HTMLElement | null)?.closest?.('.spot') as HTMLElement | null
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  })
}
export {}
