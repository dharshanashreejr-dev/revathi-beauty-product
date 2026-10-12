import type { Lang } from "./data";

type L = Partial<Record<Lang, string>> & { en: string }; // kn/mr/bn fall back to English

export type HeroSlide = {
  id: "lipstick" | "herbal" | "spa";
  image: string;
  width: number;
  height: number;
  tone: string; // flat panel colour behind the image card (no background photos)
  action: "shop-makeup" | "shop-all" | "book";
  eyebrow: L;
  title: L;
  copy: L;
  cta: L;
  alt: L;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "lipstick",
    image: "/assets/hero/lipstick.webp",
    width: 1024,
    height: 434,
    tone: "#f4ebe5",
    action: "shop-makeup",
    eyebrow: { en: "New · Herbal lipsticks", ta: "புதிது · மூலிகை லிப்ஸ்டிக்", hi: "नया · हर्बल लिपस्टिक", ml: "പുതിയത് · ഹെർബൽ ലിപ്സ്റ്റിക്", te: "కొత్తది · హెర్బల్ లిప్‌స్టిక్" },
    title: { en: "Herbal Lipsticks & Skincare", ta: "மூலிகை லிப்ஸ்டிக் & சரும பராமரிப்பு", hi: "हर्बल लिपस्टिक और स्किनकेयर", ml: "ഹെർബൽ ലിപ്സ്റ്റിക്കും സ്കിൻകെയറും", te: "హెర్బల్ లిప్‌స్టిక్ & స్కిన్‌కేర్" },
    copy: { en: "Herbal shades that colour your lips and care for them too.", ta: "உதடுகளுக்கு நிறமும் பராமரிப்பும் தரும் மூலிகை நிறங்கள்.", hi: "जड़ी-बूटी वाले शेड्स जो होंठों को रंग भी देते हैं और देखभाल भी करते हैं।", ml: "ചുണ്ടുകൾക്ക് നിറവും സംരക്ഷണവും നൽകുന്ന ഹെർബൽ ഷേഡുകൾ.", te: "పెదవులకు రంగునీ, సంరక్షణనీ ఇచ్చే హెర్బల్ షేడ్స్." },
    cta: { en: "Shop Collection", ta: "கலெக்ஷனை வாங்குங்கள்", hi: "कलेक्शन खरीदें", ml: "കളക്ഷൻ വാങ്ങൂ", te: "కలెక్షన్ షాప్ చేయండి" },
    alt: { en: "Revathi lipstick set in a gift box with six shades", ta: "ஆறு நிறங்களுடன் ரேவதி லிப்ஸ்டிக் பரிசுப் பெட்டி", hi: "छह शेड्स वाला रेवती लिपस्टिक गिफ्ट बॉक्स", ml: "ആറ് ഷേഡുകളുള്ള രേവതി ലിപ്സ്റ്റിക് ഗിഫ്റ്റ് ബോക്സ്", te: "ఆరు షేడ్స్‌తో రేవతి లిప్‌స్టిక్ గిఫ్ట్ బాక్స్" },
  },
  {
    id: "herbal",
    image: "/assets/hero/products.webp",
    width: 1024,
    height: 559,
    tone: "#edf1e4",
    action: "shop-all",
    eyebrow: { en: "Herbal range", ta: "மூலிகை தொகுப்பு", hi: "हर्बल रेंज", ml: "ഹെർബൽ ശേഖരം", te: "హెర్బల్ రేంజ్" },
    title: { en: "Pure herbal beauty, straight from nature", ta: "இயற்கையிலிருந்து நேரடியாக தூய மூலிகை அழகு", hi: "प्रकृति से सीधे, शुद्ध हर्बल सौंदर्य", ml: "പ്രകൃതിയിൽ നിന്ന് നേരിട്ടുള്ള ശുദ്ധ ഹെർബൽ സൗന്ദര്യം", te: "ప్రకృతి నుండి నేరుగా స్వచ్ఛమైన హెర్బల్ అందం" },
    copy: { en: "Hair oils, body wash, soaps and face creams made with neem, amla, turmeric and sandalwood.", ta: "வேம்பு, நெல்லி, மஞ்சள், சந்தனம் கொண்டு செய்த ஹேர் ஆயில், பாடி வாஷ், சோப்பு, ஃபேஸ் கிரீம்.", hi: "नीम, आंवला, हल्दी और चंदन से बने हेयर ऑयल, बॉडी वॉश, साबुन और फेस क्रीम।", ml: "വേപ്പ്, നെല്ലിക്ക, മഞ്ഞൾ, ചന്ദനം എന്നിവ ചേർത്ത ഹെയർ ഓയിൽ, ബോഡി വാഷ്, സോപ്പ്, ഫേസ് ക്രീം.", te: "వేప, ఉసిరి, పసుపు, చందనంతో చేసిన హెయిర్ ఆయిల్, బాడీ వాష్, సబ్బులు, ఫేస్ క్రీమ్‌లు." },
    cta: { en: "Shop Herbal Range", ta: "மூலிகை தொகுப்பை வாங்குங்கள்", hi: "हर्बल रेंज खरीदें", ml: "ഹെർബൽ ശേഖരം വാങ്ങൂ", te: "హెర్బల్ రేంజ్ షాప్ చేయండి" },
    alt: { en: "Revathi herbal products: hair oil, body wash, soap, henna powder and face cream", ta: "ரேவதி மூலிகைப் பொருட்கள்: ஹேர் ஆயில், பாடி வாஷ், சோப்பு, மருதாணி பவுடர், ஃபேஸ் கிரீம்", hi: "रेवती हर्बल प्रोडक्ट्स: हेयर ऑयल, बॉडी वॉश, साबुन, मेहंदी पाउडर और फेस क्रीम", ml: "രേവതി ഹെർബൽ ഉൽപ്പന്നങ്ങൾ: ഹെയർ ഓയിൽ, ബോഡി വാഷ്, സോപ്പ്, മൈലാഞ്ചി പൊടി, ഫേസ് ക്രീം", te: "రేవతి హెర్బల్ ఉత్పత్తులు: హెయిర్ ఆయిల్, బాడీ వాష్, సబ్బు, గోరింటాకు పొడి, ఫేస్ క్రీమ్" },
  },
  {
    id: "spa",
    image: "/assets/hero/spa.webp",
    width: 1024,
    height: 559,
    tone: "#f6eee0",
    action: "book",
    eyebrow: { en: "Herbal beauty care spa", ta: "மூலிகை அழகு பராமரிப்பு ஸ்பா", hi: "हर्बल ब्यूटी केयर स्पा", ml: "ഹെർബൽ ബ്യൂട്ടി കെയർ സ്പാ", te: "హెర్బల్ బ్యూటీ కేర్ స్పా" },
    title: { en: "Herbal facials & spa rituals", ta: "மூலிகை ஃபேஷியல் & ஸ்பா சிகிச்சைகள்", hi: "हर्बल फेशियल और स्पा रिचुअल्स", ml: "ഹെർബൽ ഫേഷ്യലുകളും സ്പാ ട്രീറ്റ്മെന്റുകളും", te: "హెర్బల్ ఫేషియల్స్ & స్పా రిచువల్స్" },
    copy: { en: "Relax with trained therapists and skin-friendly herbal treatments.", ta: "பயிற்சி பெற்ற தெரபிஸ்ட்களுடன், சருமத்துக்கு இதமான மூலிகை சிகிச்சைகள்.", hi: "प्रशिक्षित थेरेपिस्ट और त्वचा के अनुकूल हर्बल ट्रीटमेंट के साथ आराम करें।", ml: "പരിശീലനം ലഭിച്ച തെറാപ്പിസ്റ്റുകളോടൊപ്പം ചർമ്മത്തിന് ഇണങ്ങുന്ന ഹെർബൽ ചികിത്സകൾ.", te: "శిక్షణ పొందిన థెరపిస్టులతో, చర్మానికి అనువైన హెర్బల్ ట్రీట్‌మెంట్లు." },
    cta: { en: "Book Appointment", ta: "அப்பாயின்ட்மென்ட் பதிவு செய்", hi: "अपॉइंटमेंट बुक करें", ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ", te: "అపాయింట్‌మెంట్ బుక్ చేయండి" },
    alt: { en: "A therapist applying a herbal face pack at the Revathi spa", ta: "ரேவதி ஸ்பாவில் மூலிகை ஃபேஷியல் செய்யும் தெரபிஸ்ட்", hi: "रेवती स्पा में हर्बल फेशियल करती थेरेपिस्ट", ml: "രേവതി സ്പായിൽ ഹെർബൽ ഫേഷ്യൽ ചെയ്യുന്ന തെറാപ്പിസ്റ്റ്", te: "రేవతి స్పాలో హెర్బల్ ఫేషియల్ చేస్తున్న థెరపిస్ట్" },
  },
];

