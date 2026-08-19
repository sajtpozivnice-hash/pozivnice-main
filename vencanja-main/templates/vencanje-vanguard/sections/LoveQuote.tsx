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
      className="relative w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      style={{ background: "var(--color-vg-ink)", color: "var(--color-vg-paper)" }}
    >
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="vg-shell"
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.38em]"
          style={{
            color: "var(--color-vg-blood)",
            fontFamily: "var(--font-secondary)",
          }}
        >
          Izjava
        </p>
        <blockquote
          className="mt-8 max-w-4xl"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {data.title}
        </blockquote>
        {data.description ? (
          <figcaption
            className="mt-10 text-[12px] uppercase tracking-[0.32em]"
            style={{
              color: "color-mix(in srgb, var(--color-vg-paper) 55%, transparent)",
              fontFamily: "var(--font-secondary)",
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
