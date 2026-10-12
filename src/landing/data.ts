import { getSiteConfig, promoPrice } from "../shared/siteConfig";
export type Lang = "en" | "ta" | "hi" | "ml" | "te" | "kn" | "mr" | "bn";
export type L = Partial<Record<Lang, string>> & { en: string };
export type Kind =
  | "serum"
  | "lipstick"
  | "jar"
  | "mist"
  | "tube"
  | "foundation"
  | "oil"
  | "compact";
export type Cat = "skin" | "makeup" | "body";

export type Product = {
  id: string;
  kind: Kind;
  tone: [string, string];
  cat: Cat;
  price: number;
  size: string;
  name: L;
  sub: L;
  copy: L;
};

export const BRAND = "REVATHI HERBAL BEAUTY CARE";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिन्दी",
  ml: "മലയാളം",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  mr: "मराठी",
  bn: "বাংলা",
};

export const LANG_LOCALES: Record<Lang, string> = {
  en: "en-IN",
  ta: "ta-IN",
  hi: "hi-IN",
  ml: "ml-IN",
  te: "te-IN",
  kn: "kn-IN",
  mr: "mr-IN",
  bn: "bn-IN",
};

export const products: Product[] = [
  {
    id: "eclat",
    kind: "serum",
    tone: ["#eaa56a", "#c68a4d"],
    cat: "skin",
    price: 2450,
    size: "30 ml",
    name: {
      en: "Éclat Glow Serum",
      ta: "எக்லாட் குளோ சீரம்",
      hi: "एक्ला ग्लो सीरम",
      ml: "എക്ലാറ്റ് ഗ്ലോ സീറം",
      te: "ఎక్లా గ్లో సీరం",
      kn: "ಎಕ್ಲಾ ಗ್ಲೋ ಸೀರಮ್",
      mr: "एक्ला ग्लो सीरम",
      bn: "এক্লা গ্লো সিরাম"
    },
    sub: {
      en: "Signature serum",
      ta: "சிக்னேச்சர் சீரம்",
      hi: "सिग्नेचर सीरम",
      ml: "സിഗ്നേച്ചർ സീറം",
      te: "సిగ్నేచర్ సీరం",
      kn: "ಸಿಗ್ನೇಚರ್ ಸೀರಮ್",
      mr: "सिग्नेचर सीरम",
      bn: "সিগনেচার সিরাম"
    },
    copy: {
      en: "Peach nectar, white jasmine and sandalwood in a silky, fast-absorbing serum for a luminous, velvet-soft finish.",
      ta: "பீச் நெக்டார், வெள்ளை மல்லிகை மற்றும் சந்தனம் — பட்டுபோன்ற, விரைவாக உறிஞ்சும் சீரம். பிரகாசமான, வெல்வெட் மென்மையான முடிவு.",
      hi: "पीच नेक्टर, सफेद चमेली और चंदन — रेशमी, जल्दी सोखने वाला सीरम। चमकदार, मखमली मुलायम फिनिश।",
      ml: "പീച്ച് നെക്ടർ, വെള്ള ജാസ്മിൻ, ചന്ദനം — പട്ടുപോലെ, വേഗത്തിൽ ആഗിരണം ചെയ്യുന്ന സീറം. പ്രകാശമുള്ള, വെൽവെറ്റ് മൃദുവായ ഫിനിഷ്.",
      te: "పీచ్ నెక్టార్, తెల్ల జాజిక, చందనం — పట్టులాంటి, వేగంగా గ్రహించే సీరం. ప్రకాశవంతమైన, వెల్వెట్ మృదువైన ఫినిష్.",
      kn: "ಪೀಚ್ ನೆಕ್ಟರ್, ಬಿಳಿ ಮಲ್ಲಿಗೆ ಮತ್ತು ಚಂದನವನ್ನು ಮೃದುವಾದ, ವೇಗವಾಗಿ ಹೀರುವ ಸೀರಮ್‌ನಲ್ಲಿ — ಪ್ರಕಾಶಮಾನ, ವೆಲ್ವೆಟ್ ಮೃದು ಮುಕ್ತಾಯಕ್ಕಾಗಿ.",
      mr: "पीच नेक्टर, पांढरी जाई आणि चंदन मऊ, वेगाने शोषणार्‍या सीरममध्ये — चमकदार, वेल्व्हेटी मऊ फिनिशसाठी.",
      bn: "পিচ নেক্টার, সাদা জুঁই ও চন্দন মসৃণ, দ্রুত শোষণযোগ্য সিরামে — উজ্জ্বল, ভেলভেট নরম ফিনিশের জন্য।"
    }
  },
  {
    id: "lipstick-red",
    kind: "lipstick",
    tone: ["#8e1b1b", "#cfa860"],
    cat: "makeup",
    price: 1150,
    size: "3.8 g",
    name: {
      en: "Red Lipstick",
      ta: "சிவப்பு லிப்ஸ்டிக்",
      hi: "लाल लिपस्टिक",
      ml: "ചുവപ്പ് ലിപ്സ്റ്റിക്",
      te: "ఎరుపు లిప్‌స్టిక్",
      kn: "ಕೆಂಪು ಲಿಪ್‌ಸ್ಟಿಕ್",
      mr: "लाल लिपस्टिक",
      bn: "লাল লিপস্টিক"
    },
    sub: {
      en: "4 shades · R1–R4",
      ta: "4 shades · R1–R4",
      hi: "4 shades · R1–R4",
      ml: "4 shades · R1–R4",
      te: "4 shades · R1–R4",
      kn: "೪ ಶೇಡ್‌ಗಳು · R1–R4",
      mr: "४ शेड्स · R1–R4",
      bn: "৪ শেড · R1–R4"
    },
    copy: {
      en: "Four bold reds from classic to brick, each with its own serial number.",
      ta: "Four bold reds from classic to brick, each with its own serial number.",
      hi: "Four bold reds from classic to brick, each with its own serial number.",
      ml: "Four bold reds from classic to brick, each with its own serial number.",
      te: "Four bold reds from classic to brick, each with its own serial number.",
      kn: "Four bold reds from classic to brick, each with its own serial number.",
      mr: "Four bold reds from classic to brick, each with its own serial number.",
      bn: "Four bold reds from classic to brick, each with its own serial number."
    }
  },
  {
    id: "lipstick-nude",
    kind: "lipstick",
    tone: ["#c48c78", "#cfa860"],
    cat: "makeup",
    price: 1150,
    size: "3.8 g",
    name: {
      en: "Nude Lipstick",
      ta: "நியூட் லிப்ஸ்டிக்",
      hi: "न्यूड लिपस्टिक",
      ml: "ന്യൂഡ് ലിപ്സ്റ്റിക്",
      te: "న్యూడ్ లిప్‌స్టిక్",
      kn: "ನ್ಯೂಡ್ ಲಿಪ್‌ಸ್ಟಿಕ್",
      mr: "न्यूड लिपस्टिक",
      bn: "নিউড লিপস্টিক"
    },
    sub: {
      en: "4 shades · N1–N4",
      ta: "4 shades · N1–N4",
      hi: "4 shades · N1–N4",
      ml: "4 shades · N1–N4",
      te: "4 shades · N1–N4",
      kn: "೪ ಶೇಡ್‌ಗಳು · N1–N4",
      mr: "४ शेड्स · N1–N4",
      bn: "৪ শেড · N1–N4"
    },
    copy: {
      en: "Four everyday nudes from light to mocha, each with its own serial number.",
      ta: "Four everyday nudes from light to mocha, each with its own serial number.",
      hi: "Four everyday nudes from light to mocha, each with its own serial number.",
      ml: "Four everyday nudes from light to mocha, each with its own serial number.",
      te: "Four everyday nudes from light to mocha, each with its own serial number.",
      kn: "Four everyday nudes from light to mocha, each with its own serial number.",
      mr: "Four everyday nudes from light to mocha, each with its own serial number.",
      bn: "Four everyday nudes from light to mocha, each with its own serial number."
    }
  },
  {
    id: "lipstick-green",
    kind: "lipstick",
    tone: ["#4f7a45", "#cfa860"],
    cat: "makeup",
    price: 1150,
    size: "3.8 g",
    name: {
      en: "Green Lipstick",
      ta: "பச்சை லிப்ஸ்டிக்",
      hi: "हरा लिपस्टिक",
      ml: "പച്ച ലിപ്സ്റ്റിക്",
      te: "ఆకుపచ్చ లిప్‌స్టిక్",
      kn: "ಹಸಿರು ಲಿಪ್‌ಸ್ಟಿಕ್",
      mr: "हिरवी लिपस्टिक",
      bn: "সবুজ লিপস্টিক"
    },
    sub: {
      en: "4 shades · G1–G4",
      ta: "4 shades · G1–G4",
      hi: "4 shades · G1–G4",
      ml: "4 shades · G1–G4",
      te: "4 shades · G1–G4",
      kn: "೪ ಶೇಡ್‌ಗಳು · G1–G4",
      mr: "४ शेड्स · G1–G4",
      bn: "৪ শেড · G1–G4"
    },
    copy: {
      en: "Four statement greens from mint to khaki, each with its own serial number.",
      ta: "Four statement greens from mint to khaki, each with its own serial number.",
      hi: "Four statement greens from mint to khaki, each with its own serial number.",
      ml: "Four statement greens from mint to khaki, each with its own serial number.",
      te: "Four statement greens from mint to khaki, each with its own serial number.",
      kn: "Four statement greens from mint to khaki, each with its own serial number.",
      mr: "Four statement greens from mint to khaki, each with its own serial number.",
      bn: "Four statement greens from mint to khaki, each with its own serial number."
    }
  },
  {
    id: "lipstick-pink",
    kind: "lipstick",
    tone: ["#c2557a", "#cfa860"],
    cat: "makeup",
    price: 1150,
    size: "3.8 g",
    name: {
      en: "Pink Lipstick",
      ta: "பிங்க் லிப்ஸ்டிக்",
      hi: "गुलाबी लिपस्टिक",
      ml: "പിങ്ക് ലിപ്സ്റ്റിക്",
      te: "పింక్ లిప్‌స్టిక్",
      kn: "ಗುಲಾಬಿ ಲಿಪ್‌ಸ್ಟಿಕ್",
      mr: "गुलाबी लिपस्टिक",
      bn: "গোলাপি লিপস্টিক"
    },
    sub: {
      en: "4 shades · P1–P4",
      ta: "4 shades · P1–P4",
      hi: "4 shades · P1–P4",
      ml: "4 shades · P1–P4",
      te: "4 shades · P1–P4",
      kn: "೪ ಶೇಡ್‌ಗಳು · P1–P4",
      mr: "४ शेड्स · P1–P4",
      bn: "৪ শেড · P1–P4"
    },
    copy: {
      en: "Four pinks from baby to mauve, each with its own serial number.",
      ta: "Four pinks from baby to mauve, each with its own serial number.",
      hi: "Four pinks from baby to mauve, each with its own serial number.",
      ml: "Four pinks from baby to mauve, each with its own serial number.",
      te: "Four pinks from baby to mauve, each with its own serial number.",
      kn: "Four pinks from baby to mauve, each with its own serial number.",
      mr: "Four pinks from baby to mauve, each with its own serial number.",
      bn: "Four pinks from baby to mauve, each with its own serial number."
    }
  },
  {
    id: "night-cream",
    kind: "jar",
    tone: ["#e9d6e6", "#9a6a8e"],
    cat: "skin",
    price: 2950,
    size: "50 g",
    name: {
      en: "Plum Silk Night Cream",
      ta: "பிளம் சில்க் நைட் கிரீம்",
      hi: "प्लम सिल्क नाइट क्रीम",
      ml: "പ്ലം സിൽക്ക് നൈറ്റ് ക്രീം",
      te: "ప్లం సిల్క్ నైట్ క్రీమ్",
      kn: "ಪ್ಲಮ್ ಸಿಲ್ಕ್ ನೈಟ್ ಕ್ರೀಮ್",
      mr: "प्लम सिल्क नाईट क्रीम",
      bn: "প্লাম সিল্ক নাইট ক্রিম"
    },
    sub: {
      en: "Overnight comfort",
      ta: "இரவு முழுவதும் ஆறுதல்",
      hi: "रात भर आराम",
      ml: "രാത്രി മുഴുവൻ ആശ്വാസം",
      te: "రాత్రి మొత్తం సౌకర్యం",
      kn: "ರಾತ್ರಿಯಿಡೀ ಆರಾಮ",
      mr: "रात्रभर आराम",
      bn: "সারারাত আরাম"
    },
    copy: {
      en: "A rich, whipped night cream that melts in and leaves skin feeling cushioned and calm by morning.",
      ta: "பணக்கார நைட் கிரீம். உருகிச் சென்று காலையில் தோலை மென்மையாகவும் அமைதியாகவும் வைக்கும்.",
      hi: "समृद्ध नाइट क्रीम जो घुल जाती है और सुबह तक त्वचा को मुलायम और शांत रखती है।",
      ml: "സമ്പന്നമായ നൈറ്റ് ക്രീം. ഉരുകി ആഗിരണം ചെയ്ത് രാവിലെ ചർമ്മത്തെ മൃദുവും ശാന്തവുമാക്കും.",
      te: "సమృద్ధమైన నైట్ క్రీమ్. కరిగి చేరి ఉదయానికి చర్మాన్ని మృదువుగా, ప్రశాంతంగా ఉంచుతుంది.",
      kn: "A rich, whipped night cream that melts in and leaves skin feeling cushioned and calm by morning.",
      mr: "A rich, whipped night cream that melts in and leaves skin feeling cushioned and calm by morning.",
      bn: "A rich, whipped night cream that melts in and leaves skin feeling cushioned and calm by morning."
    }
  },
  {
    id: "rose-mist",
    kind: "mist",
    tone: ["#f2bcc4", "#c98a94"],
    cat: "skin",
    price: 1350,
    size: "100 ml",
    name: {
      en: "Rose Petal Face Mist",
      ta: "ரோஜா இதழ் முக மிஸ்ட்",
      hi: "गुलाब पंखुड़ी फेस मिस्ट",
      ml: "റോസ് പെറ്റൽ ഫേസ് മിസ്റ്റ്",
      te: "రోజ్ పెటల్ ఫేస్ మిస్ట్",
      kn: "Rose Petal Face Mist",
      mr: "Rose Petal Face Mist",
      bn: "Rose Petal Face Mist"
    },
    sub: {
      en: "Fresh, anytime",
      ta: "எப்போதும் புத்துணர்ச்சி",
      hi: "ताज़गी, कभी भी",
      ml: "എപ്പോഴും ഫ്രഷ്",
      te: "ఎప్పుడైనా ఫ్రెష్",
      kn: "Fresh, anytime",
      mr: "Fresh, anytime",
      bn: "Fresh, anytime"
    },
    copy: {
      en: "A fine rose mist to refresh the face, set makeup or add a touch of softness through the day.",
      ta: "முகத்தை புத்துணர்ச்சியாக்க, மேக்கப்பை அமைக்க அல்லது நாள் முழுவதும் மென்மை சேர்க்க.",
      hi: "चेहरे को तरोताज़ा करने, मेकअप सेट करने या दिन भर नरमी जोड़ने के लिए।",
      ml: "മുഖം ഫ്രഷ് ആക്കാൻ, മേക്കപ്പ് സെറ്റ് ചെയ്യാൻ അല്ലെങ്കിൽ ദിവസം മുഴുവൻ മൃദുത്വം ചേർക്കാൻ.",
      te: "ముఖాన్ని ఫ్రెష్ చేయడానికి, మేకప్ సెట్ చేయడానికి లేదా రోజంతా మృదుత్వం జోడించడానికి.",
      kn: "A fine rose mist to refresh the face, set makeup or add a touch of softness through the day.",
      mr: "A fine rose mist to refresh the face, set makeup or add a touch of softness through the day.",
      bn: "A fine rose mist to refresh the face, set makeup or add a touch of softness through the day."
    }
  },
  {
    id: "body-butter",
    kind: "tube",
    tone: ["#f4bd94", "#b8705a"],
    cat: "body",
    price: 1850,
    size: "200 ml",
    name: {
      en: "Peach Nectar Body Butter",
      ta: "பீச் நெக்டார் பாடி பட்டர்",
      hi: "पीच नेक्टर बॉडी बटर",
      ml: "പീച്ച് നെക്ടർ ബോഡി ബട്ടർ",
      te: "పీచ్ నెక్టార్ బాడీ బటర్",
      kn: "Peach Nectar Body Butter",
      mr: "Peach Nectar Body Butter",
      bn: "Peach Nectar Body Butter"
    },
    sub: {
      en: "Body ritual",
      ta: "உடல் சடங்கு",
      hi: "बॉडी रिचुअल",
      ml: "ബോഡി റിച്വൽ",
      te: "బాడీ రిచువల్",
      kn: "Body ritual",
      mr: "Body ritual",
      bn: "Body ritual"
    },
    copy: {
      en: "A creamy, softly scented body butter that leaves skin smooth with a warm, peachy glow.",
      ta: "கிரீமி, மென்மையான வாசனையுள்ள பாடி பட்டர். தோலை மென்மையாக்கி பீச் போன்ற பிரகாசம் தரும்.",
      hi: "क्रीमी, हल्की खुशबू वाला बॉडी बटर। त्वचा को मुलायम और पीच जैसी चमक देता है।",
      ml: "ക്രീമി, മൃദുവായ സുഗന്ധമുള്ള ബോഡി ബട്ടർ. ചർമ്മത്തെ മൃദുവാക്കി പീച്ച് പോലുള്ള പ്രകാശം നൽകും.",
      te: "క్రీమీ, మృదువైన సువాసనతో బాడీ బటర్. చర్మాన్ని మృదువుగా చేసి పీచ్ లాంటి ప్రకాశం ఇస్తుంది.",
      kn: "A creamy, softly scented body butter that leaves skin smooth with a warm, peachy glow.",
      mr: "A creamy, softly scented body butter that leaves skin smooth with a warm, peachy glow.",
      bn: "A creamy, softly scented body butter that leaves skin smooth with a warm, peachy glow."
    }
  },
  {
    id: "skin-tint",
    kind: "foundation",
    tone: ["#dcaa86", "#6b4a63"],
    cat: "makeup",
    price: 1950,
    size: "30 ml",
    name: {
      en: "Velvet Skin Tint",
      ta: "வெல்வெட் ஸ்கின் டின்ட்",
      hi: "वेलवेट स्किन टिंट",
      ml: "വെൽവെറ്റ് സ്കിൻ ടിന്റ്",
      te: "వెల్వెట్ స్కిన్ టింట్",
      kn: "Velvet Skin Tint",
      mr: "Velvet Skin Tint",
      bn: "Velvet Skin Tint"
    },
    sub: {
      en: "Light, velvet finish",
      ta: "இலேசான, இயற்கை முடிவு",
      hi: "हल्का, प्राकृतिक फिनिश",
      ml: "ലഘുവായ, സ്വാഭാവിക ഫിനിഷ്",
      te: "తేలికైన, సహజ ఫినిష్",
      kn: "Light, velvet finish",
      mr: "Light, velvet finish",
      bn: "Light, velvet finish"
    },
    copy: {
      en: "A lightweight tint that evens out skin and leaves a soft, velvet finish.",
      ta: "தோலை சமன் செய்து மென்மையான, இயற்கை வெல்வெட் முடிவைத் தரும் இலேசான டின்ட்.",
      hi: "त्वचा को समान बनाकर मुलायम, प्राकृतिक मखमली फिनिश देने वाला हल्का टिंट।",
      ml: "ചർമ്മത്തെ ഏകീകരിച്ച് മൃദുവായ, സ്വാഭാവിക വെൽവെറ്റ് ഫിനിഷ് നൽകുന്ന ലഘു ടിന്റ്.",
      te: "చర్మాన్ని సమం చేసి మృదువైన, సహజ వెల్వెట్ ఫినిష్ ఇచ్చే తేలికైన టింట్.",
      kn: "A lightweight tint that evens out skin and leaves a soft, velvet finish.",
      mr: "A lightweight tint that evens out skin and leaves a soft, velvet finish.",
      bn: "A lightweight tint that evens out skin and leaves a soft, velvet finish."
    }
  },
  {
    id: "cleansing-oil",
    kind: "oil",
    tone: ["#f1e1a2", "#a8823a"],
    cat: "skin",
    price: 1650,
    size: "100 ml",
    name: {
      en: "Jasmine Cleansing Oil",
      ta: "மல்லிகை க்ளென்சிங் ஆயில்",
      hi: "चमेली क्लींजिंग ऑयल",
      ml: "ജാസ്മിൻ ക്ലെൻസിംഗ് ഓയിൽ",
      te: "జాజిక క్లెన్సింగ్ ఆయిల్",
      kn: "Jasmine Cleansing Oil",
      mr: "Jasmine Cleansing Oil",
      bn: "Jasmine Cleansing Oil"
    },
    sub: {
      en: "Gentle first step",
      ta: "மென்மையான முதல் படி",
      hi: "कोमल पहला कदम",
      ml: "മൃദുവായ ആദ്യ ഘട്ടം",
      te: "మృదువైన మొదటి అడుగు",
      kn: "Gentle first step",
      mr: "Gentle first step",
      bn: "Gentle first step"
    },
    copy: {
      en: "A silky cleansing oil that melts away makeup and the day, scented with white jasmine.",
      ta: "மேக்கப் மற்றும் நாள் முழுவதையும் உருகச் செய்யும் பட்டுபோன்ற க்ளென்சிங் ஆயில். வெள்ளை மல்லிகை வாசனை.",
      hi: "मेकअप और दिन की थकान घोलने वाला रेशमी क्लींजिंग ऑयल। सफेद चमेली की खुशबू।",
      ml: "മേക്കപ്പും ദിവസവും ഉരുക്കി നീക്കുന്ന പട്ടുപോലുള്ള ക്ലെൻസിംഗ് ഓയിൽ. വെള്ള ജാസ്മിൻ സുഗന്ധം.",
      te: "మేకప్ మరియు రోజును కరిగించే పట్టులాంటి క్లెన్సింగ్ ఆయిల్. తెల్ల జాజిక సువాసన.",
      kn: "A silky cleansing oil that melts away makeup and the day, scented with white jasmine.",
      mr: "A silky cleansing oil that melts away makeup and the day, scented with white jasmine.",
      bn: "A silky cleansing oil that melts away makeup and the day, scented with white jasmine."
    }
  },
  {
    id: "highlighter",
    kind: "compact",
    tone: ["#e9c68c", "#7a4b2f"],
    cat: "makeup",
    price: 1450,
    size: "8 g",
    name: {
      en: "Golden Hour Highlighter",
      ta: "கோல்டன் அவர் ஹைலைட்டர்",
      hi: "गोल्डन ऑवर हाइलाइटर",
      ml: "ഗോൾഡൻ അവർ ഹൈലൈറ്റർ",
      te: "గోల్డెన్ అవర్ హైలైటర్",
      kn: "Golden Hour Highlighter",
      mr: "Golden Hour Highlighter",
      bn: "Golden Hour Highlighter"
    },
    sub: {
      en: "Shade · Champagne gold",
      ta: "நிழல் · షాంపെയ്ன் தங்கம்",
      hi: "शेड · शैम्पेन गोल्ड",
      ml: "ഷേഡ് · ഷാംപെയ്ൻ ഗോൾഡ്",
      te: "షేడ్ · షాంపేన్ గోల్డ్",
      kn: "Shade · Champagne gold",
      mr: "Shade · Champagne gold",
      bn: "Shade · Champagne gold"
    },
    copy: {
      en: "A finely milled champagne-gold highlighter for a soft, sunlit glow on cheeks and brow bones.",
      ta: "கன்னங்கள் மற்றும் புருவ எலும்புகளில் மென்மையான, சூரிய ஒளி போன்ற பிரகாசத்திற்கு.",
      hi: "गालों और भौंह की हड्डियों पर नरम, धूप जैसी चमक के लिए।",
      ml: "കവിളുകളിലും പുരിക എല്ലുകളിലും മൃദുവായ, സൂര്യപ്രകാശം പോലുള്ള തിളക്കത്തിന്.",
      te: "బుగ్గలు మరియు కనుబొమ్మ ఎముకలపై మృదువైన, సూర్యకాంతి లాంటి ప్రకాశం కోసం.",
      kn: "A finely milled champagne-gold highlighter for a soft, sunlit glow on cheeks and brow bones.",
      mr: "A finely milled champagne-gold highlighter for a soft, sunlit glow on cheeks and brow bones.",
      bn: "A finely milled champagne-gold highlighter for a soft, sunlit glow on cheeks and brow bones."
    }
  },
  {
    id: "sandal-oil",
    kind: "oil",
    tone: ["#e4b57a", "#7a4b2f"],
    cat: "body",
    price: 1750,
    size: "100 ml",
    name: {
      en: "Sandalwood Hair & Body Oil",
      ta: "சந்தன முடி & உடல் எண்ணெய்",
      hi: "चंदन बाल एवं शरीर तेल",
      ml: "ചന്ദനം മുടി & ശരീര ഓയിൽ",
      te: "చందనం జుట్టు & శరీర నూనె",
      kn: "Sandalwood Hair & Body Oil",
      mr: "Sandalwood Hair & Body Oil",
      bn: "Sandalwood Hair & Body Oil"
    },
    sub: {
      en: "Warm, silky finish",
      ta: "சூடான, பட்டு முடிவு",
      hi: "गर्म, रेशमी फिनिश",
      ml: "ചൂടുള്ള, പട്ട് ഫിനിഷ്",
      te: "వెచ్చని, పట్టు ఫినిష్",
      kn: "Warm, silky finish",
      mr: "Warm, silky finish",
      bn: "Warm, silky finish"
    },
    copy: {
      en: "A lightweight dry oil for hair ends and skin, with the quiet warmth of sandalwood.",
      ta: "முடி முனைகள் மற்றும் தோலுக்கு இலேசான ட்ரை ஆயில். சந்தனத்தின் அமைதியான வெப்பம்.",
      hi: "बालों के सिरे और त्वचा के लिए हल्का ड्राई ऑयल। चंदन की शांत गर्माहट।",
      ml: "മുടിയുടെ അറ്റങ്ങൾക്കും ചർമ്മത്തിനും ലഘു ഡ്രൈ ഓയിൽ. ചന്ദനത്തിന്റെ ശാന്തമായ ചൂട്.",
      te: "జుట్టు చివరలు మరియు చర్మానికి తేలికైన డ్రై ఆయిల్. చందనం యొక్క నిశ్శబ్ద వెచ్చదనం.",
      kn: "A lightweight dry oil for hair ends and skin, with the quiet warmth of sandalwood.",
      mr: "A lightweight dry oil for hair ends and skin, with the quiet warmth of sandalwood.",
      bn: "A lightweight dry oil for hair ends and skin, with the quiet warmth of sandalwood."
    }
  },
  {
    id: "hair-oil",
    kind: "oil",
    tone: ["#c9d3a8", "#5f6b3a"],
    cat: "body",
    price: 1450,
    size: "100 ml",
    name: {
      en: "Bhringraj Herbal Hair Oil",
      ta: "பிரிங்கராஜ் மூலிகை முடி எண்ணெய்",
      hi: "भृंगराज हर्बल हेयर ऑयल",
      ml: "ഭൃംഗരാജ് ഹെർബൽ ഹെയർ ഓയിൽ",
      te: "భృంగరాజ్ హెర్బల్ హెయిర్ ఆయిల్",
      kn: "Bhringraj Herbal Hair Oil",
      mr: "Bhringraj Herbal Hair Oil",
      bn: "Bhringraj Herbal Hair Oil"
    },
    sub: {
      en: "Herbal · Nourishing",
      ta: "மூலிகை · ஊட்டமளிக்கும்",
      hi: "हर्बल · पोषक",
      ml: "ഹെർബൽ · പോഷകം",
      te: "హెర్బల్ · పోషకం",
      kn: "Herbal · Nourishing",
      mr: "Herbal · Nourishing",
      bn: "Herbal · Nourishing"
    },
    copy: {
      en: "A cold-infused herbal hair oil with bhringraj, amla and hibiscus. Strengthens roots and leaves hair soft, glossy and light.",
      ta: "பிரிங்கராஜ், நெல்லிக்காய், செம்பருத்தி கொண்ட மூலிகை எண்ணெய். வேர்களை வலுப்படுத்தி முடியை மென்மையாகவும் பளபளப்பாகவும் வைக்கும்.",
      hi: "भृंगराज, आंवला और हिबिस्कस वाला हर्बल तेल। जड़ों को मजबूत करता है, बाल नरम और चमकदार बनाता है।",
      ml: "ഭൃംഗരാജ്, നെല്ലിക്ക, ചെമ്പരത്തി ഉള്ള ഹെർബൽ ഓയിൽ. വേരുകൾ ശക്തിപ്പെടുത്തി മുടി മൃദുവും തിളക്കമുള്ളതുമാക്കും.",
      te: "భృంగరాజ్, ఉసిరి, మందారతో హెర్బల్ ఆయిల్. వేళ్ళను బలపరచి జుట్టును మృదువుగా, మెరుస్తూ ఉంచుతుంది.",
      kn: "A cold-infused herbal hair oil with bhringraj, amla and hibiscus. Strengthens roots and leaves hair soft, glossy and light.",
      mr: "A cold-infused herbal hair oil with bhringraj, amla and hibiscus. Strengthens roots and leaves hair soft, glossy and light.",
      bn: "A cold-infused herbal hair oil with bhringraj, amla and hibiscus. Strengthens roots and leaves hair soft, glossy and light."
    }
  },
  {
    id: "perfume",
    kind: "mist",
    tone: ["#f0d9c2", "#b98a5c"],
    cat: "body",
    price: 3250,
    size: "50 ml",
    name: {
      en: "Jasmine & Sandal Perfume",
      ta: "மல்லிகை & சந்தன வாசனை",
      hi: "चमेली एवं चंदन परफ्यूम",
      ml: "ജാസ്മിൻ & ചന്ദനം പെർഫ്യൂം",
      te: "జాజిక & చందనం పర్ఫ్యూమ్",
      kn: "Jasmine & Sandal Perfume",
      mr: "Jasmine & Sandal Perfume",
      bn: "Jasmine & Sandal Perfume"
    },
    sub: {
      en: "Eau de parfum",
      ta: "ஓ டெ పர்பூம்",
      hi: "ओ द पर्फ्यूम",
      ml: "ഓ ഡെ പെർഫ്യൂം",
      te: "ఓ డె పర్ఫ్యూమ్",
      kn: "ಯೂ ಡಿ ಪರ್ಫ್ಯೂಮ್",
      mr: "ओ द पर्फ्यूम",
      bn: "ও দ্য পারফিউম"
    },
    copy: {
      en: "A warm botanical eau de parfum of white jasmine, sandalwood and vetiver. Soft on arrival, quietly lasting through the evening.",
      ta: "வெள்ளை மல்லிகை, சந்தனம், வெட்டிவேர். மென்மையாகத் தொடங்கி மாலை வரை நீடிக்கும்.",
      hi: "सफेद चमेली, चंदन और वेटीवर। नरम शुरुआत, शाम तक टिकने वाली खुशबू।",
      ml: "വെള്ള ജാസ്മിൻ, ചന്ദനം, വെറ്റിവർ. മൃദുവായ തുടക്കം, വൈകുന്നേരം വരെ നിലനിൽക്കും.",
      te: "తెల్ల జాజిక, చందనం, వెటివర్. మృదువైన ప్రారంభం, సాయంత్రం వరకు నిలుస్తుంది.",
      kn: "A warm botanical eau de parfum of white jasmine, sandalwood and vetiver. Soft on arrival, quietly lasting through the evening.",
      mr: "A warm botanical eau de parfum of white jasmine, sandalwood and vetiver. Soft on arrival, quietly lasting through the evening.",
      bn: "A warm botanical eau de parfum of white jasmine, sandalwood and vetiver. Soft on arrival, quietly lasting through the evening."
    }
  },
  {
    id: "herbal-shampoo",
    kind: "tube",
    tone: ["#d7e3cf", "#6f8a5a"],
    cat: "body",
    price: 850,
    size: "250 ml",
    name: {
      en: "Herbal Silk Shampoo",
      ta: "மூலிகை சில்க் ஷாம்பு",
      hi: "हर्बल सिल्क शैम्पू",
      ml: "ഹെർബൽ സിൽക്ക് ഷാംപൂ",
      te: "హెర్బల్ సిల్క్ షాంపూ",
      kn: "Herbal Silk Shampoo",
      mr: "Herbal Silk Shampoo",
      bn: "Herbal Silk Shampoo"
    },
    sub: {
      en: "Gentle daily wash",
      ta: "மென்மையான தினசரி கழுவுதல்",
      hi: "कोमल दैनिक धुलाई",
      ml: "മൃദുവായ ദൈനംദിന കഴുകൽ",
      te: "మృదువైన రోజువారీ వాష్",
      kn: "ಮೃದು ದೈನಂದಿನ ತೊಳೆಯುವಿಕೆ",
      mr: "मऊ दैनंदिन धुणे",
      bn: "নরম দৈনন্দিন ধোয়া"
    },
    copy: {
      en: "A sulphate-free shampoo with shikakai, reetha and aloe vera. Cleanses gently and leaves hair silky, shiny and easy to style.",
      ta: "சிக்காய், ரீத்தா, கற்றாழை கொண்ட சல்பேட்-இல்லா ஷாம்பு. மென்மையாக சுத்தம் செய்து முடியை பட்டுபோல வைக்கும்.",
      hi: "शिकाकाई, रीठा और एलोवेरा वाला सल्फेट-फ्री शैम्पू। कोमल सफाई, रेशमी चमकदार बाल।",
      ml: "ശിക്കായി, രീത, കറ്റാർവാഴ ഉള്ള സൾഫേറ്റ്-ഫ്രീ ഷാംപൂ. മൃദുവായി വൃത്തിയാക്കി മുടി പട്ടുപോലെ വയ്ക്കും.",
      te: "శికకాయ, రీత, కలబందతో సల్ఫేట్-ఫ్రీ షాంపూ. మృదువుగా శుభ్రం చేసి జుట్టును పట్టులా ఉంచుతుంది.",
      kn: "A sulphate-free shampoo with shikakai, reetha and aloe vera. Cleanses gently and leaves hair silky, shiny and easy to style.",
      mr: "A sulphate-free shampoo with shikakai, reetha and aloe vera. Cleanses gently and leaves hair silky, shiny and easy to style.",
      bn: "A sulphate-free shampoo with shikakai, reetha and aloe vera. Cleanses gently and leaves hair silky, shiny and easy to style."
    }
  },
];

