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
    key: "hair",
    label: { en: "Hair", ta: "முடி", hi: "बाल", ml: "മുടി", te: "జుట్టు" },
    intro: {
      en: "Cuts, colour and care by stylists who listen first.",
      ta: "முதலில் கேட்கும் ஸ்டைலிஸ்ட்களால் வெட்டு, நிறம் மற்றும் பராமரிப்பு.",
      hi: "पहले सुनने वाले स्टाइलिस्ट से कट, रंग और देखभाल।",
      ml: "ആദ്യം കേൾക്കുന്ന സ്റ്റൈലിസ്റ്റുകളുടെ കട്ട്, കളർ, പരിചരണം.",
      te: "ముందుగా వినే స్టైలిస్టుల నుండి కట్, రంగు మరియు సంరక్షణ.",
    },
    items: [
      {
        id: "h1",
        name: {
          en: "Signature cut & blow-dry",
          ta: "சிக்னேச்சர் கட் & ப்ளோ-ட்ரை",
          hi: "सिग्नेचर कट एवं ब्लो-ड्राई",
          ml: "സിഗ്നേച്ചർ കട്ട് & ബ്ലോ-ഡ്രൈ",
          te: "సిగ్నేచర్ కట్ & బ్లో-డ్రై",
        },
        desc: {
          en: "Consultation, wash, cut and a polished finish.",
          ta: "ஆலோசனை, கழுவுதல், வெட்டு மற்றும் பளபளப்பான முடிவு.",
          hi: "परामर्श, धुलाई, कट और चमकदार फिनिश।",
          ml: "കൺസൾട്ടേഷൻ, വാഷ്, കട്ട്, പോളിഷ്ഡ് ഫിനിഷ്.",
          te: "కన్సల్టేషన్, వాష్, కట్ మరియు పాలిష్డ్ ఫినిష్.",
        },
        mins: 60,
        price: 900,
      },
      {
        id: "h2",
        name: {
          en: "Velvet hair spa",
          ta: "வெல்வெட் ஹேர் ஸ்பா",
          hi: "वेलवेट हेयर स्पा",
          ml: "വെൽവെറ്റ് ഹെയർ സ്പാ",
          te: "వెల్వెట్ హెయిర్ స్పా",
        },
        desc: {
          en: "Deep-nourishing treatment with scalp massage.",
          ta: "ஸ்கால்ப் மசாஜுடன் ஆழ்ந்த ஊட்டமளிக்கும் சிகிச்சை.",
          hi: "स्कैल्प मसाज के साथ गहरी पोषण उपचार।",
          ml: "സ്കാൽപ്പ് മസാജോടെ ആഴത്തിലുള്ള പോഷക ചികിത്സ.",
          te: "స్కాల్ప్ మసాజ్‌తో లోతైన పోషక చికిత్స.",
        },
        mins: 75,
        price: 1800,
      },
      {
        id: "h3",
        name: {
          en: "Global colour",
          ta: "குளோபல் கலர்",
          hi: "ग्लोबल कलर",
          ml: "ഗ്ലോബൽ കളർ",
          te: "గ్లోబల్ కలర్",
        },
        desc: {
          en: "Full-colour service with shade consultation.",
          ta: "நிழல் ஆலோசனையுடன் முழு நிற சேவை.",
          hi: "शेड परामर्श के साथ पूर्ण रंग सेवा।",
          ml: "ഷേഡ് കൺസൾട്ടേഷനോടെ ഫുൾ കളർ സർവീസ്.",
          te: "షేడ్ కన్సల్టేషన్‌తో పూర్తి రంగు సేవ.",
        },
        mins: 120,
        price: 4500,
      },
      {
        id: "h4",
        name: {
          en: "Keratin smoothing",
          ta: "கெரட்டின் ஸ்மூத்திங்",
          hi: "केराटिन स्मूदिंग",
          ml: "കെരാറ്റിൻ സ്മൂത്തിംഗ്",
          te: "కెరాటిన్ స్మూతింగ్",
        },
        desc: {
          en: "Frizz-free, glossy hair that lasts for weeks.",
          ta: "வாரங்கள் நீடிக்கும் பிரிஸ்-இல்லா, பளபளப்பான முடி.",
          hi: "हफ्तों तक टिकने वाले फ्रिज-फ्री, चमकदार बाल।",
          ml: "ആഴ്ചകളോളം നിലനിൽക്കുന്ന ഫ്രിസ്-ഫ്രീ, തിളക്കമുള്ള മുടി.",
          te: "వారాల పాటు నిలిచే ఫ్రిజ్-ఫ్రీ, మెరిసే జుట్టు.",
        },
        mins: 180,
        price: 6500,
      },
    ],
  },
  {
    key: "skin",
    label: { en: "Skin & facials", ta: "தோல் & ஃபேஷியல்", hi: "त्वचा एवं फेशियल", ml: "ചർമ്മം & ഫേഷ്യൽ", te: "చర్మం & ఫేషియల్" },
    intro: {
      en: "Facials tailored to your skin, finished with our own products.",
      ta: "உங்கள் தோலுக்கு ஏற்ப ஃபேஷியல், எங்கள் தயாரிப்புகளுடன் முடிக்கப்படும்.",
      hi: "आपकी त्वचा के अनुसार फेशियल, हमारे उत्पादों से समाप्त।",
      ml: "നിങ്ങളുടെ ചർമ്മത്തിന് അനുയോജ്യമായ ഫേഷ്യൽ, ഞങ്ങളുടെ ഉൽപ്പന്നങ്ങളോടെ.",
      te: "మీ చర్మానికి అనుగుణంగా ఫేషియల్, మా ఉత్పత్తులతో పూర్తి.",
    },
    items: [
      {
        id: "s1",
        name: {
          en: "Velvet glow facial",
          ta: "வெல்வெட் குளோ ஃபேஷியல்",
          hi: "वेलवेट ग्लो फेशियल",
          ml: "വെൽവെറ്റ് ഗ്ലോ ഫേഷ്യൽ",
          te: "వెల్వెట్ గ్లో ఫేషియల్",
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
          en: "Hydra brightening facial",
          ta: "ஹைட்ரா பிரைட்டனிங் ஃபேஷியல்",
          hi: "हाइड्रा ब्राइटनिंग फेशियल",
          ml: "ഹൈഡ്ര ബ്രൈറ്റനിംഗ് ഫേഷ്യൽ",
          te: "హైడ్రా బ్రైటనింగ్ ఫేషియల్",
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
      {
        id: "s3",
        name: {
          en: "Gold radiance facial",
          ta: "கோல்ட் ரேடியன்ஸ் ஃபேஷியல்",
          hi: "गोल्ड रेडिएंस फेशियल",
          ml: "ഗോൾഡ് റേഡിയൻസ് ഫേഷ്യൽ",
          te: "గోల్డ్ రేడియన్స్ ఫేషియల్",
        },
        desc: {
          en: "Our most indulgent facial, with a lifting massage.",
          ta: "லிப்டிங் மசாஜுடன் எங்கள் மிகவும் ஆடம்பரமான ஃபேஷியல்.",
          hi: "लिफ्टिंग मसाज के साथ हमारा सबसे लक्जरी फेशियल।",
          ml: "ലിഫ്റ്റിംഗ് മസാജോടെ ഞങ്ങളുടെ ഏറ്റവും ലക്ഷ്വറി ഫേഷ്യൽ.",
          te: "లిఫ్టింగ్ మసాజ్‌తో మా అత్యంత లగ్జరీ ఫేషియల్.",
        },
        mins: 90,
        price: 4200,
      },
      {
        id: "s4",
        name: {
          en: "Express clean-up",
          ta: "எக்ஸ்பிரஸ் கிளீன்-அப்",
          hi: "एक्सप्रेस क्लीन-अप",
          ml: "എക്സ്പ്രസ് ക്ലീൻ-അപ്പ്",
          te: "ఎక్స్‌ప్రెస్ క్లీన్-అప్",
        },
        desc: {
          en: "A quick refresh before an event.",
          ta: "நிகழ்வுக்கு முன் விரைவான புத்துணர்ச்சி.",
          hi: "इवेंट से पहले तेज़ रिफ्रेश।",
          ml: "ഇവന്റിന് മുമ്പ് വേഗത്തിലുള്ള റിഫ്രഷ്.",
          te: "ఈవెంట్‌కు ముందు వేగవంతమైన రిఫ్రెష్.",
        },
        mins: 45,
        price: 1200,
      },
    ],
  },
  {
    key: "makeup",
    label: { en: "Makeup & bridal", ta: "மேக்கப் & பிரைடல்", hi: "मेकअप एवं ब्राइडल", ml: "മേക്കപ്പ് & ബ്രൈഡൽ", te: "మేకప్ & బ్రైడల్" },
    intro: {
      en: "From a soft evening look to full bridal artistry.",
      ta: "மென்மையான மாலை லுக் முதல் முழு பிரைடல் கலையம் வரை.",
      hi: "नरम शाम के लुक से लेकर पूर्ण ब्राइडल आर्टिस्ट्री तक।",
      ml: "മൃദുവായ സന്ധ്യ ലുക്ക് മുതൽ പൂർണ്ണ ബ്രൈഡൽ ആർട്ടിസ്ട്രി വരെ.",
      te: "మృదువైన సాయంత్ర లుక్ నుండి పూర్తి బ్రైడల్ ఆర్టిస్ట్రీ వరకు.",
    },
    items: [
      {
        id: "m1",
        name: {
          en: "Party makeup",
          ta: "பார்ட்டி மேக்கப்",
          hi: "पार्टी मेकअप",
          ml: "പാർട്ടി മേക്കപ്പ്",
          te: "పార్టీ మేకప్",
        },
        desc: {
          en: "A polished look for your evening.",
          ta: "உங்கள் மாலைக்கு பளபளப்பான லுக்.",
          hi: "आपकी शाम के लिए चमकदार लुक।",
          ml: "നിങ്ങളുടെ സന്ധ്യയ്ക്ക് പോളിഷ്ഡ് ലുക്ക്.",
          te: "మీ సాయంత్రం కోసం పాలిష్డ్ లుక్.",
        },
        mins: 60,
        price: 3500,
      },
      {
        id: "m2",
        name: {
          en: "Engagement / reception look",
          ta: "நிச்சயதார்த்த / வரவேற்பு லுக்",
          hi: "सगाई / रिसेप्शन लुक",
          ml: "നിശ്ചയം / റിസപ്ഷൻ ലുക്ക്",
          te: "నిశ్చితార్థం / రిసెప్షన్ లుక్",
        },
        desc: {
          en: "Long-wear makeup with hair styling.",
          ta: "ஹேர் ஸ்டைலிங்குடன் நீண்ட நேரம் நீடிக்கும் மேக்கப்.",
          hi: "हेयर स्टाइलिंग के साथ लंबे समय तक टिकने वाला मेकअप।",
          ml: "ഹെയർ സ്റ്റൈലിംഗോടെ ലോംഗ്-വെയർ മേക്കപ്പ്.",
          te: "హెయిర్ స్టైలింగ్‌తో లాంగ్-వేర్ మేకప్.",
        },
        mins: 120,
        price: 9000,
      },
      {
        id: "m3",
        name: {
          en: "HD bridal makeup",
          ta: "HD பிரைடல் மேக்கப்",
          hi: "HD ब्राइडल मेकअप",
          ml: "HD ബ്രൈഡൽ മേക്കപ്പ്",
          te: "HD బ్రైడల్ మేకప్",
        },
        desc: {
          en: "Trial-led bridal artistry for the big day.",
          ta: "பெரிய நாளுக்கான ட்ரையல்-உடன் பிரைடல் கலை.",
          hi: "बड़े दिन के लिए ट्रायल के साथ ब्राइडल आर्टिस्ट्री।",
          ml: "വലിയ ദിനത്തിനായി ട്രയൽ-ലെഡ് ബ്രൈഡൽ ആർട്ടിസ്ട്രി.",
          te: "పెద్ద రోజు కోసం ట్రయల్-లెడ్ బ్రైడల్ ఆర్టిస్ట్రీ.",
        },
        mins: 150,
        price: 15000,
      },
    ],
  },
  {
    key: "nails",
    label: { en: "Nails", ta: "நகங்கள்", hi: "नेल", ml: "നഖങ്ങൾ", te: "గోళ్ళు" },
    intro: {
      en: "Hands and feet, cared for beautifully.",
      ta: "கைகள் மற்றும் கால்கள், அழகாக பராமரிக்கப்படும்.",
      hi: "हाथ और पैर, खूबसूरती से देखभाल।",
      ml: "കൈകളും കാലുകളും, മനോഹരമായി പരിചരിക്കപ്പെടും.",
      te: "చేతులు మరియు పాదాలు, అందంగా సంరక్షించబడతాయి.",
    },
    items: [
      {
        id: "n1",
        name: {
          en: "Gel manicure",
          ta: "ஜெல் மானிக்யூர்",
          hi: "जेल मैनीक्योर",
          ml: "ജെൽ മാനിക്യുർ",
          te: "జెల్ మానిక్యూర్",
        },
        desc: {
          en: "Shaping, cuticle care and a glossy gel colour.",
          ta: "வடிவமைப்பு, க்யூட்டிகல் பராமரிப்பு மற்றும் பளபளப்பான ஜெல் நிறம்.",
          hi: "शेपिंग, क्यूटिकल केयर और चमकदार जेल रंग।",
          ml: "ഷേപ്പിംഗ്, ക്യൂട്ടിക്കിൾ കെയർ, ഗ്ലോസി ജെൽ കളർ.",
          te: "షేపింగ్, క్యూటికల్ కేర్ మరియు గ్లోసీ జెల్ రంగు.",
        },
        mins: 45,
        price: 1100,
      },
      {
        id: "n2",
        name: {
          en: "Spa pedicure",
          ta: "ஸ்பா பெடிக்யூர்",
          hi: "स्पा पेडीक्योर",
          ml: "സ്പാ പെഡിക്യുർ",
          te: "స్పా పెడిక్యూర్",
        },
        desc: {
          en: "Soak, scrub, massage and polish.",
          ta: "ஊறவைத்தல், ஸ்க்ரப், மசாஜ் மற்றும் பாலிஷ்.",
          hi: "सोक, स्क्रब, मसाज और पॉलिश।",
          ml: "സോക്ക്, സ്ക്രബ്, മസാജ്, പോളിഷ്.",
          te: "సోక్, స్క్రబ్, మసాజ్ మరియు పాలిష్.",
        },
        mins: 60,
        price: 1300,
      },
      {
        id: "n3",
        name: {
          en: "Nail art",
          ta: "நெயில் ஆர்ட்",
          hi: "नेल आर्ट",
          ml: "നെയിൽ ആർട്ട്",
          te: "నెయిల్ ఆర్ట్",
        },
        desc: {
          en: "Hand-finished designs, from subtle to statement.",
          ta: "கை முடித்த வடிவமைப்புகள், மென்மையானது முதல் ஸ்டேட்மென்ட் வரை.",
          hi: "हाथ से बने डिज़ाइन, सूक्ष्म से स्टेटमेंट तक।",
          ml: "കൈകൊണ്ട് പൂർത്തിയാക്കിയ ഡിസൈനുകൾ, സൂക്ഷ്മം മുതൽ സ്റ്റേറ്റ്മെന്റ് വരെ.",
          te: "చేతితో పూర్తి చేసిన డిజైన్లు, సూక్ష్మం నుండి స్టేట్‌మెంట్ వరకు.",
        },
        mins: 60,
        price: 1600,
      },
    ],
  },
  {
    key: "spa",
    label: { en: "Body & spa", ta: "உடல் & ஸ்பா", hi: "शरीर एवं स्पा", ml: "ശരീരം & സ്പാ", te: "శరీరం & స్పా" },
    intro: {
      en: "Slow, restorative treatments for the whole body.",
      ta: "முழு உடலுக்கும் மெதுவான, மீட்டெடுக்கும் சிகிச்சைகள்.",
      hi: "पूरे शरीर के लिए धीमे, पुनर्स्थापना उपचार।",
      ml: "മുഴുവൻ ശരീരത്തിനും മന്ദഗതിയിലുള്ള, പുനഃസ്ഥാപന ചികിത്സകൾ.",
      te: "మొత్తం శరీరానికి నెమ్మదైన, పునరుద్ధరణ చికిత్సలు.",
    },
    items: [
      {
        id: "b1",
        name: {
          en: "Aromatherapy massage",
          ta: "அரோமாதெரபி மசாஜ்",
          hi: "एरोमाथेरेपी मसाज",
          ml: "അരോമാതെറാപ്പി മസാജ്",
          te: "అరోమాథెరపీ మసాజ్",
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
      {
        id: "b2",
        name: {
          en: "Peach body polish",
          ta: "பீச் பாடி பாலிஷ்",
          hi: "पीच बॉडी पॉलिश",
          ml: "പീച്ച് ബോഡി പോളിഷ്",
          te: "పీచ్ బాడీ పాలిష్",
        },
        desc: {
          en: "Exfoliate and soften, finished with body butter.",
          ta: "எக்ஸ்ஃபோலியேட் மற்றும் மென்மையாக்கி, பாடி பட்டருடன் முடிக்கவும்.",
          hi: "एक्सफोलिएट और मुलायम बनाएं, बॉडी बटर से समाप्त।",
          ml: "എക്സ്ഫോളിയേറ്റ് ചെയ്ത് മൃദുവാക്കി, ബോഡി ബട്ടറോടെ പൂർത്തിയാക്കുക.",
          te: "ఎక్స్‌ఫోలియేట్ చేసి మృదువుగా చేసి, బాడీ బటర్‌తో పూర్తి చేయండి.",
        },
        mins: 75,
        price: 3000,
      },
      {
        id: "b4",
        name: {
          en: "Herbal Abhyanga massage",
          ta: "மூலிகை அப்யங்க மசாஜ்",
          hi: "हर्बल अभ्यंग मसाज",
          ml: "ഹെർബൽ അഭ്യംഗ മസാജ്",
          te: "హెర్బల్ అభ్యంగ మసాజ్",
        },
        desc: {
          en: "Warm herbal-oil full-body massage in the classic Ayurvedic style.",
          ta: "கிளாசிக் ஆயுர்வேத பாணியில் சூடான மூலிகை எண்ணெய் முழு உடல் மசாஜ்.",
          hi: "क्लासिक आयुर्वेदिक शैली में गर्म हर्बल तेल पूर्ण शरीर मसाज।",
          ml: "ക്ലാസിക് ആയുർവേദ ശൈലിയിൽ ചൂടുള്ള ഹെർബൽ ഓയിൽ മുഴുവൻ ശരീര മസാജ്.",
          te: "క్లాసిక్ ఆయుర్వేద శైలిలో వెచ్చని హెర్బల్ నూనె పూర్తి శరీర మసాజ్.",
        },
        mins: 75,
        price: 3200,
      },
      {
        id: "b5",
        name: {
          en: "Hot stone therapy",
          ta: "ஹாட் ஸ்டோன் தெரபி",
          hi: "हॉट स्टोन थेरेपी",
          ml: "ഹോട്ട് സ്റ്റോൺ തെറാപ്പി",
          te: "హాట్ స్టోన్ థెరపీ",
        },
        desc: {
          en: "Heated basalt stones melt tension from back, shoulders and legs.",
          ta: "சூடான பசால்ட் கற்கள் முதுகு, தோள்கள், கால்களில் இருந்து பதற்றத்தை கரைக்கும்.",
          hi: "गर्म बेसाल्ट पत्थर पीठ, कंधों और पैरों से तनाव घोलते हैं।",
          ml: "ചൂടുള്ള ബസാൾട്ട് കല്ലുകൾ പുറം, തോളുകൾ, കാലുകളിൽ നിന്ന് ടെൻഷൻ ഉരുക്കും.",
          te: "వేడి బసాల్ట్ రాళ్లు వెనుక, భుజాలు, కాళ్ల నుండి ఒత్తిడిని కరిగిస్తాయి.",
        },
        mins: 75,
        price: 3600,
      },
      {
        id: "b6",
        name: {
          en: "Shirodhara herbal oil flow",
          ta: "சிரோதாரா மூலிகை எண்ணெய் ஓட்டம்",
          hi: "शिरोधारा हर्बल तेल प्रवाह",
          ml: "ശിരോധാര ഹെർബൽ ഓയിൽ ഫ്ലോ",
          te: "శిరోధార హెర్బల్ నూనె ప్రవాహం",
        },
        desc: {
          en: "A slow stream of warm herbal oil over the forehead for deep calm.",
          ta: "ஆழ்ந்த அமைதிக்காக நெற்றியில் சூடான மூலிகை எண்ணெயின் மெதுவான ஓட்டம்.",
          hi: "गहरी शांति के लिए माथे पर गर्म हर्बल तेल की धीमी धारा।",
          ml: "ആഴത്തിലുള്ള ശാന്തതയ്ക്ക് നെറ്റിയിൽ ചൂടുള്ള ഹെർബൽ ഓയിലിന്റെ മന്ദഗതി ഒഴുക്ക്.",
          te: "లోతైన ప్రశాంతత కోసం నుదుటిపై వెచ్చని హెర్బల్ నూనె నెమ్మది ప్రవాహం.",
        },
        mins: 60,
        price: 3800,
      },
      {
        id: "b7",
        name: {
          en: "Foot reflexology",
          ta: "கால் ரிஃப்ளெக்சாலஜி",
          hi: "फुट रिफ्लेक्सोलॉजी",
          ml: "ഫൂട്ട് റിഫ്ലെക്സോളജി",
          te: "ఫుట్ రిఫ్లెక్సాలజీ",
        },
        desc: {
          en: "Pressure-point therapy with a herbal foot soak and balm.",
          ta: "மூலிகை கால் ஊறவைத்தல் மற்றும் பாம் உடன் அழுத்த புள்ளி சிகிச்சை.",
          hi: "हर्बल फुट सोक और बाम के साथ प्रेशर-पॉइंट थेरेपी।",
          ml: "ഹെർബൽ ഫൂട്ട് സോക്കും ബാമും ഉള്ള പ്രഷർ-പോയിന്റ് തെറാപ്പി.",
          te: "హెర్బల్ ఫుట్ సోక్ మరియు బామ్‌తో ప్రెషర్-పాయింట్ థెరపీ.",
        },
        mins: 45,
        price: 1400,
      },
      {
        id: "b8",
        name: {
          en: "Head, neck & shoulder massage",
          ta: "தலை, கழுத்து & தோள் மசாஜ்",
          hi: "सिर, गर्दन एवं कंधे मसाज",
          ml: "തല, കഴുത്ത് & തോൾ മസാജ്",
          te: "తల, మెడ & భుజం మసాజ్",
        },
        desc: {
          en: "A focused massage with warm oil to release screen-day tension.",
          ta: "ஸ்கிரீன்-நாள் பதற்றத்தை விடுவிக்க சூடான எண்ணெயுடன் கவனம் செலுத்திய மசாஜ்.",
          hi: "स्क्रीन-दिन तनाव छोड़ने के लिए गर्म तेल के साथ फोकस्ड मसाज।",
          ml: "സ്ക്രീൻ-ദിന ടെൻഷൻ വിടാൻ ചൂടുള്ള ഓയിലോടെ ഫോക്കസ്ഡ് മസാജ്.",
          te: "స్క్రీన్-రోజు ఒత్తిడిని వదిలించడానికి వెచ్చని నూనెతో ఫోకస్డ్ మసాజ్.",
        },
        mins: 30,
        price: 1100,
      },
      {
        id: "b9",
        name: {
          en: "Couple's spa ritual",
          ta: "ஜோடி ஸ்பா சடங்கு",
          hi: "कपल का स्पा रिचुअल",
          ml: "കപ്പിൾസ് സ്പാ റിച്വൽ",
          te: "కపుల్స్ స్పా రిచువల్",
        },
        desc: {
          en: "Side-by-side aroma massage, herbal steam and a shared tea ritual.",
          ta: "பக்கத்து பக்க அரோமா மசாஜ், மூலிகை நீராவி மற்றும் பகிரப்பட்ட தேநீர் சடங்கு.",
          hi: "साइड-बाय-साइड अरोमा मसाज, हर्बल स्टीम और साझा चाय रिचुअल।",
          ml: "സൈഡ്-ബൈ-സൈഡ് അരോമ മസാജ്, ഹെർബൽ സ്റ്റീം, പങ്കിട്ട ടീ റിച്വൽ.",
          te: "సైడ్-బై-సైడ్ అరోమా మసాజ్, హెర్బల్ స్టీమ్ మరియు పంచుకునే టీ రిచువల్.",
        },
        mins: 120,
        price: 9500,
      },
      {
        id: "b3",
        name: {
          en: "Waxing — arms & legs",
          ta: "வாக்ஸிங் — கைகள் & கால்கள்",
          hi: "वैक्सिंग — बाँहें एवं पैर",
          ml: "വാക്സിംഗ് — കൈകൾ & കാലുകൾ",
          te: "వాక్సింగ్ — చేతులు & కాళ్లు",
        },
        desc: {
          en: "Gentle, careful waxing for smooth skin.",
          ta: "மென்மையான தோலுக்கு மென்மையான, கவனமுள்ள வாக்ஸிங்.",
          hi: "चिकनी त्वचा के लिए कोमल, सावधानीपूर्ण वैक्सिंग।",
          ml: "മൃദുവായ ചർമ്മത്തിന് മൃദുവായ, ശ്രദ്ധയുള്ള വാക്സിംഗ്.",
          te: "మృదువైన చర్మం కోసం మృదువైన, జాగ్రత్తగా వాక్సింగ్.",
        },
        mins: 45,
        price: 1100,
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
