import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1721635513009-4bd5d277c437?auto=format&fit=crop&w=2000&q=85",
  story:
    "https://images.unsplash.com/photo-1537633552985-cf699e1542d0?auto=format&fit=crop&w=1600&q=85",
  invite:
    "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1600&q=85",
  calendar:
    "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1600&q=85",
  schedule:
    "https://images.unsplash.com/photo-1502635385003-ee052e304ee8?auto=format&fit=crop&w=1600&q=85",
  quote:
    "https://images.unsplash.com/photo-1606216794074-7417dc8b62a0?auto=format&fit=crop&w=1600&q=85",
  locationA:
    "https://images.unsplash.com/photo-1494951334922-3a4b05f9d350?auto=format&fit=crop&w=1200&q=85",
  locationB:
    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=85",
  locationsBg:
    "https://images.unsplash.com/photo-1502635385003-ee052e304ee8?auto=format&fit=crop&w=1600&q=85",
  upload:
    "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1600&q=85",
  rsvp: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1600&q=85",
  footer:
    "https://images.unsplash.com/photo-1721635513009-4bd5d277c437?auto=format&fit=crop&w=2000&q=85",
};

const GALLERY = [
  IMG.hero,
  IMG.story,
  IMG.invite,
  IMG.calendar,
  IMG.schedule,
  IMG.quote,
];

export const vencanjeTerraDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-terra",
  meta: {
    title: "Sara & Petar — Pozivnica za venčanje",
    description:
      "Mediteranska pozivnica u tonovima terakote, peska i masline",
  },
  event: {
    date: "2026-09-19",
    rsvpDate: "2026-08-20",
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
            time: "15:30",
            title: "Dolazak gostiju",
            description: "Limunada, hlad i prvi zagrljaji u bašti.",
          },
          {
            id: "2",
            time: "16:30",
            title: "Ceremonija",
            description: "Zavet pod starim maslinama, uz tihu muziku.",
          },
          {
            id: "3",
            time: "18:00",
            title: "Koktel i fotografije",
            description: "Zalazak sunca je najbolji fotograf.",
          },
          {
            id: "4",
            time: "19:30",
            title: "Večera",
            description: "Dugi stolovi, domaća jela i zdravice.",
          },
          {
            id: "5",
            time: "22:00",
            title: "Prvi ples",
            description: "A onda muzika do jutra.",
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
        subtitle:
          "Sve na jednom mestu — ceremonija u bašti, proslava u kamenoj sali.",
        imageUrl: IMG.locationsBg,
        cards: [
          {
            id: 1,
            title: "Ceremonija",
            time: "16:30",
            location: "Vrt imanja Terra, Fruška gora",
            text: "Otvoreni vrt sa maslinama i lavandom. Preporučujemo ravnije cipele — staza je posuta šljunkom.",
            image: IMG.locationA,
          },
          {
            id: 2,
            title: "Proslava",
            time: "19:30",
            location: "Kamena sala imanja, isto dvorište",
            text: "Večera i ples u sali sa dugim stolovima i svećama. Parking je u okviru imanja.",
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
        title: "Naši kadrovi",
        description: "Nekoliko trenutaka koje smo usput sačuvali.",
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
      order: 11,
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
      order: 12,
      data: {
        title: "Hvala što ste deo naše priče.",
        subtitle: "Vidimo se u septembru.",
        imageUrl: IMG.footer,
      },
    },
  ],
};
