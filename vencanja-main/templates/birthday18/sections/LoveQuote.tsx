"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Asymmetric pull-quote: left-anchored column with a rule and oversized mark, not a centered hero stack. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section
      id={id}
      className="relative flex min-h-[70svh] items-center overflow-hidden py-24"
    >
      {data.imageUrl ? (
        <img
          src={data.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--b18-ink)]" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, var(--b18-bg) 0%, color-mix(in srgb, var(--b18-bg) 75%, transparent) 42%, transparent 78%)",
        }}
      />

      <div className="b18-shell relative z-10">
        <div className="b18-pullquote">
          <span className="b18-pullquote__mark" aria-hidden>
            “
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="b18-heading b18-metal text-4xl sm:text-5xl lg:text-6xl"
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-md text-lg text-white/65"
            >
              {data.description}
            </motion.p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-9"
          >
            <a href="#rsvp" className="b18-btn">
              Potvrdi dolazak
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoveQuote;
