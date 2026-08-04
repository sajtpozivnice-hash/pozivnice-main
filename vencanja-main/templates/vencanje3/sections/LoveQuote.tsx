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
  const accent = theme.colors?.base?.primary?.value;

  return (
    <section id={id} className="v3-section bg-v3-ink text-white">
      <div className="v3-container-narrow text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-5xl leading-none"
          style={{ color: accent }}
        >
          “
        </motion.p>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl leading-relaxed sm:text-4xl sm:leading-snug"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title}
        </motion.blockquote>
        {data.description ? (
          <p className="mt-8 text-sm text-white/55">{data.description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default LoveQuote;
