export type Drink = {
  name: string;
  category: "Espresso" | "Filter" | "Cold" | "Signature";
  price: string;
  notes: string;
};

export const drinks: Drink[] = [
  { name: "929 Espresso", category: "Espresso", price: "4.5", notes: "Dark chocolate · black cherry · long finish" },
  { name: "Flat White", category: "Espresso", price: "5.5", notes: "Silken texture · caramel · hazelnut" },
  { name: "Cortado", category: "Espresso", price: "5.0", notes: "Balanced · toffee · soft citrus" },
  { name: "V60 — Single Origin", category: "Filter", price: "6.5", notes: "Rotating origin · florals · clarity" },
  { name: "Chemex — Slow Table", category: "Filter", price: "7.0", notes: "Tea-like body · stone fruit · honey" },
  { name: "Cold Brew — 18h", category: "Cold", price: "6.0", notes: "Cacao nib · fig · velvet body" },
  { name: "Sage Tonic Espresso", category: "Cold", price: "7.0", notes: "Tonic · espresso · fresh sage leaf" },
  { name: "The 929 Ritual", category: "Signature", price: "9.0", notes: "Espresso + filter tasting set, served side by side" },
  { name: "Olive Blossom Latte", category: "Signature", price: "7.5", notes: "House olive-blossom syrup · sea salt" },
  { name: "Smoked Cascara Fizz", category: "Signature", price: "7.5", notes: "Cascara soda · smoked sugar rim" },
];

export type Origin = {
  slug: string;
  country: string;
  region: string;
  producer: string;
  processing: string;
  altitude: string;
  varietals: string;
  notes: string[];
  story: string;
};

export const origins: Origin[] = [
  {
    slug: "ethiopia-guji",
    country: "Ethiopia",
    region: "Guji Zone, Oromia",
    producer: "Dimtu Tero Farm",
    processing: "Natural, 21-day raised-bed drying",
    altitude: "1,900 – 2,200 m",
    varietals: "74110 · 74112 heirloom",
    notes: ["Blueberry", "Jasmine", "Bergamot"],
    story:
      "In the high forests of Guji, coffee still grows in the shade of native trees. Dimtu Tero's naturals are dried slowly on raised beds, turned by hand every hour of daylight.",
  },
  {
    slug: "colombia-huila",
    country: "Colombia",
    region: "San Agustín, Huila",
    producer: "Finca El Paraíso — Diego Bermúdez",
    processing: "Double anaerobic washed",
    altitude: "1,730 – 1,950 m",
    varietals: "Castillo · Pink Bourbon",
    notes: ["Red currant", "Panela", "Rosewater"],
    story:
      "Diego Bermúdez treats fermentation as an exact science — controlled tanks, measured hours, repeatable results. The cup is impossibly clean and expressive.",
  },
  {
    slug: "panama-boquete",
    country: "Panama",
    region: "Boquete, Chiriquí",
    producer: "Hacienda La Esmeralda",
    processing: "Washed, shade-dried",
    altitude: "1,600 – 1,800 m",
    varietals: "Geisha",
    notes: ["Orange blossom", "Papaya", "Earl Grey"],
    story:
      "The farm that introduced Geisha to the world. Volcanic soil, cloud cover and altitude conspire to produce one of the most celebrated cups in coffee.",
  },
  {
    slug: "kenya-nyeri",
    country: "Kenya",
    region: "Nyeri County",
    producer: "Gathaithi Cooperative Society",
    processing: "Washed, double-fermented",
    altitude: "1,700 – 1,850 m",
    varietals: "SL28 · SL34 · Ruiru 11",
    notes: ["Blackcurrant", "Grapefruit", "Tomato leaf"],
    story:
      "Smallholder cherries from the slopes of the Aberdare Range, processed at a washing station that has perfected Kenya's famous double fermentation.",
  },
  {
    slug: "brazil-cerrado",
    country: "Brazil",
    region: "Cerrado Mineiro",
    producer: "Fazenda Santa Margarida",
    processing: "Pulped natural",
    altitude: "1,050 – 1,200 m",
    varietals: "Yellow Catuaí · Mundo Novo",
    notes: ["Hazelnut", "Milk chocolate", "Dried apricot"],
    story:
      "The quiet backbone of our espresso. Sun-ripened cherries from the savanna plateau, milled on the farm and roasted for sweetness and body.",
  },
  {
    slug: "yemen-haraz",
    country: "Yemen",
    region: "Haraz Mountains",
    producer: "Smallholder terraces, Al-Ezzi collective",
    processing: "Natural, rooftop-dried",
    altitude: "2,000 – 2,400 m",
    varietals: "Udaini heirloom",
    notes: ["Dried fig", "Cardamom", "Dark honey"],
    story:
      "Coffee's oldest terraces. Ancient Udaini trees grown on stone-walled ledges, dried on rooftops the way it has been done for five centuries.",
  },
];

