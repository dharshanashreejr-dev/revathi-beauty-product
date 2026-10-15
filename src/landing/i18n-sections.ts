import type { Lang } from "./data";

// UI text for the swipe sections in sections.tsx (all 8 languages).
// Marketing data (herbal copy, bundle titles...) still lives in showcase.ts / showcase-i18n.ts.

type T = Partial<Record<Lang, string>> & { en: string };

const d = {
  // HerbalShowcase
  touch: { en: "Touch the points to explore the herbs", ta: "மூலிகைகளை அறிய புள்ளிகளைத் தொடவும்", hi: "जड़ी-बूटियों को जानने के लिए बिंदुओं को छुएँ", ml: "ഔഷധസസ്യങ്ങൾ അറിയാൻ പോയിന്റുകളിൽ തൊടുക", te: "మూలికలను తెలుసుకోవడానికి పాయింట్లను తాకండి" , kn: "ಮೂಲಿಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಸ್ಪರ್ಶಿಸಿ", mr: "औषधी वनस्पती जाणून घेण्यासाठी बिंदू स्पर्श करा", bn: "ভেষজ অন্বেষণ করতে পয়েন্টগুলো স্পর্শ করুন"},
  herbalCollection: { en: "Herbal collection", ta: "மூலிகைத் தொகுப்பு", hi: "हर्बल कलेक्शन", ml: "ഹെർബൽ കളക്ഷൻ", te: "హెర్బల్ కలెక్షన్" , kn: "ಹರ್ಬಲ್ ಕಲೆಕ್ಷನ್", mr: "हर्बल कलेक्शन", bn: "হার্বাল কালেকশন"},
  herbalInfused: { en: "Herbal-infused", ta: "மூலிகைக் கலவை", hi: "हर्बल-इन्फ्यूज़्ड", ml: "ഹെർബൽ-ഇൻഫ്യൂസ്ഡ്", te: "హెర్బల్-ఇన్ఫ్యూజ్డ్" , kn: "ಹರ್ಬಲ್-ಇನ್‌ಫ್ಯೂಸ್ಡ್", mr: "हर्बल-इन्फ्यूज्ड", bn: "হার্বাল-ইনফিউজড"},
  productColour: { en: "Choose colour", ta: "நிறத்தைத் தேர்வு செய்யுங்கள்", hi: "रंग चुनें", ml: "നിറം തിരഞ്ഞെടുക്കൂ", te: "రంగును ఎంచుకోండి", kn: "ಬಣ್ಣ ಆಯ್ಕೆಮಾಡಿ", mr: "रंग निवडा", bn: "রং বেছে নিন" },
  viewAllProducts: { en: "View all products", ta: "அனைத்து பொருட்களையும் காண்க", hi: "सभी प्रोडक्ट देखें", ml: "എല്ലാ ഉൽപ്പന്നങ്ങളും കാണൂ", te: "అన్ని ఉత్పత్తులు చూడండి", kn: "ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳನ್ನು ನೋಡಿ", mr: "सर्व उत्पादने पहा", bn: "সব পণ্য দেখুন" },
  setLight: { en: "Set the light", ta: "ஒளியை அமைக்கவும்", hi: "रोशनी चुनें", ml: "വെളിച്ചം തിരഞ്ഞെടുക്കൂ", te: "కాంతిని ఎంచుకోండి" , kn: "ಬೆಳಕನ್ನು ಹೊಂದಿಸಿ", mr: "प्रकाश सेट करा", bn: "আলো সেট করুন"},
  dusk: { en: "Dusk", ta: "அந்தி", hi: "संध्या", ml: "സന്ധ്യ", te: "సంధ్య" , kn: "ಸಂಧ್ಯಾ", mr: "संध्या", bn: "সন্ধ্যা"},
  ivory: { en: "Ivory", ta: "தந்தம்", hi: "आइवरी", ml: "ഐവറി", te: "ఐవరీ" , kn: "ಐವರಿ", mr: "आयव्हरी", bn: "আইভরি"},
  bloom: { en: "Bloom", ta: "மலர்", hi: "ब्लूम", ml: "ബ്ലൂം", te: "బ్లూమ్" , kn: "ಬ್ಲೂಮ್", mr: "ब्लूम", bn: "ব্লুম"},
  discover: { en: "Discover", ta: "கண்டறிக", hi: "जानें", ml: "അറിയാം", te: "తెలుసుకోండి" , kn: "ಅನ್ವೇಷಿಸಿ", mr: "शोधा", bn: "আবিষ্কার করুন"},
  addToBag: { en: "Add to bag", ta: "பையில் சேர்", hi: "बैग में डालें", ml: "ബാഗിൽ ചേർക്കുക", te: "బ్యాగ్‌లో చేర్చండి" , kn: "ಬ್ಯಾಗ್‌ಗೆ ಸೇರಿಸಿ", mr: "बॅगमध्ये घाला", bn: "ব্যাগে যোগ করুন"},
  slideOf: { en: "of", ta: "/", hi: "में से", ml: "/", te: "/" , kn: "/", mr: "/", bn: "/"},
  chooseProduct: { en: "Choose product", ta: "பொருளைத் தேர்வு செய்", hi: "प्रोडक्ट चुनें", ml: "ഉൽപ്പന്നം തിരഞ്ഞെടുക്കുക", te: "ఉత్పత్తిని ఎంచుకోండి" , kn: "ಉತ್ಪನ್ನವನ್ನು ಆಯ್ಕೆಮಾಡಿ", mr: "उत्पाद निवडा", bn: "পণ্য বেছে নিন"},
  herbalEdit: { en: "The herbal edit", ta: "மூலிகைத் தேர்வு", hi: "हर्बल एडिट", ml: "ഹെർബൽ എഡിറ്റ്", te: "హెర్బల్ ఎడిట్" , kn: "ಹರ್ಬಲ್ ಎಡಿಟ್", mr: "हर्बल एडिट", bn: "হার্বাল এডিট"},
  offers: { en: "Current offers.", ta: "ஸ்வைப் செய்யத் தகுந்த சலுகைகள்.", hi: "स्वाइप करने लायक ऑफ़र।", ml: "സ്വൈപ്പ് ചെയ്യാൻ യോഗ്യമായ ഓഫറുകൾ.", te: "స్వైప్ చేయదగిన ఆఫర్లు." , kn: "ಪ್ರಸ್ತುತ ಆಫರ್‌ಗಳು.", mr: "सध्याचे ऑफर.", bn: "বর্তমান অফার।"},
  offersLabel: { en: "Offers", ta: "சலுகைகள்", hi: "ऑफ़र", ml: "ഓഫറുകൾ", te: "ఆఫర్లు" , kn: "ಆಫರ್‌ಗಳು", mr: "ऑफर", bn: "অফার"},
  shopNow: { en: "Shop Now", ta: "இப்போது வாங்கு", hi: "अभी खरीदें", ml: "ഇപ്പോൾ വാങ്ങൂ", te: "ఇప్పుడే కొనండి" , kn: "ಈಗ ಖರೀದಿಸಿ", mr: "आता खरेदी करा", bn: "এখনই কিনুন"},

  // VideoBand
  filmEyebrow: { en: "Brand Video", ta: "திரைப்படம்", hi: "फ़िल्म", ml: "ഫിലിം", te: "ఫిల్మ్" , kn: "ಬ್ರ್ಯಾಂಡ್ ವೀಡಿಯೊ", mr: "ब्रँड व्हिडिओ", bn: "ব্র্যান্ড ভিডিও"},
  filmTitle: { en: "Our services in action.", ta: "எங்கள் சேவைகள் செயலில்.", hi: "हमारी सेवाएँ, काम करते हुए।", ml: "ഞങ്ങളുടെ സേവനങ്ങൾ പ്രവർത്തനത്തിൽ.", te: "మా సేవలు ఆచరణలో." , kn: "ನಮ್ಮ ಸೇವೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.", mr: "आमच्या सेवा कृतीत.", bn: "আমাদের সেবা কর্মরত।"},
  filmPara: {
    en: "A few quiet minutes inside REVATHI HERBAL BEAUTY CARE. From the first herbal oil to the final glow.",
    ta: "REVATHI HERBAL BEAUTY CARE-க்குள் சில அமைதியான நிமிடங்கள். முதல் மூலிகை எண்ணெயிலிருந்து இறுதிப் பொலிவு வரை.",
    hi: "REVATHI HERBAL BEAUTY CARE के भीतर कुछ शांत पल। पहले हर्बल तेल से लेकर आख़िरी ग्लो तक।",
    ml: "REVATHI HERBAL BEAUTY CARE-നുള്ളിൽ ശാന്തമായ ചില നിമിഷങ്ങൾ. ആദ്യ ഹെർബൽ എണ്ണ മുതൽ അവസാന തിളക്കം വരെ.",
    te: "REVATHI HERBAL BEAUTY CARE లోపల కొన్ని ప్రశాంత క్షణాలు. మొదటి హెర్బల్ నూనె నుండి చివరి మెరుపు వరకు.",
  },
  filmTag: { en: "Beauty · Salon · Spa", ta: "அழகு · சலூன் · ஸ்பா", hi: "ब्यूटी · सैलून · स्पा", ml: "ബ്യൂട്ടി · സലൂൺ · സ്പാ", te: "బ్యూటీ · సెలూన్ · స్పా" , kn: "Beauty · Salon · Spa", mr: "Beauty · Salon · Spa", bn: "Beauty · Salon · Spa"},
  filmLine: {
    en: "Where every day turns a little more luxurious.",
    ta: "ஒவ்வொரு நாளும் இன்னும் கொஞ்சம் ஆடம்பரமாக மாறும் இடம்.",
    hi: "जहाँ हर दिन थोड़ा और शाही हो जाता है।",
    ml: "ഓരോ ദിവസവും അല്പം കൂടി ആഡംബരമാകുന്നയിടം.",
    te: "ప్రతి రోజు కొంచెం మరింత విలాసవంతంగా మారే చోటు.",
  },
  bookAppt: { en: "Book an appointment", ta: "அப்பாயின்ட்மென்ட் பதிவு செய்", hi: "अपॉइंटमेंट बुक करें", ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ", te: "అపాయింట్‌మెంట్ బుక్ చేయండి" , kn: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ", mr: "अपॉइंटमेंट बुक करा", bn: "অ্যাপয়েন্টমেন্ট বুক করুন"},
  pause: { en: "Pause", ta: "இடைநிறுத்து", hi: "रोकें", ml: "നിർത്തുക", te: "ఆపండి" , kn: "ವಿರಾಮ", mr: "थांबवा", bn: "বিরতি"},
  play: { en: "Play", ta: "இயக்கு", hi: "चलाएँ", ml: "പ്ലേ", te: "ప్లే" , kn: "ಪ್ಲೇ", mr: "चालवा", bn: "চালান"},
  pauseFilm: { en: "Pause film", ta: "வீடியோவை இடைநிறுத்து", hi: "फ़िल्म रोकें", ml: "ഫിലിം നിർത്തുക", te: "ఫిల్మ్ ఆపండి" , kn: "Pause film", mr: "Pause film", bn: "Pause film"},
  playFilm: { en: "Play film", ta: "வீடியோவை இயக்கு", hi: "फ़िल्म चलाएँ", ml: "ഫിലിം പ്ലേ ചെയ്യുക", te: "ఫిల్మ్ ప్లే చేయండి" , kn: "Play film", mr: "Play film", bn: "Play film"},
  reelSalonTag: { en: "The salon", ta: "சலூன்", hi: "सैलून", ml: "സലൂൺ", te: "సెలూన్" , kn: "The salon", mr: "The salon", bn: "The salon"},
  reelSalonLine: { en: "Hair wash to hood dryer", ta: "ஹேர் வாஷ் முதல் ஹூட் டிரையர் வரை", hi: "हेयर वॉश से हुड ड्रायर तक", ml: "ഹെയർ വാഷ് മുതൽ ഹുഡ് ഡ്രയർ വരെ", te: "హెయిర్ వాష్ నుండి హుడ్ డ్రయ్యర్ వరకు" , kn: "Hair wash to hood dryer", mr: "Hair wash to hood dryer", bn: "Hair wash to hood dryer"},
  reelSpaTag: { en: "The spa", ta: "ஸ்பா", hi: "स्पा", ml: "സ്പാ", te: "స్పా" , kn: "The spa", mr: "The spa", bn: "The spa"},
  reelSpaLine: { en: "Herbal rituals, slowly", ta: "மூலிகைச் சடங்குகள், நிதானமாக", hi: "हर्बल रिचुअल, धीरे-धीरे", ml: "ഹെർബൽ റിച്വലുകൾ, സാവധാനം", te: "హెర్బల్ రిచువల్స్, నెమ్మదిగా" , kn: "Herbal rituals, slowly", mr: "Herbal rituals, slowly", bn: "Herbal rituals, slowly"},
  reelMakeupTag: { en: "The makeup", ta: "மேக்கப்", hi: "मेकअप", ml: "മേക്കപ്പ്", te: "మేకప్" , kn: "The makeup", mr: "The makeup", bn: "The makeup"},
  reelMakeupLine: { en: "Velvet lips, golden finish", ta: "வெல்வெட் உதடுகள், தங்க முடிவு", hi: "वेलवेट लिप्स, गोल्डन फ़िनिश", ml: "വെൽവെറ്റ് ചുണ്ടുകൾ, സ്വർണ്ണ ഫിനിഷ്", te: "వెల్వెట్ లిప్స్, గోల్డెన్ ఫినిష్" , kn: "Velvet lips, golden finish", mr: "Velvet lips, golden finish", bn: "Velvet lips, golden finish"},

  // NineDays
  nineTitle: {
    en: "Nine festive looks",
    ta: "உங்கள் 9 நிழல்கள் — எங்கள் சிக்னேச்சர் பொருட்கள் & ஸ்பா",
    hi: "आपके 9 शेड्स — हमारे सिग्नेचर प्रोडक्ट्स और स्पा में",
    ml: "നിങ്ങളുടെ 9 ഷേഡുകൾ — ഞങ്ങളുടെ സിഗ്നേച്ചർ ഉൽപ്പന്നങ്ങളും സ്പായും",
    te: "మీ 9 షేడ్స్ — మా సిగ్నేచర్ ఉత్పత్తులు & స్పా",
  },
  nineSub: {
    en: "Festive seasons are coming UP!",
    ta: "பண்டிகைக் காலம் வருகிறது!",
    hi: "त्योहार का सीज़न आ रहा है!",
    ml: "ഉത്സവ സീസൺ വരുന്നു!",
    te: "పండుగ సీజన్ రాబోతోంది!",
  },
  ninePara: {
    en: "Nine colours, nine looks. Pick your day and let our artists dress you in it.",
    ta: "ஒன்பது வண்ணங்கள், ஒன்பது தோற்றங்கள். உங்கள் நாளைத் தேர்ந்தெடுங்கள், எங்கள் கலைஞர்கள் உங்களை அலங்கரிக்கட்டும்.",
    hi: "नौ रंग, नौ लुक। अपना दिन चुनें और हमारे आर्टिस्ट आपको उसी में सजाएँगे।",
    ml: "ഒൻപത് നിറങ്ങൾ, ഒൻപത് ലുക്കുകൾ. നിങ്ങളുടെ ദിവസം തിരഞ്ഞെടുക്കൂ, ഞങ്ങളുടെ ആർട്ടിസ്റ്റുകൾ അണിയിച്ചൊരുക്കും.",
    te: "తొమ్మిది రంగులు, తొమ్మిది లుక్‌లు. మీ రోజును ఎంచుకోండి, మా ఆర్టిస్టులు మిమ్మల్ని అలంకరిస్తారు.",
  },
  day: { en: "DAY", ta: "நாள்", hi: "दिन", ml: "ദിനം", te: "రోజు" , kn: "DAY", mr: "DAY", bn: "DAY"},
  bookFestive: { en: "Book your festive look", ta: "உங்கள் பண்டிகைத் தோற்றத்தைப் பதிவு செய்", hi: "अपना फ़ेस्टिव लुक बुक करें", ml: "നിങ്ങളുടെ ഫെസ്റ്റിവ് ലുക്ക് ബുക്ക് ചെയ്യൂ", te: "మీ పండుగ లుక్ బుక్ చేయండి" , kn: "Book your festive look", mr: "Book your festive look", bn: "Book your festive look"},
  festiveLooks: { en: "Festive looks", ta: "பண்டிகைத் தோற்றங்கள்", hi: "फ़ेस्टिव लुक", ml: "ഫെസ്റ്റിവ് ലുക്കുകൾ", te: "పండుగ లుక్‌లు" , kn: "Festive looks", mr: "Festive looks", bn: "Festive looks"},
  cursorBook: { en: "Book", ta: "பதிவு", hi: "बुक", ml: "ബുക്ക്", te: "బుక్" , kn: "Book", mr: "Book", bn: "Book"},

  // Landing.tsx leftovers
  introEyebrow: { en: "BEAUTY · SALON · BOUTIQUE", ta: "அழகு · சலூன் · பூட்டிக்", hi: "ब्यूटी · सैलून · बुटीक", ml: "ബ്യൂട്ടി · സലൂൺ · ബൂട്ടീക്", te: "బ్యూటీ · సెలూన్ · బొటీక్" , kn: "BEAUTY · SALON · BOUTIQUE", mr: "BEAUTY · SALON · BOUTIQUE", bn: "BEAUTY · SALON · BOUTIQUE"},
  heroTagline: { en: "The exclusive beauty products and spa!", ta: "பிரத்யேக அழகுப் பொருட்கள் மற்றும் ஸ்பா!", hi: "एक्सक्लूसिव ब्यूटी प्रोडक्ट्स और स्पा!", ml: "എക്സ്ക്ലൂസീവ് ബ്യൂട്ടി ഉൽപ്പന്നങ്ങളും സ്പായും!", te: "ప్రత్యేకమైన బ్యూటీ ఉత్పత్తులు మరియు స్పా!" , kn: "The exclusive beauty products and spa!", mr: "The exclusive beauty products and spa!", bn: "The exclusive beauty products and spa!"},
  salonBanner: { en: "The women's luxury salon · Massage · Facials · Glow", ta: "பெண்களுக்கான ஆடம்பர சலூன் · மசாஜ் · ஃபேஷியல் · ஒளி", hi: "महिलाओं का लग्ज़री सैलून · मसाज · फेशियल · ग्लो", ml: "സ്ത്രീകൾക്കായുള്ള ലക്ഷ്വറി സലൂൺ · മസാജ് · ഫേഷ്യൽ · തിളക്കം", te: "మహిళల లగ్జరీ సెలూన్ · మసాజ్ · ఫేషియల్స్ · గ్లో" , kn: "The women's luxury salon · Massage · Facials · Glow", mr: "The women's luxury salon · Massage · Facials · Glow", bn: "The women's luxury salon · Massage · Facials · Glow"},
  homeAria: { en: "home", ta: "முகப்புப் பக்கம்", hi: "होम", ml: "ഹോം", te: "హోమ్" , kn: "home", mr: "home", bn: "home"},

  // SpaOfferings
  spaEyebrow: { en: "Spa Treatments", ta: "ஸ்பா", hi: "स्पा", ml: "സ്പാ", te: "స్పా" , kn: "Spa Treatments", mr: "Spa Treatments", bn: "Spa Treatments"},
  spaTitle: { en: "Herbal spa treatments.", ta: "நிதானமான, மூலிகை, புத்துணர்ச்சி.", hi: "धीमा, हर्बल, ताज़गी भरा।", ml: "സാവധാനം, ഹെർബൽ, പുനരുജ്ജീവനം.", te: "నెమ్మదిగా, హెర్బల్, పునరుజ్జీవనం." , kn: "Herbal spa treatments.", mr: "Herbal spa treatments.", bn: "Herbal spa treatments."},
  spaPara: {
    en: "Every spa treatment uses warm herbal oils and is finished with a product from our collection. Scroll or swipe through each ritual and reserve your time.",
    ta: "ஒவ்வொரு ஸ்பா சிகிச்சையிலும் வெதுவெதுப்பான மூலிகை எண்ணெய்கள் பயன்படுத்தப்பட்டு, எங்கள் தொகுப்பிலிருந்து ஒரு பொருளுடன் நிறைவு செய்யப்படும். ஒவ்வொரு சடங்கையும் ஸ்க்ரோல் அல்லது ஸ்வைப் செய்து பார்த்து, உங்கள் நேரத்தைப் பதிவு செய்யுங்கள்.",
    hi: "हर स्पा ट्रीटमेंट में गुनगुने हर्बल तेलों का उपयोग होता है और अंत में हमारे कलेक्शन का एक प्रोडक्ट लगाया जाता है। हर रिचुअल को स्क्रॉल या स्वाइप करके देखें और अपना समय आरक्षित करें।",
    ml: "ഓരോ സ്പാ ചികിത്സയിലും ചൂടുള്ള ഹെർബൽ എണ്ണകൾ ഉപയോഗിക്കുകയും ഞങ്ങളുടെ കളക്ഷനിലെ ഒരു ഉൽപ്പന്നം കൊണ്ട് പൂർത്തിയാക്കുകയും ചെയ്യുന്നു. ഓരോ റിച്വലും സ്ക്രോൾ ചെയ്തോ സ്വൈപ്പ് ചെയ്തോ കണ്ട് നിങ്ങളുടെ സമയം ബുക്ക് ചെയ്യൂ.",
    te: "ప్రతి స్పా ట్రీట్‌మెంట్‌లో వెచ్చని హెర్బల్ నూనెలు వాడతారు, మా కలెక్షన్ నుండి ఒక ఉత్పత్తితో ముగిస్తారు. ప్రతి రిచువల్‌ను స్క్రోల్ లేదా స్వైప్ చేసి చూసి, మీ సమయాన్ని రిజర్వ్ చేసుకోండి.",
  },
  min: { en: "min", ta: "நிமி", hi: "मिनट", ml: "മിനിറ്റ്", te: "నిమి" , kn: "min", mr: "min", bn: "min"},
  finishedWith: { en: "Finished with", ta: "நிறைவு:", hi: "अंत में:", ml: "പൂർത്തിയാക്കുന്നത്:", te: "ముగింపు:" , kn: "Finished with", mr: "Finished with", bn: "Finished with"},
  book: { en: "Book", ta: "பதிவு செய்", hi: "बुक करें", ml: "ബുക്ക് ചെയ്യൂ", te: "బుక్ చేయండి" , kn: "Book", mr: "Book", bn: "Book"},
  spaOfferingsLabel: { en: "Spa offerings", ta: "ஸ்பா சேவைகள்", hi: "स्पा ऑफ़रिंग", ml: "സ്പാ ഓഫറിംഗുകൾ", te: "స్పా ఆఫరింగ్స్" , kn: "Spa offerings", mr: "Spa offerings", bn: "Spa offerings"},
  showSpa: { en: "Show spa ritual", ta: "ஸ்பா சடங்கைக் காட்டு", hi: "स्पा रिचुअल दिखाएँ", ml: "സ്പാ റിച്വൽ കാണിക്കുക", te: "స్పా రిచువల్ చూపండి" , kn: "Show spa ritual", mr: "Show spa ritual", bn: "Show spa ritual"},

  // Hero slideshow image descriptions (alt text)
  heroAlt1: { en: "Luxury skincare and makeup arranged on a stone ledge among wildflowers, with a golden mountain valley beyond", ta: "காட்டுப் பூக்களுக்கு நடுவே கல் விளிம்பில் அடுக்கப்பட்ட ஆடம்பர சருமப் பராமரிப்பு மற்றும் ஒப்பனைப் பொருட்கள்; பின்னணியில் பொன்னிற மலைப் பள்ளத்தாக்கு", hi: "जंगली फूलों के बीच पत्थर की मुंडेर पर सजे लक्ज़री स्किनकेयर और मेकअप प्रोडक्ट्स, पीछे सुनहरी पहाड़ी घाटी", ml: "കാട്ടുപൂക്കൾക്കിടയിൽ കല്ലിന്റെ തിട്ടയിൽ നിരത്തിയ ആഡംബര ചർമ്മസംരക്ഷണ-മേക്കപ്പ് ഉൽപ്പന്നങ്ങൾ, പിന്നിൽ സ്വർണ്ണനിറമുള്ള മലയോര താഴ്‌വര", te: "అడవి పూల మధ్య రాతి అంచుపై అమర్చిన లగ్జరీ స్కిన్‌కేర్ మరియు మేకప్ ఉత్పత్తులు, వెనుక బంగారు రంగు పర్వత లోయ" , kn: "Luxury skincare and makeup arranged on a stone ledge among wildflowers, with a golden mountain valley beyond", mr: "Luxury skincare and makeup arranged on a stone ledge among wildflowers, with a golden mountain valley beyond", bn: "Luxury skincare and makeup arranged on a stone ledge among wildflowers, with a golden mountain valley beyond"},
  heroAlt2: { en: "A woman relaxing at the edge of an infinity pool at a mountain spa while a therapist massages her shoulders", ta: "மலை ஸ்பாவில் இன்ஃபினிட்டி பூல் ஓரத்தில் ஓய்வெடுக்கும் பெண்ணின் தோள்களை தெரபிஸ்ட் மசாஜ் செய்கிறார்", hi: "पहाड़ी स्पा में इन्फिनिटी पूल के किनारे आराम करती एक महिला, जिसके कंधों की मालिश थेरेपिस्ट कर रही है", ml: "മലയോര സ്പായിലെ ഇൻഫിനിറ്റി പൂളിന്റെ അരികിൽ വിശ്രമിക്കുന്ന സ്ത്രീയുടെ തോളുകൾ തെറാപ്പിസ്റ്റ് മസാജ് ചെയ്യുന്നു", te: "పర్వత స్పాలో ఇన్ఫినిటీ పూల్ అంచున విశ్రాంతి తీసుకుంటున్న మహిళ భుజాలకు థెరపిస్ట్ మసాజ్ చేస్తున్నారు" , kn: "A woman relaxing at the edge of an infinity pool at a mountain spa while a therapist massages her shoulders", mr: "A woman relaxing at the edge of an infinity pool at a mountain spa while a therapist massages her shoulders", bn: "A woman relaxing at the edge of an infinity pool at a mountain spa while a therapist massages her shoulders"},
  heroAlt3: { en: "A woman holding a gold lipstick beside a marble ledge set with lipsticks and wildflowers", ta: "உதட்டுச்சாயங்களும் காட்டுப் பூக்களும் வைக்கப்பட்ட பளிங்கு விளிம்பின் அருகே தங்க நிற லிப்ஸ்டிக்கைப் பிடித்திருக்கும் பெண்", hi: "लिपस्टिक और जंगली फूलों से सजी संगमरमर की मुंडेर के पास सुनहरी लिपस्टिक थामे एक महिला", ml: "ലിപ്സ്റ്റിക്കുകളും കാട്ടുപൂക്കളും വെച്ച മാർബിൾ തിട്ടയ്ക്കരികിൽ സ്വർണ്ണനിറ ലിപ്സ്റ്റിക് പിടിച്ചു നിൽക്കുന്ന സ്ത്രീ", te: "లిప్‌స్టిక్‌లు, అడవి పూలతో అలంకరించిన పాలరాతి అంచు పక్కన బంగారు లిప్‌స్టిక్ పట్టుకున్న మహిళ" , kn: "A woman holding a gold lipstick beside a marble ledge set with lipsticks and wildflowers", mr: "A woman holding a gold lipstick beside a marble ledge set with lipsticks and wildflowers", bn: "A woman holding a gold lipstick beside a marble ledge set with lipsticks and wildflowers"},
  heroAlt4: { en: "Wellness rituals on marble: a journal, bath salts, balms and a gold compact above the mountains", ta: "பளிங்குக் கல்லின் மீது ஆரோக்கிய சடங்குப் பொருட்கள்: ஜர்னல், பாத் சால்ட், தைலங்கள், தங்க காம்பாக்ட்; பின்னணியில் மலைகள்", hi: "संगमरमर पर वेलनेस रिचुअल का सामान: जर्नल, बाथ सॉल्ट, बाम और सुनहरा कॉम्पैक्ट, ऊपर पहाड़", ml: "മാർബിളിൽ വെൽനെസ് റിച്വൽ ഉൽപ്പന്നങ്ങൾ: ജേർണൽ, ബാത്ത് സാൾട്ട്, ബാമുകൾ, സ്വർണ്ണ കോംപാക്റ്റ്; മുകളിൽ മലനിരകൾ", te: "పాలరాతిపై వెల్నెస్ రిచువల్ వస్తువులు: జర్నల్, బాత్ సాల్ట్స్, బామ్‌లు, బంగారు కాంపాక్ట్; పైన పర్వతాలు" , kn: "Wellness rituals on marble: a journal, bath salts, balms and a gold compact above the mountains", mr: "Wellness rituals on marble: a journal, bath salts, balms and a gold compact above the mountains", bn: "Wellness rituals on marble: a journal, bath salts, balms and a gold compact above the mountains"},

  // RecommendedPicks
  picksEyebrow: { en: "Service + Product Combos", ta: "எங்கள் பரிந்துரைகள்", hi: "हमारी अनुशंसित पसंद", ml: "ഞങ്ങളുടെ ശുപാർശകൾ", te: "మా సిఫార్సులు" , kn: "Service + Product Combos", mr: "Service + Product Combos", bn: "Service + Product Combos"},
  picksTitle: { en: "Book a service, take the product home.", ta: "உங்களை உபசரியுங்கள், பிறகு வீட்டுக்கு எடுத்துச் செல்லுங்கள்.", hi: "खुद को सँवारें, फिर उसे घर ले जाएँ।", ml: "സ്വയം ലാളിക്കൂ, എന്നിട്ട് വീട്ടിലേക്ക് കൊണ്ടുപോകൂ.", te: "మిమ్మల్ని మీరు ముద్దు చేసుకోండి, తర్వాత ఇంటికి తీసుకెళ్ళండి." , kn: "Book a service, take the product home.", mr: "Book a service, take the product home.", bn: "Book a service, take the product home."},
  picksPara: {
    en: "Pair a spa or salon service with the herbal product we use in it. Book together and save 10%.",
    ta: "ஸ்பா அல்லது சலூன் சேவையுடன், அதில் நாங்கள் பயன்படுத்தும் மூலிகைப் பொருளையும் இணைக்கவும். சேர்த்துப் பதிவு செய்தால் 10% சேமிக்கலாம்.",
    hi: "स्पा या सैलून सर्विस के साथ वही हर्बल प्रोडक्ट जोड़ें जो हम उसमें इस्तेमाल करते हैं। साथ बुक करें और 10% बचाएँ।",
    ml: "സ്പാ അല്ലെങ്കിൽ സലൂൺ സേവനത്തോടൊപ്പം അതിൽ ഞങ്ങൾ ഉപയോഗിക്കുന്ന ഹെർബൽ ഉൽപ്പന്നവും ചേർക്കൂ. ഒരുമിച്ച് ബുക്ക് ചെയ്താൽ 10% ലാഭിക്കാം.",
    te: "స్పా లేదా సెలూన్ సేవతో పాటు అందులో మేము వాడే హెర్బల్ ఉత్పత్తిని జత చేయండి. కలిపి బుక్ చేస్తే 10% ఆదా చేసుకోండి.",
  },
  picksLabel: { en: "Recommended picks", ta: "பரிந்துரைகள்", hi: "अनुशंसित पसंद", ml: "ശുപാർശകൾ", te: "సిఫార్సులు" , kn: "Recommended picks", mr: "Recommended picks", bn: "Recommended picks"},
  save10: { en: "Save 10%", ta: "10% சேமிக்கவும்", hi: "10% बचाएँ", ml: "10% ലാഭിക്കാം", te: "10% ఆదా" , kn: "Save 10%", mr: "Save 10%", bn: "Save 10%"},
  bookAndAdd: { en: "Book & add to bag", ta: "பதிவு செய்து பையில் சேர்", hi: "बुक करें और बैग में डालें", ml: "ബുക്ക് ചെയ്ത് ബാഗിൽ ചേർക്കൂ", te: "బుక్ చేసి బ్యాగ్‌లో చేర్చండి" , kn: "Book & add to bag", mr: "Book & add to bag", bn: "Book & add to bag"},

  // NewArrivals
  arrivalsEyebrow: { en: "New arrivals at", ta: "உலகம்:", hi: "दुनिया:", ml: "ലോകം:", te: "ప్రపంచం:" , kn: "New arrivals at", mr: "New arrivals at", bn: "New arrivals at"},
  arrivalsTitle: { en: "Fresh from our herbal range.", ta: "உங்களுடன் தங்கும் அழகு.", hi: "सुंदरता जो आपके साथ रहे।", ml: "നിങ്ങളോടൊപ്പം നിൽക്കുന്ന സൗന്ദര്യം.", te: "మీతో నిలిచే అందం." , kn: "Fresh from our herbal range.", mr: "Fresh from our herbal range.", bn: "Fresh from our herbal range."},
  arrivalsLine: {
    en: "Latest herbal arrivals you’ll want to own.",
    ta: "நீங்கள் சொந்தமாக்க விரும்பும் புதிய மூலிகை வரவுகள்.",
    hi: "नए हर्बल प्रोडक्ट जिन्हें आप अपना बनाना चाहेंगे।",
    ml: "നിങ്ങൾ സ്വന്തമാക്കാൻ ആഗ്രഹിക്കുന്ന പുതിയ ഹെർബൽ ഉൽപ്പന്നങ്ങൾ.",
    te: "మీరు సొంతం చేసుకోవాలనుకునే కొత్త హెర్బల్ ఉత్పత్తులు.",
  },
  add: { en: "Add", ta: "சேர்", hi: "जोड़ें", ml: "ചേർക്കുക", te: "చేర్చండి" , kn: "ಸೇರಿಸಿ", mr: "जोडा", bn: "যোগ করুন"},
  view: { en: "View", ta: "காண்க", hi: "देखें", ml: "കാണുക", te: "చూడండి" , kn: "ನೋಡಿ", mr: "पहा", bn: "দেখুন"},
  next: { en: "Next", ta: "அடுத்து", hi: "अगला", ml: "അടുത്തത്", te: "తదుపరి" , kn: "ಮುಂದೆ", mr: "पुढे", bn: "পরবর্তী"},
  prev: { en: "Previous", ta: "முந்தைய", hi: "पिछला", ml: "മുമ്പത്തെ", te: "మునుపటి" , kn: "Previous", mr: "Previous", bn: "Previous"},
  enterWorld: { en: "Enter our world", ta: "எங்கள் உலகிற்குள் வாருங்கள்", hi: "हमारी दुनिया में आएँ", ml: "ഞങ്ങളുടെ ലോകത്തേക്ക് വരൂ", te: "మా ప్రపంచంలోకి రండి" , kn: "ನಮ್ಮ ಜಗತ್ತಿಗೆ ಪ್ರವೇಶಿಸಿ", mr: "आमच्या जगात प्रवेश करा", bn: "আমাদের জগতে প্রবেশ করুন"},
} satisfies Record<string, T>;

export type SectionKey = keyof typeof d;

/** Text for a section key in the given language (falls back to English). */
export const st = (k: SectionKey, lang: Lang): string => (d[k] as T)[lang] ?? d[k].en;