export const categories: { key: "all" | Cat; label: L }[] = [
  { key: "all", label: { en: "All", ta: "அனைத்தும்", hi: "सभी", ml: "എല്ലാം", te: "అన్నీ" } },
  { key: "skin", label: { en: "Skincare", ta: "தோல் பராமரிப்பு", hi: "स्किनकेयर", ml: "സ്കിൻകെയർ", te: "స్కిన్‌కేర్" } },
  { key: "makeup", label: { en: "Makeup", ta: "மேக்கப்", hi: "मेकअप", ml: "മേക്കപ്പ്", te: "మేకప్" } },
  { key: "body", label: { en: "Body & hair", ta: "உடல் & முடி", hi: "शरीर एवं बाल", ml: "ശരീരം & മുടി", te: "శరీరం & జుట్టు" } },
];

export type Ritual = {
  id: string;
  title: L;
  when: L;
  copy: L;
  items: string[];
};

export const rituals: Ritual[] = [
  {
    id: "morning",
    when: { en: "Morning", ta: "காலை", hi: "सुबह", ml: "രാവിലെ", te: "ఉదయం" },
    title: {
      en: "Morning Glow",
      ta: "காலை பிரகாசம்",
      hi: "सुबह की चमक",
      ml: "രാവിലെ തിളക്കം",
      te: "ఉదయ ప్రకాశం",
        kn: "ಮುಂಜಾನೆ ಹೊಳಪು",
        mr: "सकाळची चमक",
        bn: "সকালের উজ্জ্বলতা",
      },
    copy: {
      en: "Mist, serum and a skin tint — a quick, luminous start to the day.",
      ta: "மிஸ்ட், சீரம் மற்றும் ஸ்கின் டின்ட் — விரைவான, பிரகாசமான தொடக்கம்.",
      hi: "मिस्ट, सीरम और स्किन टिंट — दिन की तेज़, चमकदार शुरुआत।",
      ml: "മിസ്റ്റ്, സീറം, സ്കിൻ ടിന്റ് — വേഗത്തിലുള്ള, പ്രകാശമുള്ള തുടക്കം.",
      te: "మిస్ట్, సీరం మరియు స్కిన్ టింట్ — వేగవంతమైన, ప్రకాశవంతమైన ప్రారంభం.",
      kn: "Mist, serum and a skin tint — a quick, luminous start to the day.",
      mr: "Mist, serum and a skin tint — a quick, luminous start to the day.",
      bn: "Mist, serum and a skin tint — a quick, luminous start to the day."
    },
    items: ["rose-mist", "eclat", "skin-tint"]
  },
  {
    id: "occasion",
    when: { en: "Occasions", ta: "விழாக்கள்", hi: "अवसर", ml: "അവസരങ്ങൾ", te: "సందర్భాలు" },
    title: {
      en: "Occasion Ready",
      ta: "விழாவுக்கு தயார்",
      hi: "अवसर के लिए तैयार",
      ml: "അവസരത്തിന് തയ്യാർ",
      te: "సందర్భానికి సిద్ధం",
        kn: "ಸಂದರ್ಭಕ್ಕೆ ಸಿದ್ಧ",
        mr: "प्रसंग तयार",
        bn: "উপলক্ষের জন্য প্রস্তুত",
      },
    copy: {
      en: "A velvet lip, a golden highlight and a flawless tint for the evenings that matter.",
      ta: "வெல்வெட் உதடு, தங்க ஹைலைட் மற்றும் பிழையற்ற டின்ட் — முக்கியமான மாலைகளுக்கு.",
      hi: "मखमली होंठ, सुनहरी चमक और निर्दोष टिंट — खास शामों के लिए।",
      ml: "വെൽവെറ്റ് ലിപ്, ഗോൾഡൻ ഹൈലൈറ്റ്, അപൂർണ്ണമല്ലാത്ത ടിന്റ് — പ്രധാന സന്ധ്യകൾക്ക്.",
      te: "వెల్వెట్ లిప్, గోల్డెన్ హైలైట్ మరియు నిర్దోష టింట్ — ముఖ్యమైన సాయంత్రాలకు.",
      kn: "A velvet lip, a golden highlight and a flawless tint for the evenings that matter.",
      mr: "A velvet lip, a golden highlight and a flawless tint for the evenings that matter.",
      bn: "A velvet lip, a golden highlight and a flawless tint for the evenings that matter."
    },
    items: ["lipstick-red", "skin-tint", "highlighter"]
  },
  {
    id: "evening",
    when: { en: "Evening", ta: "மாலை", hi: "शाम", ml: "വൈകുന്നേരം", te: "సాయంత్రం" },
    title: {
      en: "Evening Unwind",
      ta: "மாலை ஓய்வு",
      hi: "शाम की राहत",
      ml: "വൈകുന്നേരം വിശ്രമം",
      te: "సాయంత్ర విశ్రాంతి",
        kn: "ಸಂಜೆ ವಿಶ್ರಾಂತಿ",
        mr: "संध्याकाळची विश्रांती",
        bn: "সন্ধ্যার বিশ্রাম",
      },
    copy: {
      en: "Cleanse, soften and let the night cream and sandalwood oil do their quiet work.",
      ta: "சுத்தம் செய்து, மென்மையாக்கி, நைட் கிரீம் மற்றும் சந்தன எண்ணெய் அமைதியாக வேலை செய்யட்டும்.",
      hi: "साफ करें, मुलायम बनाएं, नाइट क्रीम और चंदन तेल अपना काम करें।",
      ml: "വൃത്തിയാക്കി, മൃദുവാക്കി, നൈറ്റ് ക്രീമും ചന്ദന ഓയിലും ശാന്തമായി പ്രവർത്തിക്കട്ടെ.",
      te: "శుభ్రం చేసి, మృదువుగా చేసి, నైట్ క్రీమ్ మరియు చందనం నూనె నిశ్శబ్దంగా పని చేయనివ్వండి.",
      kn: "Cleanse, soften and let the night cream and sandalwood oil do their quiet work.",
      mr: "Cleanse, soften and let the night cream and sandalwood oil do their quiet work.",
      bn: "Cleanse, soften and let the night cream and sandalwood oil do their quiet work."
    },
    items: ["cleansing-oil", "night-cream", "sandal-oil"]
  },
  {
    id: "gifting",
    when: { en: "Gifting", ta: "பரிசு", hi: "उपहार", ml: "സമ്മാനം", te: "బహుమతి" },
    title: {
      en: "The Gift of Luxury",
      ta: "ஆடம்பர பரிசு",
      hi: "लक्जरी का उपहार",
      ml: "ലക്ഷ്വറി സമ്മാനം",
      te: "లగ్జరీ బహుమతి",
        kn: "ಐಷಾರಾಮದ ಉಡುಗೊರೆ",
        mr: "ऐश्वर्याची भेट",
        bn: "বিলাসের উপহার",
      },
    copy: {
      en: "Our signature serum, a plum-rose lip and a peach body butter — ready to give.",
      ta: "சிக்னேச்சர் சீரம், பிளம்-ரோஸ் உதடு மற்றும் பீச் பாடி பட்டர் — பரிசாகத் தயாராக.",
      hi: "सिग्नेचर सीरम, प्लम-रोज़ लिप और पीच बॉडी बटर — देने के लिए तैयार।",
      ml: "സിഗ്നേച്ചർ സീറം, പ്ലം-റോസ് ലിപ്, പീച്ച് ബോഡി ബട്ടർ — സമ്മാനിക്കാൻ തയ്യാർ.",
      te: "సిగ్నేచర్ సీరం, ప్లం-రోజ్ లిప్ మరియు పీచ్ బాడీ బటర్ — ఇవ్వడానికి సిద్ధం.",
      kn: "Our signature serum, a plum-rose lip and a peach body butter — ready to give.",
      mr: "Our signature serum, a plum-rose lip and a peach body butter — ready to give.",
      bn: "Our signature serum, a plum-rose lip and a peach body butter — ready to give."
    },
    items: ["eclat", "lipstick-pink", "body-butter"]
  },
];

