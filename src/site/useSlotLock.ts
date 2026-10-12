import { useEffect, useState } from 'react'
import { api } from '../api'

/** The customer's running 5-minute slot hold, refreshed every second (and instantly when another tab changes it). */
export function useSlotLock() {
  const [now, setNow] = useState(() => Date.now())
  const [lock, setLock] = useState(() => api.booking.getMyLock())
  useEffect(() => {
    const tick = () => { setNow(Date.now()); setLock(api.booking.getMyLock()) }
    tick()
    const id = setInterval(tick, 1000), off = api.booking.subscribe(tick)
    return () => { clearInterval(id); off() }
  }, [])
  const msLeft = api.booking.lockMsLeft(lock, now)
  return { lock: msLeft > 0 ? lock : null, msLeft }
}
export const mmss = (ms: number) => { const s = Math.ceil(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` }
