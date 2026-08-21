import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300802/veikko-venemies-RtFSn0I2zi8-unsplash_f7rdgt.jpg",
  story:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300643/vows-on-the-move-p0vZplFhKYI-unsplash_lcpgj5.jpg",
    story2:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300738/abdul-gani-m-DJ_kZaITX78-unsplash_iexmed.jpg",
  invite:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300845/david-goldman-wPoydPieDUI-unsplash_mijg17.jpg",
  quote:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300685/d-ng-h-u-CCjgYjUudxE-unsplash_vnckr6.jpg",
  locationA:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787150836/beatriz-perez-moya-M2T1j-6Fn8w-unsplash_rc0b1t.jpg",
  locationB:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787146655/photo-1510076857177-7470076d4098_srlt0i.avif",
  rsvp: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300643/vows-on-the-move-p0vZplFhKYI-unsplash_lcpgj5.jpg",
  footer:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787300923/markus-spiske-9Qv774YDKbA-unsplash_dfgzyk.jpg",
};

export const vencanjeDuskDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-dusk",
  meta: {
    title: "Lena & Stefan — Sumrak",
    description:
      "Tamna, filmska venčana pozivnica sa bakarnim detaljima i decembarskim sumrakom",
  },
  event: {
    date: "2026-12-05",
    rsvpDate: "2026-11-05",
    names: "Lena & Stefan",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "cormorant",
    },
    colors: {
      base: {
        primary: {
          name: "Bakar",
          value: "#B87333",
        },
        secondary: {
          name: "Slonovača",
          value: "#6d502c",
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
        title:
          "Decembarsko veče, sveće u nizu i dve reči koje menjaju sve — recimo ih zajedno.",
        subtitle: "Venčanje u sumrak",
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
        title: "Do prvog kadra",
        description:
          "Svaki kadar nas vodi bliže petom decembru, kada se dan povuče i veče počne.",
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
          "Kada se dan povuče, a grad utihne, mi izgovaramo svoje „da“.\n\nSa velikom radošću Vas pozivamo da tu večer podelite sa nama — uz svetlost sveća, tople reči i muziku do jutra.",
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
        title: "Zabeležite datum",
        description: "Jedno veče, jedan datum, jedna zajednička priča.",
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
        subtitle: "Od prvog sumraka do poslednjeg kadra",
        text: "Upoznali smo se jedne kasne jeseni, kada su ulice već mirisale na zimu.\n\nSledile su duge šetnje bez cilja, putovanja bez plana i tišine u kojima nam nije bilo neprijatno.\n\nDanas znamo — najlepše se dešava kada se svetlo povuče, a ostanu samo naši glasovi.",
        image: IMG.story,
        cards: [
          {
            id: 1,
            title: "Prva zima",
            image: IMG.quote,
          },
          {
            id: 2,
            title: "Naš grad",
            image: IMG.story2,
          },
        ],
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
        subtitle: "Od dolaska do slavlja",
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
        title: "Kada se svetlo povuče, ti si i dalje ono što vidim.",
        description: "Lena & Stefan",
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
        title: "Gde se sve dešava",
        subtitle: "Dve scene jedne večeri, na deset minuta hoda jedna od druge.",
        cards: [
          {
            id: 1,
            title: "Crkveno venčanje",
            subtitle: "Prva scena",
            time: "16:00",
            location: "Kapela Svetog Duha, Beograd",
            text: "Molimo Vas da stignete petnaest minuta ranije.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Skup gostiju u sali",
            subtitle: "Druga scena",
            time: "18:00",
            location: "Salon Aurora, Beograd",
            text: "Doček, večera i ples.",
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
        subtitle: "Vaš pogled",
        description:
          "Ako te večeri uslikate nešto što vredi pamtiti, pošaljite nam — želimo da vidimo naše venčanje i Vašim očima.",
        buttonText: "Dodaj fotografiju",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda Prisutnosti",
      type: "rsvp",
      visible: true,
      order: 10,
      data: {
        title: "Hoćete li biti sa nama?",
        description: "Molimo Vas da potvrdite dolazak do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka",
        messagePlaceholder: "Vaša poruka mladencima",
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
        title:
          "Hvala Vam što ćete biti deo večeri koju ćemo pamtiti ceo život.",
        subtitle: "Sa ljubavlju",
        imageUrl: IMG.footer,
      },
    },
  ],
};
