"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Rocket, Star } from "lucide-react";
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

  return (
    <section
      id={id}
      className="kspc-section relative flex min-h-[100svh] items-center overflow-hidden pt-8 sm:pt-12"
    >
      <div className="kspc-shell relative z-10 flex w-full flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="kspc-eyebrow"
        >
          {data.subtitle ?? "Misija"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.9 }}
          className="kspc-orbit mt-8"
        >
          <span className="kspc-orbit-ring kspc-orbit-ring--outer" />
          <span className="kspc-orbit-ring" />

          <span
            className="kspc-satellite"
            style={{ top: "-4%", left: "50%", transform: "translate(-50%,-50%)" }}
          >
            <Star className="h-3.5 w-3.5" />
          </span>
          <span
            className="kspc-satellite"
            style={{ bottom: "2%", right: "0%", transform: "translate(30%,30%)" }}
          >
            <Rocket className="h-3.5 w-3.5" />
          </span>

          <div className="kspc-orbit-photo">
            {data.image || data.backgroundImage ? (
              <img
                src={data.image || data.backgroundImage}
                alt={event.names}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(160deg, var(--color-kspc-cyan), var(--color-kspc-magenta))",
                }}
              />
            )}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.7 }}
          className="kspc-heading mt-9"
        >
          {event.names}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40"
        >
          {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          {data.badge ? ` · ${data.badge}` : ""}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-5 max-w-md text-xl text-white/85"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {data.title}
        </motion.p>

        {data.description ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.46 }}
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55"
          >
            {data.description}
          </motion.p>
        ) : null}

        {data.ctaText ? (
          <motion.a
            href={data.ctaHref || "#rsvp"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54 }}
            className="kspc-btn mt-9"
          >
            <Rocket className="h-4 w-4" />
            {data.ctaText}
          </motion.a>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
