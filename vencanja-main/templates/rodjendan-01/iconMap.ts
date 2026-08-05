import {
  Baby,
  Camera,
  Gift,
  Info,
  MapPin,
  Music,
  PartyPopper,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  gift: Gift,
  shirt: Shirt,
  baby: Baby,
  info: Info,
  party: PartyPopper,
  music: Music,
  camera: Camera,
  sparkles: Sparkles,
  "map-pin": MapPin,
  mappin: MapPin,
};

export function resolveFeatureIcon(name?: string): LucideIcon {
  if (!name) return Sparkles;
  const key = name.trim().toLowerCase();
  return ICON_MAP[key] ?? Sparkles;
}
