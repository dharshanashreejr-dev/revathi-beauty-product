import { useLang, trx } from '../../shared/i18n';
import { findProduct, formatPrice } from '../data/products';
import { pname } from '../i18n-names';
import { ui } from '../i18n';
import ProductArt from './ProductArt';
import { useWishlist } from '../hooks/useWishlist';
import type { Colour, Product } from '../types';
import ClickSpark from '../../shared/reactbits/ClickSpark.jsx';

const TITLE = {
  en: 'Liked products',
  ta: 'விருப்பமானவை',
  hi: 'पसंद किए गए',
  ml: 'ഇഷ്ടപ്പെട്ടവ',
  te: 'ఇష్టపడినవి',
  kn: 'ಇಷ್ಟಪಟ್ಟವು',
  mr: 'आवडलेली',
  bn: 'পছন্দ করা',
  sa: 'इष्टानि',
};
const EMPTY = {
  en: 'No liked products yet. Tap the heart on any product.',
  ta: 'இன்னும் விருப்பங்கள் இல்லை. எந்த பொருளிலும் இதயத்தை அழுத்தவும்.',
  hi: 'अभी कोई पसंद नहीं। किसी भी प्रोडक्ट पर दिल दबाएँ।',
  ml: 'ഇതുവരെ ഇഷ്ടമില്ല. ഏതെങ്കിലും ഉൽപ്പന്നത്തിൽ ഹാർട്ട് അമർത്തുക.',
  te: 'ఇంకా ఇష్టాలు లేవు. ఏదైనా ఉత్పత్తిపై హార్ట్ నొక్కండి.',
  kn: 'ಇನ್ನೂ ಇಷ್ಟಗಳಿಲ್ಲ. ಯಾವುದೇ ಉತ್ಪನ್ನದಲ್ಲಿ ಹೃದಯ ಒತ್ತಿರಿ.',
  mr: 'अजून आवडलेले नाहीत. कोणत्याही उत्पादनावर हृदय दाबा.',
  bn: 'এখনও কোনো পছন্দ নেই। যেকোনো পণ্যে হার্ট চাপুন।',
  sa: 'अद्यापि इष्टानि न सन्ति।',
};
const OPEN = {
  en: 'View',
  ta: 'பார்',
  hi: 'देखें',
  ml: 'കാണുക',
  te: 'చూడండి',
  kn: 'ನೋಡಿ',
  mr: 'पहा',
  bn: 'দেখুন',
  sa: 'पश्यतु',
};
const CLEAR = {
  en: 'Clear all',
  ta: 'அனைத்தையும் அழி',
  hi: 'सब हटाएँ',
  ml: 'എല്ലാം മായ്ക്കുക',
  te: 'అన్నీ తొలగించు',
  kn: 'ಎಲ್ಲಾ ಅಳಿಸಿ',
  mr: 'सर्व साफ करा',
  bn: 'সব মুছুন',
  sa: 'सर्वं शुद्धयतु',
};
const ADD = {
  en: 'Add to cart',
  ta: 'கார்ட்டில் சேர்',
  hi: 'कार्ट में जोड़ें',
  ml: 'കാർട്ടിൽ ചേർക്കുക',
  te: 'కార్ట్‌కి జోడించు',
  kn: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
  mr: 'कार्टमध्ये जोडा',
  bn: 'কার্টে যোগ করুন',
  sa: 'पेटिकायां योजयतु',
};

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: (p: Product, c: Colour) => void;
  onQuick: (p: Product, c: Colour) => void;
}

export default function WishlistDrawer({ open, onClose, onOpen, onQuick }: Props) {
  const [lang] = useLang();
  const { ids, toggle, clear, count } = useWishlist();
  const items = ids.map((id) => findProduct(id)).filter(Boolean) as Product[];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label={trx(TITLE, lang)}>
      <button type="button" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl animate-rise">
        <header className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500">{trx(TITLE, lang)}</p>
            <h2 className="font-serif text-2xl text-ink">{count} {count === 1 ? 'item' : 'items'}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-stone-300 px-3 py-1 text-sm" aria-label="Close">✕</button>
        </header>

        {items.length === 0 ? (
          <p className="m-auto max-w-xs px-6 text-center font-serif text-xl italic text-stone-500">{trx(EMPTY, lang)}</p>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto p-6">
              {items.map((p) => {
                const colour = p.colours[0];
                return (
                  <li key={p.id} className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-3">
                    <button type="button" className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-50" onClick={() => { onOpen(p, colour); onClose(); }}>
                      <ProductArt art={p.art} colour={colour.hex} colourName={colour.name} photo={colour.photo} alt="" className="h-full w-full p-1" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg leading-tight text-ink">{pname(p.name, lang)}</p>
                      <p className="mt-1 text-sm font-semibold">{formatPrice(p.price)}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <ClickSpark sparkColor={['#5e18f0', '#c9a227']} sparkCount={5} sparkSize={9} sparkRadius={20} duration={380}>
                          <button
                            type="button"
                            disabled={p.stock === 0}
                            onClick={() => onQuick(p, colour)}
                            className="rounded-lg border border-clay px-3 py-1.5 text-xs font-semibold text-clay disabled:opacity-40"
                          >
                            {trx(ADD, lang)}
                          </button>
                        </ClickSpark>
                        <button type="button" onClick={() => { onOpen(p, colour); onClose(); }} className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs">
                          {trx(OPEN, lang)}
                        </button>
                        <button type="button" onClick={() => toggle(p.id)} className="rounded-lg px-2 py-1.5 text-xs text-rose-700 underline" aria-label={ui('wish', lang)}>
                          ♥
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="border-t border-stone-200 p-4">
              <button type="button" onClick={clear} className="w-full rounded-full border border-stone-300 py-3 text-sm text-stone-600">
                {trx(CLEAR, lang)}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