export type Service = {
  id: string;
  name: L;
  desc: L;
  mins: number;
  price: number;
};
export type ServiceGroup = {
  key: string;
  label: L;
  intro: L;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    key: "massage",
    label: { en: "Body massage", ta: "உடல் மசாஜ்", hi: "बॉडी मसाज", ml: "ബോഡി മസാജ്", te: "బాడీ మసాజ్" },
    intro: {
      en: "A calming full-body massage in our women-only luxury salon.",
      ta: "பெண்களுக்கு மட்டுமான எங்கள் ஆடம்பர சலூனில் அமைதி தரும் முழு உடல் மசாஜ்.",
      hi: "सिर्फ़ महिलाओं के हमारे लग्ज़री सैलून में सुकून देने वाली फुल-बॉडी मसाज।",
      ml: "സ്ത്രീകൾക്കു മാത്രമുള്ള ഞങ്ങളുടെ ലക്ഷ്വറി സലൂണിൽ ശാന്തമായ ഫുൾ-ബോഡി മസാജ്.",
<<<<<<< HEAD
      te: "మహిళలకు మాత్రమే అయిన మా లగ్జరీ సెలూన్‌లో ప్రశాంతమైన ఫుల్-బాడీ మసాజ్."
=======
      te: "మహిళలకు మాత్రమే అయిన మా లగ్జరీ సెలూన్‌లో ప్రశాంతమైన ఫుల్-బాడీ మసాజ్.",
>>>>>>> origin/main
    },
    items: [
      {
        id: "b1",
        name: {
          en: "Body massage",
          ta: "உடல் மசாஜ்",
          hi: "बॉडी मसाज",
          ml: "ബോഡി മസാജ്",
          te: "బాడీ మసాజ్",
<<<<<<< HEAD
      kn: "Body massage",
      mr: "Body massage",
      bn: "Body massage"
    },
=======
        },
>>>>>>> origin/main
        desc: {
          en: "A calming full-body massage with warm oils.",
          ta: "சூடான எண்ணெய்களுடன் அமைதியான முழு உடல் மசாஜ்.",
          hi: "गर्म तेलों के साथ शांत पूर्ण शरीर मसाज।",
          ml: "ചൂടുള്ള ഓയിലുകളോടെ ശാന്തമായ മുഴുവൻ ശരീര മസാജ്.",
          te: "వెచ్చని నూనెలతో ప్రశాంతమైన పూర్తి శరీర మసాజ్.",
<<<<<<< HEAD
        kn: "ಬೆಚ್ಚಗಿನ ಎಣ್ಣೆಗಳೊಂದಿಗೆ ಶಾಂತಪೂರ್ಣ ಪೂರ್ಣ ದೇಹ ಮಸಾಜ್.",
        mr: "उबदार तेलांसह शांत पूर्ण शरीर मसाज.",
        bn: "উষ্ণ তেল সহ শান্ত সম্পূর্ণ শরীর ম্যাসাজ।",
      },
        mins: 60,
        price: 2800,
      },
    ]
