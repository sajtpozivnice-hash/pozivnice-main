import { UniversalProjectConfig } from "@/types/config";

export const birthday18InkDefaultConfig: UniversalProjectConfig = {
  template: "birthday18-ink",
  eventType: "comingOfAge",
  meta: {
    title: "Aleksa — 18 · Novinsko izdanje",
    description: "Monohromatska broadsheet pozivnica za punoletstvo",
    ogImage:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787347709/rishabh-sharma-R-js25Pv1LQ-unsplash_k1l2w2.jpg",
  },
  event: {
    date: "2027-10-03",
    rsvpDate: "2027-09-20",
    names: "Aleksa",
    location: {
      name: "Klub Preporod",
      address: "Beograd",
    },
  },
  theme: {
    fonts: {
      primary: "playfair",
      secondary: "lora",
    },
    colors: {
      base: {
        primary: {
          name: "Rubrika crvena",
          value: "#9C2A22",
        },
        secondary: {
          name: "Mastilo",
          value: "#1B1815",
        },
        ternary: {
          name: "Stara hartija",
          value: "#EAE2CC",
        },
      },
      background: {
        name: "Papir",
        value: "#F4EEDD",
      },
      backgroundSecondary: {
        name: "Panel",
        value: "#EAE2CC",
      },
    },
    backgroundImage:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787347709/rishabh-sharma-R-js25Pv1LQ-unsplash_k1l2w2.jpg",
  },
  sections: [
    {
      id: "hero",
      name: "Naslovna",
      type: "hero",
      visible: true,
      order: 1,
      data: {
        title: "IZDANJE BR. 18",
        subtitle: "PUNOLETSTVO",
        description: "SPECIJALNO IZDANJE · JEDNOM GODIŠNJE",
        badge: "18",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
      },
    },
    {
      id: "inviteText",
      name: "Uvodnik",
      type: "inviteText",
      visible: true,
      order: 2,
      data: {
        description:
          "OSAMNAEST GODINA U ŠTAMPI\n\nOve godine izlazi jubilarno izdanje — jedna noć, dobro društvo i naslovna vest koju ćemo prepričavati još dugo. Rezervišite mesto na vreme, tiraž je ograničen.",
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 3,
      data: {
        title: "DO ŠTAMPANJA IZDANJA",
        description: "Odbrojavanje do zaključenja broja",
      },
    },
    {
      id: "locations",
      name: "Informacije i lokacija",
      type: "locations",
      visible: true,
      order: 4,
      data: {
        title: "RUBRIKA: KADA & GDE",
        description: "Zvanične informacije redakcije za ovo izdanje.",
        cards: [
          {
            id: 1,
            title: "BEOGRAD",
            location: "Bulevar Kralja Aleksandra 73, Beograd",
            time: "20:00",
            text: "Ulaz od 20:00 časova. Adresa je potvrđena, parking dostupan u okolnim ulicama.",
          },
        ],
      },
    },
    {
      id: "schedule",
      name: "Sadržaj izdanja",
      type: "schedule",
      visible: true,
      order: 5,
      data: {
        title: "SADRŽAJ OVOG BROJA",
        subtitle: "Raspored večeri",
        items: [
          {
            id: "1",
            time: "20:00",
            title: "Otvaranje redakcije",
            description: "Dobrodošlica gostima i prve fotografije za naslovnu.",
          },
          {
            id: "2",
            time: "21:00",
            title: "Glavna vest",
            description: "Zajednička večera, torta i kratak govor za štampu.",
          },
          {
            id: "3",
            time: "22:00",
            title: "Vanredno izdanje",
            description: "Muzika, ples i atmosfera koja puni naslovnu stranu.",
          },
          {
            id: "4",
            time: "00:00",
            title: "Ponoćni dodatak",
            description: "Nastavak proslave do kasno — bonus prilog za hrabre.",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Oglas: kodeks odevanja",
      type: "featureCards",
      visible: true,
      order: 6,
      data: {
        title: "MALI OGLASI",
        subtitle: "KODEKS ODEVANJA",
        description:
          "Elegantno izdanje traži i elegantno odelo. Ponesi najbolju verziju sebe — ostalo prepusti večeri.",
        cards: [
          {
            id: "1",
            title: "SVEČANO, BEZ IZUZETKA",
            description:
              "Tamni tonovi, uglačane cipele i po želji jedan upečatljiv detalj. Fotoreporter je na zadatku cele večeri.",
            icon: "shirt",
            accent: "#9C2A22",
          },
        ],
      },
    },
    {
      id: "rsvp",
      name: "Prijava za urednika",
      type: "rsvp",
      visible: true,
      order: 7,
      data: {
        title: "PRIJAVITE SE ZA IZDANJE",
        description:
          "Popunite kupon i pošaljite redakciji potvrdu dolaska najkasnije do ",
        buttonText: "Pošalji prijavu",
        messageLabel: "Poruka za slavljenika",
        messagePlaceholder: "Napišite kratku čestitku za naslovnu stranu…",
      },
    },
    {
      id: "loveQuote",
      name: "Poslednja strana",
      type: "loveQuote",
      visible: true,
      order: 8,
      data: {
        title: "VIDIMO SE NA NASLOVNOJ.",
        description: "Do tada — čuvajte tajnu i spremite najbolje izdanje sebe.",
      },
    },
    {
      id: "uploadImagesSection",
      name: "Foto-desk",
      type: "uploadImagesSection",
      visible: true,
      order: 9,
      data: {
        title: "FOTO-DESK REDAKCIJE",
        subtitle: "Pošaljite materijal",
        description:
          "Snimili ste dobar kadar sa proslave? Pošaljite ga u redakciju za sledeće izdanje.",
        buttonText: "Pošalji fotografiju",
      },
    },
    {
      id: "footer",
      name: "Impresum",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "18. IZDANJE",
        subtitle: "ALEKSA · 2026",
        description: "Hvala što ste deo tiraža ove večeri.",
      },
    },
  ],
};
