import { FontKey } from "@/fontsForInvites";
import { DateFormat } from "@/helpers/formatDate";

export type DefaultConfig = {
  template: string;
  main: {
    header: string;
    font: FontKey;
    primaryColor: { h: number; s: number; v: number; a: number };
    secondaryColor: { h: number; s: number; v: number; a: number };
    backgroundColor: string;
    backgroundImage: string;
    date: string;
    dateFormat: DateFormat;
  };
  calendar: {
    visible: boolean;
    title: string;
  };
  hero: {
    heroTitle: string;
    heroImage: string;
  };
  firstSection: {
    visible: boolean;
    title: string;
    description: string;
  };
  boxSection: {
    visible: boolean;
    title: string;
    box: {
      id: number;
      title: string;
      time: string;
      description: string;
    }[];
  };
  form: {
    title: string;
    buttonText: string;
  };
  footer: {
    title: string;
    description: string;
  };
};

export const defaultConfig: DefaultConfig = {
  template: "wedding-01",
  main: {
    header: "Nevena & Jovan",
    font: "dancingScript",
    primaryColor: { h: 0, s: 0, v: 100, a: 1 },
    secondaryColor: { h: 0, s: 0, v: 0, a: 1 },
    backgroundColor: "#000000e2",
    backgroundImage:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1770201793/wedding/sry3niphtrknisoezmmr.jpg",

    date: "2026-08-08",
    dateFormat: "DD_MM_YYYY",
  },
  calendar: {
    title: "Kalendar",
    visible: true,
  },
  hero: {
    heroTitle: "Sačuvajte dan za naše venčanje!",
    heroImage:
      "https://res.cloudinary.com/dqqnpfbyf/image/upload/v1770200520/invites/nevena-jovan/f3t8ddj2pv3j52st8hqu.webp",
  },
  firstSection: {
    visible: true,
    title: "Naša priča",
    description:
      "Naša priča započela je spontano, ali je vrlo brzo postala sigurna i iskrena. Kroz zajedničke trenutke, putovanja, smeh i izazove, naučili smo koliko je važno imati jedno drugo. Ljubav nas je spojila, a danas sa radošću koračamo ka zajedničkom životu i svemu što nas tek čeka.",
  },
  boxSection: {
    visible: true,
    title: "Gde i kada",
    box: [
      {
        id: 1,
        title: "SKUP GOSTIJU",
        time: "13:00",
        description: "Subota, Jun 14, 2026",
      },
      {
        id: 2,
        title: "CRKVENO VENČANJE",
        time: "14:00",
        description: "Naziv Crkve",
      },
      {
        id: 3,
        title: "SKUP GOSTIJU U SALI",
        time: "16:00",
        description: "Naziv salve",
      },
      {
        id: 4,
        title: "GRAĐANSKO VENČANJE",
        time: "17:00",
        description: "Naziv Sale",
      },
    ],
  },
  form: {
    title: "Da li se vidimo?",
    buttonText: "Pošalji Potvrdu",
  },
  footer: {
    title: "Do našeg susreta u junu",
    description: "S ljubavlju i iskrenom zahvalnošću",
  },
};
