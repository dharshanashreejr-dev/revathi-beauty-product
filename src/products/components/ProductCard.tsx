import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Colour, Product } from '../types';
import { useLang } from '../../shared/i18n';
import { StockLine, OutCross } from './StockNotice';
import { sub as subL, badge as badgeL, colour as colL, ui, sizesLabel, offLabel, stockLabel } from '../i18n';
import { discount, formatPrice, stockStatus } from '../data/products';
import ProductArt from './ProductArt';
import { sizeText } from '../i18n-checkout';
import { pname } from '../i18n-names';

interface Props { product: Product; index: number; onOpen: (p: Product, c: Colour) => void; onQuick: (p: Product, c: Colour) => void }

export default function ProductCard({ product, index, onOpen, onQuick }: Props) {
  const [colour, setColour] = useState<Colour>(product.colours[0]);
  const [liked, setLiked] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const [lang] = useLang();
  const status = stockStatus(product.stock);
  const out = product.stock === 0;

  const move = (e: MouseEvent) => {
    const el = tilt.current, g = glare.current;
    if (!el || !g) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 14}deg) rotateX(${-(y - 0.5) * 14}deg) scale3d(1.02,1.02,1.02)`;
    g.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.6), transparent 55%)`;
    g.style.opacity = '1';
  };
  const leave = () => {
    if (tilt.current) tilt.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    if (glare.current) glare.current.style.opacity = '0';
  };

  return (
    <article className="animate-rise" style={{ animationDelay: `${index * 70}ms` }}>
      <div
        ref={tilt}
        onMouseMove={move}
        onMouseLeave={leave}
        onClick={() => onOpen(product, colour)}
        className="group preserve-3d flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_30px_-12px_rgba(60,40,20,.25)] transition-transform duration-300 ease-out"
      >
        <div className="preserve-3d relative h-[310px] shrink-0 overflow-hidden sm:h-[320px]" style={{ background: `linear-gradient(160deg, ${colour.hex}33, ${colour.hex}0d 70%)`, transition: 'background .5s' }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(60px)' }}>
            <ProductArt art={product.art} colour={colour.hex} colourName={colour.name} photo={colour.photo} alt={pname(product.name, lang)} className={`h-[250px] w-[78%] object-contain drop-shadow-xl transition-all duration-500 ${out ? 'opacity-50 grayscale' : ''}`} />
          </div>
          {out && <div className="pointer-events-none absolute inset-0" style={{ transform: 'translateZ(70px)' }}><OutCross /></div>}
          <div ref={glare} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300" />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs text-white" style={{ transform: 'translateZ(40px)' }}>
              {badgeL(product.badge, lang)}
            </span>
          )}
          <button
            aria-label={ui('wish', lang)}
            aria-pressed={liked}
            onClick={e => { e.stopPropagation(); setLiked(v => !v); }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition hover:bg-white"
            style={{ transform: 'translateZ(40px)' }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill={liked ? '#be123c' : 'none'} stroke={liked ? '#be123c' : '#1c1917'} strokeWidth={1.8}>
              <path d="M12 21s-7.5-4.6-9.3-9.2C1.5 8.5 3.4 5 6.9 5c2 0 3.5 1.1 5.1 3 1.6-1.9 3.1-3 5.1-3 3.5 0 5.4 3.500 4.2 6.800C19.500 16.400 12 21 12 21z" />
            </svg>
          </button>
          {!out && <button onClick={e => { e.stopPropagation(); onQuick(product, colour); }} className="gold-btn absolute inset-x-5 bottom-5 translate-y-4 rounded-full py-3 text-sm opacity-0 shadow-lg transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{ui('quick', lang)}</button>}
          {out && <div className="absolute inset-x-0 bottom-4 text-center text-sm font-medium text-stone-700">{ui('unavail', lang)}</div>}
        </div>

        <div className="flex min-h-[245px] flex-1 flex-col space-y-3 p-5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>{subL(product.subcategory, lang)}</span>
            <span>{product.id}</span>
          </div>
          <h3 className={`line-clamp-2 min-h-[3.5rem] font-serif font-medium leading-snug ${lang === 'en' ? 'text-2xl' : 'text-xl'}`}>{pname(product.name, lang)}</h3>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-medium">{formatPrice(product.price)}</span>
            <span className="text-sm text-stone-400 line-through">{formatPrice(product.mrp)}</span>
            <span className="text-sm text-emerald-700">{offLabel(discount(product), lang)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2" role="radiogroup" aria-label={ui('colour', lang)}>
              {product.colours.map(col => (
                <button
                  key={col.name}
                  role="radio"
                  aria-checked={col.name === colour.name}
                  aria-label={colL(col.name, lang)}
                  title={colL(col.name, lang)}
                  onClick={e => { e.stopPropagation(); setColour(col); }}
                  className={`flex flex-col items-center gap-1 ${col.code ? 'pb-0.5' : ''}`}
                >
                  <span className={`block h-6 w-6 rounded-full border border-black/10 transition ${col.name === colour.name ? 'ring-2 ring-ink ring-offset-2' : 'hover:scale-110'}`} style={{ background: col.hex }} />
                  {col.code && <span className={`text-[10px] leading-none ${col.name === colour.name ? 'font-semibold text-ink' : 'text-stone-500'}`}>{col.code}</span>}
                </button>
              ))}
            </div>
            <span className="text-sm text-stone-500">★ {product.rating} ({product.reviews})</span>
          </div>
          {colour.code && <p className="-mt-1 text-xs text-stone-600">{colL(colour.name, lang)} <span className="text-stone-400">· {product.colours.length} shades</span></p>}

          <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-sm">
            <StockLine stock={product.stock} />
            <span className="text-stone-500">{product.sizes.length > 1 ? sizesLabel(product.sizes.length, lang) : sizeText(product.sizes[0], lang)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
