import { FontKey } from "@/fontsForInvites";
import { DateFormat } from "@/helpers/formatDate";
import {
  UtensilsCrossed,
  LucideIcon,
  Home,
  ChurchIcon,
  PartyPopper,
} from "lucide-react";

export type DefaultConfig = {
  template: string;
  main: {
    coupleNames: string;
    date: string;
    place: string;
    primaryColor: { h: number; s: number; v: number; a: number };
    secondaryColor: { h: number; s: number; v: number; a: number };
    fontColor: { h: number; s: number; v: number; a: number };
    fontSecondaryColor: { h: number; s: number; v: number; a: number };
    dateFormat: DateFormat;
    primaryFont: FontKey;
    secondaryFont: FontKey;
    ternaryFont: FontKey;
  };
  calendar: {
    visible: boolean;
    title: string;
  };
  hero: {
    heroTitle: string;
    heroImage: string;
    buttonText: string;
  };
  ourStory: {
    visible: boolean;
    title: string;
    firstText: string;
    quote: string;
    bottomText: string;
    hisImage: string;
    hersImage: string;
  };
  theBigDay: {
    visible: boolean;
    title: string;
    titleDescription: string;
    cards: {
      id: number;
      title: string;
      description: string;
      time: string;
      icon: LucideIcon;
    }[];
  };
  destination: {
    visible: boolean;
    title: string;
    card: {
      id: number;
      title: string;
      description: string;
      image: string;
    }[];
  };
  rsvp: {
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
  };
};

export const defaultConfig: DefaultConfig = {
  template: "wedding-02",
  main: {
    coupleNames: "Anja & Vladimir",
    primaryFont: "kaushanScript",
    secondaryFont: "arimo",
    ternaryFont: "vollkorn",
    primaryColor: {
      h: 54,
      s: 36,
      v: 21,
      a: 0.3,
    },
    secondaryColor: {
      h: 0,
      s: 4.84375,
      v: 88.57291666666667,
      a: 1,
    },
    fontColor: {
      h: 0,
      s: 4.84375,
      v: 88.57291666666667,
      a: 1,
    },
    fontSecondaryColor: {
      h: 355.49,
      s: 75.22,
      v: 90.2,
      a: 1,
    },
    date: "2026-05-02",
    dateFormat: "DD_MM_YYYY",
    place: "Club Reset",
  },
  calendar: {
    visible: true,
    title: "Kalendar",
  },
  hero: {
    heroTitle: "Venčavamo se!",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
    buttonText: "Potvrdite svoje mesto",
  },
  ourStory: {
    visible: true,
    title: "Naša Priča",
    firstText:
      "Počelo je jednim jednostavnim susretom i polako je preraslo u prelepo putovanje ispunjeno zajedničkim snovima, bezbroj smeha i nezaboravnim trenucima. Kroz mirne svakodnevne uspomene i uzbudljive avanture, svaki korak na tom putu nas je sve više zbližavao i doveo do ovog posebnog poglavlja naše priče.",
    quote: "Dve duše sa jednom mišlju, dva srca koja kucaju kao jedno.",
    bottomText:
      "Danas vas pozivamo da budete deo našeg narednog velikog poglavlja dok izgovaramo sudbonosno „da“ i započinjemo naš zajednički život. Jedva čekamo da ovaj poseban dan proslavimo sa našom najdražom porodicom i prijateljima.",
    hisImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    hersImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
  },
  theBigDay: {
    visible: true,
    title: "Naš Veliki Dan",
    titleDescription: "Raspored Događaja",
    cards: [
      {
        id: 0,
        title: "Skup Gostiju",
        description: "Ove stavljate svoj opis za skup gostiju",
        time: "12:00",
        icon: Home,
      },
      {
        id: 1,
        title: "Crkveno Vencanje",
        description: "Ove stavljate svoj opis za crkveno vencanje",
        time: "14:00",
        icon: ChurchIcon,
      },
      {
        id: 2,
        title: "Skup gostiju u sali",
        description: "Ove stavljate svoj opis za skup u sali",
        time: "16:00",
        icon: UtensilsCrossed,
      },
      {
        id: 3,
        title: "Gradjansko Vencanja",
        description: "Ove stavljate svoj opis za gradjansko vencanje",
        time: "17:00",
        icon: PartyPopper,
      },
    ],
  },
  destination: {
    visible: true,
    title: "Destinacije",
    card: [
      {
        id: 0,
        title: "Crkva",
        description: "Adresa Crkve",
        image:
          "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200",
      },
      {
        id: 1,
        title: "Druga Adresa",
        description: "Druga Adresa Opis",
        image:
          "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200",
      },
      {
        id: 2,
        title: "Treca Adresa",
        description: "Druga Adresa Opis",
        image:
          "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200",
      },
    ],
  },
  rsvp: {
    title: "Potvrda dolaska",
    subtitle: "Molimo vas da potvrdite dolazak do tada",
  },
  footer: {
    description: "Opis FOotera",
  },
};