=======
        },
        mins: 60,
        price: 2800,
      },
    ],
>>>>>>> origin/main
  },
  {
    key: "facial",
    label: { en: "Facials", ta: "ஃபேஷியல்கள்", hi: "फेशियल", ml: "ഫേഷ്യലുകൾ", te: "ఫేషియల్స్" },
    intro: {
      en: "Normal and hydra facials, finished with our own herbal products.",
      ta: "சாதாரண மற்றும் ஹைட்ரா ஃபேஷியல்கள், எங்கள் மூலிகைப் பொருட்களுடன் நிறைவு.",
      hi: "नॉर्मल और हाइड्रा फेशियल, हमारे अपने हर्बल प्रोडक्ट्स के साथ।",
      ml: "നോർമൽ, ഹൈഡ്ര ഫേഷ്യലുകൾ, ഞങ്ങളുടെ സ്വന്തം ഹെർബൽ ഉൽപ്പന്നങ്ങളോടെ.",
<<<<<<< HEAD
      te: "నార్మల్, హైడ్రా ఫేషియల్స్, మా సొంత హెర్బల్ ఉత్పత్తులతో."
=======
      te: "నార్మల్, హైడ్రా ఫేషియల్స్, మా సొంత హెర్బల్ ఉత్పత్తులతో.",
>>>>>>> origin/main
    },
    items: [
      {
        id: "s1",
        name: {
          en: "Normal facial",
          ta: "சாதாரண ஃபேஷியல்",
          hi: "नॉर्मल फेशियल",
          ml: "നോർമൽ ഫേഷ്യൽ",
          te: "నార్మల్ ఫేషియల్",
<<<<<<< HEAD
      kn: "Normal facial",
      mr: "Normal facial",
      bn: "Normal facial"
    },
=======
        },
>>>>>>> origin/main
        desc: {
          en: "Cleanse, exfoliate, massage and a glow mask.",
          ta: "சுத்தம், எக்ஸ்ஃபோலியேட், மசாஜ் மற்றும் குளோ மாஸ்க்.",
          hi: "क्लींज, एक्सफोलिएट, मसाज और ग्लो मास्क।",
          ml: "ക്ലെൻസ്, എക്സ്ഫോളിയേറ്റ്, മസാജ്, ഗ്ലോ മാസ്ക്.",
          te: "క్లెన్స్, ఎక్స్‌ఫోలియేట్, మసాజ్ మరియు గ్లో మాస్క్.",
<<<<<<< HEAD
        kn: "ಶುದ್ಧೀಕರಣ, ಎಕ್ಸ್‌ಫೋಲಿಯೇಟ್, ಮಸಾಜ್ ಮತ್ತು ಗ್ಲೋ ಮಾಸ್ಕ್.",
        mr: "स्वच्छता, एक्स्फोलिएट, मसाज आणि ग्लो मास्क.",
        bn: "পরিষ্কার, এক্সফোলিয়েট, ম্যাসাজ ও গ্লো মাস্ক।",
      },
=======
        },
>>>>>>> origin/main
        mins: 60,
        price: 2200,
      },
      {
        id: "s2",
        name: {
          en: "Hydra facial",
          ta: "ஹைட்ரா ஃபேஷியல்",
          hi: "हाइड्रा फेशियल",
          ml: "ഹൈഡ്ര ഫേഷ്യൽ",
          te: "హైడ్రా ఫేషియల్",
<<<<<<< HEAD
      kn: "Hydra facial",
      mr: "Hydra facial",
      bn: "Hydra facial"
    },
=======
        },
