// Who may review what: only after the product was DELIVERED or the service was COMPLETED.
// BACKEND: GET /api/reviews/eligibility?kind=&targetId= (checks the customer's delivered orders / completed bookings).
import { getMyOrders, getAppts, ORDER_LAST } from './account'
import { services } from './data'
import { api } from '../api'

export type ReviewAccess = 'ok' | 'login' | 'notyet'

export function reviewAccess(kind: 'product' | 'service', targetId: string, targetName: string): ReviewAccess {
  if (!api.auth.currentUser()) return 'login'
  if (kind === 'product') return getMyOrders().some((o) => !o.cancelled && o.stage >= ORDER_LAST && o.items.some((i) => i.pid === targetId)) ? 'ok' : 'notyet'
  const svc = services.find((s) => s.id === targetId)
  return getAppts().some((a) => a.status === 'Completed' && (a.service === targetName || (svc && a.service === svc.name))) ? 'ok' : 'notyet'
}
