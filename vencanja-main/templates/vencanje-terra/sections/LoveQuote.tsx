"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { LoveQuoteSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { TerraMedia } from "../components/Media";

type Props = {
  section: LoveQuoteSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const LoveQuote: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";

  return (
    <section id={id} className="vt-section bg-vt-sand">
      <div className="vt-container">
        <div className="relative overflow-hidden vt-soft">
          <TerraMedia
            src={data.imageUrl}
            alt={data.title}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-vt-ink/55" />

          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 px-6 py-20 text-center sm:px-12 sm:py-28"
          >
            <span
              className="mx-auto mb-8 block h-1 w-10 rounded-full"
              style={{ background: accent }}
            />
            <blockquote
              className="mx-auto max-w-2xl text-[1.45rem] leading-[1.4] text-vt-cream sm:text-3xl lg:text-[2.35rem]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.title}
            </blockquote>
            {data.description ? (
              <figcaption className="mt-8 text-[10px] uppercase tracking-[0.4em] text-vt-cream/75">
                {data.description}
              </figcaption>
            ) : null}
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default LoveQuote;
