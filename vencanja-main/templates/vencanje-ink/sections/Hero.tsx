"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { Media } from "../components/Media";

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

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const { first, second } = splitNames(names);
  const portrait = data.backgroundImage || data.image;

  return (
    <section id={id} className="vi-hero">
      <div className="vi-shell">
        <div className="flex items-baseline justify-between gap-4 pb-4">
          <p className="vi-eyebrow">{data.subtitle}</p>
          <p className="vi-caption">{formatDate(date, "DD.MM.YYYY")}</p>
        </div>
        <div className="vi-rule-ink" />
      </div>

      <div className="vi-shell py-12 sm:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="vi-hero-name">{first}</span>
          <span className="vi-hero-amp py-2 pl-[6%] sm:pl-[10%]">&amp;</span>
          {second ? (
            <span className="vi-hero-name pl-[8%] sm:pl-[14%]">{second}</span>
          ) : null}
        </motion.h1>
      </div>

      <div className="vi-shell">
        <div className="vi-rule" />
        <div className="mt-7 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-7"
          >
            <div className="vi-accent" style={{ background: accent }} />
            <p className="vi-display-sm mt-6 max-w-md">{data.title}</p>
            <p className="vi-caption mt-6">
              {formatDate(date, "DAY_D_MMMM_YYYY")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex justify-start lg:col-span-5 lg:justify-end"
          >
            <div className="w-36 sm:w-44 lg:w-56">
              <Media
                src={portrait}
                alt={names}
                className="vi-plate-portrait"
                caption="No. 01"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
