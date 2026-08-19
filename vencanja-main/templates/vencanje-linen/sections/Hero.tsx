"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { LinenMedia } from "../components/Media";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

function monogramFromNames(names: string): string {
  const parts = names
    .split(/&|i\s+/i)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
  }
  return names
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const photo = data.backgroundImage || data.image;
  const monogram = monogramFromNames(names);

  return (
    <section
      id={id}
      className="vl-linen-ground relative flex w-full flex-col items-center px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:min-h-[100svh] lg:justify-center lg:pb-28 lg:pt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="vl-invite-card"
      >
        <div
          className="vl-monogram mb-8"
          style={{ borderColor: accent, color: ink }}
        >
          {monogram}
        </div>

        {data.subtitle ? (
          <p className="vl-eyebrow mb-5" style={{ color: accent }}>
            {data.subtitle}
          </p>
        ) : null}

        <h1
          className="text-[2.4rem] leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {names}
        </h1>

        <div
          className="mx-auto mt-7 h-px w-16"
          style={{ background: accent }}
        />

        <p
          className="mt-6 text-base uppercase tracking-[0.22em] text-vl-ink-soft sm:text-lg"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </p>

        {data.title ? (
          <p
            className="mt-6 text-lg italic text-vl-muted sm:text-xl"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </p>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="mt-10 w-full max-w-2xl sm:mt-12"
      >
        <LinenMedia
          src={photo}
          alt={names}
          className="aspect-[21/7] w-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
