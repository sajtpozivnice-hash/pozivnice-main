import { UniversalProjectConfig } from "@/types/config";

/** Royalty-free Unsplash images — only in config, never in components */
const IMG = {
  sharedBackground:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067139/alvin-mahmudov-NSVJAAXOYHs-unsplash_szart3.jpg",
  story:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787314339/alejandra-quiroz-F5hTTI4Hlv4-unsplash_yuoe8o.jpg",
  locationA:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787090506/wedding/jaakko-perala-norway-elopement-photographer-71BLG9XJtHk-unsplash.jpg",
  locationB:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023761/photo-1527529482837-4698179dc6ce_x4mmyo.avif",
  footerAccent:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787311946/engin-akyurt-3IN8pjVpDw0_wgstac.jpg",
 
};

export const vencanjeBackgroundDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-background",
  meta: {
    title: "Ema & Nikola — Pozivnica sa pozadinom",
    description: "Venčana pozivnica sa jednom pozadinom i staklenim panelima",
  },
  event: {
    date: "2027-11-14",
    rsvpDate: "2027-10-14",
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
        secondary: {
          name: "Staklo",
          value: "#0c0a09",
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
            location: "Vila Aurora — sala",
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
