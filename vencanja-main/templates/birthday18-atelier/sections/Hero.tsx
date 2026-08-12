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

/** Lookbook hero: tall portrait strip edge-to-edge + minimal type stack, no floating badges. */
const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const photo = data.backgroundImage || data.image;
  const dateLabel = useMemo(
    () => formatDate(event.date, "DAY_D_MMMM_YYYY"),
    [event.date],
  );
  const nameParts = (event.names || "").trim().split(/\s+/);

  return (
    <section id={id} className="b18a-hero">
      <div className="b18a-hero__media" aria-hidden={!photo}>
        {photo ? (
          <img src={photo} alt="" referrerPolicy="no-referrer" />
        ) : (
          <div className="h-full w-full bg-[var(--atelier-panel)]" />
        )}
      </div>

      <div className="b18a-hero__content">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="b18a-label"
        >
          {data.title || "Look 18"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="b18a-display b18a-hero__stack"
        >
          {(nameParts.length ? nameParts : [event.names]).map((part, i) => (
            <span key={`${part}-${i}`}>{part}</span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--atelier-muted)]"
        >
          {data.description || data.subtitle}
        </motion.p>

        <div className="b18a-hero__meta">
          <div className="b18a-hero__meta-row">
            <span className="b18a-muted-label">Datum</span>
            <span>{dateLabel || event.date}</span>
          </div>
          <div className="b18a-hero__meta-row">
            <span className="b18a-muted-label">Mesto</span>
            <span>{event.location?.name || "Beograd"}</span>
          </div>
        </div>

        {data.ctaText ? (
          <a href={data.ctaHref || "#rsvp"} className="b18a-link">
            {data.ctaText} →
          </a>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
