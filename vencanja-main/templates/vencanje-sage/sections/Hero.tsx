"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { SageMedia } from "../components/Media";

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
  const photo = data.backgroundImage || data.image;

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-vs-oat lg:min-h-[100svh]"
    >
      <div className="grid lg:min-h-[100svh] lg:grid-cols-12">
        <div className="order-2 flex flex-col justify-center px-6 py-20 sm:px-12 lg:order-1 lg:col-span-5 lg:px-14 lg:py-24">
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
            className="mt-8 text-[2.9rem] leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.1rem]"
            style={{ fontFamily: "var(--font-primary)", color: ink }}
          >
            {names}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="my-10 h-px w-24 origin-left"
            style={{ background: accent }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-sm uppercase tracking-[0.28em] text-vs-ink-soft sm:text-base"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {formatDate(date, "DAY_D_MMMM_YYYY")}
          </motion.p>

          {data.title ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-6 max-w-sm text-lg italic text-vs-muted"
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
              className="mt-12 text-[10px] uppercase tracking-[0.34em] text-vs-muted"
            >
              {event.location.name}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="order-1 lg:order-2 lg:col-span-7"
        >
          <SageMedia
            src={photo}
            alt={names}
            className="h-[58svh] w-full sm:h-[68svh] lg:h-full lg:min-h-[100svh]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
