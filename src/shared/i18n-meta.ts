import type { Lang } from './i18n'
import { NAV_LABELS } from './i18n-nav'

// Browser-tab titles (and the landing meta description) for the pages that are not
// inside src/site. The src/site pages already translate their own titles (site/App.tsx).

export const HOME_TITLE: Record<Lang, string> = {
  en: 'REVATHI HERBAL BEAUTY CARE — Women\'s luxury beauty salon & shop',
  ta: 'REVATHI HERBAL BEAUTY CARE — பெண்களுக்கான ஆடம்பர அழகு சலூன் & ஷாப்',
  hi: 'REVATHI HERBAL BEAUTY CARE — महिलाओं का लग्ज़री ब्यूटी सैलून और शॉप',
  ml: 'REVATHI HERBAL BEAUTY CARE — സ്ത്രീകൾക്കായുള്ള ലക്ഷ്വറി ബ്യൂട്ടി സലൂൺ & ഷോപ്പ്',
  te: 'REVATHI HERBAL BEAUTY CARE — మహిళల లగ్జరీ బ్యూటీ సెలూన్ & షాప్',
  kn: 'REVATHI HERBAL BEAUTY CARE — ಮಹಿಳೆಯರ ಲಗ್ಜರಿ ಬ್ಯೂಟಿ ಸಲೂನ್ & ಶಾಪ್',
  mr: 'REVATHI HERBAL BEAUTY CARE — महिलांचे लक्झरी ब्युटी सलून आणि शॉप',
  bn: 'REVATHI HERBAL BEAUTY CARE — মহিলাদের লাক্সারি বিউটি স্যালুন ও শপ',
}

export const HOME_DESC: Record<Lang, string> = {
  en: 'REVATHI HERBAL BEAUTY CARE: a women\'s luxury salon with body massage, normal and hydra facials and beauty consultations, plus luxury skincare and makeup to shop online.',
  ta: 'REVATHI HERBAL BEAUTY CARE: பெண்களுக்கான ஆடம்பர சலூன் - உடல் மசாஜ், சாதாரண மற்றும் ஹைட்ரா ஃபேஷியல், அழகு ஆலோசனை, மேலும் ஆன்லைனில் வாங்க ஆடம்பர சரும பராமரிப்பு, மேக்கப்.',
  hi: 'REVATHI HERBAL BEAUTY CARE: महिलाओं का लग्ज़री सैलून - बॉडी मसाज, नॉर्मल और हाइड्रा फेशियल, ब्यूटी कंसल्टेशन, साथ ही ऑनलाइन खरीदने के लिए लग्ज़री स्किनकेयर और मेकअप।',
  ml: 'REVATHI HERBAL BEAUTY CARE: സ്ത്രീകൾക്കായുള്ള ലക്ഷ്വറി സലൂൺ - ബോഡി മസാജ്, നോർമൽ, ഹൈഡ്ര ഫേഷ്യൽ, ബ്യൂട്ടി കൺസൾട്ടേഷൻ, കൂടാതെ ഓൺലൈനിൽ വാങ്ങാൻ ലക്ഷ്വറി സ്കിൻകെയറും മേക്കപ്പും.',
  te: 'REVATHI HERBAL BEAUTY CARE: మహిళల లగ్జరీ సెలూన్ - బాడీ మసాజ్, నార్మల్, హైడ్రా ఫేషియల్స్, బ్యూటీ కన్సల్టేషన్, అలాగే ఆన్‌లైన్‌లో కొనడానికి లగ్జరీ స్కిన్‌కేర్, మేకప్.',
  kn: 'REVATHI HERBAL BEAUTY CARE: ಮಹಿಳೆಯರ ಲಗ್ಜರಿ ಸಲೂನ್ - ಬಾಡಿ ಮಸಾಜ್, ನಾರ್ಮಲ್ ಮತ್ತು ಹೈಡ್ರಾ ಫೇಶಿಯಲ್, ಬ್ಯೂಟಿ ಕನ್ಸಲ್ಟೇಶನ್, ಹಾಗೂ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಖರೀದಿಸಲು ಲಗ್ಜರಿ ಸ್ಕಿನ್‌ಕೇರ್ ಮತ್ತು ಮೇಕಪ್.',
  mr: 'REVATHI HERBAL BEAUTY CARE: महिलांचे लक्झरी सलून - बॉडी मसाज, नॉर्मल आणि हायड्रा फेशियल, ब्युटी कन्सल्टेशन, तसेच ऑनलाइन खरेदीसाठी लक्झरी स्किनकेअर आणि मेकअप.',
  bn: 'REVATHI HERBAL BEAUTY CARE: মহিলাদের লাক্সারি স্যালুন - বডি ম্যাসাজ, নরমাল ও হাইড্রা ফেসিয়াল, বিউটি কনসালটেশন, এবং অনলাইনে কেনার জন্য লাক্সারি স্কিনকেয়ার ও মেকআপ।',
}

export const productsTitle = (lang: Lang) => `${(NAV_LABELS[lang] ?? NAV_LABELS.en).Products} — REVATHI HERBAL · Revathi Herbal Beauty Care`

/** Landing page: set the tab title and meta description for a language. */
export function applyHomeMeta(lang: Lang) {
  document.title = HOME_TITLE[lang] ?? HOME_TITLE.en
  document.querySelector('meta[name="description"]')?.setAttribute('content', HOME_DESC[lang] ?? HOME_DESC.en)
}
