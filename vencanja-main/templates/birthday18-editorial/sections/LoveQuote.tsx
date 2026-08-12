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

/** Magazine spread with the CTA as a corner tab, not a centered button under the copy. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="ed-final">
      <div className="ed-grain" aria-hidden />
      <div className="ed-final__age" aria-hidden>
        18
      </div>
      <div className="ed-shell relative z-10 text-left">
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
          className="ed-final__title max-w-2xl"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-lg text-lg text-white/80"
          >
            {data.description}
          </motion.p>
        ) : null}
      </div>
      <motion.a
        href="#rsvp"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="ed-final__tab"
      >
        DOLAZIM
      </motion.a>
    </section>
  );
};

export default LoveQuote;
