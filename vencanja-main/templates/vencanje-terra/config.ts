import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146696/photo-1721635513009-4bd5d277c437_zhohbj.avif",
  story:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787311758/heather-mount-8c3zjKrkkBA-unsplash_kctdj0.jpg",
  invite:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146655/photo-1510076857177-7470076d4098_srlt0i.avif",
  calendar:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146485/hisu-lee-FTW8ADj5igs-unsplash_vwsxdb.jpg",
  schedule:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300923/markus-spiske-9Qv774YDKbA-unsplash_dfgzyk.jpg",
  quote:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787226825/photo-1545232979-8bf68ee9b1af_1_c8gpgy.avif",
  locationA:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300845/david-goldman-wPoydPieDUI-unsplash_mijg17.jpg",
    locationC:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787312096/jeremy-wong-weddings-YyvpmN6PB3I-unsplash_slaylp.jpg",
  locationB:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787311996/raspopova-marina-NWsG6pcsxt4-unsplash_bng1h7.jpg",
  locationsBg:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787311946/engin-akyurt-3IN8pjVpDw0_wgstac.jpg",
  upload:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146655/photo-1510076857177-7470076d4098_srlt0i.avif",
  rsvp: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300845/david-goldman-wPoydPieDUI-unsplash_mijg17.jpg",
  footer:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146696/photo-1721635513009-4bd5d277c437_zhohbj.avif",
};

export const vencanjeTerraDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-terra",
  meta: {
    title: "Sara & Petar — Pozivnica za venčanje",
    description:
      "Mediteranska pozivnica u tonovima terakote, peska i masline",
  },
  event: {
    date: "2027-09-19",
    rsvpDate: "2027-08-20",
    names: "Sara & Petar",
  },
  theme: {
    fonts: {
      primary: "lora",
      secondary: "cormorant",
    },
    colors: {
      base: {
        primary: {
          name: "Terakota",
          value: "#C45C26",
        },
        secondary: {
          name: "Mastilo",
          value: "#3D3429",
        },
        ternary: {
          name: "Maslina",
          value: "#5C6B4A",
        },
      },
      background: {
        name: "Pesak",
        value: "#EDE4D7",
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
        title: "Pod suncem i maslinama, zajedno.",
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
        title: "Još malo do našeg dana",
        description: "Vreme do prvog zajedničkog „da“ u bašti.",
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
          "Sa radošću Vas pozivamo da budete uz nas onog dana kada dve priče postanu jedna.\nBez žurbe, uz tople zemljane tonove, dobru hranu i ljude koji nam znače.\nVaše prisustvo je jedini poklon koji želimo.",
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
        title: "Zabeležite u kalendar",
        description:
          "Subota u septembru — kada je vazduh još topao, a večeri mekše.",
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
        overline: "Kako je počelo",
        subtitle: "Pet letovanja, dva grada i jedan isti odgovor.",
        text: "Upoznali smo se na kraju leta, na terasi na koju niko od nas nije planirao da ode.\n\nOd tada su se nizali putovanja, kuhinje prepune začina i jutra bez plana koja su nam bila najlepša.\n\nSada želimo da najvažniji dan podelimo sa ljudima koji su bili deo svake od tih godina.",
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
        title: "Kako teče dan",
        subtitle: "Od popodnevne ceremonije do kasne večeri pod zvezdama.",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Crkveno venčanje",
            description: "Svečani čin venčanja u crkvi.",
          },
          {
            id: "2",
            time: "18:00",
            title: "Skup gostiju u sali",
            description: "Doček, večera i slavlje.",
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
          "Ljubav nije u tome da gledamo jedno u drugo, već da zajedno gledamo u istom pravcu.",
        description: "Antoan de Sent Egziperi",
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
        title: "Gde se vidimo",
        subtitle: "Crkva, pa sala — dve adrese za taj dan.",
        imageUrl: IMG.locationsBg,
        cards: [
          {
            id: 1,
            title: "Crkveno venčanje",
            time: "16:00",
            location: "Crkva Svetog Marka, Bulevar Kralja Aleksandra 17",
            text: "Svečani čin venčanja u crkvi. Molimo Vas da stignete petnaest minuta ranije.",
            image: IMG.locationC,
          },
          {
            id: 2,
            title: "Skup gostiju u sali",
            time: "18:00",
            location: "Kamena sala imanja Terra, Fruška gora",
            text: "Doček, večera i ples. Parking je u okviru imanja.",
            image: IMG.locationB,
          },
        ],
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "Podelite svoj kadar",
        subtitle: "Galerija gostiju",
        description:
          "Ako tog dana uslikate nešto lepo, ostavite nam fotografiju ovde — sve stiže pravo kod nas.",
        buttonText: "Dodajte fotografiju",
        imageUrl: IMG.upload,
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 10,
      data: {
        title: "Javite nam da li dolazite",
        description: "Molimo Vas da potvrdite dolazak do ",
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
      order: 11,
      data: {
        title: "Hvala što ste deo naše priče.",
        subtitle: "Vidimo se u septembru.",
        imageUrl: IMG.footer,
      },
    },
  ],
};
