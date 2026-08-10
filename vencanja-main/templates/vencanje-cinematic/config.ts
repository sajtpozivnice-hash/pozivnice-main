import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  poster:
    "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&q=80&w=2000",
  story:
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1600",
  invite:
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1600",
  countdown:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
  calendar:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1600",
  schedule:
    "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=1600",
  quote:
    "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&q=80&w=1600",
  locationA:
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=1400",
  locationB:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1400",
  locations:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1600",
  upload:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1600",
  rsvp: "https://images.unsplash.com/photo-1515934751635-c81c6bc9efc1?auto=format&fit=crop&q=80&w=1600",
  finale:
    "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=2000",
  gallery: [
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&q=80&w=1200",
  ],
};

export const vencanjeCinematicDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-cinematic",
  meta: {
    title: "Ana & Marko — Filmska priča",
    description: "Interaktivna filmska pozivnica za venčanje",
  },
  event: {
    date: "2026-10-03",
    rsvpDate: "2026-09-03",
    names: "Ana & Marko",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Ember",
          value: "#d4a574",
        },
        secondary: {
          name: "Void",
          value: "#070707",
        },
      },
    },
  },
  sections: [
    {
      id: "hero",
      name: "Početak priče",
      type: "hero",
      visible: true,
      order: 1,
      data: {
        title: "Ljubav u kadrovima",
        subtitle: "Scena 01",
        backgroundImage: IMG.poster,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Dan se bliži",
        imageUrl: IMG.countdown,
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
          "Pozivamo Vas u našu priču — ne kao goste jednog veče, već kao svedoke početka.",
        imageUrl: IMG.invite,
      },
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: {
        title: "Obeležite ovaj kadar",
        imageUrl: IMG.calendar,
      },
    },
    {
      id: "ourStory",
      name: "Naša Priča",
      type: "ourStory",
      visible: true,
      order: 5,
      data: {
        title: "Kako je počelo",
        overline: "Scena 02 — Susret",
        text: "Počelo je bez scenarija — jedan pogled, jedan razgovor, jedna tiha izvesnost.\n\nGodišnja doba prolazila su kao poglavlja. Gradovi su postajali scene. Obični dani postali su filmski.\n\nSada vas pozivamo da uđete u sledeći kadar sa nama.",
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
        title: "Dan, u nizu",
        subtitle: "Kadar po kadar",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Zavet",
            description: "Na otvorenom, meko svetlo",
          },
          {
            id: "2",
            time: "16:30",
            title: "Pauza",
            description: "Šampanjac i prvi zagrljaji",
          },
          {
            id: "3",
            time: "18:30",
            title: "Večera",
            description: "Dugi stolovi, topli glasovi",
          },
          {
            id: "4",
            time: "21:00",
            title: "Ples",
            description: "Dok ne prođu odjavne špice",
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
        title: "Ti si kadar u koji želim svaku uspomenu.",
        description: "Međunaslov",
        imageUrl: IMG.quote,
      },
    },
    {
      id: "locations",
      name: "Lokacije",
      type: "locations",
      visible: true,
      order: 8,
      data: {
        title: "Gde se priča odvija",
        subtitle: "Dve scene. Jedno veče.",
        imageUrl: IMG.locations,
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "15:00",
            location: "Villa Horizon Garden",
            text: "Zaveti pod otvorenim nebom.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Prijem",
            time: "18:30",
            location: "Villa Horizon Hall",
            text: "Večera, zdravice i noć.",
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
        title: "Kadovi",
        description: "Prevucite kroz traku",
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
        title: "Ostavite kadar",
        subtitle: "Vaš ugao",
        description: "Ako uhvatite trenutak — dodajte ga u našu traku.",
        imageUrl: IMG.upload,
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 11,
      data: {
        title: "Hoćete li se pojaviti u ovoj sceni?",
        description: "Odgovorite do ",
        buttonText: "Potvrdi",
        imageUrl: IMG.rsvp,
      },
    },
    {
      id: "footer",
      name: "Završna poruka",
      type: "footer",
      visible: true,
      order: 12,
      data: {
        title: "Hvala što gledate našu priču — i što je živite sa nama.",
        imageUrl: IMG.finale,
      },
    },
  ],
};
