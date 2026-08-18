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
  const images = data.images ?? [];

  return (
    <section id={id} className="vn-section">
      <div className="vn-shell-wide">
        <div className="mb-12 text-center">
          <p className="vn-eyebrow">Galerija</p>
          <h2 className="vn-display mt-4">{data.title}</h2>
          {data.description ? (
            <p className="vn-body mx-auto mt-5 max-w-md">{data.description}</p>
          ) : null}
        </div>

        <div className="vn-gallery">
          {images.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
              className="vn-gallery-cell"
            >
              <Media
                src={image.url}
                alt=""
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
