import { EventType } from "@/types/config";

export type DefaultPlannerTaskSeed = {
  title: string;
  category: string;
  description: string;
  priority: "low" | "medium" | "high";
  sort_order: number;
};

const WEDDING_PLANNER_CATEGORIES: string[] = [
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

const BIRTHDAY_PLANNER_CATEGORIES: string[] = [
  "Administracija",
  "Lokacija",
  "Hrana",
  "Torta",
  "Dekoracija",
  "Muzika",
  "Fotograf",
  "Gosti",
  "Pozivnice",
  "Pokloni",
  "Zabava",
  "Ostalo",
];

const COMING_OF_AGE_PLANNER_CATEGORIES: string[] = [
  "Administracija",
  "Lokacija",
  "Hrana",
  "Piće",
  "Torta",
  "Dekoracija",
  "Muzika",
  "Fotograf",
  "Gosti",
  "Pozivnice",
  "Odeća",
  "Zabava",
  "Ostalo",
];

const BAPTISM_PLANNER_CATEGORIES: string[] = [
  "Administracija",
  "Crkva",
  "Restoran",
  "Fotograf",
  "Snimatelj",
  "Dekoracija",
  "Odeća",
  "Torta",
  "Gosti",
  "Pozivnice",
  "Pokloni",
  "Ostalo",
];

const WEDDING_PLANNER_TASKS: DefaultPlannerTaskSeed[] = [
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
    description: "Zakazati probu i termin za dan događaja.",
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

const BIRTHDAY_PLANNER_TASKS: DefaultPlannerTaskSeed[] = [
  {
    title: "Rezervisati lokaciju",
    category: "Lokacija",
    description: "Dogovoriti termin i kapacitet.",
    priority: "high",
    sort_order: 1,
  },
  {
    title: "Napraviti listu gostiju",
    category: "Gosti",
    description: "Sastaviti listu pozvanih.",
    priority: "high",
    sort_order: 2,
  },
  {
    title: "Poslati pozivnice",
    category: "Pozivnice",
    description: "Pripremiti i poslati pozivnice.",
    priority: "medium",
    sort_order: 3,
  },
  {
    title: "Dogovoriti tortu",
    category: "Torta",
    description: "Izabrati ukus, dizajn i broj porcija.",
    priority: "high",
    sort_order: 4,
  },
  {
    title: "Dogovoriti hranu i piće",
    category: "Hrana",
    description: "Potvrditi meni i količine.",
    priority: "high",
    sort_order: 5,
  },
  {
    title: "Rezervisati dekoraciju",
    category: "Dekoracija",
    description: "Dogovoriti temu i dekor.",
    priority: "medium",
    sort_order: 6,
  },
  {
    title: "Organizovati zabavu",
    category: "Zabava",
    description: "Animacija, muzika ili program.",
    priority: "medium",
    sort_order: 7,
  },
];

const COMING_OF_AGE_PLANNER_TASKS: DefaultPlannerTaskSeed[] = [
  {
    title: "Rezervisati lokaciju",
    category: "Lokacija",
    description: "Dogovoriti klub / restoran i kapacitet.",
    priority: "high",
    sort_order: 1,
  },
  {
    title: "Napraviti listu gostiju",
    category: "Gosti",
    description: "Sastaviti listu pozvanih.",
    priority: "high",
    sort_order: 2,
  },
  {
    title: "Poslati pozivnice",
    category: "Pozivnice",
    description: "Pripremiti i poslati digitalne pozivnice.",
    priority: "medium",
    sort_order: 3,
  },
  {
    title: "Dogovoriti DJ / muziku",
    category: "Muzika",
    description: "Potvrditi playlistu i termin nastupa.",
    priority: "high",
    sort_order: 4,
  },
  {
    title: "Dogovoriti tortu",
    category: "Torta",
    description: "Izabrati ukus, dizajn i broj porcija.",
    priority: "high",
    sort_order: 5,
  },
  {
    title: "Dogovoriti hranu i piće",
    category: "Hrana",
    description: "Potvrditi meni, bar i količine.",
    priority: "high",
    sort_order: 6,
  },
  {
    title: "Pripremiti outfit",
    category: "Odeća",
    description: "Kupiti ili pripremiti odeću za noć proslave.",
    priority: "medium",
    sort_order: 7,
  },
  {
    title: "Rezervisati fotografisanje",
    category: "Fotograf",
    description: "Dogovoriti snimanje večeri.",
    priority: "medium",
    sort_order: 8,
  },
];

const BAPTISM_PLANNER_TASKS: DefaultPlannerTaskSeed[] = [
  {
    title: "Zakazati termin u crkvi",
    category: "Crkva",
    description: "Dogovoriti datum i vreme krštenja.",
    priority: "high",
    sort_order: 1,
  },
  {
    title: "Rezervisati restoran",
    category: "Restoran",
    description: "Dogovoriti svečani ručak ili slavlje.",
    priority: "high",
    sort_order: 2,
  },
  {
    title: "Napraviti listu gostiju",
    category: "Gosti",
    description: "Sastaviti listu pozvanih.",
    priority: "high",
    sort_order: 3,
  },
  {
    title: "Poslati pozivnice",
    category: "Pozivnice",
    description: "Pripremiti i poslati pozivnice.",
    priority: "medium",
    sort_order: 4,
  },
  {
    title: "Rezervisati fotografa",
    category: "Fotograf",
    description: "Potvrditi snimanje ceremonije i slavlja.",
    priority: "high",
    sort_order: 5,
  },
  {
    title: "Pripremiti odeću",
    category: "Odeća",
    description: "Kupiti ili pripremiti odeću za krštenje.",
    priority: "medium",
    sort_order: 6,
  },
  {
    title: "Dogovoriti tortu",
    category: "Torta",
    description: "Izabrati tortu za slavlje.",
    priority: "medium",
    sort_order: 7,
  },
];

export const PLANNER_CATEGORIES_BY_EVENT: Record<EventType, string[]> = {
  wedding: WEDDING_PLANNER_CATEGORIES,
  comingOfAge: COMING_OF_AGE_PLANNER_CATEGORIES,
  kidsBirthday: BIRTHDAY_PLANNER_CATEGORIES,
  baptism: BAPTISM_PLANNER_CATEGORIES,
};

export const PLANNER_TASKS_BY_EVENT: Record<EventType, DefaultPlannerTaskSeed[]> =
  {
    wedding: WEDDING_PLANNER_TASKS,
    comingOfAge: COMING_OF_AGE_PLANNER_TASKS,
    kidsBirthday: BIRTHDAY_PLANNER_TASKS,
    baptism: BAPTISM_PLANNER_TASKS,
  };

/** @deprecated Prefer getPlanner*ForEvent helpers. */
export const DEFAULT_PLANNER_CATEGORIES = WEDDING_PLANNER_CATEGORIES;

/** @deprecated Prefer getPlanner*ForEvent helpers. */
export const DEFAULT_PLANNER_TASKS = WEDDING_PLANNER_TASKS;

export const getPlannerCategoriesForEvent = (eventType: EventType): string[] =>
  PLANNER_CATEGORIES_BY_EVENT[eventType] ?? WEDDING_PLANNER_CATEGORIES;

export const getPlannerTasksForEvent = (
  eventType: EventType,
): DefaultPlannerTaskSeed[] =>
  PLANNER_TASKS_BY_EVENT[eventType] ?? WEDDING_PLANNER_TASKS;
