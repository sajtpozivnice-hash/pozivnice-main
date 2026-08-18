"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vp-section bg-vp-ivory">
      <div className="vp-container">
        <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vp-eyebrow mb-4"
              style={{ color: accent }}
            >
              {data.overline ?? data.subtitle ?? "Our story"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="vp-display"
              style={{ color: ink }}
            >
              {data.title}
            </motion.h2>
          </div>
          <div className="hidden lg:col-span-7 lg:block">
            <div className="mb-3 h-px w-full bg-vp-line" />
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <PremiumMedia
              src={data.image}
              alt={data.title}
              className="aspect-[16/11] w-full lg:aspect-[5/4]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="vp-rule-left mb-8" style={{ background: accent }} />
            <div className="space-y-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 28)} className="vp-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
