"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="px-6 py-14 text-center sm:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-5xl leading-none"
            style={{ color: accent, fontFamily: "var(--font-primary)" }}
          >
            “
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl leading-snug text-white sm:text-3xl"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </motion.blockquote>
          {data.description ? (
            <p className="mt-6 text-sm text-white/55">{data.description}</p>
          ) : (
            <div
              className="mx-auto mt-8 h-px w-12"
              style={{ background: accent }}
            />
          )}
        </GlassPanel>
      </div>
    </section>
  );
};

export default LoveQuote;
