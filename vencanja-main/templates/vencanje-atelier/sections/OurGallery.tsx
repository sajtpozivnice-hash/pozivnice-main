"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { Media } from "../components/Media";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const images = (data.images ?? []).slice(0, 6);

  return (
    <section id={id} className="va-section bg-va-paper">
      <div className="va-shell">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="va-eyebrow">Galerija</p>
            <h2 className="va-display mt-4">{data.title}</h2>
          </div>
          {data.description ? (
            <p className="va-caption">{data.description}</p>
          ) : null}
        </div>

        <div className="va-gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className={index === 0 ? "col-span-2 lg:col-span-2" : undefined}
            >
              <Media
                src={image.url}
                alt=""
                className={
                  index === 0
                    ? "aspect-[16/10] w-full"
                    : "aspect-square w-full"
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
