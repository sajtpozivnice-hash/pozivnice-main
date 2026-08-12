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

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="km-section bg-white">
      <div className="km-container">
        {/* Oversized typographic pull-quote — poster-scale mark, left-aligned */}
        <span className="km-quote-mark" aria-hidden>
          “
        </span>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-quote-text"
          style={{ color: ink }}
        >
          {data.title}
        </motion.p>
        {data.description ? (
          <>
            <div className="km-divider mt-8" />
            <p className="mt-6 max-w-md text-sm text-km-muted">
              {data.description}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
};

export default LoveQuote;
