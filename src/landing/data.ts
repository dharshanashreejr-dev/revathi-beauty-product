export type Lang = "en" | "ta" | "hi" | "ml" | "te";
export type L = Record<Lang, string>;
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
};

export const LANG_LOCALES: Record<Lang, string> = {
  en: "en-IN",
  ta: "ta-IN",
  hi: "hi-IN",
  ml: "ml-IN",
  te: "te-IN",
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
    },
    sub: {
      en: "Signature serum",
      ta: "சிக்னேச்சர் சீரம்",
      hi: "सिग्नेचर सीरम",
      ml: "സിഗ്നേച്ചർ സീറം",
      te: "సిగ్నేచర్ సీరం",
    },
    copy: {
      en: "Peach nectar, white jasmine and sandalwood in a silky, fast-absorbing serum for a luminous, velvet-soft finish.",
      ta: "பீச் நெக்டார், வெள்ளை மல்லிகை மற்றும் சந்தனம் — பட்டுபோன்ற, விரைவாக உறிஞ்சும் சீரம். பிரகாசமான, வெல்வெட் மென்மையான முடிவு.",
      hi: "पीच नेक्टर, सफेद चमेली और चंदन — रेशमी, जल्दी सोखने वाला सीरम। चमकदार, मखमली मुलायम फिनिश।",
      ml: "പീച്ച് നെക്ടർ, വെള്ള ജാസ്മിൻ, ചന്ദനം — പട്ടുപോലെ, വേഗത്തിൽ ആഗിരണം ചെയ്യുന്ന സീറം. പ്രകാശമുള്ള, വെൽവെറ്റ് മൃദുവായ ഫിനിഷ്.",
      te: "పీచ్ నెక్టార్, తెల్ల జాజిక, చందనం — పట్టులాంటి, వేగంగా గ్రహించే సీరం. ప్రకాశవంతమైన, వెల్వెట్ మృదువైన ఫినిష్.",
    },
  },
  {
    id: "lipstick",
    kind: "lipstick",
    tone: ["#8e2a4f", "#cfa860"],
    cat: "makeup",
    price: 1150,
    size: "3.8 g",
    name: {
      en: "Velvet Matte Lipstick",
      ta: "வெல்வெட் மேட் லிப்ஸ்டிக்",
      hi: "वेलवेट मैट लिपस्टिक",
      ml: "വെൽവെറ്റ് മാറ്റ് ലിപ്സ്റ്റിക്",
      te: "వెల్వెట్ మాట్ లిప్‌స్టిక్",
    },
    sub: {
      en: "Shade · Plum Rose",
      ta: "நிழல் · பிளம் ரோஸ்",
      hi: "शेड · प्लम रोज़",
      ml: "ഷേഡ് · പ്ലം റോസ്",
      te: "షేడ్ · ప్లం రోజ్",
    },
    copy: {
      en: "A cushiony matte in a deep plum rose. Rich colour with a soft, velvet-smooth feel.",
      ta: "ஆழமான பிளம் ரோஸ் மேட். செறிவான நிறம், மென்மையான வெல்வெட் உணர்வு.",
      hi: "गहरे प्लम रोज़ में मुलायम मैट। समृद्ध रंग और मखमली स्पर्श।",
      ml: "ആഴമുള്ള പ്ലം റോസ് മാറ്റ്. സമ്പന്ന നിറം, മൃദുവായ വെൽവെറ്റ് സ്പർശം.",
      te: "లోతైన ప్లం రోజ్ మాట్. సమృద్ధమైన రంగు, మృదువైన వెల్వెట్ స్పర్శ.",
    },
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
    },
    sub: {
      en: "Overnight comfort",
      ta: "இரவு முழுவதும் ஆறுதல்",
      hi: "रात भर आराम",
      ml: "രാത്രി മുഴുവൻ ആശ്വാസം",
      te: "రాత్రి మొత్తం సౌకర్యం",
    },
    copy: {
      en: "A rich, whipped night cream that melts in and leaves skin feeling cushioned and calm by morning.",
      ta: "பணக்கார நைட் கிரீம். உருகிச் சென்று காலையில் தோலை மென்மையாகவும் அமைதியாகவும் வைக்கும்.",
      hi: "समृद्ध नाइट क्रीम जो घुल जाती है और सुबह तक त्वचा को मुलायम और शांत रखती है।",
      ml: "സമ്പന്നമായ നൈറ്റ് ക്രീം. ഉരുകി ആഗിരണം ചെയ്ത് രാവിലെ ചർമ്മത്തെ മൃദുവും ശാന്തവുമാക്കും.",
      te: "సమృద్ధమైన నైట్ క్రీమ్. కరిగి చేరి ఉదయానికి చర్మాన్ని మృదువుగా, ప్రశాంతంగా ఉంచుతుంది.",
    },
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
    },
    sub: {
      en: "Fresh, anytime",
      ta: "எப்போதும் புத்துணர்ச்சி",
      hi: "ताज़गी, कभी भी",
      ml: "എപ്പോഴും ഫ്രഷ്",
      te: "ఎప్పుడైనా ఫ్రెష్",
    },
    copy: {
      en: "A fine rose mist to refresh the face, set makeup or add a touch of softness through the day.",
      ta: "முகத்தை புத்துணர்ச்சியாக்க, மேக்கப்பை அமைக்க அல்லது நாள் முழுவதும் மென்மை சேர்க்க.",
      hi: "चेहरे को तरोताज़ा करने, मेकअप सेट करने या दिन भर नरमी जोड़ने के लिए।",
      ml: "മുഖം ഫ്രഷ് ആക്കാൻ, മേക്കപ്പ് സെറ്റ് ചെയ്യാൻ അല്ലെങ്കിൽ ദിവസം മുഴുവൻ മൃദുത്വം ചേർക്കാൻ.",
      te: "ముఖాన్ని ఫ్రెష్ చేయడానికి, మేకప్ సెట్ చేయడానికి లేదా రోజంతా మృదుత్వం జోడించడానికి.",
    },
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
    },
    sub: {
      en: "Body ritual",
      ta: "உடல் சடங்கு",
      hi: "बॉडी रिचुअल",
      ml: "ബോഡി റിച്വൽ",
      te: "బాడీ రిచువల్",
    },
    copy: {
      en: "A creamy, softly scented body butter that leaves skin smooth with a warm, peachy glow.",
      ta: "கிரீமி, மென்மையான வாசனையுள்ள பாடி பட்டர். தோலை மென்மையாக்கி பீச் போன்ற பிரகாசம் தரும்.",
      hi: "क्रीमी, हल्की खुशबू वाला बॉडी बटर। त्वचा को मुलायम और पीच जैसी चमक देता है।",
      ml: "ക്രീമി, മൃദുവായ സുഗന്ധമുള്ള ബോഡി ബട്ടർ. ചർമ്മത്തെ മൃദുവാക്കി പീച്ച് പോലുള്ള പ്രകാശം നൽകും.",
      te: "క్రీమీ, మృదువైన సువాసనతో బాడీ బటర్. చర్మాన్ని మృదువుగా చేసి పీచ్ లాంటి ప్రకాశం ఇస్తుంది.",
    },
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
    },
    sub: {
      en: "Light, natural finish",
      ta: "இலேசான, இயற்கை முடிவு",
      hi: "हल्का, प्राकृतिक फिनिश",
      ml: "ലഘുവായ, സ്വാഭാവിക ഫിനിഷ്",
      te: "తేలికైన, సహజ ఫినిష్",
    },
    copy: {
      en: "A lightweight tint that evens out skin and leaves a soft, natural-looking velvet finish.",
      ta: "தோலை சமன் செய்து மென்மையான, இயற்கை வெல்வெட் முடிவைத் தரும் இலேசான டின்ட்.",
      hi: "त्वचा को समान बनाकर मुलायम, प्राकृतिक मखमली फिनिश देने वाला हल्का टिंट।",
      ml: "ചർമ്മത്തെ ഏകീകരിച്ച് മൃദുവായ, സ്വാഭാവിക വെൽവെറ്റ് ഫിനിഷ് നൽകുന്ന ലഘു ടിന്റ്.",
      te: "చర్మాన్ని సమం చేసి మృదువైన, సహజ వెల్వెట్ ఫినిష్ ఇచ్చే తేలికైన టింట్.",
    },
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
    },
    sub: {
      en: "Gentle first step",
      ta: "மென்மையான முதல் படி",
      hi: "कोमल पहला कदम",
      ml: "മൃദുവായ ആദ്യ ഘട്ടം",
      te: "మృదువైన మొదటి అడుగు",
    },
    copy: {
      en: "A silky cleansing oil that melts away makeup and the day, scented with white jasmine.",
      ta: "மேக்கப் மற்றும் நாள் முழுவதையும் உருகச் செய்யும் பட்டுபோன்ற க்ளென்சிங் ஆயில். வெள்ளை மல்லிகை வாசனை.",
      hi: "मेकअप और दिन की थकान घोलने वाला रेशमी क्लींजिंग ऑयल। सफेद चमेली की खुशबू।",
      ml: "മേക്കപ്പും ദിവസവും ഉരുക്കി നീക്കുന്ന പട്ടുപോലുള്ള ക്ലെൻസിംഗ് ഓയിൽ. വെള്ള ജാസ്മിൻ സുഗന്ധം.",
      te: "మేకప్ మరియు రోజును కరిగించే పట్టులాంటి క్లెన్సింగ్ ఆయిల్. తెల్ల జాజిక సువాసన.",
    },
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
    },
    sub: {
      en: "Shade · Champagne gold",
      ta: "நிழல் · షాంపെയ്ன் தங்கம்",
      hi: "शेड · शैम्पेन गोल्ड",
      ml: "ഷേഡ് · ഷാംപെയ്ൻ ഗോൾഡ്",
      te: "షేడ్ · షాంపేన్ గోల్డ్",
    },
    copy: {
      en: "A finely milled champagne-gold highlighter for a soft, sunlit glow on cheeks and brow bones.",
      ta: "கன்னங்கள் மற்றும் புருவ எலும்புகளில் மென்மையான, சூரிய ஒளி போன்ற பிரகாசத்திற்கு.",
      hi: "गालों और भौंह की हड्डियों पर नरम, धूप जैसी चमक के लिए।",
      ml: "കവിളുകളിലും പുരിക എല്ലുകളിലും മൃദുവായ, സൂര്യപ്രകാശം പോലുള്ള തിളക്കത്തിന്.",
      te: "బుగ్గలు మరియు కనుబొమ్మ ఎముకలపై మృదువైన, సూర్యకాంతి లాంటి ప్రకాశం కోసం.",
    },
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
    },
    sub: {
      en: "Warm, silky finish",
      ta: "சூடான, பட்டு முடிவு",
      hi: "गर्म, रेशमी फिनिश",
      ml: "ചൂടുള്ള, പട്ട് ഫിനിഷ്",
      te: "వెచ్చని, పట్టు ఫినిష్",
    },
    copy: {
      en: "A lightweight dry oil for hair ends and skin, with the quiet warmth of sandalwood.",
      ta: "முடி முனைகள் மற்றும் தோலுக்கு இலேசான ட்ரை ஆயில். சந்தனத்தின் அமைதியான வெப்பம்.",
      hi: "बालों के सिरे और त्वचा के लिए हल्का ड्राई ऑयल। चंदन की शांत गर्माहट।",
      ml: "മുടിയുടെ അറ്റങ്ങൾക്കും ചർമ്മത്തിനും ലഘു ഡ്രൈ ഓയിൽ. ചന്ദനത്തിന്റെ ശാന്തമായ ചൂട്.",
      te: "జుట్టు చివరలు మరియు చర్మానికి తేలికైన డ్రై ఆయిల్. చందనం యొక్క నిశ్శబ్ద వెచ్చదనం.",
    },
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
    },
    sub: {
      en: "Herbal · Nourishing",
      ta: "மூலிகை · ஊட்டமளிக்கும்",
      hi: "हर्बल · पोषक",
      ml: "ഹെർബൽ · പോഷകം",
      te: "హెర్బల్ · పోషకం",
    },
    copy: {
      en: "A cold-infused herbal hair oil with bhringraj, amla and hibiscus. Strengthens roots and leaves hair soft, glossy and light.",
      ta: "பிரிங்கராஜ், நெல்லிக்காய், செம்பருத்தி கொண்ட மூலிகை எண்ணெய். வேர்களை வலுப்படுத்தி முடியை மென்மையாகவும் பளபளப்பாகவும் வைக்கும்.",
      hi: "भृंगराज, आंवला और हिबिस्कस वाला हर्बल तेल। जड़ों को मजबूत करता है, बाल नरम और चमकदार बनाता है।",
      ml: "ഭൃംഗരാജ്, നെല്ലിക്ക, ചെമ്പരത്തി ഉള്ള ഹെർബൽ ഓയിൽ. വേരുകൾ ശക്തിപ്പെടുത്തി മുടി മൃദുവും തിളക്കമുള്ളതുമാക്കും.",
      te: "భృంగరాజ్, ఉసిరి, మందారతో హెర్బల్ ఆయిల్. వేళ్ళను బలపరచి జుట్టును మృదువుగా, మెరుస్తూ ఉంచుతుంది.",
    },
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
    },
    sub: {
      en: "Eau de parfum",
      ta: "ஓ டெ పர்பூம்",
      hi: "ओ द पर्फ्यूम",
      ml: "ഓ ഡെ പെർഫ്യൂം",
      te: "ఓ డె పర్ఫ్యూమ్",
    },
    copy: {
      en: "A warm botanical eau de parfum of white jasmine, sandalwood and vetiver. Soft on arrival, quietly lasting through the evening.",
      ta: "வெள்ளை மல்லிகை, சந்தனம், வெட்டிவேர். மென்மையாகத் தொடங்கி மாலை வரை நீடிக்கும்.",
      hi: "सफेद चमेली, चंदन और वेटीवर। नरम शुरुआत, शाम तक टिकने वाली खुशबू।",
      ml: "വെള്ള ജാസ്മിൻ, ചന്ദനം, വെറ്റിവർ. മൃദുവായ തുടക്കം, വൈകുന്നേരം വരെ നിലനിൽക്കും.",
      te: "తెల్ల జాజిక, చందనం, వెటివర్. మృదువైన ప్రారంభం, సాయంత్రం వరకు నిలుస్తుంది.",
    },
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
    },
    sub: {
      en: "Gentle daily wash",
      ta: "மென்மையான தினசரி கழுவுதல்",
      hi: "कोमल दैनिक धुलाई",
      ml: "മൃദുവായ ദൈനംദിന കഴുകൽ",
      te: "మృదువైన రోజువారీ వాష్",
    },
    copy: {
      en: "A sulphate-free shampoo with shikakai, reetha and aloe vera. Cleanses gently and leaves hair silky, shiny and easy to style.",
      ta: "சிக்காய், ரீத்தா, கற்றாழை கொண்ட சல்பேட்-இல்லா ஷாம்பு. மென்மையாக சுத்தம் செய்து முடியை பட்டுபோல வைக்கும்.",
      hi: "शिकाकाई, रीठा और एलोवेरा वाला सल्फेट-फ्री शैम्पू। कोमल सफाई, रेशमी चमकदार बाल।",
      ml: "ശിക്കായി, രീത, കറ്റാർവാഴ ഉള്ള സൾഫേറ്റ്-ഫ്രീ ഷാംപൂ. മൃദുവായി വൃത്തിയാക്കി മുടി പട്ടുപോലെ വയ്ക്കും.",
      te: "శికకాయ, రీత, కలబందతో సల్ఫేట్-ఫ్రీ షాంపూ. మృదువుగా శుభ్రం చేసి జుట్టును పట్టులా ఉంచుతుంది.",
    },
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
    },
    copy: {
      en: "Mist, serum and a skin tint — a quick, luminous start to the day.",
      ta: "மிஸ்ட், சீரம் மற்றும் ஸ்கின் டின்ட் — விரைவான, பிரகாசமான தொடக்கம்.",
      hi: "मिस्ट, सीरम और स्किन टिंट — दिन की तेज़, चमकदार शुरुआत।",
      ml: "മിസ്റ്റ്, സീറം, സ്കിൻ ടിന്റ് — വേഗത്തിലുള്ള, പ്രകാശമുള്ള തുടക്കം.",
      te: "మిస్ట్, సీరం మరియు స్కిన్ టింట్ — వేగవంతమైన, ప్రకాశవంతమైన ప్రారంభం.",
    },
    items: ["rose-mist", "eclat", "skin-tint"],
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
    },
    copy: {
      en: "A velvet lip, a golden highlight and a flawless tint for the evenings that matter.",
      ta: "வெல்வெட் உதடு, தங்க ஹைலைட் மற்றும் பிழையற்ற டின்ட் — முக்கியமான மாலைகளுக்கு.",
      hi: "मखमली होंठ, सुनहरी चमक और निर्दोष टिंट — खास शामों के लिए।",
      ml: "വെൽവെറ്റ് ലിപ്, ഗോൾഡൻ ഹൈലൈറ്റ്, അപൂർണ്ണമല്ലാത്ത ടിന്റ് — പ്രധാന സന്ധ്യകൾക്ക്.",
      te: "వెల్వెట్ లిప్, గోల్డెన్ హైలైట్ మరియు నిర్దోష టింట్ — ముఖ్యమైన సాయంత్రాలకు.",
    },
    items: ["lipstick", "skin-tint", "highlighter"],
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
    },
    copy: {
      en: "Cleanse, soften and let the night cream and sandalwood oil do their quiet work.",
      ta: "சுத்தம் செய்து, மென்மையாக்கி, நைட் கிரீம் மற்றும் சந்தன எண்ணெய் அமைதியாக வேலை செய்யட்டும்.",
      hi: "साफ करें, मुलायम बनाएं, नाइट क्रीम और चंदन तेल अपना काम करें।",
      ml: "വൃത്തിയാക്കി, മൃദുവാക്കി, നൈറ്റ് ക്രീമും ചന്ദന ഓയിലും ശാന്തമായി പ്രവർത്തിക്കട്ടെ.",
      te: "శుభ్రం చేసి, మృదువుగా చేసి, నైట్ క్రీమ్ మరియు చందనం నూనె నిశ్శబ్దంగా పని చేయనివ్వండి.",
    },
    items: ["cleansing-oil", "night-cream", "sandal-oil"],
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
    },
    copy: {
      en: "Our signature serum, a plum-rose lip and a peach body butter — ready to give.",
      ta: "சிக்னேச்சர் சீரம், பிளம்-ரோஸ் உதடு மற்றும் பீச் பாடி பட்டர் — பரிசாகத் தயாராக.",
      hi: "सिग्नेचर सीरम, प्लम-रोज़ लिप और पीच बॉडी बटर — देने के लिए तैयार।",
      ml: "സിഗ്നേച്ചർ സീറം, പ്ലം-റോസ് ലിപ്, പീച്ച് ബോഡി ബട്ടർ — സമ്മാനിക്കാൻ തയ്യാർ.",
      te: "సిగ్నేచర్ సీరం, ప్లం-రోజ్ లిప్ మరియు పీచ్ బాడీ బటర్ — ఇవ్వడానికి సిద్ధం.",
    },
    items: ["eclat", "lipstick", "body-butter"],
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
      te: "మహిళలకు మాత్రమే అయిన మా లగ్జరీ సెలూన్‌లో ప్రశాంతమైన ఫుల్-బాడీ మసాజ్.",
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
        },
        desc: {
          en: "A calming full-body massage with warm oils.",
          ta: "சூடான எண்ணெய்களுடன் அமைதியான முழு உடல் மசாஜ்.",
          hi: "गर्म तेलों के साथ शांत पूर्ण शरीर मसाज।",
          ml: "ചൂടുള്ള ഓയിലുകളോടെ ശാന്തമായ മുഴുവൻ ശരീര മസാജ്.",
          te: "వెచ్చని నూనెలతో ప్రశాంతమైన పూర్తి శరీర మసాజ్.",
        },
        mins: 60,
        price: 2800,
      },
    ],
  },
  {
    key: "facial",
    label: { en: "Facials", ta: "ஃபேஷியல்கள்", hi: "फेशियल", ml: "ഫേഷ്യലുകൾ", te: "ఫేషియల్స్" },
    intro: {
      en: "Normal and hydra facials, finished with our own herbal products.",
      ta: "சாதாரண மற்றும் ஹைட்ரா ஃபேஷியல்கள், எங்கள் மூலிகைப் பொருட்களுடன் நிறைவு.",
      hi: "नॉर्मल और हाइड्रा फेशियल, हमारे अपने हर्बल प्रोडक्ट्स के साथ।",
      ml: "നോർമൽ, ഹൈഡ്ര ഫേഷ്യലുകൾ, ഞങ്ങളുടെ സ്വന്തം ഹെർബൽ ഉൽപ്പന്നങ്ങളോടെ.",
      te: "నార్మల్, హైడ్రా ఫేషియల్స్, మా సొంత హెర్బల్ ఉత్పత్తులతో.",
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
        },
        desc: {
          en: "Cleanse, exfoliate, massage and a glow mask.",
          ta: "சுத்தம், எக்ஸ்ஃபோலியேட், மசாஜ் மற்றும் குளோ மாஸ்க்.",
          hi: "क्लींज, एक्सफोलिएट, मसाज और ग्लो मास्क।",
          ml: "ക്ലെൻസ്, എക്സ്ഫോളിയേറ്റ്, മസാജ്, ഗ്ലോ മാസ്ക്.",
          te: "క్లెన్స్, ఎక్స్‌ఫోలియేట్, మసాజ్ మరియు గ్లో మాస్క్.",
        },
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
        },
        desc: {
          en: "Deep hydration for a fresher, brighter look.",
          ta: "புத்துணர்ச்சியான, பிரகாசமான தோற்றத்திற்கு ஆழ்ந்த ஹைட்ரேஷன்.",
          hi: "ताज़ा, चमकदार लुक के लिए गहरी हाइड्रेशन।",
          ml: "ഫ്രഷ്, ബ്രൈറ്റ് ലുക്കിന് ആഴത്തിലുള്ള ഹൈഡ്രേഷൻ.",
          te: "ఫ్రెష్, బ్రైట్ లుక్ కోసం లోతైన హైడ్రేషన్.",
        },
        mins: 75,
        price: 3200,
      },
    ],
  },
  {
    key: "consult",
    label: { en: "Consultation", ta: "ஆலோசனை", hi: "कंसल्टेशन", ml: "കൺസൾട്ടേഷൻ", te: "కన్సల్టేషన్" },
    intro: {
      en: "Start with a one-to-one chat about your skin and beauty goals.",
      ta: "உங்கள் சருமம் மற்றும் அழகு இலக்குகள் பற்றி தனிப்பட்ட உரையாடலுடன் தொடங்குங்கள்.",
      hi: "अपनी स्किन और ब्यूटी लक्ष्यों पर एक-से-एक बातचीत से शुरुआत करें।",
      ml: "നിങ്ങളുടെ ചർമ്മത്തെയും സൗന്ദര്യലക്ഷ്യങ്ങളെയും കുറിച്ചുള്ള വ്യക്തിഗത സംഭാഷണത്തോടെ തുടങ്ങൂ.",
      te: "మీ చర్మం, అందం లక్ష్యాల గురించి ఒకరితో ఒకరు మాట్లాడటంతో మొదలుపెట్టండి.",
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
        },
        desc: {
          en: "A one-to-one session with our beauty expert to plan the right skin and beauty routine for you.",
          ta: "உங்களுக்கு ஏற்ற சரும மற்றும் அழகு பராமரிப்பைத் திட்டமிட, எங்கள் அழகு நிபுணருடன் தனிப்பட்ட ஆலோசனை.",
          hi: "आपके लिए सही स्किन और ब्यूटी रूटीन तय करने के लिए हमारी ब्यूटी एक्सपर्ट के साथ एक-से-एक सत्र।",
          ml: "നിങ്ങൾക്ക് ചേരുന്ന ചർമ്മ-സൗന്ദര്യ പരിചരണം തീരുമാനിക്കാൻ ഞങ്ങളുടെ ബ്യൂട്ടി വിദഗ്ധയുമായുള്ള വ്യക്തിഗത സെഷൻ.",
          te: "మీకు సరిపోయే చర్మ, అందం సంరక్షణను నిర్ణయించడానికి మా బ్యూటీ నిపుణురాలితో ఒకరితో ఒకరు సెషన్.",
        },
        mins: 30,
        price: 500,
      },
    ],
  },
];

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
  lipstick: "/assets/products/variants/lipstick-nude.png",
  "night-cream": "/assets/products/variants/cream-nourishing.png",
  "skin-tint": "/assets/products/variants/blush-peach.png",
  highlighter: "/assets/products/variants/blush-pink.png",
};

