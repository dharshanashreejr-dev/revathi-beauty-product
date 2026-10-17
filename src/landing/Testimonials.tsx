import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Lang } from "./data";

// Customer testimonials shown inside the salon services section.
// Names, quotes and photos are sample content: replace them with real customers' (with their permission).
type L = Partial<Record<Lang, string>> & { en: string };

const heading: L = {
  en: "What our customers say",
  ta: "எங்கள் வாடிக்கையாளர்கள் சொல்வது",
  hi: "हमारे ग्राहक क्या कहते हैं",
  ml: "ഞങ്ങളുടെ ഉപഭോക്താക്കൾ പറയുന്നത്",
  te: "మా కస్టమర్లు ఏమంటున్నారు",
kn: "ನಮ್ಮ ಗ್ರಾಹಕರು ಏನು ಹೇಳುತ್ತಾರೆ", mr: "आमचे ग्राहक काय म्हणतात", bn: "আমাদের গ্রাহকরা কী বলেন", sa: "अस्माकं ग्राहकाः किं वदन्ति"};
const sub: L = {
  en: "Real words from the people who visit us.",
  ta: "எங்களிடம் வருபவர்களின் உண்மையான வார்த்தைகள்.",
  hi: "हमारे यहाँ आने वालों की सच्ची बातें।",
  ml: "ഞങ്ങളെ സന്ദർശിക്കുന്നവരുടെ യഥാർത്ഥ വാക്കുകൾ.",
  te: "మా దగ్గరకు వచ్చేవారి నిజమైన మాటలు.",
kn: "ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡುವವರ ನಿಜವಾದ ಮಾತುಗಳು.", mr: "आमच्याकडे येणाऱ्यांचे खरे शब्द.", bn: "যারা আমাদের কাছে আসেন তাদের সত্যিকারের কথা।", sa: "ये अस्मान् आगच्छन्ति तेषां सत्यानि वचनानि।"};

