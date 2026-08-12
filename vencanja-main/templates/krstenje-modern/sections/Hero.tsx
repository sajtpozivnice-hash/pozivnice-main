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

const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const { names, date } = event;

  return (
    <section id={id} className="relative w-full bg-km-ivory">
      {/* First viewport — almost only type, no photo */}
      <div className="flex min-h-[100svh] w-full flex-col justify-between px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="km-eyebrow"
        >
          Krštenje
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-[16vw] leading-[0.92] tracking-tight sm:text-[13vw] lg:text-[10vw]"
          style={{ fontFamily: "var(--font-primary)", color: "var(--color-km-ink)" }}
        >
          {names}
        </motion.h1>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs uppercase tracking-[0.25em] text-km-muted"
          >
            {formatDate(date, "DAY_D_MMMM_YYYY")}
          </motion.p>
          {data.subtitle ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs uppercase tracking-[0.25em] text-km-champagne"
            >
              {data.subtitle}
            </motion.p>
          ) : null}
        </div>
      </div>

      {data.title ? (
        <div className="border-t border-km-ink/10 px-6 py-8 sm:px-10 lg:px-16">
          <p
            className="max-w-md text-base text-km-ink-soft sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.title}
          </p>
        </div>
      ) : null}

      {/* Below the fold — thin horizontal photo strip, deliberately not a hero-scale image */}
      {data.backgroundImage ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="h-28 w-full overflow-hidden sm:h-36 lg:h-44"
        >
          <img
            src={data.backgroundImage}
            alt={names}
            className="h-full w-full object-cover grayscale-[15%]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      ) : null}
    </section>
  );
};

export default Hero;
