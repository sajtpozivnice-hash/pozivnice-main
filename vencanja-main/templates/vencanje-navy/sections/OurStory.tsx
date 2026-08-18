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
  const chapters = (data.text ?? "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const blocks =
    chapters.length > 0
      ? chapters
      : ["Naša priča počinje ovde — tiho, i sa zahvalnošću."];

  return (
    <section id={id} className="relative w-full">
      <div className="vn-section pb-10 text-center sm:pb-14">
        <p className="vn-eyebrow">{data.overline ?? "Poglavlja"}</p>
        <h2 className="vn-display mt-4">{data.title}</h2>
        {data.subtitle ? (
          <p className="vn-body mx-auto mt-5 max-w-md">{data.subtitle}</p>
        ) : null}
      </div>

      {blocks.map((chapter, index) => (
        <div key={`chapter-${index}`}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75 }}
            className="vn-chapter-text"
          >
            <div className="vn-shell max-w-2xl">
              <p className="vn-caption">
                Poglavlje {String(index + 1).padStart(2, "0")}
              </p>
              <p className="vn-display-sm mt-6">{chapter}</p>
            </div>
          </motion.div>

          {data.image && (index < blocks.length - 1 || blocks.length === 1) ? (
            <div className="vn-chapter-photo">
              <Media
                src={data.image}
                alt=""
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
};

export default OurStory;
