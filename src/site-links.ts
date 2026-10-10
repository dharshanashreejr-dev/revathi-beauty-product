// Single source of truth for where every page of the website lives.
// Change a path here and every navbar / button that uses it follows.
export const SITE = {
  home: '/',
  products: '/products/',
  services: '/services',
  booking: '/booking',
  about: '/about',
  tracking: '/track',
  manager: '/manager',
  admin: '/admin/',
} as const

// Pages that are served by the "site" single-page app (src/site).
// Keep this list in sync with vite.config.ts, vercel.json and public/_redirects.
export const SITE_APP_ROUTES = ['/services', '/booking', '/success', '/about', '/track', '/account', '/manager'] as const