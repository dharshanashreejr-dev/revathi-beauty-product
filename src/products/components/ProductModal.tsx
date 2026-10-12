import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Colour, Product } from '../types';
import { StockLine, NotifyMe, OutCross } from './StockNotice';
import { productInfo } from '../data/product-info';
import { authT } from '../../shared/auth-text';
import { useUiLang } from '../../shared/i18n';
import { discount, formatPrice, stockStatus } from '../data/products';
import ProductArt from './ProductArt';
import { useLang, tr } from '../../shared/i18n';
import { ptext } from '../i18n-text';
import { sizeText } from '../i18n-checkout';
import { CAT_NAME, sub as subL, colour as colL, ui, mt, viewLabel, stockLabel, offLabel } from '../i18n';
import { pname } from '../i18n-names';
import ReviewsSection from '../../shared/ReviewsSection';

interface Props {
  product: Product;
  initialColour: Colour;
  onClose: () => void;
  onAdd: (c: Colour, s: string, q: number) => void;
}

type View = 'live' | 'front' | 'left' | 'right';
const ANGLES: Record<Exclude<View, 'live'>, number> = { front: 0, left: -38, right: 38 };
const LAYERS = 9;

export default function ProductModal({ product, initialColour, onClose, onAdd }: Props) {
  const [lang] = useLang();
  const [colour, setColour] = useState(initialColour);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState<View>('live');
  const [rot, setRot] = useState({ x: 0, y: -18 });
    const status = stockStatus(product.stock);
  const out = product.stock === 0;
  const [ui] = useUiLang();
  const info = productInfo(product.subcategory);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [onClose]);

  const track = (e: MouseEvent<HTMLDivElement>) => {
    if (view !== 'live') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    setRot({ y: (x - 0.5) * 80, x: -(y - 0.5) * 22 });
  };

  const angleY = view === 'live' ? rot.y : ANGLES[view];
  const angleX = view === 'live' ? rot.x : 0;
  const stockPct = Math.min(100, (product.stock / 100) * 100);

  const add = () => {
    onAdd(colour, size, qty);
  };

  const specs: [string, string][] = [
    [mt('m_pid', lang), product.id],
    [mt('m_sku', lang), product.sku],
    [mt('m_cat', lang), tr(CAT_NAME[product.category], lang)],
    [mt('m_sub', lang), subL(product.subcategory, lang)],
    [mt('m_mat', lang), ptext(product.material, lang)],
    [mt('m_wt', lang), product.weight],
    [mt('m_col', lang), colL(colour.name, lang)],
    [mt('m_size', lang), size],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-0 backdrop-blur-sm animate-fade sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={pname(product.name, lang)}>
      <div className="relative my-auto w-full max-w-6xl animate-pop overflow-hidden bg-sand sm:rounded-[2rem] ring-1 ring-gold/30" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label={mt('m_close', lang)} className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl shadow transition hover:bg-white">×</button>

        <div className="grid md:grid-cols-2">
          {/* 3D viewer */}
          <div className="p-4 sm:p-6">
            <div
              onMouseMove={track}
              onMouseLeave={() => view === 'live' && setRot({ x: 0, y: -18 })}
              className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-3xl sm:h-[500px]"
              style={{ background: `radial-gradient(circle at 50% 40%, ${colour.hex}55, ${colour.hex}12 70%)`, perspective: 1200, transition: 'background .5s' }}
            >
              <div className="animate-float"><div className="absolute left-1/2 top-[92%] h-6 w-56 -translate-x-1/2 rounded-full bg-black/25 blur-xl" />
                <div className="preserve-3d relative h-[360px] w-[280px] sm:h-[440px] sm:w-[340px]" style={{ transform: `rotateX(${angleX}deg) rotateY(${angleY}deg)`, transition: 'transform .45s cubic-bezier(.2,.7,.2,1)' }}>
                  {Array.from({ length: LAYERS }).map((_, i) => (
                    <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateZ(${(i - (LAYERS - 1) / 2) * 5}px)`, filter: i === LAYERS - 1 ? 'none' : `brightness(${0.7 + i * 0.02})` }}>
                      <ProductArt art={product.art} colour={colour.hex} colourName={colour.name} photo={colour.photo} alt={i === LAYERS - 1 ? pname(product.name, lang) : ''} className={`h-full w-full ${out ? 'opacity-60 grayscale' : ''}`} />
                    </div>
                  ))}
                </div>
              </div>
              {out && <div className="pointer-events-none absolute inset-0 z-10"><OutCross /></div>}
              <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs backdrop-blur">
                {viewLabel(view, lang)}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {(['live', 'front', 'left', 'right'] as View[]).map(v => (
                <button key={v} onClick={() => setView(v)} aria-pressed={view === v} aria-label={viewLabel(v, lang)}
                  className={`flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white transition ${view === v ? 'ring-2 ring-ink' : 'opacity-70 hover:opacity-100'}`}
                  style={{ perspective: 400 }}>
                  <div className="h-4/5 w-4/5" style={{ transform: `rotateY(${v === 'live' ? -18 : ANGLES[v]}deg)` }}>
                    <ProductArt art={product.art} colour={colour.hex} colourName={colour.name} photo={colour.photo} alt="" className="h-full w-full" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 p-6 pt-2 sm:p-10 md:pl-4">
            <div className="space-y-2">
              <p className="text-sm text-stone-500">{tr(CAT_NAME[product.category], lang)} › {subL(product.subcategory, lang)}</p>
              <h2 className={`font-serif font-medium leading-tight ${lang === 'en' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}>{pname(product.name, lang)}</h2>
              <p className="text-sm text-stone-500">★ {product.rating} · {product.reviews} {mt('m_reviews', lang)} · {product.id}</p>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-medium">{formatPrice(product.price)}</span>
              <span className="text-stone-400 line-through">{formatPrice(product.mrp)}</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">{mt('m_save', lang)} {discount(product)}%</span>
            </div>

            <div>
              <p className="mb-2 text-sm">{mt('m_col', lang)}: <span className="text-stone-500">{colL(colour.name, lang)}</span></p>
              <div className="flex gap-3" role="radiogroup" aria-label={mt('m_col', lang)}>
                {product.colours.map(col => (
                  <button key={col.name} role="radio" aria-checked={col.name === colour.name} aria-label={colL(col.name, lang)} title={colL(col.name, lang)} onClick={() => setColour(col)}
                    className="flex flex-col items-center gap-1">
                    <span className={`block h-9 w-9 rounded-full border border-black/10 transition ${col.name === colour.name ? 'ring-2 ring-ink ring-offset-2 ring-offset-sand' : 'hover:scale-110'}`} style={{ background: col.hex }} />
                    {col.code && <span className={`text-xs ${col.name === colour.name ? 'font-semibold text-ink' : 'text-stone-500'}`}>{col.code}</span>}
                  </button>
                ))}
              </div>
            </div>

            <p className="max-w-prose leading-relaxed text-stone-700">{ptext(product.description, lang)}</p>

            <div className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-5 text-sm sm:grid-cols-2">
              <div><p className="mb-2 font-medium">{authT('Key ingredients', ui)}</p><div className="flex flex-wrap gap-2">{info.ingredients.map(x => <span key={x} className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">{x}</span>)}</div></div>
              <div><p className="mb-2 font-medium">{authT('How to use', ui)}</p><p className="leading-relaxed text-stone-600">{info.how}</p></div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <StockLine stock={product.stock} />
                {!out && <span className="text-stone-500">{product.stock} {mt('m_units', lang)}</span>}
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
                <div className={`h-full rounded-full transition-all duration-700 ${status.bar}`} style={{ width: `${stockPct}%` }} />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm">{mt('m_size', lang)}: <span className="text-stone-500">{sizeText(size, lang)}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} aria-pressed={s === size}
                    className={`rounded-full border px-5 py-2 text-sm transition ${s === size ? 'border-ink bg-ink text-white' : 'border-stone-300 bg-white hover:border-ink'}`}>{sizeText(s, lang)}</button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-stone-300 bg-white">
                <button aria-label={mt('m_dec', lang)} onClick={() => setQty(q => Math.max(1, q - 1))} className="h-11 w-11 text-lg">−</button>
                <span className="w-8 text-center">{qty}</span>
                <button aria-label={mt('m_inc', lang)} onClick={() => setQty(q => Math.min(Math.max(product.stock, 1), q + 1))} className="h-11 w-11 text-lg">+</button>
              </div>
              {out ? <NotifyMe productId={product.id} productName={pname(product.name, 'en')} /> : <button disabled={out} onClick={add}
                className="btn-primary h-11 flex-1 rounded-full bg-ink px-8 text-sm text-white disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500">
                {`${mt('m_add', lang)} · ${formatPrice(product.price * qty)}`}
              </button>}
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-stone-200 text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="bg-white p-3">
                  <p className="text-xs text-stone-500">{k}</p>
                  <p className="font-medium">{v}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-2 text-sm text-stone-700">
              {product.details.map(d => (
                <li key={d} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />{ptext(d, lang)}</li>
              ))}
            </ul>

            <ReviewsSection kind="product" targetId={product.id} targetName={pname(product.name, 'en')} />
          </div>
        </div>
      </div>
    </div>
  );
}
