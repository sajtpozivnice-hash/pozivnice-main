import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  hero:
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=85",
  waves:
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85",
  venue:
    "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=1600&q=85",
  feature:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
};

export const birthday18CoastDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-coast",
  eventType: "comingOfAge",
  meta: {
    title: "Mia — 18 · Obalsko izdanje",
    description: "Vazdušasta, dnevna coastal pozivnica za punoletstvo",
  },
  event: {
    date: "2026-07-11",
    rsvpDate: "2026-06-28",
    names: "Mia",
    location: {
      name: "Plažni klub Marina",
      address: "Petrovac na moru",
    },
  },
  theme: {
    fonts: {
      primary: "lora",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Okean",
          value: "#1F6F86",
        },
        secondary: {
          name: "Pesak",
          value: "#E9D9B8",
        },
        ternary: {
          name: "Nebo",
          value: "#EAF4F2",
        },
      },
      background: {
        name: "Svetlost",
        value: "#FBF9F3",
      },
      backgroundSecondary: {
        name: "Talas",
        value: "#E7F1F0",
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
        title: "18",
        subtitle: "Punoletstvo na obali",
        description: "Jedan dan, otvoreno nebo i more prijatelja",
        badge: "18",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
        backgroundImage: IMG.hero,
      },
    },
    {
      id: "inviteText",
      name: "Uvod",
      type: "inviteText",
      visible: true,
      order: 2,
      data: {
        description:
          "DAN KADA SLAVIMO\n\nDošlo je vreme za 18. rođendan — sunce, laki povetarac i društvo koje volim. Pridruži mi se na jedan dan pun svetlosti i dobre energije.",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 3,
      data: {
        title: "Do plime slavlja",
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
        title: "Kada i gde",
        description: "Sve informacije za dan proslave, na jednom mestu.",
        cards: [
          {
            id: 1,
            title: "Petrovac na moru",
            location: "Šetalište 22, Petrovac na moru",
            time: "17:00",
            text: "Okupljanje na terasi uz more, u slučaju vetra premeštamo se u unutrašnji deo kluba.",
            image: IMG.venue,
          },
        ],
      },
    },
    {
      id: "schedule",
      name: "Plima večeri",
      type: "schedule",
      visible: true,
      order: 5,
      data: {
        title: "Plima večeri",
        subtitle: "Raspored dana",
        items: [
          {
            id: "1",
            time: "17:00",
            title: "Dolazak",
            description: "Osvežavajuća pića i pogled na horizont.",
          },
          {
            id: "2",
            time: "19:00",
            title: "Zalazak i tost",
            description: "Zajednička večera dok sunce tone u more.",
          },
          {
            id: "3",
            time: "21:00",
            title: "Muzika na terasi",
            description: "DJ i bosonogi ples na pesku.",
          },
          {
            id: "4",
            time: "23:00",
            title: "Noćno kupanje",
            description: "Za najhrabrije — zvezde, more i smeh do kasno.",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Šta obući",
      type: "featureCards",
      visible: true,
      order: 6,
      data: {
        title: "Stil za obalu",
        subtitle: "Lagano i svetlo",
        description:
          "Lanena i svetla odeća, udobna obuća za pesak — ponesi i vetrovku za posle zalaska.",
        cards: [
          {
            id: "1",
            title: "Lagano i svetlo",
            description:
              "Boje peska i mora, lan i pamuk. Bosonogi provod je dobrodošao.",
            icon: "sparkles",
            accent: "#1F6F86",
            image: IMG.feature,
          },
        ],
      },
    },
    {
      id: "rsvp",
      name: "Potvrda dolaska",
      type: "rsvp",
      visible: true,
      order: 7,
      data: {
        title: "Dolaziš na obalu?",
        description: "Javi mi do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za slavljenicu",
        messagePlaceholder: "Napiši mi poruku ili čestitku…",
      },
    },
    {
      id: "loveQuote",
      name: "Poziv",
      type: "loveQuote",
      visible: true,
      order: 8,
      data: {
        title: "Vidimo se na obali.",
        description: "Ponesi dobro raspoloženje — more i muzika su obezbeđeni.",
      },
    },
    {
      id: "uploadImagesSection",
      name: "Podeli trenutak",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "Uhvati svetlost dana",
        subtitle: "Podeli uspomene",
        description: "Pošalji nam fotografiju sa slavlja — čuvamo je u galeriji.",
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
        title: "18. rođendan",
        subtitle: "MIA · 2026",
        description: "Hvala što deliš ovaj dan sa mnom.",
      },
    },
  ],
};
