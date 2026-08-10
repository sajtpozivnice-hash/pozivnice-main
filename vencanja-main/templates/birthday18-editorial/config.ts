import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  hero:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
  intro:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
  night:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
  schedule:
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
  dress:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  final:
    "https://images.unsplash.com/photo-1524504388940-b1c17226555e?auto=format&fit=crop&w=1600&q=85",
  upload:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85",
};

export const birthday18EditorialDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-editorial",
  eventType: "comingOfAge",
  meta: {
    title: "Lena — The Birthday Issue",
    description: "Editorial digitalna pozivnica za 18. rođendan",
  },
  event: {
    date: "2026-09-18",
    rsvpDate: "2026-09-05",
    names: "Lena",
    location: {
      name: "Studio 18",
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
          name: "Cherry",
          value: "#E11D48",
        },
        secondary: {
          name: "Ink",
          value: "#0A0A0A",
        },
        ternary: {
          name: "Cobalt",
          value: "#1D4ED8",
        },
      },
      background: {
        name: "Ivory",
        value: "#F4EFE6",
      },
      backgroundSecondary: {
        name: "Paper",
        value: "#EDE6DA",
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
        subtitle: "BIRTHDAY ISSUE",
        description: "THE MAIN CHARACTER",
        badge: "VOL. 18",
        ctaText: "I'M IN",
        ctaHref: "#rsvp",
        backgroundImage: IMG.hero,
        image: IMG.hero,
      },
    },
    {
      id: "inviteText",
      name: "Uvod",
      type: "inviteText",
      visible: true,
      order: 2,
      data: {
        description:
          "18 YEARS\nIN THE MAKING.\n\nJedna noć. Jedan veliki broj. I ekipa bez koje ne bi bilo isto.",
        imageUrl: IMG.intro,
      },
    },
    {
      id: "locations",
      name: "About the night",
      type: "locations",
      visible: true,
      order: 3,
      data: {
        title: "ABOUT THE NIGHT",
        subtitle: "THE DETAILS",
        description: "Sve što treba da znaš pre nego što kreneš.",
        imageUrl: IMG.night,
        cards: [
          {
            id: 1,
            title: "Studio 18",
            subtitle: "YOUR BEST LOOK",
            location: "Knez Mihailova 18, Beograd",
            time: "20:00",
            text: "Ulaz od 20:00. Parking u blizini.",
            image: IMG.night,
            icon: "map-pin",
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
        title: "UNTIL THE ISSUE DROPS",
        description: "COUNTDOWN",
      },
    },
    {
      id: "schedule",
      name: "The night",
      type: "schedule",
      visible: true,
      order: 5,
      data: {
        title: "THE NIGHT",
        subtitle: "RUN OF SHOW",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "20:00",
            title: "ARRIVAL",
            description: "Check-in, first frames, first drinks.",
          },
          {
            id: "2",
            time: "21:00",
            title: "DINNER",
            description: "Toast, torta i zajednički sto.",
          },
          {
            id: "3",
            time: "22:00",
            title: "MUSIC",
            description: "DJ set. Dance floor open.",
          },
          {
            id: "4",
            time: "00:00",
            title: "THE AFTER PARTY",
            description: "Noć traje dok traje energija.",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Dress code",
      type: "featureCards",
      visible: true,
      order: 6,
      data: {
        title: "DRESS CODE",
        subtitle: "STYLE NOTE",
        description: "COME AS YOUR BEST SELF",
        cards: [
          {
            id: "1",
            title: "BLACK / RED / WHATEVER LOOKS GOOD",
            description:
              "Obuci ono u čemu se osećaš najbolje. Večeras si na naslovnoj.",
            icon: "shirt",
            accent: "#E11D48",
            image: IMG.dress,
          },
        ],
      },
    },
    {
      id: "rsvp",
      name: "RSVP",
      type: "rsvp",
      visible: true,
      order: 7,
      data: {
        title: "ARE YOU IN?",
        description:
          "Potvrdi dolazak i budi deo ove noći. Javi nam najkasnije do ",
        buttonText: "I'M IN",
        messageLabel: "Poruka za slavljenika",
        messagePlaceholder: "Leave a message…",
        imageUrl: IMG.final,
      },
    },
    {
      id: "loveQuote",
      name: "Final",
      type: "loveQuote",
      visible: true,
      order: 8,
      data: {
        title: "SEE YOU\nON THE OTHER SIDE\nOF 18.",
        description: "Let's make 18 count.",
        imageUrl: IMG.final,
      },
    },
    {
      id: "uploadImagesSection",
      name: "Fotografije gostiju",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "SHOT LIST",
        subtitle: "GUEST FRAMES",
        description:
          "Uhvati kadar sa noći i pošalji ga u privatnu galeriju slavljenika.",
        buttonText: "Upload frame",
        imageUrl: IMG.upload,
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "THE BIRTHDAY ISSUE",
        subtitle: "LENA · VOL. 18 · 2026",
        description: "Hvala što si deo naslovne.",
      },
    },
  ],
};
