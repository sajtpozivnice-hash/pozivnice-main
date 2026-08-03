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
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={data.backgroundImage}
          alt="Header Slika"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-cream/20 to-wedding-cream" />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p
            style={{ color: colors?.base?.secondary?.value }}
            className="text-3xl md:text-3xl lg:text-3xl mb-0 "
          >
            {data.subtitle}
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tight"
            style={{ color: colors?.base?.secondary?.value }}
          >
            {names}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-wedding-gold/50" />
            <Heart className="text-wedding-gold fill-wedding-gold w-5 h-5" />
            <div className="h-[1px] w-12 bg-wedding-gold/50" />
          </div>
          <p
            style={{ color: colors?.base?.secondary?.value }}
            className="text-xl md:text-2xl italic tracking-wide"
          >
            {formatDate(date, "MMMM_D_YYYY")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-wedding-gold/40 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
