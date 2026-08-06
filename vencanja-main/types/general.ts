import { ComponentType } from "react";

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
  index?: number;
};

export type InstructionsCardProps = {
  title: string;
  description: string;
  icon: ComponentType<AnimatedIconProps>;
  iconColor: string;
  isLast: boolean;
  index: number;
};

export type WhyUsCardProps = {
  title: string;
  description: string;
  icon: ComponentType<AnimatedIconProps>;
  iconColor: string;
  index: number;
};

export enum Tag {
  WEDDING = "Venčanje",
  BIRTHDAY = "Rođendan",
  BAPTISM = "Krštenje",
};
