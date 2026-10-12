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

## CRS build progress (Revathi Herbal Beauty Care)
- Phase 0 done: shared mock data layer in `src/api/` (see `BACKEND_HANDOVER.md`).
- Phase 1 done: phone + SMS-OTP login (demo OTP shown on screen, valid 5 min, 5 tries). Login is required before checkout,
  before picking an appointment slot, and for the Tracking / profile page. Simulated SMS goes to the outbox (`rhbc:sms-outbox`).
- Customer login test: any 10-digit number starting 6-9, then use the OTP shown in the popup.
- Phase 2 done: stock badges (In stock / "Running out fast! Only X items left" / Out of stock + Notify Me via SMS), ingredients and
  how-to-use on the product page, checkout blocked for out-of-stock items, Razorpay-only payment (demo window, no COD),
  Kannada / Marathi / Bengali selectable (navbar, login, stock and payment texts translated; the rest of the page text still follows
  English / Hindi until those dictionaries are added), admin language is a separate Tamil / English toggle.
- Phase 3 (in progress): 3.0 common update done. Bookings, specialist availability, the 5-minute slot lock, Pending Review and the staff roster now
  live in `src/api/booking.ts` and `src/api/catalog.ts` (`src/site/store.ts` just re-exports them). Screens still behave as before; next steps are
  3a Parlour / Home Service on the booking page (done), 3b lock countdown (done: 5:00 timer on the time picker and the summary panel, slot cleared when it ends), 3c Pending Review screens (done), 3d bridal packages (done).
  3a: booking page has a Parlour / Home Service switch, service address form (saved address pre-filled), availability follows the mode, picking a time now
  holds the slot (`acquireLock`) and confirming uses `submitBooking`. Home Service and Bridal go to Pending Review; the success page shows "Request received".
  3c: customer Tracking page shows Pending Review / Rejected (with the team's reason) and updates live; `/manager` has a new "Booking requests"
  tab (approve with specialist choice, or reject with a reason) and the Schedule board shows pending bookings as dashed gold cells.
  3d: Services page has a Bridal packages section (from the admin-editable packages), and the booking page shows packages as selectable cards.
  Phase 3 is complete. Note: the `/manager` PIN is demo only; real approve/reject must be staff/admin-only on the server (handover row 13).
- Phase 4a (Inventory) done: admin Inventory now manages the SAME 40+ products the customer shop sells; stock lives in `api/stock.ts` (`adjustStock`),
  restocking from 0 sends the back-in-stock SMS to everyone who tapped Notify Me, dropping to the threshold sends a low-stock SMS, and the threshold
  and alert phone are admin settings. New admin page "SMS Outbox" (Admin only) shows every simulated SMS. The shop picks up stock changes on refresh.
  Still on the old sample data: admin Products, Orders, Customers, Reports (they move onto `api/` in the next Phase 4 steps).
