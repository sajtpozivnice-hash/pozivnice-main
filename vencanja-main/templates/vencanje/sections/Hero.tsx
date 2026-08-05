"use client";

import { FC } from "react";

import { HeroSection } from "@/types/sections";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { date, names } = event;
  const { colors } = theme;

  return (
    <section
      id={id}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <div className="section-bg">
        {data.backgroundImage ? (
          <img
            src={data.backgroundImage}
            alt=""
            className="opacity-60"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="h-full w-full bg-wedding-cream" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-cream/20 to-wedding-cream" />
      </div>

      <div className="relative z-10 px-5 py-20 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {data.subtitle ? (
            <p
              style={{ color: colors?.base?.secondary?.value }}
              className="mb-2 text-xl sm:text-2xl md:text-3xl"
            >
              {data.subtitle}
            </p>
          ) : null}
          <h1
            className="mb-8 text-5xl tracking-tight sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ color: colors?.base?.secondary?.value }}
          >
            {names}
          </h1>
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-wedding-gold/50" />
            <Heart className="h-5 w-5 fill-wedding-gold text-wedding-gold" />
            <div className="h-px w-12 bg-wedding-gold/50" />
          </div>
          <p
            style={{ color: colors?.base?.secondary?.value }}
            className="text-lg tracking-wide italic sm:text-xl md:text-2xl"
          >
            {formatDate(date, "MMMM_D_YYYY")}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-14 w-px animate-pulse bg-wedding-gold/40" />
      </motion.div>
    </section>
  );
};

export default Hero;
