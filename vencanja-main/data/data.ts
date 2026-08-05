import AnimatedUser from "@/components/icons/AnimatedUser";
import AnimatedCalendar from "../components/icons/AnimatedCalendar";
import AnimatedClock from "../components/icons/AnimatedClock";
import AnimatedEyeIcon from "../components/icons/AnimatedEyeIcon";
import AnimatedHeart from "../components/icons/AnimatedHeart";
import AnimatedMail from "../components/icons/AnimatedMail";
import AnimatedMousePointer from "../components/icons/AnimatedMousePointer";
import AnimatedPenIcon from "../components/icons/AnimatedPenIcon";
import AnimatedSparkle from "../components/icons/AnimatedSparkle";
import {
  InstructionsCardProps,
  PackageBoxProps,
  WhyUsCardProps,
} from "@/types/general";

const SHARED_PACKAGE_FEATURES = [
  "Digitalna pozivnica na internetu, spremna za deljenje linkom",
  "Menjate tekstove, slike, boje i fontove kad god poželite",
  "Gosti potvrđuju dolazak online — vi vidite ko dolazi",
  "Raspored sedenja i organizacija stolova",
  "Praćenje budžeta, uplata i računa",
  "Lista obaveza do dana proslave",
  "Privatne fotografije koje vam gosti pošalju",
  "Privatni nalog za uređivanje pozivnice i organizaciju",
];

export const packages: PackageBoxProps[] = [
  {
    id: "1",
    title: "Venčanja",
    price: "40€",
    description:
      "Pozivnica i privatni prostor u kojem organizujete celo venčanje.",
    list: SHARED_PACKAGE_FEATURES,
    link: "/pozivnice",
  },
  {
    id: "2",
    title: "Krštenja",
    price: "40€",
    description:
      "Isto iskustvo — prilagođeno krštenju, sa gostima, stolovima i planiranjem.",
    list: SHARED_PACKAGE_FEATURES,
    link: "/pozivnice",
  },
  {
    id: "3",
    title: "Rođendani",
    price: "40€",
    description:
      "Živahna pozivnica i mesto gde pratite goste, troškove i pripreme.",
    list: SHARED_PACKAGE_FEATURES,
    link: "/pozivnice",
  },
];

export const whyUsCardsData: WhyUsCardProps[] = [
  {
    title: "Više od lepe pozivnice",
    description:
      "Uz pozivnicu dobijate privatni nalog: menjate sadržaj, pratite goste, budžet i obaveze — bez pomoći programera.",
    icon: AnimatedPenIcon,
    iconColor: "var(--color-hot)",
    index: 1,
  },
  {
    title: "Sve na jednom mestu",
    description:
      "Potvrde dolaska, raspored sedenja, novac i lista zadataka više nisu u pet različitih beležnica ili tabela.",
    icon: AnimatedCalendar,
    iconColor: "var(--color-accent)",
    index: 2,
  },
  {
    title: "Menjate kad god želite",
    description:
      "Ako se promeni lokacija, satnica ili fotografija — ispravite to sami, za nekoliko minuta.",
    icon: AnimatedSparkle,
    iconColor: "var(--color-hot)",
    index: 3,
  },
  {
    title: "Od primera do gotove pozivnice",
    description:
      "Izaberete dizajn koji vam se dopada ili nam opišete šta želite — zatim zajedno dogovorimo izradu.",
    icon: AnimatedClock,
    iconColor: "var(--color-accent)",
    index: 4,
  },
  {
    title: "Jasno ko dolazi",
    description:
      "Vidite ko je potvrdio dolazak, dodajete goste i pravite raspored sedenja spreman za štampu.",
    icon: AnimatedUser,
    iconColor: "var(--color-hot)",
    index: 5,
  },
  {
    title: "Privatne uspomene",
    description:
      "Fotografije koje gosti pošalju vide samo vi — ne idu na javnu pozivnicu.",
    icon: AnimatedHeart,
    iconColor: "var(--color-accent)",
    index: 6,
  },
];

