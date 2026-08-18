import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087127/photo-1522673607200-164d1b6ce486_esxvqd.avif",
  story:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787067285/olivia-bauso-30UOqDM5QW0-unsplash_flsbrf.jpg",
  invite:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087165/shardayyy-photography-fJzmPe-a0eU-unsplash_ehe3fj.jpg",
  calendar:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087227/felipe-bustillo-7NO4GHOb9k0-unsplash_dn40e7.jpg",
  schedule:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087263/wedding-dreamz-wki4KKlMGvc-unsplash_bhjfxs.jpg",
  quote:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087305/jakob-owens-BMNTl3Svxbo-unsplash_mgdqcr.jpg",
  locationA:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087360/jordan-arnold-Ul07QK2AR-0-unsplash_ank1xa.jpg",
  locationB:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087387/katrien-sterckx-fn0xXL9szcU-unsplash_uzfljg.jpg",
  upload:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087409/photo-1523438885200-e635ba2c371e_pgullm.avif",
  rsvp: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087450/jaakko-perala-norway-elopement-photographer-71BLG9XJtHk-unsplash_etp1c6.jpg",
  footer:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787087486/photo-1529636798458-92182e662485_qsfzlr.avif",
};

const GALLERY = [
  IMG.hero,
  IMG.story,
  IMG.invite,
  IMG.calendar,
  IMG.schedule,
  IMG.quote,
];

export const vencanjeAtelierDefaultConfig = {
  template: "vencanje-atelier",
  meta: {
    title: "Nina & Filip — Pozivnica",
    description: "Editorial pozivnica — kamen, mastilo, tihi ritam",
  },
  event: {
    date: "2026-09-05",
    rsvpDate: "2026-08-05",
    names: "Nina & Filip",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "cormorant",
    },
    colors: {
      base: {
        primary: {
          name: "Kamen",
          value: "#9A8B7A",
        },
        secondary: {
          name: "Topla crna",
          value: "#1C1917",
        },
      },
      background: {
        name: "Kamen",
        value: "#F2EFE9",
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
        title: "Nina & Filip",
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
        title: "Do našeg dana",
        description: "Peti septembar — tišina pre „da“.",
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
          "Sa tihom radošću pozivamo Vas da budete uz nas petog septembra — bez vike, bez viška, samo ljudi koje volimo i večer koja traje.",
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
        description: "Subota u septembru — meka svetlost, duga večer.",
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
        overline: "Početak",
        text: "Upoznali smo se bez buke. Jedna večera, pa druga — i onda godine u kojima je tišina postala dom.\n\nNismo žurili. Naučili smo da se najvažnije stvari kažu polako.\n\nSada otvaramo novo poglavlje. Želimo da ga pročitate sa nama.",
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
        title: "Tok dana",
        subtitle: "Četiri trenutka",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Ceremonija",
            description: "Zakletve u sali, meka svetlost",
          },
          {
            id: "2",
            time: "17:30",
            title: "Koktel",
            description: "Šampanjac i prvi zagrljaji",
          },
          {
            id: "3",
            time: "19:30",
            title: "Večera",
            description: "Dugi stolovi, tihe zdravice",
          },
          {
            id: "4",
            time: "22:00",
            title: "Ples",
            description: "I onda noć, do kraja",
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
        title: "Tišina između nas govori više od reči.",
        description: "Nina & Filip",
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
        title: "Gde se sastajemo",
        subtitle: "Dva mesta",
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "16:00",
            location: "Atelier Hall, Knez Mihailova 22",
            text: "Molimo Vas da dođete petnaest minuta ranije.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "19:30",
            location: "Salon Stone, Gospodar Jevremova 8",
            text: "Večera i ples. Parking u dvorišnoj ulici.",
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
        title: "Trenuci",
        description: "Šest kadrova",
        images: GALLERY.map((url) => ({ url })),
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 10,
      data: {
        title: "Vaš kadar",
        subtitle: "Gosti",
        description: "Ako uhvatite trenutak — ostavite ga ovde.",
        buttonText: "Pošalji fotografiju",
        imageUrl: IMG.upload,
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
        description: "Ljubazno do ",
        buttonText: "Pošalji",
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
        title: "Vidimo se",
        subtitle: "Nina & Filip",
        imageUrl: IMG.footer,
      },
    },
  ],
} as UniversalProjectConfig;
