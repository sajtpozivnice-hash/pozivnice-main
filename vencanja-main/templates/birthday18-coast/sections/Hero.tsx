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

/** Daylight coast hero: name rendered as watermark typography over a soft photo band. */
const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const photo = data.backgroundImage || data.image;
  const dateLabel = useMemo(
    () => formatDate(event.date, "DAY_D_MMMM_YYYY"),
    [event.date],
  );

  return (
    <section id={id} className="b18c-hero">
      <div className="b18c-hero__media" aria-hidden={!photo}>
        {photo ? (
          <img src={photo} alt="" referrerPolicy="no-referrer" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(135deg, var(--coast-sky), var(--coast-sand))",
            }}
          />
        )}
        <div className="b18c-hero__wash" />
      </div>

      <div className="b18c-shell b18c-hero__top">
        <span>{data.subtitle || "Punoletstvo"}</span>
        <span>{dateLabel || event.date}</span>
      </div>

      <div className="b18c-shell b18c-hero__watermark">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="b18c-kicker"
        >
          {event.location?.name || "Obala"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="b18c-display b18c-hero__name mt-2"
        >
          {event.names}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="b18c-hero__line"
        >
          {data.description || "Jedan dan, otvoreno nebo."}
        </motion.p>
      </div>

      {data.ctaText ? (
        <div className="b18c-hero__cta">
          <a href={data.ctaHref || "#rsvp"} className="b18c-btn">
            {data.ctaText}
          </a>
        </div>
      ) : null}
    </section>
  );
};

export default Hero;
