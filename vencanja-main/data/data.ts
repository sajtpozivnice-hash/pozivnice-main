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

export const packages: PackageBoxProps[] = [
  {
    id: "1",
    title: "Venčanja",
    price: "40€",
    description: "Sve što vam treba za savršen dan, brzo i lako organizovano",
    list: [
      "Personalizovan domen",
      "Odbrojavanje do datuma rođendana",
      "Detalji lokacije sa mapama i navigacijom",
      "Galerija slika koju kreiraju vaši gosti",
      "Online RSVP (potvrda) forma na vaš email",
      "Krieranje spiska gostiju",
      "Kreiranje plana sedenja",
      "Plan sedenja i spisak gostiju možete preuzeti i odštampati",
      "Editabilno i nakon kupovine – menjajte tekstove, slike, boje i fontove",
    ],
    link: "/",
  },
  {
    id: "2",
    title: "Krštenja",
    price: "40€",
    description: "Kompletno iskustvo, prilagođeno vašim željama",
    list: [
      "Personalizovan domen",
      "Odbrojavanje do datuma rođendana",
      "Detalji lokacije sa mapama i navigacijom",
      "Galerija slika koju kreiraju vaši gosti",
      "Online RSVP (potvrda) forma na vaš email",
      "Krieranje spiska gostiju",
      "Kreiranje plana sedenja",
      "Plan sedenja i spisak gostiju možete preuzeti i odštampati",
      "Editabilno i nakon kupovine – menjajte tekstove, slike, boje i fontove",
    ],
    link: "/",
  },
  {
    id: "3",
    title: "Rođendani",
    price: "40€",
    description: "Premium iskustvo, za slavlje iz snova",
    list: [
      "Personalizovan domen",
      "Odbrojavanje do datuma rođendana",
      "Detalji lokacije sa mapama i navigacijom",
      "Galerija slika koju kreiraju vaši gosti",
      "Online RSVP (potvrda) forma na vaš email",
      "Krieranje spiska gostiju",
      "Kreiranje plana sedenja",
      "Plan sedenja i spisak gostiju možete preuzeti i odštampati",
      "Editabilno i nakon kupovine – menjajte tekstove, slike, boje i fontove",
    ],
    link: "/",
  },
];

export const whyUsCardsData: WhyUsCardProps[] = [
  {
    title: "Pažljivo planiranje",
    description:
      "Brinemo o detaljima i rokovima kako biste vi mogli bezbrižno da uživate.",
    icon: AnimatedCalendar,
    iconColor: "var(--color-hot)",
    index: 1,
  },
  {
    title: "Kreativan Dizajn",
    description:
      "Kreiramo moderan i funkcionalan dizajn koji ostavlja snažan i dugotrajan utisak",
    icon: AnimatedSparkle,
    iconColor: "var(--color-accent)",
    index: 2,
  },
  {
    title: "Lični pečat",
    description:
      "Svaki događaj oblikujemo kroz detalje koji pričaju vašu priču.",
    icon: AnimatedHeart,
    iconColor: "var(--color-hot)",
    index: 3,
  },
  {
    title: "Brza izrada",
    description:
      "Kompletna realizacija projekta u roku od par minuta, bez kompromisa na kvalitetu.",
    icon: AnimatedClock,
    iconColor: "var(--color-accent)",
    index: 4,
  },
  {
    title: "Upravljanje gostima i plan sedenja",
    description:
      "Pratite ko dolazi na događaj, kreirajte plan sedenja i preuzmite ga u PDF-u za štampu.",
    icon: AnimatedUser,
    iconColor: "var(--color-hot)",
    index: 5,
  },
  {
    title: "Potpuna kontrola i editabilnost",
    description:
      "Nakon plaćanja možete se ulogovati i menjati tekstove, slike, boje i fontove kada god želite.",
    icon: AnimatedPenIcon,
    iconColor: "var(--color-accent)",
    index: 6,
  },
];

