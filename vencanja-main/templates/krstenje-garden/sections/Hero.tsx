"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
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
    <section
      id={id}
      className="relative grid w-full grid-cols-1 overflow-hidden bg-kg-ivory lg:min-h-[100svh] lg:grid-cols-2"
    >
      {/* Left — text column */}
      <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-10 lg:order-1 lg:px-16 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="kg-eyebrow"
        >
          <Leaf className="h-3.5 w-3.5" />
          {data.subtitle || "Krštenje u bašti"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-primary)", color: "var(--color-kg-ink)" }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="kg-divider mt-8 ml-0"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6 text-sm uppercase tracking-[0.3em] text-kg-muted"
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-6 max-w-md text-base leading-relaxed text-kg-ink-soft sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}
      </div>

      {/* Right — tall nature photo, edge-to-edge on desktop, full width strip on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="order-1 h-[46vh] w-full overflow-hidden lg:order-2 lg:h-full"
      >
        <img
          src={data.backgroundImage}
          alt={names}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
