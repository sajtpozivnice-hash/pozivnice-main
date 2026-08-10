import {
  Info,
  MapPin,
  Music,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  shirt: Shirt,
  info: Info,
  music: Music,
  sparkles: Sparkles,
  "map-pin": MapPin,
  mappin: MapPin,
};

export function resolveFeatureIcon(name?: string): LucideIcon {
  if (!name) return Sparkles;
  const key = name.trim().toLowerCase();
  return ICON_MAP[key] ?? Sparkles;
}