export const instructionsData: InstructionsCardProps[] = [
  {
    title: "1. Izaberite šablon",
    description:
      "Pregledajte dostupne dizajne i odaberite onaj koji vam se najviše dopada.",
    icon: AnimatedMousePointer,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 1,
  },
  {
    title: "2. Prilagodite pozivnicu",
    description:
      "Unesite sve detalje o događaju i prilagodite izgled. Možete menjati tekstove, fotografije, boje i fontove kako biste dobili potpuno jedinstvenu pozivnicu",
    icon: AnimatedPenIcon,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 2,
  },
  {
    title: "3. Pošaljite zahtev",
    description:
      "Kada završite, pošaljite podatke putem kontakt forme. Na vaš email stižu instrukcije za plaćanje",
    icon: AnimatedEyeIcon,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 3,
  },
  {
    title: "4. Vaša pozivnica je online za 10 minuta",
    description:
      "Nakon potvrde uplate, vaš sajt sa digitalnom pozivnicom biće aktivan i spreman za deljenje sa gostima.",
    icon: AnimatedMail,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 4,
  },
  {
    title: "5. Spisak gostiju i plan sedenja",
    description:
      "Pratite ko dolazi na događaj i na osnovu potvrda jednostavno napravite plan sedenja koji možete exportovati u PDF i odštampati.",
    icon: AnimatedSparkle,
    iconColor: "var(--color-hot)",
    isLast: false,
    index: 5,
  },
  {
    title: "6. Potpuna kontrola i nakon kupovine",
    description:
      "Nakon plaćanja dobijate pristup svom nalogu gde možete u bilo kom trenutku menjati tekstove, slike, boje i fontove, kao i upravljati spiskom gostiju i planom sedenja.",
    icon: AnimatedHeart,
    iconColor: "var(--color-hot)",
    isLast: true,
    index: 6,
  },
];

export const faqQuestions = [
  {
    id: 1,
    title: "Kako mogu napraviti digitalnu pozivnicu?",
    description:
      "Jednostavno izaberite jedan od naših dizajna, prilagodite tekst, slike, boje i fontove, i pošaljete kontakt formu sa Vašim podacima. Sve se radi online, bez potrebe za dodatnim softverom.",
  },
  {
    id: 9,
    title: "Koliko traje proces izrade pozivnice?",
    description:
      "Nakon evidentiranog plaćanja Vaša pozivnica je dostupna u roku od 10 minuta!",
  },
  {
    id: 2,
    title: "Kako mogu poslati pozivnicu svojim gostima?",
    description:
      "Pozivnicu možete poslati direktno putem email-a, WhatsApp-a, Viber-a, tokođe dobijate QR kod koji direktno vodi na Vaš sajt.",
  },
  {
    id: 3,
    title: "Mogu li prilagoditi dizajn pozivnice?",
    description:
      "Da! Možete menjati tekst, boje, fontove, dodavati slike i čak logo ili fotografiju, tako da pozivnica bude potpuno personalizovana.",
  },
  {
    id: 4,
    title: "Koliko košta pozivnica?",
    description:
      "Pozivnica košta 40 eura, u tu cenu su uključene sve sekcije i funkcionalnosti, bez skrivenih troškova.",
  },
  {
    id: 5,
    title: "Da li može da se menja sadržaj nakon kupovine?",
    description:
      "Naravno! Nakon kupovine možete da se ulogujete na Vaš sajt i sami da vršite sve promene!",
  },
  {
    id: 6,
    title: "Da li mogu da napravim spisak sedenja gostiju?",
    description:
      "Naravno! Možete da organizujete sedenje gostiju i jednim klikom isporučite spisak u fajl koji se spreman za štampanje!",
  },
  {
    id: 7,
    title: "Šta se dešava kada mi gost potvrdi dolazak?",
    description:
      "Nakon potvrde prisustva dobijate poruku na Vašu email adresu. Ceo spisak gostiju možete videti kada se ulogujete na sajt!",
  },
  {
    id: 8,
    title: "Da li su naše slike koje gosti uploaduju javno dostupne?",
    description:
      "Ne, samo Vi možete da vidite te slike. Čuvamo Vašu privatnost!",
  },
];