>>>>>>> origin/main
        desc: {
          en: "Deep hydration for a fresher, brighter look.",
          ta: "புத்துணர்ச்சியான, பிரகாசமான தோற்றத்திற்கு ஆழ்ந்த ஹைட்ரேஷன்.",
          hi: "ताज़ा, चमकदार लुक के लिए गहरी हाइड्रेशन।",
          ml: "ഫ്രഷ്, ബ്രൈറ്റ് ലുക്കിന് ആഴത്തിലുള്ള ഹൈഡ്രേഷൻ.",
          te: "ఫ్రెష్, బ్రైట్ లుక్ కోసం లోతైన హైడ్రేషన్.",
<<<<<<< HEAD
        kn: "ತಾಜಾ, ಪ್ರಕಾಶಮಾನ ನೋಟಕ್ಕಾಗಿ ಆಳವಾದ ತೇವಾಂಶ.",
        mr: "ताजे, उज्ज्वल दिसण्यासाठी खोल हायड्रेशन.",
        bn: "তাজা, উজ্জ্বল চেহারার জন্য গভীর হাইড্রেশন।",
      },
        mins: 75,
        price: 3200,
      },
    ]
=======
        },
        mins: 75,
        price: 3200,
      },
    ],
>>>>>>> origin/main
  },
  {
    key: "consult",
    label: { en: "Consultation", ta: "ஆலோசனை", hi: "कंसल्टेशन", ml: "കൺസൾട്ടേഷൻ", te: "కన్సల్టేషన్" },
    intro: {
      en: "Start with a one-to-one chat about your skin and beauty goals.",
      ta: "உங்கள் சருமம் மற்றும் அழகு இலக்குகள் பற்றி தனிப்பட்ட உரையாடலுடன் தொடங்குங்கள்.",
      hi: "अपनी स्किन और ब्यूटी लक्ष्यों पर एक-से-एक बातचीत से शुरुआत करें।",
      ml: "നിങ്ങളുടെ ചർമ്മത്തെയും സൗന്ദര്യലക്ഷ്യങ്ങളെയും കുറിച്ചുള്ള വ്യക്തിഗത സംഭാഷണത്തോടെ തുടങ്ങൂ.",
<<<<<<< HEAD
      te: "మీ చర్మం, అందం లక్ష్యాల గురించి ఒకరితో ఒకరు మాట్లాడటంతో మొదలుపెట్టండి."
=======
      te: "మీ చర్మం, అందం లక్ష్యాల గురించి ఒకరితో ఒకరు మాట్లాడటంతో మొదలుపెట్టండి.",
>>>>>>> origin/main
    },
    items: [
      {
        id: "c1",
        name: {
          en: "Beauty consultation",
          ta: "அழகு ஆலோசனை",
          hi: "ब्यूटी कंसल्टेशन",
          ml: "ബ്യൂട്ടി കൺസൾട്ടേഷൻ",
          te: "బ్యూటీ కన్సల్టేషన్",
<<<<<<< HEAD
      kn: "Beauty consultation",
      mr: "Beauty consultation",
      bn: "Beauty consultation"
    },
=======
        },
>>>>>>> origin/main
        desc: {
          en: "A one-to-one session with our beauty expert to plan the right skin and beauty routine for you.",
          ta: "உங்களுக்கு ஏற்ற சரும மற்றும் அழகு பராமரிப்பைத் திட்டமிட, எங்கள் அழகு நிபுணருடன் தனிப்பட்ட ஆலோசனை.",
          hi: "आपके लिए सही स्किन और ब्यूटी रूटीन तय करने के लिए हमारी ब्यूटी एक्सपर्ट के साथ एक-से-एक सत्र।",
          ml: "നിങ്ങൾക്ക് ചേരുന്ന ചർമ്മ-സൗന്ദര്യ പരിചരണം തീരുമാനിക്കാൻ ഞങ്ങളുടെ ബ്യൂട്ടി വിദഗ്ധയുമായുള്ള വ്യക്തിഗത സെഷൻ.",
          te: "మీకు సరిపోయే చర్మ, అందం సంరక్షణను నిర్ణయించడానికి మా బ్యూటీ నిపుణురాలితో ఒకరితో ఒకరు సెషన్.",
<<<<<<< HEAD
        kn: "A one-to-one session with our beauty expert to plan the right skin and beauty routine for you.",
        mr: "A one-to-one session with our beauty expert to plan the right skin and beauty routine for you.",
        bn: "A one-to-one session with our beauty expert to plan the right skin and beauty routine for you.",
      },
        mins: 30,
        price: 500,
      },
    ]
