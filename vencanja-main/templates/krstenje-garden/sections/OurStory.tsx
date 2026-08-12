"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
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
    <section id={id} className="kg-section bg-kg-ivory">
      <div className="kg-container">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Overlapping polaroid stack instead of a single framed photo */}
          <motion.div
            initial={{ opacity: 0, rotate: -4 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="kg-polaroid-stack"
          >
            <div className="kg-polaroid kg-polaroid--back">
              <img src={data.image} alt="" referrerPolicy="no-referrer" />
            </div>
            <div className="kg-polaroid kg-polaroid--front">
              <img
                src={data.image}
                alt={data.title}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="kg-eyebrow mb-4">
              <Leaf className="h-3.5 w-3.5" />
              {data.overline}
            </div>
            <h2 className="kg-heading mb-6" style={{ color: ink }}>
              {data.title}
            </h2>
            <div className="kg-story-notes">
              {paragraphs.map((paragraph) => (
                <div key={paragraph.slice(0, 24)} className="kg-story-note">
                  <Leaf
                    className="mt-1 h-4 w-4 shrink-0"
                    style={{ color: "var(--color-kg-champagne)" }}
                  />
                  <p
                    className="text-sm leading-relaxed text-kg-muted sm:text-base"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
