"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Wave } from "../components/Ornaments";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const paragraphs = (data.text ?? "")
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vb-section bg-[var(--color-vb-sand-deep)]">
      <div className="vb-shell text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="vb-kicker">{data.overline ?? "Priča"}</p>
          <h2 className="vb-script-sm mt-4">{data.title}</h2>
          <Wave className="vb-wave mt-6" />

          <div className="mt-10 space-y-6 text-left sm:text-center">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="vb-body mx-auto max-w-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
