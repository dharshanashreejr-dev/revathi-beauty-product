import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import { SITE, SITE_APP_ROUTES } from '../site-links'

const pathOf = (to: string) => to.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
export const isInsideApp = (to: string) =>
  (SITE_APP_ROUTES as readonly string[]).includes(pathOf(to))

export const hrefFor = (to: string) => {
  const p = pathOf(to)
  if (p === '/products') return to.replace('/products', SITE.products)
  if (p === '/admin') return to.replace('/admin', SITE.admin)
  return to
}

export function Link({
  to,
  replace,
  state,
  reloadDocument,
  preventScrollReset,
  relative,
  ...rest
}: LinkProps) {
  if (typeof to === 'string' && !isInsideApp(to)) {
    return <a href={hrefFor(to)} {...rest} />
  }
  return (
    <RouterLink
      to={to}
      replace={replace}
      state={state}
      reloadDocument={reloadDocument}
      preventScrollReset={preventScrollReset}
      relative={relative}
      {...rest}
    />
  )
}