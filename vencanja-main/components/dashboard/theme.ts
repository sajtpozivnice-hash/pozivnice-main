import { LucideIcon } from "lucide-react";
import {
  CalendarCheck2,
  Images,
  LayoutGrid,
  ListTodo,
  Users,
  Wallet,
} from "lucide-react";

export type DashboardAccent =
  | "home"
  | "sections"
  | "guests"
  | "seating"
  | "budget"
  | "planner"
  | "gallery";

export type DashboardAccentTokens = {
  key: DashboardAccent;
  label: string;
  icon: LucideIcon;
  /** Soft tinted surface */
  soft: string;
  /** Icon chip background */
  chip: string;
  /** Icon/text accent */
  ink: string;
  /** Border accent */
  border: string;
  /** Progress / strong accent */
  solid: string;
  /** Soft gradient for cards */
  gradient: string;
  /** Active tab ring */
  ring: string;
};

export const DASHBOARD_ACCENTS: Record<DashboardAccent, DashboardAccentTokens> =
  {
    home: {
      key: "home",
      label: "Pregled",
      icon: LayoutGrid,
      soft: "bg-slate-50",
      chip: "bg-slate-100 text-slate-700",
      ink: "text-slate-700",
      border: "border-slate-200/80",
      solid: "bg-slate-700",
      gradient: "from-slate-50 via-white to-white",
      ring: "data-active:bg-slate-900 data-active:text-white",
    },
    sections: {
      key: "sections",
      label: "Sekcije",
      icon: LayoutGrid,
      soft: "bg-stone-50",
      chip: "bg-stone-100 text-stone-700",
      ink: "text-stone-700",
      border: "border-stone-200/80",
      solid: "bg-stone-700",
      gradient: "from-stone-50 via-white to-white",
      ring: "data-active:bg-stone-800 data-active:text-white",
    },
    guests: {
      key: "guests",
      label: "Gosti",
      icon: Users,
      soft: "bg-sky-50/80",
      chip: "bg-sky-100 text-sky-700",
      ink: "text-sky-700",
      border: "border-sky-200/70",
      solid: "bg-sky-600",
      gradient: "from-sky-50 via-white to-white",
      ring: "data-active:bg-sky-600 data-active:text-white",
    },
    seating: {
      key: "seating",
      label: "Raspored",
      icon: CalendarCheck2,
      soft: "bg-violet-50/80",
      chip: "bg-violet-100 text-violet-700",
      ink: "text-violet-700",
      border: "border-violet-200/70",
      solid: "bg-violet-600",
      gradient: "from-violet-50 via-white to-white",
      ring: "data-active:bg-violet-600 data-active:text-white",
    },
    budget: {
      key: "budget",
      label: "Finansije",
      icon: Wallet,
      soft: "bg-emerald-50/80",
      chip: "bg-emerald-100 text-emerald-700",
      ink: "text-emerald-700",
      border: "border-emerald-200/70",
      solid: "bg-emerald-600",
      gradient: "from-emerald-50 via-white to-white",
      ring: "data-active:bg-emerald-600 data-active:text-white",
    },
    planner: {
      key: "planner",
      label: "Planer",
      icon: ListTodo,
      soft: "bg-orange-50/80",
      chip: "bg-orange-100 text-orange-700",
      ink: "text-orange-700",
      border: "border-orange-200/70",
      solid: "bg-orange-500",
      gradient: "from-orange-50 via-white to-white",
      ring: "data-active:bg-orange-500 data-active:text-white",
    },
    gallery: {
      key: "gallery",
      label: "Slike",
      icon: Images,
      soft: "bg-rose-50/80",
      chip: "bg-rose-100 text-rose-700",
      ink: "text-rose-700",
      border: "border-rose-200/70",
      solid: "bg-rose-500",
      gradient: "from-rose-50 via-white to-white",
      ring: "data-active:bg-rose-500 data-active:text-white",
    },
  };

export const STAT_TONES = [
  "sky",
  "emerald",
  "violet",
  "orange",
  "rose",
  "slate",
] as const;

export type StatTone = (typeof STAT_TONES)[number];

export const STAT_TONE_CLASSES: Record<
  StatTone,
  { soft: string; chip: string; ink: string; bar: string }
> = {
  sky: {
    soft: "from-sky-50/90 to-white",
    chip: "bg-sky-100 text-sky-700",
    ink: "text-sky-700",
    bar: "[&_[data-slot=progress-indicator]]:bg-sky-500",
  },
  emerald: {
    soft: "from-emerald-50/90 to-white",
    chip: "bg-emerald-100 text-emerald-700",
    ink: "text-emerald-700",
    bar: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
  },
  violet: {
    soft: "from-violet-50/90 to-white",
    chip: "bg-violet-100 text-violet-700",
    ink: "text-violet-700",
    bar: "[&_[data-slot=progress-indicator]]:bg-violet-500",
  },
  orange: {
    soft: "from-orange-50/90 to-white",
    chip: "bg-orange-100 text-orange-700",
    ink: "text-orange-700",
    bar: "[&_[data-slot=progress-indicator]]:bg-orange-500",
  },
  rose: {
    soft: "from-rose-50/90 to-white",
    chip: "bg-rose-100 text-rose-700",
    ink: "text-rose-700",
    bar: "[&_[data-slot=progress-indicator]]:bg-rose-500",
  },
  slate: {
    soft: "from-slate-50/90 to-white",
    chip: "bg-slate-100 text-slate-700",
    ink: "text-slate-700",
    bar: "[&_[data-slot=progress-indicator]]:bg-slate-600",
  },
};