export const instructionsData: InstructionsCardProps[] = [
  {
    title: "1. Pregledajte primere",
    description:
      "Otvorite katalog i pogledajte dizajne za venčanje, rođendan ili krštenje.",
    icon: AnimatedMousePointer,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 1,
  },
  {
    title: "2. Isprobajte izgled",
    description:
      "Otvorite primer koji vam se dopada i vidite kako izgleda sa vašim tekstovima i slikama.",
    icon: AnimatedPenIcon,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 2,
  },
  {
    title: "3. Javite nam se",
    description:
      "Pišite nam ako vam se dopada postojeći dizajn — ili opišite želje za potpuno prilagođenu pozivnicu.",
    icon: AnimatedMail,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 3,
  },
  {
    title: "4. Dogovorimo izradu",
    description:
      "Javljamo se, uskladimo detalje i pripremimo vašu pozivnicu i pristup nalogu.",
    icon: AnimatedEyeIcon,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 4,
  },
  {
    title: "5. Uređujte iz naloga",
    description:
      "Kada je sve spremno, u nalogu menjate sadržaj, pratite goste, stolove, budžet i obaveze.",
    icon: AnimatedSparkle,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 5,
  },
  {
    title: "6. Podelite sa gostima",
    description:
      "Pošaljete link pozivnice. Svaku izmenu i dalje radite sami, kad god zatreba.",
    icon: AnimatedHeart,
    iconColor: "var(--color-hot)",
    isLast: true,
    index: 6,
  },
];

export type BackofficeFeature = {
  title: string;
  description: string;
};

export const backofficeFeatures: BackofficeFeature[] = [
  {
    title: "Uređivanje pozivnice",
    description:
      "Promenite tekstove, slike i raspored na pozivnici u nekoliko klikova.",
  },
  {
    title: "Boje, fontovi i slike",
    description:
      "Uskladite izgled sa vašim stilom i zamenite fotografije kad god poželite.",
  },
  {
    title: "Ko dolazi na proslavu",
    description:
      "Pratite ko je potvrdio dolazak, dodajte goste i sačuvajte spisak kad vam zatreba.",
  },
  {
    title: "Raspored sedenja",
    description:
      "Napravite stolove, rasporedite goste i pripremite raspored za štampu.",
  },
  {
    title: "Novac i troškovi",
    description:
      "Beležite budžet, uplate i preostalo stanje — uz priloge računa ako želite.",
  },
  {
    title: "Lista obaveza",
    description:
      "Zapišite šta još treba uraditi do dana događaja i štiklirajte završeno.",
  },
  {
    title: "Fotografije od gostiju",
    description:
      "Primite uspomene koje gosti pošalju sa pozivnice — vidite ih samo vi.",
  },
  {
    title: "Pregled cele organizacije",
    description:
      "Na jednom mestu vidite goste, obaveze i finansije za svoj događaj.",
  },
];

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Izaberite ili opišite dizajn",
    description:
      "Pregledajte gotove primere ili nam napišite kakvu pozivnicu želite.",
  },
  {
    step: "02",
    title: "Kontaktirajte nas",
    description:
      "Pošaljite poruku preko forme ili drugih kontakata — dogovorimo izradu zajedno.",
  },
  {
    step: "03",
    title: "Organizujte iz svog naloga",
    description:
      "Kada pozivnica bude spremna, pratite goste, stolove, budžet i obaveze na jednom mestu.",
  },
];

export const faqQuestions = [
  {
    id: 1,
    title: "Šta dobijam uz pozivnicu?",
    description:
      "Digitalnu pozivnicu na vašem linku i privatni nalog u kojem menjate sadržaj, pratite ko dolazi, pravite raspored sedenja, vodite budžet, listu obaveza i primáte fotografije od gostiju.",
  },
  {
    id: 2,
    title: "Mogu li da menjam pozivnicu kasnije?",
    description:
      "Da. U svom nalogu menjate tekstove, slike, boje i fontove, kao i koje delove pozivnice gost vidi.",
  },
  {
    id: 3,
    title: "Kako gosti potvrđuju dolazak?",
    description:
      "Na pozivnici postoji jednostavna forma. Potvrde dolaska pratite u svom nalogu.",
  },
  {
    id: 4,
    title: "Da li mogu da napravim raspored sedenja?",
    description:
      "Da. Kreirate stolove, dodeljujete goste i spremite raspored za štampu.",
  },
  {
    id: 5,
    title: "Šta je sa budžetom i listom obaveza?",
    description:
      "U nalogu beležite troškove i uplate, kao i šta još treba uraditi do dana događaja — sve vezano za istu proslavu.",
  },
  {
    id: 6,
    title: "Da li su fotografije koje gosti pošalju javne?",
    description:
      "Ne. Te fotografije su privatne i dostupne samo vama u nalogu, u delu za slike.",
  },
  {
    id: 7,
    title: "Kako naručujem pozivnicu?",
    description:
      "Nema automatske kupovine na sajtu. Kontaktirajte nas ako vam se dopada neki od primera, ili nam opišite želje za potpuno prilagođenu pozivnicu — zatim dogovorimo izradu.",
  },
  {
    id: 8,
    title: "Kako delimo pozivnicu gostima?",
    description:
      "Kada pozivnica bude online, šaljete link gostima — emailom, Viberom, WhatsApp-om ili kako vama odgovara.",
  },
];
