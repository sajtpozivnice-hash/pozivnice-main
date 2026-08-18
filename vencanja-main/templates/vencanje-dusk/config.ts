import { UniversalProjectConfig } from "@/types/config";

/** Royalty-free Unsplash images — only in config, never in components */
const IMG = {
  hero: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85",
  story:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85",
  invite:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85",
  calendar:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",
  schedule:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff7c?auto=format&fit=crop&w=1600&q=85",
  quote:
    "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=1600&q=85",
  locationA:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
  locationB:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  locationsBg:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85",
  upload:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff7c?auto=format&fit=crop&w=1600&q=85",
  rsvp: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",
  footer:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85",
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
          value: "#F3EDE4",
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
            image: IMG.invite,
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
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "16:30",
            title: "Dolazak gostiju",
            description: "Toplo piće u predvorju dok se pali prva sveća.",
          },
          {
            id: "2",
            time: "17:30",
            title: "Ceremonija",
            description: "Zaveti u polumraku, uz zvuk gudačkog tria.",
          },
          {
            id: "3",
            time: "19:00",
            title: "Večera",
            description: "Dugi stolovi, bakarni svećnjaci i prve zdravice.",
          },
          {
            id: "4",
            time: "21:30",
            title: "Prvi ples",
            description: "Pesma koju smo čuvali samo za ovu večer.",
          },
          {
            id: "5",
            time: "23:00",
            title: "Slavlje",
            description: "Muzika, smeh i ples sve do svitanja.",
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
        imageUrl: IMG.locationsBg,
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            subtitle: "Prva scena",
            time: "17:30",
            location: "Kapela Svetog Duha, Beograd",
            text: "Kamene zidine, sveće u nišama i tišina pred prve reči.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            subtitle: "Druga scena",
            time: "19:00",
            location: "Salon Aurora, Beograd",
            text: "Visoki plafoni, tamno drvo i bakarno svetlo iznad stolova.",
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
        title: "Kadrovi pre kadra",
        description: "Nekoliko trenutaka koje smo usput sačuvali.",
        images: [
          { url: IMG.story },
          { url: IMG.invite },
          { url: IMG.quote },
          { url: IMG.schedule },
          { url: IMG.calendar },
          { url: IMG.hero },
        ],
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 10,
      data: {
        title: "Podelite svoj kadar",
        subtitle: "Vaš pogled",
        description:
          "Ako te večeri uslikate nešto što vredi pamtiti, pošaljite nam — želimo da vidimo naše venčanje i Vašim očima.",
        buttonText: "Dodaj fotografiju",
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
      order: 12,
      data: {
        title:
          "Hvala Vam što ćete biti deo večeri koju ćemo pamtiti ceo život.",
        subtitle: "Sa ljubavlju",
        imageUrl: IMG.footer,
      },
    },
  ],
};
