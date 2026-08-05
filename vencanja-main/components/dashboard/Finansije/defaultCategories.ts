export type DefaultBudgetCategorySeed = {
  name: string;
  icon: string;
  color: string;
  sort_order: number;
};

export const DEFAULT_BUDGET_CATEGORIES: DefaultBudgetCategorySeed[] = [
  { name: "Restoran", icon: "UtensilsCrossed", color: "#b45309", sort_order: 1 },
  { name: "Fotograf", icon: "Camera", color: "#0369a1", sort_order: 2 },
  { name: "Snimatelj", icon: "Video", color: "#7c3aed", sort_order: 3 },
  { name: "Bend", icon: "Music", color: "#db2777", sort_order: 4 },
  { name: "Dekoracija", icon: "Flower2", color: "#059669", sort_order: 5 },
  { name: "Venčanica", icon: "Gem", color: "#be185d", sort_order: 6 },
  { name: "Odelo", icon: "Shirt", color: "#1d4ed8", sort_order: 7 },
  { name: "Burme", icon: "CircleDot", color: "#ca8a04", sort_order: 8 },
  { name: "Torta", icon: "Cake", color: "#c2410c", sort_order: 9 },
  { name: "Piće", icon: "Wine", color: "#9333ea", sort_order: 10 },
  { name: "Prevoz", icon: "Car", color: "#0f766e", sort_order: 11 },
  { name: "Smeštaj", icon: "Hotel", color: "#4f46e5", sort_order: 12 },
  { name: "Pokloni", icon: "Gift", color: "#e11d48", sort_order: 13 },
  { name: "Matičar", icon: "ScrollText", color: "#475569", sort_order: 14 },
  { name: "Ostalo", icon: "Wallet", color: "#64748b", sort_order: 15 },
];
