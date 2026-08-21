import { UniversalProjectConfig } from "@/types/config";

export const krstenjeClassicDefaultConfig: UniversalProjectConfig = {
  template: "krstenje-classic",
  eventType: "baptism",
  meta: {
    title: "Teodor — svečano krštenje",
    description: "Pozivnica za krštenje"
  },
  event: {
    date: "2027-08-08",
    rsvpDate: "2027-07-08",
    names: "Teodor"
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "inter"
    },
    colors: {
      base: {
        primary: {
          name: "Bronze",
          value: "#9c7a3f",
        },
        secondary: {
          name: "Ink",
          value: "#2a2319",
        },
      },
      background: {
        name: "Ivory",
        value: "#fbf7ee",
      },
      backgroundSecondary: {
        name: "Sand",
        value: "#f2ecdd",
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
        title: "U svetlosti sveće",
        subtitle: "Sveta tajna krštenja",
        backgroundImage: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787350317/2026-01-17-04-45-55-960x640_eed5a3.jpg"
      }
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Do svečanog dana"
      }
    },
    {
      id: "inviteText",
      name: "Tekst Pozivnice",
      type: "inviteText",
      visible: true,
      order: 3,
      data: {
        description: "U toploj atmosferi i uz najbliže, pozivamo vas na krštenje našeg sina Teodora."
      }
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: {
        title: "Sačuvajte datum"
      }
    },
    {
      id: "ourStory",
      name: "Krštenje priča",
      type: "ourStory",
      visible: true,
      order: 5,
      data: {
        title: "U svetlosti",
        overline: "Svečani trenutak",
        text: `U tišini sveće i toplom sjaju okupljamo one koji su nam najdraži. Krštenje je naš svečani trenutak zahvalnosti i vere.

Ako želite svečani dečiji rođendan, zadržite atmosferu — promenite samo tekstove i program u editoru.`,
        image: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787350317/2026-01-17-04-45-55-960x640_eed5a3.jpg"
      }
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
            title: "Krstenje",
            description: "Crkva Sv. Jovana"
          },
          {
            id: "2",
            time: "16:30",
            title: "Skup gostiju u svečanoj sali",
            description: "Svečana sala"
          },
          {
            id: "3",
            time: "17:30",
            title: "Večera",
            description: "Večera u svečanoj sali"
          },
          {
            id: "4",
            time: "18:30",
            title: "Žurka",
            description: "Do kasnih sati"
          }
        ]
      }
    },
    {
      id: "loveQuote",
      name: "Krštenje citat",
      type: "loveQuote",
      visible: true,
      order: 7,
      data: {
        title: "Danas primam najlepši dar – Božji blagoslov, ljubav svojih najmilijih i put ispunjen verom."
      }
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
            title: "Krstenje",
            time: "15:00",
            location: "Crkva Sv. Jovana",
            text: "Neka svetlost vodi njegov put."
          },
          {
            id: 2,
            title: "Proslava",
            time: "17:30",
            location: "Svečana sala Vila Atina",
            text: "Večera, zdravice i ples do kasnih sati."
          }
        ]
      }
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
        description: "Pomozite nam da sačuvamo magične trenutke. Podelite omiljene fotografije sa našeg dana."
      }
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
        buttonText: "Pošalji potvrdu"
      }
    },
    {
      id: "footer",
      name: "Završna poruka",
      type: "footer",
      visible: true,
      order: 12,
      data: {
        title: "Jedva čekamo da slavimo sa Vama."
      }
    }
  ]
};
