import type { CartItem } from '../types';
import Counter from '../../shared/reactbits/Counter';
import { formatPrice } from '../data/products';
import ProductArt from './ProductArt';
import { useLang, useUiLang } from '../../shared/i18n';
import { authT } from '../../shared/auth-text';
import { colour as colL } from '../i18n';
import { ck, sizeText } from '../i18n-checkout';
import { pname } from '../i18n-names';

export function Steps({ at }: { at: number }) {
  const [lang] = useLang();
  const s = ['Cart', 'Details', 'Payment', 'Confirmed'];
  return (
    <ol className="mx-auto mb-12 flex max-w-xl items-center justify-between">
      {s.map((l, i) => (
        <li key={l} className="flex flex-1 items-center last:flex-none">
          <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-700 ${i <= at ? 'gold-btn border-gold' : 'border-stone-300 text-stone-400'}`}>{i < at ? '✓' : i + 1}</span>
          <span className={`ml-2 hidden text-xs uppercase tracking-widest sm:inline ${i <= at ? 'text-ink' : 'text-stone-400'}`}>{ck(l, lang)}</span>
          {i < s.length - 1 && <span className={`mx-3 h-px flex-1 transition-all duration-700 ${i < at ? 'bg-gold' : 'bg-stone-300'}`} />}
        </li>
      ))}
    </ol>
  );
}

export function Summary({ items, subtotal, shipping, fee = 0, discount = 0, flash = 0 }: { items: CartItem[]; subtotal: number; shipping: number | null; fee?: number; discount?: number; flash?: number }) {
  const [lang] = useLang();
  const [ui] = useUiLang();
  const total = subtotal - discount - flash + (shipping ?? 0) + fee;
  return (
    <aside className="h-fit rounded-3xl bg-night p-7 text-stone-200 shadow-2xl lg:sticky lg:top-24">
      <h3 className="font-serif text-3xl text-white">{ck('Your order', lang)}</h3>
      <ul className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
        {items.map(i => (
          <li key={i.key} className="flex items-center gap-4">
            <div className="relative h-16 w-14 shrink-0 rounded-xl" style={{ background: `${i.colour.hex}33` }}>
              <ProductArt art={i.product.art} colour={i.colour.hex} colourName={i.colour.name} photo={i.colour.photo} alt="" className="h-full w-full p-1" />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] text-night">{i.qty}</span>
            </div>
            <div className="min-w-0 flex-1 text-sm"><p className="truncate text-white">{pname(i.product.name, lang)}</p><p className="text-xs text-stone-400">{colL(i.colour.name, lang)} · {sizeText(i.size, lang)}</p></div>
            <span className="text-sm">{formatPrice(i.product.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
        <div className="flex justify-between"><dt>{ck('Subtotal', lang)}</dt><dd>{formatPrice(subtotal)}</dd></div>
        {discount > 0 && <div className="flex justify-between text-emerald-300"><dt>{authT('Coupon discount', ui)}</dt><dd>−{formatPrice(discount)}</dd></div>}
        {flash > 0 && <div className="flex justify-between text-emerald-300"><dt>{authT('Quick-pay offer', ui)}</dt><dd>−{formatPrice(flash)}</dd></div>}
        <div className="flex justify-between"><dt>{ck('Shipping', lang)}</dt><dd>{shipping === null ? ck('Calculated next', lang) : shipping === 0 ? ck('Complimentary', lang) : formatPrice(shipping)}</dd></div>
        {fee > 0 && <div className="flex justify-between"><dt>{ck('Cash on delivery fee', lang)}</dt><dd>{formatPrice(fee)}</dd></div>}
        <div className="flex justify-between border-t border-white/10 pt-3 text-lg text-white"><dt>{ck('Total', lang)}</dt><dd className="font-serif text-3xl"><Counter value={total} locale="en-IN" format={{ style: 'currency', currency: 'INR', maximumFractionDigits: 0 }} fontSize="inherit" fontWeight="inherit" textColor="#ad87e9" duration={0.8} intro={false} fade={0.25} /></dd></div>
      </dl>
    </aside>
  );
}
