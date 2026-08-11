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
    <section id={id} className="bn-final">
      <div className="bn-grain" aria-hidden />
      <div className="bn-final__age" aria-hidden>
        18
      </div>
      <div className="bn-shell relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-label mb-6"
        >
          Poslednji poziv
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-final__title"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-6 text-sm font-bold tracking-[0.28em] uppercase text-[color:var(--bn-accent)]"
          >
            {data.description}
          </motion.p>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="mt-10"
        >
          <a href="#rsvp" className="bn-btn">
            Potvrdi dolazak
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
