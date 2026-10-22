import type { CartItem } from '../types';
import Counter from '../../shared/reactbits/Counter';
import { formatPrice } from '../data/products';
import { FREE_SHIP, subtotalOf } from '../lib';
import ProductArt from './ProductArt';
import { useLang, useUiLang } from '../../shared/i18n';
import { authT } from '../../shared/auth-text';
import { colour as colL } from '../i18n';
import { ck, ckUp, addMoreLabel, sizeText } from '../i18n-checkout';
import { pname } from '../i18n-names';

interface Props { open: boolean; items: CartItem[]; onClose: () => void; onQty: (k: string, d: number) => void; onRemove: (k: string) => void; onCheckout: () => void }

export default function CartDrawer({ open, items, onClose, onQty, onRemove, onCheckout }: Props) {
  const [lang] = useLang();
  const [ui] = useUiLang();
  if (!open) return null;
  const blocked = items.some(i => i.product.stock === 0);
  const sub = subtotalOf(items);
  const left = Math.max(0, FREE_SHIP - sub);
  return (
    <div className="fixed inset-0 z-50 animate-fade bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <aside onClick={e => e.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide flex-col bg-sand shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 p-6">
          <h2 className="font-serif text-3xl">{ck('Your cart', lang)}</h2>
          <button onClick={onClose} aria-label={ck('Close cart', lang)} className="text-2xl">×</button>
        </div>
        {items.length === 0 ? (
          <p className="m-auto font-serif text-2xl italic text-stone-500">{ck('Your cart is empty', lang)}</p>
        ) : (
          <>
            <div className="px-6 pt-5 text-sm">
              <p className="text-stone-600">{left === 0 ? ck('You have unlocked complimentary shipping', lang) : addMoreLabel(formatPrice(left), lang)}</p>
              <div className="mt-2 h-1 rounded-full bg-stone-200"><div className="h-full rounded-full bg-gold transition-all duration-700" style={{ width: `${Math.min(100, (sub / FREE_SHIP) * 100)}%` }} /></div>
            </div>
            <ul className="flex-1 space-y-5 overflow-y-auto p-6">
              {items.map(i => (
                <li key={i.key} className="flex gap-4 animate-rise">
                  <div className="h-24 w-20 shrink-0 rounded-2xl" style={{ background: `${i.colour.hex}33` }}><ProductArt art={i.product.art} colour={i.colour.hex} colourName={i.colour.name} photo={i.colour.photo} alt="" className="h-full w-full p-1" /></div>
                  <div className="flex-1 text-sm">
                    <p className="font-serif text-xl leading-tight">{pname(i.product.name, lang)}</p>
                    <p className="text-stone-500">{colL(i.colour.name, lang)} · {sizeText(i.size, lang)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-stone-300 bg-paper">
                        <button onClick={() => onQty(i.key, -1)} className="h-8 w-8" aria-label={ck('Decrease', lang)}>−</button><span className="w-6 text-center">{i.qty}</span><button onClick={() => onQty(i.key, 1)} className="h-8 w-8" aria-label={ck('Increase', lang)}>+</button>
                      </div>
                      <span>{formatPrice(i.product.price * i.qty)}</span>
                    </div>
                    <button onClick={() => onRemove(i.key)} className="mt-1 text-xs text-stone-500 underline">{ck('Remove', lang)}</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-stone-200 p-6">
              <div className="flex justify-between text-lg"><span>{ck('Subtotal', lang)}</span><span className="font-medium"><Counter value={sub} locale="en-IN" format={{ style: 'currency', currency: 'INR', maximumFractionDigits: 0 }} fontSize="inherit" fontWeight="inherit" textColor="inherit" duration={0.8} intro={false} fade={0.25} /></span></div>
              {blocked && <p className="text-sm text-red-700" role="alert">{authT('Remove out-of-stock items to continue', ui)}</p>}
              <button onClick={onCheckout} disabled={blocked} className="btn-primary gold-btn w-full rounded-full py-4 text-sm tracking-widest disabled:cursor-not-allowed disabled:opacity-50">{ckUp('Proceed to checkout', lang)}</button>
              <button onClick={onClose} className="w-full text-sm text-stone-600 underline">{ck('Continue shopping', lang)}</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
