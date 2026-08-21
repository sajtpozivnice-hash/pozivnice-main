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
    <section id={id} className="relative overflow-hidden pb-8 pt-10 sm:pt-14">
      <span className="khny-balloon right-[8%] top-8 sm:right-[14%]" aria-hidden />
      <span className="khny-bee left-[10%] top-24" aria-hidden />
      <span
        className="khny-bee right-[18%] top-[42%]"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      />

      <div className="khny-shell text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="khny-jar mx-auto max-w-xl px-6 pb-10 pt-12 sm:px-10 sm:pb-12 sm:pt-14"
        >
          <span className="khny-jar-lid" aria-hidden />
          <p className="khny-lid mx-auto mb-6">{data.subtitle ?? "Medeni picnic"}</p>
          <p className="khny-script">{event.names}</p>
          <div className="khny-drip mt-2" aria-hidden />
          <h1 className="khny-heading mx-auto mt-6 max-w-md">{data.title}</h1>
          {data.badge ? (
            <p
              className="mt-3 text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--color-khny-red)" }}
            >
              {data.badge}
            </p>
          ) : null}
          {data.description ? (
            <p className="khny-body mx-auto mt-5 max-w-sm">{data.description}</p>
          ) : null}
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] opacity-55">
            {formatDate(event.date, "DAY_D_MMMM_YYYY")}
          </p>

          {data.image || data.backgroundImage ? (
            <div
              className="mx-auto mt-8 max-w-xs overflow-hidden rounded-[2rem] border-4"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-khny-honey) 50%, transparent)",
              }}
            >
              <img
                src={data.image || data.backgroundImage}
                alt={event.names}
                className="aspect-square w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}

          {data.ctaText ? (
            <a href={data.ctaHref || "#rsvp"} className="khny-btn mt-8">
              <span>{data.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
