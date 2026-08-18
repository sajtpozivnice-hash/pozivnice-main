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
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-kc-ivory px-6 py-24 sm:px-10"
    >
      {/* Soft ambient photo wash — type still leads the first viewport */}
      {data.backgroundImage ? (
        <div className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.backgroundImage}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-[0.14] blur-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-kc-ivory/75" />
        </div>
      ) : null}

      {/* Paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-kc-ink) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Printed-card frame with corner marks */}
      <div className="pointer-events-none absolute inset-5 border border-kc-champagne/25 sm:inset-8" />
      <span className="kc-corner top-5 left-5 border-t border-l sm:top-8 sm:left-8" />
      <span className="kc-corner top-5 right-5 border-t border-r sm:top-8 sm:right-8" />
      <span className="kc-corner bottom-5 left-5 border-b border-l sm:bottom-8 sm:left-8" />
      <span className="kc-corner bottom-5 right-5 border-b border-r sm:bottom-8 sm:right-8" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="kc-eyebrow"
        >
          Sveta tajna krštenja
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="kc-ornament mt-6 w-full"
        >
          <span className="kc-ornament-dot" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-8 text-6xl leading-[1.02] tracking-tight sm:text-8xl lg:text-[7.5rem]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--color-kc-ink)" }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="kc-ornament mt-8 w-full"
        >
          <span className="kc-ornament-dot" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-8 text-sm uppercase tracking-[0.35em] text-kc-ink-soft sm:text-base"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 max-w-md text-base italic text-kc-muted sm:text-lg"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}

        {data.subtitle ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-3 text-xs uppercase tracking-[0.3em] text-kc-champagne"
          >
            {data.subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
