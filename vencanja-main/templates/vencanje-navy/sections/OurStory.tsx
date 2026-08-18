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
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const hasImage = Boolean(data.image?.trim());

  return (
    <section id={id} className="vn-section">
      <div
        className={
          hasImage
            ? "vn-shell-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
            : "vn-shell max-w-2xl"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className={hasImage ? "lg:col-span-6" : undefined}
        >
          <p className="vn-eyebrow">{data.overline ?? "Poglavlja"}</p>
          <h2 className="vn-display mt-4">{data.title}</h2>
          {data.subtitle ? (
            <p className="vn-body mt-4 max-w-md">{data.subtitle}</p>
          ) : null}

          <div className="mt-8 space-y-5 sm:mt-10">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="vn-body max-w-xl">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <Media
              src={data.image}
              alt={data.title ?? "Naša priča"}
              className="aspect-[4/5] w-full"
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default OurStory;
