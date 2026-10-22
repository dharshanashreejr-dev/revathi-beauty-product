import { useCallback, useEffect, useMemo, useState } from 'react';
import HeroBanner from './components/HeroBanner';
import ProductsFooter from './components/ProductsFooter';
import ProductsSection from './components/ProductsSection';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import { useWishlist } from './hooks/useWishlist';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import SiteHeader from '../shared/SiteHeader';
import { requireLogin, useUser } from '../shared/LoginModal';
import { useLang, tr, trx } from '../shared/i18n';
import { OFFERS } from './i18n';
import { productsTitle } from '../shared/i18n-meta';
import type { ArtType, Address, CartItem,CategoryKey, Colour, Order, Product } from './types';
import { saveToTracking } from './saveOrder';
import { findProduct, deductStockForOrder } from './data/products';
import { api } from '../api';

const getRoute = () => (location.hash.startsWith('#/') ? location.hash.slice(2) : '');
const go = (r: string) => { location.hash = `#/${r}`; };

export default function App() {
  const [lang] = useLang();
  const [category, setCategory] = useState<CategoryKey>('face');
  const [open, setOpen] = useState<{ product: Product; colour: Colour } | null>(null);
    const [cart, setCart] = useState<CartItem[]>(() => {
    let saved: CartItem[] = [];
    try { saved = JSON.parse(localStorage.getItem('velvet-cart') || '[]'); } catch {}
    try {
      const raw = localStorage.getItem('velvet-handoff');
      if (raw) {
        const clear = { name: 'Clear', hex: '#f1ecfb' };
        for (const i of JSON.parse(raw) as { id: string; name: string; price: number; size: string; qty: number }[]) {
          const key = `${i.id}|Clear|${i.size}`;
          const hit = saved.find(s => s.key === key);
          if (hit) hit.qty = i.qty;
          else saved.push({
            key,
            product: { id: i.id, sku: i.id, name: i.name, category: 'face' as const, subcategory: 'Serums', art: `photo:${i.id}` as unknown as ArtType, price: i.price, mrp: i.price, stock: 10, colours: [clear], sizes: [i.size], rating: 5, reviews: 0, description: '', details: [], material: '', weight: '' },
            colour: clear, size: i.size, qty: i.qty,
          });
        }
      }
    } catch {}
    return saved;
  });
  useEffect(() => {
    try { localStorage.setItem('velvet-cart', JSON.stringify(cart)); localStorage.removeItem('velvet-handoff'); } catch {}
  }, [cart]);
  // re-render when stock changes (order placed, staff update, other tab)
  const [stockTick, setStockTick] = useState(0);
  useEffect(() => api.stock.subscribe(() => setStockTick(n => n + 1)), []);
  // cart always shows the latest product / stock, and quantities never go above the stock left
  const liveCart = useMemo(() => cart.map(i => {
    const p = findProduct(i.product.id);
    if (!p) return i;
    return { ...i, product: p, qty: p.stock > 0 ? Math.min(i.qty, p.stock) : i.qty };
  }), [cart, stockTick]);
  const [drawer, setDrawer] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const wishlist = useWishlist();
  const [address, setAddress] = useState<Address | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [route, setRoute] = useState(getRoute());

  useEffect(() => { document.title = productsTitle(lang); }, [lang]);

  useEffect(() => {
    const h = () => { setRoute(getRoute()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  const close = useCallback(() => setOpen(null), []);

  const add = (product: Product, colour: Colour, size: string, qty: number) => {
    const key = `${product.id}|${colour.name}|${size}`;
    setCart(c => c.some(i => i.key === key)
      ? c.map(i => (i.key === key ? { ...i, qty: Math.min(product.stock, i.qty + qty) } : i))
      : [...c, { key, product, colour, size, qty }]);
    setOpen(null);
    setDrawer(true);
  };
  const changeQty = (k: string, d: number) => setCart(c => c.map(i => (i.key === k ? { ...i, qty: Math.max(1, Math.min(findProduct(i.product.id)?.stock ?? i.product.stock, i.qty + d)) } : i)));
  const remove = (k: string) => setCart(c => c.filter(i => i.key !== k));
  const count = liveCart.reduce((t, i) => t + i.qty, 0);

  const user = useUser();
  const loggedIn = !!user;
  const page = !loggedIn && (route === 'checkout' || route === 'payment') ? 'shop' : route === 'checkout' && cart.length ? 'checkout' : route === 'payment' && cart.length && address ? 'payment' : route === 'confirmed' && order ? 'confirmed' : 'shop';

  return (
    <div className="min-h-screen">
      <SiteHeader current="Products" solid cartCount={count} onCart={page === 'shop' ? () => setDrawer(true) : () => go('')} />
      {page === 'shop' && (
        <button
          type="button"
          onClick={() => setWishOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-clay/40 bg-paper px-4 py-3 text-sm font-semibold text-clay shadow-lg hover:bg-clay hover:text-white transition"
          aria-label="Liked products"
        >
          <span aria-hidden>♥</span>
          <span>Liked{wishlist.count ? ` (${wishlist.count})` : ''}</span>
        </button>
      )}
      <div className="h-20" aria-hidden="true" />


      {page === 'shop' && (
        <main id="top" className="shop-page">
          <div className="overflow-hidden bg-gold py-2 text-xs uppercase tracking-[.3em] text-night">
            <div className="marquee flex w-max gap-12 whitespace-nowrap">{[...OFFERS, ...OFFERS, ...OFFERS, ...OFFERS].map((p, i) => <span key={i}>✦ {tr(p, lang)}</span>)}</div>
          </div>
          <HeroBanner />
          <ProductsSection category={category} onCategory={setCategory} onOpen={(product, colour) => setOpen({ product, colour })} onQuick={(p, c) => add(p, c, p.sizes[0], 1)} />
        </main>
      )}
      {page === 'checkout' && <Checkout items={liveCart} initial={address} onBack={() => go('')} onNext={a => { setAddress(a); go('payment'); }} />}
      {page === 'payment' && address && <Payment items={liveCart} address={address} onBack={() => go('checkout')} onPlace={o => { saveToTracking(o); deductStockForOrder(o.items); try { localStorage.removeItem('velvet-bag'); } catch {} setOrder(o); setCart([]); go('confirmed'); }}/>}
      {page === 'confirmed' && order && <Confirmation order={order} onShop={() => go('')} />}

      <ProductsFooter />

      {/* Wishlist — liked products saved on this device */}
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} onOpen={(product, colour) => setOpen({ product, colour })} onQuick={(p, c) => add(p, c, p.sizes[0], 1)} />
      <CartDrawer open={drawer} items={liveCart} onClose={() => setDrawer(false)} onQty={changeQty} onRemove={remove} onCheckout={() => { setDrawer(false); requireLogin(() => go('checkout')); }} />
      {open && <ProductModal key={open.product.id} product={open.product} initialColour={open.colour} onClose={close} onAdd={(c, s, q) => add(open.product, c, s, q)} />}
    </div>
  );
}
