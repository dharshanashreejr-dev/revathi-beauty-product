import type { Lang } from "./data";

type L = Partial<Record<Lang, string>> & { en: string }; // kn/mr/bn fall back to English

// Hero banner = running offers: festive offers, seasonal offers, brochures and ads.
// To change an offer, edit the text below (percentages and dates are placeholders until the client confirms them).
export type HeroSlide = {
  id: "festive" | "seasonal" | "brochure" | "daily"; // banner images carry their own text
  image: string;
  width: number;
  height: number;
  tone: string; // flat panel colour behind the image
  action: "shop-makeup" | "shop-all" | "book";
  kind: L; // small tag: Festive offer / Seasonal offer / Brochure / Today's deal
  badge: L; // the big discount pill on the picture
  title: L;
  copy: L;
  cta: L;
  alt: L;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "festive",
    image: "/assets/hero/hb-festive.webp",
    width: 1920,
    height: 823,
    tone: "#fbe6d3",
    action: "shop-all",
    kind: { en: "Festive offer", ta: "பண்டிகை ஆஃபர்", hi: "त्योहार ऑफर", ml: "ഉത്സവ ഓഫർ", te: "పండుగ ఆఫర్" },
    badge: { en: "Up to 20% OFF", ta: "20% வரை தள்ளுபடி", hi: "20% तक की छूट", ml: "20% വരെ കിഴിവ്", te: "20% వరకు తగ్గింపు" },
    title: { en: "Festive season sale on herbal care", ta: "மூலிகை பராமரிப்புக்கு பண்டிகை கால சலுகை", hi: "हर्बल केयर पर त्योहारों की सेल", ml: "ഹെർബൽ കെയറിന് ഉത്സവകാല വിൽപ്പന", te: "హెర్బల్ కేర్‌పై పండుగ సేల్" },
    copy: { en: "Hair oils, soaps, face creams and gift sets at festival prices. Free delivery above ₹1,999.", ta: "ஹேர் ஆயில், சோப்பு, ஃபேஸ் கிரீம், கிஃப்ட் செட் பண்டிகை விலையில். ₹1,999-க்கு மேல் இலவச டெலிவரி.", hi: "हेयर ऑयल, साबुन, फेस क्रीम और गिफ्ट सेट त्योहार के दामों पर। ₹1,999 से ऊपर फ्री डिलीवरी।", ml: "ഹെയർ ഓയിൽ, സോപ്പ്, ഫേസ് ക്രീം, ഗിഫ്റ്റ് സെറ്റ് ഉത്സവ വിലയിൽ. ₹1,999-ന് മുകളിൽ സൗജന്യ ഡെലിവറി.", te: "హెయిర్ ఆయిల్, సబ్బులు, ఫేస్ క్రీమ్‌లు, గిఫ్ట్ సెట్‌లు పండుగ ధరలకు. ₹1,999 పైన ఉచిత డెలివరీ." },
    cta: { en: "Shop festive offers", ta: "பண்டிகை சலுகைகளை வாங்குங்கள்", hi: "त्योहार ऑफर खरीदें", ml: "ഉത്സവ ഓഫറുകൾ വാങ്ങൂ", te: "పండుగ ఆఫర్లు షాప్ చేయండి" },
    alt: { en: "Revathi herbal products with festive offer", ta: "பண்டிகை சலுகையில் ரேவதி மூலிகைப் பொருட்கள்", hi: "त्योहार ऑफर पर रेवती हर्बल प्रोडक्ट्स", ml: "ഉത്സവ ഓഫറിൽ രേവതി ഹെർബൽ ഉൽപ്പന്നങ്ങൾ", te: "పండుగ ఆఫర్‌లో రేవతి హెర్బల్ ఉత్పత్తులు" },
  },
  {
    id: "seasonal",
    image: "/assets/hero/hb-seasonal.webp",
    width: 1920,
    height: 823,
    tone: "#f6e4e4",
    action: "shop-all",
    kind: { en: "Seasonal offer", ta: "சீசன் ஆஃபர்", hi: "सीज़न ऑफर", ml: "സീസൺ ഓഫർ", te: "సీజన్ ఆఫర్" },
    badge: { en: "Gift sets from ₹999", ta: "கிஃப்ட் செட் ₹999 முதல்", hi: "गिफ्ट सेट ₹999 से", ml: "ഗിഫ്റ്റ് സെറ്റ് ₹999 മുതൽ", te: "గిఫ్ట్ సెట్‌లు ₹999 నుండి" },
    title: { en: "Herbal lipstick gift boxes for the season", ta: "இந்த சீசனுக்கான மூலிகை லிப்ஸ்டிக் கிஃப்ட் பெட்டிகள்", hi: "इस सीज़न के हर्बल लिपस्टिक गिफ्ट बॉक्स", ml: "ഈ സീസണിലെ ഹെർബൽ ലിപ്സ്റ്റിക് ഗിഫ്റ്റ് ബോക്സുകൾ", te: "ఈ సీజన్ హెర్బల్ లిప్‌స్టిక్ గిఫ్ట్ బాక్స్‌లు" },
    copy: { en: "Six herbal shades in one box. A lovely gift for family and friends.", ta: "ஒரே பெட்டியில் ஆறு மூலிகை நிறங்கள். குடும்பத்தினருக்கும் நண்பர்களுக்கும் அழகான பரிசு.", hi: "एक बॉक्स में छह हर्बल शेड्स। परिवार और दोस्तों के लिए सुंदर तोहफ़ा।", ml: "ഒരു ബോക്സിൽ ആറ് ഹെർബൽ ഷേഡുകൾ. കുടുംബത്തിനും കൂട്ടുകാർക്കും മനോഹരമായ സമ്മാനം.", te: "ఒక్క బాక్స్‌లో ఆరు హెర్బల్ షేడ్స్. కుటుంబం, స్నేహితులకు చక్కని బహుమతి." },
    cta: { en: "See gift boxes", ta: "கிஃப்ட் பெட்டிகளைப் பாருங்கள்", hi: "गिफ्ट बॉक्स देखें", ml: "ഗിഫ്റ്റ് ബോക്സുകൾ കാണൂ", te: "గిఫ్ట్ బాక్స్‌లు చూడండి" },
    alt: { en: "Revathi lipstick gift box with six shades", ta: "ஆறு நிறங்களுடன் ரேவதி லிப்ஸ்டிக் கிஃப்ட் பெட்டி", hi: "छह शेड्स वाला रेवती लिपस्टिक गिफ्ट बॉक्स", ml: "ആറ് ഷേഡുകളുള്ള രേവതി ലിപ്സ്റ്റിക് ഗിഫ്റ്റ് ബോക്സ്", te: "ఆరు షేడ్స్‌తో రేవతి లిప్‌స్టిక్ గిఫ్ట్ బాక్స్" },
  },
  {
    id: "brochure",
    image: "/assets/hero/hb-service.webp",
    width: 1920,
    height: 823,
    tone: "#eaf0e2",
    action: "book",
    kind: { en: "Salon & spa brochure", ta: "சலூன் & ஸ்பா பிரசுரம்", hi: "सैलून और स्पा ब्रोशर", ml: "സലൂൺ & സ്പാ ബ്രോഷർ", te: "సెలూన్ & స్పా బ్రోషర్" },
    badge: { en: "Weekday spa offers", ta: "வார நாள் ஸ்பா சலுகை", hi: "वीकडे स्पा ऑफर", ml: "ആഴ്ചദിന സ്പാ ഓഫർ", te: "వారపు రోజుల స్పా ఆఫర్" },
    title: { en: "Facials, bridal and spa packages", ta: "ஃபேஷியல், மணப்பெண் மற்றும் ஸ்பா பேக்கேஜ்கள்", hi: "फेशियल, ब्राइडल और स्पा पैकेज", ml: "ഫേഷ്യൽ, ബ്രൈഡൽ, സ്പാ പാക്കേജുകൾ", te: "ఫేషియల్, బ్రైడల్, స్పా ప్యాకేజీలు" },
    copy: { en: "See our service brochure, pick a package and book your slot online.", ta: "எங்கள் சேவை பிரசுரத்தைப் பார்த்து, பேக்கேஜைத் தேர்ந்தெடுத்து ஆன்லைனில் நேரம் பதிவு செய்யுங்கள்.", hi: "हमारा सर्विस ब्रोशर देखें, पैकेज चुनें और ऑनलाइन स्लॉट बुक करें।", ml: "ഞങ്ങളുടെ സേവന ബ്രോഷർ കാണൂ, പാക്കേജ് തിരഞ്ഞെടുത്ത് ഓൺലൈനായി സമയം ബുക്ക് ചെയ്യൂ.", te: "మా సర్వీస్ బ్రోషర్ చూసి, ప్యాకేజీ ఎంచుకుని ఆన్‌లైన్‌లో స్లాట్ బుక్ చేయండి." },
    cta: { en: "Book Appointment", ta: "அப்பாயின்ட்மென்ட் பதிவு செய்", hi: "अपॉइंटमेंट बुक करें", ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ", te: "అపాయింట్‌మెంట్ బుక్ చేయండి" },
    alt: { en: "A therapist giving a herbal facial at the Revathi spa", ta: "ரேவதி ஸ்பாவில் மூலிகை ஃபேஷியல் செய்யும் தெரபிஸ்ட்", hi: "रेवती स्पा में हर्बल फेशियल करती थेरेपिस्ट", ml: "രേവതി സ്പായിൽ ഹെർബൽ ഫേഷ്യൽ ചെയ്യുന്ന തെറാപ്പിസ്റ്റ്", te: "రేవతి స్పాలో హెర్బల్ ఫేషియల్ చేస్తున్న థెరపిస్ట్" },
  },
  {
    id: "daily",
    image: "/assets/hero/hb-combo.webp",
    width: 1920,
    height: 823,
    tone: "#f5efd9",
    action: "shop-all",
    kind: { en: "Today's deals", ta: "இன்றைய சலுகைகள்", hi: "आज के ऑफर", ml: "ഇന്നത്തെ ഓഫറുകൾ", te: "ఈ రోజు ఆఫర్లు" },
    badge: { en: "Buy 2, save 10%", ta: "2 வாங்கினால் 10% சேமிப்பு", hi: "2 लें, 10% बचाएं", ml: "2 വാങ്ങിയാൽ 10% ലാഭം", te: "2 కొంటే 10% ఆదా" },
    title: { en: "New offers every day", ta: "தினமும் புதிய சலுகைகள்", hi: "हर दिन नए ऑफर", ml: "ദിവസവും പുതിയ ഓഫറുകൾ", te: "ప్రతి రోజూ కొత్త ఆఫర్లు" },
    copy: { en: "First order discount, combo deals and free delivery. Check back daily.", ta: "முதல் ஆர்டர் தள்ளுபடி, காம்போ சலுகைகள், இலவச டெலிவரி. தினமும் பாருங்கள்.", hi: "पहले ऑर्डर पर छूट, कॉम्बो डील और फ्री डिलीवरी। रोज़ देखते रहें।", ml: "ആദ്യ ഓർഡർ കിഴിവ്, കോമ്പോ ഡീലുകൾ, സൗജന്യ ഡെലിവറി. ദിവസവും നോക്കൂ.", te: "మొదటి ఆర్డర్ తగ్గింపు, కాంబో డీల్స్, ఉచిత డెలివరీ. రోజూ చూడండి." },
    cta: { en: "Shop today's deals", ta: "இன்றைய சலுகைகளை வாங்குங்கள்", hi: "आज के ऑफर खरीदें", ml: "ഇന്നത്തെ ഓഫറുകൾ വാങ്ങൂ", te: "ఈ రోజు ఆఫర్లు షాప్ చేయండి" },
    alt: { en: "Revathi herbal products on offer", ta: "சலுகையில் ரேவதி மூலிகைப் பொருட்கள்", hi: "ऑफर पर रेवती हर्बल प्रोडक्ट्स", ml: "ഓഫറിൽ രേവതി ഹെർബൽ ഉൽപ്പന്നങ്ങൾ", te: "ఆఫర్‌లో రేవతి హెర్బల్ ఉత్పత్తులు" },
  },
];

