import type { ComponentType } from 'react'

// Plain navbar links (the old look: simple text links + underline on hover).
// `Link` is the page's own link component (router link on the app pages, plain <a> on the landing page).
type LinkLike = ComponentType<any>
export type PillItem = { key: string; label: string; href: string }

export default function SitePillNav({ items, current, Link }: { items: PillItem[]; current?: string; Link?: LinkLike; label?: string }) {
  return (
    <>
      {items.map((i) => {
        const on = i.key === current
        return Link
          ? <Link key={i.key} to={i.href} className={on ? 'is-current' : ''} aria-current={on ? 'page' : undefined}>{i.label}</Link>
          : <a key={i.key} href={i.href} className={on ? 'is-current' : ''} aria-current={on ? 'page' : undefined}>{i.label}</a>
      })}
    </>
  )
}
