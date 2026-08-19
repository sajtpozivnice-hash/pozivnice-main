import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087127/photo-1522673607200-164d1b6ce486_esxvqd.avif",
};

export const vencanjeNavyDefaultConfig = {
  template: "vencanje-navy",
  meta: {
    title: "Teodora & Mihajlo — Formalna pozivnica",
    description: "Navy i champagne black-tie pozivnica za večernje venčanje",
  },
  event: {
    date: "2027-10-17",
    rsvpDate: "2027-09-17",
    names: "Teodora & Mihajlo",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Champagne brass",
          value: "#D4AF7A",
        },
        secondary: {
          name: "Ivory",
          value: "#F6F1E8",
        },
      },
      background: {
        name: "Navy",
        value: "#0B1C2C",
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
        title: "Crno-bela večer",
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
        title: "Do svečanog trenutka",
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
          "Sa velikim poštovanjem molimo za čast Vašeg prisustva na svečanosti našeg venčanja — u krugu porodice i najbližih prijatelja.",
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
        overline: "Poglavlja",
        text: "Upoznavanje je bilo tiho — večera, razgovor koji nije hteo da se završi, i osećaj da smo već negde bili zajedno.\n\nGodine su prošle u putovanjima, zdravicama i malim ritualima koji su nas učinili nama.\n\nSada otvaramo večernje poglavlje i želimo da ga podelimo sa Vama — formalno, ali od srca.",
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 6,
      data: {
        title: "Program večeri",
        subtitle: "Crno-beli dress code. Formalna atmosfera.",
        items: [
          {
            id: "1",
            time: "17:00",
            title: "Ceremonija",
            description: "Svečani trenutak kada izgovaramo svoje sudbonosno „da“.",
          },
          {
            id: "2",
            time: "17:30",
            title: "Prvi Ples",
            description: "Naš prvi ples kao supružnika i početak zajedničke proslave.",
          },
          {
            id: "3",
            time: "20:00",
            title: "Večera",
            description: "Uživanje u svečanoj večeri, dobroj hrani i dragim ljudima.",
          },
          {
            id: "4",
            time: "22:00",
            title: "Torta",
            description: "Slatki trenutak koji ćemo zajedno zasladiti i proslaviti.",
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
        title: "Gde god si ti — tamo je i moj mir.",
        description: "—",
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
        subtitle: "Program lokacija",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "17:00",
            location: "Hotel Metropol Palace — Svečana sala",
            text: "Ulaz sa Bulevara kralja Aleksandra. Goste dočekujemo od 16:30.",
          },
          {
            id: 2,
            title: "Proslava",
            time: "17:30",
            location: "Hotel Metropol Palace — Ballroom",
            text: "Večera, zdravice i ples. Dress code: black-tie / večernja toaleta.",
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
        title: "Podelite kadar",
        subtitle: "Galerija gostiju",
        description:
          "Ako uhvatite trenutak sa naše večeri — ostavite ga u našoj galeriji.",
        buttonText: "Dodajte fotografiju",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 10,
      data: {
        title: "Potvrdite prisustvo",
        description: "Ljubazno odgovorite do ",
        buttonText: "Pošalji odgovor",
      },
    },
    {
      id: "footer",
      name: "Završna poruka",
      type: "footer",
      visible: true,
      order: 11,
      data: {
        title: "Sa poštovanjem",
      },
    },
  ],
} as UniversalProjectConfig;
