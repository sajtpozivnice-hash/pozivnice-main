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
      className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
      style={{
        background: "var(--color-vb-clay)",
        color: "var(--color-vb-sand)",
      }}
    >
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="vb-shell text-center"
      >
        <div
          className="vb-arch mx-auto opacity-90"
          style={{ borderColor: "var(--color-vb-sand)" }}
        />
        <blockquote className="vb-script-sm mt-10 text-[clamp(2rem,5.5vw,3.25rem)]">
          {data.title}
        </blockquote>
        {data.description ? (
          <figcaption
            className="mt-8 text-[12px] uppercase tracking-[0.32em]"
            style={{
              fontFamily: "var(--font-secondary)",
              opacity: 0.85,
            }}
          >
            — {data.description}
          </figcaption>
        ) : null}
      </motion.figure>
    </section>
  );
};

export default LoveQuote;
