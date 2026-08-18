"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">{data.overline ?? "Priča"}</p>
          <p className="vi-caption">No. 02</p>
        </div>

        <div className="vi-grid mt-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-4"
          >
            <div className="mx-auto w-40 sm:w-48 lg:mx-0 lg:w-full">
              <Media
                src={data.image}
                alt={data.title}
                className="vi-plate-column"
                caption="Arhiva"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h2 className="vi-display max-w-xl">{data.title}</h2>
            <div className="vi-accent mt-8" style={{ background: accent }} />

            <div className="mt-8 max-w-2xl space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="vi-body">
                  {paragraph}
                </p>
              ))}
            </div>

            {data.subtitle ? (
              <p className="vi-caption mt-10 border-t border-vi-line pt-4">
                {data.subtitle}
              </p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
