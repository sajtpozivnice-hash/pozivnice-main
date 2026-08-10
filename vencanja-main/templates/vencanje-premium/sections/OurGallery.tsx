"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";
  const images = data.images ?? [];

  return (
    <section id={id} className="vp-section bg-vp-paper">
      <div className="vp-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-eyebrow mb-4"
            style={{ color: accent }}
          >
            Galerija
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vp-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="vp-body mt-4 text-vp-muted">{data.description}</p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="border border-dashed border-vp-line px-6 py-16 text-center text-sm text-vp-muted">
            Galerija uskoro.
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((image, index) => {
              const tall = index % 3 === 1;
              return (
                <motion.div
                  key={`${image.url}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="mb-4 break-inside-avoid"
                >
                  <PremiumMedia
                    src={image.url}
                    alt={`Galerija ${index + 1}`}
                    className={`w-full ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurGallery;
