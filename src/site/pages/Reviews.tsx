import { useEffect, useMemo, useRef, useState } from 'react'
import { Photo } from '../components/three'
import { useUser, openLogin } from '../../shared/LoginModal'
import { useUiLang } from '../../shared/i18n'
import { addReview, deleteReview, useReviews, type Review } from '../../shared/reviews'
import { getMyOrders, getAppts, ORDER_LAST } from '../account'
import { services } from '../data'
import { Link } from '../SmartLink'

// Logged in  -> "Reviews": review the products you ordered and the services you booked, plus everyone's reviews.
// Logged out -> "Testimonials": a read-only wall of all product and service reviews.

type T = Record<string, string>
// Last two words of the headline in gold
const goldTail = (s: string) => {
  const w = s.trim().split(/\s+/)
  if (w.length < 3) return <span className="rv-gold">{s}</span>
  return <>{w.slice(0, -2).join(' ')} <span className="rv-gold">{w.slice(-2).join(' ')}</span></>
}

const TXT: Record<string, T> = {
  en: { eyeLogged: 'Your reviews', hLogged: 'Tell us how it felt', subLogged: 'Rate the products you ordered and the services you booked. Your words help others choose.', eyeOut: 'Testimonials', hOut: 'Loved by our guests', subOut: 'Real words about our herbal products and salon services.', mine: 'Ready for your review', none: 'Order a product or book a service and it will appear here for review.', product: 'Product', service: 'Service', rate: 'Your rating', share: 'Share your experience', submit: 'Post review', done: 'Thank you! Your review is live.', yours: 'Your review', remove: 'Delete', all: 'All', products: 'Products', services: 'Services', wall: 'What everyone is saying', reviewsN: 'reviews', avg: 'average rating', five: '5-star reviews', loginCta: 'Login to write a review', loginSub: 'Ordered or booked with us? Log in to review it.', err: 'Please write at least a short review.', empty: 'No reviews yet.', shop: 'Shop products', book: 'Book a service' },
  ta: { eyeLogged: 'உங்கள் மதிப்புரைகள்', hLogged: 'உங்கள் அனுபவத்தைச் சொல்லுங்கள்', subLogged: 'நீங்கள் ஆர்டர் செய்த பொருட்களுக்கும் முன்பதிவு செய்த சேவைகளுக்கும் மதிப்பீடு அளியுங்கள்.', eyeOut: 'சான்றுகள்', hOut: 'எங்கள் விருந்தினர்களின் அன்பு', subOut: 'எங்கள் மூலிகைப் பொருட்கள் மற்றும் சலூன் சேவைகள் பற்றிய உண்மையான கருத்துகள்.', mine: 'மதிப்புரைக்குத் தயார்', none: 'பொருள் ஆர்டர் செய்தால் அல்லது சேவை முன்பதிவு செய்தால் இங்கே தோன்றும்.', product: 'பொருள்', service: 'சேவை', rate: 'உங்கள் மதிப்பீடு', share: 'உங்கள் அனுபவத்தைப் பகிருங்கள்', submit: 'மதிப்புரையை இடுக', done: 'நன்றி! உங்கள் மதிப்புரை பதிவாகிவிட்டது.', yours: 'உங்கள் மதிப்புரை', remove: 'நீக்கு', all: 'அனைத்தும்', products: 'பொருட்கள்', services: 'சேவைகள்', wall: 'அனைவரும் என்ன சொல்கிறார்கள்', reviewsN: 'மதிப்புரைகள்', avg: 'சராசரி மதிப்பீடு', five: '5-நட்சத்திர மதிப்புரைகள்', loginCta: 'மதிப்புரை எழுத உள்நுழையவும்', loginSub: 'ஆர்டர் அல்லது முன்பதிவு செய்தீர்களா? உள்நுழைந்து மதிப்புரை எழுதுங்கள்.', err: 'சிறிய மதிப்புரையாவது எழுதுங்கள்.', empty: 'இன்னும் மதிப்புரைகள் இல்லை.', shop: 'பொருட்களை வாங்க', book: 'சேவை முன்பதிவு' },
  hi: { eyeLogged: 'आपकी समीक्षाएँ', hLogged: 'अपना अनुभव बताइए', subLogged: 'आपने जो उत्पाद मँगाए और जो सेवाएँ बुक कीं, उन्हें रेट करें।', eyeOut: 'प्रशंसापत्र', hOut: 'हमारे मेहमानों का प्यार', subOut: 'हमारे हर्बल उत्पादों और सैलून सेवाओं पर असली राय।', mine: 'समीक्षा के लिए तैयार', none: 'उत्पाद ऑर्डर करें या सेवा बुक करें, वह यहाँ दिखेगी।', product: 'उत्पाद', service: 'सेवा', rate: 'आपकी रेटिंग', share: 'अपना अनुभव साझा करें', submit: 'समीक्षा पोस्ट करें', done: 'धन्यवाद! आपकी समीक्षा जुड़ गई।', yours: 'आपकी समीक्षा', remove: 'हटाएँ', all: 'सभी', products: 'उत्पाद', services: 'सेवाएँ', wall: 'सब क्या कह रहे हैं', reviewsN: 'समीक्षाएँ', avg: 'औसत रेटिंग', five: '5-स्टार समीक्षाएँ', loginCta: 'समीक्षा लिखने के लिए लॉगिन करें', loginSub: 'ऑर्डर या बुकिंग की है? लॉगिन करके समीक्षा लिखें।', err: 'कृपया छोटी समीक्षा लिखें।', empty: 'अभी कोई समीक्षा नहीं।', shop: 'उत्पाद खरीदें', book: 'सेवा बुक करें' },
  ml: { eyeLogged: 'നിങ്ങളുടെ അവലോകനങ്ങൾ', hLogged: 'എങ്ങനെ തോന്നി പറയൂ', subLogged: 'നിങ്ങൾ ഓർഡർ ചെയ്ത ഉൽപ്പന്നങ്ങളും ബുക്ക് ചെയ്ത സേവനങ്ങളും റേറ്റ് ചെയ്യൂ.', eyeOut: 'സാക്ഷ്യപത്രങ്ങൾ', hOut: 'ഞങ്ങളുടെ അതിഥികൾ ഇഷ്ടപ്പെടുന്നു', subOut: 'ഞങ്ങളുടെ ഹെർബൽ ഉൽപ്പന്നങ്ങളെയും സലൂൺ സേവനങ്ങളെയും കുറിച്ചുള്ള യഥാർത്ഥ വാക്കുകൾ.', mine: 'അവലോകനത്തിന് തയ്യാർ', none: 'ഒരു ഉൽപ്പന്നം ഓർഡർ ചെയ്യുകയോ സേവനം ബുക്ക് ചെയ്യുകയോ ചെയ്താൽ ഇവിടെ ദൃശ്യമാകും.', product: 'ഉൽപ്പന്നം', service: 'സേവനം', rate: 'നിങ്ങളുടെ റേറ്റിംഗ്', share: 'നിങ്ങളുടെ അനുഭവം പങ്കിടുക', submit: 'അവലോകനം പോസ്റ്റ് ചെയ്യുക', done: 'നന്ദി! നിങ്ങളുടെ അവലോകനം ലൈവാണ്.', yours: 'നിങ്ങളുടെ അവലോകനം', remove: 'ഇല്ലാതാക്കുക', all: 'എല്ലാം', products: 'ഉൽപ്പന്നങ്ങൾ', services: 'സേവനങ്ങൾ', wall: 'എല്ലാവരും പറയുന്നത്', reviewsN: 'അവലോകനങ്ങൾ', avg: 'ശരാശരി റേറ്റിംഗ്', five: '5-നക്ഷത്ര അവലോകനങ്ങൾ', loginCta: 'അവലോകനം എഴുതാൻ ലോഗിൻ ചെയ്യുക', loginSub: 'ഞങ്ങളോടൊപ്പം ഓർഡർ ചെയ്തോ ബുക്ക് ചെയ്തോ? റിവ്യൂ ചെയ്യാൻ ലോഗിൻ ചെയ്യുക.', err: 'ദയവായി ചുരുങ്ങിയത് ഒരു ചെറിയ അവലോകനമെങ്കിലും എഴുതുക.', empty: 'ഇതുവരെ അവലോകനങ്ങളില്ല.', shop: 'ഉൽപ്പന്നങ്ങൾ വാങ്ങുക', book: 'സേവനം ബുക്ക് ചെയ്യുക' },
  te: { eyeLogged: 'మీ రివ్యూలు', hLogged: 'ఎలా అనిపించిందో చెప్పండి', subLogged: 'మీరు ఆర్డర్ చేసిన ఉత్పత్తులు మరియు బుక్ చేసిన సేవలను రేట్ చేయండి.', eyeOut: 'టెస్టిమోనియల్స్', hOut: 'మా అతిథులు ఇష్టపడతారు', subOut: 'మా హెర్బల్ ఉత్పత్తులు మరియు సెలూన్ సేవల గురించి నిజమైన మాటలు.', mine: 'రివ్యూకు సిద్ధం', none: 'ఉత్పత్తి ఆర్డర్ చేస్తే లేదా సేవ బుక్ చేస్తే ఇక్కడ కనిపిస్తుంది.', product: 'ఉత్పత్తి', service: 'సేవ', rate: 'మీ రేటింగ్', share: 'మీ అనుభవాన్ని పంచుకోండి', submit: 'రివ్యూ పోస్ట్ చేయండి', done: 'ధన్యవాదాలు! మీ రివ్యూ లైవ్‌లో ఉంది.', yours: 'మీ రివ్యూ', remove: 'తొలగించు', all: 'అన్నీ', products: 'ఉత్పత్తులు', services: 'సేవలు', wall: 'అందరూ చెప్పేది', reviewsN: 'రివ్యూలు', avg: 'సగటు రేటింగ్', five: '5-స్టార్ రివ్యూలు', loginCta: 'రివ్యూ రాయడానికి లాగిన్ అవ్వండి', loginSub: 'మాతో ఆర్డర్ చేశారా లేదా బుక్ చేశారా? రివ్యూ చేయడానికి లాగిన్ అవ్వండి.', err: 'దయచేసి కనీసం చిన్న రివ్యూ రాయండి.', empty: 'ఇంకా రివ్యూలు లేవు.', shop: 'ఉత్పత్తులు కొనండి', book: 'సేవ బుక్ చేయండి' },
  kn: { eyeLogged: 'ನಿಮ್ಮ ವಿಮರ್ಶೆಗಳು', hLogged: 'ಹೇಗೆ ಅನಿಸಿತು ಹೇಳಿ', subLogged: 'ನೀವು ಆರ್ಡರ್ ಮಾಡಿದ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಬುಕ್ ಮಾಡಿದ ಸೇವೆಗಳನ್ನು ರೇಟ್ ಮಾಡಿ.', eyeOut: 'ಪ್ರಶಂಸಾಪತ್ರಗಳು', hOut: 'ನಮ್ಮ ಅತಿಥಿಗಳಿಗೆ ಇಷ್ಟ', subOut: 'ನಮ್ಮ ಹರ್ಬಲ್ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಸೆಲೂನ್ ಸೇವೆಗಳ ಬಗ್ಗೆ ನಿಜವಾದ ಮಾತುಗಳು.', mine: 'ವಿಮರ್ಶೆಗೆ ಸಿದ್ಧ', none: 'ಉತ್ಪನ್ನ ಆರ್ಡರ್ ಮಾಡಿದರೆ ಅಥವಾ ಸೇವೆ ಬುಕ್ ಮಾಡಿದರೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.', product: 'ಉತ್ಪನ್ನ', service: 'ಸೇವೆ', rate: 'ನಿಮ್ಮ ರೇಟಿಂಗ್', share: 'ನಿಮ್ಮ ಅನುಭವ ಹಂಚಿಕೊಳ್ಳಿ', submit: 'ವಿಮರ್ಶೆ ಪೋಸ್ಟ್ ಮಾಡಿ', done: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಮರ್ಶೆ ಲೈವ್ ಆಗಿದೆ.', yours: 'ನಿಮ್ಮ ವಿಮರ್ಶೆ', remove: 'ಅಳಿಸಿ', all: 'ಎಲ್ಲಾ', products: 'ಉತ್ಪನ್ನಗಳು', services: 'ಸೇವೆಗಳು', wall: 'ಎಲ್ಲರೂ ಹೇಳುವುದು', reviewsN: 'ವಿಮರ್ಶೆಗಳು', avg: 'ಸರಾಸರಿ ರೇಟಿಂಗ್', five: '5-ನಕ್ಷತ್ರ ವಿಮರ್ಶೆಗಳು', loginCta: 'ವಿಮರ್ಶೆ ಬರೆಯಲು ಲಾಗಿನ್ ಮಾಡಿ', loginSub: 'ನಮ್ಮೊಂದಿಗೆ ಆರ್ಡರ್ ಅಥವಾ ಬುಕ್ ಮಾಡಿದ್ದೀರಾ? ವಿಮರ್ಶೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ.', err: 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಚಿಕ್ಕ ವಿಮರ್ಶೆ ಬರೆಯಿರಿ.', empty: 'ಇನ್ನೂ ವಿಮರ್ಶೆಗಳಿಲ್ಲ.', shop: 'ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ', book: 'ಸೇವೆ ಬುಕ್ ಮಾಡಿ' },
  mr: { eyeLogged: 'तुमची पुनरावलोकने', hLogged: 'कसे वाटले सांगा', subLogged: 'तुम्ही ऑर्डर केलेली उत्पादने आणि बुक केलेल्या सेवा रेट करा.', eyeOut: 'प्रशंसापत्रे', hOut: 'आमच्या पाहुण्यांना आवडते', subOut: 'आमच्या हर्बल उत्पादने आणि सलून सेवांबद्दल खरे शब्द.', mine: 'पुनरावलोकनासाठी तयार', none: 'उत्पादन ऑर्डर केले किंवा सेवा बुक केली तर येथे दिसेल.', product: 'उत्पादन', service: 'सेवा', rate: 'तुमचे रेटिंग', share: 'तुमचा अनुभव शेअर करा', submit: 'पुनरावलोकन पोस्ट करा', done: 'धन्यवाद! तुमचे पुनरावलोकन लाइव्ह आहे.', yours: 'तुमचे पुनरावलोकन', remove: 'हटवा', all: 'सर्व', products: 'उत्पादने', services: 'सेवा', wall: 'सर्व काय म्हणतात', reviewsN: 'पुनरावलोकने', avg: 'सरासरी रेटिंग', five: '५-स्टार पुनरावलोकने', loginCta: 'पुनरावलोकन लिहिण्यासाठी लॉगिन करा', loginSub: 'आमच्याकडे ऑर्डर किंवा बुक केले? पुनरावलोकनासाठी लॉगिन करा.', err: 'कृपया किमान लहान पुनरावलोकन लिहा.', empty: 'अद्याप पुनरावलोकने नाहीत.', shop: 'उत्पादने खरेदी करा', book: 'सेवा बुक करा' },
  bn: { eyeLogged: 'আপনার পর্যালোচনা', hLogged: 'কেমন লেগেছে বলুন', subLogged: 'আপনি অর্ডার করা পণ্য এবং বুক করা পরিষেবা রেট করুন।', eyeOut: 'প্রশংসাপত্র', hOut: 'আমাদের অতিথিরা ভালোবাসেন', subOut: 'আমাদের হার্বাল পণ্য ও সেলুন পরিষেবা নিয়ে সত্যিকারের কথা।', mine: 'পর্যালোচনার জন্য প্রস্তুত', none: 'পণ্য অর্ডার বা পরিষেবা বুক করলে এখানে দেখা যাবে।', product: 'পণ্য', service: 'পরিষেবা', rate: 'আপনার রেটিং', share: 'আপনার অভিজ্ঞতা শেয়ার করুন', submit: 'পর্যালোচনা পোস্ট করুন', done: 'ধন্যবাদ! আপনার পর্যালোচনা লাইভ।', yours: 'আপনার পর্যালোচনা', remove: 'মুছুন', all: 'সব', products: 'পণ্য', services: 'পরিষেবা', wall: 'সবাই যা বলছে', reviewsN: 'পর্যালোচনা', avg: 'গড় রেটিং', five: '৫-স্টার পর্যালোচনা', loginCta: 'পর্যালোচনা লিখতে লগইন করুন', loginSub: 'আমাদের সাথে অর্ডার বা বুক করেছেন? পর্যালোচনার জন্য লগইন করুন।', err: 'অনুগ্রহ করে অন্তত ছোট একটি পর্যালোচনা লিখুন।', empty: 'এখনও কোনো পর্যালোচনা নেই।', shop: 'পণ্য কিনুন', book: 'পরিষেবা বুক করুন' },
  sa: { eyeLogged: 'तव समीक्षाः', hLogged: 'कथं अनुभूतम् इति वदतु', subLogged: 'त्वया आदेशितान् उत्पादाः आरक्षिताः सेवाः च मूल्याङ्कयतु। तव शब्दाः अन्येषां चयनं सहायन्ते।', eyeOut: 'प्रशंसापत्राणि', hOut: 'अस्माकं अतिथिभिः प्रियाणि', subOut: 'अस्माकं औषधीय-उत्पादाः सैलून-सेवाः च विषये सत्यानि वचनानि।', mine: 'तव समीक्षायै सज्जम्', none: 'उत्पादम् आदेशयतु वा सेवां आरक्षतु, ततः अत्र दृश्यते।', product: 'उत्पादः', service: 'सेवा', rate: 'तव मूल्याङ्कनम्', share: 'तव अनुभवं वितरतु', submit: 'समीक्षां प्रकाशयतु', done: 'धन्यवादः! तव समीक्षा जीवति।', yours: 'तव समीक्षा', remove: 'लोपयतु', all: 'सर्वम्', products: 'उत्पादाः', services: 'सेवाः', wall: 'सर्वे किं वदन्ति', reviewsN: 'समीक्षाः', avg: 'मध्य-मूल्याङ्कनम्', five: '५-तारा-समीक्षाः', loginCta: 'समीक्षां लेखितुं प्रवेशं कुरु', loginSub: 'अस्माभिः सह आदेशितवान् आरक्षितवान् वा? समीक्षायै प्रवेशं कुरु।', err: 'कृपया न्यूनातिन्यूनं लघु-समीक्षां लिखतु।', empty: 'अद्यापि समीक्षाः न सन्ति।', shop: 'उत्पादाः क्रीणातु', book: 'सेवां आरक्षतु' },

}

