import { SITE } from '../../site-links';
import { useLang, trx } from '../../shared/i18n';

const NAV = [
  { label: { en: 'Home', ta: 'முகப்பு', hi: 'होम', ml: 'ഹോം', te: 'హోమ్' }, href: SITE.home },
  { label: { en: 'Products', ta: 'பொருட்கள்', hi: 'उत्पाद', ml: 'ഉൽപ്പന്നങ്ങൾ', te: 'ఉత్పత్తులు' }, href: SITE.products },
  { label: { en: 'Services', ta: 'சேவைகள்', hi: 'सेवाएँ', ml: 'സേവനങ്ങൾ', te: 'సేవలు' }, href: SITE.services },
  { label: { en: 'About', ta: 'எங்களை பற்றி', hi: 'हमारे बारे में', ml: 'ഞങ്ങളെ കുറിച്ച്', te: 'మా గురించి' }, href: SITE.about },
  { label: { en: 'Track my orders', ta: 'ஆர்டர்களை கண்காணி', hi: 'ऑर्डर ट्रैक करें', ml: 'ഓർഡറുകൾ ട്രാക്ക് ചെയ്യുക', te: 'ఆర్డర్లను ట్రాక్ చేయండి' }, href: SITE.tracking },
];
const LINE = { en: 'Luxury beauty salon for women. Shop and salon.', ta: 'பெண்களுக்கான ஆடம்பர அழகு சலூன். ஷாப் மற்றும் சலூன்.', hi: 'महिलाओं के लिए लग्ज़री ब्यूटी सैलून। शॉप और सैलून।', ml: 'സ്ത്രീകൾക്കുള്ള ലക്ഷ്വറി ബ്യൂട്ടി സലൂൺ. ഷോപ്പും സലൂണും.', te: 'మహిళల కోసం లగ్జరీ బ్యూటీ సెలూన్. షాప్ మరియు సెలూన్.' };
const BOOK = { en: 'Book an appointment', ta: 'அப்பாயின்ட்மென்ட் பதிவு', hi: 'अपॉइंटमेंट बुक करें', ml: 'അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക', te: 'అపాయింట్‌మెంట్ బుక్ చేయండి' };
const TOP = { en: 'Back to top', ta: 'மேலே செல்', hi: 'ऊपर जाएँ', ml: 'മുകളിലേക്ക്', te: 'పైకి వెళ్ళండి' };

/** Full footer for the products page (same look as the landing page footer). */
export default function ProductsFooter() {
  const [lang] = useLang();
  return (
    <footer className="overflow-hidden bg-[#f4f1ee] px-[5%] pb-6 pt-16 text-ink">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
        <div>
          <p className="font-serif text-3xl italic text-clay">REVATHI HERBAL</p>
          <p className="mt-4 max-w-[16rem] text-sm text-[#745b47]">{trx(LINE, lang)}</p>
        </div>
        <nav className="flex flex-col items-start gap-4 pt-1 text-sm">
          {NAV.map(n => <a key={n.href} href={n.href} className="transition hover:text-clay">{trx(n.label, lang)}</a>)}
        </nav>
        <div className="flex flex-col items-start gap-4 pt-1 text-sm">
          <a href={SITE.booking} className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-clay">{trx(BOOK, lang)}</a>
          <a href="#top" className="transition hover:text-clay">{trx(TOP, lang)}</a>
        </div>
      </div>
      <div className="my-12 select-none font-serif text-[22vw] leading-[0.82] tracking-[-0.04em] text-ink/90" aria-hidden="true">
        <span className="block">revathi</span>
        <span className="block text-[5vw] tracking-normal">herbal beauty products</span>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-[#422c2030] pt-5 text-[10px] tracking-[0.08em] sm:flex-row">
        <span>&copy; {new Date().getFullYear()} REVATHI HERBAL BEAUTY CARE</span>
        <span>THE ESSENCE OF BEAUTIFUL MOMENTS</span>
        <span>SHOP &middot; SALON &middot; SPA</span>
      </div>
    </footer>
  );
}
