import { SITE } from '../site-links'
import { useI18n } from '../site/i18n-site'
import { spa } from '../site/data'
import { useUiLang } from './i18n'
import { NAV_LABELS } from './i18n-nav'
import { NAV_EXTRA } from './i18n-nav-extra'
import { reviewNav } from './i18n-reviews'
import { useUser } from './LoginModal'

// Tagline in all 9 languages (en, ta, hi, ml, te, kn, mr, bn, sa).
const FOOT_TAGLINE: Record<string, string> = {
  en: "Where Nature meets beauty",
  ta: "இயற்கை அழகைச் சந்திக்கும் இடம்",
  hi: "जहाँ प्रकृति सौंदर्य से मिलती है",
  ml: "പ്രകൃതി സൗന്ദര്യത്തെ കണ്ടുമുട്ടുന്നിടം",
  te: "ప్రకృతి అందాన్ని కలిసే చోటు",
  kn: "ಪ್ರಕೃತಿ ಸೌಂದರ್ಯವನ್ನು ಭೇಟಿಯಾಗುವೆಡೆ",
  mr: "जिथे निसर्ग सौंदर्याशी भेटतो",
  bn: "যেখানে প্রকৃতি সৌন্দর্যের সাথে মেশে",
  sa: "यत्र प्रकृतिः सौन्दर्येण सह मिलति",
};

/** Footer shared by every page of the site app (About, Tracking, Reviews, Booking ...). */
export default function SiteFooter() {
  const { t } = useI18n()
  const [ui] = useUiLang()
  const user = useUser()
  // Same label sources as the navbar, so the footer always matches it in every language.
  const L: Record<string, string> = { ...NAV_LABELS[ui], ...(NAV_EXTRA[ui] ?? {}), Reviews: reviewNav(ui, !!user) }
  const links: [string, string][] = [['Products', SITE.products], ['Services', SITE.services], ['About', SITE.about], ['Tracking', SITE.tracking], ['Reviews', SITE.reviews]]
  return (
    <footer className="rv-sitefoot">
      <div className="rv-sitefoot-in">
        <div className="rv-sitefoot-brand">
          <img className="rv-logo rv-logo-foot" src="/revathi-logo.png" alt="Revathi Herbal Care" width={96} height={96} loading="lazy" decoding="async" />
          <strong>REVATHI HERBAL CARE</strong>
          <span>{FOOT_TAGLINE[ui] ?? FOOT_TAGLINE.en}</span>
        </div>
        <nav aria-label="Footer">
          {links.map(([n, h]) => <a key={n} href={h}>{L[n] ?? n}</a>)}
        </nav>
        <div className="rv-sitefoot-contact">
          <div className="rv-sitefoot-btns">
            <a className="rv-sitefoot-book" href={SITE.booking}>{t('Book appointment ↗')}</a>
            <a className="rv-sitefoot-ghost" href={SITE.products}>{t('Shop products')}</a>
            <a className="rv-sitefoot-ghost" href={SITE.tracking}>{t('Track order')}</a>
          </div>
          <p>{spa.address}</p>
          <p>{spa.phone}</p>
          <p>{spa.email}</p>
        </div>
      </div>
      <div className="rv-sitefoot-copy">© {new Date().getFullYear()} {spa.name}</div>
    </footer>
  )
}
