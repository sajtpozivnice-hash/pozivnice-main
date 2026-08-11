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

export type FeatureIconOption = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

/** Shared icon catalog for FeatureCards (editor + dashboard + templates). */
export const FEATURE_ICON_OPTIONS: FeatureIconOption[] = [
  { id: "gift", label: "Poklon", Icon: Gift },
  { id: "shirt", label: "Odeća", Icon: Shirt },
  { id: "baby", label: "Beba", Icon: Baby },
  { id: "info", label: "Info", Icon: Info },
  { id: "party", label: "Žurka", Icon: PartyPopper },
  { id: "music", label: "Muzika", Icon: Music },
  { id: "camera", label: "Kamera", Icon: Camera },
  { id: "sparkles", label: "Sjaj", Icon: Sparkles },
  { id: "map-pin", label: "Lokacija", Icon: MapPin },
];

const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  FEATURE_ICON_OPTIONS.flatMap(({ id, Icon }) =>
    id === "map-pin" ? [[id, Icon], ["mappin", Icon]] : [[id, Icon]],
  ),
);

export function resolveFeatureIcon(name?: string): LucideIcon {
  if (!name) return Sparkles;
  const key = name.trim().toLowerCase();
  return ICON_MAP[key] ?? Sparkles;
}
