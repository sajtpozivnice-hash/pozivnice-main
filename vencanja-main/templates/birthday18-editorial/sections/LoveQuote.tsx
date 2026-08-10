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
    <section id={id} className="ed-final">
      <div className="ed-grain" aria-hidden />
      <div className="ed-final__age" aria-hidden>
        18
      </div>
      <div className="ed-shell relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ed-label mb-6 text-white/70"
        >
          Završni spread
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ed-final__title"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-lg text-lg text-white/80"
          >
            {data.description}
          </motion.p>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="mt-10"
        >
          <a href="#rsvp" className="ed-btn ed-btn--lime">
            DOLAZIM
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
