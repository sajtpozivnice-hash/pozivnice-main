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

/** Broadsheet masthead: name is the nameplate, photo is an inline front-page image — never a background stage. */
const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const photo = data.backgroundImage || data.image;
  const dateLabel = useMemo(
    () => formatDate(event.date, "DAY_D_MMMM_YYYY"),
    [event.date],
  );
  const shortDate = useMemo(
    () => formatDate(event.date, "DD_MM_YYYY"),
    [event.date],
  );

  return (
    <section id={id} className="b18i-hero">
      <div className="b18i-shell">
        <div className="b18i-hero__meta">
          <span>Br. 18 · {data.description || "Specijalno izdanje"}</span>
          <span>{shortDate}</span>
        </div>
        <div className="b18i-rule" />

        <div className="b18i-hero__masthead">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="b18i-display b18i-hero__name"
          >
            {event.names}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="b18i-hero__tagline"
          >
            {data.subtitle || "Punoletstvo"}
          </motion.p>
        </div>

        <div className="b18i-rule--thin" />

        <div className="b18i-hero__strip">
          <div>
            <p className="b18i-hero__strip-label">Godina</p>
            <p className="b18i-hero__strip-value">{data.title || "18"}</p>
          </div>
          <div>
            <p className="b18i-hero__strip-label">Datum</p>
            <p className="b18i-hero__strip-value">{dateLabel || event.date}</p>
          </div>
          <div>
            <p className="b18i-hero__strip-label">Mesto</p>
            <p className="b18i-hero__strip-value">
              {event.location?.name || "Beograd"}
            </p>
          </div>
        </div>

        {data.ctaText ? (
          <div className="b18i-hero__cta">
            <a href={data.ctaHref || "#rsvp"} className="b18i-btn">
              {data.ctaText}
            </a>
          </div>
        ) : null}
      </div>

      {photo ? (
        <>
          <div className="b18i-hero__photo">
            <img src={photo} alt="" referrerPolicy="no-referrer" />
          </div>
          <div className="b18i-shell b18i-hero__caption">
            <span>Naslovna fotografija</span>
            <span>Redakcija · {event.names}</span>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Hero;
