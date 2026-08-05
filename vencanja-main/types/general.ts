import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { ReactNode } from "react";

export type AnimatedIconProps = {
  size?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
};

export type PackageBoxProps = {
  id: string;
  title: string;
  price: string;
  description: string;
  list: string[];
  link: string;
};

export type InstructionsCardProps = {
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  isLast: boolean;
  index: number;
};
export type WhyUsCardProps = {
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  index: number;
};

export enum Tag {
  WEDDING = "Venčanje",
  BIRTHDAY = "Rođendan",
  BAPTISM = "Krštenje",
};
