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

/** Full-screen kinetic typography: each word of the title flies in on its own line, no giant "18" grain overlay. */
const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const words = (data.title || "").split(" ").filter(Boolean);

  return (
    <section id={id} className="bn-kinetic">
      <div className="bn-shell relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-label mb-8 text-center"
        >
          Poslednji poziv
        </motion.p>
        <h2 className="bn-kinetic__title">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: "0.6em", rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6, ease: "easeOut" }}
              className="bn-kinetic__word"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        {data.description ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: words.length * 0.12 + 0.1 }}
            className="bn-kinetic__desc"
          >
            {data.description}
          </motion.p>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: words.length * 0.12 + 0.2 }}
          className="mt-10 flex justify-center"
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
