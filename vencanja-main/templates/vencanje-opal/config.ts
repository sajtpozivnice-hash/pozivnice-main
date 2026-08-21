import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146485/hisu-lee-FTW8ADj5igs-unsplash_vwsxdb.jpg",
  story:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146696/photo-1721635513009-4bd5d277c437_zhohbj.avif",
  invite:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146655/photo-1510076857177-7470076d4098_srlt0i.avif",
  calendar:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067244/sandy-millar-YeJWDWeIZho-unsplash_mueywh.jpg",
  quote:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146967/megs-harrison-QS3V8Nd3z40-unsplash_fqmnsv.jpg",
  locationA:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067103/leonardo-miranda-riHGdvluDk8-unsplash_ig1ghq.jpg",
  locationB:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787147669/photo-1545232979-8bf68ee9b1af_qmzfuc.avif",
  rsvp: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146485/hisu-lee-FTW8ADj5igs-unsplash_vwsxdb.jpg",
  footer:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146696/photo-1721635513009-4bd5d277c437_zhohbj.avif",
};

export const vencanjeOpalDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-opal",
  meta: {
    title: "Elena & David — Biserna pozivnica",
    description:
      "Luksuzna pozivnica za venčanje — biserni tonovi i translucentni slojevi",
  },
  event: {
    date: "2027-07-11",
    rsvpDate: "2027-06-11",
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
      background: {
        name: "Biser",
        value: "#F7F4F0",
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
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Crkveno venčanje",
            description: "Svečani čin venčanja u crkvi",
          },
          {
            id: "2",
            time: "18:00",
            title: "Skup gostiju u sali",
            description: "Doček, večera i slavlje",
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
            title: "Crkveno venčanje",
            time: "16:00",
            location: "Crkva Svetog Marka, Beograd",
            text: "Molimo Vas da stignete petnaest minuta ranije.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Skup gostiju u sali",
            time: "18:00",
            location: "Vila Biser — sala",
            text: "Doček, večera i ples.",
            image: IMG.locationB,
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
        subtitle: "Galerija gostiju",
        description: "Ako uhvatite trenutak koji volite — ostavite ga kod nas.",
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
