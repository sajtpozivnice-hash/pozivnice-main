"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";

  return (
    <section id={id} className="relative min-h-[75svh] w-full overflow-hidden">
      <PremiumMedia
        src={data.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-vp-ink/60" />

      <div className="relative z-10 flex min-h-[75svh] items-center justify-center px-5 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <p
            className="mb-8 text-6xl leading-none"
            style={{ color: accent, fontFamily: "var(--font-primary)" }}
          >
            “
          </p>
          <blockquote
            className="text-2xl leading-snug text-white sm:text-4xl sm:leading-snug"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {data.title}
          </blockquote>
          {data.description ? (
            <p className="mt-8 text-xs uppercase tracking-[0.35em] text-white/60">
              {data.description}
            </p>
          ) : (
            <div
              className="mx-auto mt-10 h-px w-16"
              style={{ background: accent }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveQuote;
