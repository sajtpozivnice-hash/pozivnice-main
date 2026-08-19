"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section id={id} className="relative overflow-hidden pb-10 pt-8 sm:pt-12">
      <div className="kcart-shell">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 lg:col-span-6"
          >
            <p className="kcart-eyebrow mb-5">
              {data.subtitle ?? "1. rođendan"}
            </p>

            <div className="mb-5 flex items-end gap-4">
              <span className="kcart-badge-1" aria-hidden>
                1
              </span>
              <h1 className="kcart-heading">{event.names}</h1>
            </div>

            <div className="kcart-bubble max-w-md">
              <p
                className="text-xl font-black sm:text-2xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {data.title}
                {data.badge ? (
                  <span
                    className="ml-2"
                    style={{ color: "var(--color-kcart-tomato)" }}
                  >
                    — {data.badge}
                  </span>
                ) : null}
              </p>
              {data.description ? (
                <p className="kcart-body mt-3">{data.description}</p>
              ) : null}
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] opacity-55">
              {formatDate(event.date, "DAY_D_MMMM_YYYY")}
            </p>

            {data.ctaText ? (
              <a href={data.ctaHref || "#rsvp"} className="kcart-btn mt-7">
                <span>{data.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative lg:col-span-6"
          >
            <div className="kcart-panel overflow-hidden p-2 sm:p-3">
              {data.image || data.backgroundImage ? (
                <img
                  src={data.image || data.backgroundImage}
                  alt={event.names}
                  className="aspect-[4/5] w-full rounded-[1.5rem] object-cover sm:aspect-[5/6]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="aspect-[4/5] w-full rounded-[1.5rem] sm:aspect-[5/6]"
                  style={{
                    background:
                      "linear-gradient(145deg, var(--color-kcart-blue), var(--color-kcart-sun))",
                  }}
                />
              )}
            </div>
            <span
              className="kcart-cloud -left-4 top-8 h-10 w-16 sm:h-12 sm:w-20"
              aria-hidden
            />
            <span
              className="kcart-cloud -right-3 bottom-16 h-8 w-14 sm:h-10 sm:w-16"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
