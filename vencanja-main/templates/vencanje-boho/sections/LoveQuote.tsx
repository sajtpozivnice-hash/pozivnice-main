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
    <section
      id={id}
      className="vb-quote-band relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
    >
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="vb-shell text-center"
      >
        <div className="vb-arch mx-auto" />
        <blockquote className="vb-script-sm mt-10 text-[clamp(2rem,5.5vw,3.25rem)]">
          {data.title}
        </blockquote>
        {data.description ? (
          <figcaption
            className="vb-meta mt-8 tracking-[0.32em]"
          >
            — {data.description}
          </figcaption>
        ) : null}
      </motion.figure>
    </section>
  );
};

export default LoveQuote;