=======
        },
        mins: 30,
        price: 500,
      },
    ],
>>>>>>> origin/main
  },
];

// Extra treatments added to the existing groups.
const extraServices: [string, Service][] = [
  ["massage", { id: "b4", name: { en: "Herbal oil massage", ta: "மூலிகை எண்ணெய் மசாஜ்", hi: "हर्बल ऑयल मसाज", ml: "ഹെർബൽ ഓയിൽ മസാജ്", te: "హెర్బల్ ఆయిల్ మసాజ్",
      kn: "Herbal oil massage",
      mr: "Herbal oil massage",
      bn: "Herbal oil massage"
    }, desc: { en: "Warm herbal oils worked in with slow, steady strokes.", ta: "சூடான மூலிகை எண்ணெய்களுடன் மெதுவான மசாஜ்.", hi: "गर्म हर्बल तेलों के साथ धीमी, स्थिर मसाज।", ml: "ചൂടുള്ള ഹെർബൽ എണ്ണകളോടെ പതുക്കെയുള്ള മസാജ്.", te: "వెచ్చని హెర్బల్ నూనెలతో నెమ్మదైన మసాజ్.",
        kn: "ನಿಧಾನ, ಸ್ಥಿರ ಸ್ಟ್ರೋಕ್‌ಗಳೊಂದಿಗೆ ಬೆಚ್ಚಗಿನ ಹರ್ಬಲ್ ಎಣ್ಣೆಗಳು.",
        mr: "मंद, स्थिर स्ट्रोकसह उबदार हर्बल तेले.",
        bn: "ধীর, স্থির স্ট্রোক সহ উষ্ণ হার্বাল তেল।",
      }, mins: 60, price: 3000 }],
  ["massage", { id: "b5", name: { en: "Hot stone massage", ta: "ஹாட் ஸ்டோன் மசாஜ்", hi: "हॉट स्टोन मसाज", ml: "ഹോട്ട് സ്റ്റോൺ മസാജ്", te: "హాట్ స్టోన్ మసాజ్",
      kn: "Hot stone massage",
      mr: "Hot stone massage",
      bn: "Hot stone massage"
    }, desc: { en: "Warm basalt stones to release a tight back and legs.", ta: "இறுக்கமான முதுகு, கால்களை தளர்த்தும் சூடான கற்கள்.", hi: "पीठ और पैरों की जकड़न खोलते गर्म पत्थर।", ml: "പുറവും കാലുകളും അയയ്ക്കുന്ന ചൂടുള്ള കല്ലുകൾ.", te: "వీపు, కాళ్ల బిగుతును తగ్గించే వెచ్చని రాళ్లు.",
        kn: "ಬಿಗಿಯಾದ ಬೆನ್ನು ಮತ್ತು ಕಾಲುಗಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡಲು ಬೆಚ್ಚಗಿನ ಬಸಾಲ್ಟ್ ಕಲ್ಲುಗಳು.",
        mr: "आठवलेली पाठ आणि पाय सोडण्यासाठी उबदार बसाल्ट दगड.",
        bn: "টাইট পিঠ ও পা ছেড়ে দিতে উষ্ণ বেসাল্ট পাথর।",
      }, mins: 75, price: 3600 }],
  ["massage", { id: "b6", name: { en: "Head & shoulder massage", ta: "தலை & தோள் மசாஜ்", hi: "हेड और शोल्डर मसाज", ml: "ഹെഡ് & ഷോൾഡർ മസാജ്", te: "హెడ్ & షోల్డర్ మసాజ్",
      kn: "Head & shoulder massage",
      mr: "Head & shoulder massage",
      bn: "Head & shoulder massage"
    }, desc: { en: "A short, deep release for head, neck and shoulders.", ta: "தலை, கழுத்து, தோள்களுக்கான குறுகிய ஆழ்ந்த இதம்.", hi: "सिर, गर्दन और कंधों के लिए छोटी, गहरी राहत।", ml: "തല, കഴുത്ത്, തോളുകൾക്ക് ഹ്രസ്വമായ ആഴമുള്ള ആശ്വാസം.", te: "తల, మెడ, భుజాలకు చిన్న, లోతైన ఉపశమనం.",
        kn: "ತಲೆ, ಕುತ್ತಿಗೆ ಮತ್ತು ಭುಜಗಳಿಗೆ ಚಿಕ್ಕ, ಆಳವಾದ ಬಿಡುಗಡೆ.",
        mr: "डोके, मान आणि खांद्यांसाठी लहान, खोल रिलीझ.",
        bn: "মাথা, ঘাড় ও কাঁধের জন্য ছোট, গভীর রিলিজ।",
      }, mins: 30, price: 1200 }],
  ["facial", { id: "s3", name: { en: "Gold radiance facial", ta: "கோல்ட் ரேடியன்ஸ் ஃபேஷியல்", hi: "गोल्ड रेडियंस फेशियल", ml: "ഗോൾഡ് റേഡിയൻസ് ഫേഷ്യൽ", te: "గోల్డ్ రేడియన్స్ ఫేషియల్",
      kn: "Gold radiance facial",
      mr: "Gold radiance facial",
      bn: "Gold radiance facial"
    }, desc: { en: "A brightening gold-mask facial for a glowing finish.", ta: "ஒளிரும் பொலிவுக்கான கோல்ட் மாஸ்க் ஃபேஷியல்.", hi: "चमकदार निखार के लिए गोल्ड मास्क फेशियल।", ml: "തിളക്കമേകുന്ന ഗോൾഡ് മാസ്ക് ഫേഷ്യൽ.", te: "మెరిసే ఛాయ కోసం గోల్డ్ మాస్క్ ఫేషియల్.",
        kn: "ಪ್ರಕಾಶಮಾನ ಮುಕ್ತಾಯಕ್ಕಾಗಿ ಬ್ರೈಟನಿಂಗ್ ಗೋಲ್ಡ್-ಮಾಸ್ಕ್ ಫೇಶಿಯಲ್.",
        mr: "चमकदार फिनिशसाठी ब्राइटेनिंग गोल्ड-मास्क फेशियल.",
        bn: "উজ্জ্বল ফিনিশের জন্য ব্রাইটেনিং গোল্ড-মাস্ক ফেসিয়াল।",
      }, mins: 75, price: 3800 }],
  ["consult", { id: "c2", name: { en: "Skin analysis", ta: "சரும பகுப்பாய்வு", hi: "स्किन एनालिसिस", ml: "സ്കിൻ അനാലിസിസ്", te: "స్కిన్ అనాలిసిస్",
      kn: "Skin analysis",
      mr: "Skin analysis",
      bn: "Skin analysis"
    }, desc: { en: "A close look at your skin type and concerns, with a clear routine.", ta: "உங்கள் சரும வகை, கவலைகளை கவனித்து தெளிவான பராமரிப்பு திட்டம்.", hi: "आपकी त्वचा के प्रकार और समस्याओं की जाँच, साफ़ रूटीन के साथ।", ml: "നിങ്ങളുടെ ചർമ്മ തരവും പ്രശ്നങ്ങളും പരിശോധിച്ച് വ്യക്തമായ ദിനചര്യ.", te: "మీ చర్మ రకం, సమస్యలను పరిశీలించి స్పష్టమైన దినచర్య.",
        kn: "A close look at your skin type and concerns, with a clear routine.",
        mr: "A close look at your skin type and concerns, with a clear routine.",
        bn: "A close look at your skin type and concerns, with a clear routine.",
      }, mins: 30, price: 600 }],
  ["consult", { id: "c3", name: { en: "Hair & scalp consultation", ta: "முடி & உச்சந்தலை ஆலோசனை", hi: "हेयर और स्कैल्प कंसल्टेशन", ml: "ഹെയർ & സ്കാൽപ് കൺസൾട്ടേഷൻ", te: "హెయిర్ & స్కాల్ప్ కన్సల్టేషన్",
      kn: "Hair & scalp consultation",
      mr: "Hair & scalp consultation",
      bn: "Hair & scalp consultation"
    }, desc: { en: "Learn what your hair and scalp need, and how to care for them.", ta: "உங்கள் முடி, உச்சந்தலைக்கு என்ன தேவை என அறியுங்கள்.", hi: "जानें कि आपके बालों और स्कैल्प को क्या चाहिए।", ml: "നിങ്ങളുടെ മുടിക്കും സ്കാൽപ്പിനും എന്താണ് വേണ്ടതെന്ന് അറിയൂ.", te: "మీ జుట్టు, స్కాల్ప్‌కు ఏం కావాలో తెలుసుకోండి.",
        kn: "Learn what your hair and scalp need, and how to care for them.",
        mr: "Learn what your hair and scalp need, and how to care for them.",
        bn: "Learn what your hair and scalp need, and how to care for them.",
      }, mins: 30, price: 600 }],
];
for (const [key, item] of extraServices) serviceGroups.find((g) => g.key === key)!.items.push(item);

