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
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="vd-eyebrow">{data.overline ?? "Poglavlje"}</p>
          <h2 className="vd-display mt-4">{data.title}</h2>
          <div className="vd-rule mt-8" />

          <div className="mt-10 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="vd-body">
                {paragraph}
              </p>
            ))}
          </div>

          {data.subtitle ? (
            <p className="vd-meta mt-10">{data.subtitle}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
