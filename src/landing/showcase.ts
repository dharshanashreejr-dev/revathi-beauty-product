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
};

export const herbalSlides: HerbalSlide[] = [
  {
    id: "eclat",
    ghost: "Éclat",
    tags: "Brightening · Hydrating · Silky",
    title: ["Golden glow.", "Bottled."],
    copy: "Éclat Herbal Glow Serum brings saffron, white jasmine and sandalwood together in a silky, fast-absorbing formula for a luminous, velvet-soft finish.",
    kind: "Herbal serum",
    herbs: [
      { k: "Glow", v: "Saffron" },
      { k: "Soothe", v: "White jasmine" },
      { k: "Finish", v: "Sandalwood" },
    ],
    size: "Glow serum · 30 ml / 1.0 fl. oz.",
    bg: "linear-gradient(135deg,#efb690 0%,#dc8f62 55%,#c97a4f 100%)",
    hotspots: [{ x: 52, y: 14 }, { x: 28, y: 48 }, { x: 70, y: 76 }],
  },
  {
    id: "night-cream",
    ghost: "Night",
    tags: "Restoring · Cushioning · Calm",
    title: ["Wake up", "softer."],
    copy: "A rich, whipped herbal night cream with ashwagandha, aloe vera and sweet almond that melts in and leaves skin feeling cushioned by morning.",
    kind: "Herbal night cream",
    herbs: [
      { k: "Restore", v: "Ashwagandha" },
      { k: "Cool", v: "Aloe vera" },
      { k: "Soften", v: "Sweet almond" },
    ],
    size: "Night cream · 50 g / 1.7 oz.",
    bg: "linear-gradient(135deg,#c9aed3 0%,#9d7aae 55%,#7f5b93 100%)",
    hotspots: [{ x: 30, y: 34 }, { x: 66, y: 28 }, { x: 52, y: 72 }],
  },
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
    bg: "linear-gradient(135deg,#f4c1b2 0%,#e39a88 55%,#cc7b6b 100%)",
    hotspots: [{ x: 36, y: 22 }, { x: 68, y: 46 }, { x: 40, y: 76 }],
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
    bg: "linear-gradient(135deg,#aebf9c 0%,#7f9a6b 55%,#5f7d4d 100%)",
    hotspots: [{ x: 50, y: 12 }, { x: 30, y: 52 }, { x: 68, y: 70 }],
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
    bg: "linear-gradient(135deg,#d4b6a6 0%,#a98672 55%,#8b6753 100%)",
    hotspots: [{ x: 46, y: 16 }, { x: 62, y: 44 }, { x: 36, y: 72 }],
  },
];

export const promoCards = [
  { id: "hair-oil", brand: "Herbal hair", chips: "Treat · Wash · Nourish", title: "Healthy\nHair\nHabits", offer: "Up To 20% OFF", sub: "Herbal hair care", bg: "linear-gradient(170deg,#d9d2f7 0%,#b4b6f2 60%,#9aa0ee 100%)", dark: true },
  { id: "eclat", brand: "Glow serum", chips: "", title: "The all new\nHerbal Glow\nSerum", offer: "Up To 10% Off", sub: "Free gift on ₹2,999", bg: "linear-gradient(170deg,#f1f1f3 0%,#d8dade 55%,#9a9ca3 100%)", dark: true },
  { id: "night-cream", brand: "Night cream", chips: "", title: "Overnight\nHerbal\nRepair", offer: "Festive Drop", sub: "Wake up to softer skin", bg: "linear-gradient(170deg,#f6dfe9 0%,#e3b7cf 55%,#c58fb0 100%)", dark: true },
  { id: "body-butter", brand: "Body butter", chips: "Soft · Smooth · Glowing", title: "Soft Skin\nSeason", offer: "Up To 15% Off", sub: "Free tote on ₹1,999", bg: "linear-gradient(170deg,#fbe4dc 0%,#f0b9a9 55%,#d98f7e 100%)", dark: true },
  { id: "perfume", brand: "Perfume", chips: "", title: "Signature\nScent", offer: "New Arrival", sub: "50 ml eau de parfum", bg: "linear-gradient(170deg,#ece3dd 0%,#cdb5a8 55%,#a98672 100%)", dark: true },
  { id: "herbal-shampoo", brand: "Herbal shampoo", chips: "Cleanse · Soften · Shine", title: "The Silk\nWash Edit", offer: "Buy 2, Save 10%", sub: "Gentle daily wash", bg: "linear-gradient(170deg,#e3eedb 0%,#bfd4b0 55%,#8fb07c 100%)", dark: true },
];

