"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id={id} className="kc-story-bleed">
      <div className="kc-story-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.image} alt={data.title} referrerPolicy="no-referrer" />
      </div>
      <div className="kc-story-scrim" />

      <div className="kc-story-content">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-eyebrow mb-4"
        >
          {data.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-heading mb-8 text-kc-ivory"
        >
          {data.title}
        </motion.h2>

        <div className="kc-ornament mb-8">
          <span
            className="kc-ornament-dot"
            style={{ background: "var(--color-kc-champagne-soft)" }}
          />
        </div>

        <div className="space-y-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-base leading-relaxed text-kc-ivory/85 sm:text-lg"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
