"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";
import { StoryReel, StoryReelSlide } from "../components/StoryReel";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurStory: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";
  const paragraphs = (data.text ?? "")
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  const slides = [
    {
      image: data.image,
      label: data.overline ?? "Meeting",
      text: paragraphs[0] ?? data.title,
    },
    {
      image: data.image,
      label: "Becoming",
      text: paragraphs[1] ?? paragraphs[0] ?? "",
    },
    {
      image: data.image,
      label: "Beginning",
      text: paragraphs[2] ?? paragraphs[paragraphs.length - 1] ?? "",
    },
  ].filter((slide) => slide.text);

  return (
    <SceneFrame id={id} backgroundImage={data.image} overlay="heavy">
      <div className="vc-stage w-full max-w-none px-0 sm:px-0 lg:px-0">
        <div className="mb-10 px-5 text-center sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vc-eyebrow mb-4"
            style={{ color: accent }}
          >
            {data.overline ?? "Scene 02"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vc-title"
          >
            {data.title}
          </motion.h2>
          <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/40">
            Swipe the reel →
          </p>
        </div>

        <StoryReel className="px-5 sm:px-8">
          {slides.map((slide, index) => (
            <motion.div
              key={`${slide.label}-${index}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <StoryReelSlide image={slide.image}>
                <p
                  className="mb-3 text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: accent }}
                >
                  {slide.label}
                </p>
                <p
                  className="text-lg leading-snug text-white sm:text-xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {slide.text}
                </p>
              </StoryReelSlide>
            </motion.div>
          ))}
        </StoryReel>
      </div>
    </SceneFrame>
  );
};

export default OurStory;
