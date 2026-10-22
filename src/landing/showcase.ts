// Editable marketing content for the new swipe sections.
// Prices always come from data.ts, so change prices there.

export type HerbalSlide = {
  id: string; // product id in data.ts
  ghost: string;
  tags: string;
  title: [string, string];
  copy: string;
  kind: string;
  herbs: { k: string; v: string }[];
  size: string;
  bg: string;
  hotspots: { x: number; y: number }[];
  /** Real product photos (one per variant). When present they replace the drawn bottle and zoom on hover. */
  photos?: { name: string; src: string }[];
};

export const herbalSlides: HerbalSlide[] = [
  {
    id: "body-butter",
    ghost: "Butter",
    tags: "Nourishing · Smoothing · Warm",
    title: ["Softness,", "whipped."],
    copy: "A creamy herbal body butter with shea, kokum and a hint of turmeric, softly scented with peach nectar. Skin feels smooth with a warm, healthy glow.",
    kind: "Herbal body butter",
    herbs: [
      { k: "Nourish", v: "Shea butter" },
      { k: "Smooth", v: "Kokum butter" },
      { k: "Brighten", v: "Turmeric" },
    ],
    size: "Body butter · 200 ml / 6.8 fl. oz.",
    bg: "linear-gradient(135deg,#ebe3fa 0%,#d3bff3 55%,#a074e7 100%)",
    hotspots: [{ x: 36, y: 22 }, { x: 68, y: 46 }, { x: 40, y: 76 }],
    photos: [{ name: "Rose & Shea", src: "/assets/herbal/body-butter-rose-shea.webp" }, { name: "Neem & Turmeric", src: "/assets/herbal/body-butter-neem-turmeric.webp" }, { name: "Coconut & Vanilla", src: "/assets/herbal/body-butter-coconut-vanilla.webp" }],
  },
  {
    id: "hair-oil",
    ghost: "Bhringraj",
    tags: "Strengthening · Glossy · Light",
    title: ["Roots", "in bloom."],
    copy: "A cold-infused herbal hair oil with bhringraj, amla and hibiscus. Massage in before a wash for stronger-feeling roots and soft, glossy lengths.",
    kind: "Herbal hair oil",
    herbs: [
      { k: "Strengthen", v: "Bhringraj" },
      { k: "Nourish", v: "Amla" },
      { k: "Shine", v: "Hibiscus" },
    ],
    size: "Hair oil · 100 ml / 3.4 fl. oz.",
    bg: "linear-gradient(135deg,#d4c1f3 0%,#9967e8 55%,#5721a8 100%)",
    hotspots: [{ x: 50, y: 12 }, { x: 30, y: 52 }, { x: 68, y: 70 }],
    photos: [{ name: "Amla & Bhringraj", src: "/assets/herbal/hair-oil-amla-bhringraj.webp" }, { name: "Rosemary & Hibiscus", src: "/assets/herbal/hair-oil-rosemary-hibiscus.webp" }, { name: "Almond & Neem", src: "/assets/herbal/hair-oil-almond-neem.webp" }],
  },
  {
    id: "perfume",
    ghost: "Parfum",
    tags: "Floral · Woody · Lasting",
    title: ["Wear", "the warmth."],
    copy: "A botanical eau de parfum of white jasmine, sandalwood and vetiver. Soft on arrival, quietly lasting through the evening.",
    kind: "Eau de parfum",
    herbs: [
      { k: "Top", v: "Jasmine sambac" },
      { k: "Heart", v: "Sandalwood" },
      { k: "Base", v: "Vetiver" },
    ],
    size: "Eau de parfum · 50 ml / 1.7 fl. oz.",
    bg: "linear-gradient(135deg,#ceb8f1 0%,#4e0ce7 55%,#4b1d91 100%)",
    hotspots: [{ x: 46, y: 16 }, { x: 62, y: 44 }, { x: 36, y: 72 }],
    photos: [{ name: "Sandal & Vetiver", src: "/assets/herbal/perfume-sandal-vetiver.webp" }, { name: "Jasmine & Mogara", src: "/assets/herbal/perfume-jasmine-mogara.webp" }, { name: "Orange & Tulsi", src: "/assets/herbal/perfume-orange-tulsi.webp" }],
  },
];

export const promoCards = [
  { id: "hair-oil", brand: "Herbal hair", chips: "Treat · Wash · Nourish", title: "Healthy\nHair\nHabits", offer: "Up To 20% OFF", sub: "Herbal hair care", bg: "linear-gradient(170deg,#5b2bb0 0%,#4c1d95 100%)", dark: true },
  { id: "eclat", brand: "Glow serum", chips: "", title: "The all new\nHerbal Glow\nSerum", offer: "Up To 10% Off", sub: "Free gift on ₹2,999", bg: "linear-gradient(170deg,#5b2bb0 0%,#4c1d95 100%)", dark: true },
  { id: "night-cream", brand: "Night cream", chips: "", title: "Overnight\nHerbal\nRepair", offer: "Festive Drop", sub: "Wake up to softer skin", bg: "linear-gradient(170deg,#5b2bb0 0%,#4c1d95 100%)", dark: true },
  { id: "tint-powder", brand: "Tint powder", chips: "Beetroot · Turmeric · Charcoal", title: "Natural\nTint\nPowders", offer: "New Arrival", sub: "3 plant-based shades", bg: "linear-gradient(170deg,#5b2bb0 0%,#4c1d95 100%)", dark: true },
  { id: "cleansing-oil", brand: "Cleansing oil", chips: "", title: "Jasmine\nCleansing\nOil", offer: "Gentle First Step", sub: "100 ml · melts makeup away", bg: "linear-gradient(170deg,#5b2bb0 0%,#4c1d95 100%)", dark: true },
  { id: "herbal-shampoo", brand: "Herbal shampoo", chips: "Cleanse · Soften · Shine", title: "The Silk\nWash Edit", offer: "Buy 2, Save 10%", sub: "Gentle daily wash", bg: "linear-gradient(170deg,#5b2bb0 0%,#4c1d95 100%)", dark: true },
];

