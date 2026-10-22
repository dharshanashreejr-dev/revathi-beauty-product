import { CATEGORIES } from '../data/products';
import { useInView } from '../hooks/useInView';
import type { CategoryKey } from '../types';
import { useLang, tr } from '../../shared/i18n';
import { CAT_NAME, SHOP_BTN, VIEWING_BTN } from '../i18n';

interface Props { active: CategoryKey | null; onSelect: (c: CategoryKey) => void }

export default function Categories({ active, onSelect }: Props) {
  const { ref, isVisible } = useInView<HTMLDivElement>(0.1);
  const [lang] = useLang();

  return (
    <section className="flex w-full flex-col justify-center bg-sand text-white">
      <div
        ref={ref}
        className={`grid grid-cols-1 transition-all duration-1000 ease-out md:grid-cols-3 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        {CATEGORIES.map((cat, index) => {
          const isActive = active === cat.name;
          const label = tr(CAT_NAME[cat.name], lang);
          return (
            <div
              key={cat.name}
              style={{ transitionDelay: `${index * 150}ms` }}
              className="group relative flex min-h-[300px] flex-col items-start justify-between overflow-hidden bg-stone-300 p-6 sm:min-h-[380px] sm:p-8 md:min-h-[480px] md:p-12"
            >
              <video
                src={cat.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />

              <h2
                className="cat-hero-label relative z-10 font-medium transition-transform duration-500 group-hover:-translate-y-2"
                style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                {label}
              </h2>

              <button
                onClick={() => onSelect(cat.name)}
                aria-pressed={isActive}
                className="btn-primary relative z-10 mt-auto rounded-full bg-paper px-8 py-3 text-sm text-violet-100"
              >
                {isActive ? VIEWING_BTN[lang](label) : SHOP_BTN[lang](label)}
              </button>

              <span
                className={`absolute bottom-0 left-0 z-10 h-1 bg-paper transition-all duration-700 ${
                  isActive ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
