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
    <section id={id} className="v3-section bg-v3-ivory">
      <div className="v3-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-40px_rgba(20,18,16,0.55)]">
              <img
                src={data.image}
                alt={data.title}
                className="aspect-[4/5] w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <p className="v3-eyebrow mb-4">{data.overline}</p>
            <h2 className="v3-heading mb-8" style={{ color: ink }}>
              {data.title}
            </h2>
            <div className="space-y-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-relaxed text-v3-muted sm:text-lg"
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