// Bridal makeup packages (Silver / Gold / Platinum / Trial Pack) are edited by the admin.
const bridalNames: Record<string, L> = {
  Silver: { en: "Bridal makeup · Silver", ta: "மணமகள் மேக்கப் · சில்வர்", hi: "ब्राइडल मेकअप · सिल्वर", ml: "ബ്രൈഡൽ മേക്കപ്പ് · സിൽവർ", te: "బ్రైడల్ మేకప్ · సిల్వర్" },
  Gold: { en: "Bridal makeup · Gold", ta: "மணமகள் மேக்கப் · கோல்டு", hi: "ब्राइडल मेकअप · गोल्ड", ml: "ബ്രൈഡൽ മേക്കപ്പ് · ഗോൾഡ്", te: "బ్రైడల్ మేకప్ · గోల్డ్" },
  Platinum: { en: "Bridal makeup · Platinum", ta: "மணமகள் மேக்கப் · பிளாட்டினம்", hi: "ब्राइडल मेकअप · प्लैटिनम", ml: "ബ്രൈഡൽ മേക്കപ്പ് · പ്ലാറ്റിനം", te: "బ్రైడల్ మేకప్ · ప్లాటినం" },
  "Trial Pack": { en: "Bridal makeup · Trial pack", ta: "மணமகள் மேக்கப் · டிரையல் பேக்", hi: "ब्राइडल मेकअप · ट्रायल पैक", ml: "ബ്രൈഡൽ മേക്കപ്പ് · ട്രയൽ പാക്ക്", te: "బ్రైడల్ మేకప్ · ట్రయల్ ప్యాక్" },
};
const same = (s: string): L => ({ en: s, ta: s, hi: s, ml: s, te: s });
serviceGroups.push({
  key: "bridal",
  label: { en: "Bridal makeup", ta: "மணமகள் மேக்கப்", hi: "ब्राइडल मेकअप", ml: "ബ്രൈഡൽ മേക്കപ്പ്", te: "బ్రైడల్ మేకప్" },
  intro: {
    en: "Four bridal packages, from a trial look to a full Platinum day.",
    ta: "டிரையல் லுக் முதல் முழு பிளாட்டினம் நாள் வரை நான்கு மணமகள் பேக்கேஜ்கள்.",
    hi: "ट्रायल लुक से लेकर पूरे प्लैटिनम दिन तक चार ब्राइडल पैकेज।",
    ml: "ട്രയൽ ലുക്ക് മുതൽ പൂർണ്ണ പ്ലാറ്റിനം ദിനം വരെ നാല് ബ്രൈഡൽ പാക്കേജുകൾ.",
    te: "ట్రయల్ లుక్ నుండి పూర్తి ప్లాటినం రోజు వరకు నాలుగు బ్రైడల్ ప్యాకేజీలు."
  },
  items: getSiteConfig().bridalPackages.map((b) => ({
    id: b.id,
    name: bridalNames[b.name] ?? same(`Bridal makeup · ${b.name}`),
    desc: same(b.features.join(" · ")),
    mins: b.duration,
    price: promoPrice(b.price, b.discountType, b.discountValue)
  })),
});

// Normal services follow the admin's Services & Pricing page: price (after promo), duration, active flag and newly added services.
{
  const LANDING_ID: Record<string, string> = { b1: 'body-massage', s1: 'normal-facial', s2: 'hydra-facial', c1: 'beauty-consultation' };
  const GROUP: Record<string, string> = { 'Body Massage': 'massage', Facial: 'facial', Consultation: 'consult' };
  const cfg = getSiteConfig().services;
  serviceGroups.forEach((g) => {
    if (g.key === 'bridal') return;
    g.items = g.items.filter((it) => { const c = cfg.find((x) => x.id === LANDING_ID[it.id]); return !c || c.active; });
    g.items.forEach((it) => {
      const c = cfg.find((x) => x.id === LANDING_ID[it.id]);
      if (c) { it.mins = c.duration; it.price = promoPrice(c.price, c.discountType, c.discountValue); }
    });
  });
  const known = new Set(Object.values(LANDING_ID));
  cfg.filter((c) => c.active && !known.has(c.id)).forEach((c) => {
    serviceGroups.find((g) => g.key === GROUP[c.category])?.items.push({ id: c.id, name: same(c.name), desc: same(c.desc), mins: c.duration, price: promoPrice(c.price, c.discountType, c.discountValue) });
  });
}

/** Admin switch: service prices stay hidden on the public site unless the admin turns them on. */
export const servicePricesOn = () => getSiteConfig().showServicePrices;

export const allServices = serviceGroups.flatMap((g) =>
  g.items.map((s) => ({ ...s, group: g.key })),
);

export const slots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export const rupees = (n: number, lang: Lang = "en") =>
  `₹${n.toLocaleString(LANG_LOCALES[lang])}`;

/** Product photography lives in /public/assets/products/<id>.webp.
 *  A few hero products use colour-accurate packshots from /variants so the image
 *  matches the selected shade (lipstick, serum, blush, cream). */
const VARIANT_PHOTO: Record<string, string> = {
  eclat: "/assets/products/variants/serum-rose.png",
  "lipstick-red": "/assets/products/lipstick/r1.webp",
  "lipstick-nude": "/assets/products/lipstick/n1.webp",
  "lipstick-green": "/assets/products/lipstick/g1.webp",
  "lipstick-pink": "/assets/products/lipstick/p1.webp",
  "night-cream": "/assets/products/variants/cream-nourishing.png",
  "skin-tint": "/assets/products/variants/blush-peach.png",
  highlighter: "/assets/products/variants/blush-pink.png",
};

export const productPhoto = (id: string) =>
  VARIANT_PHOTO[id] ?? `/assets/products/${id}.webp`;

/** One selectable colour / shade of a product. `img` is the product photo shown
 *  in the modal when the swatch is picked; `hex` is the swatch circle colour. */
export type Shade = { key: string; name: string; hex: string; img: string; sub?: L; code?: string };

const V = "/assets/products/variants/";
const S = "/assets/products/shades/";
const P = "/assets/products/";
const LIP = "/assets/products/lipstick/";

/** The first shade of every product is its default photo. The swatches in the product
 *  modal read from this list, so adding a shade here adds a swatch automatically. */
