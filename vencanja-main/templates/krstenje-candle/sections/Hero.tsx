"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
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
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-kd-ivory px-5 py-24 sm:px-8"
    >
      {/* Ambient texture — heavily blurred/darkened, never a crisp photographic hero */}
      {data.backgroundImage ? (
        <div className="absolute inset-0">
          <img
            src={data.backgroundImage}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-[0.16] blur-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-kd-ivory/80" />
        </div>
      ) : null}

      {/* Candle glow — off-center warm blobs, not a symmetric radial darkening */}
      <div className="kd-glow -top-10 left-1/4 h-72 w-72" />
      <div className="kd-glow bottom-0 right-1/4 h-64 w-64 opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="kd-glow-panel relative z-10 flex w-full max-w-md flex-col items-center px-8 py-14 text-center sm:px-14 sm:py-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-kd-champagne/40 text-kd-champagne"
        >
          <Flame className="h-4 w-4" />
        </motion.div>

        <p className="kd-eyebrow">{data.subtitle || "Sveta tajna krštenja"}</p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-5 text-5xl leading-[1.05] tracking-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-primary)", color: "var(--color-kd-ink)" }}
        >
          {names}
        </motion.h1>

        <div className="kd-divider mt-6" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-6 text-xs uppercase tracking-[0.3em] text-kd-muted"
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-5 text-sm italic text-kd-ink-soft sm:text-base"
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
