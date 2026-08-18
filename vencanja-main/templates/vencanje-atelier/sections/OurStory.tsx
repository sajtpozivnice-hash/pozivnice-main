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

const OurStory: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id={id} className="va-section">
      <div className="va-shell grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="lg:col-span-5"
        >
          <p className="va-eyebrow">{data.overline ?? "Priča"}</p>
          <h2 className="va-display mt-4">{data.title}</h2>
          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="va-body">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {data.image ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <Media
              src={data.image}
              alt={data.title}
              className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default OurStory;
