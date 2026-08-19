import { UniversalProjectConfig } from "@/types/config";

export const vencanjeBohoDefaultConfig = {
  template: "vencanje-boho",
  meta: {
    title: "Mila & Luka — Boho pozivnica",
    description: "Terracotta, sage i script — zemljani boho, bez fotografija",
  },
  event: {
    date: "2027-07-24",
    rsvpDate: "2027-06-24",
    names: "Mila & Luka",
  },
  theme: {
    fonts: {
      primary: "greatVibes",
      secondary: "lora",
    },
    colors: {
      base: {
        primary: {
          name: "Terracotta",
          value: "#C56A4A",
        },
        secondary: {
          name: "Toplo braon",
          value: "#4A3F36",
        },
      },
      background: {
        name: "Pesak",
        value: "#F3EBE0",
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
        title: "Pod otvorenim nebom",
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
        title: "Do našeg dana",
        description: "Brojimo sunce, ne sate.",
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
          "Pozivamo Vas da budete uz nas — bosih nogu u pesku, srca širom otvorenih. Bez protokola, sa puno topline.",
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
        description: "Subota u julu — sunce i trava.",
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
        overline: "Kako smo stigli ovde",
        text: "Počelo je na putovanju — prašina na cipelama, smeh u džepovima.\n\nZatim su došli mirni dani: kafa, jutra, planovi nacrtani na papiru.\n\nSada biramo jedan dan da sve to proslavimo sa onima koje volimo.",
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
        subtitle: "Opusten ritam",
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Okupljanje",
            description: "Osveženje i lagani razgovori",
          },
          {
            id: "2",
            time: "16:00",
            title: "Ceremonija",
            description: "Zakletve na otvorenom",
          },
          {
            id: "3",
            time: "18:00",
            title: "Večera",
            description: "Dugi stolovi, deljena jela",
          },
          {
            id: "4",
            time: "21:00",
            title: "Ples",
            description: "Bosih nogu do zore",
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
        title: "Ti si moj omiljeni pejzaž.",
        description: "Mila & Luka",
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
        subtitle: "Dva mesta",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "16:00",
            location: "Vinograd Sunčeva dolina",
            text: "Dolazak petnaest minuta ranije. Udobna obuća.",
          },
          {
            id: 2,
            title: "Proslava",
            time: "18:00",
            location: "Isti vinograd — bašta",
            text: "Večera i ples pod svetlima.",
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
        title: "Vaši kadrovi",
        subtitle: "Gosti",
        description: "Uhvatite trenutak i pošaljite nam ga.",
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
        title: "Javite nam se",
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
        subtitle: "Sa ljubavlju — Mila & Luka",
      },
    },
  ],
} as UniversalProjectConfig;
