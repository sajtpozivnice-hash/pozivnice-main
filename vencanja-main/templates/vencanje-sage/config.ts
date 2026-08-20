import { UniversalProjectConfig } from "@/types/config";

export const vencanjeSageDefaultConfig: UniversalProjectConfig = {
  template: "vencanje-sage",
  meta: {
    title: "Ana & Marko — Pozivnica za venčanje",
    description: "Tiha, topla pozivnica u tonovima kadulje i zobi",
  },
  event: {
    date: "2026-10-03",
    rsvpDate: "2026-09-05",
    names: "Ana & Marko",
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "cormorant",
    },
    colors: {
      base: {
        primary: {
          name: "Kadulja",
          value: "#6B7F6A",
        },
        secondary: {
          name: "Mastilo",
          value: "#2C2A26",
        },
      },
      background: {
        name: "Zob",
        value: "#F4F0E8",
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
        title: "Jedan dan koji čuvamo za one koje volimo.",
        subtitle: "Venčanje",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Još malo pa zajedno",
        description: "Vreme do prvog zajedničkog „da“.",
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
          "Sa radošću Vas pozivamo da budete uz nas onog dana kada dve priče postanu jedna.\nBez žurbe, uz tople boje jeseni, dobru hranu i ljude koji nam znače.\nVaše prisustvo je jedini poklon koji želimo.",
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
          "Prva subota oktobra, kada svetlost postane mekša, a dani topliji od letnjih.",
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
        subtitle: "Sedam godina, tri grada i jedan isti odgovor.",
        text: "Upoznali smo se na kraju leta, na proslavi na koje niko od nas nije planirao da ode.\n\nOd tada su se nizali stanovi, putovanja bez plana i obična jutra koja su nam bila najlepša.\n\nSada želimo da najvažniji dan podelimo sa ljudima koji su bili deo svake od tih godina.",
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
        subtitle: "Bez žurbe — od popodnevne ceremonije do kasne večeri.",
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
            title: "Vencanje",
            description: "Zavet pod starim maslinama, uz tihu muziku.",
          },
          {
            id: "3",
            time: "17:00",
            title: "Prvi Ples",
            description: "Ples sa nama.",
          },
          {
            id: "4",
            time: "22:00",
            title: "Torta",
            description: "Sladak završetak dana.",
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
        cards: [
          {
            id: 1,
            title: "Vencanje",
            time: "16:30",
            location: "Vrt imanja Kadulja, Sremski Karlovci",
            text: "Otvoreni vrt sa maslinama i lavandom. Preporučujemo ravnije cipele — staza je posuta šljunkom.",
          },
          {
            id: 2,
            title: "Proslava",
            time: "17:00",
            location: "Kamena sala imanja, isto dvorište",
            text: "Večera i ples u sali sa dugim stolovima i svećama. Parking je u okviru imanja.",
          },
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
        subtitle: "Galerija gostiju",
        description:
          "Ako tog dana uslikate nešto lepo, ostavite nam fotografiju ovde — sve stiže pravo kod nas.",
        buttonText: "Dodajte fotografiju",
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
        subtitle: "Vidimo se u oktobru.",
      },
    },
  ],
};
