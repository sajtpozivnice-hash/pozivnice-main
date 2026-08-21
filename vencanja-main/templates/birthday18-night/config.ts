import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  hero:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787345364/fidel-fernando-249DzAuJTqQ-unsplash_n7asm2.jpg",
  venue:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787345422/photo-1566737236500-c8ac43014a67_vauy18.avif",
  dress:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787345364/fidel-fernando-249DzAuJTqQ-unsplash_n7asm2.jpg",
};

export const birthday18NightDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-night",
  eventType: "comingOfAge",
  meta: {
    title: "Marko — Noć počinje sada",
    description: "Premium dark nightlife pozivnica za 18. rođendan",
  },
  event: {
    date: "2027-09-18",
    rsvpDate: "2027-09-05",
    names: "Marko",
    location: {
      name: "Skyline Club",
      address: "Beograd",
    },
  },
  theme: {
    fonts: {
      primary: "robotoCondensed",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Cijan",
          value: "#3DF0E0",
        },
        secondary: {
          name: "Svetla",
          value: "#FFFFFF",
        },
        ternary: {
          name: "Siva",
          value: "#C5CDD8",
        },
      },
      background: {
        name: "Tamna",
        value: "#07090C",
      },
      backgroundSecondary: {
        name: "Grafit",
        value: "#12171E",
      },
    },
  },
  sections: [
    {
      id: "hero",
      name: "Naslovna",
      type: "hero",
      visible: true,
      order: 1,
      data: {
        title: "18",
        subtitle: "NOĆ\nPOČINJE SADA",
        description: "ROĐENDANSKO IZDANJE",
        badge: "VOL. 18",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
        backgroundImage: IMG.hero,
      },
    },
    {
      id: "inviteText",
      name: "Izjava",
      type: "inviteText",
      visible: true,
      order: 2,
      data: {
        description: "18.\nJEDNA NOĆ.\nBEZ PONAVLJANJA.",
      },
    },
    {
      id: "locations",
      name: "Detalji i lokacija",
      type: "locations",
      visible: true,
      order: 3,
      data: {
        title: "DETALJI",
        subtitle: "INFORMACIJE",
        description: "Sve što treba da znaš pre nego što kreneš.",
        cards: [
          {
            id: 1,
            title: "Skyline Club",
            subtitle: "BEOGRAD",
            location: "Bulevar kralja Aleksandra 12, Beograd",
            time: "20:00",
            text: "Ulaz od 20:00. Lista na vratima.",
            image: IMG.venue,
          },
        ],
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 4,
      data: {
        title: "DO POČETKA NOĆI",
        description: "ODBROJAVANJE",
      },
    },
    {
      id: "schedule",
      name: "Veče",
      type: "schedule",
      visible: true,
      order: 5,
      data: {
        title: "VEČE",
        subtitle: "REDOSLED PROGRAMA",
        items: [
          {
            id: "1",
            time: "20:00",
            title: "DOLAZAK",
            description: "Prijava. Prvi kadrovi. Prvi napici.",
          },
          {
            id: "2",
            time: "21:00",
            title: "VEČERA",
            description: "Zajednički sto. Toast. Energija raste.",
          },
          {
            id: "3",
            time: "22:00",
            title: "MUZIKA",
            description: "DJ set. Plesni podijum je otvoren.",
          },
          {
            id: "4",
            time: "00:00",
            title: "AFTER ŽURKA",
            description: "Noć traje dok traje ritam.",
          },
          {
            id: "5",
            time: "01:00",
            title: "BEZ PLANA",
            description: "Odavde — kako krene.",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Kodeks odevanja",
      type: "featureCards",
      visible: true,
      order: 6,
      data: {
        title: "KODEKS ODEVANJA",
        subtitle: "STIL",
        description: "CRNO · BELO · TVOJ STIL",
        cards: [
          {
            id: "1",
            title: "ELEGANNO LEŽERNO",
            description:
              "Čisto. Samouvereno. Bez forsiranja — tvoj stil, samo oštrije.",
            icon: "shirt",
            accent: "#3DF0E0",
            image: IMG.dress,
          },
        ],
      },
    },
    {
      id: "rsvp",
      name: "Potvrda prisustva",
      type: "rsvp",
      visible: true,
      order: 7,
      data: {
        title: "JESI LI U IGRI?",
        description:
          "Potvrdi dolazak i budi deo večeri. Javi nam najkasnije do ",
        buttonText: "Potvrdi dolazak",
        messageLabel: "Poruka za slavljenika",
        messagePlaceholder: "Ostavi poruku…",
      },
    },
    {
      id: "loveQuote",
      name: "Finale",
      type: "loveQuote",
      visible: true,
      order: 8,
      data: {
        title: "VIDIMO SE\nVEČERAS.",
        description: "18 POČINJE SADA.",
      },
    },
    {
      id: "uploadImagesSection",
      name: "Fotografije gostiju",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "UHVATI NOĆ",
        subtitle: "KADROVI GOSTIJU",
        description:
          "Uhvati kadar sa večeri i pošalji ga u privatnu galeriju.",
        buttonText: "Pošalji fotografiju",
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "NOĆ POČINJE SADA",
        subtitle: "MARKO · VOL. 18 · 2026",
        description: "Hvala što dolaziš.",
      },
    },
  ],
};
