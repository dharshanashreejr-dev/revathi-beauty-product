import { useEffect, useRef, useState } from "react";
import { requireLogin, openLogin } from "../shared/LoginModal";
import { authT } from "../shared/auth-text";
import {
  Search,
  ShoppingBag,
  X,
  Menu,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { img, photos } from "./photos";
import { SITE } from "../site-links";
import { content } from "./content";
import { tr, trx, NAV_LANG_NAMES } from "../shared/i18n";
import { st } from "./i18n-sections";
import { heroTicker } from "./hero-slides";
import { liveHeroSlides } from "../api/offers";
import { addOrder } from "../site/account";
import { NAV_LABELS } from "../shared/i18n-nav";
import SitePillNav from "../shared/SitePillNav";
import { searchSite } from "../shared/searchIndex";
import { reviewNav } from "../shared/i18n-reviews";
import { useUser } from "../shared/LoginModal";
import ProfileMenu from "../shared/ProfileMenu";
import { applyHomeMeta } from "../shared/i18n-meta";
import { ProductPhoto, HerbalShowcase, VideoBand } from "./sections";
import Testimonials from "./Testimonials";
import {
  BRAND,
  products,
  categories,
  rituals,
  serviceGroups,
  allServices,
  servicePricesOn,
  slots,
  rupees,
  SHADES,
  type Cat,
  LANG_LOCALES,
  type Lang,
} from "./data";
type Panel =
  | "search"
  | "bag"
  | "product"
  | "menu"
  | "journal"
  | "care"
  | "booking"
  | "checkout"
  | "order"
  | null;

type Language = "en" | "ta" | "hi" | "ml" | "te" | "kn" | "mr" | "bn" | "sa";
const NAV_LANG_CODES = ["en", "ta", "hi", "ml", "te", "kn", "mr", "bn", "sa"] as const;
const FREE_SHIP = 1999;
const SHIP_FEE = 99;
const byId = (id: string) => products.find((p) => p.id === id)!;
const noteImages = [photos.notePeach, photos.noteJasmine, photos.noteWood];
const moods = [
  { key: "dusk", bg: "linear-gradient(160deg,#FBEDEB 0%,#F2C6C2 55%,#7A2E4D 100%)" },
  { key: "ivory", bg: "linear-gradient(160deg,#FFFFFF 0%,#FBEDEB 60%,#F2C6C2 100%)" },
  { key: "bloom", bg: "linear-gradient(160deg,#FBEDEB 0%,#FBEDEB 55%,#C98A9B 100%)" },
] as const;
const hotspots = [
  { x: 50, y: 12, note: 0 },
  { x: 30, y: 52, note: 1 },
  { x: 68, y: 78, note: 2 },
];
const finePointer = () =>
  matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Pointer-driven 3D tilt with a moving light sheen (desktop only). */
function tilt(e: React.PointerEvent<HTMLElement>, depth = 10) {
  if (e.pointerType !== "mouse" || !finePointer()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--gx", `${px * 100}%`);
  el.style.setProperty("--gy", `${py * 100}%`);
  gsap.to(el, {
    rotateY: (px - 0.5) * depth,
    rotateX: (0.5 - py) * depth,
    transformPerspective: 900,
    duration: 0.6,
    ease: "power3.out",
  });
}
function untilt(e: React.PointerEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "power3.out" });
}
/** Buttons drift gently towards the pointer. */
function magnet(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse" || !finePointer()) return;
  const r = e.currentTarget.getBoundingClientRect();
  gsap.to(e.currentTarget, {
    x: (e.clientX - r.left - r.width / 2) * 0.25,
    y: (e.clientY - r.top - r.height / 2) * 0.35,
    duration: 0.5,
    ease: "power3.out",
  });
}
function unmagnet(e: React.PointerEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
}
/** The lotus mark, redrawn as a vector so it stays sharp at any size. */
function Lotus() {
  return (
    <svg className="brand-lotus" viewBox="0 0 64 40" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 3.5C25.6 11.5 25.6 23.5 32 32.5C38.4 23.5 38.4 11.5 32 3.5Z" />
        <path d="M32 32.5C24.6 30.6 19.4 22.8 19.8 12.6C25.2 15.4 29.6 21.6 32 32.5Z" />
        <path d="M32 32.5C39.4 30.6 44.6 22.8 44.2 12.6C38.8 15.4 34.4 21.6 32 32.5Z" />
        <path d="M32 32.5C22.6 33.6 13.4 29 9 20.6C17.6 19.8 26.6 24.4 32 32.5Z" />
        <path d="M32 32.5C41.4 33.6 50.6 29 55 20.6C46.4 19.8 37.4 24.4 32 32.5Z" />
        <path d="M21.5 36.2Q32 39.4 42.5 36.2" />
      </g>
    </svg>
  );
}
const TAGLINE: Record<Language, string> = {
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
const PAYTX = {
  method: { en: "Payment method (online)", ta: "பணம் செலுத்தும் முறை (ஆன்லைன்)", hi: "भुगतान का तरीका (ऑनलाइन)", ml: "പേയ്മെന്റ് രീതി (ഓൺലൈൻ)", te: "చెల్లింపు పద్ధతి (ఆన్‌లైన్)", kn: "ಪಾವತಿ ವಿಧಾನ (ಆನ್‌ಲೈನ್)", mr: "पेमेंट पद्धत (ऑनलाइन)", bn: "পেমেন্ট পদ্ধতি (অনলাইন)", sa: "मूल्यदान-विधिः (जालस्थम्)"},
  card: { en: "Credit / Debit card", ta: "கிரெடிட் / டெபிட் கார்டு", hi: "क्रेडिट / डेबिट कार्ड", ml: "ക്രെഡിറ്റ് / ഡെബിറ്റ് കാർഡ്", te: "క్రెడిట్ / డెబిట్ కార్డ్", kn: "ಕ್ರೆಡಿಟ್ / ಡೆಬಿಟ್ ಕಾರ್ಡ್", mr: "क्रेडिट / डेबिट कार्ड", bn: "ক্রেডিট / ডেবিট কার্ড", sa: "क्रेडिट् / डेबिट् पत्रम्"},
  netbanking: { en: "Net banking", ta: "நெட் பேங்கிங்", hi: "नेट बैंकिंग", ml: "നെറ്റ് ബാങ്കിംഗ്", te: "నెట్ బ్యాంకింగ్", kn: "ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್", mr: "नेट बँकिंग", bn: "নেট ব্যাংকিং", sa: "जाल-बैंकिङ्ग्"},
  upiId: { en: "UPI ID", ta: "UPI ஐடி", hi: "UPI आईडी", ml: "UPI ഐഡി", te: "UPI ఐడి", kn: "UPI ಐಡಿ", mr: "UPI आयडी", bn: "UPI আইডি", sa: "UPI परिचयः"},
  cardNumber: { en: "Card number", ta: "கார்டு எண்", hi: "कार्ड नंबर", ml: "കാർഡ് നമ്പർ", te: "కార్డ్ నంబర్", kn: "ಕಾರ್ಡ್ ಸಂಖ್ಯೆ", mr: "कार्ड नंबर", bn: "কার্ড নম্বর", sa: "पत्र-सङ्ख्या"},
  bank: { en: "Bank", ta: "வங்கி", hi: "बैंक", ml: "ബാങ്ക്", te: "బ్యాంక్", kn: "ಬ್ಯಾಂಕ್", mr: "बँक", bn: "ব্যাংক", sa: "वित्तागारम्"},
  selectBank: { en: "Select your bank", ta: "உங்கள் வங்கியைத் தேர்ந்தெடுக்கவும்", hi: "अपना बैंक चुनें", ml: "നിങ്ങളുടെ ബാങ്ക് തിരഞ്ഞെടുക്കൂ", te: "మీ బ్యాంక్‌ను ఎంచుకోండి", kn: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಆರಿಸಿ", mr: "तुमची बँक निवडा", bn: "আপনার ব্যাংক বেছে নিন", sa: "तव वित्तागारं चिनोतु"},
  offline: { en: "Services are paid offline, at the salon. No online payment is needed to book.", ta: "சேவைகளுக்கான கட்டணம் சலூனில் நேரடியாகச் செலுத்தப்படும். முன்பதிவுக்கு ஆன்லைன் கட்டணம் தேவையில்லை.", hi: "सेवाओं का भुगतान सैलून में ऑफ़लाइन होता है। बुकिंग के लिए ऑनलाइन भुगतान की ज़रूरत नहीं।", ml: "സേവനങ്ങളുടെ പണം സലൂണിൽ നേരിട്ട് നൽകണം. ബുക്ക് ചെയ്യാൻ ഓൺലൈൻ പേയ്മെന്റ് ആവശ്യമില്ല.", te: "సేవలకు చెల్లింపు సెలూన్‌లో ఆఫ్‌లైన్‌లో చేయాలి. బుక్ చేయడానికి ఆన్‌లైన్ చెల్లింపు అవసరం లేదు.", kn: "ಸೇವೆಗಳ ಪಾವತಿಯನ್ನು ಸೆಲೂನ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಮಾಡಲಾಗುತ್ತದೆ. ಬುಕ್ ಮಾಡಲು ಆನ್‌ಲೈನ್ ಪಾವತಿ ಅಗತ್ಯವಿಲ್ಲ.", mr: "सेवांचे पैसे सलूनमध्ये ऑफलाइन द्यायचे आहेत. बुकिंगसाठी ऑनलाइन पेमेंटची गरज नाही.", bn: "সেবার টাকা সেলুনে সরাসরি দিতে হয়। বুক করতে অনলাইন পেমেন্ট লাগে না।", sa: "सेवाः शालूने ऑफ्लाइन दत्ताः। आरक्षणाय जाल-मूल्यदानं न आवश्यकम्।"},
  errUpi: { en: "Enter a valid UPI ID, e.g. name@okbank", ta: "சரியான UPI ஐடியை உள்ளிடவும், எ.கா. name@okbank", hi: "सही UPI आईडी दर्ज करें, जैसे name@okbank", ml: "ശരിയായ UPI ഐഡി നൽകൂ, ഉദാ. name@okbank", te: "సరైన UPI ఐడి నమోదు చేయండి, ఉదా. name@okbank", kn: "ಮಾನ್ಯವಾದ UPI ಐಡಿ ನಮೂದಿಸಿ, ಉದಾ. name@okbank", mr: "वैध UPI आयडी टाका, उदा. name@okbank", bn: "সঠিক UPI আইডি দিন, যেমন name@okbank", sa: "वैधं UPI परिचयं प्रविशतु, यथा name@okbank"},
  err16: { en: "Enter a 16-digit card number", ta: "16 இலக்க கார்டு எண்ணை உள்ளிடவும்", hi: "16 अंकों का कार्ड नंबर दर्ज करें", ml: "16 അക്ക കാർഡ് നമ്പർ നൽകൂ", te: "16 అంకెల కార్డ్ నంబర్ నమోదు చేయండి", kn: "16 ಅಂಕಿಯ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ", mr: "16 अंकी कार्ड नंबर टाका", bn: "16 অঙ্কের কার্ড নম্বর দিন", sa: "१६-अङ्क-पत्र-सङ्ख्यां प्रविशतु"},
  errExp: { en: "Expiry must be MM/YY", ta: "காலாவதி MM/YY வடிவில் இருக்க வேண்டும்", hi: "एक्सपायरी MM/YY फ़ॉर्मेट में होनी चाहिए", ml: "കാലാവധി MM/YY ഫോർമാറ്റിൽ ആയിരിക്കണം", te: "గడువు MM/YY ఫార్మాట్‌లో ఉండాలి", kn: "ಅವಧಿ MM/YY ರೂಪದಲ್ಲಿರಬೇಕು", mr: "मुदत MM/YY स्वरूपात असावी", bn: "মেয়াদ MM/YY ফরম্যাটে হতে হবে", sa: "समाप्तिः MM/YY भवेत्"},
  errCvv: { en: "Enter the 3-digit CVV", ta: "3 இலக்க CVV-ஐ உள்ளிடவும்", hi: "3 अंकों का CVV दर्ज करें", ml: "3 അക്ക CVV നൽകൂ", te: "3 అంకెల CVV నమోదు చేయండి", kn: "3 ಅಂಕಿಯ CVV ನಮೂದಿಸಿ", mr: "3 अंकी CVV टाका", bn: "3 অঙ্কের CVV দিন", sa: "३-अङ्कं CVV प्रविशतु"},
  colour: { en: "Colour", ta: "நிறம்", hi: "रंग", ml: "നിറം", te: "రంగు", kn: "ಬಣ್ಣ", mr: "रंग", bn: "রং", sa: "वर्णः"},
};
function Brand({ rise = false, lang, compact = false }: { rise?: boolean; lang: Language; compact?: boolean }) {
  const part = (cls: string, children: React.ReactNode, i: number) =>
    rise ? (
      <span className={`rise-mask ${cls}-mask`}>
        <span className={`rise ${cls}`} style={{ "--d": `${0.25 + i * 0.22}s` } as React.CSSProperties}>
          {children}
        </span>
      </span>
    ) : (
      <span className={cls}>{children}</span>
    );
  if (compact)
    return (
      <span className="brand-mark brand-compact" role="img" aria-label={BRAND}>
        <span className="brand-word" aria-hidden="true">REVATHI HERBAL CARE</span>
        <span className="brand-tagline">{TAGLINE[lang]}</span>
      </span>
    );
  return (
    <span className="brand-mark" role="img" aria-label={BRAND}>
      {part("brand-icon", <Lotus />, 0)}
      {rise ? (
        <span className="rise-mask brand-word-mask">
          <span className="brand-word" aria-hidden="true">
            {BRAND.split("").map((ch, i) => (
              <span className="rise rise-letter" key={i} style={{ "--d": `${0.55 + i * 0.06}s` } as React.CSSProperties}>
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </span>
        </span>
      ) : (
        <span className="brand-word" aria-hidden="true">{BRAND}</span>
      )}
      {part("brand-sub", NAV_LABELS[lang].BrandSub, 5)}
      {part("brand-tagline", TAGLINE[lang], 6)}
    </span>
  );
}
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!finePointer() || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, select, input");
      el.classList.toggle("is-hover", !!target);
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => el.classList.add("is-hidden");
    const enter = () => el.classList.remove("is-hidden");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);
  return (
    <div ref={dot} className={`cursor ${label ? "has-label" : ""}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span className="text-mask" key={i}>
          <span className="reveal-line">{line}</span>
        </span>
      ))}
    </>
  );
}
export default function Home() {
  const [slides] = useState(() => liveHeroSlides()); // admin can add / replace / delete banners
  const [lang, setLang] = useState<Language>(() => {
    try {
      const s = localStorage.getItem("velvet-lang") as Language | null;
      if (s && ["en","ta","hi","ml","te","kn","mr","bn","sa"].includes(s)) return s;
    } catch {}
    return "en";
  }),
    [panel, setPanel] = useState<Panel>(null),
    [query, setQuery] = useState(""),
    [cart, setCart] = useState<Record<string, number>>({}),
    [productId, setProductId] = useState("eclat"),
    [picBg, setPicBg] = useState<string | null>(null),
    [filter, setFilter] = useState<"all" | Cat>("all"),
    [group, setGroup] = useState(serviceGroups[0].key),
    [slide, setSlide] = useState(0),
    [slidePaused, setSlidePaused] = useState(false),
    [appointments, setAppointments] = useState<{ date: string; time: string }[]>([]),
    [booking, setBooking] = useState({ service: "", date: "", time: "", name: "", phone: "", notes: "" }),
    [bookError, setBookError] = useState(""),
    [booked, setBooked] = useState<{ service: string; date: string; time: string; mins: number } | null>(null),
    [ship, setShip] = useState({ name: "", phone: "", address: "", city: "", pin: "" }),
    [orderError, setOrderError] = useState(""),
    [pay, setPay] = useState({ mode: "upi", upi: "", num: "", exp: "", cvv: "", bank: "" }),
    [order, setOrder] = useState<{ id: string; total: number; lines: string[] } | null>(null),
    [note, setNote] = useState(0),
    [article, setArticle] = useState(0),
    [toast, setToast] = useState(""),
    [introSeen] = useState(() => { try { return sessionStorage.getItem("rhbc-intro-seen") === "1"; } catch { return false; } }),
    [ready, setReady] = useState(() => { try { return sessionStorage.getItem("rhbc-intro-seen") === "1"; } catch { return false; } }),
    [sticky, setSticky] = useState(false),
    [shade, setShade] = useState(0),
    [notesPaused, setNotesPaused] = useState(false),
    [notesTouched, setNotesTouched] = useState(false);

  // Shop shows only 5 random products per category (picked once per visit); "View all" opens the full products page.
  const shopShuffle = useRef<Record<string, string[]>>({});
  const shopPicks = (key: "all" | Cat) => {
    if (!shopShuffle.current[key]) {
      const HIDE = ["body-butter", "perfume"], PIN = ["tint-powder", "cleansing-oil", "herbal-shampoo"];
      const pool = products.filter((p) => !HIDE.includes(p.id) && (key === "all" || p.cat === key));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      pool.sort((a, b) => Number(PIN.includes(b.id)) - Number(PIN.includes(a.id)));
      shopShuffle.current[key] = pool.slice(0, 5).map((p) => p.id);
    }
    return shopShuffle.current[key].map((id) => products.find((p) => p.id === id)!);
  };
  const root = useRef<HTMLDivElement>(null),
    dialog = useRef<HTMLDialogElement>(null),
    lenis = useRef<Lenis | null>(null);
  const t = content[lang as keyof typeof content] ?? content.en;
  const NL = NAV_LABELS[lang];
  const loggedUser = useUser();
  const reviewsLabel = reviewNav(lang, !!loggedUser);
  const product = byId(productId);
  const lines = products.filter((p) => cart[p.id] > 0).map((p) => ({ p, qty: cart[p.id] }));
  const bag = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const total = subtotal + shipping;
  const activeGroup = serviceGroups.find((g) => g.key === group) ?? serviceGroups[0];
  const todayStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const catLabel = (c: Cat) => categories.find((x) => x.key === c)!.label[lang] ?? categories.find((x) => x.key === c)!.label.en;
  const notes = [
    { name: t.peach, sub: t.peachSub, copy: t.peachCopy },
    { name: t.jasmine, sub: t.jasmineSub, copy: t.jasmineCopy },
    { name: t.wood, sub: t.woodSub, copy: t.woodCopy },
  ];
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("velvet-bag") || "{}") as Record<string, unknown>;
      const clean: Record<string, number> = {};
      for (const p of products) {
        const q = Number(saved[p.id]);
        if (Number.isInteger(q) && q > 0 && q <= 10) clean[p.id] = q;
      }
      setCart(clean);
      const appts = JSON.parse(localStorage.getItem("velvet-appointments") || "[]");
      if (Array.isArray(appts)) setAppointments(appts.filter((a) => a && typeof a.date === "string" && typeof a.time === "string"));
    } catch {}
    // Long enough for the intro lines to rise slowly before the curtain lifts.
    const timeout = setTimeout(() => { setReady(true); try { sessionStorage.setItem("rhbc-intro-seen", "1"); } catch {} }, introSeen ? 0 : 3300);
    const scroll = () => setSticky(window.scrollY > 60);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("velvet-lang", lang); } catch {}
    applyHomeMeta(lang);
  }, [lang]);
  useEffect(() => {
    const sync = () => {
      try {
        const s = localStorage.getItem("velvet-lang") as Language | null;
        if (s && ["en", "ta", "hi", "ml", "te", "kn", "mr", "bn", "sa"].includes(s)) setLang(s);
      } catch {}
    };
    window.addEventListener("velvet-lang-change", sync);
    return () => window.removeEventListener("velvet-lang-change", sync);
  }, []);
  useEffect(() => {
    // The hero glides through its images on its own until someone takes over.
    if (!ready || slidePaused || slides.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setSlide((n) => (n + 1) % slides.length), 5600);
    return () => clearTimeout(timer);
  }, [slide, slidePaused, ready]);
  useEffect(() => {
    // Sections change height when filtered, so scroll positions are re-measured.
    const timer = setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => clearTimeout(timer);
  }, [filter, group]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (panel && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
      lenis.current?.stop();
    }
    if (!panel) {
      dialog.current?.close();
      lenis.current?.start();
    }
  }, [panel]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const smooth = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1,
      anchors: true,
    });
    lenis.current = smooth;
    smooth.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement-word",
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement",
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>(".scent-card").forEach((card, i) =>
        gsap.fromTo(
          card,
          { y: [150, 260, 170, 240][i] },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".scent-grid",
              start: "top 95%",
              end: "center 48%",
              scrub: 0.8,
            },
          },
        ),
      );
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((el) =>
        gsap.from(el, {
          yPercent: 110,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        }),
      );
      gsap.set(".product-card, .ritual-card", { opacity: 0, y: 60 });
      ScrollTrigger.batch(".product-card, .ritual-card", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }),
        onLeave: (els) => gsap.set(els, { opacity: 1, y: 0 }),
      });
      gsap.utils.toArray<HTMLElement>(".journal-picture").forEach((pic) =>
        gsap.fromTo(
          pic,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: { trigger: pic, start: "top 88%", once: true },
          },
        ),
      );
      gsap.fromTo(
        ".closing-image",
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".closing",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const timer = setTimeout(refresh, 2500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ctx.revert();
      smooth.destroy();
      gsap.ticker.remove(tick);
      lenis.current = null;
    };
  }, [lang]);
  useEffect(() => {
    type Tool = {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute: (input: unknown) => unknown;
    };
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: Tool,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tools: Tool[] = [
      {
        name: "get_catalogue",
        description:
          "Read REVATHI HERBAL BEAUTY CARE product list and salon treatments. Does not place an order or book anything.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: () => ({
          brand: BRAND,
          products: products.map((p) => ({
            id: p.id,
            name: p.name.en,
            category: p.cat,
            size: p.size,
            priceInr: p.price,
          })),
          treatments: allServices.map((s) => ({
            id: s.id,
            name: s.name.en,
            minutes: s.mins,
            priceInr: s.price,
          })),
          orderingAvailable: true,
        }),
      },
      {
        name: "set_bag_quantity",
        description:
          "Set the device-local bag quantity of one product and open the bag. Does not place an order.",
        inputSchema: {
          type: "object",
          properties: {
            productId: { type: "string", enum: products.map((p) => p.id) },
            quantity: { type: "integer", minimum: 0, maximum: 10 },
          },
          required: ["productId", "quantity"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (input: unknown) => {
          const { productId: id, quantity: q } = (input ?? {}) as { productId?: unknown; quantity?: unknown };
          if (typeof id !== "string" || !products.some((p) => p.id === id))
            throw new Error("Unknown product id.");
          if (typeof q !== "number" || !Number.isInteger(q) || q < 0 || q > 10)
            throw new Error("Quantity must be an integer from 0 to 10.");
          update((c) => {
            const next = { ...c };
            if (q) next[id] = q;
            else delete next[id];
            return next;
          });
          setPanel("bag");
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          return { productId: id, quantity: q, scope: "this browser", orderPlaced: false };
        },
      },
    ];
    for (const tool of tools) {
      try {
        Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {}
    }
    return () => lifecycle.abort();
  }, []);
  function update(fn: (c: Record<string, number>) => Record<string, number>) {
    setCart((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem("velvet-bag", JSON.stringify(next));
      } catch {}
      return next;
    });
  }
  function setQty(id: string, value: number) {
    const q = Math.max(0, Math.min(10, value));
    update((c) => {
      const next = { ...c };
      if (q) next[id] = q;
      else delete next[id];
      return next;
    });
  }
  function addMany(ids: string[], message: string = t.added) {
    update((c) => {
      const next = { ...c };
      for (const id of ids) next[id] = Math.min(10, (next[id] || 0) + 1);
      return next;
    });
        setToast(message);
    setPanel("bag");
  }
    function goCheckout() {
    if (!lines.length) {
      window.location.href = "/products/";
      return;
    }
    try {
      const items = lines.map((l) => ({
        id: l.p.id,
        name: l.p.name.en,
        price: l.p.price,
        size: l.p.size,
        qty: l.qty,
      }));
      localStorage.setItem("velvet-handoff", JSON.stringify(items));
    } catch {}
    window.location.href = "/products/#/checkout";
  }
  function openProduct(id: string, shadeIndex = 0) {
    setProductId(id);
    setShade(shadeIndex);
    setPanel("product");
  }
  // Every "Book" button opens the appointment booking page of the site (it feeds the Tracking page).
  function openBooking(_serviceId = "") {
    window.location.href = SITE.booking;
  }
  function bookBundle(serviceId: string, productId: string) {
    update((c) => ({ ...c, [productId]: Math.min(10, (c[productId] || 0) + 1) }));
    setToast(t.added);
    openBooking(serviceId);
  }
  function go(id: string) {
    setPanel(null);
    setTimeout(() => {
      if (lenis.current) lenis.current.scrollTo(id, { offset: -90 });
      else
        document.querySelector(id)?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
    }, 30);
  }
  function download(name: string, text: string, type = "text/plain;charset=utf-8") {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }
  function saveBag() {
    const rows = lines
      .map((l) => `${l.p.name.en} (${l.p.size}) x ${l.qty} — ${rupees(l.p.price * l.qty)}`)
      .join("\n");
    download(
      "THE-VELVET-TOUCH-my-bag.txt",
      `${BRAND}\n\n${rows}\n\n${content.en.subtotal}: ${rupees(subtotal)}\n`,
    );
    setToast(t.saved);
  }
  const isTaken = (time: string) =>
    appointments.some((a) => a.date === booking.date && a.time === time) ||
    (booking.date === todayStr &&
      Number(time.slice(0, 2)) <= new Date().getHours());
  function submitBooking() { requireLogin(doSubmitBooking); }
  function doSubmitBooking() {
    const svc = allServices.find((x) => x.id === booking.service);
    if (!svc || !booking.date || !booking.time || booking.name.trim().length < 2)
      return setBookError(t.errFill);
    if (!/^\d{10}$/.test(booking.phone.replace(/[\s-]/g, "")))
      return setBookError(t.errPhone);
    if (isTaken(booking.time)) return setBookError(t.errSlot);
    const next = [...appointments, { date: booking.date, time: booking.time }];
    setAppointments(next);
    try {
      localStorage.setItem("velvet-appointments", JSON.stringify(next));
    } catch {}
    setBookError("");
    setBooked({ service: tr(svc.name, lang), date: booking.date, time: booking.time, mins: svc.mins });
    setBooking((b) => ({ ...b, time: "", notes: "" }));
  }
  function downloadIcs() {
    if (!booked) return;
    const [y, m, d] = booked.date.split("-").map(Number);
    const [hh, mm] = booked.time.split(":").map(Number);
    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (dt: Date) =>
      `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
    const start = new Date(y, m - 1, d, hh, mm);
    const end = new Date(y, m - 1, d, hh, mm + booked.mins);
    download(
      "THE-VELVET-TOUCH-appointment.ics",
      [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//REVATHI HERBAL BEAUTY CARE//Booking//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@thevelvettouch`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${booked.service} — ${BRAND}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n"),
      "text/calendar;charset=utf-8",
    );
  }
  function placeOrder() {
    const ok =
      ship.name.trim().length > 1 &&
      /^\d{10}$/.test(ship.phone.replace(/[\s-]/g, "")) &&
      ship.address.trim().length > 4 &&
      ship.city.trim().length > 1 &&
      /^\d{6}$/.test(ship.pin.trim());
    if (!ok || !lines.length) return setOrderError(t.errOrder);
    // Products are sold with online payment only (no cash on delivery).
    const payErr =
      pay.mode === "upi" ? (/^[\w.\-]{2,}@[a-z]{2,}$/i.test(pay.upi.trim()) ? "" : trx(PAYTX.errUpi, lang))
      : pay.mode === "card" ? (pay.num.replace(/\s/g, "").length !== 16 ? trx(PAYTX.err16, lang) : !/^(0[1-9]|1[0-2])\/\d{2}$/.test(pay.exp) ? trx(PAYTX.errExp, lang) : !/^\d{3}$/.test(pay.cvv) ? trx(PAYTX.errCvv, lang) : "")
      : pay.bank ? "" : trx(PAYTX.selectBank, lang);
    if (payErr) return setOrderError(payErr);
    const id = "VT-" + Math.floor(100000 + Math.random() * 900000);
    const summary = lines.map((l) => `${l.p.name[lang] ?? l.p.name.en} × ${l.qty}`);
    try {
      const prev = JSON.parse(localStorage.getItem("velvet-orders") || "[]");
      localStorage.setItem(
        "velvet-orders",
        JSON.stringify([...(Array.isArray(prev) ? prev : []), { id, total, lines: summary, at: Date.now() }]),
      );
    } catch {}
    try {
      addOrder(
        lines.map((l) => ({
          pid: l.p.id,
          name: l.p.name.en,
          img: "facial",
          qty: l.qty,
          price: l.p.price,
          size: l.p.size,
        })),
      );
    } catch {}
    setOrder({ id, total, lines: summary });
    update(() => ({}));
    setOrderError("");
    setPanel("order");
  }
  function downloadReceipt() {
    if (!order) return;
    download(
      `${order.id}-receipt.txt`,
      `${BRAND}\n${t.orderNo}: ${order.id}\n\n${order.lines.join("\n")}\n\n${t.total}: ${rupees(order.total)}\n${t.purchaseInfo}\n`,
    );
  }
  const pageItems = [
    { title: NL.Products, sub: SITE.products, keywords: "products shop store buy catalogue face body wellness skincare makeup lipstick serum cream", href: SITE.products },
    { title: NL.Services, sub: SITE.services, keywords: "services salon facial massage bridal makeup consultation treatments appointments", href: SITE.services },
    { title: NL.About, sub: SITE.about, keywords: "about us team story contact address phone timings location", href: SITE.about },
    { title: NL.Tracking, sub: SITE.tracking, keywords: "tracking track order status delivery appointment booking", href: SITE.tracking },
    { title: reviewsLabel, sub: SITE.reviews, keywords: "reviews testimonials feedback ratings customers", href: SITE.reviews },
  ].map((pg) => ({
    title: pg.title,
    sub: pg.sub,
    keywords: pg.keywords,
    action: () => {
      window.location.href = pg.href;
    },
    art: null as (typeof products)[number] | null,
    image: "",
  }));
  const allSearchItems = [
    ...products.map((p) => ({
      title: p.name[lang] ?? p.name.en,
      sub: `${p.sub[lang]} · ${rupees(p.price)}`,
      keywords: `${p.name.en} ${p.name.ta} ${p.name.hi} ${p.sub.en} ${p.cat} ${p.kind} ${p.copy.en}`,
      action: () => openProduct(p.id),
      art: p as (typeof products)[number] | null,
      image: "",
    })),
    ...allServices.map((sv) => ({
      title: sv.name[lang] ?? sv.name.en,
      sub: `${sv.mins} ${t.mins}${servicePricesOn() ? ` · ${rupees(sv.price)}` : ""}`,
      keywords: `${sv.name.en} ${sv.name.ta} ${sv.name.hi} ${sv.group} salon appointment treatment book ${sv.desc.en}`,
      action: () => openBooking(sv.id),
      art: null as (typeof products)[number] | null,
      image: img(photos.journalTwo, "75px").src,
    })),
    {
      title: t.notesTitle,
      sub: t.notesLabel,
      keywords: "ingredients peach pêche jasmine jasmin sandalwood santal composition",
      action: () => go("#notes"),
      art: null as (typeof products)[number] | null,
      image: img(photos.notePeach, "75px").src,
    },
    {
      title: t.worldTitle.replace("\n", " "),
      sub: t.story,
      keywords: "story histoire velvet touch boutique salon",
      action: () => go("#story"),
      art: null as (typeof products)[number] | null,
      image: img(photos.world, "75px").src,
    },
    ...pageItems,
  ];
  // every word typed must match somewhere (name, type, category, description) - "herbal serum" works too
  const searchWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  const baseHits = allSearchItems.filter((item) => {
    const hay = `${item.title} ${item.sub} ${item.keywords}`.toLowerCase();
    return searchWords.every((w) => hay.includes(w));
  });
  // live catalogue: products & services the admin uploaded later (and edited names/prices) are searched too
  const liveHits = query.trim()
    ? searchSite(query, 12)
        .filter((h) => !allSearchItems.some((i) => i.keywords.toLowerCase().includes(h.title.toLowerCase())))
        .map((h) => ({
          title: h.title,
          sub: h.price ? `${h.sub} · ${h.price}` : h.sub,
          keywords: h.title,
          action: () => {
            window.location.href = h.href;
          },
          art: null as (typeof products)[number] | null,
          image: h.image || img(h.type === "service" ? photos.journalTwo : photos.world, "75px").src,
        }))
    : [];
  const searchItems = [...baseHits, ...liveHits].slice(0, query ? 14 : 7);
  return (
    <div ref={root} className={`site ${ready ? "is-ready" : "is-loading"}`}>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id="velvet-mark-light" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.98  0 0 0 0 0.945  0 0 0 0 0.875  -1.8 -1.8 -1.8 0 3.6"
            />
          </filter>
          <filter id="velvet-mark-dark" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.259  0 0 0 0 0.173  0 0 0 0 0.125  -1.8 -1.8 -1.8 0 3.6"
            />
          </filter>
        </defs>
      </svg>
      <a className="skip-link" href="#main">
        {trx({ en: "Skip to content", ta: "உள்ளடக்கத்திற்குச் செல்", hi: "सामग्री पर जाएँ", ml: "ഉള്ളടക്കത്തിലേക്ക് പോകുക", te: "కంటెంట్‌కు వెళ్ళండి", kn: "ವಿಷಯಕ್ಕೆ ಹೋಗಿ", mr: "मजकुराकडे जा", bn: "মূল বিষয়ে যান", sa: "सामग्रीं प्रति गच्छतु" }, lang)}
      </a>
      <Cursor />
      {!introSeen && <div className="intro-curtain" aria-hidden="true">
        <div className="intro-inner">
          <Brand rise lang={lang} />
          <span className="intro-line" />
          <span className="rise-mask">
            <span className="rise intro-tag" style={{ "--d": "1.7s" } as React.CSSProperties}>
              {t.introTag}
            </span>
          </span>
          <span className="rise-mask">
            <span className="rise eyebrow" style={{ "--d": "2s" } as React.CSSProperties}>
              {st("introEyebrow", lang)}
            </span>
          </span>
        </div>
      </div>}
      <header className={`header ${sticky ? "is-scrolled" : ""}`}>
        <a
          className="header-brand"
          href="#top"
          aria-label={`${BRAND} — ${st("homeAria", lang)}`}
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
        >
          <Brand compact lang={lang} />
        </a>
        <button
          className="mobile-menu icon-button"
          aria-label={trx({ en: "Open menu", ta: "மெனுவைத் திற", hi: "मेनू खोलें", ml: "മെനു തുറക്കുക", te: "మెనూ తెరవండి", kn: "ಮೆನು ತೆರೆಯಿರಿ", mr: "मेनू उघडा", bn: "মেনু খুলুন", sa: "सूचीम् उद्घाटयतु" }, lang)}
          onClick={() => setPanel("menu")}
        >
          <Menu size={22} />
        </button>
        <div className="nav-rightwrap">
        <nav className="nav-left" aria-label={NL.SitePages}>
          <SitePillNav label={NL.SitePages} items={[{ key: "Products", label: NL.Products, href: SITE.products }, { key: "Services", label: NL.Services, href: SITE.services }]} />
        </nav>
        <nav className="nav-right" aria-label={NL.SitePages}>
          <SitePillNav label={NL.SitePages} items={[{ key: "About", label: NL.About, href: SITE.about }, { key: "Tracking", label: NL.Tracking, href: SITE.tracking }, { key: "Reviews", label: reviewsLabel, href: SITE.reviews }]} />
        </nav>
        <div className="nav-tools">
          <button
            className="icon-button"
            onClick={() => setPanel("search")}
            aria-label={trx({ en: "Search", ta: "தேடு", hi: "खोजें", ml: "തിരയുക", te: "వెతకండి", kn: "ಹುಡುಕಿ", mr: "शोधा", bn: "খুঁজুন", sa: "अन्विष्यताम्" }, lang)}
          >
            <Search size={21} />
          </button>
          <button
            className="bag-button"
                                    onClick={() => setPanel("bag")}
            aria-label={`${t.bagTitle} (${bag})`}
          >
            <ShoppingBag size={21} />
            <span>({bag})</span>
          </button>
          <div className="nav-end">
          <label className="lang-select lang-ico" title={t.language}>
            <span className="sr-only">{t.language}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" /></svg>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              aria-label={t.language}
            >
              {NAV_LANG_CODES.map((code) => (
                <option key={code} value={code} style={{ color: "#8F6E36", background: "#FFFFFF" }}>{NAV_LANG_NAMES[code]}</option>
              ))}
            </select>
          </label>
          {loggedUser ? (
            <ProfileMenu user={loggedUser} ui={lang as never} className="nav-admin nav-profile" nameClassName="nav-profile-name" />
          ) : (
            <button type="button" className="nav-admin nav-profile" onClick={() => openLogin()} aria-label={authT("Login", lang as never)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
              <span className="nav-profile-name">{authT("Login", lang as never)}</span>
            </button>
          )}
          </div>
        </div>
        </div>
      </header>
      <main id="main">
        <section id="top" className="hb" aria-roledescription="carousel" aria-label="REVATHI HERBAL BEAUTY CARE">
          <form
            className="hb-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setPanel("search");
            }}
          >
            <span className="hb-rope hb-rope-l" aria-hidden="true" />
            <span className="hb-rope hb-rope-r" aria-hidden="true" />
            <div className="hb-search-bar">
              <Search size={20} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={trx({ en: "Search products & services — serums, facials, bridal makeup…", ta: "பொருட்கள் & சேவைகள் தேடுங்கள் — சீரம், ஃபேஷியல், மணப்பெண் மேக்கப்…", hi: "उत्पाद और सेवाएँ खोजें — सीरम, फेशियल, ब्राइडल मेकअप…" }, lang)}
                aria-label={t.searchPlaceholder}
              />
              <button type="submit">
                {trx({ en: "Search", ta: "தேடு", hi: "खोजें", ml: "തിരയുക", te: "వెతకండి", kn: "ಹುಡುಕಿ", mr: "शोधा", bn: "খুঁজুন", sa: "अन्विष्यताम्" }, lang)}
              </button>
            </div>
            {query.trim() && (
              <ul className="hb-suggest">
                {searchItems.slice(0, 6).map((item) => (
                  <li key={`${item.title}-${item.sub}`}>
                    <button type="button" onClick={item.action}>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.sub}</small>
                      </span>
                    </button>
                  </li>
                ))}
                {!searchItems.length && <li className="hb-suggest-empty">{t.searchEmpty}</li>}
              </ul>
            )}
          </form>
          <div
            className="hb-stage"
            onPointerEnter={() => setSlidePaused(true)}
            onPointerLeave={() => setSlidePaused(false)}
          >
            {slides.map((sl, i) => {
              const active = slide === i;
              const runAction = () => {
                if (sl.action === "book") return openBooking();
                setFilter(sl.action === "shop-makeup" ? "makeup" : "all");
                go("#shop");
              };
              return (
                <div
                  key={sl.id}
                  data-id={sl.id}
                  className={`hb-slide ${active ? "is-active" : ""}`}
                  style={{ "--hb-tone": sl.tone } as React.CSSProperties}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${slides.length}`}
                  aria-hidden={!active}
                >
                  <button
                    type="button"
                    className="hb-banner"
                    style={{ "--hb-img": `url(${sl.image})` } as React.CSSProperties}
                    tabIndex={active ? 0 : -1}
                    aria-label={tr(sl.cta, lang)}
                    onClick={runAction}
                  >
                    <img
                      src={sl.image}
                      alt={tr(sl.alt, lang)}
                      width={sl.width}
                      height={sl.height}
                      {...(i === 0 ? { fetchpriority: "high" } : { loading: "lazy" as const })}
                    />
                    {tr(sl.copy, lang) && (
                      <span className="hb-info">
                        <span className="hb-info-text">{tr(sl.copy, lang)}</span>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="hb-ticker" aria-hidden="true">
            <div className="hb-ticker-track">
              {[0, 1].map((k) => (
                <div className="hb-ticker-row" key={k}>
                  {[...heroTicker.map((x) => tr(x, lang)), BRAND].map((x) => (
                    <span key={x + k}>{x}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {slides.length > 1 && <div className="hb-controls">
            <button
              className="hb-arrow"
              aria-label={t.slidePrev}
              onClick={() => setSlide((n) => (n + slides.length - 1) % slides.length)}
            >
              <ArrowLeft size={16} />
            </button>
            <div className="hb-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`${t.slideGo} ${i + 1}`}
                  aria-current={slide === i}
                  className={slide === i ? "is-active" : ""}
                  onClick={() => setSlide(i)}
                >
                  <span className={slidePaused ? "is-paused" : ""} />
                </button>
              ))}
            </div>
            <button
              className="hb-arrow"
              aria-label={t.slideNext}
              onClick={() => setSlide((n) => (n + 1) % slides.length)}
            >
              <ArrowRight size={16} />
            </button>
          </div>}
        </section>
        <section id="notes" className="notes-section collection-band">
          <div className="collection-hero">
            <div className="collection-video fav-anim" role="img" aria-label="Woman enjoying a herbal oil with fresh lavender">
              <img
                src="/assets/herbal/our-favourites.webp"
                alt=""
                className="fav-anim-img"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <span className="fav-anim-glow" aria-hidden="true" />
              <span className="fav-anim-dust" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <i key={i} style={{ left: `${8 + i * 10}%`, animationDelay: `${(i * 1.3) % 7}s`, animationDuration: `${9 + (i % 4) * 2}s` }} />
                ))}
              </span>
              <style>{`
                .fav-anim{position:relative;overflow:hidden;background:#2b3a22;isolation:isolate}
                .fav-anim-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:56% 30%;display:block;transform-origin:62% 38%;will-change:transform;animation:favZoom 22s ease-in-out infinite alternate}
                .fav-anim-glow{position:absolute;inset:-20%;pointer-events:none;z-index:1;mix-blend-mode:soft-light;background:linear-gradient(115deg,transparent 35%,rgba(244,232,207,.55) 50%,transparent 65%);transform:translateX(-60%);animation:favSweep 9s ease-in-out infinite}
                .fav-anim-dust{position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden}
                .fav-anim-dust i{position:absolute;bottom:-12px;width:6px;height:6px;border-radius:50%;background:radial-gradient(circle,rgba(244,232,207,.95),rgba(244,232,207,0) 70%);opacity:0;animation:favFloat 11s linear infinite}
                @keyframes favZoom{0%{transform:scale(1.04) translate3d(0,0,0)}50%{transform:scale(1.12) translate3d(-1.2%,-1%,0)}100%{transform:scale(1.18) translate3d(-2%,-1.8%,0)}}
                @keyframes favSweep{0%,15%{transform:translateX(-60%)}60%,100%{transform:translateX(60%)}}
                @keyframes favFloat{0%{transform:translate3d(0,0,0) scale(.6);opacity:0}15%{opacity:.9}100%{transform:translate3d(18px,-480px,0) scale(1.2);opacity:0}}
                @media (prefers-reduced-motion:reduce){.fav-anim-img,.fav-anim-glow,.fav-anim-dust i{animation:none!important}.fav-anim-dust{display:none}}
              `}</style>
            </div>
            <div className="collection-hero-shade" />
            <div className="collection-hero-copy">
              <span className="eyebrow">{t.label}</span>
              <h2 className="statement">
                {t.statement.split(" ").map((word, i) => (
                  <span className="statement-word" key={i}>
                    {word}{" "}
                  </span>
                ))}
              </h2>
              <p>{t.storySmall}</p>
            </div>
          </div>
          <div className="collection-products">
            {[
              { id: "eclat", name: products.find((p) => p.id === "eclat")?.name[lang] ?? "Éclat Glow Serum", sub: trx({ en: "Our best-seller for glowing skin", ta: "பளபளப்பான சருமத்திற்கான எங்கள் அதிகம் விற்பனையாகும் பொருள்", hi: "दमकती त्वचा के लिए हमारा बेस्ट-सेलर", ml: "തിളങ്ങുന്ന ചർമ്മത്തിനുള്ള ഞങ്ങളുടെ ബെസ്റ്റ് സെല്ലർ", te: "మెరిసే చర్మం కోసం మా బెస్ట్ సెల్లర్", kn: "ಹೊಳೆಯುವ ಚರ್ಮಕ್ಕಾಗಿ ನಮ್ಮ ಬೆಸ್ಟ್ ಸೆಲ್ಲರ್", mr: "तेजस्वी त्वचेसाठी आमचे बेस्ट-सेलर", bn: "উজ্জ্বল ত্বকের জন্য আমাদের সেরা বিক্রিত পণ্য", sa: "प्रभास्वराय त्वचे अस्माकं श्रेष्ठ-विक्रेता" }, lang) },
              { id: "lipstick-red", name: products.find((p) => p.id === "lipstick-red")?.name[lang] ?? "Red Lipstick", sub: trx({ en: "4 pretty red shades", ta: "4 அழகான சிவப்பு ஷேடுகள்", hi: "4 खूबसूरत लाल शेड्स", ml: "4 മനോഹരമായ ചുവപ്പ് ഷേഡുകൾ", te: "4 అందమైన ఎరుపు షేడ్‌లు", kn: "4 ಸುಂದರ ಕೆಂಪು ಶೇಡ್‌ಗಳು", mr: "4 सुंदर लाल शेड्स", bn: "4টি সুন্দর লাল শেড", sa: "४ सुन्दराः रक्त-वर्णाः" }, lang) },
              { id: "compact-powder", name: products.find((p) => p.id === "compact-powder")?.name[lang] ?? "Compact Powder", sub: trx({ en: "Silky pressed finish, 4 flavours", ta: "மென்மையான பிரஸ்டு பூச்சு, 4 சுவைகள்", hi: "रेशमी प्रेस्ड फ़िनिश, 4 फ्लेवर", ml: "സിൽക്കി പ്രസ്ഡ് ഫിനിഷ്, 4 ഫ്ലേവറുകൾ", te: "సిల్కీ ప్రెస్డ్ ఫినిష్, 4 ఫ్లేవర్లు", kn: "ರೇಷ್ಮೆಯಂತಹ ಪ್ರೆಸ್ಡ್ ಫಿನಿಶ್, 4 ಫ್ಲೇವರ್‌ಗಳು", mr: "रेशमी प्रेस्ड फिनिश, 4 फ्लेवर", bn: "মসৃণ প্রেসড ফিনিশ, 4টি ফ্লেভার", sa: "रेश्मी-निपीडित-समाप्तिः, ४ रसाः" }, lang) },
              { id: "cleanser", name: products.find((p) => p.id === "cleanser")?.name[lang] ?? "Foaming Cleanser", sub: trx({ en: "Gentle botanical foam, 4 flavours", ta: "மென்மையான மூலிகை நுரை, 4 சுவைகள்", hi: "कोमल हर्बल फोम, 4 फ्लेवर", ml: "മൃദുവായ ഹെർബൽ നുര, 4 ഫ്ലേവറുകൾ", te: "మృదువైన హెర్బల్ నురగ, 4 ఫ్లేవర్లు", kn: "ಮೃದುವಾದ ಸಸ್ಯಜನ್ಯ ನೊರೆ, 4 ಫ್ಲೇವರ್‌ಗಳು", mr: "सौम्य वनस्पतीजन्य फेस, 4 फ्लेवर", bn: "কোমল ভেষজ ফেনা, 4টি ফ্লেভার", sa: "मृदु-औषधीय-फेनः, ४ रसाः" }, lang) },
            ].map((item) => (
              <button
                key={item.id}
                className="collection-card"
                data-cursor={t.open}
                onClick={() => openProduct(item.id)}
              >
                <div className="collection-card-media">
                  <ProductPhoto id={item.id} alt={item.name} />
                </div>
                <div className="collection-card-copy">
                  <h3>{item.name}</h3>
                  <span>{item.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <HerbalShowcase onOpen={openProduct} onAdd={(id) => addMany([id])} lang={lang} />
        <VideoBand onBook={() => openBooking()} lang={lang} />
        <section className="shop" id="shop">
          <div className="shop-heading">
            <div>
              <span className="eyebrow">{t.shopLabel}</span>
              <h2>
                <Lines text={t.shopTitle} />
              </h2>
            </div>
            <div className="shop-side">
              <p>{t.shopCopy}</p>
              <span className="shop-ship">{t.shipping}</span>
            </div>
          </div>
          <div className="shop-filters" role="tablist" aria-label={t.shopLabel}>
            {categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={filter === c.key}
                className={filter === c.key ? "is-active" : ""}
                onClick={() => setFilter(c.key)}
              >
                {c.label[lang] ?? c.label.en}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {shopPicks(filter).map((p) => (
                <article className="product-card" key={p.id}>
                  <button
                    className="product-picture"
                    data-cursor={t.view}
                    aria-label={`${t.viewDetails}: ${p.name[lang] ?? p.name.en}`}
                    onClick={() => openProduct(p.id)}
                  >
                    <span className="product-badge">{catLabel(p.cat)}</span>
                    <ProductPhoto id={p.id} className="product-art" />
                  </button>
                  <div className="product-card-info">
                    <div>
                      <h3>{p.name[lang] ?? p.name.en}</h3>
                      <span>
                        {p.sub[lang]} · {p.size}
                      </span>
                    </div>
                    <strong>{rupees(p.price)}</strong>
                  </div>
                  <button className="product-add" onClick={() => addMany([p.id])}>
                    {t.addShort}
                    <Plus size={16} />
                  </button>
                </article>
              ))}
          </div>
          <div className="shop-more">
            <a className="hb-btn" href={SITE.products}>
              {st("viewAllProducts", lang)}
            </a>
          </div>
        </section>
        <section className="testimonials" id="salon">
          <Testimonials lang={lang} />
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Brand lang={lang} />
            <p>{t.footerLine}</p>
          </div>
          <nav aria-label={NL.Footer}>
            <a href={SITE.products}>{NL.Products}</a>
            <a href={SITE.services}>{NL.Services}</a>
            <a href={SITE.about}>{NL.About}</a>
            <a href={SITE.tracking}>{NL.Tracking}</a>
<a href={SITE.reviews}>{reviewsLabel}</a>
            <a href={SITE.admin}>{NL.Admin}</a>
          </nav>
          <div className="footer-service">
            <button
              onClick={() => {
                setArticle(0);
                setPanel("care");
              }}
            >
              {t.care}
            </button>
            <button
              onClick={() => {
                setArticle(1);
                setPanel("care");
              }}
            >
              {t.privacy}
            </button>
            <button onClick={() => go("#top")}>{t.back}</button>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
  <span>revathi</span>
  <span>herbal beauty products</span>
</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {BRAND}</span>
          <span>{trx({ en: "THE ESSENCE OF BEAUTIFUL MOMENTS", ta: "அழகான தருணங்களின் சாரம்", hi: "सुंदर पलों का सार", ml: "സുന്ദര നിമിഷങ്ങളുടെ സാരം", te: "అందమైన క్షణాల సారం", kn: "ಸುಂದರ ಕ್ಷಣಗಳ ಸಾರ", mr: "सुंदर क्षणांचे सार", bn: "সুন্দর মুহূর্তের সারমর্ম", sa: "सुन्दर-क्षणानां सारम्" }, lang)}</span>
          <span>{trx({ en: "SHOP · SALON · SPA", ta: "ஷாப் · சலூன் · ஸ்பா", hi: "शॉप · सैलून · स्पा", ml: "ഷോപ്പ് · സലൂൺ · സ്പാ", te: "షాప్ · సెలూన్ · స్పా", kn: "ಶಾಪ್ · ಸೆಲೂನ್ · ಸ್ಪಾ", mr: "शॉप · सलून · स्पा", bn: "শপ · সেলুন · স্পা", sa: "विपणिः · शालून · स्पा" }, lang)}</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className={`modal ${
          panel === "bag" || panel === "menu" || panel === "checkout" || panel === "order"
            ? "side-modal"
            : panel === "booking"
              ? "modal-wide"
              : ""
        }`}
        onClose={() => setPanel(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPanel(null);
        }}
        aria-label={
          panel === "bag"
            ? t.bagTitle
            : panel === "search"
              ? t.searchTitle
              : panel === "product"
                ? product.name[lang] ?? product.name.en
                : panel === "booking"
                  ? t.bookingTitle
                  : BRAND
        }
      >
        <div className="modal-inner" data-lenis-prevent>
          <button
            className="modal-close icon-button"
            onClick={() => setPanel(null)}
            aria-label={trx({ en: "Close", ta: "மூடு", hi: "बंद करें", ml: "അടയ്ക്കുക", te: "మూసివేయండి", kn: "ಮುಚ್ಚಿ", mr: "बंद करा", bn: "বন্ধ করুন", sa: "पिधत्ताम्" }, lang)}
          >
            <X size={24} />
          </button>
          {panel === "search" && (
            <div className="search-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{t.searchTitle}</h2>
              <div className="search-input">
                <Search size={24} />
                <input
                  autoFocus
                  aria-label={t.searchPlaceholder}
                  placeholder={t.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchItems[0]) {
                      e.preventDefault();
                      searchItems[0].action();
                    }
                  }}
                />
              </div>
              <div className="search-results">
                {searchItems.length ? (
                  searchItems.map((item) => (
                    <button key={`${item.title}-${item.sub}`} onClick={item.action}>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.sub}</small>
                      </span>
                      <Plus size={20} />
                    </button>
                  ))
                ) : (
                  <p>{t.searchEmpty}</p>
                )}
              </div>
            </div>
          )}
          {panel === "product" && (
            <div className="product-modal">
              <div
                className="product-modal-picture"
                style={{ background: picBg ?? "#FFFFFF" }}
                onLoadCapture={(e) => {
                  const im = e.target as HTMLImageElement;
                  if (!(im instanceof HTMLImageElement)) return;
                  try {
                    const n = 32, c = document.createElement("canvas");
                    c.width = c.height = n;
                    const g = c.getContext("2d", { willReadFrequently: true });
                    if (!g) return;
                    g.drawImage(im, 0, 0, n, n);
                    const d = g.getImageData(0, 0, n, n).data;
                    let r = 0, gg = 0, b = 0, k = 0;
                    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
                      if (i > 1 && i < n - 2 && j > 1 && j < n - 2) continue;
                      const o = (i * n + j) * 4;
                      r += d[o]; gg += d[o + 1]; b += d[o + 2]; k++;
                    }
                    setPicBg(`rgb(${Math.round(r / k)},${Math.round(gg / k)},${Math.round(b / k)})`);
                  } catch {
                    /* keep the neutral background */
                  }
                }}
                data-cursor="Zoom"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
                  e.currentTarget.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
                }}
                onClick={(e) => e.currentTarget.classList.toggle("is-zoomed")}
                onPointerLeave={(e) => e.currentTarget.classList.remove("is-zoomed")}
              >
                <span className="product-modal-word">{tr(product.name, lang).split(" ")[0]}</span>
                <ProductPhoto id={product.id} shade={shade} className="product-modal-art" alt={product.name[lang] ?? product.name.en} />
              </div>
              <div className="product-modal-copy">
                <span className="eyebrow">{catLabel(product.cat)}</span>
                <h2>{SHADES[product.id]?.[shade]?.title?.[lang] ?? product.name[lang] ?? product.name.en}</h2>
                <p className="product-scent">{SHADES[product.id]?.[shade]?.sub?.[lang] ?? product.sub[lang]}</p>
                <p>{SHADES[product.id]?.[shade]?.copy?.[lang] ?? product.copy[lang]}</p>
                <p className="product-price">{rupees(product.price)}</p>
                {(SHADES[product.id]?.length ?? 0) > 1 && (
                  <div className="modal-moods modal-moods-inline" role="radiogroup" aria-label={trx(PAYTX.colour, lang)} onClick={(e) => e.stopPropagation()}>
                    {SHADES[product.id].map((sh, i) => (
                      <button
                        key={sh.key}
                        role="radio"
                        aria-checked={shade === i}
                        aria-label={sh.name}
                        title={sh.name}
                        className={shade === i ? "is-active" : ""}
                        style={{ background: sh.hex }}
                        onClick={() => setShade(i)}
                      />
                    ))}
                  </div>
                )}
                {SHADES[product.id]?.[0]?.code && (
                  <div className="shade-codes" style={{ display: "flex", gap: 14, margin: "-4px 0 14px", fontSize: 12, letterSpacing: ".04em" }}>
                    {SHADES[product.id].map((sh, i) => (
                      <button key={sh.key} type="button" onClick={() => setShade(i)} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit", fontWeight: shade === i ? 700 : 400, opacity: shade === i ? 1 : 0.6 }}>{sh.code}</button>
                    ))}
                  </div>
                )}
                <div className="size-option">
                  <Check size={16} />
                  <span>{product.size}</span>
                </div>
                <button className="pill solid" onClick={() => addMany([product.id])}>
                  {t.add}
                  <ShoppingBag size={18} />
                </button>
                <p className="ordering-note">{t.shipping}. {t.purchaseInfo}</p>
                <div className="product-notes">
                  {(product.id === "eclat"
                    ? [t.peach, t.jasmine, t.wood]
                    : [product.size, catLabel(product.cat), BRAND]
                  ).map((n, i) => (
                    <span key={n}>
                      0{i + 1} — {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {panel === "bag" && (
            <div className="bag-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>
                {t.bagTitle} <sup>({bag})</sup>
              </h2>
              {bag ? (
                <>
                  {lines.map(({ p, qty }) => (
                    <div className="bag-item" key={p.id}>
                      <div className="bag-image">
                        <ProductPhoto id={p.id} className="bag-art" />
                      </div>
                      <div>
                        <h3>{p.name[lang] ?? p.name.en}</h3>
                        <p>
                          {p.size} · {rupees(p.price)}
                        </p>
                        <div className="quantity">
                          <button
                            aria-label={trx({ en: "Decrease quantity", ta: "அளவைக் குறை", hi: "मात्रा घटाएँ", ml: "അളവ് കുറയ്ക്കുക", te: "పరిమాణం తగ్గించు", kn: "ಪ್ರಮಾಣ ಕಡಿಮೆ ಮಾಡಿ", mr: "प्रमाण कमी करा", bn: "পরিমাণ কমান", sa: "परिमाणं न्यूनीकुरु" }, lang)}
                            onClick={() => setQty(p.id, qty - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <output>{qty}</output>
                          <button
                            disabled={qty >= 10}
                            aria-label={trx({ en: "Increase quantity", ta: "அளவை அதிகரி", hi: "मात्रा बढ़ाएँ", ml: "അളവ് കൂട്ടുക", te: "పరిమాణం పెంచు", kn: "ಪ್ರಮಾಣ ಹೆಚ್ಚಿಸಿ", mr: "प्रमाण वाढवा", bn: "পরিমাণ বাড়ান", sa: "परिमाणं वर्धयतु" }, lang)}
                            onClick={() => setQty(p.id, qty + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button className="remove" onClick={() => setQty(p.id, 0)}>
                          {t.remove}
                        </button>
                      </div>
                    </div>
                  ))}
                  <dl className="bag-totals">
                    <div>
                      <dt>{t.subtotal}</dt>
                      <dd>{rupees(subtotal)}</dd>
                    </div>
                    <div>
                      <dt>{t.delivery}</dt>
                      <dd>{shipping ? rupees(shipping) : t.free}</dd>
                    </div>
                    <div className="bag-total">
                      <dt>{t.total}</dt>
                      <dd>{rupees(total)}</dd>
                    </div>
                  </dl>
                  <p className="bag-information">{t.purchaseInfo}</p>
                  <button
                    className="pill solid"
                                       onClick={goCheckout}
                  >
                    {t.checkout}
                    <ShoppingBag size={18} />
                  </button>
                  <button className="text-link bag-save" onClick={saveBag}>
                    {t.save}
                    <Check size={16} />
                  </button>
                </>
              ) : (
                <div className="empty-bag">
                  <ShoppingBag size={32} />
                  <h3>{t.bagEmpty}</h3>
                  <p>{t.bagEmptyCopy}</p>
                  <button className="pill dark" onClick={() => go("#shop")}>
                    {t.explore}
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
          {panel === "checkout" && (
            <div className="bag-panel checkout-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{t.checkoutTitle}</h2>
              <div className="form-stack">
                <label className="field">
                  <span>{t.fullName}</span>
                  <input autoComplete="name" value={ship.name} onChange={(e) => setShip({ ...ship, name: e.target.value })} />
                </label>
                <label className="field">
                  <span>{t.phone}</span>
                  <input autoComplete="tel" inputMode="tel" value={ship.phone} onChange={(e) => setShip({ ...ship, phone: e.target.value })} />
                </label>
                <label className="field">
                  <span>{t.address}</span>
                  <input autoComplete="street-address" value={ship.address} onChange={(e) => setShip({ ...ship, address: e.target.value })} />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>{t.city}</span>
                    <input autoComplete="address-level2" value={ship.city} onChange={(e) => setShip({ ...ship, city: e.target.value })} />
                  </label>
                  <label className="field">
                    <span>{t.pincode}</span>
                    <input autoComplete="postal-code" inputMode="numeric" maxLength={6} value={ship.pin} onChange={(e) => setShip({ ...ship, pin: e.target.value })} />
                  </label>
                </div>
              </div>
              <div className="form-stack pay-block">
                <label className="field">
                  <span>{trx(PAYTX.method, lang)}</span>
                  <select value={pay.mode} onChange={(e) => setPay({ ...pay, mode: e.target.value })}>
                    <option value="upi">UPI</option>
                    <option value="card">{trx(PAYTX.card, lang)}</option>
                    <option value="netbanking">{trx(PAYTX.netbanking, lang)}</option>
                  </select>
                </label>
                {pay.mode === "upi" && (
                  <label className="field"><span>{trx(PAYTX.upiId, lang)}</span><input placeholder="yourname@okbank" value={pay.upi} onChange={(e) => setPay({ ...pay, upi: e.target.value })} /></label>
                )}
                {pay.mode === "card" && (
                  <>
                    <label className="field"><span>{trx(PAYTX.cardNumber, lang)}</span><input inputMode="numeric" maxLength={19} value={pay.num} onChange={(e) => setPay({ ...pay, num: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() })} /></label>
                    <div className="field-row">
                      <label className="field"><span>MM/YY</span><input maxLength={5} value={pay.exp} onChange={(e) => setPay({ ...pay, exp: e.target.value.replace(/^(\d{2})(\d)/, "$1/$2") })} /></label>
                      <label className="field"><span>CVV</span><input type="password" inputMode="numeric" maxLength={3} value={pay.cvv} onChange={(e) => setPay({ ...pay, cvv: e.target.value.replace(/\D/g, "") })} /></label>
                    </div>
                  </>
                )}
                {pay.mode === "netbanking" && (
                  <label className="field"><span>{trx(PAYTX.bank, lang)}</span>
                    <select value={pay.bank} onChange={(e) => setPay({ ...pay, bank: e.target.value })}>
                      <option value="">{trx(PAYTX.selectBank, lang)}</option>
                      {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank"].map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </label>
                )}
              </div>
              <dl className="bag-totals">
                <div>
                  <dt>{t.subtotal}</dt>
                  <dd>{rupees(subtotal)}</dd>
                </div>
                <div>
                  <dt>{t.delivery}</dt>
                  <dd>{shipping ? rupees(shipping) : t.free}</dd>
                </div>
                <div className="bag-total">
                  <dt>{t.total}</dt>
                  <dd>{rupees(total)}</dd>
                </div>
              </dl>
              <p className="bag-information">{t.purchaseInfo}</p>
              {orderError && (
                <p className="form-error" role="alert">
                  {orderError}
                </p>
              )}
              <button className="pill solid" onClick={placeOrder}>
                {t.placeOrder}
                <Check size={18} />
              </button>
              <button className="text-link bag-save" onClick={() => setPanel("bag")}>
                <ArrowLeft size={16} />
                {t.backToBag}
              </button>
            </div>
          )}
          {panel === "order" && order && (
            <div className="bag-panel order-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{t.orderTitle}</h2>
              <p className="order-copy">{t.orderCopy}</p>
              <dl className="booking-summary">
                <div>
                  <dt>{t.orderNo}</dt>
                  <dd>{order.id}</dd>
                </div>
                <div>
                  <dt>{t.bagTitle}</dt>
                  <dd>{order.lines.join(", ")}</dd>
                </div>
                <div>
                  <dt>{t.total}</dt>
                  <dd>{rupees(order.total)}</dd>
                </div>
              </dl>
              <button className="pill solid" onClick={downloadReceipt}>
                {t.downloadReceipt}
                <Check size={18} />
              </button>
              <button className="text-link bag-save" onClick={() => go("#shop")}>
                {t.continueShopping}
                <Plus size={16} />
              </button>
            </div>
          )}
          {panel === "booking" && (
            <div className="booking-panel">
              {booked ? (
                <div className="booking-done">
                  <span className="eyebrow">{BRAND}</span>
                  <h2>{t.bookedTitle}</h2>
                  <p>{t.bookedCopy}</p>
                  <dl className="booking-summary">
                    <div>
                      <dt>{t.service}</dt>
                      <dd>{booked.service}</dd>
                    </div>
                    <div>
                      <dt>{t.date}</dt>
                      <dd>
                        {new Date(booked.date + "T00:00").toLocaleDateString(trx({ en: "en-IN", ta: "ta-IN", hi: "hi-IN", ml: "ml-IN", te: "te-IN", kn: "kn-IN", mr: "mr-IN", bn: "bn-IN", sa: "sa-IN" }, lang), {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt>{t.time}</dt>
                      <dd>{booked.time}</dd>
                    </div>
                  </dl>
                  <div className="booking-actions">
                    <button className="pill solid" onClick={downloadIcs}>
                      {t.addToCalendar}
                      <Check size={18} />
                    </button>
                    <button className="text-link" onClick={() => setBooked(null)}>
                      {t.bookAnother}
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="booking-grid">
                  <div className="booking-intro">
                    <span className="eyebrow">{BRAND}</span>
                    <h2>{t.bookingTitle}</h2>
                    <p>{t.bookingCopy}</p>
                    <ul className="salon-perks">
                      {t.perks.map((perk) => (
                        <li key={perk}>
                          <Check size={15} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <span className="salon-hours">{t.salonHours}</span>
                  </div>
                  <div className="booking-form">
                    <label className="field">
                      <span>{t.service}</span>
                      <select
                        value={booking.service}
                        onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                      >
                        <option value="">—</option>
                        {serviceGroups.map((g) => (
                          <optgroup key={g.key} label={g.label[lang] ?? g.label.en}>
                            {g.items.map((sv) => (
                              <option key={sv.id} value={sv.id}>
                                {sv.name[lang] ?? sv.name.en}{servicePricesOn() ? ` · ${rupees(sv.price)}` : ""} · {sv.mins} {t.mins}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span>{t.date}</span>
                      <input
                        type="date"
                        min={todayStr}
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value, time: "" })}
                      />
                    </label>
                    <div className="field">
                      <span>{t.time}</span>
                      <div className="slot-grid" role="radiogroup" aria-label={t.time}>
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={booking.time === slot}
                            disabled={!booking.date || isTaken(slot)}
                            className={`${booking.time === slot ? "is-active" : ""} ${booking.date && isTaken(slot) ? "is-taken" : ""}`}
                            onClick={() => requireLogin(() => setBooking((b) => ({ ...b, time: slot })))}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="field-row">
                      <label className="field">
                        <span>{t.fullName}</span>
                        <input autoComplete="name" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} />
                      </label>
                      <label className="field">
                        <span>{t.phone}</span>
                        <input autoComplete="tel" inputMode="tel" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} />
                      </label>
                    </div>
                    <label className="field">
                      <span>{t.notes}</span>
                      <input value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} />
                    </label>
                    <p className="bag-information">{trx(PAYTX.offline, lang)}</p>
                    {bookError && (
                      <p className="form-error" role="alert">
                        {bookError}
                      </p>
                    )}
                    <button className="pill solid" onClick={submitBooking}>
                      {t.confirmBooking}
                      <Check size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {panel === "menu" && (
            <div className="mobile-panel">
              <Brand lang={lang} />
              <nav>
                <a href={SITE.products}>{NL.Products}</a>
                <a href={SITE.services}>{NL.Services}</a>
                <a href={SITE.about}>{NL.About}</a>
                <a href={SITE.tracking}>{NL.Tracking}</a>
<a href={SITE.reviews}>{reviewsLabel}</a>
                <a href={SITE.admin}>{NL.AdminPanel}</a>
              </nav>
              <button className="text-link" onClick={() => setPanel("search")}>
                <Search size={17} />
                {t.searchTitle}
              </button>
              <div className="lang-switcher" style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className="eyebrow" style={{ width: "100%" }}>{t.language}</span>
                {(["en", "ta", "hi", "ml", "te", "kn", "mr", "bn", "sa"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={lang === code ? "pill dark" : "pill ghost"}
                    style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                  >
                    {NAV_LANG_NAMES[code]}
                  </button>
                ))}
              </div>
            </div>
          )}
          {panel === "journal" && (
            <article className="article-panel">
              <img
                src={article === 0 ? "/assets/hero/products.webp" : "/assets/hero/spa.webp"}
                alt={article === 0 ? t.articleOne : t.articleTwo}
                width="1024"
                height="559"
              />
              <span className="eyebrow">{t.journalLabel}</span>
              <h2>{article === 0 ? t.articleOne : t.articleTwo}</h2>
              {(trx({
                en: article === 0
                  ? ["Healthy skin starts with a simple routine: cleanse gently, moisturise daily and protect your skin from the sun.", "Herbal ingredients such as neem, aloe vera, turmeric and sandalwood have been used for generations to soothe and nourish the skin. Choose products that suit your skin type, and patch-test anything new.", "Consistency matters more than quantity."]
                  : ["A herbal spa visit is a calm break in your day. We begin with a consultation so our therapist can understand your skin and hair needs.", "Treatments use herbal oils, packs and products from our own range, planned in an order that never feels rushed.", "Arrive relaxed. Leave refreshed."],
                ta: article === 0
                  ? ["சூரியன் மறையும் முன் உலகம் மென்மையாகும் ஒரு தருணம் உண்டு. தோல் சூடாகத் தெரியும். நிறம் செறிவாகத் தெரியும்.", "REVATHI HERBAL BEAUTY CARE-இல் நாங்கள் தேடும் பிரகாசம் இதுதான்: எக்லாட் சீரம் துளி, கன்ன எலும்புகளில் தங்க ஹைலைட்டர், வெல்வெட் உதடு. எளிய படிகள், மெதுவாக.", "சில நாட்கள் கடந்து செல்லும். மற்றவை பிரகாசிக்கும்."]
                  : ["சலூன் நாள் ஒரு இடைவேளை. நாள் அமைதியாக இருக்கும்போது ஃபேஷியலுடன் தொடங்கி, முடிக்குச் சென்று, மாலை இருந்தால் மேக்கப்புடன் முடிக்கவும்.", "உங்களுக்குத் தேவையானதைச் சொல்லுங்கள் — சிகிச்சைகளின் வரிசையைத் திட்டமிடுவோம். ஆலோசனை இலவசம்.", "நீங்கள் இருப்பது போல வாருங்கள். மிகவும் பளபளப்பான உங்களாகச் செல்லுங்கள்."],
                hi: article === 0
                  ? ["सूरज डूबने से ठीक पहले एक क्षण आता है जब दुनिया नरम लगती है। त्वचा गर्म दिखती है। रंग समृद्ध लगते हैं।", "REVATHI HERBAL BEAUTY CARE में हम जो चमक चाहते हैं: एक्ला सीरम की एक बूँद, गाल की हड्डियों पर सुनहरा हाइलाइटर, और मखमली होंठ। सरल कदम, धीरे-धीरे।", "कुछ दिन बीत जाते हैं। कुछ चमकते हैं।"]
                  : ["सैलून का दिन एक विराम है। दिन शांत हो तब फेशियल से शुरू करें, फिर बाल, और शाम हो तो मेकअप से खत्म करें।", "हमें बताएँ आपको क्या चाहिए — हम ट्रीटमेंट का क्रम प्लान करेंगे। परामर्श मुफ़्त है।", "जैसे हैं वैसे आएँ। सबसे पॉलिश्ड रूप में जाएँ।"],
                ml: article === 0
                  ? ["സൂര്യൻ അസ്തമിക്കുന്നതിന് മുമ്പ് ലോകം മൃദുവാകുന്ന ഒരു നിമിഷമുണ്ട്. ചർമ്മം ചൂടുള്ളതായി തോന്നും. നിറം സമ്പന്നമായി തോന്നും.", "REVATHI HERBAL BEAUTY CARE-ൽ ഞങ്ങൾ തേടുന്ന ഗ്ലോ: എക്ലാറ്റ് സീറത്തിന്റെ ഒരു തുള്ളി, കവിൾഎല്ലുകളിൽ ഗോൾഡൻ ഹൈലൈറ്റർ, വെൽവെറ്റ് ലിപ്. ലളിതമായ ഘട്ടങ്ങൾ, മന്ദഗതിയിൽ.", "ചില ദിവസങ്ങൾ കടന്നുപോകും. മറ്റുള്ളവ തിളങ്ങും."]
                  : ["സലൂൺ ദിനം ഒരു ഇടവേളയാണ്. ദിവസം ശാന്തമായിരിക്കുമ്പോൾ ഫേഷ്യലിൽ ആരംഭിച്ച്, മുടിയിലേക്ക് നീങ്ങി, സന്ധ്യയുണ്ടെങ്കിൽ മേക്കപ്പോടെ അവസാനിപ്പിക്കുക.", "നിങ്ങൾക്ക് എന്താണ് വേണ്ടതെന്ന് പറയുക — ട്രീറ്റ്മെന്റുകളുടെ ക്രമം ഞങ്ങൾ പ്ലാൻ ചെയ്യും. കൺസൾട്ടേഷൻ സൗജന്യം.", "നിങ്ങളായിരിക്കുന്നത് പോലെ വരുക. ഏറ്റവും പോളിഷ്ഡ് നിങ്ങളായി പോകുക."],
                te: article === 0
                  ? ["సూర్యుడు అస్తమించే ముందు ప్రపంచం మృదువుగా అనిపించే క్షణం ఉంది. చర్మం వెచ్చగా కనిపిస్తుంది. రంగు సమృద్ధంగా కనిపిస్తుంది.", "REVATHI HERBAL BEAUTY CARE వద్ద మేము వెతికే గ్లో: ఎక్లా సీరం చుక్క, బుగ్గ ఎముకలపై గోల్డెన్ హైలైటర్, వెల్వెట్ లిప్. సాధారణ అడుగులు, నెమ్మదిగా.", "కొన్ని రోజులు గడిచిపోతాయి. మరికొన్ని ప్రకాశిస్తాయి."]
                  : ["సెలూన్ రోజు ఒక విరామం. రోజు ప్రశాంతంగా ఉన్నప్పుడు ఫేషియల్‌తో ప్రారంభించి, జుట్టుకు వెళ్లి, సాయంత్రం ఉంటే మేకప్‌తో ముగించండి.", "మీకు ఏమి కావాలో చెప్పండి — ట్రీట్‌మెంట్ల క్రమాన్ని మేము ప్లాన్ చేస్తాము. కన్సల్టేషన్ ఉచితం.", "మీరు ఉన్నట్టుగా రండి. అత్యంత పాలిష్డ్ మీగా వెళ్లండి."],
                kn: article === 0
                  ? ["ಆರೋಗ್ಯಕರ ಚರ್ಮ ಸರಳ ದಿನಚರಿಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ: ಮೃದುವಾಗಿ ಸ್ವಚ್ಛಗೊಳಿಸಿ, ಪ್ರತಿದಿನ ಮಾಯಿಶ್ಚರೈಸ್ ಮಾಡಿ ಮತ್ತು ಬಿಸಿಲಿನಿಂದ ಚರ್ಮವನ್ನು ರಕ್ಷಿಸಿ.", "ಬೇವು, ಲೋಳೆಸರ, ಅರಿಶಿನ ಮತ್ತು ಶ್ರೀಗಂಧದಂತಹ ಗಿಡಮೂಲಿಕೆ ಪದಾರ್ಥಗಳನ್ನು ತಲೆಮಾರುಗಳಿಂದ ಚರ್ಮವನ್ನು ಶಮನಗೊಳಿಸಲು ಮತ್ತು ಪೋಷಿಸಲು ಬಳಸಲಾಗುತ್ತಿದೆ. ನಿಮ್ಮ ಚರ್ಮದ ಪ್ರಕಾರಕ್ಕೆ ಹೊಂದುವ ಉತ್ಪನ್ನಗಳನ್ನು ಆರಿಸಿ, ಹೊಸದನ್ನು ಬಳಸುವ ಮೊದಲು ಪ್ಯಾಚ್ ಟೆಸ್ಟ್ ಮಾಡಿ.", "ಪ್ರಮಾಣಕ್ಕಿಂತ ನಿರಂತರತೆ ಮುಖ್ಯ."]
                  : ["ಗಿಡಮೂಲಿಕೆ ಸ್ಪಾ ಭೇಟಿ ನಿಮ್ಮ ದಿನದ ಒಂದು ಶಾಂತ ವಿರಾಮ. ನಮ್ಮ ಥೆರಪಿಸ್ಟ್ ನಿಮ್ಮ ಚರ್ಮ ಮತ್ತು ಕೂದಲಿನ ಅಗತ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಮಾಲೋಚನೆಯಿಂದ ಆರಂಭಿಸುತ್ತೇವೆ.", "ಟ್ರೀಟ್‌ಮೆಂಟ್‌ಗಳಲ್ಲಿ ನಮ್ಮದೇ ಶ್ರೇಣಿಯ ಗಿಡಮೂಲಿಕೆ ಎಣ್ಣೆಗಳು, ಪ್ಯಾಕ್‌ಗಳು ಮತ್ತು ಉತ್ಪನ್ನಗಳನ್ನು ಬಳಸಲಾಗುತ್ತದೆ; ಆತುರವೆನಿಸದ ಕ್ರಮದಲ್ಲಿ ಯೋಜಿಸಲಾಗಿದೆ.", "ವಿಶ್ರಾಂತರಾಗಿ ಬನ್ನಿ. ಉಲ್ಲಾಸದಿಂದ ಹೋಗಿ."],
                mr: article === 0
                  ? ["निरोगी त्वचेची सुरुवात साध्या दिनक्रमाने होते: हळुवारपणे स्वच्छ करा, दररोज मॉइश्चरायझ करा आणि उन्हापासून त्वचेचे रक्षण करा.", "कडुनिंब, कोरफड, हळद आणि चंदन यांसारखे हर्बल घटक पिढ्यानपिढ्या त्वचेला शांत करण्यासाठी आणि पोषण देण्यासाठी वापरले जात आहेत. तुमच्या त्वचेच्या प्रकाराला योग्य उत्पादने निवडा आणि कोणतेही नवे उत्पादन वापरण्यापूर्वी पॅच टेस्ट करा.", "प्रमाणापेक्षा सातत्य महत्त्वाचे."]
                  : ["हर्बल स्पा भेट म्हणजे तुमच्या दिवसातील एक शांत विश्रांती. आमच्या थेरपिस्टला तुमच्या त्वचा आणि केसांच्या गरजा समजाव्यात म्हणून आम्ही सल्लामसलतीने सुरुवात करतो.", "ट्रीटमेंटमध्ये आमच्याच श्रेणीतील हर्बल तेले, पॅक आणि उत्पादने वापरली जातात, घाई वाटणार नाही अशा क्रमाने आखलेली.", "निवांत या. ताजेतवाने होऊन जा."],
                bn: article === 0
                  ? ["সুস্থ ত্বকের শুরু একটি সহজ রুটিনে: আলতো করে পরিষ্কার করুন, প্রতিদিন ময়শ্চারাইজ করুন আর রোদ থেকে ত্বক বাঁচান।", "নিম, অ্যালোভেরা, হলুদ ও চন্দনের মতো ভেষজ উপাদান বহু প্রজন্ম ধরে ত্বক শান্ত করতে ও পুষ্টি দিতে ব্যবহৃত হয়ে আসছে। আপনার ত্বকের ধরনের সঙ্গে মানানসই পণ্য বেছে নিন এবং নতুন কিছু ব্যবহারের আগে প্যাচ টেস্ট করুন।", "পরিমাণের চেয়ে নিয়মিততা বেশি জরুরি।"]
                  : ["হার্বাল স্পা-তে যাওয়া মানে আপনার দিনের একটি শান্ত বিরতি। আমাদের থেরাপিস্ট যাতে আপনার ত্বক ও চুলের প্রয়োজন বুঝতে পারেন, তাই আমরা পরামর্শ দিয়ে শুরু করি।", "ট্রিটমেন্টে আমাদের নিজস্ব রেঞ্জের ভেষজ তেল, প্যাক ও পণ্য ব্যবহার করা হয়, এমন ক্রমে সাজানো যাতে তাড়াহুড়ো মনে না হয়।", "নিশ্চিন্তে আসুন। তরতাজা হয়ে ফিরুন।"],
              }, lang)).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <button className="text-link" onClick={() => (article === 0 ? go("#shop") : openBooking())}>
                {article === 0 ? t.explore : t.heroBook}
                <Plus size={16} />
              </button>
            </article>
          )}
          {panel === "care" && (
            <div className="care-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{article === 0 ? t.care : t.privacy}</h2>
              <p>
                {article === 0
                  ? trx({
                      en: "Keep skincare and makeup away from direct sunlight and heat, with caps closed tightly. Use clean hands or a clean spatula for jars, and store products in a cool, dry place. Check each product's label for its recommended use period.",
                      ta: "தோல் பராமரிப்பு மற்றும் மேக்கப்பை நேரடி சூரிய ஒளி மற்றும் வெப்பத்திலிருந்து விலக்கி, மூடிகளை இறுக்கமாக மூடி வைக்கவும். ஜார்களுக்கு சுத்தமான கைகள் அல்லது ஸ்பேட்டூலா பயன்படுத்தவும். குளிர்ந்த, உலர்ந்த இடத்தில் சேமிக்கவும்.",
                      hi: "स्किनकेयर और मेकअप को सीधी धूप और गर्मी से दूर रखें, ढक्कन कसकर बंद करें। जार के लिए साफ हाथ या स्पैचुला उपयोग करें। ठंडी, सूखी जगह पर रखें।",
                      ml: "സ്കിൻകെയറും മേക്കപ്പും നേരിട്ടുള്ള സൂര്യപ്രകാശത്തിൽ നിന്നും ചൂടിൽ നിന്നും അകറ്റി, ക്യാപ്പുകൾ ദൃഢമായി അടച്ച് വയ്ക്കുക. ജാറുകൾക്ക് വൃത്തിയുള്ള കൈകളോ സ്പാറ്റുലയോ ഉപയോഗിക്കുക. തണുത്ത, ഉണങ്ങിയ സ്ഥലത്ത് സൂക്ഷിക്കുക.",
                      te: "స్కిన్‌కేర్ మరియు మేకప్‌ను నేరుగా సూర్యకాంతి మరియు వేడి నుండి దూరంగా ఉంచి, క్యాప్‌లను గట్టిగా మూసివేయండి. జార్‌లకు శుభ్రమైన చేతులు లేదా స్పాచులా ఉపయోగించండి. చల్లని, పొడి ప్రదేశంలో నిల్వ చేయండి.",
                      kn: "ಸ್ಕಿನ್‌ಕೇರ್ ಮತ್ತು ಮೇಕಪ್ ಉತ್ಪನ್ನಗಳನ್ನು ನೇರ ಬಿಸಿಲು ಮತ್ತು ಶಾಖದಿಂದ ದೂರವಿಡಿ, ಮುಚ್ಚಳಗಳನ್ನು ಬಿಗಿಯಾಗಿ ಮುಚ್ಚಿ. ಜಾರ್‌ಗಳಿಗೆ ಸ್ವಚ್ಛ ಕೈ ಅಥವಾ ಸ್ವಚ್ಛ ಸ್ಪ್ಯಾಟುಲಾ ಬಳಸಿ, ಉತ್ಪನ್ನಗಳನ್ನು ತಂಪಾದ, ಒಣ ಸ್ಥಳದಲ್ಲಿ ಇಡಿ. ಶಿಫಾರಸು ಮಾಡಿದ ಬಳಕೆಯ ಅವಧಿಗಾಗಿ ಪ್ರತಿ ಉತ್ಪನ್ನದ ಲೇಬಲ್ ಪರಿಶೀಲಿಸಿ.",
                      mr: "स्किनकेअर आणि मेकअप उत्पादने थेट ऊन आणि उष्णतेपासून दूर ठेवा, झाकणे घट्ट बंद करा. बरण्यांसाठी स्वच्छ हात किंवा स्वच्छ स्पॅटुला वापरा आणि उत्पादने थंड, कोरड्या जागी ठेवा. शिफारस केलेल्या वापर कालावधीसाठी प्रत्येक उत्पादनाचे लेबल तपासा.",
                      bn: "স্কিনকেয়ার ও মেকআপ সরাসরি রোদ ও তাপ থেকে দূরে রাখুন, ঢাকনা শক্ত করে বন্ধ রাখুন। জারের জন্য পরিষ্কার হাত বা পরিষ্কার স্প্যাটুলা ব্যবহার করুন এবং পণ্য ঠান্ডা, শুকনো জায়গায় রাখুন। ব্যবহারের প্রস্তাবিত সময়সীমার জন্য প্রতিটি পণ্যের লেবেল দেখে নিন।",
                      sa: "त्वक्-रक्षणं मुखाभरणं च प्रत्यक्ष-सूर्य-तापात् दूरं रक्षतु, पिधानी दृढं पिदधातु। कुप्याः कृते शुचि-हस्तं स्पैटुलां वा प्रयुङ्क्ताम्, शीते शुष्के च स्थाने निधेहि। प्रत्येकस्य उत्पादस्य लेबेले अनुशंसित-कालं पश्यतु।",
                    }, lang)
                  : trx({
                      en: "Your bag, appointments and language preference are saved only in this browser. Search is performed on this page. Clearing your browser's site data removes them.",
                      ta: "உங்கள் பை, நேரங்கள் மற்றும் மொழி விருப்பம் இந்த உலாவியில் மட்டுமே சேமிக்கப்படும். தேடல் இந்தப் பக்கத்தில் செய்யப்படுகிறது. உலாவி தரவை அழித்தால் அவை நீக்கப்படும்.",
                      hi: "आपका बैग, अपॉइंटमेंट और भाषा वरीयता केवल इस ब्राउज़र में सेव होती है। खोज इसी पेज पर होती है। ब्राउज़र डेटा साफ़ करने पर वे हट जाती हैं।",
                      ml: "നിങ്ങളുടെ ബാഗ്, അപ്പോയിന്റ്മെന്റുകൾ, ഭാഷാ മുൻഗണന ഈ ബ്രൗസറിൽ മാത്രം സേവ് ചെയ്യപ്പെടും. തിരയൽ ഈ പേജിൽ നടക്കും. ബ്രൗസർ ഡാറ്റ മായ്ച്ചാൽ അവ നീക്കം ചെയ്യപ്പെടും.",
                      te: "మీ బ్యాగ్, అపాయింట్‌మెంట్లు మరియు భాషా ప్రాధాన్యత ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతాయి. శోధన ఈ పేజీలో జరుగుతుంది. బ్రౌజర్ డేటా క్లియర్ చేస్తే అవి తొలగించబడతాయి.",
                      kn: "ನಿಮ್ಮ ಬ್ಯಾಗ್, ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು ಮತ್ತು ಭಾಷಾ ಆದ್ಯತೆ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗುತ್ತದೆ. ಹುಡುಕಾಟ ಈ ಪುಟದಲ್ಲೇ ನಡೆಯುತ್ತದೆ. ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನ ಸೈಟ್ ಡೇಟಾ ಅಳಿಸಿದರೆ ಇವು ತೆಗೆದುಹೋಗುತ್ತವೆ.",
                      mr: "तुमची बॅग, अपॉइंटमेंट आणि भाषेची निवड फक्त या ब्राउझरमध्ये जतन केली जाते. शोध याच पेजवर होतो. ब्राउझरचा साइट डेटा साफ केल्यास ते काढून टाकले जातात.",
                      bn: "আপনার ব্যাগ, অ্যাপয়েন্টমেন্ট ও ভাষার পছন্দ শুধু এই ব্রাউজারে সংরক্ষিত থাকে। সার্চ এই পেজেই হয়। ব্রাউজারের সাইট ডেটা মুছলে এগুলো মুছে যায়।",
                      sa: "तव क्रयपेटिका, नियुक्तयः भाषा-इच्छा च अस्मिन् एव ब्राउजर् मध्ये रक्षिताः। अन्वेषणम् अस्मिन् पृष्ठे एव। ब्राउजर्-दत्तानि शुद्धे सति तानि नश्यन्ति।",
                    }, lang)}
              </p>
              {article === 1 && (
                <button
                  className="pill dark"
                  onClick={() => {
                    update(() => ({}));
                    setToast(trx({ en: "Your bag has been cleared.", ta: "உங்கள் பை காலி செய்யப்பட்டது.", hi: "आपका बैग खाली कर दिया गया।", ml: "നിങ്ങളുടെ ബാഗ് ക്ലിയർ ചെയ്തു.", te: "మీ బ్యాగ్ క్లియర్ చేయబడింది.", kn: "ನಿಮ್ಮ ಬ್ಯಾಗ್ ಖಾಲಿ ಮಾಡಲಾಗಿದೆ.", mr: "तुमची बॅग रिकामी केली आहे.", bn: "আপনার ব্যাগ খালি করা হয়েছে।", sa: "तव क्रयपेटिका रिक्ता कृता।" }, lang));
                  }}
                >
                  {trx({ en: "Clear my bag", ta: "பையை காலி செய்", hi: "बैग खाली करें", ml: "ബാഗ് ക്ലിയർ ചെയ്യുക", te: "బ్యాగ్ క్లియర్ చేయండి", kn: "ಬ್ಯಾಗ್ ಖಾಲಿ ಮಾಡಿ", mr: "बॅग रिकामी करा", bn: "ব্যাগ খালি করুন", sa: "क्रयपेटिकां रिक्तां कुरु" }, lang)}
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </dialog>
      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        <Check size={16} />
        {toast}
      </div>
    </div>
  );
}