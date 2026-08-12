"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
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
  const ageBadge = data.badge ?? "";

  return (
    <section id={id} className="relative overflow-hidden">
      <div className="kpas-hero-media">
        {data.image || data.backgroundImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            src={data.image || data.backgroundImage}
            alt={event.names}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(160deg, var(--color-kpas-plum), var(--color-kpas-rose))",
            }}
          />
        )}

        {/* torn-page divider between photo and title page */}
        <svg
          aria-hidden
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14"
        >
          <path
            d="M0,32 C120,52 240,8 360,28 C480,48 600,4 720,26 C840,48 960,6 1080,26 C1200,46 1320,10 1440,30 L1440,60 L0,60 Z"
            fill="var(--color-kpas-paper)"
          />
        </svg>
      </div>

      <div className="kpas-shell relative -mt-1 pb-16 pt-10 text-center sm:pt-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="kpas-eyebrow"
        >
          {data.subtitle ?? "Pozivnica"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="kpas-heading mt-5"
        >
          {event.names}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-kpas-ink/45"
        >
          {formatDate(event.date, "DAY_D_MMMM_YYYY")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mx-auto mt-6 max-w-md text-2xl leading-snug text-kpas-ink/85"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.p>

        {data.description ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36 }}
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-kpas-ink/60"
          >
            {data.description}
          </motion.p>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-6">
          {ageBadge ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.44 }}
              className="kpas-seal"
            >
              {ageBadge}
            </motion.div>
          ) : null}

          {data.ctaText ? (
            <motion.a
              href={data.ctaHref || "#rsvp"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="kpas-btn"
            >
              {data.ctaText}
              <ArrowDownRight className="h-4 w-4" />
            </motion.a>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
