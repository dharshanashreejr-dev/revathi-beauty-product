// Editorial photography (Unsplash licence, free to use). Served responsively
// up to 3840px wide so large and high-density displays receive 4K sources.
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export type Photo = { src: string; alt: string; credit: string };

export const photos = {
  peachCard: {
    src: unsplash("photo-1565769583321-29e69b493031"),
    alt: "Ripe peaches on the branch in warm summer light",
    credit: "Jared Subia",
  },
  jasmineCard: {
    src: unsplash("photo-1649674635709-a08fae8d64fb"),
    alt: "Star jasmine flowers against a warm background",
    credit: "Chinmay Sethi",
  },
  woodCard: {
    src: unsplash("photo-1635315619556-5826839a1bea"),
    alt: "Warm, softly layered natural grain",
    credit: "Hans",
  },
  notePeach: {
    src: unsplash("photo-1629828874514-c1e5103f2150"),
    alt: "Halved peach in bright sunlight",
    credit: "Vlad Deep",
  },
  noteJasmine: {
    src: unsplash("photo-1624396593468-0230b5c9c29e"),
    alt: "A cluster of white jasmine blossoms",
    credit: "Geraldine Dukes",
  },
  noteWood: {
    src: unsplash("photo-1785545637368-83ee60a10e7e"),
    alt: "Sun-bleached driftwood at golden hour",
    credit: "Tetiana Sapon",
  },
  world: {
    src: unsplash("photo-1680460643063-eabe94f58217"),
    alt: "A Mediterranean terrace overlooking the sea at dusk",
    credit: "Peppe Occhipinti",
  },
  journalOne: {
    src: unsplash("photo-1736607633200-7fa36bd1f413"),
    alt: "Golden light on the sea at sunset",
    credit: "William Pickard",
  },
  journalTwo: {
    src: unsplash("photo-1718963892270-04300c864522"),
    alt: "A quiet moment wrapped in soft linen",
    credit: "Branislav Rodman",
  },
  closing: {
    src: unsplash("photo-1601562219660-c02881671359"),
    alt: "",
    credit: "Jason Pischke",
  },
} satisfies Record<string, Photo>;

export const moments: (Photo & { place: { en: string; fr: string } })[] = [
  {
    src: unsplash("photo-1787058129917-1c002e2c1014"),
    alt: "An iron gate in a stone wall framed by oleander",
    credit: "Denis Gorbuleac",
    place: { en: "A garden gate in bloom", fr: "Un portail en fleurs" },
  },
  {
    src: unsplash("photo-1560768999-5023bcd29569"),
    alt: "White blossoms backlit by the setting sun",
    credit: "Hassan Ouajbir",
    place: { en: "Petals in the last light", fr: "Pétales à la dernière lueur" },
  },
  {
    src: unsplash("photo-1662495051087-3266e9608efd"),
    alt: "A terrace table set above the town at sunset",
    credit: "Jochen van Wylick",
    place: { en: "A table at dusk", fr: "Une table au crépuscule" },
  },
  {
    src: unsplash("photo-1572495754162-78a92305ea6a"),
    alt: "The soft heart of a pale rose",
    credit: "Valerie Blanchett",
    place: { en: "Softness, up close", fr: "La douceur, de près" },
  },
  {
    src: unsplash("photo-1620763050148-af058ab2fff0"),
    alt: "Folds of champagne silk",
    credit: "Susan Wilkinson",
    place: { en: "Silk on the skin", fr: "La soie sur la peau" },
  },
  {
    src: unsplash("photo-1657478315749-4152ab02e639"),
    alt: "Honey-coloured facades on a seaside promenade",
    credit: "Dwain Norsa",
    place: { en: "Honey-coloured stone", fr: "La pierre couleur de miel" },
  },
  {
    src: unsplash("photo-1768587561087-09914701d709"),
    alt: "A coastal town and its bell tower at sunset",
    credit: "Renan Brun",
    place: { en: "The town turns gold", fr: "La ville devient or" },
  },
];

const widths = [640, 1080, 1600, 2400, 3840];

/** Responsive attributes for a photo, topping out at a 4K (3840px) source. */
export function img(photo: Photo, sizes = "100vw", quality = 82) {
  const url = (w: number) =>
    `${photo.src}?auto=format&fit=max&w=${w}&q=${quality}`;
  return {
    src: url(1600),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    sizes,
    alt: photo.alt,
    decoding: "async" as const,
  };
}
