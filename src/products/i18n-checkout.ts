import type { Lang, Tr } from '../shared/i18n'
import { tr, LANG_LOCALES } from '../shared/i18n'

// Cart drawer, checkout, payment and confirmation text.
// Keyed by the ENGLISH text. Anything missing falls back to the English key.
const t = (en: string, ta: string, hi: string, ml: string, te: string): Tr => ({ en, ta, hi, ml, te })

export const CK: Record<string, Tr> = {
  // cart drawer
  'Your cart': t('Your cart', 'உங்கள் கார்ட்', 'आपका कार्ट', 'നിങ്ങളുടെ കാർട്ട്', 'మీ కార్ట్'),
  'Close cart': t('Close cart', 'கார்ட்டை மூடு', 'कार्ट बंद करें', 'കാർട്ട് അടയ്ക്കുക', 'కార్ట్ మూసివేయి'),
  'Your cart is empty': t('Your cart is empty', 'உங்கள் கார்ட் காலியாக உள்ளது', 'आपका कार्ट खाली है', 'നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്', 'మీ కార్ట్ ఖాళీగా ఉంది'),
  'You have unlocked complimentary shipping': t('You have unlocked complimentary shipping', 'இலவச ஷிப்பிங் உங்களுக்குக் கிடைத்துவிட்டது', 'आपने मुफ़्त शिपिंग अनलॉक कर ली है', 'സൗജന്യ ഷിപ്പിംഗ് നിങ്ങൾക്ക് ലഭിച്ചു', 'మీరు ఉచిత షిప్పింగ్ పొందారు'),
  'Decrease': t('Decrease', 'குறை', 'घटाएँ', 'കുറയ്ക്കുക', 'తగ్గించు'),
  'Increase': t('Increase', 'அதிகரி', 'बढ़ाएँ', 'കൂട്ടുക', 'పెంచు'),
  'Remove': t('Remove', 'நீக்கு', 'हटाएँ', 'നീക്കം ചെയ്യുക', 'తొలగించు'),
  'Subtotal': t('Subtotal', 'கூட்டுத்தொகை', 'उप-योग', 'ഉപമൊത്തം', 'ఉప మొత్తం'),
  'Proceed to checkout': t('Proceed to checkout', 'செக்அவுட்டுக்குச் செல்லுங்கள்', 'चेकआउट पर जाएँ', 'ചെക്ക്ഔട്ടിലേക്ക് പോകുക', 'చెక్అవుట్‌కు వెళ్ళండి'),
  'Continue shopping': t('Continue shopping', 'தொடர்ந்து ஷாப்பிங் செய்யுங்கள்', 'खरीदारी जारी रखें', 'ഷോപ്പിംഗ് തുടരുക', 'షాపింగ్ కొనసాగించండి'),

  // checkout – validation
  'Enter your full name': t('Enter your full name', 'உங்கள் முழுப் பெயரை உள்ளிடவும்', 'अपना पूरा नाम दर्ज करें', 'നിങ്ങളുടെ മുഴുവൻ പേര് നൽകുക', 'మీ పూర్తి పేరు నమోదు చేయండి'),
  'Enter a valid email': t('Enter a valid email', 'சரியான மின்னஞ்சலை உள்ளிடவும்', 'सही ईमेल दर्ज करें', 'ശരിയായ ഇമെയിൽ നൽകുക', 'సరైన ఇమెయిల్ నమోదు చేయండి'),
  'Enter a 10-digit mobile number': t('Enter a 10-digit mobile number', '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்', '10 अंकों का मोबाइल नंबर दर्ज करें', '10 അക്ക മൊബൈൽ നമ്പർ നൽകുക', '10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి'),
  'Enter your address': t('Enter your address', 'உங்கள் முகவரியை உள்ளிடவும்', 'अपना पता दर्ज करें', 'നിങ്ങളുടെ വിലാസം നൽകുക', 'మీ చిరునామా నమోదు చేయండి'),
  'Enter city': t('Enter city', 'நகரத்தை உள்ளிடவும்', 'शहर दर्ज करें', 'നഗരം നൽകുക', 'నగరం నమోదు చేయండి'),
  'Enter state': t('Enter state', 'மாநிலத்தை உள்ளிடவும்', 'राज्य दर्ज करें', 'സംസ്ഥാനം നൽകുക', 'రాష్ట్రం నమోదు చేయండి'),
  'Enter a 6-digit PIN': t('Enter a 6-digit PIN', '6 இலக்க பின் கோடை உள்ளிடவும்', '6 अंकों का पिन दर्ज करें', '6 അക്ക പിൻ നൽകുക', '6 అంకెల పిన్ నమోదు చేయండి'),
  // checkout – labels
  'Delivery|details': t('Delivery|details', 'டெலிவரி|விவரங்கள்', 'डिलीवरी|विवरण', 'ഡെലിവറി|വിവരങ്ങൾ', 'డెలివరీ|వివరాలు'),
  'Full name': t('Full name', 'முழுப் பெயர்', 'पूरा नाम', 'മുഴുവൻ പേര്', 'పూర్తి పేరు'),
  'Email': t('Email', 'மின்னஞ்சல்', 'ईमेल', 'ഇമെയിൽ', 'ఇమెయిల్'),
  'Mobile': t('Mobile', 'மொபைல்', 'मोबाइल', 'മൊബൈൽ', 'మొబైల్'),
  'Address line 1': t('Address line 1', 'முகவரி வரி 1', 'पता पंक्ति 1', 'വിലാസ വരി 1', 'చిరునామా లైన్ 1'),
  'Apartment, landmark (optional)': t('Apartment, landmark (optional)', 'அபார்ட்மென்ட், அடையாளம் (விருப்பம்)', 'अपार्टमेंट, लैंडमार्क (वैकल्पिक)', 'അപ്പാർട്ട്മെന്റ്, ലാൻഡ്മാർക്ക് (ഓപ്ഷണൽ)', 'అపార్ట్‌మెంట్, ల్యాండ్‌మార్క్ (ఐచ్ఛికం)'),
  'City': t('City', 'நகரம்', 'शहर', 'നഗരം', 'నగరం'),
  'State': t('State', 'மாநிலம்', 'राज्य', 'സംസ്ഥാനം', 'రాష్ట్రం'),
  'PIN code': t('PIN code', 'பின் கோடு', 'पिन कोड', 'പിൻ കോഡ്', 'పిన్ కోడ్'),
  'Shipping method': t('Shipping method', 'ஷிப்பிங் முறை', 'शिपिंग विधि', 'ഷിപ്പിംഗ് രീതി', 'షిప్పింగ్ పద్ధతి'),
  'Standard delivery': t('Standard delivery', 'சாதாரண டெலிவரி', 'स्टैंडर्ड डिलीवरी', 'സ്റ്റാൻഡേർഡ് ഡെലിവറി', 'స్టాండర్డ్ డెలివరీ'),
  '4 to 6 days': t('4 to 6 days', '4 முதல் 6 நாட்கள்', '4 से 6 दिन', '4 മുതൽ 6 ദിവസം', '4 నుండి 6 రోజులు'),
  'Express delivery': t('Express delivery', 'எக்ஸ்பிரஸ் டெலிவரி', 'एक्सप्रेस डिलीवरी', 'എക്സ്പ്രസ് ഡെലിവറി', 'ఎక్స్‌ప్రెస్ డెలివరీ'),
  '1 to 2 days': t('1 to 2 days', '1 முதல் 2 நாட்கள்', '1 से 2 दिन', '1 മുതൽ 2 ദിവസം', '1 నుండి 2 రోజులు'),
  'Complimentary': t('Complimentary', 'இலவசம்', 'मुफ़्त', 'സൗജന്യം', 'ఉచితం'),
  '← Back to shop': t('← Back to shop', '← கடைக்குத் திரும்பு', '← शॉप पर वापस', '← ഷോപ്പിലേക്ക് മടങ്ങുക', '← షాప్‌కి తిరిగి'),
  'Continue to payment': t('Continue to payment', 'பணம் செலுத்தலுக்குத் தொடரவும்', 'भुगतान पर जाएँ', 'പേയ്‌മെന്റിലേക്ക് തുടരുക', 'చెల్లింపునకు కొనసాగండి'),

  // steps + order summary
  'Cart': t('Cart', 'கார்ட்', 'कार्ट', 'കാർട്ട്', 'కార్ట్'),
  'Details': t('Details', 'விவரங்கள்', 'विवरण', 'വിവരങ്ങൾ', 'వివరాలు'),
  'Payment': t('Payment', 'பணம் செலுத்தல்', 'भुगतान', 'പേയ്‌മെന്റ്', 'చెల్లింపు'),
  'Confirmed': t('Confirmed', 'உறுதியானது', 'पुष्टि हुई', 'സ്ഥിരീകരിച്ചു', 'నిర్ధారించబడింది'),
  'Your order': t('Your order', 'உங்கள் ஆர்டர்', 'आपका ऑर्डर', 'നിങ്ങളുടെ ഓർഡർ', 'మీ ఆర్డర్'),
  'Shipping': t('Shipping', 'ஷிப்பிங்', 'शिपिंग', 'ഷിപ്പിംഗ്', 'షిప్పింగ్'),
  'Calculated next': t('Calculated next', 'அடுத்த படியில் கணக்கிடப்படும்', 'अगले चरण में गणना होगी', 'അടുത്ത ഘട്ടത്തിൽ കണക്കാക്കും', 'తదుపరి దశలో లెక్కిస్తారు'),
  'Cash on delivery fee': t('Cash on delivery fee', 'கேஷ் ஆன் டெலிவரி கட்டணம்', 'कैश ऑन डिलीवरी शुल्क', 'ക്യാഷ് ഓൺ ഡെലിവറി ഫീസ്', 'క్యాష్ ఆన్ డెలివరీ రుసుము'),
  'Total': t('Total', 'மொத்தம்', 'कुल', 'ആകെ', 'మొత్తం'),

  // payment
  'Payment|mode': t('Payment|mode', 'பணம் செலுத்தும்|முறை', 'भुगतान|विधि', 'പേയ്‌മെന്റ്|രീതി', 'చెల్లింపు|విధానం'),
  'UPI': t('UPI', 'UPI', 'UPI', 'UPI', 'UPI'),
  'GPay, PhonePe, Paytm': t('GPay, PhonePe, Paytm', 'GPay, PhonePe, Paytm', 'GPay, PhonePe, Paytm', 'GPay, PhonePe, Paytm', 'GPay, PhonePe, Paytm'),
  'Credit / Debit card': t('Credit / Debit card', 'கிரெடிட் / டெபிட் கார்டு', 'क्रेडिट / डेबिट कार्ड', 'ക്രെഡിറ്റ് / ഡെബിറ്റ് കാർഡ്', 'క్రెడిట్ / డెబిట్ కార్డ్'),
  'Visa, Mastercard, RuPay': t('Visa, Mastercard, RuPay', 'Visa, Mastercard, RuPay', 'Visa, Mastercard, RuPay', 'Visa, Mastercard, RuPay', 'Visa, Mastercard, RuPay'),
  'Net banking': t('Net banking', 'நெட் பேங்கிங்', 'नेट बैंकिंग', 'നെറ്റ് ബാങ്കിംഗ്', 'నెట్ బ్యాంకింగ్'),
  'All major banks': t('All major banks', 'அனைத்து முக்கிய வங்கிகள்', 'सभी प्रमुख बैंक', 'എല്ലാ പ്രധാന ബാങ്കുകളും', 'అన్ని ప్రధాన బ్యాంకులు'),
  'Cash on delivery': t('Cash on delivery', 'கேஷ் ஆன் டெலிவரி', 'कैश ऑन डिलीवरी', 'ക്യാഷ് ഓൺ ഡെലിവറി', 'క్యాష్ ఆన్ డెలివరీ'),
  'Enter a valid UPI ID, e.g. name@okbank': t('Enter a valid UPI ID, e.g. name@okbank', 'சரியான UPI ஐடியை உள்ளிடவும், எ.கா. name@okbank', 'सही UPI ID दर्ज करें, जैसे name@okbank', 'ശരിയായ UPI ഐഡി നൽകുക, ഉദാ. name@okbank', 'సరైన UPI ID నమోదు చేయండి, ఉదా. name@okbank'),
  'Enter a 16-digit card number': t('Enter a 16-digit card number', '16 இலக்க கார்டு எண்ணை உள்ளிடவும்', '16 अंकों का कार्ड नंबर दर्ज करें', '16 അക്ക കാർഡ് നമ്പർ നൽകുക', '16 అంకెల కార్డ్ నంబర్ నమోదు చేయండి'),
  'Expiry must be MM/YY': t('Expiry must be MM/YY', 'காலாவதி MM/YY வடிவில் இருக்க வேண்டும்', 'एक्सपायरी MM/YY फ़ॉर्मेट में होनी चाहिए', 'കാലാവധി MM/YY ഫോർമാറ്റിൽ ആയിരിക്കണം', 'గడువు MM/YY ఫార్మాట్‌లో ఉండాలి'),
  'Enter the 3-digit CVV': t('Enter the 3-digit CVV', '3 இலக்க CVV-ஐ உள்ளிடவும்', '3 अंकों का CVV दर्ज करें', '3 അക്ക CVV നൽകുക', '3 అంకెల CVV నమోదు చేయండి'),
  'Enter the name on card': t('Enter the name on card', 'கார்டில் உள்ள பெயரை உள்ளிடவும்', 'कार्ड पर लिखा नाम दर्ज करें', 'കാർഡിലെ പേര് നൽകുക', 'కార్డ్‌పై ఉన్న పేరు నమోదు చేయండి'),
  'Select your bank': t('Select your bank', 'உங்கள் வங்கியைத் தேர்ந்தெடுக்கவும்', 'अपना बैंक चुनें', 'നിങ്ങളുടെ ബാങ്ക് തിരഞ്ഞെടുക്കുക', 'మీ బ్యాంక్‌ను ఎంచుకోండి'),
  'UPI ID': t('UPI ID', 'UPI ஐடி', 'UPI ID', 'UPI ഐഡി', 'UPI ID'),
  'Card number': t('Card number', 'கார்டு எண்', 'कार्ड नंबर', 'കാർഡ് നമ്പർ', 'కార్డ్ నంబర్'),
  'Expiry': t('Expiry', 'காலாவதி', 'एक्सपायरी', 'കാലാവധി', 'గడువు'),
  'Name on card': t('Name on card', 'கார்டில் உள்ள பெயர்', 'कार्ड पर नाम', 'കാർഡിലെ പേര്', 'కార్డ్‌పై పేరు'),
  'Bank': t('Bank', 'வங்கி', 'बैंक', 'ബാങ്ക്', 'బ్యాంక్'),
  'Pay in cash when your order arrives. A small handling fee applies.': t('Pay in cash when your order arrives. A small handling fee applies.', 'உங்கள் ஆர்டர் வந்ததும் பணமாக செலுத்துங்கள். சிறிய கையாளுதல் கட்டணம் உண்டு.', 'ऑर्डर पहुँचने पर नकद भुगतान करें। एक छोटा हैंडलिंग शुल्क लगेगा।', 'ഓർഡർ എത്തുമ്പോൾ പണമായി നൽകുക. ചെറിയ ഹാൻഡ്ലിംഗ് ഫീസ് ബാധകമാണ്.', 'ఆర్డర్ వచ్చినప్పుడు నగదుగా చెల్లించండి. చిన్న హ్యాండ్లింగ్ రుసుము వర్తిస్తుంది.'),
  '← Back to details': t('← Back to details', '← விவரங்களுக்குத் திரும்பு', '← विवरण पर वापस', '← വിവരങ്ങളിലേക്ക് മടങ്ങുക', '← వివరాలకు తిరిగి'),
  'Place order': t('Place order', 'ஆர்டர் செய்யுங்கள்', 'ऑर्डर दें', 'ഓർഡർ ചെയ്യുക', 'ఆర్డర్ చేయండి'),
  'Securing your order…': t('Securing your order…', 'உங்கள் ஆர்டரைப் பாதுகாக்கிறோம்…', 'आपका ऑर्डर सुरक्षित किया जा रहा है…', 'നിങ്ങളുടെ ഓർഡർ സുരക്ഷിതമാക്കുന്നു…', 'మీ ఆర్డర్‌ను సురక్షితం చేస్తున్నాము…'),

  // confirmation
  'Merci,': t('Merci,', 'நன்றி,', 'धन्यवाद,', 'നന്ദി,', 'ధన్యవాదాలు,'),
  'Order number': t('Order number', 'ஆர்டர் எண்', 'ऑर्डर नंबर', 'ഓർഡർ നമ്പർ', 'ఆర్డర్ నంబర్'),
  'Placed on': t('Placed on', 'ஆர்டர் செய்த தேதி', 'ऑर्डर की तारीख़', 'ഓർഡർ ചെയ്ത തീയതി', 'ఆర్డర్ చేసిన తేదీ'),
  'Arrives by': t('Arrives by', 'வந்து சேரும் தேதி', 'पहुँचने की तारीख़', 'എത്തിച്ചേരുന്ന തീയതി', 'చేరుకునే తేదీ'),
  'Delivering to': t('Delivering to', 'டெலிவரி முகவரி', 'डिलीवरी का पता', 'ഡെലിവറി വിലാസം', 'డెలివరీ చిరునామా'),
  'Qty': t('Qty', 'எண்ணிக்கை', 'मात्रा', 'എണ്ണം', 'పరిమాణం'),
  'MM/YY': t('MM/YY', 'மாத/ஆண்டு', 'माह/वर्ष', 'മാസം/വർഷം', 'నెల/సంవత్సరం'),
  'CVV': t('CVV', 'CVV', 'CVV', 'CVV', 'CVV'),
  'yourname@okbank': t('yourname@okbank', 'yourname@okbank', 'yourname@okbank', 'yourname@okbank', 'yourname@okbank'),

}

