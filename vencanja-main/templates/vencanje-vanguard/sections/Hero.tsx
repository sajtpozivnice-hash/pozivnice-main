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

const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { first, second } = splitNames(event.names);

  return (
    <section id={id} className="vg-hero">
      <div className="vg-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="vg-kicker">{data.subtitle ?? "Venčanje"}</p>
            <p className="vg-meta">
              {formatDate(event.date, "DD.MM.YYYY")}
            </p>
          </div>

          <div className="vg-bar mt-8" />

          <h1 className="mt-8">
            <span className="vg-hero-name block">{first}</span>
            {second ? (
              <>
                <span className="vg-hero-and">&</span>
                <span className="vg-hero-name block">{second}</span>
              </>
            ) : null}
          </h1>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="vg-meta max-w-xs">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>
            {data.title ? (
              <p className="vg-body max-w-sm sm:text-right">{data.title}</p>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
