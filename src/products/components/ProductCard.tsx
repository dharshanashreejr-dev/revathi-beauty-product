import { useState } from 'react';
import type { Colour, Product } from '../types';
import { useLang, trx } from '../../shared/i18n';
import { StockLine, OutLine } from './StockNotice';
import { badge as badgeL, colour as colL, ui, offLabel } from '../i18n';
import { discount, formatPrice } from '../data/products';
import ProductArt from './ProductArt';
import { sizeText } from '../i18n-checkout';
import { pname } from '../i18n-names';
import { api } from '../../api';

interface Props { product: Product; index: number; onOpen: (p: Product, c: Colour) => void; onQuick: (p: Product, c: Colour) => void }

const ADD_TO_CART = {
  en: 'Add to Cart',
  ta: 'கார்ட்டில் சேர்',
  hi: 'कार्ट में जोड़ें',
  ml: 'കാർട്ടിൽ ചേർക്കുക',
  te: 'కార్ట్‌కి జోడించండి',
  kn: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
  mr: 'कार्टमध्ये जोडा',
  bn: 'কার্টে যোগ করুন',
  sa: 'पेटिकायां योजयतु',
};
const SELLING_FAST = {
  en: 'Selling fast',
  ta: 'வேகமாக விற்பனை',
  hi: 'तेज़ी से बिक रहा',
  ml: 'വേഗത്തിൽ വിൽക്കുന്നു',
  te: 'వేగంగా అమ్ముడవుతోంది',
  kn: 'ವೇಗವಾಗಿ ಮಾರಾಟವಾಗುತ್ತಿದೆ',
  mr: 'वेगाने विकत आहे',
  bn: 'দ্রুত বিক্রি হচ্ছে',
  sa: 'शीघ्रं विक्रीयते',
};

/** Product card: white = normal, yellow = selling fast (low stock), red diagonal line = out of stock. */
export default function ProductCard({ product, index, onOpen, onQuick }: Props) {
  const [colour, setColour] = useState<Colour>(product.colours[0]);
  const [liked, setLiked] = useState(false);
  const [lang] = useLang();
  const out = product.stock === 0;
  const fast = !out && api.stock.stockState(product.stock) === 'low';

  const tone = out
    ? 'border-stone-200 bg-stone-50'
    : fast
      ? 'border-amber-300 bg-amber-100'
      : 'border-transparent bg-transparent';

  return (
    <article className="animate-rise" style={{ animationDelay: `${Math.min(index, 12) * 50}ms` }}>
      <div
        onClick={() => onOpen(product, colour)}
        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border p-3 transition duration-300 hover:bg-white/10 ${tone}`}
      >
        {out && <OutLine />}

        <div className={`flex h-full flex-col ${out ? 'opacity-60' : ''}`}>
          {/* image */}
          <div data-product-img className="relative aspect-square w-full overflow-hidden rounded-lg" style={{ background: 'transparent' }}>
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <ProductArt art={product.art} colour={colour.hex} colourName={colour.name} photo={colour.photo} alt={pname(product.name, lang)} className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 ${out ? 'grayscale' : ''}`} />
            </div>
            {product.badge && (
              <span className="absolute -right-1 top-3 -skew-x-12 bg-clay px-3 py-1 text-[10px] font-bold uppercase italic tracking-wider text-white shadow">
                {badgeL(product.badge, lang)}
              </span>
            )}
            {fast && (
              <span className="absolute bottom-2 left-2 rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow">
                {trx(SELLING_FAST, lang)}
              </span>
            )}
          </div>

          {/* details */}
          <div className="mt-3 flex flex-1 flex-col gap-2">
            <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] leading-snug text-ink">{pname(product.name, lang)}</h3>

            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
              {product.mrp > product.price && <span className="text-sm text-stone-400 line-through">{formatPrice(product.mrp)}</span>}
              {discount(product) > 0 && <span className="text-sm font-semibold text-emerald-700">{offLabel(discount(product), lang)}</span>}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="rounded bg-emerald-700 px-1.5 py-0.5 font-semibold text-white">{product.rating} ★</span>
              <span className="text-stone-500">({product.reviews.toLocaleString('en-IN')})</span>
            </div>

            {/* shades (if any) or size chips */}
            <div className="flex min-h-[2rem] flex-wrap items-center gap-1.5">
              {product.colours.length > 1 ? (
                <>
                  {product.colours.slice(0, 5).map(col => (
                    <button
                      key={col.name}
                      aria-label={colL(col.name, lang)}
                      title={colL(col.name, lang)}
                      onClick={e => { e.stopPropagation(); setColour(col); }}
                      className={`h-6 w-6 rounded-full border border-black/10 transition ${col.name === colour.name ? 'ring-2 ring-clay ring-offset-1' : 'hover:scale-110'}`}
                      style={{ background: col.hex }}
                    />
                  ))}
                  {product.colours.length > 5 && <span className="text-xs text-stone-500">+{product.colours.length - 5}</span>}
                </>
              ) : (
                product.sizes.slice(0, 2).map(sz => (
                  <span key={sz} className="rounded-full border border-clay/60 px-2.5 py-0.5 text-xs text-clay">{sizeText(sz, lang)}</span>
                ))
              )}
            </div>

            {(fast || out) && <div className="text-xs"><StockLine stock={product.stock} /></div>}

            {/* actions */}
            <div className="mt-auto flex items-center gap-2 pt-1">
              <button
                disabled={out}
                onClick={e => { e.stopPropagation(); if (!out) onQuick(product, colour); }}
                className={`h-11 flex-1 rounded-lg border text-sm font-semibold transition ${out ? 'cursor-not-allowed border-stone-300 text-stone-400' : 'border-clay text-clay hover:bg-clay hover:text-white'}`}
              >
                {out ? ui('unavail', lang) : trx(ADD_TO_CART, lang)}
              </button>
              <button
                aria-label={ui('wish', lang)}
                aria-pressed={liked}
                onClick={e => { e.stopPropagation(); setLiked(v => !v); }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill={liked ? '#be123c' : 'none'} stroke={liked ? '#be123c' : '#707e5b'} strokeWidth={1.6}>
                  <path d="M12 21s-7.5-4.6-9.3-9.2C1.5 8.5 3.4 5 6.9 5c2 0 3.5 1.1 5.1 3 1.6-1.9 3.1-3 5.1-3 3.5 0 5.4 3.5 4.2 6.8C19.5 16.4 12 21 12 21z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