export const ck = (s: string, lang: Lang) => (CK[s] ? tr(CK[s], lang) : s)
/** Headings with a gold italic second part: "Delivery|details" → ['Delivery', 'details']. */
export const ck2 = (s: string, lang: Lang): [string, string] => {
  const [a, b = ''] = ck(s, lang).split('|')
  return [a, b]
}
const up = (s: string) => s.toUpperCase()
export const ckUp = (s: string, lang: Lang) => up(ck(s, lang))

type F<A extends unknown[]> = Record<Lang, (...a: A) => string>
const call = <A extends unknown[]>(f: F<A>, lang: Lang, ...a: A) => f[lang](...a)

const ADD_MORE: F<[string]> = {
  en: (p) => `Add ${p} more for complimentary shipping`,
  ta: (p) => `இலவச ஷிப்பிங்கிற்கு இன்னும் ${p} சேர்க்கவும்`,
  hi: (p) => `मुफ़्त शिपिंग के लिए ${p} और जोड़ें`,
  ml: (p) => `സൗജന്യ ഷിപ്പിംഗിന് ${p} കൂടി ചേർക്കുക`,
  te: (p) => `ఉచిత షిప్పింగ్ కోసం మరో ${p} జోడించండి`,
}
const STD_FREE: F<[string]> = {
  en: (p) => `Standard shipping is complimentary above ${p}.`,
  ta: (p) => `${p}-க்கு மேல் சாதாரண ஷிப்பிங் இலவசம்.`,
  hi: (p) => `${p} से ऊपर स्टैंडर्ड शिपिंग मुफ़्त है।`,
  ml: (p) => `${p}-ന് മുകളിൽ സ്റ്റാൻഡേർഡ് ഷിപ്പിംഗ് സൗജന്യമാണ്.`,
  te: (p) => `${p} పైన స్టాండర్డ్ షిప్పింగ్ ఉచితం.`,
}
const EXTRA: F<[string]> = {
  en: (p) => `Extra ${p}`, ta: (p) => `கூடுதல் ${p}`, hi: (p) => `अतिरिक्त ${p}`, ml: (p) => `അധികം ${p}`, te: (p) => `అదనంగా ${p}`,
}
const SHIP_TO: F<[string, string, string]> = {
  en: (n, c, p) => `Shipping to ${n}, ${c} ${p}`,
  ta: (n, c, p) => `${n}, ${c} ${p} முகவரிக்கு அனுப்பப்படும்`,
  hi: (n, c, p) => `${n}, ${c} ${p} पर शिप होगा`,
  ml: (n, c, p) => `${n}, ${c} ${p} എന്ന വിലാസത്തിലേക്ക് അയയ്ക്കും`,
  te: (n, c, p) => `${n}, ${c} ${p} కు షిప్ చేయబడుతుంది`,
}
const PAY_BTN: F<[string]> = {
  en: (a) => `Pay ${a}`, ta: (a) => `${a} செலுத்துங்கள்`, hi: (a) => `${a} का भुगतान करें`, ml: (a) => `${a} അടയ്ക്കുക`, te: (a) => `${a} చెల్లించండి`,
}
const RECEIPT: F<[string]> = {
  en: (e) => `Your order is confirmed. A receipt has been sent to ${e}.`,
  ta: (e) => `உங்கள் ஆர்டர் உறுதியானது. ரசீது ${e} முகவரிக்கு அனுப்பப்பட்டுள்ளது.`,
  hi: (e) => `आपका ऑर्डर कन्फ़र्म हो गया है। रसीद ${e} पर भेज दी गई है।`,
  ml: (e) => `നിങ്ങളുടെ ഓർഡർ സ്ഥിരീകരിച്ചു. രസീത് ${e}-ലേക്ക് അയച്ചിട്ടുണ്ട്.`,
  te: (e) => `మీ ఆర్డర్ నిర్ధారించబడింది. రసీదు ${e}కు పంపబడింది.`,
}
const INCL: F<[boolean, string, string]> = {
  en: (free, ship, fee) => `incl. shipping ${free ? 'complimentary' : ship}${fee ? ` and COD fee ${fee}` : ''}`,
  ta: (free, ship, fee) => `ஷிப்பிங் ${free ? 'இலவசம்' : ship}${fee ? ` மற்றும் COD கட்டணம் ${fee}` : ''} உட்பட`,
  hi: (free, ship, fee) => `शिपिंग ${free ? 'मुफ़्त' : ship}${fee ? ` और COD शुल्क ${fee}` : ''} सहित`,
  ml: (free, ship, fee) => `ഷിപ്പിംഗ് ${free ? 'സൗജന്യം' : ship}${fee ? `, COD ഫീസ് ${fee}` : ''} ഉൾപ്പെടെ`,
  te: (free, ship, fee) => `షిప్పింగ్ ${free ? 'ఉచితం' : ship}${fee ? ` మరియు COD రుసుము ${fee}` : ''} కలిపి`,
}