export const SHADES: Record<string, Shade[]> = {
  eclat: [
    { key: "rose", name: "Rose", hex: "#ef9a9a", img: V + "serum-rose.png" },
    { key: "aloe", name: "Aloe Vera", hex: "#9fd68c", img: V + "serum-aloe.png" },
    { key: "orange", name: "Orange", hex: "#f2c230", img: V + "serum-orange.png" },
  ],
  "lipstick-red": [
    { key: "r1", code: "R1", name: "R1 · Classic Red", hex: "#B22222", img: LIP + "r1.webp", sub: { en: "Shade · R1 · Classic Red", ta: "Shade · R1 · Classic Red", hi: "Shade · R1 · Classic Red", ml: "Shade · R1 · Classic Red", te: "Shade · R1 · Classic Red",
      kn: "Shade · R1 · Classic Red",
      mr: "Shade · R1 · Classic Red",
      bn: "Shade · R1 · Classic Red"
    } },
    { key: "r2", code: "R2", name: "R2 · Cherry Red", hex: "#DC143C", img: LIP + "r2.webp", sub: { en: "Shade · R2 · Cherry Red", ta: "Shade · R2 · Cherry Red", hi: "Shade · R2 · Cherry Red", ml: "Shade · R2 · Cherry Red", te: "Shade · R2 · Cherry Red",
      kn: "Shade · R2 · Cherry Red",
      mr: "Shade · R2 · Cherry Red",
      bn: "Shade · R2 · Cherry Red"
    } },
    { key: "r3", code: "R3", name: "R3 · Wine Red", hex: "#722F37", img: LIP + "r3.webp", sub: { en: "Shade · R3 · Wine Red", ta: "Shade · R3 · Wine Red", hi: "Shade · R3 · Wine Red", ml: "Shade · R3 · Wine Red", te: "Shade · R3 · Wine Red",
      kn: "Shade · R3 · Wine Red",
      mr: "Shade · R3 · Wine Red",
      bn: "Shade · R3 · Wine Red"
    } },
    { key: "r4", code: "R4", name: "R4 · Brick Red", hex: "#A0522D", img: LIP + "r4.webp", sub: { en: "Shade · R4 · Brick Red", ta: "Shade · R4 · Brick Red", hi: "Shade · R4 · Brick Red", ml: "Shade · R4 · Brick Red", te: "Shade · R4 · Brick Red",
      kn: "Shade · R4 · Brick Red",
      mr: "Shade · R4 · Brick Red",
      bn: "Shade · R4 · Brick Red"
    } },
  ],
  "lipstick-nude": [
    { key: "n1", code: "N1", name: "N1 · Light Nude", hex: "#E6C9A8", img: LIP + "n1.webp", sub: { en: "Shade · N1 · Light Nude", ta: "Shade · N1 · Light Nude", hi: "Shade · N1 · Light Nude", ml: "Shade · N1 · Light Nude", te: "Shade · N1 · Light Nude",
      kn: "Shade · N1 · Light Nude",
      mr: "Shade · N1 · Light Nude",
      bn: "Shade · N1 · Light Nude"
    } },
    { key: "n2", code: "N2", name: "N2 · Peach Nude", hex: "#F4A460", img: LIP + "n2.webp", sub: { en: "Shade · N2 · Peach Nude", ta: "Shade · N2 · Peach Nude", hi: "Shade · N2 · Peach Nude", ml: "Shade · N2 · Peach Nude", te: "Shade · N2 · Peach Nude",
      kn: "Shade · N2 · Peach Nude",
      mr: "Shade · N2 · Peach Nude",
      bn: "Shade · N2 · Peach Nude"
    } },
    { key: "n3", code: "N3", name: "N3 · Caramel Nude", hex: "#C68642", img: LIP + "n3.webp", sub: { en: "Shade · N3 · Caramel Nude", ta: "Shade · N3 · Caramel Nude", hi: "Shade · N3 · Caramel Nude", ml: "Shade · N3 · Caramel Nude", te: "Shade · N3 · Caramel Nude",
      kn: "Shade · N3 · Caramel Nude",
      mr: "Shade · N3 · Caramel Nude",
      bn: "Shade · N3 · Caramel Nude"
    } },
    { key: "n4", code: "N4", name: "N4 · Mocha Nude", hex: "#8B5E3C", img: LIP + "n4.webp", sub: { en: "Shade · N4 · Mocha Nude", ta: "Shade · N4 · Mocha Nude", hi: "Shade · N4 · Mocha Nude", ml: "Shade · N4 · Mocha Nude", te: "Shade · N4 · Mocha Nude",
      kn: "Shade · N4 · Mocha Nude",
      mr: "Shade · N4 · Mocha Nude",
      bn: "Shade · N4 · Mocha Nude"
    } },
  ],
  "lipstick-green": [
    { key: "g1", code: "G1", name: "G1 · Mint Green", hex: "#A7D8A0", img: LIP + "g1.webp", sub: { en: "Shade · G1 · Mint Green", ta: "Shade · G1 · Mint Green", hi: "Shade · G1 · Mint Green", ml: "Shade · G1 · Mint Green", te: "Shade · G1 · Mint Green",
      kn: "Shade · G1 · Mint Green",
      mr: "Shade · G1 · Mint Green",
      bn: "Shade · G1 · Mint Green"
    } },
    { key: "g2", code: "G2", name: "G2 · Olive Green", hex: "#6B8E23", img: LIP + "g2.webp", sub: { en: "Shade · G2 · Olive Green", ta: "Shade · G2 · Olive Green", hi: "Shade · G2 · Olive Green", ml: "Shade · G2 · Olive Green", te: "Shade · G2 · Olive Green",
      kn: "Shade · G2 · Olive Green",
      mr: "Shade · G2 · Olive Green",
      bn: "Shade · G2 · Olive Green"
    } },
    { key: "g3", code: "G3", name: "G3 · Forest Green", hex: "#2E7D32", img: LIP + "g3.webp", sub: { en: "Shade · G3 · Forest Green", ta: "Shade · G3 · Forest Green", hi: "Shade · G3 · Forest Green", ml: "Shade · G3 · Forest Green", te: "Shade · G3 · Forest Green",
      kn: "Shade · G3 · Forest Green",
      mr: "Shade · G3 · Forest Green",
      bn: "Shade · G3 · Forest Green"
    } },
    { key: "g4", code: "G4", name: "G4 · Khaki Green", hex: "#556B2F", img: LIP + "g4.webp", sub: { en: "Shade · G4 · Khaki Green", ta: "Shade · G4 · Khaki Green", hi: "Shade · G4 · Khaki Green", ml: "Shade · G4 · Khaki Green", te: "Shade · G4 · Khaki Green",
      kn: "Shade · G4 · Khaki Green",
      mr: "Shade · G4 · Khaki Green",
      bn: "Shade · G4 · Khaki Green"
    } },
  ],
  "lipstick-pink": [
    { key: "p1", code: "P1", name: "P1 · Baby Pink", hex: "#FFC0CB", img: LIP + "p1.webp", sub: { en: "Shade · P1 · Baby Pink", ta: "Shade · P1 · Baby Pink", hi: "Shade · P1 · Baby Pink", ml: "Shade · P1 · Baby Pink", te: "Shade · P1 · Baby Pink",
      kn: "Shade · P1 · Baby Pink",
      mr: "Shade · P1 · Baby Pink",
      bn: "Shade · P1 · Baby Pink"
    } },
    { key: "p2", code: "P2", name: "P2 · Rose Pink", hex: "#FF6F91", img: LIP + "p2.webp", sub: { en: "Shade · P2 · Rose Pink", ta: "Shade · P2 · Rose Pink", hi: "Shade · P2 · Rose Pink", ml: "Shade · P2 · Rose Pink", te: "Shade · P2 · Rose Pink",
      kn: "Shade · P2 · Rose Pink",
      mr: "Shade · P2 · Rose Pink",
      bn: "Shade · P2 · Rose Pink"
    } },
    { key: "p3", code: "P3", name: "P3 · Fuchsia Pink", hex: "#E75480", img: LIP + "p3.webp", sub: { en: "Shade · P3 · Fuchsia Pink", ta: "Shade · P3 · Fuchsia Pink", hi: "Shade · P3 · Fuchsia Pink", ml: "Shade · P3 · Fuchsia Pink", te: "Shade · P3 · Fuchsia Pink",
      kn: "Shade · P3 · Fuchsia Pink",
      mr: "Shade · P3 · Fuchsia Pink",
      bn: "Shade · P3 · Fuchsia Pink"
    } },
    { key: "p4", code: "P4", name: "P4 · Mauve Pink", hex: "#B56576", img: LIP + "p4.webp", sub: { en: "Shade · P4 · Mauve Pink", ta: "Shade · P4 · Mauve Pink", hi: "Shade · P4 · Mauve Pink", ml: "Shade · P4 · Mauve Pink", te: "Shade · P4 · Mauve Pink",
      kn: "Shade · P4 · Mauve Pink",
      mr: "Shade · P4 · Mauve Pink",
      bn: "Shade · P4 · Mauve Pink"
    } },
  ],
  "night-cream": [
    { key: "nourishing", name: "Nourishing", hex: "#f1dcae", img: V + "cream-nourishing.png" },
    { key: "hydrating", name: "Hydrating", hex: "#bfe0f5", img: V + "cream-hydrating.png" },
    { key: "brightening", name: "Brightening", hex: "#f6c6d6", img: V + "cream-brightening.png" },
  ],
  "skin-tint": [
    { key: "peach", name: "Peach", hex: "#f08a7a", img: V + "blush-peach.png" },
    { key: "pink", name: "Pink", hex: "#d9657f", img: V + "blush-pink.png" },
    { key: "mauve", name: "Mauve", hex: "#b4607a", img: V + "blush-mauve.png" },
  ],
  highlighter: [
    { key: "pink", name: "Pink", hex: "#d9657f", img: V + "blush-pink.png" },
    { key: "peach", name: "Peach", hex: "#f08a7a", img: V + "blush-peach.png" },
    { key: "mauve", name: "Mauve", hex: "#b4607a", img: V + "blush-mauve.png" },
  ],
  "rose-mist": [
    { key: "classic", name: "Classic White", hex: "#eef4f2", img: P + "rose-mist.webp" },
    { key: "blush", name: "Blush", hex: "#ecb0ba", img: S + "rose-mist-blush.webp" },
    { key: "sage", name: "Sage", hex: "#b0cea8", img: S + "rose-mist-sage.webp" },
    { key: "sky", name: "Sky", hex: "#b0caea", img: S + "rose-mist-sky.webp" },
  ],
  "body-butter": [
    { key: "amber", name: "Amber", hex: "#a8651e", img: P + "body-butter.webp" },
    { key: "green", name: "Forest Green", hex: "#46704a", img: S + "body-butter-green.webp" },
    { key: "rose", name: "Rose", hex: "#96465a", img: S + "body-butter-rose.webp" },
    { key: "blue", name: "Midnight Blue", hex: "#3c5a8c", img: S + "body-butter-blue.webp" },
  ],
  "cleansing-oil": [
    { key: "gold", name: "Golden", hex: "#e6d27a", img: P + "cleansing-oil.webp" },
    { key: "rose", name: "Rose", hex: "#eeaab2", img: S + "cleansing-oil-rose.webp" },
    { key: "green", name: "Mint", hex: "#aad7a0", img: S + "cleansing-oil-green.webp" },
    { key: "blue", name: "Sky", hex: "#a5c8eb", img: S + "cleansing-oil-blue.webp" },
  ],
  "sandal-oil": [
    { key: "amber", name: "Amber", hex: "#a8651e", img: P + "sandal-oil.webp" },
    { key: "green", name: "Forest Green", hex: "#46704a", img: S + "sandal-oil-green.webp" },
    { key: "rose", name: "Rose", hex: "#96465a", img: S + "sandal-oil-rose.webp" },
    { key: "blue", name: "Midnight Blue", hex: "#3c5a8c", img: S + "sandal-oil-blue.webp" },
  ],
  "hair-oil": [
    { key: "green", name: "Avocado", hex: "#a2b94a", img: P + "hair-oil.webp" },
    { key: "rose", name: "Rose", hex: "#d96f94", img: S + "hair-oil-rose.webp" },
    { key: "lilac", name: "Lilac", hex: "#b79ad6", img: S + "hair-oil-lilac.webp" },
    { key: "periwinkle", name: "Periwinkle", hex: "#8d9fd6", img: S + "hair-oil-periwinkle.webp" },
  ],
  perfume: [
    { key: "amber", name: "Amber", hex: "#e8946a", img: P + "perfume.webp" },
    { key: "rose", name: "Rose", hex: "#e8969f", img: S + "perfume-rose.webp" },
    { key: "jade", name: "Jade", hex: "#78be96", img: S + "perfume-jade.webp" },
    { key: "violet", name: "Violet", hex: "#aa8cd2", img: S + "perfume-violet.webp" },
  ],
  "herbal-shampoo": [
    { key: "white", name: "Pearl White", hex: "#f2f2f0", img: P + "herbal-shampoo.webp" },
    { key: "blush", name: "Blush", hex: "#ecb0ba", img: S + "herbal-shampoo-blush.webp" },
    { key: "sage", name: "Sage", hex: "#b0cea8", img: S + "herbal-shampoo-sage.webp" },
    { key: "lilac", name: "Lilac", hex: "#c8b4e2", img: S + "herbal-shampoo-lilac.webp" },
  ],
};

/** Photo for a product in a given shade (index into SHADES[id]); falls back to the default photo. */
export const shadePhoto = (id: string, shade = 0) => SHADES[id]?.[shade]?.img ?? productPhoto(id);
