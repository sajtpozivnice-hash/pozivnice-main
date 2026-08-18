"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { TerraMedia } from "../components/Media";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";
  const images = data.images ?? [];

  return (
    <section id={id} className="vt-section bg-vt-sand">
      <div className="vt-container">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-eyebrow mb-6"
            style={{ color: accent }}
          >
            Galerija
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vt-display"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="vt-body mx-auto mt-5 max-w-md text-vt-muted">
              {data.description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {images.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.06, duration: 0.55 }}
              className={index % 5 === 0 ? "row-span-1 lg:row-span-1" : ""}
            >
              <TerraMedia
                src={image.url}
                alt={`${data.title} ${index + 1}`}
                className={`vt-soft w-full ${
                  index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
