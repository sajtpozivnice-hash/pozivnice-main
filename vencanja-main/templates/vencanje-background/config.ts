import { UniversalProjectConfig } from "@/types/config";

/** Royalty-free Unsplash images — only in config, never in components */
const IMG = {
  sharedBackground:
    "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&w=2400&q=85",
  story:
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1400&q=85",
  locationA:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
  locationB:
    "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&w=1200&q=85",
  footerAccent:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9efc1?auto=format&fit=crop&w=1000&q=85",
  ],
};

export const vencanjeBackgroundDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-background",
  meta: {
    title: "Ema & Nikola — Background Invitation",
    description: "Single-background floating glass wedding invitation",
  },
  event: {
    date: "2026-11-14",
    rsvpDate: "2026-10-14",
    names: "Ema & Nikola",
  },
  theme: {
    fonts: {
      primary: "playfair",
    },
    colors: {
      base: {
        primary: {
          name: "Champagne",
          value: "#e2c4a0",
        },
      },
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&w=2400&q=85",
  },
  sections: [
    {
      id: "hero",
      name: "Naslovna sekcija",
      type: "hero",
      visible: true,
      order: 1,
      data: {
        title: "Jedna fotografija. Cela priča.",
        subtitle: "Sa ljubavlju Vas pozivamo",
        backgroundImage: IMG.sharedBackground,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Do našeg dana",
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
          "Budite sa nama dok naše dve priče postaju jedna — u svetlosti, smehu i zahvalnosti.",
      },
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: {
        title: "Sačuvajte datum",
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
        overline: "Kako je počelo",
        text: "Sve je počelo jednostavno — razgovorom koji je trajao duže od očekivanog.\n\nZatim su došli dani ispunjeni putovanjima, tihim jutrima i osećajem da smo stigli kući.\n\nSada otvaramo novo poglavlje i želimo da ga podelimo sa Vama.",
        image: IMG.story,
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
        subtitle: "Lagano, lepo, naše",
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
            description: "Čaša šampanjca i zagrljaji",
          },
          {
            id: "3",
            time: "18:30",
            title: "Večera",
            description: "Dugi stolovi, toplo svetlo",
          },
          {
            id: "4",
            time: "21:00",
            title: "Ples",
            description: "Do kasnih sati",
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
        title: "U tebi sam pronašao/la svoj mir i svoj smeh.",
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
        subtitle: "Dve scene istog dana",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "15:00",
            location: "Vila Aurora — vrt",
            text: "Zaveti u prirodi, okruženi najdražim ljudima.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "18:30",
            location: "Vila Aurora — sala",
            text: "Večera, zdravice i ples.",
            image: IMG.locationB,
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
        title: "Trenuci",
        description: "Fragmenti koje čuvamo",
        images: IMG.gallery.map((url) => ({ url })),
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
        subtitle: "Vaš pogled",
        description: "Ako uslikate trenutak — podelite ga sa nama.",
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
        imageUrl: IMG.footerAccent,
      },
    },
  ],
};
