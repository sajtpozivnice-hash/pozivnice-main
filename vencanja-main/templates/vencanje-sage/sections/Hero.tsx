"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-vs-oat px-6 py-24 sm:px-12"
    >
      <div className="mx-auto w-full max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="vs-eyebrow"
          style={{ color: accent }}
        >
          {data.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mt-8 text-[3.2rem] leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mx-auto my-10 h-px w-24 origin-center"
          style={{ background: accent }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base uppercase tracking-[0.26em] text-vs-ink-soft sm:text-lg"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mx-auto mt-6 max-w-md text-xl italic text-vs-muted sm:text-2xl"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}

        {event.location?.name ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-12 text-[13px] uppercase tracking-[0.3em] text-vs-muted sm:text-sm"
          >
            {event.location.name}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
