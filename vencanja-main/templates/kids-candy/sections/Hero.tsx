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
    <section id={id} className="relative overflow-hidden">
      <div className="grid min-h-[100svh] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative order-1 h-[42svh] w-full overflow-hidden sm:h-[50svh] lg:order-1 lg:h-auto lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
          {data.image || data.backgroundImage ? (
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
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
                  "linear-gradient(150deg, var(--color-kcan-pink), var(--color-kcan-yellow))",
              }}
            />
          )}
        </div>

        <div className="order-2 flex flex-col justify-center px-6 py-10 sm:px-10 lg:order-2 lg:-ml-14 lg:px-8 lg:py-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="kcan-kicker w-fit"
          >
            {data.subtitle ?? "Pozivnica"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, rotate: -3 }}
            animate={{ opacity: 1, rotate: -1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="kcan-mast mt-6"
          >
            <h1 className="kcan-mast-inner kcan-heading text-white">
              {event.names}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="kcan-stripe mt-5"
          >
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mt-4 text-2xl font-extrabold leading-tight"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
            {data.badge ? (
              <span className="ml-2" style={{ color: "var(--color-kcan-pink)" }}>
                — {data.badge}
              </span>
            ) : null}
          </motion.p>

          {data.description ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="mt-4 max-w-md text-sm font-medium leading-relaxed text-kcan-ink/65"
            >
              {data.description}
            </motion.p>
          ) : null}

          {data.ctaText ? (
            <motion.a
              href={data.ctaHref || "#rsvp"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="kcan-btn mt-8 w-fit"
            >
              <span>{data.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Hero;