export type Branch = {
  name: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  focus: string;
  mapX: number; // % position on the stylized map
  mapY: number;
};

export const branches: Branch[] = [
  {
    name: "929 Flagship — The Roastery",
    district: "Downtown",
    address: "12 Foundry Lane",
    hours: "Daily 7:00 – 22:00",
    phone: "+20 100 929 0001",
    focus: "Roastery · slow bar · cupping room",
    mapX: 46,
    mapY: 42,
  },
  {
    name: "929 Corniche",
    district: "Waterfront",
    address: "Corniche Promenade, Kiosk 9",
    hours: "Daily 6:30 – 23:00",
    phone: "+20 100 929 0002",
    focus: "Espresso bar · sea-view terrace",
    mapX: 72,
    mapY: 28,
  },
  {
    name: "929 Garden District",
    district: "Old Town",
    address: "3 Jacaranda Square",
    hours: "Daily 8:00 – 21:00",
    phone: "+20 100 929 0003",
    focus: "Courtyard café · brunch kitchen",
    mapX: 30,
    mapY: 62,
  },
  {
    name: "929 University Quarter",
    district: "Midtown",
    address: "88 Scholars' Walk",
    hours: "Daily 7:30 – 24:00",
    phone: "+20 100 929 0004",
    focus: "Study lounge · filter flights",
    mapX: 58,
    mapY: 70,
  },
];

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  minutes: number;
  excerpt: string;
};

export const articles: Article[] = [
  {
    slug: "the-case-for-slower-mornings",
    title: "The Case for Slower Mornings",
    category: "Ritual",
    date: "June 2026",
    minutes: 6,
    excerpt:
      "A pour-over takes four minutes. What those four minutes give back is the argument of this essay.",
  },
  {
    slug: "reading-a-crema",
    title: "Reading a Crema",
    category: "Craft",
    date: "May 2026",
    minutes: 8,
    excerpt:
      "Tiger-flecked, hazel, thin or dense — the surface of an espresso is a report on everything that happened before it.",
  },
  {
    slug: "guji-after-the-rains",
    title: "Guji, After the Rains",
    category: "Origin",
    date: "April 2026",
    minutes: 12,
    excerpt:
      "Travel notes from three weeks in the Ethiopian highlands with the farmers behind our most floral lot.",
  },
  {
    slug: "water-the-invisible-ingredient",
    title: "Water, the Invisible Ingredient",
    category: "Craft",
    date: "March 2026",
    minutes: 7,
    excerpt:
      "Your cup is 98% water. A short chemistry of hardness, alkalinity, and why our bar remineralizes from zero.",
  },
  {
    slug: "designing-silence",
    title: "Designing Silence",
    category: "Spaces",
    date: "February 2026",
    minutes: 5,
    excerpt:
      "How we tuned the acoustics of the Flagship so a grinder never interrupts a conversation.",
  },
  {
    slug: "the-geometry-of-latte-art",
    title: "The Geometry of Latte Art",
    category: "Craft",
    date: "January 2026",
    minutes: 9,
    excerpt:
      "Symmetry, contrast, flow rate — a barista's rosetta is applied fluid dynamics you can drink.",
  },
];

export type Experience = {
  name: string;
  duration: string;
  price: string;
  description: string;
  seats: string;
};

export const experiences: Experience[] = [
  {
    name: "Public Cupping",
    duration: "60 min",
    price: "Complimentary",
    seats: "12 seats · Saturdays",
    description:
      "Taste the season's lots the way our buyers do — slurped from a spoon, scored in silence, discussed over a second bowl.",
  },
  {
    name: "Espresso Intensive",
    duration: "3 hours",
    price: "120",
    seats: "6 seats · weekly",
    description:
      "Dialing in, distribution, extraction theory and milk texture on the machines we use every day. Leave able to repeat a great shot.",
  },
  {
    name: "Manual Brewing Masterclass",
    duration: "2.5 hours",
    price: "95",
    seats: "8 seats · weekly",
    description:
      "V60, Chemex and AeroPress side by side. Grind, ratio, temperature and pour technique — and how each variable tastes.",
  },
  {
    name: "Sensory & Flavor Lab",
    duration: "2 hours",
    price: "110",
    seats: "10 seats · monthly",
    description:
      "Train your palate with aroma kits, triangulation tests and guided tastings across processing methods and roast profiles.",
  },
];
