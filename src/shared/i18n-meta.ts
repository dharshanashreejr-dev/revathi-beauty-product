import type { Lang } from './i18n'
import { NAV_LABELS } from './i18n-nav'

// Browser-tab titles (and the landing meta description) for the pages that are not
// inside src/site. The src/site pages already translate their own titles (site/App.tsx).

export const HOME_TITLE: Record<Lang, string> = {
  en: 'REVATHI HERBAL BEAUTY CARE — Luxury beauty, shop & salon',
  ta: 'REVATHI HERBAL BEAUTY CARE — ஆடம்பர அழகு, ஷாப் & சலூன்',
  hi: 'REVATHI HERBAL BEAUTY CARE — लक्ज़री ब्यूटी, शॉप और सैलून',
  ml: 'REVATHI HERBAL BEAUTY CARE — ആഡംബര സൗന്ദര്യം, ഷോപ്പ് & സലൂൺ',
  te: 'REVATHI HERBAL BEAUTY CARE — లగ్జరీ బ్యూటీ, షాప్ & సెలూన్',
}

export const HOME_DESC: Record<Lang, string> = {
  en: 'REVATHI HERBAL BEAUTY CARE: luxury skincare and makeup to shop online, plus salon treatments and appointment booking.',
  ta: 'REVATHI HERBAL BEAUTY CARE: ஆன்லைனில் வாங்க ஆடம்பர சருமப் பராமரிப்பு மற்றும் ஒப்பனைப் பொருட்கள், கூடவே சலூன் சிகிச்சைகள் மற்றும் அப்பாயிண்ட்மெண்ட் பதிவு.',
  hi: 'REVATHI HERBAL BEAUTY CARE: ऑनलाइन खरीदारी के लिए लक्ज़री स्किनकेयर और मेकअप, साथ में सैलून ट्रीटमेंट और अपॉइंटमेंट बुकिंग।',
  ml: 'REVATHI HERBAL BEAUTY CARE: ഓൺലൈനായി വാങ്ങാൻ ആഡംബര ചർമ്മസംരക്ഷണ-മേക്കപ്പ് ഉൽപ്പന്നങ്ങൾ, കൂടാതെ സലൂൺ ട്രീറ്റ്മെന്റുകളും അപ്പോയിന്റ്മെന്റ് ബുക്കിംഗും.',
  te: 'REVATHI HERBAL BEAUTY CARE: ఆన్‌లైన్‌లో కొనడానికి లగ్జరీ స్కిన్‌కేర్ మరియు మేకప్, అలాగే సెలూన్ ట్రీట్‌మెంట్లు మరియు అపాయింట్‌మెంట్ బుకింగ్.',
}

export const productsTitle = (lang: Lang) => `${NAV_LABELS[lang].Products} — REVATHI HERBAL · Revathi Herbal Beauty Care`

/** Landing page: set the tab title and meta description for a language. */
export function applyHomeMeta(lang: Lang) {
  document.title = HOME_TITLE[lang]
  document.querySelector('meta[name="description"]')?.setAttribute('content', HOME_DESC[lang])
}
