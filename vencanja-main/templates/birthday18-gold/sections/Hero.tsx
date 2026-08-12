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

/** Gala foyer hero: full-bleed stage, brand name dominates — not bright-clone grid. */
const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const photo = data.backgroundImage || data.image;
  const dateLabel = useMemo(
    () => formatDate(event.date, "DAY_D_MMMM_YYYY"),
    [event.date],
  );

  return (
    <section id={id} className="gala-hero">
      <div className="gala-hero__media" aria-hidden={!photo}>
        {photo ? (
          <img src={photo} alt="" referrerPolicy="no-referrer" />
        ) : (
          <div className="h-full w-full bg-[var(--gala-panel)]" />
        )}
        <div className="gala-hero__veil" />
      </div>

      <div className="gala-shell gala-hero__content">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="gala-kicker"
        >
          {data.description || "Gala večer"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="gala-display gala-hero__name mt-5"
        >
          {event.names}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="gala-rule mx-auto mt-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="gala-hero__line"
        >
          {(data.subtitle || "Punoletstvo").trim()}
          {data.title ? ` · ${data.title}` : ""}
          {dateLabel ? `\n${dateLabel}` : ""}
        </motion.p>

        {data.ctaText ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="gala-hero__cta"
          >
            <a href={data.ctaHref || "#rsvp"} className="gala-btn">
              {data.ctaText}
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
