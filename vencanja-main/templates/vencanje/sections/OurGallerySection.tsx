"use client";

import { ThemeConfig } from "@/types/config";
import { OurGallerySection } from "@/types/sections";
import { motion } from "framer-motion";

type Props = {
  section: OurGallerySection;
  theme: ThemeConfig;
};

const OurGallery: React.FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const { colors } = theme;
  const images = data.images ?? [];

  return (
    <section id={id} className="section-padding bg-wedding-cream">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 font-display text-4xl md:text-5xl"
            style={{ color: colors?.base?.secondary?.value }}
          >
            {data.title}
          </motion.h2>
          {data.description ? (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-display text-base opacity-60 sm:text-lg"
              style={{ color: colors?.base?.primary?.value }}
            >
              {data.description}
            </motion.p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-wedding-gold/30 bg-white/50 px-6 py-14 text-center text-sm opacity-60 sm:py-16">
            Galerija će biti dostupna uskoro.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {images.map((image, index) => (
              <motion.div
                key={`${image.url}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="img-1-1 rounded-2xl shadow-lg"
              >
                <img
                  src={image.url}
                  alt={`Galerija ${index + 1}`}
                  className="transition duration-700 hover:scale-[1.03]"
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
