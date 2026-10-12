import { useState } from 'react';
import type { Address, CartItem, Order } from '../types';
import { shipFee, subtotalOf } from '../lib';
import { formatPrice } from '../data/products';
import { Steps, Summary } from './CheckoutParts';
import RazorpaySheet from './RazorpaySheet';
import { useLang, useUiLang } from '../../shared/i18n';
import { authT } from '../../shared/auth-text';
import { ck, ck2, shipToLabel } from '../i18n-checkout';
import { api } from '../../api';

// Product orders are paid ONLINE through Razorpay only (CRS 3.2 / 4.6). Pay on Delivery does not exist.
export default function Payment({ items, address, onBack, onPlace }: { items: CartItem[]; address: Address; onBack: () => void; onPlace: (o: Order) => void }) {
  const [lang] = useLang();
  const [ui] = useUiLang();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const sub = subtotalOf(items), ship = shipFee(sub, address.method);
  // Festival / coupon code (CRS 4.3). BACKEND: the server re-checks the code and the discount when it creates the order.
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<{ code: string; discount: number } | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const discount = applied?.discount ?? 0;
  const total = sub - discount + ship;
  const REASON: Record<string, string> = { empty: 'Enter a coupon code.', invalid: 'Invalid coupon code.', inactive: 'Invalid coupon code.', early: 'This coupon is not active yet.', expired: 'This coupon has expired.', scope: 'This coupon does not apply to product orders.', 'used-up': 'This coupon has been fully used.' };
  const apply = () => {
    const r = api.offers.validateCoupon(code, sub, 'products');
    if (r.ok) { setApplied({ code: r.code, discount: r.discount }); setNote({ ok: true, text: authT('Coupon {code} applied. You save {amount}.', ui, { code: r.code, amount: formatPrice(r.discount) }) }); }
    else { setApplied(null); setNote({ ok: false, text: r.reason === 'min' ? authT('Add items worth {amount} more to use this coupon.', ui, { amount: formatPrice((r.min ?? 0) - sub) }) : authT(REASON[r.reason] ?? 'Invalid coupon code.', ui) }); }
  };
  const clear = () => { setApplied(null); setNote(null); setCode(''); };

  const done = (method: string, paymentId: string) => {
    setOpen(false); setBusy(true);
    const eta = new Date(Date.now() + (address.method === 'express' ? 2 : 6) * 864e5);
    const id = `RHB${Math.floor(10000000 + Math.random() * 89999999)}`;
    // Order-success SMS (DLT template: order id, total, tracking link).
    if (applied) api.offers.redeemCoupon(applied.code);
    api.sms.sendSms('orderSuccess', address.phone, [id, total, `${location.origin}/track?tab=orders&id=${id}`]);
    setTimeout(() => onPlace({ id, items, address, pay: `Razorpay · ${method}`, subtotal: sub, shipping: ship, fee: 0, discount, coupon: applied?.code, total, date: new Date().toISOString(), eta: eta.toISOString() }), 900);
    void paymentId; // BACKEND: stored with the order and verified against Razorpay
  };

  return (
    <section className="mx-auto max-w-6xl animate-rise px-5 py-14 sm:px-8">
      <Steps at={2} />
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="font-serif text-5xl">{ck2('Payment|mode', lang)[0]} <span className="gold-text italic">{ck2('Payment|mode', lang)[1]}</span></h1>
          <p className="mt-2 text-sm text-stone-500">{shipToLabel(address.name, address.city, address.pin, lang)}</p>
          <div className="mt-8 rounded-2xl border border-gold bg-white p-6 shadow-lg">
            <p className="font-medium">Razorpay</p>
            <p className="mt-1 text-sm text-stone-500">UPI · {ck('Credit / Debit card', lang)} · {ck('Net banking', lang)} · Wallets</p>
            <p className="mt-4 text-sm text-stone-600">{authT('Online payment only. Cash on delivery is not available for product orders.', ui)}</p>
          </div>
          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5">
            <label className="text-xs uppercase tracking-widest text-stone-500" htmlFor="coupon">{authT('Coupon code', ui)}</label>
            <div className="mt-2 flex gap-3">
              <input id="coupon" className="field flex-1 uppercase" value={code} disabled={!!applied} maxLength={15} onChange={e => { setCode(e.target.value.toUpperCase()); setNote(null); }} onKeyDown={e => e.key === 'Enter' && !applied && apply()} placeholder="WELCOME10" />
              {applied
                ? <button type="button" onClick={clear} className="rounded-full border border-ink px-6 text-sm transition hover:bg-ink hover:text-white">{authT('Remove coupon', ui)}</button>
                : <button type="button" onClick={apply} className="gold-btn rounded-full px-6 text-sm">{authT('Apply', ui)}</button>}
            </div>
            {note && <p className={`mt-2 text-sm ${note.ok ? 'text-emerald-700' : 'text-rose-700'}`} role={note.ok ? 'status' : 'alert'}>{note.text}</p>}
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button onClick={onBack} className="text-sm underline">{ck('← Back to details', lang)}</button>
            <button onClick={() => setOpen(true)} disabled={busy} className="btn-primary gold-btn rounded-full px-10 py-4 text-sm tracking-widest disabled:opacity-60">{authT('Pay securely with Razorpay', ui).toUpperCase()} · {formatPrice(total)}</button>
          </div>
        </div>
        <Summary items={items} subtotal={sub} shipping={ship} discount={discount} />
      </div>
      {open && <RazorpaySheet amount={total} onClose={() => setOpen(false)} onSuccess={done} />}
      {busy && (
        <div className="fixed inset-0 z-[80] flex animate-fade flex-col items-center justify-center bg-night/95 text-white">
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          <p className="mt-8 font-serif text-3xl italic">{ck('Securing your order…', lang)}</p>
        </div>
      )}
    </section>
  );
}
