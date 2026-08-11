import { UniversalProjectConfig } from "@/types/config";

/** Demo images live only in config — never hardcoded in section components */
const IMG = {
  hero:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=85",
  intro:
    "https://images.unsplash.com/photo-1566417713940-ae115709b8c4?auto=format&fit=crop&w=1600&q=85",
  countdown:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85",
  venue:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
  schedule:
    "https://images.unsplash.com/photo-1571266028241-3748309911cd?auto=format&fit=crop&w=1600&q=85",
  dress:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
  final:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=85",
  upload:
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=85",
  gallery: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1566417713940-ae115709b8c4?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1571266028241-3748309911cd?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
  ],
};

export const birthday18DefaultConfig: UniversalProjectConfig = {
  template: "birthday18",
  eventType: "comingOfAge",
  meta: {
    title: "Lena — Punoletstvo",
    description: "Premium digitalna pozivnica za noć punoletstva",
  },
  event: {
    date: "2026-09-12",
    rsvpDate: "2026-09-01",
    names: "Lena",
    location: {
      name: "Club Belvedere",
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
          name: "Silver",
          value: "#E8E8EA",
        },
        secondary: {
          name: "Ink",
          value: "#0A0A0B",
        },
        ternary: {
          name: "Steel",
          value: "#8B8F98",
        },
      },
      background: {
        name: "Void",
        value: "#050506",
      },
      backgroundSecondary: {
        name: "Charcoal",
        value: "#121214",
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
        subtitle: "ROĐENDAN",
        description: "Jedna noć. Jedan veliki trenutak.",
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
          "Jedna noć.\nJedan veliki trenutak.\n\nOsamnaesti rođendan se slavi samo jednom. Zato želim da ovu noć provedemo zajedno — uz dobru muziku, drage ljude i uspomene koje ostaju.",
        imageUrl: IMG.intro,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 3,
      data: {
        title: "DO POČETKA",
        description: "Odbrojavanje do noći za pamćenje",
        imageUrl: IMG.countdown,
      },
    },
    {
      id: "locations",
      name: "O proslavi",
      type: "locations",
      visible: true,
      order: 4,
      data: {
        title: "O PROSLAVI",
        subtitle: "Gde i kada",
        description: "Sve što treba da znaš pre nego što kreneš.",
        imageUrl: IMG.venue,
        cards: [
          {
            id: 1,
            title: "Club Belvedere",
            location: "Bulevar kralja Aleksandra 28, Beograd",
            time: "20:00",
            text: "Ulaz od 20:00. Parking u blizini, rezervisan prostor za goste.",
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
        title: "PLAN VEČERI",
        subtitle: "Ritam noći",
        imageUrl: IMG.schedule,
        items: [
          {
            id: "1",
            time: "20:00",
            title: "Okupljanje",
            description: "Dolazak, dobrodošlica i prvi kadrovi.",
          },
          {
            id: "2",
            time: "21:00",
            title: "Večera",
            description: "Zajednički sto, toast i kratki govor.",
          },
          {
            id: "3",
            time: "22:00",
            title: "Žurka",
            description: "Plesni podijum, DJ set i atmosfera do zore.",
          },
          {
            id: "4",
            time: "00:00",
            title: "Iznenađenje",
            description: "Trenutak koji nećete zaboraviti.",
          },
        ],
      },
    },
    {
      id: "ourGallery",
      name: "Galerija",
      type: "ourGallery",
      visible: true,
      order: 6,
      data: {
        title: "ATMOSFERA",
        description: "Ukus noći — crno, srebro i jak ritam.",
        images: IMG.gallery.map((url) => ({ url })),
      },
    },
    {
      id: "featureCards",
      name: "Kodeks odevanja",
      type: "featureCards",
      visible: true,
      order: 7,
      data: {
        title: "KODEKS ODEVANJA",
        subtitle: "Crna & Srebrna",
        description:
          "Obuci nešto u čemu se osećaš najbolje. Večeras slavimo!",
        cards: [
          {
            id: "1",
            title: "CRNA & SREBRNA",
            description:
              "Tamne nijanse, metalik detalji, čiste linije. Dođi kao za noć koju ćeš pamtiti.",
            icon: "shirt",
            accent: "#E8E8EA",
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
      order: 8,
      data: {
        title: "VIDIMO SE?",
        description: "Potvrdi dolazak i javi nam da li dolaziš — najkasnije do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za slavljenika",
        messagePlaceholder: "Napiši kratku poruku ili čestitku…",
        imageUrl: IMG.final,
      },
    },
    {
      id: "loveQuote",
      name: "Finalni poziv",
      type: "loveQuote",
      visible: true,
      order: 9,
      data: {
        title: "SPREMNI?",
        description: "Vidimo se na plesačkom podijumu.",
        imageUrl: IMG.final,
      },
    },
    {
      id: "uploadImagesSection",
      name: "Fotografije gostiju",
      type: "uploadImagesSection",
      visible: true,
      order: 10,
      data: {
        title: "UHVATI TRENUTAK",
        subtitle: "Podeli uspomene",
        description:
          "Snimi kadar sa podijuma, sa prijateljima ili sa tortom — i pošalji u privatnu galeriju.",
        buttonText: "Pošalji fotografiju",
        imageUrl: IMG.upload,
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 11,
      data: {
        title: "18. ROĐENDAN",
        subtitle: "LENA · 2026",
        description: "Hvala što deliš ovu noć sa mnom.",
      },
    },
  ],
};
