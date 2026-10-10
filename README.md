# The Velvet Touch Beauty Salon

One project, one `npm run dev`.

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in /dist
    npm run preview

## Pages

| URL            | What it is                                  | Source folder      |
|----------------|---------------------------------------------|--------------------|
| `/`            | Landing page (navbar links to everything)   | `src/landing`      |
| `/products/`   | Products shop, cart, checkout (VELVET TOUCH)     | `src/products`     |
| `/services`    | Services / spa menu                         | `src/site/pages/Services.tsx` |
| `/booking`     | Book an appointment                         | `src/site/pages/Booking.tsx`  |
| `/about`       | About                                       | `src/site/pages/About.tsx`    |
| `/track`       | Order and appointment tracking              | `src/site/pages/Track.tsx`    |
| `/manager`     | Manager console (PIN **1234**)              | `src/site/pages/Manager.tsx`  |
| `/admin/`      | Admin and staff panel                       | `src/admin`        |

`/services /booking /success /about /track /manager` run inside one app (`src/site`), so moving between them is instant.
The landing page, `/products/` and `/admin/` are separate pages (their styles never clash); links to them do a normal page load.

## Changing links
All page paths live in `src/site-links.ts`. If you add a route to `src/site`, also add it to
`SITE_APP_ROUTES` there, to `vite.config.ts`, `vercel.json` and `public/_redirects`.

## Demo logins
- Admin panel: `admin@maisonbloom.demo` / `Bloom@123` (staff: `staff@maisonbloom.demo` / `Staff@123`)
- Manager console: PIN `1234`

## Notes
- Data is sample data in localStorage. The landing page keeps its own bag/bookings (`velvet-*` keys); the
  services/about/track/manager pages share `VELVET TOUCH-*` keys; the admin panel uses its own mock data.
