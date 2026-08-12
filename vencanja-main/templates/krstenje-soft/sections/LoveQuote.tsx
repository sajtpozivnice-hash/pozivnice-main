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
    <section id={id} className="ks-section ks-quote-banner">
      <div className="ks-wash -top-16 left-10 h-56 w-56 bg-white/30" />
      <div className="ks-wash -bottom-20 right-10 h-64 w-64 bg-white/20" />

      <div className="ks-container-narrow relative text-center">
        <p className="ks-script text-3xl sm:text-4xl">Iz srca</p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-2xl leading-relaxed sm:text-4xl sm:leading-snug"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {data.title}
        </motion.p>

        {data.description ? (
          <p className="mt-6 text-sm text-ks-ink-soft/80">{data.description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default LoveQuote;
