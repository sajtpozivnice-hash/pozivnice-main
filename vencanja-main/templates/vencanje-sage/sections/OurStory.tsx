"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SageMedia } from "../components/Media";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vs-section bg-vs-linen">
      <div className="vs-container grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6"
        >
          {data.overline ? (
            <p className="vs-eyebrow mb-6" style={{ color: accent }}>
              {data.overline}
            </p>
          ) : null}

          <h2 className="vs-display" style={{ color: ink }}>
            {data.title}
          </h2>

          {data.subtitle ? (
            <p className="mt-5 text-lg italic text-vs-muted" style={{ fontFamily: "var(--font-primary)" }}>
              {data.subtitle}
            </p>
          ) : null}

          <div className="mt-9 space-y-5 border-l border-vs-line pl-7">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="vs-body"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <SageMedia
            src={data.image}
            alt={data.title}
            className="aspect-[4/5] w-full lg:translate-y-6"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
