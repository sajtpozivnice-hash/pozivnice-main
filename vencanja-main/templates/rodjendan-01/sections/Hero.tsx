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

const Hero: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const secondary = theme.colors?.base?.secondary?.value ?? "#3D8BFF";
  const ageDigits = (data.badge ?? "").replace(/[^\d]/g, "") || "7";

  return (
    <section id={id} className="bday-section relative min-h-[100svh] overflow-hidden pt-8 sm:pt-12">
      <div className="bday-blob left-[-10%] top-[10%] h-72 w-72 bg-bday-coral/30" />
      <div className="bday-blob right-[-8%] top-[30%] h-80 w-80 bg-bday-sky/25" />
      <div className="bday-blob bottom-[5%] left-[35%] h-64 w-64 bg-bday-mint/20" />

      <div className="bday-confetti pointer-events-none absolute inset-0 overflow-hidden">
        <span className="left-[12%] top-[18%] bg-bday-coral" style={{ animationDelay: "0s" }} />
        <span className="left-[28%] top-[12%] bg-bday-sun" style={{ animationDelay: "1.2s" }} />
        <span className="right-[18%] top-[22%] bg-bday-sky" style={{ animationDelay: "0.6s" }} />
        <span className="right-[30%] top-[14%] bg-bday-mint" style={{ animationDelay: "1.8s" }} />
        <span className="left-[45%] top-[8%] bg-bday-violet" style={{ animationDelay: "0.9s" }} />
      </div>

      <div className="bday-shell relative z-10 grid min-h-[calc(100svh-4rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bday-eyebrow mb-6"
          >
            {data.subtitle ?? "Pozivnica"}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-black/45"
          >
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8 }}
            className="bday-heading max-w-xl"
            style={{ color: accent }}
          >
            {event.names}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-3 text-3xl font-semibold tracking-tight text-bday-ink sm:text-4xl"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {data.title}
          </motion.p>

          {data.badge ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 inline-flex rounded-full px-5 py-2 text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${secondary})`,
              }}
            >
              {data.badge}
            </motion.div>
          ) : null}

          {data.description ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-md text-base leading-relaxed text-black/60 sm:text-lg"
            >
              {data.description}
            </motion.p>
          ) : null}

          {data.ctaText ? (
            <motion.a
              href={data.ctaHref || "#rsvp"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bday-btn mt-8"
            >
              {data.ctaText}
              <ArrowDownRight className="h-4 w-4" />
            </motion.a>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="order-1 relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
        >
          <div
            className="absolute -inset-4 rounded-[2.5rem] opacity-40 blur-2xl sm:-inset-6"
            style={{
              background: `linear-gradient(140deg, ${accent}, ${secondary})`,
            }}
          />

          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_30px_80px_-35px_rgba(31,36,48,0.55)]">
            {data.image || data.backgroundImage ? (
              <img
                src={data.image || data.backgroundImage}
                alt={event.names}
                className="aspect-[4/5] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="aspect-[4/5] w-full"
                style={{
                  background: `linear-gradient(160deg, ${accent}, ${secondary})`,
                }}
              />
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-5 sm:p-6">
              {data.subtitle ? (
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                  {data.subtitle}
                </p>
              ) : null}
              <p
                className="mt-1 text-2xl text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {event.names}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-black leading-none text-black/[0.06] sm:-right-6 sm:text-[9rem]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {ageDigits}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
