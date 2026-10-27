import { SITE } from '../../site-links';
import { useLang, trx } from '../../shared/i18n';

const NAV = [
  { label: { en: 'Home', ta: 'முகப்பு', hi: 'होम', ml: 'ഹോം', te: 'హోమ్', kn: 'ಮುಖಪುಟ', mr: 'होम', bn: 'হোম', sa: 'गृहम्' }, href: SITE.home },
  { label: { en: 'Products', ta: 'பொருட்கள்', hi: 'उत्पाद', ml: 'ഉൽപ്പന്നങ്ങൾ', te: 'ఉత్పత్తులు', kn: 'ಉತ್ಪನ್ನಗಳು', mr: 'उत्पादने', bn: 'পণ্য', sa: 'उत्पादानि' }, href: SITE.products },
  { label: { en: 'Services', ta: 'சேவைகள்', hi: 'सेवाएँ', ml: 'സേവനങ്ങൾ', te: 'సేవలు', kn: 'ಸೇವೆಗಳು', mr: 'सेवा', bn: 'সেবা', sa: 'सेवाः' }, href: SITE.services },
  { label: { en: 'About', ta: 'எங்களை பற்றி', hi: 'हमारे बारे में', ml: 'ഞങ്ങളെ കുറിച്ച്', te: 'మా గురించి', kn: 'ನಮ್ಮ ಬಗ್ಗೆ', mr: 'आमच्याबद्दल', bn: 'আমাদের সম্পর্কে', sa: 'अस्माकम् विषये' }, href: SITE.about },
  { label: { en: 'Track my orders', ta: 'ஆர்டர்களை கண்காணி', hi: 'ऑर्डर ट्रैक करें', ml: 'ഓർഡറുകൾ ട്രാക്ക് ചെയ്യുക', te: 'ఆర్డర్లను ట్రాక్ చేయండి', kn: 'ಆರ್ಡರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ', mr: 'ऑर्डर ट्रॅक करा', bn: 'অর্ডার ট্র্যাক করুন', sa: 'आदेश-अनुसरणम्' }, href: SITE.tracking },
];
const LINE = {
  en: 'Luxury beauty salon for women. Shop and salon.',
  ta: 'பெண்களுக்கான ஆடம்பர அழகு சலூன். ஷாப் மற்றும் சலூன்.',
  hi: 'महिलाओं के लिए लग्ज़री ब्यूटी सैलून। शॉप और सैलून।',
  ml: 'സ്ത്രീകൾക്കുള്ള ലക്ഷ്വറി ബ്യൂട്ടി സലൂൺ. ഷോപ്പും സലൂണും.',
  te: 'మహిళల కోసం లగ్జరీ బ్యూటీ సెలూన్. షాప్ మరియు సెలూన్.',
  kn: 'ಮಹಿಳೆಯರಿಗಾಗಿ ಲಗ್ಜರಿ ಬ್ಯೂಟಿ ಸೆಲೂನ್. ಶಾಪ್ ಮತ್ತು ಸೆಲೂನ್.',
  mr: 'महिलांसाठी लक्झरी ब्युटी सलून. शॉप आणि सलून.',
  bn: 'মহিলাদের জন্য লাক্সারি বিউটি সেলুন। শপ এবং সেলুন।',
  sa: 'महिलानां कृते वैभव-सौन्दर्य-शालूनम्। आपणं च शालूनम्।',
};
const BOOK = {
  en: 'Book an appointment',
  ta: 'அப்பாயின்ட்மென்ட் பதிவு',
  hi: 'अपॉइंटमेंट बुक करें',
  ml: 'അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക',
  te: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
  kn: 'ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ',
  mr: 'अपॉइंटमेंट बुक करा',
  bn: 'অ্যাপয়েন্টমেন্ট বুক করুন',
  sa: 'समयनिर्धारणं कुरुत',
};
const TOP = {
  en: 'Back to top',
  ta: 'மேலே செல்',
  hi: 'ऊपर जाएँ',
  ml: 'മുകളിലേക്ക്',
  te: 'పైకి వెళ్ళండి',
  kn: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
  mr: 'वर जा',
  bn: 'উপরে যান',
  sa: 'उपरि गच्छतु',
};

/** Full footer for the products page (same look as the landing page footer). */

const FOOT_TX: Record<string, { essence: string; shop: string }> = {
  en: { essence: 'THE ESSENCE OF BEAUTIFUL MOMENTS', shop: 'SHOP · SALON · SPA' },
  ta: { essence: 'அழகான தருணங்களின் சாரம்', shop: 'ஷாப் · சலூன் · ஸ்பா' },
  hi: { essence: 'सुंदर पलों का सार', shop: 'शॉप · सैलून · स्पा' },
  ml: { essence: 'സുന്ദര നിമിഷങ്ങളുടെ സാരം', shop: 'ഷോപ്പ് · സലൂൺ · സ്പാ' },
  te: { essence: 'అందమైన క్షణాల సారం', shop: 'షాప్ · సెలూన్ · స్పా' },
  kn: { essence: 'ಸುಂದರ ಕ್ಷಣಗಳ ಸಾರ', shop: 'ಶಾಪ್ · ಸೆಲೂನ್ · ಸ್ಪಾ' },
  mr: { essence: 'सुंदर क्षणांचे सार', shop: 'शॉप · सलून · स्पा' },
  bn: { essence: 'সুন্দর মুহূর্তের সারমর্ম', shop: 'শপ · সেলুন · স্পা' },
  sa: { essence: 'सुन्दर-क्षणानां सारम्', shop: 'विपणिः · शालून · स्पा' },
}

export default function ProductsFooter() {
  const [lang] = useLang();
  const ft = FOOT_TX[lang] ?? FOOT_TX.en
  return (
    <footer className="overflow-hidden bg-[#FFFFFF] px-[5%] pb-6 pt-16 text-ink">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
        <div>
          <p className="font-serif text-3xl italic text-clay">REVATHI HERBAL</p>
          <p className="mt-4 max-w-[16rem] text-sm text-[#7A2E4D]">{trx(LINE, lang)}</p>
        </div>
        <nav className="flex flex-col items-start gap-4 pt-1 text-sm">
          {NAV.map(n => <a key={n.href} href={n.href} className="transition hover:text-clay">{trx(n.label, lang)}</a>)}
        </nav>
        <div className="flex flex-col items-start gap-4 pt-1 text-sm">
          <a href={SITE.booking} className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-clay">{trx(BOOK, lang)}</a>
          <a href="#top" className="transition hover:text-clay">{trx(TOP, lang)}</a>
        </div>
      </div>
      <div className="my-12 select-none text-center font-serif text-[22vw] leading-[0.82] tracking-[-0.04em] text-ink/90" aria-hidden="true">
        <span className="block">revathi</span>
        <span className="block text-[5vw] tracking-normal">herbal beauty products</span>
      </div>
      <div className="flex flex-col justify-between gap-3 border-t border-[#FBEDEB30] pt-5 text-[10px] tracking-[0.08em] sm:flex-row">
        <span>&copy; {new Date().getFullYear()} REVATHI HERBAL BEAUTY CARE</span>
        <span>{ft.essence}</span>
        <span>{ft.shop}</span>
      </div>
    </footer>
  );
}
