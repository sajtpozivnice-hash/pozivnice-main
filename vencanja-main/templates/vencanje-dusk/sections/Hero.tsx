"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import Media from "../components/Media";
import "../index.css";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Full-bleed dark still with a copper inset frame; names sit bottom-left, never centered. */
const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { names, date } = event;
  const still = data.backgroundImage || data.image;

  return (
    <section id={id} className="vd-hero">
      <Media src={still} className="vd-hero__still" loading="eager" />
      <div className="vd-hero__grade" />
      <div className="vd-hero__frame" />

      <span className="vd-hero__slug">
        {formatDate(date, "DD.MM.YYYY")} · Sumrak
      </span>

      <div className="vd-hero__content">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="vd-eyebrow"
        >
          {data.subtitle || "Pozivamo Vas"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="vd-display vd-hero__names"
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="vd-rule mt-7 origin-left"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="vd-hero__meta"
        >
          <span>{formatDate(date, "DAY_D_MMMM_YYYY")}</span>
          {event.location?.name ? <span>{event.location.name}</span> : null}
        </motion.div>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="vd-body mt-6 max-w-md"
          >
            {data.title}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
