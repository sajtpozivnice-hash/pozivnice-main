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

/** Tide line: a horizon rule up top, copy bottom-anchored with an arrow link, not a centered sun band. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18c-band b18c-tide">
      <div className="b18c-tide__horizon" aria-hidden />
      <div className="b18c-tide__orb" aria-hidden />
      <div className="b18c-shell relative z-10 b18c-tide__content">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18c-display text-4xl sm:text-5xl"
        >
          {data.title}
        </motion.h2>
        {data.description ? (
          <p className="mt-4 max-w-xl text-[var(--coast-muted)]">
            {data.description}
          </p>
        ) : null}
        <div className="mt-6">
          <a href="#rsvp" className="b18c-tide__link">
            Potvrdi dolazak <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoveQuote;
