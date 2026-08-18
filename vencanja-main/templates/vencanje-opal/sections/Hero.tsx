"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { OpalMedia } from "../components/Media";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const photo = data.backgroundImage || data.image;

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-vo-pearl px-5 py-24 sm:px-8"
    >
      <OpalMedia
        src={photo}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 opacity-25 blur-[2px]"
        imgClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-vo-pearl/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,213,208,0.35)_0%,transparent_65%)]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className="vo-vellum relative z-10 w-full max-w-xl -rotate-1 rounded-[2rem] px-8 py-14 text-center sm:px-12 sm:py-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="vo-eyebrow"
          style={{ color: accent }}
        >
          {data.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="mt-7 text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.25rem]"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="mx-auto my-8 h-px w-20 origin-center"
          style={{ background: accent }}
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-sm uppercase tracking-[0.28em] text-vo-charcoal-soft sm:text-base"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-base italic text-vo-muted sm:text-lg"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}
      </motion.div>
    </section>
  );
};

export default Hero;
