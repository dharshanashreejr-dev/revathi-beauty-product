import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api';
import type { CategoryKey, Colour, Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

interface Props {
  category: CategoryKey;
  onCategory: (c: CategoryKey) => void;
  onOpen: (p: Product, c: Colour) => void;
  onQuick: (p: Product, c: Colour) => void;
}

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock';

import { useLang, tr } from '../../shared/i18n';
import { CAT_NAME, sub as subL, ui } from '../i18n';
import { pname } from '../i18n-names';

export default function ProductsSection({ category, onCategory, onOpen, onQuick }: Props) {
  const [sub, setSub] = useState('All');
  const [sort, setSort] = useState<Sort>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [query, setQuery] = useState('');
  const [stockTick, setStockTick] = useState(0);
  useEffect(() => { const bump = () => setStockTick(n => n + 1); const a = api.stock.subscribe(bump), b = api.catalogue.subscribe(bump); return () => { a(); b(); }; }, []);

  const [lang] = useLang();
  const meta = CATEGORIES.find(c => c.name === category)!;
  const all = PRODUCTS[category].filter(p => !p.archived && p.status !== 'Draft');

  // `all` is rebuilt on every render, so key the memo on its content (archive / draft changes included).
  const allKey = all.map(p => p.id + p.price + p.name).join('|');
  const list = useMemo(() => {
    let l = all.filter(p => (sub === 'All' || p.subcategory === sub) && (!inStockOnly || p.stock > 0));
    const q = query.trim().toLowerCase();
    if (q) l = l.filter(p => `${p.name} ${pname(p.name, lang)} ${p.id} ${p.sku} ${p.subcategory} ${subL(p.subcategory, lang)}`.toLowerCase().includes(q));
    const s = [...l];
    if (sort === 'price-asc') s.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') s.sort((a, b) => b.price - a.price);
    if (sort === 'rating') s.sort((a, b) => b.rating - a.rating);
    if (sort === 'stock') s.sort((a, b) => b.stock - a.stock);
    return s;
  }, [allKey, sub, sort, inStockOnly, query, lang, stockTick]); // eslint-disable-line react-hooks/exhaustive-deps

  const switchCategory = (c: CategoryKey) => { setSub('All'); setQuery(''); onCategory(c); };
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-8">
      {/* top filter bar */}
      <div className="z-20 -mx-4 space-y-3 border-b border-stone-200 bg-white/95 px-4 pb-4 pt-2 backdrop-blur sm:-mx-8 sm:px-8 md:sticky md:top-20">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(c => (
            <button key={c.name} onClick={() => switchCategory(c.name)} aria-pressed={c.name === category}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${c.name === category ? 'bg-ink text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>{tr(CAT_NAME[c.name], lang)}</button>
          ))}
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={ui('search', lang)} aria-label={ui('searchAria', lang)}
              className="h-10 w-full rounded-full border border-stone-300 bg-white px-5 text-sm outline-none focus:border-ink sm:w-56" />
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="h-4 w-4 accent-stone-900" />{ui('stockOnly', lang)}
            </label>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)} aria-label={ui('sortAria', lang)}
              className="h-10 rounded-full border border-stone-300 bg-white px-4 text-sm outline-none focus:border-ink">
              <option value="featured">{ui('featured', lang)}</option>
              <option value="price-asc">{ui('lowhigh', lang)}</option>
              <option value="price-desc">{ui('highlow', lang)}</option>
              <option value="rating">{ui('top', lang)}</option>
              <option value="stock">{ui('mostStock', lang)}</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {['All', ...meta.subs.filter(x => all.some(p => p.subcategory === x))].map(s => (
            <button key={s} onClick={() => setSub(s)} aria-pressed={s === sub}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition ${s === sub ? 'border-clay bg-clay text-white' : 'border-stone-300 bg-white hover:border-clay'}`}>{subL(s, lang)}</button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-stone-500">{list.length} {ui(list.length === 1 ? 'product' : 'products', lang)}</p>

      {list.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-stone-50 p-16 text-center">
          <p className="text-xl">{ui('none', lang)}</p>
          <button onClick={() => { setSub('All'); setQuery(''); setInStockOnly(false); }} className="btn-primary mt-6 rounded-full bg-ink px-8 py-3 text-sm text-white">{ui('clear', lang)}</button>
        </div>
      ) : (
        <div key={`${category}-${sub}-${sort}-${inStockOnly}-${query}`} className="mt-4 grid auto-rows-fr grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} onOpen={onOpen} onQuick={onQuick} />)}
        </div>
      )}
    </section>
  );
}
