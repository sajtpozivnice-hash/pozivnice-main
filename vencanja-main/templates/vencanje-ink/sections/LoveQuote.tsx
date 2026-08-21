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
  const accent = theme.colors?.base?.primary?.value ?? "#111111";

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 gap-8 pt-14 lg:grid-cols-12"
        >
          <span className="vi-quote-mark lg:col-span-2" aria-hidden="true">
            &ldquo;
          </span>

          <div className="lg:col-span-8">
            <p className="vi-quote-text max-w-3xl">{data.title}</p>
            <div className="vi-accent mt-10" style={{ background: accent }} />
            {data.description ? (
              <footer className="vi-caption mt-5">{data.description}</footer>
            ) : null}
          </div>

          <span
            className="vi-quote-mark self-end text-right lg:col-span-2"
            aria-hidden="true"
          >
            &rdquo;
          </span>
        </motion.blockquote>

        <div className="vi-rule mt-16" />
      </div>
    </section>
  );
};

export default LoveQuote;
