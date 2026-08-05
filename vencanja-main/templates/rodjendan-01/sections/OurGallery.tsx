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

const FRAME = ["#FF5C8A", "#3D8BFF", "#2EC4B6", "#FFB703", "#9B5DE5", "#FF8FAB"];

const OurGallery: FC<Props> = ({ section }) => {
  const { data, id, name } = section;
  const images = data.images ?? [];

  return (
    <section id={id} className="bday-section">
      <div className="bday-shell">
        <div className="mb-10 text-center">
          <p className="bday-eyebrow mb-4">{name}</p>
          <h2 className="bday-heading">{data.title}</h2>
          {data.description ? (
            <p className="mt-3 text-black/55">{data.description}</p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-black/15 px-6 py-16 text-center text-sm text-black/45">
            Galerija će biti dostupna uskoro.
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <motion.figure
                key={`${image.url}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] border-4 bg-white p-1.5 shadow-[0_18px_40px_-28px_rgba(31,36,48,0.5)]"
                style={{ borderColor: FRAME[index % FRAME.length] }}
              >
                <img
                  src={image.url}
                  alt={`Galerija ${index + 1}`}
                  className="w-full rounded-[1.1rem] object-cover transition duration-700 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurGallery;