const items: { name: string; service: L; photo: string; quote: L }[] = [
  {
    name: "Priya V.",
    photo: "/img/facial.jpg",
    service: { en: "Herbal facial", ta: "மூலிகை ஃபேஷியல்", hi: "हर्बल फेशियल", ml: "ഹെർബൽ ഫേഷ്യൽ", te: "హెర్బల్ ఫేషియల్" , kn: "ಹರ್ಬಲ್ ಫೇಷಿಯಲ್", mr: "हर्बल फेशियल", bn: "হার্বাল ফেসিয়াল", sa: "औषधीय-मुख-प्रसाधनम्"},
    quote: {
      en: "My skin felt fresh and soft. The staff were so kind and gentle.",
      ta: "என் சருமம் புத்துணர்ச்சியுடனும் மென்மையாகவும் இருந்தது. ஊழியர்கள் மிகவும் அன்பாக நடந்துகொண்டார்கள்.",
      hi: "मेरी त्वचा ताज़ा और मुलायम लगी। स्टाफ बहुत प्यार से पेश आया।",
      ml: "എന്റെ ചർമ്മം പുതുമയും മൃദുവുമായി തോന്നി. ജീവനക്കാർ വളരെ സ്നേഹത്തോടെ പെരുമാറി.",
      te: "నా చర్మం తాజాగా, మృదువుగా అనిపించింది. సిబ్బంది చాలా దయగా ఉన్నారు.",
    kn: "ನನ್ನ ಚರ್ಮ ತಾಜಾ ಮತ್ತು ಮೃದುವಾಗಿತ್ತು. ಸಿಬ್ಬಂದಿ ತುಂಬಾ ದಯೆ ಮತ್ತು ಮೃದುವಾಗಿದ್ದರು.", mr: "माझी त्वचा ताजी आणि मऊ वाटली. स्टाफ खूप दयाळू आणि सौम्य होते.", bn: "আমার ত্বক সতেজ ও নরম লাগল। স্টাফ খুব সদয় ও কোমল ছিলেন।", sa: "मम त्वक् नूतना मृद्वी च अनुभूता। कर्मचाराः अतीव दयालवः मृदवः च आसन्।"},
  },
  {
    name: "Anitha R.",
    photo: "/img/back.jpg",
    service: { en: "Herbal oil massage", ta: "மூலிகை எண்ணெய் மசாஜ்", hi: "हर्बल तेल मसाज", ml: "ഹെർബൽ ഓയിൽ മസാജ്", te: "హెర్బల్ ఆయిల్ మసాజ్" , kn: "ಹರ್ಬಲ್ ಎಣ್ಣೆ ಮಸಾಜ್", mr: "हर्बल तेल मसाज", bn: "হার্বাল তেল ম্যাসাজ", sa: "औषधीय-तैल-मर्दनम्"},
    quote: {
      en: "Very relaxing massage in a private room. I left feeling light.",
      ta: "தனி அறையில் மிகவும் இதமான மசாஜ். மனம் லேசாகி வெளியே வந்தேன்.",
      hi: "प्राइवेट रूम में बहुत आरामदायक मसाज। मैं हल्का महसूस करके निकली।",
      ml: "സ്വകാര്യ മുറിയിൽ വളരെ വിശ്രമം നൽകുന്ന മസാജ്. ഭാരം കുറഞ്ഞ മനസ്സോടെ മടങ്ങി.",
      te: "ప్రైవేట్ రూమ్‌లో చాలా రిలాక్సింగ్ మసాజ్. తేలికగా అనిపించి బయటకు వచ్చాను.",
    kn: "ಖಾಸಗಿ ಕೋಣೆಯಲ್ಲಿ ತುಂಬಾ ರಿಲಾಕ್ಸಿಂಗ್ ಮಸಾಜ್. ನಾನು ಹಗುರವಾಗಿ ಅನುಭವಿಸಿ ಹೊರಟೆ.", mr: "खाजगी खोलीत खूप आरामदायी मसाज. मी हलकी वाटून निघाले.", bn: "প্রাইভেট রুমে খুব আরামদায়ক ম্যাসাজ। আমি হালকা অনুভব করে বেরিয়েছি।", sa: "निजी-कक्षे अतीव विश्रामदायकं मर्दनम्। लघुतां अनुभवन् गतवान्।"},
  },
  {
    name: "Meena S.",
    photo: "/img/foot.jpg",
    service: { en: "Manicure & pedicure", ta: "மெனிக்யூர் & பெடிக்யூர்", hi: "मैनीक्योर और पेडीक्योर", ml: "മാനിക്യൂർ & പെഡിക്യൂർ", te: "మానిక్యూర్ & పెడిక్యూర్" , kn: "ಮ್ಯಾನಿಕ್ಯೂರ್ & ಪೆಡಿಕ್ಯೂರ್", mr: "मॅनिक्युअर आणि पेडिक्युअर", bn: "ম্যানিকিউর ও পেডিকিউর", sa: "नख-पाद-प्रसाधनम्"},
    quote: {
      en: "Clean, neat and so peaceful. My hands and feet feel brand new.",
      ta: "சுத்தமாகவும் அமைதியாகவும் இருந்தது. கை, கால்கள் புதியது போல உணர்கிறேன்.",
      hi: "साफ़-सुथरा और शांत माहौल। हाथ-पैर बिल्कुल नए जैसे लगे।",
      ml: "വൃത്തിയും ശാന്തവും. കൈകാലുകൾ പുതിയത് പോലെ തോന്നുന്നു.",
      te: "శుభ్రంగా, ప్రశాంతంగా ఉంది. చేతులు, కాళ్లు కొత్తవిలా అనిపిస్తున్నాయి.",
    kn: "ಸ್ವಚ್ಛ, ಅಚ್ಚುಕಟ್ಟು ಮತ್ತು ತುಂಬಾ ಶಾಂತ. ನನ್ನ ಕೈ ಮತ್ತು ಕಾಲುಗಳು ಹೊಸದಾಗಿ ಅನುಭವಿಸುತ್ತವೆ.", mr: "स्वच्छ, नीटनेटके आणि खूप शांत. माझे हात-पाय पूर्णपणे नवीन वाटतात.", bn: "পরিষ্কার, পরিপাটি ও খুব শান্ত। আমার হাত-পা একেবারে নতুন লাগছে।", sa: "शुद्धं स्वच्छं शान्तं च। मम हस्तौ पादौ च नूतनौ इव।"},
  },
  {
    name: "Kavitha M.",
    photo: "/img/reception.jpg",
    service: { en: "Salon visit", ta: "சலூன் வருகை", hi: "सैलून विज़िट", ml: "സലൂൺ സന്ദർശനം", te: "సెలూన్ సందర్శన" , kn: "ಸೆಲೂನ್ ಭೇಟಿ", mr: "सलून भेट", bn: "সেলুন ভিজিট", sa: "शालून-भ्रमणम्"},
    quote: {
      en: "Booking was easy and the team welcomed me with a smile.",
      ta: "பதிவு செய்வது எளிது. குழுவினர் புன்னகையுடன் வரவேற்றார்கள்.",
      hi: "बुकिंग आसान थी और टीम ने मुस्कान के साथ स्वागत किया।",
      ml: "ബുക്കിംഗ് എളുപ്പമായിരുന്നു, ടീം പുഞ്ചിരിയോടെ സ്വീകരിച്ചു.",
      te: "బుకింగ్ సులభం, టీమ్ చిరునవ్వుతో స్వాగతించింది.",
    kn: "ಬುಕಿಂಗ್ ಸುಲಭವಾಗಿತ್ತು ಮತ್ತು ತಂಡವು ನಗುತ್ತಾ ಸ್ವಾಗತಿಸಿತು.", mr: "बुकिंग सोपी होती आणि टीमने हसून स्वागत केले.", bn: "বুকিং সহজ ছিল এবং দল হাসিমুখে স্বাগত জানিয়েছে।", sa: "आरक्षणं सुलभम् आसीत् दलं च स्मितेन माम् अभिनन्दत्।"},
  },
  {
    name: "Lakshmi D.",
    photo: "/img/facial2.jpg",
    service: { en: "Hydra facial", ta: "ஹைட்ரா ஃபேஷியல்", hi: "हाइड्रा फेशियल", ml: "ഹൈഡ്ര ഫേഷ്യൽ", te: "హైడ్రా ఫేషియల్" , kn: "ಹೈಡ್ರಾ ಫೇಷಿಯಲ್", mr: "हायड्रा फेशियल", bn: "হাইড্রা ফেসিয়াল", sa: "जल-मुख-प्रसाधनम्"},
    quote: {
      en: "My skin glowed for days after. I am booking again next month.",
      ta: "சில நாட்கள் வரை என் சருமம் ஜொலித்தது. அடுத்த மாதமும் பதிவு செய்கிறேன்.",
      hi: "कई दिनों तक मेरी त्वचा चमकती रही। अगले महीने फिर बुक करूँगी।",
      ml: "ദിവസങ്ങളോളം എന്റെ ചർമ്മം തിളങ്ങി. അടുത്ത മാസവും ബുക്ക് ചെയ്യും.",
      te: "రోజుల తరబడి నా చర్మం మెరిసింది. వచ్చే నెల మళ్లీ బుక్ చేస్తాను.",
    kn: "ನಂತರ ಕೆಲವು ದಿನಗಳ ಕಾಲ ನನ್ನ ಚರ್ಮ ಹೊಳೆಯಿತು. ಮುಂದಿನ ತಿಂಗಳು ಮತ್ತೆ ಬುಕ್ ಮಾಡುತ್ತೇನೆ.", mr: "त्यानंतर अनेक दिवस माझी त्वचा चमकत होती. पुढच्या महिन्यात पुन्हा बुक करेन.", bn: "পরে কয়েক দিন আমার ত্বক উজ্জ্বল ছিল। আগামী মাসে আবার বুক করব।", sa: "मम त्वक् दिनेषु प्रभाति स्म। अग्रिमे मासे पुनः आरक्षणं करोमि।"},
  },
  {
    name: "Divya K.",
    photo: "/img/close.jpg",
    service: { en: "Herbal products", ta: "மூலிகைப் பொருட்கள்", hi: "हर्बल प्रोडक्ट", ml: "ഹെർബൽ ഉൽപ്പന്നങ്ങൾ", te: "హెర్బల్ ఉత్పత్తులు" , kn: "ಹರ್ಬಲ್ ಉತ್ಪನ್ನಗಳು", mr: "हर्बल उत्पादने", bn: "হার্বাল পণ্য", sa: "औषधीय-उत्पादानि"},
    quote: {
      en: "The herbal oil and face cream suit my skin well. Delivery was quick.",
      ta: "ஹெர்பல் ஆயிலும் ஃபேஸ் கிரீமும் என் சருமத்துக்கு நன்றாகப் பொருந்துகிறது. டெலிவரி விரைவாக வந்தது.",
      hi: "हर्बल ऑयल और फेस क्रीम मेरी त्वचा को सूट करते हैं। डिलीवरी भी जल्दी हुई।",
      ml: "ഹെർബൽ ഓയിലും ഫേസ് ക്രീമും എന്റെ ചർമ്മത്തിന് ചേരുന്നു. ഡെലിവറി വേഗത്തിലായിരുന്നു.",
      te: "హెర్బల్ ఆయిల్, ఫేస్ క్రీమ్ నా చర్మానికి బాగా సరిపోయాయి. డెలివరీ త్వరగా వచ్చింది.",
    kn: "ಹರ್ಬಲ್ ಎಣ್ಣೆ ಮತ್ತು ಫೇಸ್ ಕ್ರೀಮ್ ನನ್ನ ಚರ್ಮಕ್ಕೆ ಚೆನ್ನಾಗಿ ಹೊಂದುತ್ತದೆ. ಡೆಲಿವರಿ ತ್ವರಿತವಾಗಿತ್ತು.", mr: "हर्बल तेल आणि फेस क्रीम माझ्या त्वचेला चांगले बसतात. डिलिव्हरी जलद होती.", bn: "হার্বাল তেল ও ফেস ক্রিম আমার ত্বকে ভালো লাগে। ডেলিভারি দ্রুত ছিল।", sa: "औषधीय-तैलं मुख-लेपं च मम त्वचे सम्यक्। वितरणं शीघ्रम् आसीत्।"},
  },
];

