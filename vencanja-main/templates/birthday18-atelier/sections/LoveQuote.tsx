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

/** Lookbook final frame: bordered pull-quote with a look tag, not the coast sun-orb band. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18a-final"
        >
          <span className="b18a-final__tag">Poslednji look</span>
          <p className="b18a-final__quote">“{data.title}”</p>
          {data.description ? (
            <p className="mt-4 text-[var(--atelier-muted)]">
              {data.description}
            </p>
          ) : null}
          <div className="b18a-final__rule" />
          <a href="#rsvp" className="b18a-link">
            Potvrdi dolazak →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