export const productPhoto = (id: string) =>
  VARIANT_PHOTO[id] ?? `/assets/products/${id}.webp`;

/** One selectable colour / shade of a product. `img` is the product photo shown
 *  in the modal when the swatch is picked; `hex` is the swatch circle colour. */
export type Shade = { key: string; name: string; hex: string; img: string; sub?: L };

const V = "/assets/products/variants/";
const S = "/assets/products/shades/";
const P = "/assets/products/";

/** The first shade of every product is its default photo. The swatches in the product
 *  modal read from this list, so adding a shade here adds a swatch automatically. */
export const SHADES: Record<string, Shade[]> = {
  eclat: [
    { key: "rose", name: "Rose", hex: "#ef9a9a", img: V + "serum-rose.png" },
    { key: "aloe", name: "Aloe Vera", hex: "#9fd68c", img: V + "serum-aloe.png" },
    { key: "orange", name: "Orange", hex: "#f2c230", img: V + "serum-orange.png" },
  ],
  lipstick: [
    { key: "plum", name: "Plum Rose", hex: "#8e4a5a", img: V + "lipstick-nude.png" },
    {
      key: "berry",
      name: "Berry Red",
      hex: "#a81c3c",
      img: S + "lipstick-berry.webp",
      sub: {
        en: "Shade · Berry Red",
        ta: "நிழல் · பெர்ரி ரெட்",
        hi: "शेड · बेरी रेड",
        ml: "ഷേഡ് · ബെറി റെഡ്",
        te: "షేడ్ · బెర్రీ రెడ్",
      },
    },
    {
      key: "coral",
      name: "Coral",
      hex: "#cd6958",
      img: S + "lipstick-coral.webp",
      sub: {
        en: "Shade · Coral",
        ta: "நிழல் · கோரல்",
        hi: "शेड · कोरल",
        ml: "ഷേഡ് · കോറൽ",
        te: "షేడ్ · కోరల్",
      },
    },
    {
      key: "nude",
      name: "Soft Nude",
      hex: "#c48c78",
      img: S + "lipstick-nude.webp",
      sub: {
        en: "Shade · Soft Nude",
        ta: "நிழல் · சாஃப்ட் நியூட்",
        hi: "शेड · सॉफ्ट न्यूड",
        ml: "ഷേഡ് · സോഫ്റ്റ് ന്യൂഡ്",
        te: "షేడ్ · సాఫ్ట్ న్యూడ్",
      },
    },
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