const pick = (v: L, lang: Lang) => v[lang] ?? v.en;

export default function Testimonials({ lang }: { lang: Lang }) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "center", skipSnaps: false });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [shown, setShown] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const on = () => setIndex(api.selectedScrollSnap());
    on();
    api.on("select", on);
    return () => { api.off("select", on); };
  }, [api]);

  // Auto-slide every 5 seconds (stops while hovering, and for people who prefer reduced motion).
  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => api.scrollNext(), 5000);
    return () => clearTimeout(t);
  }, [api, paused, index]);

  // Fade the section in once when it scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`testi ${shown ? "is-in" : ""}`}
      aria-label={pick(heading, lang)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="testi-head">
        <h2>{pick(heading, lang)}</h2>
        <p>{pick(sub, lang)}</p>
      </div>
      <div className="testi-viewport" ref={viewportRef}>
        <div className="testi-track">
          {items.map((it, i) => (
            <div className={`testi-slide ${index === i ? "is-active" : ""}`} key={it.name} aria-roledescription="slide" aria-label={`${i + 1} / ${items.length}`}>
              <figure className="testi-card">
                <img src={it.photo} alt={it.name} width={320} height={220} loading="lazy" />
                <div className="testi-body">
                  <span className="testi-stars" aria-label="5 / 5">
                    {[0, 1, 2, 3, 4].map((n) => (<i key={n} style={{ animationDelay: `${n * 90}ms` }}>★</i>))}
                  </span>
                  <blockquote>{pick(it.quote, lang)}</blockquote>
                  <figcaption>
                    <strong>{it.name}</strong>
                    <span>{pick(it.service, lang)}</span>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <div className="testi-nav">
        <button type="button" aria-label="Previous" onClick={() => api?.scrollPrev()}><ArrowLeft size={18} /></button>
        <div className="testi-dots">
          {items.map((it, i) => (
            <button key={it.name} type="button" aria-label={`${i + 1}`} aria-current={index === i} className={index === i ? "is-active" : ""} onClick={() => api?.scrollTo(i)} />
          ))}
        </div>
        <button type="button" aria-label="Next" onClick={() => api?.scrollNext()}><ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
