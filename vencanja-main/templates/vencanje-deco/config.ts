import { UniversalProjectConfig } from "@/types/config";

export const vencanjeDecoDefaultConfig = {
  template: "vencanje-deco",
  meta: {
    title: "Sofija & Nikola — Art Deco pozivnica",
    description: "Geometrijska elegancija, zlatni akcenti i tipografija — bez fotografija",
  },
  event: {
    date: "2027-09-18",
    rsvpDate: "2027-08-18",
    names: "Sofija & Nikola",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Antik zlato",
          value: "#A8893A",
        },
        secondary: {
          name: "Crno mastilo",
          value: "#161412",
        },
      },
      background: {
        name: "Slonovača",
        value: "#F6F1E8",
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
        title: "Svečano vas pozivamo",
        subtitle: "Venčanje",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Do velikog dana",
        description: "Svaki trenutak bliže proslavi.",
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
          "Sa velikim zadovoljstvom molimo za čast Vašeg prisustva na svečanosti našeg venčanja. Dođite u svojoj najlepšoj večernjoj eleganciji.",
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
        description: "Subota u septembru — zabeležite u kalendaru.",
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
        overline: "Poglavlje",
        text: "Upoznavanje je bilo tiho — kao prvi takt orkestra pre nego što sala planira.\n\nGodine su se slagale: večere, putovanja, obećanja izgovorena šapatom.\n\nOvaj dan je vrhunac — zlatna linija koja spaja sve što smo bili sa onim što ćemo biti.",
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 6,
      data: {
        title: "Program dana",
        subtitle: "Redosled svečanosti",
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
        title: "Gde god si ti, tu je i moj dom.",
        description: "Sofija & Nikola",
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
        subtitle: "Dve adrese",
        cards: [
          {
            id: 1,
            title: "Crkveno venčanje",
            time: "16:00",
            location: "Crkva Svetog Marka, Beograd",
            text: "Molimo Vas da stignete petnaest minuta ranije.",
          },
          {
            id: 2,
            title: "Skup gostiju u sali",
            time: "18:00",
            location: "Restoran Deco, Terazije 8",
            text: "Doček, večera i ples.",
          },
        ],
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "Vaši trenuci",
        subtitle: "Fotografije gostiju",
        description: "Podelite kadar sa nama — čuvamo uspomene zajedno.",
        buttonText: "Pošalji fotografiju",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 10,
      data: {
        title: "Potvrdite dolazak",
        description: "Molimo odgovorite do ",
        buttonText: "Pošalji",
      },
    },
    {
      id: "footer",
      name: "Završna poruka",
      type: "footer",
      visible: true,
      order: 11,
      data: {
        title: "Sa ljubavlju",
        subtitle: "Sofija & Nikola",
      },
    },
  ],
} as UniversalProjectConfig;
