import { useEffect, useState } from 'react';
import { liveShopBanners } from '../../api/offers';

// Auto-scrolling banner under the offers strip. Admin can replace or delete these from Admin > Festival & Offers.

export default function HeroBanner() {
  const [SLIDES] = useState(() => liveShopBanners());
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover || SLIDES.length < 2) return;
    const id = window.setInterval(() => setI(n => (n + 1) % SLIDES.length), 4500);
    return () => window.clearInterval(id);
  }, [hover]);

  if (SLIDES.length === 0) return null;

  return (
      <section className="w-full" aria-roledescription="carousel">
      <div
        className="relative aspect-[2352/1008] max-h-[640px] w-full overflow-hidden bg-stone-100"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {SLIDES.map((s, n) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading={n === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {SLIDES.map((s, n) => (
            <button
              key={s.src}
              onClick={() => setI(n)}
              aria-label={`Banner ${n + 1}`}
              className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-clay' : 'w-2 bg-stone-400/70'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
