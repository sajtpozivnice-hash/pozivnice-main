import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  hero:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787344853/photo-1529626455594-4ff0802cfb7e_knhxfx.avif",
  venue:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787344891/andrea-mininni-VLlkOJdzLG0-unsplash_s7vrjm.jpg",
  dress:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787344976/fernando-lavin-fi5YSQfxbVk-unsplash_n8k4xt.jpg",
};

export const birthday18BrightDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-bright",
  eventType: "comingOfAge",
  meta: {
    title: "Lena — 18. rođendan",
    description: "Vesela moderna digitalna pozivnica za 18. rođendan",
  },
  event: {
    date: "2027-09-18",
    rsvpDate: "2027-09-05",
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
        description: "Sve što treba da znaš pre nego što kreneš.",
        cards: [
          {
            id: 1,
            title: "BEOGRAD",
            location: "Bulevar Zorana Đinđića 64, Beograd",
            time: "20:00",
            text: "Ulaz od 20:00. Parking u blizini. Ulaz sa glavne strane zgrade.",
            image: IMG.venue,
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
