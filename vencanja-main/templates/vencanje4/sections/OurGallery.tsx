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
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";
  const images = data.images ?? [];

  return (
    <section
      id={id}
      className="relative w-full overflow-hidden bg-v4-night py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,106,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v4-eyebrow mb-5"
            style={{ color: accent }}
          >
            Galerija
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="v4-heading"
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <p className="mt-4 text-sm text-white/60 sm:text-base">
              {data.description}
            </p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/20 px-6 py-16 text-center text-sm text-white/50">
            Galerija će biti dostupna uskoro.
          </div>
        ) : (
          <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
            {images.map((image, index) => (
              <motion.div
                key={`${image.url}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 sm:mb-4"
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
