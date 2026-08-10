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
  const images = data.images || [];

  return (
    <section id={id} className="b18-section">
      <div className="b18-shell">
        <div className="mb-12 max-w-2xl">
          <p className="b18-eyebrow mb-4">Galerija</p>
          <h2 className="b18-heading">{data.title}</h2>
          {data.description ? (
            <p className="mt-4 text-white/55">{data.description}</p>
          ) : null}
        </div>

        <div className="b18-masonry">
          {images.map((image, index) => (
            <motion.figure
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(index * 0.04, 0.3) }}
              className="b18-masonry-item group relative"
            >
              <img
                src={image.url}
                alt=""
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-60" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
