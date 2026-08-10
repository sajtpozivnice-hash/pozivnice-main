import { UniversalProjectConfig } from "@/types/config";

/** Royalty-free Unsplash placeholders — only in config, never hardcoded in components */
const IMG = {
  hero:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023489/photo-1530103862676-de8c9debad1d_rxuitz.avif",
  portrait:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023223/pexels-matheus-rodrigues-672111387-18212443_mr0hd2.jpg",
  balloons:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85",
  cake:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023931/pexels-junielly-oliveira-2736244-4960960_migtwt.jpg",
  party:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023854/photo-1513151233558-d860c5398176_xvejar.avif",
  venue:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023813/photo-1464366400600-7168b8af9bc3_dmpg2x.avif",
  gifts:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023699/photo-1549465220-1a8b9238cd48_avxoqq.avif",
  activities:
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023761/photo-1527529482837-4698179dc6ce_x4mmyo.avif",
  gallery: [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023699/photo-1549465220-1a8b9238cd48_avxoqq.avif",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=85",
    "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1786023813/photo-1464366400600-7168b8af9bc3_dmpg2x.avif",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  ],
};

export const rodjendan01DefaultConfig: UniversalProjectConfig = {
  template: "rodjendan-01",
  eventType: "kidsBirthday",
  meta: {
    title: "Mila — 7. rođendan",
    description: "Moderna pozivnica za rođendansku proslavu",
  },
  event: {
    date: "2026-09-20",
    rsvpDate: "2026-09-10",
    names: "Mila",
  },
  theme: {
    fonts: {
      primary: "dancingScript",
      secondary: "inter",
    },
    colors: {
      base: {
        primary: {
          name: "Coral",
          value: "#FF5C8A",
        },
        secondary: {
          name: "Sky",
          value: "#3D8BFF",
        },
        ternary: {
          name: "Mint",
          value: "#2EC4B6",
        },
      },
      background: {
        name: "Soft Peach",
        value: "#FFF6F0",
      },
      backgroundSecondary: {
        name: "Soft Sky",
        value: "#EEF6FF",
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
        title: "Rođendanska žurka!",
        subtitle: "Pozivamo te na",
        description:
          "Igre, torta, muzika i puno smeha. Dođi da zajedno napravimo nezaboravan dan.",
        badge: "7 godina",
        ctaText: "Potvrdi dolazak",
        ctaHref: "#rsvp",
        image: IMG.portrait,
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
          "Dragi prijatelji, sa velikom radošću vas pozivamo da proslavite Milin 7. rođendan. Spremate se za popodne puno igara, balona i slatkih iznenađenja!",
        imageUrl: IMG.balloons,
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
        imageUrl: IMG.party,
      },
    },
    {
      id: "schedule",
      name: "Program",
      type: "schedule",
      visible: true,
      order: 4,
      data: {
        title: "Program dana",
        subtitle: "Šta nas čeka",
        imageUrl: IMG.cake,
        items: [
          {
            id: "1",
            time: "16:00",
            title: "Dolazak i igre",
            description: "Baloni, welcome drink i slobodne igre na otvorenom.",
          },
          {
            id: "2",
            time: "17:00",
            title: "Kreativna radionica",
            description: "Pravimo maske, narukvice i male suvenire.",
          },
          {
            id: "3",
            time: "18:00",
            title: "Torta i pevanje",
            description: "Zajedničko duvanje svećica i slatki trenuci.",
          },
          {
            id: "4",
            time: "19:00",
            title: "Ples i veselje",
            description: "Omiljene pesme, ples i fotografisanje.",
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
        title: "Sve što treba da znaš",
        subtitle: "Za goste i roditelje",
        description:
          "Kratke napomene da proslava protekne opušteno za sve.",
        cards: [
          {
            id: "1",
            title: "Pokloni",
            description:
              "Ako želite da donesete poklon, Mila voli kreativne setove, knjige i male avanture.",
            icon: "gift",
            accent: "#FF5C8A",
            image: IMG.gifts,
          },
          {
            id: "2",
            title: "Dress code",
            description:
              "Udobna, šarena odeća! Predlažemo pastalne boje i patike za igre.",
            icon: "shirt",
            accent: "#3D8BFF",
          },
          {
            id: "3",
            title: "Zabavne aktivnosti",
            description:
              "Face painting, piñata, karaoke ugao i foto-booth sa rekvizitima.",
            icon: "party",
            accent: "#FFB703",
            image: IMG.activities,
          },
          {
            id: "4",
            title: "Info za roditelje",
            description:
              "Proslava traje do 20:00. Roditelji su dobrodošli da ostanu ili se vrate po decu.",
            icon: "baby",
            accent: "#2EC4B6",
          },
          {
            id: "5",
            title: "Napomena za goste",
            description:
              "Molimo vas da potvrdite dolazak do 10. septembra zbog organizacije hrane i torti.",
            icon: "info",
            accent: "#9B5DE5",
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
        subtitle: "Lokacija proslave",
        description: "Lako dostupno, parking u blizini.",
        imageUrl: IMG.venue,
        cards: [
          {
            id: 1,
            title: "Party Garden Studio",
            subtitle: "Bašta & playroom",
            location: "Bulevar umetnosti 12, Beograd",
            time: "Od 16:00",
            text: "Prostrana bašta sa igralištem i zatvorenim prostorom za loše vreme.",
            image: IMG.venue,
            icon: "map-pin",
          },
        ],
      },
    },
    {
      id: "ourGallery",
      name: "Galerija",
      type: "ourGallery",
      visible: true,
      order: 7,
      data: {
        title: "Trenuci za pamćenje",
        description: "Mali uvid u atmosferu koju volimo",
        images: IMG.gallery.map((url) => ({ url })),
      },
    },
    {
      id: "uploadImagesSection",
      name: "Dodavanje slika",
      type: "uploadImagesSection",
      visible: true,
      order: 8,
      data: {
        title: "Podeli uspomene sa žurke",
        subtitle: "Gostujuće fotografije",
        description:
          "Uslikaj trenutak, smeh ili tortu — i dodaj u zajedničku galeriju proslave.",
        buttonText: "Dodaj fotografije",
        imageUrl: IMG.party,
      },
    },
    {
      id: "rsvp",
      name: "RSVP",
      type: "rsvp",
      visible: true,
      order: 9,
      data: {
        title: "Hoćeš li doći?",
        description: "Potvrdi dolazak najkasnije do ",
        buttonText: "Pošalji potvrdu",
        messageLabel: "Poruka za slavljenika",
        messagePlaceholder: "Napiši kratku čestitku ili poruku…",
        imageUrl: IMG.balloons,
      },
    },
    {
      id: "footer",
      name: "Podnožje",
      type: "footer",
      visible: true,
      order: 10,
      data: {
        title: "Vidimo se uskoro!",
        subtitle: "Sa ljubavlju, porodica",
        description: "Pitanja? Javite se organizatoru preko RSVP forme.",
        imageUrl: IMG.party,
      },
    },
  ],
};
