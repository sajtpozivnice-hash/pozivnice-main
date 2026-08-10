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
      <div className="b18-overlay absolute inset-0" />

      <div className="b18-shell relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18-heading b18-metal text-5xl sm:text-6xl lg:text-7xl"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/65"
          >
            {data.description}
          </motion.p>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <a href="#rsvp" className="b18-btn">
            Potvrdi dolazak
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
