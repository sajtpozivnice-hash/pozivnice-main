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
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";

  return (
    <section id={id} className="vs-section bg-vs-sage-tint">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="vs-container-narrow text-center"
      >
        <span
          className="mx-auto mb-8 block h-px w-12"
          style={{ background: accent }}
        />
        <blockquote
          className="text-[1.85rem] leading-[1.35] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem]"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {data.title}
        </blockquote>
        {data.description ? (
          <figcaption className="mt-8 text-[13px] uppercase tracking-[0.36em] text-vs-muted sm:text-sm">
            {data.description}
          </figcaption>
        ) : null}
      </motion.figure>
    </section>
  );
};

export default LoveQuote;
