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

const QuoteContent: FC<{
  title?: string;
  description?: string;
}> = ({ title, description }) => (
  <>
    <span className="vn-invite-br" aria-hidden="true">
      <span className="tl" />
      <span className="tr" />
      <span className="bl" />
      <span className="br" />
    </span>

    <span className="vn-quote-mark" aria-hidden="true">
      “
    </span>
    <blockquote className="vn-quote-text mt-4 px-2">{title}</blockquote>
    <span className="vn-quote-mark mt-2 inline-block" aria-hidden="true">
      ”
    </span>
    {description ? <p className="vn-caption mt-8">{description}</p> : null}
  </>
);

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
          className="vn-invite-frame relative z-10 mx-auto w-full max-w-3xl text-center"
        >
          <QuoteContent title={data.title} description={data.description} />
        </motion.figure>
      </section>
    );
  }

  return (
    <section id={id} className="vn-section">
      <div className="vn-shell">
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="vn-invite-frame text-center"
        >
          <QuoteContent title={data.title} description={data.description} />
        </motion.figure>
      </div>
    </section>
  );
};

export default LoveQuote;
