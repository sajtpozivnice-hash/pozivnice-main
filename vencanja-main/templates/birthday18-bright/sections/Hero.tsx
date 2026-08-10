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
  const nameLabel = (event.names || "").trim();
  const tagline = (data.subtitle || "TURNING EIGHTEEN").trim();
  const partyLabel = (data.description || "BIRTHDAY PARTY").trim();
  const photo = data.backgroundImage || data.image;
  const venueLabel =
    event.location?.name || event.location?.address || "BEOGRAD";

  const dateLabel = useMemo(() => {
    const formatted = formatDate(event.date, "DD_MMMM_YYYY");
    return formatted ? formatted.toUpperCase() : event.date;
  }, [event.date]);

  return (
    <section id={id} className="b18b-hero">
      <div className="b18b-blob b18b-blob--coral b18b-float absolute -left-16 top-24 h-56 w-56 sm:h-72 sm:w-72" />
      <div className="b18b-blob b18b-blob--lilac b18b-float-slow absolute -right-10 top-10 h-48 w-48 sm:h-64 sm:w-64" />
      <div className="b18b-blob b18b-blob--blue b18b-float absolute bottom-16 left-1/3 h-40 w-40 opacity-40" />

      <div className="b18b-shell b18b-hero__grid">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="b18b-eyebrow mb-4"
          >
            {partyLabel}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="b18b-hero__age"
          >
            {ageLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="b18b-hero__name mt-1"
          >
            {nameLabel}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-3 text-base font-bold tracking-[0.28em] text-[var(--b18b-muted)] uppercase sm:text-lg"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="b18b-hero__meta"
          >
            <span className="b18b-chip">{dateLabel}</span>
            <span className="b18b-chip">20:00</span>
            <span className="b18b-chip">{venueLabel}</span>
          </motion.div>

          {data.ctaText ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <a href={data.ctaHref || "#rsvp"} className="b18b-btn">
                {data.ctaText}
              </a>
            </motion.div>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12 }}
          className="b18b-hero__photo-wrap"
        >
          <div className="b18b-hero__photo-ring" aria-hidden />
          <div className="b18b-hero__photo">
            {photo ? (
              <img src={photo} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--b18b-blush)] text-[var(--b18b-muted)]">
                Dodaj fotografiju
              </div>
            )}
          </div>
          <div className="b18b-hero__photo-badge" aria-hidden>
            {ageLabel}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
