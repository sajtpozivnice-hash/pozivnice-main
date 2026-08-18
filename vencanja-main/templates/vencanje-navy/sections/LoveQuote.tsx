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
        className="relative flex min-h-[70svh] w-full items-center overflow-hidden px-5 py-24 sm:px-8"
      >
        <Media
          src={data.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-vn-navy)]/70" />

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto w-full max-w-3xl border border-[var(--color-vn-champagne-soft)] bg-[var(--color-vn-navy-deep)]/88 px-6 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-16"
        >
          <span className="vn-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote className="vn-quote-text mt-4 px-2">
            {data.title}
          </blockquote>
          <span className="vn-quote-mark mt-2 inline-block" aria-hidden="true">
            ”
          </span>
          {data.description ? (
            <p className="vn-caption mt-8">{data.description}</p>
          ) : null}
        </motion.figure>
      </section>
    );
  }

  return (
    <section id={id} className="vn-section">
      <div className="vn-shell max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <span className="vn-quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote className="vn-quote-text mt-4 px-2">
            {data.title}
          </blockquote>
          <span className="vn-quote-mark mt-2 inline-block" aria-hidden="true">
            ”
          </span>
          {data.description ? (
            <p className="vn-caption mt-8">{data.description}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
