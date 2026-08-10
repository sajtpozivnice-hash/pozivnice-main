"use client";

import { FC, useMemo } from "react";
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
  const ageLabel = (data.badge || data.title || "18").trim();
  const nameLabel = (event.names || data.title || "").trim();
  const tagline = (data.subtitle || "ROĐENDAN").trim();
  const dateLabel = useMemo(() => {
    const formatted = formatDate(event.date, "DD_MMMM_YYYY");
    return formatted ? formatted.toUpperCase() : event.date;
  }, [event.date]);

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 sm:pb-20 lg:pb-24"
    >
      {data.backgroundImage || data.image ? (
        <img
          src={data.backgroundImage || data.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--b18-ink)]" />
      )}
      <div className="b18-overlay absolute inset-0" />
      <div className="b18-glow -left-20 top-10 h-72 w-72 opacity-70" />
      <div className="b18-glow -right-16 bottom-24 h-80 w-80 opacity-40" />

      <div className="b18-shell relative z-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="b18-eyebrow mb-6"
        >
          {data.description || "Jedna noć. Jedan veliki trenutak."}
        </motion.p>

        <div className="relative">
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ duration: 1.1 }}
            aria-hidden
            className="pointer-events-none absolute -top-16 left-0 select-none text-[clamp(8rem,32vw,22rem)] leading-none font-bold tracking-tighter text-white sm:-top-24"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {ageLabel}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="b18-metal relative text-[clamp(5.5rem,22vw,12rem)] leading-[0.82] font-bold tracking-tighter"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {ageLabel}
          </motion.p>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.9] font-bold tracking-tight uppercase"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {nameLabel}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-3 text-lg font-semibold tracking-[0.35em] text-white/70 uppercase sm:text-xl"
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-6 text-sm font-medium tracking-[0.22em] text-white/55 uppercase"
        >
          {dateLabel}
        </motion.p>

        {data.ctaText ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10"
          >
            <a href={data.ctaHref || "#rsvp"} className="b18-btn">
              {data.ctaText}
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
