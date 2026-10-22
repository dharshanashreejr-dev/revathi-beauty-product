import { useCallback, useSyncExternalStore } from 'react';

const KEY = 'velvet-wishlist';
type Listener = () => void;
const listeners = new Set<Listener>();

/** Cached snapshot so useSyncExternalStore does not see a new array every call. */
let cached: string[] = [];
let cachedRaw: string | null = null;

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cached;
    cachedRaw = raw;
    if (!raw) {
      cached = [];
      return cached;
    }
    const list = JSON.parse(raw);
    cached = Array.isArray(list) ? list.filter((id) => typeof id === 'string') : [];
    return cached;
  } catch {
    cached = [];
    cachedRaw = null;
    return cached;
  }
}

const EMPTY: string[] = [];

function write(ids: string[]) {
  const next = [...new Set(ids)];
  const raw = JSON.stringify(next);
  try {
    localStorage.setItem(KEY, raw);
  } catch {}
  cachedRaw = raw;
  cached = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cachedRaw = null; // force re-read
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

/** Product ids the customer has hearted. Shared across tabs via localStorage. */
export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, read, () => EMPTY);
  const set = useCallback((next: string[] | ((prev: string[]) => string[])) => {
    const prev = read();
    const value = typeof next === 'function' ? next(prev) : next;
    write(value);
  }, []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback((id: string) => {
    set((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, [set]);
  const clear = useCallback(() => write([]), []);
  return { ids, has, toggle, clear, count: ids.length };
}

export function getWishlistIds() {
  return read();
}
