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

/** Two-column split: solid "18" numeral card beside the copy, not a centered stack with floating blobs. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18b-final">
      <div className="b18b-shell b18b-final__split">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true }}
          className="b18b-final__badge"
        >
          18
        </motion.div>
        <div className="b18b-final__copy">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="b18b-heading text-4xl sm:text-5xl lg:text-6xl"
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-xl text-lg text-white/90"
            >
              {data.description}
            </motion.p>
          ) : null}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <a href="#rsvp" className="b18b-btn">
              Potvrdi dolazak
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoveQuote;
