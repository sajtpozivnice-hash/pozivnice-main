"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
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
    <section id={id} className="relative overflow-hidden">
      <div className="relative h-[46svh] w-full overflow-hidden sm:h-[52svh]">
        {data.image || data.backgroundImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            src={data.image || data.backgroundImage}
            alt={event.names}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(160deg, var(--color-ksaf-teal), var(--color-ksaf-ink))",
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-ksaf-ink/10 via-transparent to-ksaf-ink/55" />

        {/* dashed expedition route overlay */}
        <svg
          aria-hidden
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-70"
        >
          <path
            d="M20,220 C260,180 340,90 560,110 C780,130 860,40 1080,60 C1260,76 1340,40 1420,20"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
          <circle cx="20" cy="220" r="6" fill="white" />
          <circle cx="1420" cy="20" r="6" fill="white" />
        </svg>

        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white sm:right-8 sm:top-8">
          <Compass className="h-5 w-5" />
        </div>
      </div>

      <div className="ksaf-shell relative -mt-10 pb-16 pt-4 sm:-mt-14 sm:pb-20">
        <div className="ksaf-rail">
          <div className="ksaf-rail-item flex-col items-start">
            <span className="ksaf-waypoint">01</span>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ksaf-eyebrow"
            >
              {data.subtitle ?? "Ekspedicija počinje"}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="ksaf-heading mt-4"
            >
              {event.names}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="ksaf-coordinates mt-3"
            >
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24 }}
              className="mt-5 max-w-md text-2xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.title}
            </motion.p>

            {data.description ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 max-w-md text-sm leading-relaxed text-ksaf-ink/65"
              >
                {data.description}
              </motion.p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-6">
              {data.badge ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.36 }}
                  className="ksaf-stamp"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Godišta
                  </span>
                  <span
                    className="text-2xl"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {data.badge}
                  </span>
                </motion.div>
              ) : null}

              {data.ctaText ? (
                <motion.a
                  href={data.ctaHref || "#rsvp"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="ksaf-btn"
                >
                  <Compass className="h-4 w-4" />
                  {data.ctaText}
                </motion.a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