export const festiveDays = [
  { n: 1, name: "Playful Oranges", bg: "#f08a5d", fg: "#3b1b10", hero: 3, pos: "30% 28%" },
  { n: 2, name: "Shimmery Whites", bg: "#f7f4fd", fg: "#2f2420", hero: 2, pos: "62% 30%" },
  { n: 3, name: "Vivid Reds", bg: "#e23a3f", fg: "#ffffff", hero: 3, pos: "62% 24%" },
  { n: 4, name: "Royal Blues", bg: "#5a22ad", fg: "#e2e7f7", hero: 4, pos: "40% 30%" },
  { n: 5, name: "Poppy Yellows", bg: "#f6cf55", fg: "#3a2a07", hero: 2, pos: "28% 40%" },
  { n: 6, name: "Fresh Greens", bg: "#c4a8ef", fg: "#4b1d91", hero: 4, pos: "66% 36%" },
  { n: 7, name: "Blush Pinks", bg: "#f2a9c2", fg: "#4a1429", hero: 3, pos: "46% 34%" },
  { n: 8, name: "Regal Purples", bg: "#ccb4f1", fg: "#ffffff", hero: 2, pos: "50% 26%" },
  { n: 9, name: "Golden Bronze", bg: "#c89a5b", fg: "#2b1a0a", hero: 4, pos: "24% 32%" },
];

export const spaOfferings = [
  { id: "b1", photo: "noteJasmine", herbs: "Jasmine & lavender", includes: ["Aroma consultation", "Full-body massage", "Scalp and temple finish"], finish: "perfume" },
  { id: "b4", photo: "jasmineCard", herbs: "Herbal oil blend", includes: ["Warm herbal oil massage", "Gentle herbal steam", "Herbal balm finish"], finish: "sandal-oil" },
  { id: "b5", photo: "woodCard", herbs: "Basalt stones & sandalwood", includes: ["Warm stone placement", "Back and leg release", "Warm towel finish"], finish: "perfume" },
  { id: "b6", photo: "peachCard", herbs: "Bhringraj oil", includes: ["Warm herbal oil flow", "Head and neck massage", "Shoulder release"], finish: "hair-oil" },
] as const;

export const bundles = [
  { service: "s1", product: "eclat", a: "Glow facial", b: "Glow serum", title: "Velvet Glow Facial + Éclat Serum", copy: "Our signature facial, finished with Éclat so your glow carries well beyond the chair.", photo: "/assets/hero-1.webp", pos: "30% 50%" },
  { service: "b1", product: "body-butter", a: "Aroma spa", b: "Body butter", title: "Aroma Massage + Herbal Body Butter", copy: "A calming full-body massage, then the whipped body butter to keep skin soft all week.", photo: "/assets/hero-4.webp", pos: "50% 50%" },
  { service: "s3", product: "night-cream", a: "Gold facial", b: "Night cream", title: "Gold Radiance Facial + Night Cream", copy: "Our brightening gold facial, followed by a rich night cream for softer skin by morning.", photo: "/assets/hero-2.webp", pos: "50% 50%" },
  { service: "b5", product: "sandal-oil", a: "Hot stone", b: "Sandal oil", title: "Hot Stone Massage + Sandal Body Oil", copy: "Warm stones to melt tension, then a sandal oil to keep the calm with you.", photo: "/assets/hero-3.webp", pos: "50% 50%" },
  { service: "b6", product: "hair-oil", a: "Head massage", b: "Hair oil", title: "Head & Shoulder Massage + Herbal Hair Oil", copy: "A deep head and shoulder release, then herbal oil to nourish your roots.", photo: "/assets/hero-1.webp", pos: "70% 50%" },
] as const;

export const arrivals = [
  { id: "herbal-shampoo", brand: "HAIR", line: "Cleanses gently and leaves hair silky and shiny." },
  { id: "hair-oil", brand: "HAIR", line: "Herbal oil for strong-feeling roots and glossy lengths." },
  { id: "eclat", brand: "SKIN", line: "A silky glow serum with saffron, jasmine and sandalwood." },
  { id: "night-cream", brand: "SKIN", line: "Overnight comfort for softer-looking skin by morning." },
  { id: "body-butter", brand: "BODY", line: "Whipped butter with a warm, peachy glow." },
  { id: "perfume", brand: "FRAGRANCE", line: "Jasmine, sandalwood and vetiver in an eau de parfum." },
  { id: "lipstick-red", brand: "MAKEUP", line: "Four bold reds, from classic to brick." },
  { id: "highlighter", brand: "MAKEUP", line: "A champagne-gold glow for cheeks and brow bones." },
] as const;
