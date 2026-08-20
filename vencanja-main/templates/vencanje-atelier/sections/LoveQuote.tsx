"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

  if (hasImage) {
    return (
      <section
        id={id}
        className="relative flex min-h-[56svh] w-full items-center overflow-hidden px-5 py-20 sm:px-8 sm:py-24"
      >
        <Media
          src={data.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-va-ink/55" />

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto w-full max-w-2xl text-center text-white"
        >
          <div className="mx-auto mb-8 h-px w-10 bg-white/50" />
          <p
            className="text-2xl italic leading-relaxed sm:text-3xl"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </p>
          {data.description ? (
            <footer className="mt-8 text-[13px] uppercase tracking-[0.3em] text-white/75 sm:text-sm">
              {data.description}
            </footer>
          ) : null}
        </motion.blockquote>
      </section>
    );
  }

  return (
    <section id={id} className="va-section-tight">
      <div className="va-shell-narrow text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className="va-rule-thin mb-8" />
          <p className="va-quote">{data.title}</p>
          {data.description ? (
            <footer className="va-caption mt-8">{data.description}</footer>
          ) : null}
        </motion.blockquote>
      </div>
    </section>
  );
};

export default LoveQuote;
