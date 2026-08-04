import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=2000",
  story:
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1600",
  invite:
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1600",
  calendar:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1600",
  schedule:
    "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&q=80&w=1600",
  quote:
    "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&q=80&w=1600",
  locationA:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
  locationB:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200",
  locationsBg:
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=1600",
  upload:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1600",
  rsvp: "https://images.unsplash.com/photo-1515934751635-c81c6bc9efc1?auto=format&fit=crop&q=80&w=1600",
  footer:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=2000",
  gallery: [
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&q=80&w=1000",
  ],
};

export const vencanjePremiumDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-premium",
  meta: {
    title: "Mila & Luka — Premium Invitation",
    description: "Luxury editorial wedding invitation",
  },
  event: {
    date: "2026-09-12",
    rsvpDate: "2026-08-12",
    names: "Mila & Luka",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "cormorant",
    },
    colors: {
      base: {
        primary: {
          name: "Antique Gold",
          value: "#9c7a45",
        },
        secondary: {
          name: "Ink",
          value: "#1c1917",
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
        title: "Volume I — Our Wedding",
        subtitle: "The Wedding of",
        backgroundImage: IMG.hero,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Until we say I do",
        imageUrl: IMG.calendar,
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
          "Sa velikom radošću pozivamo Vas da budete deo dana kada naše dve priče postaju jedna — u tišini, ljubavi i zahvalnosti.",
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
        title: "Save the date",
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
        title: "Our story",
        overline: "Chapter one",
        text: "Upoznavanje je bilo tiho, gotovo slučajno — a ipak je sve nakon toga imalo smisla.\n\nGodine su prošle u putovanjima, večerama i malim trenucima koji su nas učinili nama.\n\nSada otvaramo novo poglavlje i želimo da ga pročitamo zajedno sa Vama.",
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
        title: "Order of the day",
        subtitle: "A quiet ceremony. An evening to remember.",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Ceremony",
            description: "Garden vows beneath the trees",
          },
          {
            id: "2",
            time: "16:30",
            title: "Reception",
            description: "Champagne and soft music",
          },
          {
            id: "3",
            time: "18:30",
            title: "Dinner",
            description: "Long tables, warm light",
          },
          {
            id: "4",
            time: "21:00",
            title: "First dance",
            description: "And then the night begins",
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
        title: "In all the world, there is no heart for me like yours.",
        description: "Maya Angelou",
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
        title: "The places",
        subtitle: "Where our day unfolds",
        imageUrl: IMG.locationsBg,
        cards: [
          {
            id: 1,
            title: "Ceremony",
            time: "15:00",
            location: "Villa Aurelia Gardens",
            text: "An open-air ceremony surrounded by olive trees and soft afternoon light.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Celebration",
            time: "18:30",
            location: "Villa Aurelia Hall",
            text: "Dinner, toasts and dancing in a candlelit hall.",
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
        title: "In frames",
        description: "Moments collected along the way",
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
        title: "Share a frame",
        subtitle: "Guest gallery",
        description: "If you capture a moment you love — leave it with us.",
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
        title: "Will you be there?",
        description: "Kindly reply by ",
        buttonText: "Send reply",
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
        title: "Thank you for being part of our story.",
        imageUrl: IMG.footer,
      },
    },
  ],
};
