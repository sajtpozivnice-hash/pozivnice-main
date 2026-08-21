"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";
import { TerraMedia } from "../components/Media";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const { names, date } = event;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const photo = data.backgroundImage || data.image;

  return (
    <section
      id={id}
      className="relative flex w-full flex-col items-center bg-vt-sand px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:min-h-[100svh] lg:justify-center lg:pb-28 lg:pt-24"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="vt-eyebrow mb-8"
        style={{ color: accent }}
      >
        {data.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
      >
        <TerraMedia
          src={photo}
          alt={names}
          className="vt-arch aspect-[3/4] w-full shadow-[0_28px_60px_-28px_rgba(61,52,41,0.45)]"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-10 text-center text-[2.6rem] leading-[1.05] tracking-[-0.02em] sm:mt-12 sm:text-6xl lg:text-[4.5rem]"
        style={{ fontFamily: "var(--font-primary)", color: ink }}
      >
        {names}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-5 text-center text-base uppercase tracking-[0.32em] text-vt-ink-soft"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        {formatDate(date, "DAY_D_MMMM_YYYY")}
      </motion.p>

      {data.title ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 max-w-sm text-center text-xl italic text-vt-muted"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.p>
      ) : null}

      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="mt-10 block h-1 w-12 origin-center rounded-full"
        style={{ background: accent }}
      />
    </section>
  );
};

export default Hero;
