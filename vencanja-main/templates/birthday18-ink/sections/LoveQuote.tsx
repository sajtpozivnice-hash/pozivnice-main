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
    <section id={id} className="b18i-section">
      {/* Newspaper pull-quote — oversized quotation glyph + italic quote between rules, not a plain title block */}
      <div className="b18i-shell b18i-lastpage">
        <p className="b18i-eyebrow mb-4">Poslednja strana</p>
        <blockquote className="b18i-final-quote">
          <span className="b18i-final-quote__mark" aria-hidden>
            &ldquo;
          </span>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="b18i-final-quote__text"
          >
            {data.title}
          </motion.p>
          {data.description ? (
            <footer className="b18i-final-quote__cite">
              {data.description}
            </footer>
          ) : null}
        </blockquote>
        <div className="mt-8">
          <a href="#rsvp" className="b18i-btn">
            Potvrdi dolazak
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoveQuote;
