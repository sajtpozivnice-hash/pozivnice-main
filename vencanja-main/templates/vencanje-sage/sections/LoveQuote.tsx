"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SageMedia } from "../components/Media";

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
    <section
      id={id}
      className="relative flex min-h-[70svh] w-full items-center overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
    >
      <SageMedia
        src={data.imageUrl}
        alt={data.title}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-vs-oat/45" />

      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto w-full max-w-2xl bg-vs-linen/80 px-7 py-14 text-center backdrop-blur-md sm:px-14 sm:py-16"
      >
        <span
          className="mx-auto mb-8 block h-px w-12"
          style={{ background: accent }}
        />
        <blockquote
          className="text-[1.6rem] leading-[1.35] tracking-[-0.01em] sm:text-4xl"
          style={{ fontFamily: "var(--font-primary)", color: ink }}
        >
          {data.title}
        </blockquote>
        {data.description ? (
          <figcaption className="mt-8 text-[10px] uppercase tracking-[0.44em] text-vs-muted">
            {data.description}
          </figcaption>
        ) : null}
      </motion.figure>
    </section>
  );
};

export default LoveQuote;