const NAME_I18N: Record<string, Record<string, string>> = {
  'Normal Facial': { ta: 'சாதாரண ஃபேஷியல்', hi: 'नॉर्मल फेशियल', ml: 'നോർമൽ ഫേഷ്യൽ', te: 'నార్మల్ ఫేషియల్', kn: 'ಸಾಮಾನ್ಯ ಫೇಷಿಯಲ್', mr: 'नॉर्मल फेशियल', bn: 'নরমাল ফেসিয়াল', sa: 'सामान्य-मुखचिकित्सा' },
  'Body Massage': { ta: 'உடல் மசாஜ்', hi: 'बॉडी मसाज', ml: 'ബോഡി മസാജ്', te: 'బాడీ మసాజ్', kn: 'ಬಾಡಿ ಮಸಾಜ್', mr: 'बॉडी मसाज', bn: 'বডি ম্যাসাজ', sa: 'शरीर-मर्दनम्' },
}
const nameTx = (name: string, ui: string) => NAME_I18N[name]?.[ui] ?? name

const tx = (ui: string): T => ({ ...TXT.en, ...(TXT[ui] ?? {}) })

const POOL = ['facial', 'facial2', 'back', 'close', 'foot', 'foot2', 'reception', 'wide']
// Marquee strip: 13 different photos, ordered so similar shots (facial / massage / foot) never sit next to each other
const STRIP = ['facial', 'back', 'foot-soak', 'bridal-saree', 'head-massage', 'reception', 'hydra-facial', 'foot', 'herbal-mask', 'close', 'facial2', 'wide', 'foot2']
const imgFor = (r: Review) => (r.kind === 'service' ? services.find((s) => s.id === r.targetId)?.img : undefined) ?? POOL[[...r.targetId].reduce((n, c) => n + c.charCodeAt(0), 0) % POOL.length]

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return <span aria-label={`${n} / 5`} style={{ color: '#c8aff0', fontSize: size, letterSpacing: 2 }}>{'★'.repeat(n)}<span style={{ opacity: 0.25 }}>{'★'.repeat(5 - n)}</span></span>
}

