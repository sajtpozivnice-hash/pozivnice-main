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
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
  const [pullQuote, ...rest] = paragraphs;

  return (
    <section id={id} className="km-section bg-white">
      <div className="km-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-eyebrow mb-4"
        >
          {data.overline}
        </motion.p>

        {/* Asymmetric layout — narrow offset image column, not an even 12-col split */}
        <div className="grid gap-10 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-start sm:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="km-story-media sm:translate-y-10"
          >
            <img
              src={data.image}
              alt={data.title}
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="km-heading mb-6">{data.title}</h2>

            {pullQuote ? (
              <p className="km-story-pull mb-6">{pullQuote}</p>
            ) : null}

            <div className="space-y-4">
              {rest.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-sm leading-relaxed text-km-muted sm:text-base"
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