// Offer strip under the hero (scrolling ticker). The brand line is added in Landing.tsx.
export const heroTicker: L[] = [
  { en: "100% herbal ingredients", ta: "100% மூலிகை மூலப்பொருட்கள்", hi: "100% हर्बल सामग्री", ml: "100% ഹെർബൽ ചേരുവകൾ", te: "100% హెర్బల్ పదార్థాలు" },
  { en: "Book salon & spa online", ta: "சலூன் & ஸ்பா ஆன்லைனில் பதிவு செய்யுங்கள்", hi: "सैलून और स्पा ऑनलाइन बुक करें", ml: "സലൂൺ & സ്പാ ഓൺലൈനായി ബുക്ക് ചെയ്യൂ", te: "సెలూన్ & స్పా ఆన్‌లైన్‌లో బుక్ చేయండి" },
  { en: "Skincare · Makeup · Body care", ta: "சரும பராமரிப்பு · மேக்கப் · உடல் பராமரிப்பு", hi: "स्किनकेयर · मेकअप · बॉडी केयर", ml: "സ്കിൻകെയർ · മേക്കപ്പ് · ബോഡി കെയർ", te: "స్కిన్‌కేర్ · మేకప్ · బాడీ కేర్" },
  { en: "Trained therapists", ta: "பயிற்சி பெற்ற தெரபிஸ்ட்கள்", hi: "प्रशिक्षित थेरेपिस्ट", ml: "പരിശീലനം ലഭിച്ച തെറാപ്പിസ്റ്റുകൾ", te: "శిక్షణ పొందిన థెరపిస్టులు" },
];
