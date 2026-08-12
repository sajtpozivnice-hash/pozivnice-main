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

const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { names, date } = event;

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ks-ivory px-5 py-20 sm:px-8"
    >
      {/* Watercolor wash — soft blurred blush/peach blobs, no photo behind the type */}
      <div className="ks-wash -top-24 -left-16 h-72 w-72 bg-ks-champagne-soft/50" />
      <div className="ks-wash top-1/3 -right-20 h-96 w-96 bg-ks-sand" />
      <div className="ks-wash bottom-0 left-1/4 h-64 w-64 bg-ks-champagne/25" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="ks-script"
        >
          {data.subtitle || "Blagosloven dan"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 text-5xl leading-[1.05] tracking-tight sm:text-7xl"
          style={{ fontFamily: "var(--font-primary)", color: "var(--color-ks-ink)" }}
        >
          {names}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-4 text-xs uppercase tracking-[0.32em] text-ks-muted sm:text-sm"
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {/* Large soft rounded photo, stacked below the name — not full-bleed, not a side grid */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="ks-photo-frame mt-10 w-full max-w-md"
        >
          <img
            src={data.backgroundImage}
            alt={names}
            className="aspect-[5/4] w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 max-w-sm text-base text-ks-muted sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