// Running strip under the hero: general day-to-day offers. The brand line is added in Landing.tsx.
export const heroTicker: L[] = [
  { en: "Today's offer: up to 20% off herbal hair care", ta: "இன்றைய சலுகை: மூலிகை ஹேர் கேரில் 20% வரை தள்ளுபடி", hi: "आज का ऑफर: हर्बल हेयर केयर पर 20% तक की छूट", ml: "ഇന്നത്തെ ഓഫർ: ഹെർബൽ ഹെയർ കെയറിന് 20% വരെ കിഴിവ്", te: "ఈ రోజు ఆఫర్: హెర్బల్ హెయిర్ కేర్‌పై 20% వరకు తగ్గింపు" },
  { en: "Free delivery on orders above ₹1,999", ta: "₹1,999-க்கு மேல் ஆர்டருக்கு இலவச டெலிவரி", hi: "₹1,999 से ऊपर के ऑर्डर पर फ्री डिलीवरी", ml: "₹1,999-ന് മുകളിലുള്ള ഓർഡറിന് സൗജന്യ ഡെലിവറി", te: "₹1,999 పైన ఆర్డర్లకు ఉచిత డెలివరీ" },
  { en: "Buy 2 products, save 10%", ta: "2 பொருட்கள் வாங்கினால் 10% சேமிப்பு", hi: "2 प्रोडक्ट लें, 10% बचाएं", ml: "2 ഉൽപ്പന്നങ്ങൾ വാങ്ങിയാൽ 10% ലാഭം", te: "2 ఉత్పత్తులు కొంటే 10% ఆదా" },
  { en: "First order? Get a welcome discount", ta: "முதல் ஆர்டரா? வரவேற்பு தள்ளுபடி பெறுங்கள்", hi: "पहला ऑर्डर? वेलकम डिस्काउंट पाएं", ml: "ആദ്യ ഓർഡറോ? സ്വാഗത കിഴിവ് നേടൂ", te: "మొదటి ఆర్డరా? వెల్‌కమ్ డిస్కౌంట్ పొందండి" },
  { en: "Weekday salon & spa offers", ta: "வார நாள் சலூன் & ஸ்பா சலுகைகள்", hi: "वीकडे सैलून और स्पा ऑफर", ml: "ആഴ്ചദിന സലൂൺ & സ്പാ ഓഫറുകൾ", te: "వారపు రోజుల సెలూన్ & స్పా ఆఫర్లు" },
];
