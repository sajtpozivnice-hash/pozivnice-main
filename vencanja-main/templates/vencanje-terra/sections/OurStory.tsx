"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { TerraMedia } from "../components/Media";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id={id} className="vt-section bg-vt-sand">
      <div className="vt-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="order-2 lg:order-1 lg:col-span-6"
        >
          <TerraMedia
            src={data.image}
            alt={data.title}
            className="vt-arch aspect-[4/5] w-full max-w-md mx-auto lg:mx-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2 lg:col-span-6"
        >
          {data.overline ? (
            <p className="vt-eyebrow mb-6" style={{ color: accent }}>
              {data.overline}
            </p>
          ) : null}

          <h2 className="vt-display" style={{ color: ink }}>
            {data.title}
          </h2>

          {data.subtitle ? (
            <p
              className="mt-5 text-xl italic text-vt-muted"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.subtitle}
            </p>
          ) : null}

          <div className="mt-9 space-y-5">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={`story-p-${index}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="vt-body"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
