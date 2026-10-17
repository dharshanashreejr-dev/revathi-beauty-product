import type { Order } from '../types';
import { formatPrice } from '../data/products';
import { Steps } from './CheckoutParts';
import ProductArt from './ProductArt';
import { useLang } from '../../shared/i18n';
import { colour as colL } from '../i18n';
import { ck, ckUp, receiptLabel, inclLabel, sizeText, fmtOrderDate } from '../i18n-checkout';
import { pname } from '../i18n-names';

export default function Confirmation({ order, onShop }: { order: Order; onShop: () => void }) {
  const [lang] = useLang();
  const a = order.address;
  return (
    <section className="relative mx-auto max-w-4xl overflow-hidden px-5 py-14 text-center sm:px-8">
      {Array.from({ length: 16 }).map((_, i) => <span key={i} className="spark" style={{ left: `${6 + i * 6}%`, top: '30%', animationDelay: `${(i % 6) * 0.45}s` }} />)}
      <Steps at={3} />
      <svg viewBox="0 0 52 52" className="mx-auto h-24 w-24"><circle cx="26" cy="26" r="24" fill="none" stroke="#94a565" strokeWidth="1.5" /><path className="draw" pathLength={100} d="M15 27l8 8 14-17" fill="none" stroke="#94a565" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <h1 className="animate-rise mt-6 font-serif text-6xl sm:text-7xl">{ck('Merci,', lang)} <span className="gold-text italic">{a.name.split(' ')[0]}</span></h1>
      <p className="mt-4 text-stone-600">{receiptLabel(a.email, lang)}</p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-stone-200 text-left text-sm sm:grid-cols-4">
        {[['Order number', order.id], ['Placed on', fmtOrderDate(order.date, lang)], ['Payment', ck(order.pay, lang)], ['Arrives by', fmtOrderDate(order.eta, lang)]].map(([k, v]) => <div key={k} className="bg-paper p-5"><p className="text-xs uppercase tracking-widest text-stone-500">{ck(k, lang)}</p><p className="mt-1 font-medium">{v}</p></div>)}
      </div>

      <div className="mt-6 grid gap-6 rounded-3xl bg-night p-7 text-left text-stone-200 md:grid-cols-[1fr_260px]">
        <ul className="space-y-4">
          {order.items.map(i => (
            <li key={i.key} className="flex items-center gap-4">
              <div className="h-16 w-14 shrink-0 rounded-xl" style={{ background: `${i.colour.hex}33` }}><ProductArt art={i.product.art} colour={i.colour.hex} colourName={i.colour.name} photo={i.colour.photo} alt="" className="h-full w-full p-1" /></div>
              <div className="flex-1 text-sm"><p className="text-white">{pname(i.product.name, lang)}</p><p className="text-xs text-stone-400">{colL(i.colour.name, lang)} · {sizeText(i.size, lang)} · {ck('Qty', lang)} {i.qty}</p></div>
              <span className="text-sm">{formatPrice(i.product.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-white/10 pt-5 text-sm md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <p className="text-xs uppercase tracking-widest text-gold">{ck('Delivering to', lang)}</p>
          <p>{a.name}<br />{a.line1}{a.line2 && `, ${a.line2}`}<br />{a.city}, {a.state} {a.pin}<br />{a.phone}</p>
          <p className="gold-text pt-3 font-serif text-3xl">{formatPrice(order.total)}</p>
          <p className="text-xs text-stone-400">{inclLabel(order.shipping === 0, formatPrice(order.shipping), order.fee ? formatPrice(order.fee) : '', lang)}</p>
        </div>
      </div>
      <button onClick={onShop} className="btn-primary gold-btn mt-10 rounded-full px-10 py-4 text-sm tracking-widest">{ckUp('Continue shopping', lang)}</button>
    </section>
  );
}
