import { UniversalProjectConfig } from "@/types/config";

const BG = {
  ceremony:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067139/alvin-mahmudov-NSVJAAXOYHs-unsplash_szart3.jpg",
  couple:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787046392/wedding/jeremy-wong-weddings-464ps_nOflw-unsplash.jpg",
  evening:
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=2000",
  details:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=2000",
  reception:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067103/leonardo-miranda-riHGdvluDk8-unsplash_ig1ghq.jpg",
  night:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067139/alvin-mahmudov-NSVJAAXOYHs-unsplash_szart3.jpg",
};

export const vencanje4DefaultConfig: UniversalProjectConfig = {
  template: "vencanje4",
  meta: {
    title: "Nevena & Jovan — Filmska pozivnica",
    description: "Pozivnica za venčanje preko celog ekrana",
  },
  event: {
    date: "2026-08-08",
    rsvpDate: "2026-07-08",
    names: "Nevena & Jovan",
  },
  theme: {
    fonts: {
      primary: "parisienne",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Champagne",
          value: "#c9a86a",
        },
        secondary: {
          name: "Night",
          value: "#0c0b0a",
        },
      },
    },
  },
  sections: [
    {
      id: "hero",
      name: "Naslovna sekcija",
      type: "hero",
      visible: true,
      order: 1,
      data: {
        title: "Jedna večnost. Jedan dan.",
        subtitle: "Sa ljubavlju Vas pozivamo",
        backgroundImage: BG.ceremony,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Do trenutka koji čekamo",
        imageUrl: BG.evening,
      },
    },
    {
      id: "inviteText",
      name: "Tekst Pozivnice",
      type: "inviteText",
      visible: true,
      order: 3,
      data: {
        description:
          "Budite sa nama dok izgovaramo naše „da“ i započinjemo zajednički život ispunjen smehom, nežnošću i beskrajnom ljubavlju.",
        imageUrl: BG.details,
      },
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: {
        title: "Sačuvajte ovaj dan",
        imageUrl: BG.reception,
      },
    },
    {
      id: "ourStory",
      name: "Naša Priča",
      type: "ourStory",
      visible: true,
      order: 5,
      data: {
        title: "Naša priča",
        overline: "Poglavlje jedno",
        text: "Sve je počelo tiho — jednim pogledom, jednim razgovorom, jednim osećajem da smo stigli kući.\n\nDani su postali meseci, a meseci godine ispunjene putovanjima, smehom i malim trenucima koji su nas spojili zauvek.\n\nSada stojimo na pragu našeg najlepšeg poglavlja i želimo da ga podelimo sa Vama.",
        image: BG.couple,
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 6,
      data: {
        title: "Tok dana",
        subtitle: "Jedna večer, nekoliko magičnih trenutaka",
        imageUrl: BG.evening,
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Ceremonija",
            description: "Vrt pod otvorenim nebom",
          },
          {
            id: "2",
            time: "16:30",
            title: "Koktel",
            description: "Terasa sa pogledom",
          },
          {
            id: "3",
            time: "18:30",
            title: "Večera",
            description: "Svečana sala",
          },
          {
            id: "4",
            time: "21:00",
            title: "Ples",
            description: "Do zore",
          },
        ],
      },
    },
    {
      id: "loveQuote",
      name: "Ljubavni Citat",
      type: "loveQuote",
      visible: true,
      order: 7,
      data: {
        title: "U tebi sam pronašao/la svoj mir, svoj smeh i svoj dom.",
        imageUrl: BG.night,
      },
    },
    {
      id: "locations",
      name: "Lokacije",
      type: "locations",
      visible: true,
      order: 8,
      data: {
        title: "Gde se nalazimo",
        subtitle: "Dve scene. Jedna priča.",
        imageUrl: BG.reception,
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "15:00",
            location: "Vila Atina — vrt",
            text: "Izgovaramo naše zavete okruženi zelenilom i najdražim ljudima.",
          },
          {
            id: 2,
            title: "Proslava",
            time: "18:30",
            location: "Vila Atina — sala",
            text: "Večera, zdravice i ples pod zlatnim svetlom.",
          },
        ],
      },
    },
    {
      id: "ourGallery",
      name: "Galerija",
      type: "ourGallery",
      visible: true,
      order: 9,
      data: {
        title: "Kadrove koje čuvamo",
        description: "Fragmenti trenutaka koji nas čine nama",
        images: [
          {
            url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1000",
          },
          {
            url: "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=1000",
          },
          {
            url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000",
          },
          {
            url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000",
          },
          {
            url: "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&q=80&w=1000",
          },
          {
            url: "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&q=80&w=1000",
          },
        ],
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 10,
      data: {
        title: "Podelite kadar",
        subtitle: "Vaš pogled na naš dan",
        description:
          "Ako uslikate trenutak koji Vas dirne — podelite ga sa nama.",
        imageUrl: BG.details,
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 11,
      data: {
        title: "Hoćete li biti tu?",
        description: "Potvrdite dolazak do ",
        buttonText: "Pošalji potvrdu",
        imageUrl: BG.night,
      },
    },
    {
      id: "footer",
      name: "Završna poruka",
      type: "footer",
      visible: true,
      order: 12,
      data: {
        title: "Hvala što ste deo naše priče.",
        imageUrl: BG.night,
      },
    },
  ],
};
