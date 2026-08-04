"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
  const storyImage = data.image?.trim() ? data.image.trim() : "";

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap">
        <GlassPanel strong className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              {storyImage ? (
                <img
                  src={storyImage}
                  alt={data.title}
                  className="aspect-[4/5] h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="aspect-[4/5] w-full bg-white/10" />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="px-6 py-10 sm:px-10 sm:py-12 lg:col-span-7"
            >
              <p className="vb-eyebrow mb-4" style={{ color: accent }}>
                {data.overline ?? data.subtitle ?? "Priča"}
              </p>
              <h2 className="vb-title mb-8">{data.title}</h2>
              <div className="space-y-5">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)} className="vb-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default OurStory;
