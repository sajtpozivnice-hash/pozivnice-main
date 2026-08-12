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

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id={id} className="ks-section bg-ks-ivory">
      <div className="ks-wash top-10 -right-20 h-72 w-72 bg-ks-sand" />

      <div className="ks-container-narrow text-center">
        {/* Stacked letter — image sits above the note, single column, no 12-col grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="ks-story-frame"
        >
          <img
            src={data.image}
            alt={data.title}
            className="aspect-[4/3] w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-script mb-2"
        >
          {data.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-heading mb-6"
          style={{ color: ink }}
        >
          {data.title}
        </motion.h2>

        <div className="mx-auto max-w-xl space-y-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-base leading-relaxed text-ks-muted sm:text-lg"
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
