import { createRoot } from 'react-dom/client'
import { useEffect, useRef } from 'react'
import ClickSpark from './reactbits/ClickSpark'

// React Bits ClickSpark: a small spark burst on every button / link-button click, site-wide.
// One transparent fixed layer; the document listens for clicks on buttons and fires a burst at the pointer.
const BTN = 'button, [role="button"], a.btn-primary, a.gold-btn, a[class*="rounded-full"], .btn-primary, .gold-btn, .bag-button, .icon-button, .nav-admin, .vt-admin, .vt-bag'

function Sparks() {
  const ref = useRef<{ spark: (x?: number, y?: number) => void } | null>(null)
  useEffect(() => {
    const on = (e: PointerEvent) => {
      if (e.button !== 0) return
      const el = (e.target as Element | null)?.closest?.(BTN) as HTMLButtonElement | null
      if (!el || el.disabled || el.closest('.folder-root,.pixel-card,.stepper__footer')) return
      ref.current?.spark(e.clientX, e.clientY)
    }
    document.addEventListener('pointerdown', on, true)
    return () => document.removeEventListener('pointerdown', on, true)
  }, [])
  return (
    <ClickSpark ref={ref} sparkColor={['#ad87e9', '#f5f2fd', '#c9a24a']} shape="star" sparkCount={9} sparkSize={12} sparkRadius={34} duration={650} randomness={0.35} glow={0.4}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2147483600 }} />
  )
}

export function mountButtonSparks() {
  if (document.getElementById('rb-sparks')) return
  const host = document.createElement('div')
  host.id = 'rb-sparks'
  document.body.appendChild(host)
  createRoot(host).render(<Sparks />)
}
