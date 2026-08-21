import { UniversalProjectConfig } from "@/types/config";

export const krstenjeGardenDefaultConfig: UniversalProjectConfig = {
  template: "krstenje-garden",
  eventType: "baptism",
  meta: {
    title: "Vuk — krštenje u bašti",
    description: "Pozivnica za krštenje",
  },
  event: {
    date: "2026-08-08",
    rsvpDate: "2026-07-08",
    names: "Vuk",
  },
  theme: {
    fonts: {
      primary: "lora",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Sage",
          value: "#5b7d52",
        },
        secondary: {
          name: "Ink",
          value: "#223226",
        },
      },
      background: {
        name: "Ivory",
        value: "#f7f8f2",
      },
      backgroundSecondary: {
        name: "Sand",
        value: "#eaf0e2",
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
        subtitle: "Krštenje i porodična proslava",
        backgroundImage:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: { title: "Do proslave" },
    },
    {
      id: "inviteText",
      name: "Tekst Pozivnice",
      type: "inviteText",
      visible: true,
      order: 3,
      data: {
        description:
          "Pozivamo vas na krštenje našeg sina Vuka, a zatim na druženje u zelenilu i miru bašte.",
      },
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: { title: "Sačuvajte datum" },
    },
    {
      id: "ourStory",
      name: "Naša Priča",
      type: "ourStory",
      visible: true,
      order: 5,
      data: {
        title: "Pod otvorenim nebom",
        overline: "Porodična proslava",
        text: `Okupljamo se napolju, među zelenilom i smehom, da proslavimo blagoslovljen dan. Krštenje i okupljanje posle toga su jedno: porodica, prijatelji i lagani trenuci.

Šablon takođe možete pretvoriti u rođendansku pozivnicu — promenite hero, program i lokacije.`,
        image:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 6,
      data: {
        title: "Raspored dana",
        subtitle: "Sve što treba da znate",
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Ceremonija",
            description: "Vrt vile Atina",
          },
          {
            id: "2",
            time: "16:30",
            title: "Koktel",
            description: "Terasa uz bazen",
          },
          {
            id: "3",
            time: "18:00",
            title: "Večera",
            description: "Svečana sala",
          },
          {
            id: "4",
            time: "21:00",
            title: "Žurka",
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
        title:
          "Ljubav nije nešto što pronalazimo. Ljubav je nešto što gradimo — zajedno.",
      },
    },
    {
      id: "locations",
      name: "Lokacije",
      type: "locations",
      visible: true,
      order: 8,
      data: {
        title: "Lokacije",
        subtitle: "Gde se nalazimo",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "15:00",
            location: "Vila Atina, Beograd",
            text: "Neka raste u miru, radosti i ljubavi.",
          },
          {
            id: 2,
            title: "Proslava",
            time: "18:00",
            location: "Svečana sala Vila Atina",
            text: "Večera, zdravice i ples do kasnih sati.",
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
        title: "Podelite uspomene",
        subtitle: "Vaše fotografije",
        description:
          "Pomozite nam da sačuvamo magične trenutke. Podelite omiljene fotografije sa našeg dana.",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 11,
      data: {
        title: "Potvrdite dolazak",
        description: "Molimo Vas da potvrdite prisustvo do ",
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
        title: "Jedva čekamo da slavimo sa Vama.",
      },
    },
  ],
};
