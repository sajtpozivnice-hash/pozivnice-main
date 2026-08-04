import { UniversalProjectConfig } from "@/types/config";

export const vencanje3DefaultConfig: UniversalProjectConfig = {
  template: "vencanje3",
  meta: {
    title: "Nevena & Jovan — Venčanje",
    description: "Elektronska pozivnica",
  },
  event: {
    date: "2026-08-08",
    rsvpDate: "2026-07-08",
    names: "Nevena & Jovan",
  },
  theme: {
    fonts: {
      primary: "cormorant",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Champagne",
          value: "#b8956c",
        },
        secondary: {
          name: "Ink",
          value: "#141210",
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
        title: "Naša priča počinje ovde",
        subtitle: "Sa ljubavlju Vas pozivamo",
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
      data: { title: "Do našeg dana" },
    },
    {
      id: "inviteText",
      name: "Tekst Pozivnice",
      type: "inviteText",
      visible: true,
      order: 3,
      data: {
        description:
          "Sa velikom radošću Vas pozivamo da zajedno sa nama proslavite početak našeg zajedničkog života. Biće nam čast da tog dana budete uz nas.",
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
        title: "Naša priča",
        overline: "Od prvog susreta do zauvek",
        text: "Upoznali smo se 2022. godine — sasvim slučajno, a potpuno sudbinski. Od prvog razgovora znali smo da se među nama dešava nešto posebno.\n\nGodine 2025. odlučili smo da napravimo sledeći korak. Veridba je bila samo potvrda onoga što smo odavno osećali.\n\nA 2026. započinjemo naše najveće poglavlje — brak. Radujemo se svemu što dolazi, zajedno.",
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
            text: "Zajedno ćemo izgovoriti naše „da“ u zelenilu vrta.",
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
      id: "ourGallery",
      name: "Galerija",
      type: "ourGallery",
      visible: true,
      order: 9,
      data: {
        title: "Trenuci",
        description: "Mali fragmenti naše priče",
        images: [
          {
            url: "https://images.unsplash.com/photo-1511285560929-80b4566047ec?auto=format&fit=crop&q=80&w=900",
          },
          {
            url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=900",
          },
          {
            url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=900",
          },
          {
            url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=900",
          },
          {
            url: "https://images.unsplash.com/photo-1519225421980-715cb0215a07?auto=format&fit=crop&q=80&w=900",
          },
          {
            url: "https://images.unsplash.com/photo-1606800052052-a08af7148863?auto=format&fit=crop&q=80&w=900",
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
