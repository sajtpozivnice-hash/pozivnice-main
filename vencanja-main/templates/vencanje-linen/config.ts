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

export const vencanjeLinenDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-linen",
  meta: {
    title: "Sofija & Aleksa — Platnena pozivnica",
    description:
      "Quiet luxury pozivnica u tonovima šampanjca i toplog platna",
  },
  event: {
    date: "2026-08-22",
    rsvpDate: "2026-07-22",
    names: "Sofija & Aleksa",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "cormorant",
    },
    colors: {
      base: {
        primary: {
          name: "Šampanjac",
          value: "#C4A574",
        },
        secondary: {
          name: "Mastilo",
          value: "#2A2420",
        },
      },
      background: {
        name: "Platno",
        value: "#F3EEE6",
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
        title: "Sa radošću Vas pozivamo",
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
        description: "Tiho odbrojavanje do trenutka „da“.",
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
          "Sa velikom radošću pozivamo Vas da budete uz nas onog dana kada dve priče postanu jedna — u toplini, zahvalnosti i tišini koja znači više od reči.",
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
        description: "Subota u avgustu — kada je vazduh još topao, a večeri mekše.",
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
        overline: "Pismo",
        subtitle: "Napisano polako, pročitano zajedno.",
        text: "Dragi naši,\n\nUpoznavanje je bilo tiho — kao prva linija na listu papira. Godine su se nizale u putovanjima, večerama i jutrima bez plana.\n\nSada otvaramo novo poglavlje i želimo da ga pročitamo uz Vas.",
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
        title: "Redosled dana",
        subtitle: "Od ceremonije do plesa — bez žurbe.",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "15:00",
            title: "Ceremonija",
            description: "Zakletve u vrtu, ispod meke poslepodnevne svetlosti",
          },
          {
            id: "2",
            time: "16:30",
            title: "Koktel",
            description: "Šampanjac, tiha muzika i prvi zagrljaji",
          },
          {
            id: "3",
            time: "18:30",
            title: "Večera",
            description: "Dugi stolovi, topla svetlost i zdravice",
          },
          {
            id: "4",
            time: "21:00",
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
        title:
          "Na celom svetu nema srca za mene kao što je tvoje.",
        description: "Maja Anđelu",
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
        title: "Mesta",
        subtitle: "Gde se naš dan odvija",
        imageUrl: IMG.invite,
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "15:00",
            location: "Vrt vile Linen, Fruška gora",
            text: "Otvorena ceremonija među zelenilom. Preporučujemo udobnije cipele.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "18:30",
            location: "Sala vile Linen",
            text: "Večera i ples u sali sa dugim stolovima i svećama. Parking u okviru imanja.",
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
        description: "Trenuci sakupljeni usput",
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
        title: "Podelite kadar",
        subtitle: "Galerija gostiju",
        description:
          "Ako uhvatite trenutak koji volite — ostavite ga kod nas.",
        buttonText: "Dodajte fotografiju",
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
        title: "Hoćete li biti tu?",
        description: "Ljubazno odgovorite do ",
        buttonText: "Pošalji odgovor",
        messageLabel: "Poruka za nas",
        messagePlaceholder: "Alergije, pratnja ili lepa želja",
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
        title: "Hvala što ste deo naše priče.",
        subtitle: "Vidimo se u avgustu.",
        imageUrl: IMG.footer,
      },
    },
  ],
};
