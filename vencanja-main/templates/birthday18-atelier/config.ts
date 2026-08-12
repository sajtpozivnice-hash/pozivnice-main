import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  portrait:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=85",
  venue:
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=85",
  feature:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
};

export const birthday18AtelierDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-atelier",
  eventType: "comingOfAge",
  meta: {
    title: "Iva — 18 · Atelje izdanje",
    description: "Minimalna fashion atelier / lookbook pozivnica za punoletstvo",
  },
  event: {
    date: "2026-11-14",
    rsvpDate: "2026-10-31",
    names: "Iva",
    location: {
      name: "Atelje Nova",
      address: "Beograd",
    },
  },
  theme: {
    fonts: {
      primary: "cormorant",
      secondary: "robotoCondensed",
    },
    colors: {
      base: {
        primary: {
          name: "Rđa",
          value: "#B5602F",
        },
        secondary: {
          name: "Kost",
          value: "#EDE6D8",
        },
        ternary: {
          name: "Ugalj",
          value: "#221E19",
        },
      },
      background: {
        name: "Ugalj tamni",
        value: "#17130F",
      },
      backgroundSecondary: {
        name: "Panel",
        value: "#221E19",
      },
    },
  },
  sections: [
    {
      id: "hero",
      name: "Naslovna",
      type: "hero",
      visible: true,
      order: 1,
      data: {
        title: "LOOK 18",
        subtitle: "PUNOLETSTVO",
        description: "Nova kolekcija godina — predstavljam je lično.",
        badge: "18",
        ctaText: "Rezerviši mesto",
        ctaHref: "#rsvp",
        backgroundImage: IMG.portrait,
      },
    },
    {
      id: "inviteText",
      name: "Poziv",
      type: "inviteText",
      visible: true,
      order: 2,
      data: {
        description:
          "OSAMNAESTA KOLEKCIJA\n\nPosle mnogo proba i skica, spremna sam da predstavim novo izdanje sebe. Pridruži mi se na jednoj večeri posvećenoj stilu, prijateljstvu i početku novog poglavlja.",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 3,
      data: {
        title: "Do revije",
        description: "Odbrojavanje",
      },
    },
    {
      id: "locations",
      name: "Informacije i lokacija",
      type: "locations",
      visible: true,
      order: 4,
      data: {
        title: "Mesto i vreme",
        description: "Sve informacije o večeri, minimalno i jasno.",
        cards: [
          {
            id: 1,
            title: "Atelje Nova",
            location: "Studentski trg 8, Beograd",
            time: "20:00",
            text: "Ulaz sa dvorišne strane. Garderoba dostupna na recepciji ateljea.",
            image: IMG.venue,
          },
        ],
      },
    },
    {
      id: "schedule",
      name: "Redosled revije",
      type: "schedule",
      visible: true,
      order: 5,
      data: {
        title: "Redosled večeri",
        subtitle: "Lookbook indeks",
        items: [
          {
            id: "1",
            time: "20:00",
            title: "Prijem gostiju",
            description: "Dobrodošlica uz piće i tihu muziku.",
          },
          {
            id: "2",
            time: "21:00",
            title: "Predstavljanje",
            description: "Kratak govor i zdravica za novo poglavlje.",
          },
          {
            id: "3",
            time: "22:00",
            title: "Večera",
            description: "Zajednički sto i razgovor do kasno.",
          },
          {
            id: "4",
            time: "23:30",
            title: "Afterparty",
            description: "Muzika i ples za one koji ostaju do kraja.",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Stil beleška",
      type: "featureCards",
      visible: true,
      order: 6,
      data: {
        title: "Napomena o stilu",
        subtitle: "Dress code",
        description:
          "Crno, bež i po jedan upečatljiv detalj. Minimalno, ali namerno — kao i sve večeras.",
        cards: [
          {
            id: "1",
            title: "Minimalno i namerno",
            description:
              "Čiste linije, neutralni tonovi, jedan akcenat po izboru. Stil je lični izbor.",
            icon: "shirt",
            accent: "#B5602F",
            image: IMG.feature,
          },
        ],
      },
    },
    {
      id: "rsvp",
      name: "Potvrda prisustva",
      type: "rsvp",
      visible: true,
      order: 7,
      data: {
        title: "Rezerviši mesto",
        description: "Potvrdi prisustvo najkasnije do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za slavljenicu",
        messagePlaceholder: "Napiši kratku poruku…",
      },
    },
    {
      id: "loveQuote",
      name: "Zatvaranje",
      type: "loveQuote",
      visible: true,
      order: 8,
      data: {
        title: "Vidimo se na reviji.",
        description: "Do tada — biraj pažljivo, dolazi na vreme.",
      },
    },
    {
      id: "uploadImagesSection",
      name: "Podeli kadar",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "Podeli kadar",
        subtitle: "Lookbook gostiju",
        description: "Pošalji fotografiju sa večeri za zajedničku galeriju.",
        buttonText: "Pošalji fotografiju",
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "18. Rođendan",
        subtitle: "IVA · 2026",
        description: "Hvala što si deo ove kolekcije.",
      },
    },
  ],
};