export const addMoreLabel = (p: string, lang: Lang) => call(ADD_MORE, lang, p)
export const stdFreeLabel = (p: string, lang: Lang) => call(STD_FREE, lang, p)
export const extraLabel = (p: string, lang: Lang) => call(EXTRA, lang, p)
export const shipToLabel = (n: string, c: string, p: string, lang: Lang) => call(SHIP_TO, lang, n, c, p)
export const payBtnLabel = (a: string, lang: Lang) => call(PAY_BTN, lang, a)
export const receiptLabel = (e: string, lang: Lang) => call(RECEIPT, lang, e)
export const inclLabel = (free: boolean, ship: string, fee: string, lang: Lang) => call(INCL, lang, free, ship, fee)

// sizes such as "20 sachets", "12 shades" (ml / g / A5 stay as they are)
const UNIT_WORD: Record<string, Tr> = {
  sachets: t('sachets', 'சாஷேக்கள்', 'सैशे', 'സാഷെകൾ', 'సాషేలు'),
  shades: t('shades', 'நிறங்கள்', 'शेड्स', 'ഷേഡുകൾ', 'షేడ్స్'),
}
export const sizeText = (s: string, lang: Lang) => s.replace(/\b(sachets|shades)\b/, (w) => tr(UNIT_WORD[w], lang))

/** Order dates are stored as ISO strings and formatted in the active language. */
export const fmtOrderDate = (iso: string, lang: Lang) => {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString(LANG_LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric' })
}
