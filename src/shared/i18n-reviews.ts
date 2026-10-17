// Navbar labels for the Reviews page (shown when logged in) and the Testimonials page (shown when logged out).
export const REVIEW_NAV: Record<string, { Reviews: string; Testimonials: string }> = {
  en: { Reviews: 'Reviews', Testimonials: 'Testimonials' },
  ta: { Reviews: 'மதிப்புரைகள்', Testimonials: 'சான்றுகள்' },
  hi: { Reviews: 'समीक्षाएँ', Testimonials: 'प्रशंसापत्र' },
  ml: { Reviews: 'അവലോകനങ്ങൾ', Testimonials: 'സാക്ഷ്യപത്രങ്ങൾ' },
  te: { Reviews: 'రివ్యూలు', Testimonials: 'టెస్టిమోనియల్స్' },
  kn: { Reviews: 'ವಿಮರ್ಶೆಗಳು', Testimonials: 'ಪ್ರಶಂಸಾಪತ್ರಗಳು' },
  mr: { Reviews: 'पुनरावलोकने', Testimonials: 'प्रशंसापत्रे' },
  bn: { Reviews: 'পর্যালোচনা', Testimonials: 'প্রশংসাপত্র' },
  sa: { Reviews: 'समीक्षाः', Testimonials: 'प्रशंसापत्राणि' },
}
export const reviewNav = (lang: string, loggedIn: boolean) => (REVIEW_NAV[lang] ?? REVIEW_NAV.en)[loggedIn ? 'Reviews' : 'Testimonials']
