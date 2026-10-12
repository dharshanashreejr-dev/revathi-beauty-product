# Backend handover list (CRS DS-022R-01)

The UI is built first with mock data (localStorage) behind `src/api/`. When the UI is finalised, each item below
replaces a mock function with a real API call. Marked `BACKEND:` in the code.

| # | Needs backend | Mock today | Phase |
|---|---------------|-----------|-------|
| 1 | SMS via TRAI DLT gateway (sender ID + 9 registered templates) | `api/sms.ts` writes to an outbox | 1 |
| 2 | OTP generate / 5-min expiry / attempt limit / verify (server side) | `api/auth.ts` (demo OTP shown on screen) | 1 |
| 3 | JWT sessions + RBAC on every endpoint | session in localStorage | 1 |
| 4 | MySQL: users, addresses | `rhbc:users` | 1 |
| 5 | Razorpay: create order on server, verify signature, webhook to confirm order, receipt | `RazorpaySheet.tsx` (demo window, no real payment) | 2 |
| 6 | Order-success SMS after verified payment (not after the browser says "paid") | `Payment.tsx` calls `api.sms` | 2 |
| 7 | "Notify Me via SMS" requests table + job that sends the back-in-stock SMS when stock goes 0 to above 0 | `api/stock.ts` (`fulfil()` is ready, called from admin in Phase 4) | 2 |
| 8 | Low-stock threshold and alert phone as admin settings (settings table) | `api/stock.ts` `getSettings()` (admin Inventory screen edits it) | 2, 4 |
| 9 | Product catalogue in MySQL (MRP, discount type, effective price, ingredients, how-to-use, images) | static `products/data/products.ts` + sample `product-info.ts` | 2 |
| 10 | Admin pages must also enforce RBAC on the server (Tamil/English toggle is UI only) | `admin/i18n.js` | 2 |
| 11 | Bookings + blocked slots in MySQL (mode parlour/home, home address, status, review note) | `api/booking.ts` (`rhbc:bookings`, `rhbc:blocked`) | 3 |
| 12 | Slot lock: Redis key per specialist + time, 300 s TTL (`SET NX EX 300`), checked again when the booking is saved | `acquireLock()` / `releaseLock()` in `api/booking.ts` (`rhbc:slot-locks`) | 3 |
| 13 | Pending Review rule (Home Service, Bridal Makeup) + approve / reject endpoints, staff and admin only (RBAC) | `needsReview()`, `approveBooking()`, `rejectBooking()` | 3 |
| 14 | Appointment SMS: confirmation after approval, 24-hour reminder job (2-hour reminder has no DLT template, so it is not an SMS) | `submitBooking()`, `processDue()` | 3 |
| 15 | Staff roster and home-service flags in MySQL (admin edits in Phase 4) | `api/catalog.ts` | 3 |
| 16 | Inventory table + stock movement history; one transaction per stock change that also queues the back-in-stock and low-stock SMS jobs; the shop reads stock from the API | `api/stock.ts` `adjustStock()`, `rhbc:stock` | 4 |
| 17 | SMS log with delivery status per message (admin SMS Outbox screen reads it, Admin only) | `api/sms.ts` outbox | 4 |

More rows are added as each phase is built (products, orders, bookings, Redis slot lock, Razorpay + webhooks,
reminders / low-stock jobs, invoices, audit log, image upload, TLS 1.3).

Needed from the client: Razorpay keys, DLT-registered entity and gateway account.
