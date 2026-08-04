"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
  const storyImage = data.image;

  return (
    <SceneShell
      id={id}
      backgroundImage={storyImage}
      overlay="default"
    >
      <div className="v4-content">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="lg:col-span-5"
          >
            {storyImage ? (
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.9)]">
                <img
                  src={storyImage}
                  alt={data.title}
                  className="aspect-[4/5] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="aspect-[4/5] w-full rounded-[1.75rem] border border-white/15 bg-white/5" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="v4-glass-strong px-6 py-10 sm:px-10 sm:py-12">
              <p className="v4-eyebrow mb-4" style={{ color: accent }}>
                {data.overline ?? data.subtitle ?? "Naša priča"}
              </p>
              <h2 className="v4-heading mb-8 text-4xl sm:text-5xl">
                {data.title}
              </h2>
              <div className="space-y-5">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 28)}
                    className="text-base leading-relaxed text-white/75 sm:text-lg"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SceneShell>
  );
};

export default OurStory;
