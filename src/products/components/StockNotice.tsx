import { useState } from 'react';
import { api } from '../../api';
import { useUiLang } from '../../shared/i18n';
import { authT } from '../../shared/auth-text';
import { requireLogin, useUser } from '../../shared/LoginModal';

// CRS 3.2 stock badges: In stock · "Running out fast! Only X items left" · Out of stock + "Notify Me via SMS".
const TONE = { in: 'text-emerald-700', low: 'font-medium text-amber-700', out: 'text-red-700' } as const;

export function StockLine({ stock }: { stock: number }) {
  const [ui] = useUiLang();
  const s = api.stock.stockState(stock);
  return <span className={TONE[s]}>{s === 'out' ? authT('Out of stock', ui) : s === 'low' ? authT('Running out fast! Only {n} items left', ui, { n: stock }) : authT('In stock', ui)}</span>;
}

export function NotifyMe({ productId, productName }: { productId: string; productName: string }) {
  const [ui] = useUiLang();
  const user = useUser();
  const [done, setDone] = useState(() => !!user && api.stock.hasRequest(productId, user.phone));
  if (done) return <p className="text-sm text-emerald-700" role="status">✓ {authT("We'll SMS you when it's back in stock.", ui)}</p>;
  // The SMS goes to the customer's login number, so login comes first.
  return (
    <button type="button" onClick={() => requireLogin(() => { const u = api.auth.currentUser(); if (u) { api.stock.requestNotify(productId, productName, u.phone); setDone(true); } })}
      className="h-11 w-full rounded-full border border-ink px-8 text-sm transition hover:bg-ink hover:text-white">🔔 {authT('Notify Me via SMS', ui)}</button>
  );
}

/** Big red cross drawn over the product photo when the product is out of stock. */
export function OutCross() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
      <g stroke="#dc2626" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity=".9">
        <line x1="14" y1="12" x2="86" y2="88" vectorEffect="non-scaling-stroke" />
        <line x1="86" y1="12" x2="14" y2="88" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

/** One red diagonal line (top-right to bottom-left) across the whole product card when it is out of stock. */
export function OutLine() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-20 h-full w-full">
      <line x1="100" y1="0" x2="0" y2="100" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity=".9" />
    </svg>
  );
}
