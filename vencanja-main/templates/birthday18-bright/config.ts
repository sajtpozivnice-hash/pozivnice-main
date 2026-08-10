import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  hero:
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=85",
  intro:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85",
  countdown:
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=85",
  venue:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85",
  schedule:
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1600&q=85",
  dress:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  final:
    "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=2000&q=85",
  upload:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=85",
};

export const birthday18BrightDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-bright",
  eventType: "comingOfAge",
  meta: {
    title: "Lena — 18. rođendan",
    description: "Vesela moderna digitalna pozivnica za 18. rođendan",
  },
  event: {
    date: "2026-09-18",
    rsvpDate: "2026-09-05",
    names: "Lena",
    location: {
      name: "Sky Garden",
      address: "Beograd",
    },
  },
  theme: {
    fonts: {
      primary: "robotoCondensed",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Coral",
          value: "#FF5C7A",
        },
        secondary: {
          name: "Ink",
          value: "#1F1630",
        },
        ternary: {
          name: "Lilac",
          value: "#A78BFA",
        },
      },
      background: {
        name: "Cream",
        value: "#FFF7F2",
      },
      backgroundSecondary: {
        name: "Blush",
        value: "#FFE8EF",
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
        subtitle: "PUNI 18",
        description: "ROĐENDANSKA ŽURKA",
        badge: "18",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
        backgroundImage: IMG.hero,
        image: IMG.hero,
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
          "18 SE SLAVI SAMO JEDNOM\n\nVreme je za dobru muziku, još bolje društvo i noć koju ćemo dugo pamtiti.",
        imageUrl: IMG.intro,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 3,
      data: {
        title: "JOŠ MALO…",
        description: "Odbrojavanje do proslave",
        imageUrl: IMG.countdown,
      },
    },
    {
      id: "locations",
      name: "Informacije i lokacija",
      type: "locations",
      visible: true,
      order: 4,
      data: {
        title: "KADA & GDE",
        subtitle: "Sve informacije",
        description: "Sve što treba da znaš pre nego što kreneš.",
        imageUrl: IMG.venue,
        cards: [
          {
            id: 1,
            title: "BEOGRAD",
            subtitle: "Sky Garden",
            location: "Bulevar Zorana Đinđića 64, Beograd",
            time: "20:00",
            text: "Ulaz od 20:00. Parking u blizini. Ulaz sa glavne strane zgrade.",
            image: IMG.venue,
            icon: "map-pin",
          },
        ],
      },
    },
    {
      id: "schedule",
      name: "Plan večeri",
      type: "schedule",
      visible: true,
      order: 5,
      data: {
        title: "ŠTA NAS ČEKA?",
        subtitle: "Plan večeri",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "20:00",
            title: "Okupljanje",
            description: "Dobrodošlica, fotke i prvi zagrljaji.",
          },
          {
            id: "2",
            time: "21:00",
            title: "Večera",
            description: "Zajednički sto, torta i kratki toast.",
          },
          {
            id: "3",
            time: "22:00",
            title: "Muzika & ples",
            description: "DJ set i plesni podijum se pale.",
          },
          {
            id: "4",
            time: "00:00",
            title: "Žurka",
            description: "Atmosfera do kasno — spremi energiju.",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Kodeks odevanja",
      type: "featureCards",
      visible: true,
      order: 6,
      data: {
        title: "KODEKS ODEVANJA",
        subtitle: "ŠARENO",
        description:
          "Obuci ono u čemu se osećaš najbolje i spremi se za dobru zabavu.",
        cards: [
          {
            id: "1",
            title: "ŠARENO",
            description:
              "Jarke boje, udobne patike, tvoj stil. Dođi kakav jesi — samo dodaj energiju.",
            icon: "shirt",
            accent: "#FF5C7A",
            image: IMG.dress,
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
        title: "VIDIMO SE?",
        description:
          "Javi nam da li dolaziš da zajedno proslavimo mojih 18. Potvrdi najkasnije do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za slavljenika",
        messagePlaceholder: "Napiši kratku poruku ili čestitku…",
        imageUrl: IMG.final,
      },
    },
    {
      id: "loveQuote",
      name: "Finalni poziv",
      type: "loveQuote",
      visible: true,
      order: 8,
      data: {
        title: "IDEMO DA ŽURIMO!",
        description: "Vidimo se — spremi osmeh i dobru energiju.",
        imageUrl: IMG.final,
      },
    },
    {
      id: "uploadImagesSection",
      name: "Fotografije gostiju",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "UHVATI TRENUTAK",
        subtitle: "Podeli uspomene",
        description:
          "Snimi kadar sa plesa, sa tortom ili sa ekipom — i pošalji u privatnu galeriju.",
        buttonText: "Pošalji fotografiju",
        imageUrl: IMG.upload,
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "18. ROĐENDAN",
        subtitle: "LENA · 2026",
        description: "Hvala što dolaziš da proslavimo zajedno.",
      },
    },
  ],
};
