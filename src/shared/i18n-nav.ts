import type { Lang } from './i18n'

// Navbar / menu labels shared by SiteHeader (Products, Services, About, Tracking pages)
// and the landing page. Add a new label here once and every page can use it.

export const NAV_LABELS: Record<Lang, Record<string, string>> = {
  en: { Home: 'Home', Products: 'Products', Services: 'Services', About: 'About', Tracking: 'Tracking', Admin: 'Admin', AdminPanel: 'Admin panel', Cart: 'Cart', Menu: 'Open menu', Close: 'Close menu', SitePages: 'Site pages', Footer: 'Footer', HomeLink: 'Revathi Herbal Beauty Care — home', Language: 'Language', MenuNav: 'Menu', BrandSub: 'BEAUTY & SALON' },
  ta: { Home: 'முகப்பு', Products: 'பொருட்கள்', Services: 'சேவைகள்', About: 'எங்களைப் பற்றி', Tracking: 'டிராக்கிங்', Admin: 'அட்மின்', AdminPanel: 'அட்மின் பேனல்', Cart: 'பை', Menu: 'மெனு திற', Close: 'மெனு மூடு', SitePages: 'தளப் பக்கங்கள்', Footer: 'அடிக்குறிப்பு', HomeLink: 'Revathi Herbal Beauty Care — முகப்பு', Language: 'மொழி', MenuNav: 'மெனு', BrandSub: 'அழகு & சலூன்' },
  hi: { Home: 'होम', Products: 'प्रोडक्ट्स', Services: 'सेवाएँ', About: 'हमारे बारे में', Tracking: 'ट्रैकिंग', Admin: 'एडमिन', AdminPanel: 'एडमिन पैनल', Cart: 'बैग', Menu: 'मेनू खोलें', Close: 'मेनू बंद करें', SitePages: 'साइट के पेज', Footer: 'फ़ुटर', HomeLink: 'Revathi Herbal Beauty Care — होम', Language: 'भाषा', MenuNav: 'मेनू', BrandSub: 'ब्यूटी & सैलून' },
  ml: { Home: 'ഹോം', Products: 'ഉൽപ്പന്നങ്ങൾ', Services: 'സേവനങ്ങൾ', About: 'ഞങ്ങളെക്കുറിച്ച്', Tracking: 'ട്രാക്കിംഗ്', Admin: 'അഡ്മിൻ', AdminPanel: 'അഡ്മിൻ പാനൽ', Cart: 'ബാഗ്', Menu: 'മെനു തുറക്കുക', Close: 'മെനു അടയ്ക്കുക', SitePages: 'സൈറ്റ് പേജുകൾ', Footer: 'ഫൂട്ടർ', HomeLink: 'Revathi Herbal Beauty Care — ഹോം', Language: 'ഭാഷ', MenuNav: 'മെനു', BrandSub: 'ബ്യൂട്ടി & സലൂൺ' },
  te: { Home: 'హోమ్', Products: 'ఉత్పత్తులు', Services: 'సేవలు', About: 'మా గురించి', Tracking: 'ట్రాకింగ్', Admin: 'అడ్మిన్', AdminPanel: 'అడ్మిన్ ప్యానెల్', Cart: 'బ్యాగ్', Menu: 'మెనూ తెరవండి', Close: 'మెనూ మూసివేయండి', SitePages: 'సైట్ పేజీలు', Footer: 'ఫుటర్', HomeLink: 'Revathi Herbal Beauty Care — హోమ్', Language: 'భాష', MenuNav: 'మెనూ', BrandSub: 'బ్యూటీ & సెలూన్' },
}
