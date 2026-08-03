import { UniversalProjectConfig } from "@/types/config";

// koristi se SAMO za preview + početni edit
export const vencanje2DefaultConfig: UniversalProjectConfig = {
  template: "vencanje2",
  meta: { title: "test" },
  event: {
    date: "2026-08-08",
    rsvpDate: "2026-07-08",
    names: "Nevena & Jovan",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "lora",
    },
    colors: {
      base: {
        primary: {
          name: "Glavna",
          value: "#d4af37",
        },
        secondary: {
          name: "Sekundarna",
          value: "#1a1a1a",
        },
      },
    },
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      name: "Naslovna sekcija",

      visible: true,
      order: 1,
      data: { title: "hero title" },
    },
    {
      id: "coundown",
      name: "Odbrojavanje",

      type: "countdown",
      visible: true,
      order: 2,
      data: { title: "Countdown" },
    },
    {
      id: "ourStory",
      name: "Naša Priča",
      type: "ourStory",
      visible: true,
      order: 3,
      data: { title: "Our STory", cards: [] },
    },
    {
      id: "locations",
      name: "Lokacije",

      type: "locations",
      visible: true,
      order: 4,
      data: { title: "Schedule iz vencanja 2" },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",

      type: "rsvp",
      visible: true,
      order: 5,
      data: { title: "Schedule iz vencanja 2" },
    },
    {
      id: "footer",
      name: "Završna poruka",

      type: "footer",
      visible: true,
      order: 6,
      data: { title: "Schedule iz vencanja 2" },
    },
  ],
};
