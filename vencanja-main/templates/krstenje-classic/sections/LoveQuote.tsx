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
    <section id={id} className="kc-section bg-kc-ivory">
      <div className="kc-container-narrow">
        {/* Centered ornament quote — letterpress plate with rule-dot-rule ornament */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-plate px-6 py-14 text-center sm:px-14 sm:py-16"
        >
          <div className="kc-ornament mb-8">
            <span className="kc-ornament-dot" />
          </div>

          <p
            className="text-2xl leading-relaxed sm:text-3xl sm:leading-snug"
            style={{ fontFamily: "var(--font-primary)", color: ink }}
          >
            {data.title}
          </p>

          <div className="kc-ornament mt-8">
            <span className="kc-ornament-dot" />
          </div>

          {data.description ? (
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-kc-muted">
              {data.description}
            </p>
          ) : null}
        </motion.blockquote>
      </div>
    </section>
  );
};

export default LoveQuote;
