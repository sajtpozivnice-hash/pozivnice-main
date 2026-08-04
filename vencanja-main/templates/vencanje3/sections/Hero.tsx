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

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value;

  return (
    <section id={id} className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={data.backgroundImage}
          alt="Hero"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 py-24 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="v3-eyebrow mb-6 text-white/80"
          style={{ color: accent }}
        >
          {data.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="max-w-5xl text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {names}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-8 h-px w-20"
          style={{ background: accent }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="text-sm uppercase tracking-[0.35em] text-white/75 sm:text-base"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {formatDate(date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        {data.title ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-md text-base text-white/70 sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.title}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 h-14 w-px -translate-x-1/2 bg-white/40"
        />
      </div>
    </section>
  );
};

export default Hero;
