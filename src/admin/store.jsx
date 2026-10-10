import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_APPOINTMENTS, INITIAL_CUSTOMERS, INITIAL_STAFF, USERS
} from './data/mockData.js';

const KEY = 'maison-bloom-demo-v1';
const SESSION = 'maison-bloom-session-v1';

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// Stock zero always means Out of Stock; restocking an Out of Stock product reactivates it.
export const normaliseProduct = (p) => {
  const stock = Math.max(0, Number(p.stock) || 0);
  let status = p.status;
  if (stock === 0) status = 'Out of Stock';
  else if (status === 'Out of Stock') status = 'Active';
  return { ...p, stock, status };
};

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const saved = useMemo(() => load(KEY, null), []);
  const [products, setProducts] = useState(saved?.products || INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(saved?.orders || INITIAL_ORDERS);
  const [appointments, setAppointments] = useState(saved?.appointments || INITIAL_APPOINTMENTS);
  const [customers] = useState(saved?.customers || INITIAL_CUSTOMERS);
  const [staff, setStaff] = useState(saved?.staff || INITIAL_STAFF);
  const [user, setUser] = useState(() => load(SESSION, null));
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ products, orders, appointments, customers, staff }));
    } catch { /* storage unavailable, demo still works in memory */ }
  }, [products, orders, appointments, customers, staff]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(SESSION, JSON.stringify(user));
      else localStorage.removeItem(SESSION);
    } catch { /* ignore */ }
  }, [user]);

  const notify = useCallback((message, type = 'success', vars) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type, vars }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const login = useCallback((email, password, role) => {
    const found = USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) return { ok: false, error: 'No account found with that email address.' };
    if (found.password !== password) return { ok: false, error: 'Incorrect password. Please try again.' };
    if (found.role !== role) {
      return { ok: false, error: 'This account belongs to the {role} role. Please select {role}.', vars: { role: found.role } };
    }
    const session = { name: found.name, email: found.email, role: found.role, title: found.title };
    setUser(session);
    return { ok: true, user: session };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const resetDemo = useCallback(() => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setAppointments(INITIAL_APPOINTMENTS);
    setStaff(INITIAL_STAFF);
    notify('Demo data has been reset to the original samples.', 'info');
  }, [notify]);

  const value = {
    products, setProducts, orders, setOrders, appointments, setAppointments,
    customers, staff, setStaff, user, login, logout, notify, resetDemo, toasts
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
