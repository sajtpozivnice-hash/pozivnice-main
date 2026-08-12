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

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;
  const images = data.images ?? [];

  return (
    <section id={id} className="kc-section bg-kc-ivory">
      <div className="kc-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kc-eyebrow mb-4"
          >
            Galerija
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kc-heading"
            style={{ color: ink }}
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="kc-subheading">{data.description}</p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 bg-white/50 px-6 py-16 text-center text-sm text-kc-muted">
            Galerija će biti dostupna uskoro.
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <motion.div
                key={`${image.url}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
              >
                <img
                  src={image.url}
                  alt={`Galerija ${index + 1}`}
                  className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurGallery;
