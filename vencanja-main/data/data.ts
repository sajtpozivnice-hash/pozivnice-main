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
  "QR kod za štampu — gosti skeniraju i odmah uploaduju fotografije",
  "Privatne fotografije koje vam gosti pošalju (vidite samo vi)",
  "Privatni nalog za uređivanje pozivnice i organizaciju",
];

export const packages: PackageBoxProps[] = [
  {
    id: "1",
    title: "Venčanja",
    price: "3.999 RSD",
    description:
      "Pozivnica i privatni prostor u kojem organizujete celo venčanje.",
    list: SHARED_PACKAGE_FEATURES,
    link: "/pozivnice",
  },
  {
    id: "2",
    title: "Punoletstva",
    price: "3.999 RSD",
    description:
      "Premium pozivnica za 18. i noć proslave — gosti, budžet i planer u nalogu.",
    list: SHARED_PACKAGE_FEATURES,
    link: "/pozivnice",
  },
  {
    id: "3",
    title: "Dečiji rođendani",
    price: "3.999 RSD",
    description:
      "Živahna pozivnica i mesto gde pratite goste, troškove i pripreme.",
    list: SHARED_PACKAGE_FEATURES,
    link: "/pozivnice",
  },
  {
    id: "4",
    title: "Krštenja",
    price: "3.999 RSD",
    description:
      "Isto iskustvo — prilagođeno krštenju, sa gostima, stolovima i planiranjem.",
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
      "Potvrde dolaska, raspored sedenja, finansije i lista zadataka više nisu u pet različitih beležnica ili tabela.",
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
    title: "1. Izaberite pozivnicu",
    description:
      "Pregledajte našu ponudu digitalnih pozivnica za venčanja, rođendane i krštenja i odaberite dizajn koji vam se najviše dopada.",
    icon: AnimatedMousePointer,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 1,
  },
  {
    title: "2. Unesite podatke",
    description:
      "Na odabranoj pozivnici unesite osnovne informacije o vašem događaju i pošaljite zahtev putem forme. Ako imate pitanja ili posebne napomene, možete ih napisati u istoj poruci.",
    icon: AnimatedPenIcon,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 2,
  },
  {
    title: "3. Aktivacija pozivnice",
    description:
      "Nakon evidentirane uplate, aktiviramo vašu pozivnicu i šaljemo vam pristup privatnom nalogu.",
    icon: AnimatedMail,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 3,
  },
  {
    title: "4. Uredite sve po svojoj želji",
    description:
      "Iz privatnog naloga možete u svakom trenutku menjati tekstove, fotografije, boje i ostale detalje na pozivnici – bez pomoći programera i bez čekanja.",
    icon: AnimatedEyeIcon,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 4,
  },
  {
    title: "5. Organizujte događaj na jednom mestu",
    description:
      "Pratite potvrde dolaska, rasporedite goste po stolovima, vodite troškove, planirajte obaveze i pregledajte fotografije koje vam gosti pošalju.",
    icon: AnimatedSparkle,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 5,
  },
  {
    title: "6. Podelite pozivnicu sa gostima",
    description:
      "Dobijate jedinstveni link koji možete poslati putem Vibera, WhatsApp-a, Messengera, SMS-a, e-maila ili društvenih mreža. Sve izmene koje napravite kasnije automatski će biti vidljive svima koji otvore isti link, bez potrebe da ponovo šaljete pozivnicu.",
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
      "Izmenite tekstove, fotografije i ostale informacije na pozivnici kad god poželite.",
  },
  {
    title: "Boje, fontovi i slike",
    description:
      "Prilagodite boje, fontove i fotografije tako da pozivnica bude baš po vašem ukusu.",
  },
  {
    title: "Ko dolazi na proslavu",
    description:
      "Pratite ko je potvrdio dolazak, koliko gostiju dolazi i u svakom trenutku imajte pregled svih prijava.",
  },
  {
    title: "Raspored sedenja",
    description:
      "Jednostavno rasporedite goste po stolovima i pripremite raspored za salu bez papira i precrtavanja.",
  },
  {
    title: "Novac i troškovi",
    description:
      "Vodite pregled svih troškova, planiranog budžeta i uplata kako biste u svakom trenutku znali koliko ste potrošili.",
  },
  {
    title: "Lista obaveza",
    description:
      "Napravite spisak svega što treba završiti i lako pratite šta je već obavljeno.",
  },
  {
    title: "Fotografije od gostiju",
    description:
      "Gosti mogu da pošalju fotografije sa događaja, a one će biti dostupne samo vama u privatnom nalogu.",
  },
  {
    title: "Sve na jednom mestu",
    description:
      "Sve važne informacije o vašem događaju nalaze se na jednom mestu — od pozivnice i gostiju do troškova i obaveza.",
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
    title: "Odaberite pozivnicu",
    description:
      "Pregledajte našu ponudu i izaberite dizajn koji vam se najviše dopada.",
  },
  {
    step: "02",
    title: "Unesite podatke i pošaljite zahtev",
    description:
      "Na odabranoj pozivnici unesite podatke o vašem događaju i pošaljite zahtev putem forme. Ako imate dodatna pitanja, možete ih napisati u istoj poruci.",
  },
  {
    step: "03",
    title: "Aktivacija i deljenje",
    description:
      "Nakon što evidentiramo uplatu, vaša pozivnica se aktivira i šaljemo vam pristup privatnom nalogu. Odmah dobijate jedinstveni link koji možete podeliti sa gostima, a u svom nalogu možete u svakom trenutku menjati sadržaj pozivnice, pratiti potvrde dolaska, organizovati raspored sedenja, voditi troškove i koristiti sve ostale funkcije koje platforma nudi.",
  },
];
