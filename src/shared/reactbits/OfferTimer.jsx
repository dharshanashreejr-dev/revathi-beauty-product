'use client';

import { useEffect, useState } from 'react';
import Counter from './Counter.jsx';

/**
 * Countdown for urgency banners: "Order / book within MM:SS".
 * Resets when durationMs elapses (or pass endsAt for a fixed end time).
 */
export default function OfferTimer({
  durationMs = 15 * 60 * 1000,
  endsAt,
  label = 'Complete within',
  className = '',
  onExpire,
}) {
  const [left, setLeft] = useState(() => {
    if (endsAt) return Math.max(0, endsAt - Date.now());
    return durationMs;
  });

  useEffect(() => {
    const end = endsAt ?? Date.now() + durationMs;
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      setLeft(ms);
      if (ms <= 0) onExpire?.();
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [durationMs, endsAt, onExpire]);

  const totalSec = Math.ceil(left / 1000);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;

  return (
    <div
      className={className}
      role="timer"
      aria-live="polite"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 14px',
        borderRadius: 999,
        background: 'linear-gradient(135deg, rgba(201,162,39,0.18), rgba(94,24,240,0.12))',
        border: '1px solid rgba(201,162,39,0.35)',
        color: 'inherit',
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <span style={{ opacity: 0.85 }}>{label}</span>
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, fontVariantNumeric: 'tabular-nums' }}>
        <Counter value={mins} minDigits={2} fontSize={18} fontWeight={700} duration={0.45} intro={false} />
        <span>:</span>
        <Counter value={secs} minDigits={2} fontSize={18} fontWeight={700} duration={0.35} intro={false} />
      </span>
    </div>
  );
}
