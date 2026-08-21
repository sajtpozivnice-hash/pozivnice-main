import { UniversalProjectConfig } from "@/types/config";

const IMG = {
  hero: "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023931/pexels-junielly-oliveira-2736244-4960960_migtwt.jpg",
  picnic:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1787327273/hoyoun-lee-__AjVMCCrnM-unsplash_dhyisf.jpg",
  venue:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023813/photo-1464366400600-7168b8af9bc3_dmpg2x.avif",
};

export const kidsHoneyDefaultConfig: UniversalProjectConfig = {
  template: "kids-honey",
  eventType: "kidsBirthday",
  meta: {
    title: "Mila — medeni 1. rođendan",
    description:
      "Medeni picnic za prvi rođendan — honey jar, pčele i crveni balon",
  },
  event: {
    date: "2027-06-14",
    rsvpDate: "2027-06-01",
    names: "Mila",
  },
  theme: {
    fonts: {
      primary: "greatVibes",
      secondary: "lora",
    },
    colors: {
      base: {
        primary: {
          name: "Med",
          value: "#E9A825",
        },
        secondary: {
          name: "Crveni balon",
          value: "#C23B2E",
        },
        ternary: {
          name: "Nebo",
          value: "#B7D9EA",
        },
      },
      background: {
        name: "Krema",
        value: "#FFF6E8",
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
        title: "Jedna svećica u medenoj tegli",
        subtitle: "Medeni picnic",
        description:
          "Pozivamo vas u naš mali šumski piknik — pun meda, smeha i crvenih balona.",
        badge: "1 godina",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
        image: IMG.hero,
      },
    },
    {
      id: "countdown",
      name: "Odbrojavanje",
      type: "countdown",
      visible: true,
      order: 2,
      data: {
        title: "Do medene proslave",
        description: "Pčele već broje dane.",
      },
    },
    {
      id: "inviteText",
      name: "Pozivnica",
      type: "inviteText",
      visible: true,
      order: 3,
      data: {
        description:
          "Dragi prijatelji, pozivamo vas na Milin prvi rođendan — medeni picnic pod otvorenim nebom. Donesite smeh, udobne patike i dobar apetit!",
        imageUrl: IMG.picnic,
      },
    },
    {
      id: "schedule",
      name: "Raspored",
      type: "schedule",
      visible: true,
      order: 4,
      data: {
        title: "Tok medenog dana",
        subtitle: "Mali program",
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Dolazak gostiju",
            description: "Baloni, medeni keksići i zagrljaji",
          },
          {
            id: "2",
            time: "16:30",
            title: "Igre u bašti",
            description: "Lov na pčelice i male nagrade",
          },
          {
            id: "3",
            time: "17:15",
            title: "Torta",
            description: "Jedna svećica — puno aplauza",
          },
          {
            id: "4",
            time: "18:00",
            title: "Zajedničke fotke",
            description: "Crveni balon i medeni osmijesi",
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
        title: "Za naše goste",
        subtitle: "Mali saveti",
        cards: [
          {
            id: "1",
            title: "Pokloni",
            description:
              "Ako želite poklon — knjige, mekani medvedići i male igrice su savršeni.",
            icon: "gift",
          },
          {
            id: "2",
            title: "Šta obući",
            description: "Udobno i vedro — žute, krem i crvene boje su dobrodošle.",
            icon: "shirt",
          },
          {
            id: "3",
            title: "Aktivnosti",
            description: "Igre, honey bar, photo corner sa balonima.",
            icon: "party",
          },
          {
            id: "4",
            title: "Za roditelje",
            description: "Proslava do 19:00. Parking u blizini bašte.",
            icon: "baby",
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
        subtitle: "Naša medena bašta",
        cards: [
          {
            id: 1,
            title: "Picnic bašta",
            location: "Park medenih staza 3, Beograd",
            time: "Od 16:00",
            text: "Senovita bašta, igralište i mesto za kolica.",
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
        title: "Podeli medeni kadar",
        subtitle: "Gostujuće fotke",
        description: "Uhvati smeh, tortu ili crveni balon — i pošalji nam!",
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
        title: "Hoćeš li na picnic?",
        description: "Potvrdi dolazak najkasnije do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za Milu",
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
        title: "Vidimo se u bašti!",
        subtitle: "Sa ljubavlju, porodica",
        description: "Pitanja? Javite se preko RSVP forme.",
      },
    },
  ],
};
