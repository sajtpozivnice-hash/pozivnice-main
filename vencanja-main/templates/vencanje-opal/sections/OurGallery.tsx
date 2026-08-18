"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { OpalMedia } from "../components/Media";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";
  const images = data.images ?? [];

  return (
    <section id={id} className="vo-section bg-vo-pearl-deep">
      <div className="vo-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vo-eyebrow mb-4"
            style={{ color: accent }}
          >
            Galerija
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
          {data.description ? (
            <p className="vo-body mt-4 text-vo-muted">{data.description}</p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-vo-line px-6 py-16 text-center text-sm text-vo-muted">
            Galerija uskoro.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {images.map((image, index) => {
              const stagger = index % 2 === 1;
              return (
                <motion.div
                  key={`${image.url}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={stagger ? "sm:mt-10" : ""}
                >
                  <OpalMedia
                    src={image.url}
                    alt={`Galerija ${index + 1}`}
                    className={`w-full rounded-[2rem] ${
                      index % 3 === 1 ? "aspect-[4/5]" : "aspect-[5/4]"
                    }`}
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
