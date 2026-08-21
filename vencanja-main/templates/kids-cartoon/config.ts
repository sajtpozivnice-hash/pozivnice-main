import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://images.unsplash.com/photo-1519689373023-dd07cfcfed98?auto=format&fit=crop&w=1400&q=85",
  party:
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85",
  cake: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=85",
  venue:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
  gifts:
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
};

export const kidsCartoonDefaultConfig: UniversalProjectConfig = {
  template: "kids-cartoon",
  eventType: "kidsBirthday",
  meta: {
    title: "Luka — cartoon 1. rođendan",
    description: "Šarena cartoon pozivnica za prvi dečiji rođendan",
  },
  event: {
    date: "2026-10-10",
    rsvpDate: "2026-09-28",
    names: "Luka",
  },
  theme: {
    fonts: {
      primary: "robotoCondensed",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Tomato",
          value: "#FF6B4A",
        },
        secondary: {
          name: "Sky",
          value: "#4C9FFF",
        },
        ternary: {
          name: "Sun",
          value: "#FFE566",
        },
      },
      background: {
        name: "Nebo",
        value: "#E8F6FF",
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
        title: "Prva godina avanture!",
        subtitle: "Cartoon party",
        description: "Baloni, igre, torta i puno smeha — dođi u naš strip!",
        badge: "1 godina",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
        image: IMG.hero,
      },
    },
    {
      id: "inviteText",
      name: "Pozivnica",
      type: "inviteText",
      visible: true,
      order: 2,
      data: {
        description:
          "Pozivamo te na Lukin 1. rođendan — cartoon žurka sa igrama, photo booth-om i tortom kao iz crtanog!",
        imageUrl: IMG.party,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 3,
      data: {
        title: "Još samo malo…",
        description: "Odbrojavanje do velikog dana",
      },
    },
    {
      id: "schedule",
      name: "Program",
      type: "schedule",
      visible: true,
      order: 4,
      data: {
        title: "Epizode dana",
        subtitle: "Šta nas čeka",
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Ulaz u strip",
            description: "Baloni i welcome sticker",
          },
          {
            id: "2",
            time: "16:30",
            title: "Igre i smeh",
            description: "Cartoon zone i male nagrade",
          },
          {
            id: "3",
            time: "17:30",
            title: "Torta boom",
            description: "Jedna svećica — veliki aplauz",
          },
          {
            id: "4",
            time: "18:00",
            title: "After cartoon",
            description: "Ples i zajedničke fotke",
          },
        ],
      },
    },
    {
      id: "featureCards",
      name: "Korisne informacije",
      type: "featureCards",
      visible: true,
      order: 5,
      data: {
        title: "Mali vodič za goste",
        subtitle: "Da sve bude lako",
        cards: [
          {
            id: "1",
            title: "Pokloni",
            description:
              "Ako želite poklon — knjige, kocke i male avanture su hit.",
            icon: "gift",
            accent: "#FF6B4A",
            image: IMG.gifts,
          },
          {
            id: "2",
            title: "Šta obući",
            description: "Udobno i šareno — kao u crtanom!",
            icon: "shirt",
            accent: "#4C9FFF",
          },
          {
            id: "3",
            title: "Aktivnosti",
            description: "Bojenje, igre, photo booth i baloni.",
            icon: "party",
            accent: "#FFE566",
          },
          {
            id: "4",
            title: "Za roditelje",
            description: "Proslava do 19:00. Parking u blizini.",
            icon: "baby",
            accent: "#7EE0B0",
          },
        ],
      },
    },
    {
      id: "locations",
      name: "Lokacija",
      type: "locations",
      visible: true,
      order: 6,
      data: {
        title: "Gde se družimo",
        subtitle: "Adresa avanture",
        cards: [
          {
            id: 1,
            title: "Cartoon Playhouse",
            location: "Bulevar dečjih snova 7, Beograd",
            time: "Od 16:00",
            text: "Playroom + bašta. Lako za kolica i parking.",
            image: IMG.venue,
          },
        ],
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje slika",
      type: "uploadImagesSection",
      visible: true,
      order: 8,
      data: {
        title: "Dodaj svoj kadar",
        subtitle: "Gostujuće fotke",
        description: "Uhvati smeh, tortu ili ples — i pošalji nam!",
        buttonText: "Dodaj fotografije",
      },
    },
    {
      id: "rsvp",
      name: "Potvrda prisustva",
      type: "rsvp",
      visible: true,
      order: 9,
      data: {
        title: "Hoćeš li u strip?",
        description: "Potvrdi dolazak najkasnije do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za Luku",
        messagePlaceholder: "Napiši kratku čestitku…",
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "Vidimo se u crtanom!",
        subtitle: "Sa ljubavlju, porodica",
        description: "Pitanja? Javite se preko RSVP forme.",
      },
    },
  ],
};
