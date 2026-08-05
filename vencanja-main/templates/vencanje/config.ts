import { UniversalProjectConfig } from "@/types/config";

export const vencanjeDefaultConfig: UniversalProjectConfig = {
  template: "vencanje",
  meta: { title: "test" },
  event: {
    date: "2026-08-08",
    rsvpDate: "2026-07-08",
    names: "Nevena & Jovan",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "lora",
    },
    colors: {
      base: {
        primary: {
          name: "Glavna",
          value: "#d4af37",
        },
        secondary: {
          name: "Sekundarna",
          value: "#1a1a1a",
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
        title: "Nevena & Jovan",
        subtitle: "Pozivnica za naše venčanje",
        backgroundImage:
          "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1770731795/wedding/zjbcsvlstvj7ojt8v5uw.jpg",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: { title: "Odbrojavanje do našeg zauvek" },
    },
    {
      id: "inviteText",
      name: "Tekst Pozivnice",
      type: "inviteText",
      visible: true,
      order: 3,
      data: {
        description:
          "Sa velikom radošću vas pozivamo da zajedno sa nama proslavite početak našeg zajedničkog života. Naša ljubavna priča dobija novo poglavlje i bilo bi nam neizmerno drago da tog dana budete uz nas.",
      },
    },
    {
      id: "calendar",
      name: "Kalendar",
      type: "calendar",
      visible: true,
      order: 4,
      data: { title: "Sacuvajte dan za nas!" },
    },
    {
      id: "ourStory",
      name: "Naša Priča",
      type: "ourStory",
      visible: true,
      order: 5,
      data: {
        title: "Naša Ljubavna Priča",
        overline: "Kako je počelo?",
        text: "Upoznali smo se 2022. godine – sasvim slučajno, a potpuno sudbinski. Od prvog razgovora znali smo da se među nama dešava nešto posebno. Dani su brzo postali meseci, a meseci godine ispunjene smehom, putovanjima i bezbroj malih trenutaka koji su nas učinili nerazdvojnim.\n\nGodine 2025. odlučili smo da napravimo sledeći korak i obećamo jedno drugom zauvek. Veridba je bila samo potvrda onoga što smo odavno osećali – da smo pronašli svoj dom jedno u drugom.\n\nA 2026. godine započinjemo naše najveće poglavlje – brak. Radujemo se svemu što dolazi, zajedno.",
        image:
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000",
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 6,
      data: {
        title: "Veliki Dan",
        subtitle: "Sve što treba da znate o našoj proslavi",
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Ceremonija",
            description: "Villa del Sol Garden",
          },
          {
            id: "2",
            time: "17:30",
            title: "Koktel",
            description: "The Olive Grove",
          },
          {
            id: "3",
            time: "19:00",
            title: "Večera i zdravice",
            description: "Grand Ballroom",
          },
          {
            id: "4",
            time: "21:00",
            title: "Igranje",
            description: "Grand Ballroom",
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
        subtitle: "Važne adrese našeg dana",
        cards: [
          {
            id: 1,
            title: "Skup Kod Mladenaca",
            time: "12:30",
            location: "Vaša Adresa",
            text: "Okupljamo se kod mladenaca pre početka slavlja...",
          },
          {
            id: 2,
            title: "Crkveno Venčanje",
            time: "15:00",
            location: "Adresa Crkve",
            text: "Pred Bogom i našim najbližima, obećavamo jedno drugom večnu ljubav i podršku. Radujemo se što ćete biti deo ovog posebnog trenutka.",
          },
          {
            id: 3,
            title: "Građansko Venčanje",
            time: "Vila Atina 17:00",
            location: "Adresa restorana",
            text: "Nakon ceremonije, nastavljamo slavlje uz osmeh, muziku i zajedničke trenutke u svečanoj sali.",
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
        title: "Naša Galerija",
        description: "Omiljeni trenuci naše priče",
        images: [],
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 10,
      data: {
        title: "Dodavanje Slika i Video Zapisa",
        description:
          "Pomozite nam da zabeležimo magične trenutke. Podelite svoje omiljene fotografije i video zapise sa našeg posebnog dana i dodajte ih u našu privatnu kolekciju uspomena.",
        subtitle: "Podelite Ljubav",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 11,
      data: {
        title: "Da li se vidimo?",
        description: "Molimo Vas da Potvrdite Vase Prisustvo do ",
      },
    },
    {
      id: "footer",
      name: "Završna poruka",
      type: "footer",
      visible: true,
      order: 12,
      data: {
        title: "Ljubav nas je spojila, a vi ste deo našeg zajedničkog sna.",
      },
    },
  ],
};
