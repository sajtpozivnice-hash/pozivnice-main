"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
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
    <section id={id} className="kd-section">
      <div className="kd-glow top-1/3 left-1/2 h-64 w-64 -translate-x-1/2" />

      <div className="kd-container-narrow relative z-10">
        {/* Candlelit plaque — bordered glowing panel with a flame mark, like a chapel wall plaque */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kd-glow-panel px-8 py-14 text-center sm:px-14 sm:py-16"
        >
          <span
            className="mx-auto mb-7 flex h-11 w-11 items-center justify-center rounded-full border"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <Flame className="h-5 w-5" />
          </span>

          <blockquote className="kd-quote text-2xl leading-relaxed sm:text-3xl sm:leading-snug">
            {data.title}
          </blockquote>

          {data.description ? (
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-kd-ink-soft">
              {data.description}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
