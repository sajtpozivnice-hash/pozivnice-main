import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1537633552985-cf699e1542d0?auto=format&fit=crop&w=2000&q=85",
  story:
    "https://images.unsplash.com/photo-1721635513009-4bd5d277c437?auto=format&fit=crop&w=1600&q=85",
  invite:
    "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1400&q=85",
  calendar:
    "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1400&q=85",
  schedule:
    "https://images.unsplash.com/photo-1606216794074-7417dc8b62a0?auto=format&fit=crop&w=1400&q=85",
  quote:
    "https://images.unsplash.com/photo-1502635385003-ee052e304ee8?auto=format&fit=crop&w=1400&q=85",
  locationA:
    "https://images.unsplash.com/photo-1494951334922-3a4b05f9d350?auto=format&fit=crop&w=1000&q=85",
  locationB:
    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=85",
  upload:
    "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1400&q=85",
  rsvp: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1400&q=85",
  footer:
    "https://images.unsplash.com/photo-1721635513009-4bd5d277c437?auto=format&fit=crop&w=1600&q=85",
};

const GALLERY = [
  IMG.hero,
  IMG.story,
  IMG.invite,
  IMG.calendar,
  IMG.schedule,
  IMG.quote,
];

export const vencanjeOpalDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-opal",
  meta: {
    title: "Elena & David — Biserna pozivnica",
    description:
      "Luksuzna pozivnica za venčanje — biserni tonovi i translucentni slojevi",
  },
  event: {
    date: "2026-07-11",
    rsvpDate: "2026-06-11",
    names: "Elena & David",
  },
  theme: {
    fonts: {
      primary: "cormorant",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Biser",
          value: "#C9A9A0",
        },
        secondary: {
          name: "Ugalj",
          value: "#3A3532",
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
        title: "Naš dan počinje ovde",
        subtitle: "Venčanje",
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
        title: "Do našeg dana",
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
          "Sa radošću Vas pozivamo da budete deo dana kada naše dve priče postaju jedna — u svetlosti, smehu i zahvalnosti.",
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
        title: "Sačuvajte datum",
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
        title: "Naša priča",
        overline: "Kako je počelo",
        text: "Sve je počelo tihim razgovorom koji je trajao duže od očekivanog.\n\nZatim su došli dani ispunjeni putovanjima, zajedničkim jutrima i osećajem da smo stigli kući.\n\nSada otvaramo novo poglavlje i želimo da ga podelimo sa Vama.",
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
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Ceremonija",
            description: "Zaveti u vrtu, pod mekim svetlom",
          },
          {
            id: "2",
            time: "16:30",
            title: "Koktel",
            description: "Čaša i zagrljaji",
          },
          {
            id: "3",
            time: "18:30",
            title: "Večera",
            description: "Dugi stolovi, topla atmosfera",
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
        description: "— Elena & David",
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
        title: "Gde se nalazimo",
        subtitle: "Dve scene istog dana",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "15:00",
            location: "Vila Biser — vrt",
            text: "Zaveti na otvorenom, okruženi najdražim ljudima.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "18:30",
            location: "Vila Biser — sala",
            text: "Večera, zdravice i ples u mekoj svetlosti.",
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
        description: "Mali kadrovi naše priče",
        images: GALLERY.map((url) => ({ url })),
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
        subtitle: "Galerija gostiju",
        description: "Ako uhvatite trenutak koji volite — ostavite ga kod nas.",
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
        title: "Hoćete li biti tu?",
        description: "Ljubazno odgovorite do ",
        buttonText: "Pošalji odgovor",
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
        title: "Hvala što ste deo naše priče.",
        imageUrl: IMG.footer,
      },
    },
  ],
};
