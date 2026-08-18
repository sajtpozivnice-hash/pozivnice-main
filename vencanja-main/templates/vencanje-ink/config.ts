import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=2000&q=85",
  story:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff7c?auto=format&fit=crop&w=1600&q=85",
  invite:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85",
  calendar:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",
  schedule:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85",
  quote:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=85",
  locationA:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  locationB:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
  locationsBg:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",
  upload:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=85",
  rsvp: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
  footer:
    "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=2000&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1504198453319-8ceacb77e65d?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff7c?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85",
  ],
};

export const vencanjeInkDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-ink",
  meta: {
    title: "Iva & Nikola — Pozivnica",
    description:
      "Tipografska pozivnica za venčanje — crno mastilo na kremastom papiru",
  },
  event: {
    date: "2026-11-14",
    rsvpDate: "2026-10-14",
    names: "Iva & Nikola",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Mastilo",
          value: "#111111",
        },
        secondary: {
          name: "Grafit",
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
        title: "Dva imena, jedan datum",
        subtitle: "Pozivnica",
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
        title: "Još malo",
        description: "Vreme do prvog zajedničkog potpisa.",
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
          "Dragi naši, sa tihom radošću pozivamo Vas da budete uz nas onog dana kada dve priče postaju jedna.\n\nBez velikih reči i bez viška ukrasa — samo ljudi koje volimo, jedan dugačak stol i večera koja se ne završava na vreme. Vaše prisustvo je jedini poklon koji nam je zaista potreban.",
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
        title: "Zapišite datum",
        description: "Subota, popodne koje počinje mirno i završava se u igri.",
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
        overline: "Poglavlje prvo",
        text: "Upoznali smo se u knjižari, oboje tražeći isto izdanje koje je ostalo samo u jednom primerku. Nikola ga je pustio, ja sam mu ostavila broj na margini računa.\n\nZatim su došle godine sitnica: kafe koje se hlade dok govorimo, vozovi u pola šest, stanovi koji su postajali dom. Naučili smo da se najvažnije stvari kažu tiho.\n\nSada, deset zima kasnije, otvaramo novo poglavlje. Volimo da ga pročitate sa nama — naglas, uz čašu vina i previše smeha.",
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
        subtitle: "Četiri trenutka, po redu",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Ceremonija",
            description: "Zakletve u maloj sali, uz svetlost sa zapada",
          },
          {
            id: "2",
            time: "17:30",
            title: "Koktel",
            description: "Šampanjac, fotografije i prvi zagrljaji",
          },
          {
            id: "3",
            time: "19:30",
            title: "Večera",
            description: "Jedan dugačak stol, zdravice bez scenarija",
          },
          {
            id: "4",
            time: "22:00",
            title: "Prvi ples",
            description: "Pa onda sve ostalo, do jutra",
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
        title: "Ljubav se ne meri rečima, nego godinama koje ostanu tihe i pune.",
        description: "Iva & Nikola",
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
        subtitle: "Dve adrese, deset minuta hoda",
        imageUrl: IMG.locationsBg,
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "16:00",
            location: "Dom kulture, Kralja Petra 14",
            text: "Kamena sala sa visokim prozorima. Molimo Vas da dođete petnaest minuta ranije.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "19:30",
            location: "Restoran Papir, Gospodar Jevremova 3",
            text: "Večera i ples u dvorištu pokrivenom staklom. Parking je u dvorišnoj ulici.",
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
        title: "Kadrovi",
        description: "Šest slika, bez filtera i bez reda",
        images: IMG.gallery.map((url) => ({ url })),
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje Slika",
      type: "uploadImagesSection",
      visible: true,
      order: 10,
      data: {
        title: "Pošaljite nam kadar",
        subtitle: "Galerija gostiju",
        description:
          "Ako tokom dana uhvatite trenutak koji nam je promakao — ostavite ga ovde.",
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
        title: "Potvrdite prisustvo",
        description: "Molimo Vas da odgovorite do ",
        buttonText: "Pošalji odgovor",
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
        subtitle: "Vidimo se u novembru",
        imageUrl: IMG.footer,
      },
    },
  ],
};
