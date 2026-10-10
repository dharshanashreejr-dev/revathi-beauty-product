import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Pages served by the "site" single-page app (src/site). Keep in sync with src/site-links.ts.
const SITE_APP_ROUTES = ['/services', '/booking', '/success', '/about', '/track', '/account', '/manager']
// Pages that live in their own folder (products/index.html, admin/index.html).
const FOLDER_PAGES = ['/products', '/admin']

function velvetRoutes(): Plugin {
  const handler = (req: { url?: string }, res: { statusCode: number; setHeader: (k: string, v: string) => void; end: () => void }, next: () => void) => {
    const [path, query] = (req.url ?? '/').split('?')
    const clean = path.replace(/\/+$/, '') || '/'
    const q = query ? `?${query}` : ''
    if (FOLDER_PAGES.includes(clean) && !path.endsWith('/')) {
      res.statusCode = 302
      res.setHeader('Location', `${clean}/${q}`)
      return res.end()
    }
    if (SITE_APP_ROUTES.includes(clean)) req.url = `/site/index.html${q}`
    next()
  }
  return {
    name: 'velvet-touch-routes',
    configureServer: (server) => { server.middlewares.use(handler as never) },
    configurePreviewServer: (server) => { server.middlewares.use(handler as never) },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), velvetRoutes()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products/index.html'),
        site: resolve(__dirname, 'site/index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
})
