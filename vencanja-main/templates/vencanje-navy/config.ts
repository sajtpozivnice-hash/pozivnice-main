import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1515934751635-c81c6bc9efc1?auto=format&fit=crop&w=2000&q=85",
  story:
    "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=1600&q=85",
  invite:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  calendar:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
  schedule:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=85",
  quote:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=85",
  locationA:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85",
  locationB:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff7c?auto=format&fit=crop&w=1000&q=85",
  upload:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85",
  rsvp: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
  footer:
    "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=1600&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9efc1?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85",
  ],
};

export const vencanjeNavyDefaultConfig = {
  template: "vencanje-navy",
  meta: {
    title: "Teodora & Mihajlo — Formalna pozivnica",
    description: "Navy i champagne black-tie pozivnica za večernje venčanje",
  },
  event: {
    date: "2026-10-17",
    rsvpDate: "2026-09-17",
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
        title: "Do svečanog trenutka",
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
          "Sa velikim poštovanjem molimo za čast Vašeg prisustva na svečanosti našeg venčanja — u krugu porodice i najbližih prijatelja.",
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
        overline: "Poglavlja",
        text: "Upoznavanje je bilo tiho — večera, razgovor koji nije hteo da se završi, i osećaj da smo već negde bili zajedno.\n\nGodine su prošle u putovanjima, zdravicama i malim ritualima koji su nas učinili nama.\n\nSada otvaramo večernje poglavlje i želimo da ga podelimo sa Vama — formalno, ali od srca.",
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
        title: "Program večeri",
        subtitle: "Crno-beli dress code. Formalna atmosfera.",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "17:00",
            title: "Ceremonija",
            description: "Zakletve u svečanoj sali, uz sveće i gudače",
          },
          {
            id: "2",
            time: "18:30",
            title: "Koktel",
            description: "Champagne i lagani razgovori u foajeu",
          },
          {
            id: "3",
            time: "20:00",
            title: "Večera",
            description: "Svečana večera i zdravice",
          },
          {
            id: "4",
            time: "22:30",
            title: "Prvi ples",
            description: "I tada počinje noć",
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
        title: "Adrese",
        subtitle: "Program lokacija",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "17:00",
            location: "Hotel Metropol Palace — Svečana sala",
            text: "Ulaz sa Bulevara kralja Aleksandra. Goste dočekujemo od 16:30.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "20:00",
            location: "Hotel Metropol Palace — Ballroom",
            text: "Večera, zdravice i ples. Dress code: black-tie / večernja toaleta.",
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
        title: "U kadrovima",
        description: "Trenuci pre večeri",
        images: IMG.gallery.map((url) => ({ url })),
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
        description:
          "Ako uhvatite trenutak sa naše večeri — ostavite ga u našoj galeriji.",
        imageUrl: IMG.upload,
        buttonText: "Dodajte fotografiju",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 11,
      data: {
        title: "Potvrdite prisustvo",
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
        title: "Sa poštovanjem",
        imageUrl: IMG.footer,
      },
    },
  ],
} as UniversalProjectConfig;
