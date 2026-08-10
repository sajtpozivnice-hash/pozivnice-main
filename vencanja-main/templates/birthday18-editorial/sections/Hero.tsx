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
  const ageLabel = (data.title || data.badge || "18").replace(/^VOL\.\s*/i, "").trim() || "18";
  const badge = (data.badge || "VOL. 18").trim();
  const nameLabel = (event.names || "").trim();
  const issue = (data.subtitle || "BIRTHDAY ISSUE").trim();
  const character = (data.description || "THE MAIN CHARACTER").trim();
  const photo = data.backgroundImage || data.image;

  const dateLabel = useMemo(() => {
    const formatted = formatDate(event.date, "DD_MMMM_YYYY");
    return formatted ? formatted.toUpperCase() : event.date;
  }, [event.date]);

  const year = useMemo(() => {
    const match = /^(\d{4})/.exec(event.date || "");
    return match?.[1] || "2026";
  }, [event.date]);

  return (
    <section id={id} className="ed-hero">
      <div className="ed-grain" aria-hidden />
      <div className="ed-shell ed-hero__layout">
        <div className="ed-hero__mast">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="ed-hero__issue flex flex-wrap items-center gap-3"
          >
            <span className="ed-sticker">{badge}</span>
            <span className="ed-label">{character}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="ed-hero__age"
          >
            {ageLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="ed-hero__name"
          >
            {nameLabel}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="ed-hero__sub"
          >
            {issue}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="ed-hero__meta"
          >
            <div className="ed-hero__meta-item">
              <span>Date</span>
              <strong>{dateLabel}</strong>
            </div>
            <div className="ed-hero__meta-item">
              <span>Year</span>
              <strong>{year}</strong>
            </div>
            <div className="ed-hero__meta-item">
              <span>Time</span>
              <strong>20:00</strong>
            </div>
            <div className="ed-hero__meta-item">
              <span>City</span>
              <strong>
                {event.location?.address || event.location?.name || "BEOGRAD"}
              </strong>
            </div>
          </motion.div>

          {data.ctaText ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="mt-8"
            >
              <a href={data.ctaHref || "#rsvp"} className="ed-btn">
                {data.ctaText}
              </a>
            </motion.div>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="ed-hero__photo-col"
        >
          <div className="ed-hero__badge-float">
            <span className="ed-sticker ed-sticker--red">COVER STAR</span>
          </div>
          <div className="ed-hero__photo-tape ed-hero__photo-tape--a" aria-hidden />
          <div className="ed-hero__photo-tape ed-hero__photo-tape--b" aria-hidden />
          <div className="ed-hero__photo-frame">
            {photo ? (
              <img src={photo} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--ed-paper)] text-[var(--ed-muted)]">
                Add cover photo
              </div>
            )}
          </div>
          <p className="ed-hero__float-label">The Birthday Issue</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
