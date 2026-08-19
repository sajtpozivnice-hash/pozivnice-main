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
      style={{
        background: "var(--color-vd-ink)",
        color: "var(--color-vd-ivory)",
      }}
    >
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="vd-shell mx-auto max-w-3xl text-center"
      >
        <div
          className="vd-diamond mx-auto"
          style={{ background: "var(--color-vd-gold)" }}
        />
        <blockquote
          className="mt-10"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
          }}
        >
          „{data.title}“
        </blockquote>
        {data.description ? (
          <figcaption className="vd-meta mt-10" style={{ color: "var(--color-vd-gold)" }}>
            — {data.description}
          </figcaption>
        ) : null}
      </motion.figure>
    </section>
  );
};

export default LoveQuote;
