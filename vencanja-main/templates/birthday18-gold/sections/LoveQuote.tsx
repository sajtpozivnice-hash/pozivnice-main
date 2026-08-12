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

/** Gala curtain call: monogram medallion between gold rules, not the bright blob/age overlay. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="gala-section gala-curtain overflow-hidden">
      <div className="gala-shell relative z-10 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gala-curtain__rule mx-auto origin-center"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="gala-curtain__medallion mx-auto my-8"
        >
          <span>18</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="gala-display text-4xl sm:text-5xl lg:text-6xl"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-5 max-w-lg text-[var(--gala-muted)]"
          >
            {data.description}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-10"
        >
          <a href="#rsvp" className="gala-btn">
            Potvrdi dolazak
          </a>
        </motion.div>

        <div className="gala-curtain__rule gala-curtain__rule--bottom mx-auto mt-10 origin-center" />
      </div>
    </section>
  );
};

export default LoveQuote;
