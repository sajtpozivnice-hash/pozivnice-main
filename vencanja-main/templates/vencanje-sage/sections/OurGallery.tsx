"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SageMedia } from "../components/Media";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Cycled ratios create the asymmetric, masonry-like rhythm */
const RATIOS = [
  "aspect-[3/4]",
  "aspect-[1/1]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[1/1]",
];

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";
  const images = data.images ?? [];

  return (
    <section id={id} className="vs-section bg-vs-oat">
      <div className="vs-container">
        <div className="mb-14 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-eyebrow mb-6"
            style={{ color: accent }}
          >
            Galerija
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="vs-body mt-5 text-vs-muted">{data.description}</p>
          ) : null}
        </div>

        <div className="columns-2 gap-3 sm:gap-5 lg:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.07, duration: 0.6 }}
              className="mb-3 break-inside-avoid sm:mb-5 lg:mb-6"
            >
              <SageMedia
                src={image.url}
                alt={`${data.title} ${index + 1}`}
                className={`w-full ${RATIOS[index % RATIOS.length]}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
