"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
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
    <section id={id} className="kd-section">
      <div className="kd-glow top-1/2 -right-24 h-72 w-72 -translate-y-1/2" />

      <div className="kd-container-narrow relative z-10">
        {/* Single column with a glowing vertical ornament rail — no side-by-side split */}
        <div className="flex gap-6 sm:gap-10">
          <div className="kd-story-rail">
            <span className="kd-story-rail-flame">
              <Flame className="h-4 w-4" />
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 pb-2"
          >
            {data.image ? (
              <div className="kd-story-thumb">
                <img
                  src={data.image}
                  alt={data.title}
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}

            <p className="kd-eyebrow mb-3">{data.overline}</p>
            <h2 className="kd-heading mb-6">{data.title}</h2>

            <div className="space-y-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-relaxed text-[#e5d6b6] sm:text-lg"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
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
