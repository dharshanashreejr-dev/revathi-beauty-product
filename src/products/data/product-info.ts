// Ingredients + application guide shown on the product page (CRS 3.2).
// SAMPLE CONTENT by subcategory so every product shows these sections. The admin product form (Phase 4) lets staff
// replace it per product. A product can override it with its own `ingredients` / `how` later.
export interface ProductInfo { ingredients: string[]; how: string }
const I = (ingredients: string[], how: string): ProductInfo => ({ ingredients, how })
const BY_SUB: Record<string, ProductInfo> = {
  'Cleansers': I(['Aloe vera', 'Neem', 'Rose water'], 'Massage onto damp skin for 30 seconds, then rinse with lukewarm water. Morning and night.'),
  'Toners & Essences': I(['Rose water', 'Green tea', 'Witch hazel'], 'Apply with a cotton pad or press into clean skin. Follow with serum.'),
  'Serums': I(['Vitamin C (amla)', 'Hyaluronic acid', 'Aloe vera'], 'Press 3 to 4 drops onto clean skin, morning and night, before moisturiser.'),
  'Moisturisers': I(['Shea butter', 'Aloe vera', 'Almond oil'], 'Apply a pea-sized amount over face and neck after serum.'),
  'Sunscreen': I(['Zinc oxide', 'Aloe vera', 'Green tea'], 'Apply generously 15 minutes before sun exposure. Reapply every 2 to 3 hours.'),
  'Exfoliators': I(['Rice powder', 'Walnut', 'Turmeric'], 'Massage gently on damp skin once or twice a week, then rinse well.'),
  'Masks': I(['Multani mitti', 'Sandalwood', 'Rose'], 'Apply an even layer, leave for 10 minutes, rinse with warm water. Twice a week.'),
  'Eye Care': I(['Cucumber', 'Caffeine', 'Aloe vera'], 'Dab a small amount around the eye area with the ring finger, morning and night.'),
  'Lip Care': I(['Beeswax', 'Shea butter', 'Almond oil'], 'Apply to lips as often as needed, especially at bedtime.'),
  'Makeup': I(['Mineral pigments', 'Vitamin E', 'Jojoba oil'], 'Apply to clean, moisturised skin and blend. Remove with a gentle cleanser at night.'),
  'Mascara': I(['Castor oil', 'Vitamin E', 'Green tea extract'], 'Wiggle the wand from root to tip on clean, dry lashes and build with a second coat. Remove with a gentle cleanser at night.'),
  'Acne Care': I(['Neem', 'Tea tree', 'Tulsi'], 'Apply a thin layer on affected areas after cleansing, once or twice a day.'),
  'Aromatherapy': I(['Lavender oil', 'Sandalwood', 'Jasmine'], 'Use a few drops in a diffuser or on a pillow. Not for direct use on skin.'),
  'Bath Rituals': I(['Epsom salt', 'Rose petals', 'Lavender'], 'Add to warm bath water and soak for 15 to 20 minutes.'),
  'Candles': I(['Soy wax', 'Essential oils', 'Cotton wick'], 'Trim the wick to 5 mm. Burn up to 4 hours at a time, away from drafts.'),
  'Sleep & Relaxation': I(['Lavender', 'Chamomile', 'Vetiver'], 'Spritz on pillows and linen about 10 minutes before sleep.'),
  'Body Recovery': I(['Arnica', 'Eucalyptus', 'Camphor'], 'Massage gently into tired areas. Avoid broken skin.'),
  'Hydration': I(['Aloe vera', 'Cucumber', 'Mint'], 'Use as directed on the pack. Store in a cool, dry place.'),
  'Mindfulness': I(['Sandalwood', 'Tulsi', 'Rose'], 'Use during quiet time. Follow the guidance on the pack.'),
  'Body Wash': I(['Neem', 'Aloe vera', 'Coconut'], 'Lather on wet skin, massage, and rinse well.'),
  'Lotions & Creams': I(['Shea butter', 'Coconut oil', 'Aloe vera'], 'Apply all over the body after bathing while the skin is still damp.'),
  'Body Oils': I(['Sesame oil', 'Sandalwood', 'Almond oil'], 'Warm a few drops in the palms and massage in before or after bathing.'),
  'Scrubs': I(['Sea salt', 'Coconut oil', 'Coffee'], 'Massage over wet skin in circles, then rinse. Once or twice a week.'),
  'Bath & Soaks': I(['Epsom salt', 'Lavender', 'Rose'], 'Dissolve in warm bath water and soak for 15 to 20 minutes.'),
  'Hand & Foot Care': I(['Shea butter', 'Lavender', 'Glycerin'], 'Apply generously to hands and feet, especially before bed.'),
  'Deodorants': I(['Alum', 'Sandalwood', 'Vetiver'], 'Apply to clean, dry underarms. Reapply when needed.'),
  'Body Mists': I(['Rose water', 'Jasmine', 'Vetiver'], 'Spray lightly over the body from a distance. Avoid the eyes.'),
  'Self Tan': I(['Aloe vera', 'Cocoa', 'Vitamin E'], 'Exfoliate first, apply evenly with a mitt, and let it dry fully before dressing.'),
}
const DEFAULT: ProductInfo = I(['Natural herbal extracts', 'Plant-based oils'], 'Use as directed on the pack. Patch-test before first use.')
// A few products carry their own ingredients / usage instead of the subcategory sample.
const BY_NAME: Record<string, ProductInfo> = {
  'Revathi Herbal Bath Soak': I(['Bath salts', 'Dried botanicals', 'Essential oils'], 'Dissolve 2 to 3 tablespoons in warm bath water and soak for 15 to 20 minutes.'),
  'Revathi Herbal Body Mist': I(['Floral water', 'Aloe vera', 'Essential oils'], 'Spray lightly over the body from a distance. Avoid the eyes.'),
  'Revathi Herbal Lipgloss': I(['Jojoba oil', 'Vitamin E', 'Shea butter'], 'Glide over bare or coloured lips. Reapply through the day.'),
  'Glow Collagen Capsules': I(['As listed on the pack'], 'Take as directed on the pack.'),
  'Calm & Sleep Wellness Tea': I(['Chamomile', 'Lavender', 'Lemon peel'], 'Steep 1 teaspoon in hot water for 5 to 7 minutes. Enjoy in the evening.'),
  'Body Detox Wellness Oil': I(['Botanical oils', 'Essential oils'], 'Warm a few drops in the palms and massage into the body. Patch-test first.'),
  'Stress Relief Aroma Roller': I(['Carrier oil', 'Essential oils'], 'Roll onto pulse points such as wrists and temples. Keep away from the eyes.'),
  'Revathi Herbal Eucalyptus Oil': I(['Eucalyptus oil', 'Lavender, mint, lemongrass or rosemary oil', 'Carrier oil'], 'Add a few drops to a diffuser, or dilute in a carrier oil before applying. Patch-test first and keep away from the eyes.'),
}
export const productInfo = (subcategory: string, name?: string): ProductInfo => (name && BY_NAME[name]) || BY_SUB[subcategory] || DEFAULT
