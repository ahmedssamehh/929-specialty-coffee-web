/**
 * Local photography (public/images), audited and mapped by actual content —
 * several filenames don't match their subject, so always go through this map.
 */

export type Photo = { src: string; alt: string };

export const photos = {
  cupsToast: {
    src: "/images/espresso-cup.jpg",
    alt: "Three friends raising lattes and a cold brew over a café table",
  },
  beansTexture: {
    src: "/images/beans-bag.jpg",
    alt: "Freshly roasted coffee beans filling the frame",
  },
  lattesPlants: {
    src: "/images/latte-art.jpg",
    alt: "Flat whites with rosetta art on a wooden bar between potted plants",
  },
  chemexPour: {
    src: "/images/barista-pour.jpg",
    alt: "A barista pouring a gooseneck kettle over a Chemex brewer",
  },
  dinnerTable: {
    src: "/images/table-editorial.jpg",
    alt: "A plated dish and wine glasses on a warm bistro table",
  },
  cafeSign: {
    src: "/images/cafe-warm.jpg",
    alt: "A marquee CAFE sign glowing over a dark espresso bar",
  },
  cafeChalkboard: {
    src: "/images/cafe-counter.jpg",
    alt: "A calm café room with a chalkboard menu and rattan chairs",
  },
  cafeIndustrial: {
    src: "/images/cafe-interior.jpg",
    alt: "An industrial café interior with long oak tables",
  },
  cuppingCircle: {
    src: "/images/coffee-morning.jpg",
    alt: "Eight cups from light to black arranged in a tasting circle",
  },
  portafilters: {
    src: "/images/chemex-brew.jpg",
    alt: "Portafilters holding a flat white, fresh grounds and whole beans",
  },
  beansSack: {
    src: "/images/v60-brew.jpg",
    alt: "A burlap sack overflowing with freshly roasted beans",
  },
  cafeBulbs: {
    src: "/images/cafe-light.jpg",
    alt: "A white-brick café counter under warm filament bulbs",
  },
  cupOnBeans: {
    src: "/images/beans-roast.jpg",
    alt: "A cappuccino on a saucer surrounded by spilled coffee beans",
  },
  blackCoffee: {
    src: "/images/coffee-dark.jpg",
    alt: "A black coffee in a white cup on a glass table",
  },
  espressoPour: {
    src: "/images/latte-heart.jpg",
    alt: "Espresso streaming into a steaming white cup",
  },
  greenhouseTable: {
    src: "/images/cafe-table.jpg",
    alt: "A french press and cups on a round table in a plant-filled conservatory",
  },
  latteOnBeans: {
    src: "/images/coffee-flatlay.jpg",
    alt: "A tulip latte set into a bed of roasted coffee beans",
  },
  icedCoffee: {
    src: "/images/coffee-notes.jpg",
    alt: "Cream swirling through a glass of iced coffee",
  },
  teaCeremony: {
    src: "/images/beans-scoop.jpg",
    alt: "A dark teapot and tasting bowls on a bamboo tray",
  },
  coffeeInBed: {
    src: "/images/espresso-machine.jpg",
    alt: "A slow morning coffee on a marble board among linen",
  },
} satisfies Record<string, Photo>;
