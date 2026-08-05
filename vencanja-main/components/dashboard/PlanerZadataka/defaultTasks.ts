export const DEFAULT_PLANNER_CATEGORIES: string[] = [
  "Administracija",
  "Ceremonija",
  "Restoran",
  "Fotograf",
  "Snimatelj",
  "Muzika",
  "Dekoracija",
  "Venčanica",
  "Odelo",
  "Burme",
  "Šminka",
  "Frizura",
  "Torta",
  "Piće",
  "Gosti",
  "Pozivnice",
  "Prevoz",
  "Smeštaj",
  "Pokloni",
  "Ostalo",
];

export type DefaultPlannerTaskSeed = {
  title: string;
  category: string;
  description: string;
  priority: "low" | "medium" | "high";
  sort_order: number;
};

/** Easy to extend — add new default tasks here. */
export const DEFAULT_PLANNER_TASKS: DefaultPlannerTaskSeed[] = [
  {
    title: "Rezervisati restoran",
    category: "Restoran",
    description: "Dogovoriti termin, meni i kapacitet sale.",
    priority: "high",
    sort_order: 1,
  },
  {
    title: "Rezervisati fotografa",
    category: "Fotograf",
    description: "Potvrditi paket, trajanje i lokacije snimanja.",
    priority: "high",
    sort_order: 2,
  },
  {
    title: "Rezervisati bend",
    category: "Muzika",
    description: "Dogovoriti repertoar, sate svirke i opremu.",
    priority: "high",
    sort_order: 3,
  },
  {
    title: "Napraviti listu gostiju",
    category: "Gosti",
    description: "Sastaviti preliminarnu listu gostiju.",
    priority: "high",
    sort_order: 4,
  },
  {
    title: "Poslati pozivnice",
    category: "Pozivnice",
    description: "Pripremiti i poslati digitalne ili štampane pozivnice.",
    priority: "medium",
    sort_order: 5,
  },
  {
    title: "Kupiti burme",
    category: "Burme",
    description: "Izabrati i naručiti burme.",
    priority: "medium",
    sort_order: 6,
  },
  {
    title: "Rezervisati dekoraciju",
    category: "Dekoracija",
    description: "Dogovoriti cveće, stolove i scenu.",
    priority: "medium",
    sort_order: 7,
  },
  {
    title: "Organizovati raspored sedenja",
    category: "Gosti",
    description: "Rasporediti goste po stolovima.",
    priority: "medium",
    sort_order: 8,
  },
  {
    title: "Dogovoriti tortu",
    category: "Torta",
    description: "Izabrati ukus, dizajn i broj porcija.",
    priority: "medium",
    sort_order: 9,
  },
  {
    title: "Rezervisati šminku",
    category: "Šminka",
    description: "Zakazati probu i termin za dan venčanja.",
    priority: "medium",
    sort_order: 10,
  },
  {
    title: "Kupiti venčanicu",
    category: "Venčanica",
    description: "Izabrati, poručiti i dogovoriti probe.",
    priority: "high",
    sort_order: 11,
  },
  {
    title: "Kupiti odelo",
    category: "Odelo",
    description: "Izabrati odelo i dogovoriti krojenje.",
    priority: "high",
    sort_order: 12,
  },
];
