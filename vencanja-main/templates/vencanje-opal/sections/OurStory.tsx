"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);
  const pullQuote = paragraphs[0] ?? "";
  const body = paragraphs.slice(1);

  return (
    <section id={id} className="vo-section bg-vo-pearl">
      <div className="vo-container">
        <div className="mb-10 flex flex-col gap-3 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-eyebrow"
            style={{ color: accent }}
          >
            {data.overline ?? data.subtitle ?? "Naša priča"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {pullQuote ? (
              <p
                className="mb-8 text-2xl leading-snug sm:text-3xl sm:leading-snug lg:text-[2.15rem]"
                style={{ fontFamily: "var(--font-primary)", color: ink }}
              >
                {pullQuote}
              </p>
            ) : null}

            <div className="space-y-5">
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 28)} className="vo-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-xs lg:col-span-5 lg:max-w-none"
          >
            <OpalMedia
              src={data.image}
              alt={data.title}
              className="aspect-square w-full rounded-full shadow-[0_20px_50px_-24px_rgba(58,53,50,0.35)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
