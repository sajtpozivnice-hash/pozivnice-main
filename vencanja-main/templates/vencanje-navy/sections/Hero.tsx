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

const splitNames = (names: string) => {
  const separator = names.includes("&") ? "&" : " i ";
  const parts = names.split(separator);
  return {
    first: parts[0]?.trim() ?? names,
    second: parts.slice(1).join(separator).trim(),
  };
};

const initialOf = (name: string) =>
  name.trim().charAt(0).toUpperCase() || "";

const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { names, date } = event;
  const { first, second } = splitNames(names);
  const monoA = initialOf(first);
  const monoB = initialOf(second);
  const bandSrc = data.backgroundImage || data.image;

  return (
    <section id={id} className="vn-hero">
      <div className="vn-hero-main">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="vn-hero-frame"
        >
          <p className="vn-hero-eyebrow mb-8">{data.subtitle ?? "Venčanje"}</p>

          <div className="vn-monogram" aria-hidden="true">
            <span>{monoA}</span>
            {monoB ? <span className="vn-monogram-amp">&</span> : null}
            {monoB ? <span>{monoB}</span> : null}
          </div>

          <h1 className="vn-hero-names mt-8">{names}</h1>

          <div className="mx-auto mt-8 h-px w-20 bg-[var(--color-vn-champagne)] sm:w-24" />

          <p className="vn-hero-date mt-7">
            {formatDate(date, "DAY_D_MMMM_YYYY")}
          </p>

          {data.title ? (
            <p className="vn-hero-lede mx-auto mt-6 max-w-md">{data.title}</p>
          ) : null}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.35 }}
        className="vn-hero-band"
      >
        {bandSrc?.trim() ? (
          <img
            src={bandSrc}
            alt=""
            referrerPolicy="no-referrer"
            loading="eager"
          />
        ) : (
          <div className="vn-fallback h-full w-full" />
        )}
      </motion.div>
    </section>
  );
};

export default Hero;