/** Fades / slides children in as they scroll into view. */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`rv-reveal ${on ? 'rv-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function Count({ to, dec = 0 }: { to: number; dec?: number }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf = 0; const t0 = performance.now()
    const step = (t: number) => { const p = Math.min(1, (t - t0) / 1200); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [to])
  return <>{v.toFixed(dec)}</>
}

function Wall({ list, t, ui }: { list: Review[]; t: T; ui: string }) {
  const [f, setF] = useState<'all' | 'product' | 'service'>('all')
  const shown = list.filter((r) => f === 'all' || r.kind === f)
  const chips: ['all' | 'product' | 'service', string][] = [['all', t.all], ['product', t.products], ['service', t.services]]
  return (
    <section className="px-5 md:px-10 py-16">
      <Reveal><h2 className="h text-3xl md:text-4xl text-center">{t.wall}</h2></Reveal>
      <div className="flex gap-3 justify-center mt-8 flex-wrap">
        {chips.map(([k, l]) => <button key={k} onClick={() => setF(k)} className={`label px-5 py-2 rounded-full border transition ${f === k ? 'bg-ink text-sand border-ink' : 'border-ink/20 hover:border-ink'}`}>{l}</button>)}
      </div>
      {shown.length === 0 && <p className="text-center opacity-60 mt-10">{t.empty}</p>}
      <div className="mt-10 max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-5">
        {shown.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 90} className="mb-5 break-inside-avoid">
            <article className="rv-card bg-[#eee7fc]/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-white/50">
              <div className="relative h-36 overflow-hidden">
                <Photo k={imgFor(r)} className="rv-zoom h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <span className="label absolute left-4 top-3 bg-sand/90 text-ink rounded-full px-3 py-1 text-[10px]">{r.kind === 'product' ? t.product : t.service}</span>
                <span className="absolute left-4 bottom-3 right-4 text-sand text-sm font-medium truncate">{nameTx(r.targetName, ui)}</span>
              </div>
              <div className="p-5">
                <Stars n={r.rating} />
                <p className="mt-3 text-[15px] leading-relaxed">“{r.text}”</p>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-gold/25 text-[#5b23b0] font-semibold">{r.name.charAt(0).toUpperCase()}</span>
                  <div><strong className="block leading-tight">{r.name}</strong><span className="opacity-50 text-xs">{new Date(r.at).toLocaleDateString(ui === 'en' ? 'en-IN' : ui, { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Composer({ item, t, uid, name, ui }: { item: { kind: 'product' | 'service'; id: string; name: string; img: string }; t: T; uid: string; name: string; ui: string }) {
  const all = useReviews()
  const mine = all.find((r) => r.uid === uid && r.kind === item.kind && r.targetId === item.id)
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  const [ok, setOk] = useState(false)
  const submit = () => {
    if (text.trim().length < 3) { setErr(t.err); return }
    addReview({ kind: item.kind, targetId: item.id, targetName: item.name, name, rating, text: text.trim(), uid })
    setText(''); setErr(''); setOk(true)
  }
  return (
    <div className="bg-[#eee7fc]/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm overflow-hidden flex flex-col sm:flex-row">
      <div className="relative sm:w-44 h-40 sm:h-auto shrink-0 overflow-hidden"><Photo k={item.img} className="rv-zoom h-full w-full" /><span className="label absolute left-3 top-3 bg-sand/90 rounded-full px-3 py-1 text-[10px]">{item.kind === 'product' ? t.product : t.service}</span></div>
      <div className="p-5 flex-1">
        <h3 className="font-medium text-lg">{nameTx(item.name, ui)}</h3>
        {mine ? (
          <div className="mt-3">
            <span className="label opacity-60">{t.yours}</span>
            <div className="mt-1"><Stars n={mine.rating} /></div>
            <p className="mt-2 text-[15px]">“{mine.text}”</p>
            {ok && <p role="status" className="mt-2 text-sm text-green-700">{t.done}</p>}
            <button onClick={() => { deleteReview(mine.id); setOk(false) }} className="label mt-3 underline opacity-60 hover:opacity-100">{t.remove}</button>
          </div>
        ) : (
          <div className="mt-3 grid gap-3">
            <div role="radiogroup" aria-label={t.rate} className="flex items-center gap-1"><span className="text-sm mr-2 opacity-70">{t.rate}</span>
              {[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n}`} onClick={() => setRating(n)} className="rv-star text-2xl leading-none" style={{ color: n <= rating ? '#c8aff0' : '#decff7' }}>★</button>)}
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={400} placeholder={t.share} aria-label={t.share} className="w-full min-h-[84px] rounded-xl border border-ink/15 bg-sand/50 p-3 text-[15px] outline-none focus:border-gold" />
            {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
            <button onClick={submit} className="justify-self-start bg-ink text-sand rounded-full px-7 py-3 label hover:bg-stone transition">{t.submit}</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Reviews() {
  const [ui] = useUiLang()
  const t = tx(ui)
  const user = useUser()
  const all = useReviews()
  const stats = useMemo(() => ({ n: all.length, avg: all.length ? all.reduce((s, r) => s + r.rating, 0) / all.length : 0, five: all.filter((r) => r.rating === 5).length }), [all])

  // What this customer has ordered / booked.
  const items = useMemo(() => {
    if (!user) return []
    const out: { kind: 'product' | 'service'; id: string; name: string; img: string }[] = []
    const seen = new Set<string>()
    for (const o of getMyOrders()) {
      if (o.cancelled || o.stage < ORDER_LAST) continue // review only after the order is delivered
      for (const i of o.items) { const k = 'p' + i.pid; if (!seen.has(k)) { seen.add(k); out.push({ kind: 'product', id: i.pid, name: i.name, img: i.img }) } }
    }
    for (const a of getAppts()) {
      if (a.status !== 'Completed') continue // review only after the service is completed
      const svc = services.find((s) => s.name === a.service)
      const id = svc?.id ?? a.service.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const k = 's' + id; if (!seen.has(k)) { seen.add(k); out.push({ kind: 'service', id, name: a.service, img: a.img }) }
    }
    return out
  }, [user])

  const logged = !!user
  const name = user ? (user.name?.trim() || 'Guest ' + user.phone.slice(-4)) : ''
  return (
    <main className="bg-[#f2ecfc] min-h-screen overflow-x-clip">
      <section className="relative pt-36 pb-20 px-5 text-center bg-ink text-sand overflow-hidden">
        <div className="rv-orb rv-orb1" /><div className="rv-orb rv-orb2" />
        <div className="relative max-w-2xl mx-auto">
          <span className="label text-gold rv-gold-label rv-rise" style={{ animationDelay: '0ms' }}>{logged ? t.eyeLogged : t.eyeOut}</span>
          <h1 className="h text-4xl md:text-6xl mt-4 rv-rise" style={{ animationDelay: '120ms' }}>{goldTail(logged ? t.hLogged : t.hOut)}</h1>
          <p className="mt-5 opacity-75 rv-rise" style={{ animationDelay: '240ms' }}>{logged ? t.subLogged : t.subOut}</p>
          <div className="mt-10 flex justify-center gap-8 md:gap-14 rv-rise" style={{ animationDelay: '360ms' }}>
            <div><div className="h text-4xl text-gold rv-gold"><Count to={stats.n} /></div><div className="label opacity-60 mt-1">{t.reviewsN}</div></div>
            <div><div className="h text-4xl text-gold rv-gold"><Count to={stats.avg} dec={1} /></div><div className="label opacity-60 mt-1">{t.avg}</div></div>
            <div><div className="h text-4xl text-gold rv-gold"><Count to={stats.five} /></div><div className="label opacity-60 mt-1">{t.five}</div></div>
          </div>
          {!logged && <button onClick={() => openLogin()} className="mt-10 bg-gold text-ink rounded-full px-8 py-4 label hover:bg-sand transition rv-rise" style={{ animationDelay: '480ms' }}>{t.loginCta}</button>}
        </div>
      </section>

      <div className="rv-marquee" aria-hidden>
        <div className="rv-track">{[...STRIP, ...STRIP].map((k, i) => <img key={i} src={`/img/${k}.jpg`} alt="" loading="lazy" />)}</div>
      </div>

      {logged && (
        <section className="px-5 md:px-10 pt-16 max-w-5xl mx-auto">
          <Reveal><h2 className="h text-3xl">{t.mine}</h2></Reveal>
          {items.length === 0 ? (
            <Reveal><div className="mt-6 bg-[#eee7fc]/60 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/50"><p className="opacity-70">{t.none}</p>
              <div className="mt-5 flex gap-3 justify-center flex-wrap"><Link to="/products/" className="bg-ink text-sand rounded-full px-6 py-3 label">{t.shop}</Link><Link to="/services" className="border border-ink rounded-full px-6 py-3 label">{t.book}</Link></div></div></Reveal>
          ) : (
            <div className="mt-6 grid gap-5">{items.map((it, i) => <Reveal key={it.kind + it.id} delay={i * 70}><Composer item={it} t={t} uid={user!.id} name={name} ui={ui} /></Reveal>)}</div>
          )}
        </section>
      )}

      <Wall list={all} t={t} ui={ui} />

      {!logged && (
        <Reveal><section className="text-center px-5 pb-24"><p className="opacity-70">{t.loginSub}</p>
          <button onClick={() => openLogin()} className="mt-5 bg-ink text-sand rounded-full px-8 py-4 label hover:bg-stone transition">{t.loginCta}</button></section></Reveal>
      )}
    </main>
  )
}
