"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { LinenMedia } from "../components/Media";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const hasImage = Boolean(data.imageUrl?.trim());

  if (hasImage) {
    return (
      <section
        id={id}
        className="relative flex min-h-[70svh] w-full items-center overflow-hidden px-5 py-24 sm:px-8"
      >
        <LinenMedia
          src={data.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-vl-linen/55" />

        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 mx-auto w-full max-w-2xl border border-vl-line bg-vl-paper/88 px-8 py-14 text-center backdrop-blur-sm sm:px-12 sm:py-16"
        >
          <span
            className="mb-8 block text-4xl leading-none"
            style={{ fontFamily: "var(--font-primary)", color: accent }}
            aria-hidden
          >
            “
          </span>
          <blockquote
            className="text-2xl italic leading-[1.55] sm:text-3xl lg:text-[2.15rem]"
            style={{ fontFamily: "var(--font-primary)", color: ink }}
          >
            {data.title}
          </blockquote>
          {data.description ? (
            <cite className="vl-caption mt-10 block not-italic">
              — {data.description}
            </cite>
          ) : null}
        </motion.figure>
      </section>
    );
  }

  return (
    <section id={id} className="vl-section vl-linen-ground">
      <div className="vl-container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <span
            className="mb-8 block text-4xl leading-none text-vl-champagne"
            style={{ fontFamily: "var(--font-primary)", color: accent }}
            aria-hidden
          >
            “
          </span>

          <blockquote
            className="text-2xl italic leading-[1.55] sm:text-3xl lg:text-[2.15rem]"
            style={{ fontFamily: "var(--font-primary)", color: ink }}
          >
            {data.title}
          </blockquote>

          {data.description ? (
            <cite className="vl-caption mt-10 block not-italic">
              — {data.description}
            </cite>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