export const festiveDays = [
  { n: 1, name: "Playful Oranges", bg: "#f08a5d", fg: "#3b1b10", hero: 3, pos: "30% 28%" },
  { n: 2, name: "Shimmery Whites", bg: "#fbf7f3", fg: "#2f2420", hero: 2, pos: "62% 30%" },
  { n: 3, name: "Vivid Reds", bg: "#e23a3f", fg: "#ffffff", hero: 3, pos: "62% 24%" },
  { n: 4, name: "Royal Blues", bg: "#8fa6f6", fg: "#16224d", hero: 4, pos: "40% 30%" },
  { n: 5, name: "Poppy Yellows", bg: "#f6cf55", fg: "#3a2a07", hero: 2, pos: "28% 40%" },
  { n: 6, name: "Fresh Greens", bg: "#6fb887", fg: "#0f2e1b", hero: 4, pos: "66% 36%" },
  { n: 7, name: "Blush Pinks", bg: "#f2a9c2", fg: "#4a1429", hero: 3, pos: "46% 34%" },
  { n: 8, name: "Regal Purples", bg: "#9b6ed1", fg: "#ffffff", hero: 2, pos: "50% 26%" },
  { n: 9, name: "Golden Bronze", bg: "#c89a5b", fg: "#2b1a0a", hero: 4, pos: "24% 32%" },
];

export const spaOfferings = [
  { id: "b4", photo: "woodCard", herbs: "Herbal oil blend", includes: ["Warm herbal-oil massage", "Gentle herbal steam", "Rest with herbal tea"], finish: "body-butter" },
  { id: "b1", photo: "noteJasmine", herbs: "Jasmine & lavender", includes: ["Aroma consultation", "Full-body massage", "Scalp and temple finish"], finish: "perfume" },
  { id: "b5", photo: "noteWood", herbs: "Basalt stones & sandal", includes: ["Heated stone placement", "Back and leg release", "Warm towel wrap"], finish: "body-butter" },
  { id: "b6", photo: "journalTwo", herbs: "Bhringraj oil", includes: ["Warm herbal oil flow", "Head and neck massage", "Quiet rest"], finish: "hair-oil" },
  { id: "b7", photo: "peachCard", herbs: "Peach & mint soak", includes: ["Herbal foot soak", "Pressure-point therapy", "Peach balm finish"], finish: "body-butter" },
  { id: "b9", photo: "world", herbs: "Signature aroma blend", includes: ["Side-by-side massage", "Herbal steam", "Shared tea ritual"], finish: "perfume" },
] as const;

export const bundles = [
  { service: "h1", product: "herbal-shampoo", a: "Hair styling", b: "Herbal shampoo", title: "Hair Styling + Herbal Shampoo", copy: "A polished cut and blow-dry, then take home the shampoo we used so the finish lasts.", photo: "/assets/hero-3.webp", pos: "50% 30%" },
  { service: "h2", product: "hair-oil", a: "Hair spa", b: "Hair oil", title: "Velvet Hair Spa + Bhringraj Oil", copy: "Deep nourishment with scalp massage, plus the herbal oil for your weekly ritual at home.", photo: "/assets/hero-2.webp", pos: "70% 40%" },
  { service: "s1", product: "eclat", a: "Glow facial", b: "Glow serum", title: "Velvet Glow Facial + Éclat Serum", copy: "Our signature facial, finished with Éclat so your glow carries well beyond the chair.", photo: "/assets/hero-1.webp", pos: "30% 50%" },
  { service: "b1", product: "body-butter", a: "Aroma spa", b: "Body butter", title: "Aroma Massage + Herbal Body Butter", copy: "A calming full-body massage, then the whipped body butter to keep skin soft all week.", photo: "/assets/hero-4.webp", pos: "50% 50%" },
  { service: "s3", product: "night-cream", a: "Gold facial", b: "Night cream", title: "Gold Radiance Facial + Night Cream", copy: "Our most indulgent facial, followed by the overnight cream that locks the glow in.", photo: "/assets/hero-3.webp", pos: "20% 40%" },
  { service: "m1", product: "perfume", a: "Party makeup", b: "Perfume", title: "Party Makeup + Signature Perfume", copy: "A polished evening look, finished with the botanical scent made for it.", photo: "/assets/hero-3.webp", pos: "80% 30%" },
] as const;

export const arrivals = [
  { id: "herbal-shampoo", brand: "HAIR", line: "Cleanses gently and leaves hair silky and shiny." },
  { id: "hair-oil", brand: "HAIR", line: "Herbal oil for strong-feeling roots and glossy lengths." },
  { id: "eclat", brand: "SKIN", line: "A silky glow serum with saffron, jasmine and sandalwood." },
  { id: "night-cream", brand: "SKIN", line: "Overnight comfort for softer-looking skin by morning." },
  { id: "body-butter", brand: "BODY", line: "Whipped butter with a warm, peachy glow." },
  { id: "perfume", brand: "FRAGRANCE", line: "Jasmine, sandalwood and vetiver in an eau de parfum." },
  { id: "lipstick", brand: "MAKEUP", line: "A cushiony matte in a deep plum rose." },
  { id: "highlighter", brand: "MAKEUP", line: "A champagne-gold glow for cheeks and brow bones." },
] as const;
