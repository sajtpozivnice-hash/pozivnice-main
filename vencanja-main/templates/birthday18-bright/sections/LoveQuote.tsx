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
    <section id={id} className="b18b-final">
      <div className="b18b-final__age" aria-hidden>
        18
      </div>
      <div className="b18b-blob b18b-blob--mint b18b-float absolute left-8 top-10 h-40 w-40 opacity-50" />
      <div className="b18b-blob b18b-blob--lilac b18b-float-slow absolute right-6 bottom-8 h-48 w-48 opacity-40" />

      <div className="b18b-shell relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18b-heading text-5xl sm:text-6xl lg:text-7xl"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-lg text-white/90"
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
          <a href="#rsvp" className="b18b-btn">
            Potvrdi dolazak
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
