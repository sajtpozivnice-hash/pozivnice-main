"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { LinenMedia } from "../components/Media";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";

  return (
    <section id={id} className="vl-section bg-vl-paper">
      <div className="vl-container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85 }}
          className="mx-auto max-w-2xl text-center sm:text-left"
        >
          {data.overline ? (
            <p className="vl-eyebrow mb-5" style={{ color: accent }}>
              {data.overline}
            </p>
          ) : null}

          <h2 className="vl-display" style={{ color: ink }}>
            {data.title}
          </h2>

          {data.subtitle ? (
            <p
              className="mt-4 text-lg italic text-vl-muted"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.subtitle}
            </p>
          ) : null}

          <div className="vl-rule-champagne mx-auto mt-8 w-16 sm:mx-0" />

          <div className="vl-body mt-8 space-y-5 whitespace-pre-line" style={{ color: ink }}>
            {data.text}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-14"
        >
          <LinenMedia
            src={data.image}
            alt={data.title ?? "Naša priča"}
            className="aspect-[21/9] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
