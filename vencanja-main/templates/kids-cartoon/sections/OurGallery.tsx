"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const images = data.images ?? [];

  return (
    <section id={id} className="kcart-section">
      <div className="kcart-shell">
        <div className="mb-10 text-center">
          <p className="kcart-eyebrow mb-4">Galerija</p>
          <h2 className="kcart-heading">{data.title}</h2>
          {data.description ? (
            <p className="kcart-body mx-auto mt-3 max-w-md">
              {data.description}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {images.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="kcart-panel overflow-hidden p-1.5"
              style={{
                transform: index % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)",
              }}
            >
              <img
                src={image.url}
                alt=""
                className="aspect-square w-full rounded-[1.25rem] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
