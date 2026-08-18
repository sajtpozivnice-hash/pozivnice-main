"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurStorySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import Media from "../components/Media";

type Props = {
  section: OurStorySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const PLATE_CLASSES = [
  "vd-collage__plate--back",
  "vd-collage__plate--mid",
  "vd-collage__plate--front",
] as const;

/** Stacked photo collage: three overlapping plates on the left, story column on the right. */
const OurStory: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const extraImages = (data.cards ?? [])
    .map((card) => card.image?.trim())
    .filter((image): image is string => Boolean(image));
  const plates = [data.image, ...extraImages]
    .filter((image): image is string => Boolean(image?.trim()))
    .slice(0, 3);

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="vd-story">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="vd-collage"
          >
            <span className="vd-collage__stamp">01</span>
            {plates.map((image, index) => (
              <Media
                key={`${image}-${index}`}
                src={image}
                className={`vd-collage__plate ${PLATE_CLASSES[index]}`}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            {data.overline ? <p className="vd-eyebrow">{data.overline}</p> : null}
            <h2 className="vd-title mt-3">{data.title}</h2>
            {data.subtitle ? (
              <p className="vd-eyebrow vd-eyebrow--muted mt-4">
                {data.subtitle}
              </p>
            ) : null}
            <div className="vd-rule my-7" />
            {data.text ? (
              <p className="vd-body vd-story__text">{data.text}</p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
