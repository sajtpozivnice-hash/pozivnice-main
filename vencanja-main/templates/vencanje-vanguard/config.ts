import { UniversalProjectConfig } from "@/types/config";

export const vencanjeVanguardDefaultConfig = {
  template: "vencanje-vanguard",
  meta: {
    title: "Lana & Marko — Letterpress pozivnica",
    description: "Wood-type tipografija, papir i mastilo — bez fotografija",
  },
  event: {
    date: "2027-06-12",
    rsvpDate: "2027-05-12",
    names: "Lana & Marko",
  },
  theme: {
    fonts: {
      primary: "robotoCondensed",
      secondary: "lora",
    },
    colors: {
      base: {
        primary: {
          name: "Oxblood",
          value: "#8B2E2E",
        },
        secondary: {
          name: "Mastilo",
          value: "#121212",
        },
      },
      background: {
        name: "Papir",
        value: "#F3EFE6",
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
        title: "Subota u junu",
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
        title: "Do dana",
        description: "Brojimo u crnom mastilu.",
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
          "Pozivamo Vas da budete uz nas — jednostavno, jasno i od srca. Bez buke, sa punom pažnjom prema trenutku.",
      },
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: {
        title: "Datum",
        description: "Zabeležite dan u kalendaru.",
      },
    },
    {
      id: "ourStory",
      name: "Naša Priča",
      type: "ourStory",
      visible: true,
      order: 5,
      data: {
        title: "Priča",
        overline: "Folio",
        text: "Počelo je kao kratka rečenica. Zatim druga. Zatim godine koje su se složile kao listovi u štampi.\n\nNismo tražili spektakl. Tražili smo jasnoću — ko smo jedno uz drugo.\n\nOvaj dan je naslovna strana. Vi ste deo izdanja.",
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 6,
      data: {
        title: "Redosled",
        subtitle: "Četiri stavke",
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
        title: "Najjače stvari se kažu najmanje reči.",
        description: "Lana & Marko",
      },
    },
    {
      id: "locations",
      name: "Lokacije",
      type: "locations",
      visible: true,
      order: 8,
      data: {
        title: "Adrese",
        subtitle: "Dva mesta",
        cards: [
          {
            id: 1,
            title: "Crkveno venčanje",
            time: "16:00",
            location: "Crkva Svetog Marka, Beograd",
            text: "Molimo Vas da dođete petnaest minuta ranije.",
          },
          {
            id: 2,
            title: "Skup gostiju u sali",
            time: "18:00",
            location: "Restoran Press, Obilićev venac 12",
            text: "Doček, večera i ples. Parking u dvorišnoj ulici.",
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
        title: "Vaš kadar",
        subtitle: "Gosti",
        description: "Ako uhvatite trenutak — pošaljite ga ovde.",
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
        title: "Odgovor",
        description: "Molimo do ",
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
        title: "Vidimo se",
        subtitle: "Lana & Marko",
      },
    },
  ],
} as UniversalProjectConfig;
