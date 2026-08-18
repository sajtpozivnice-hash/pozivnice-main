"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import Media from "../components/Media";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Dense three column mosaic; every third tile spans two rows to break the grid rhythm. */
const spanClass = (index: number) => {
  if (index % 5 === 0) return "vd-mosaic__tile--tall";
  if (index % 5 === 3) return "vd-mosaic__tile--wide";
  return "";
};

const OurGallery: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const images = (data.images ?? []).filter((image) => image.url?.trim());

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="mb-9 text-center">
          <p className="vd-eyebrow">Galerija</p>
          <h2 className="vd-title mt-3">{data.title}</h2>
          {data.description ? (
            <p className="vd-body mx-auto mt-4 max-w-xl">{data.description}</p>
          ) : null}
        </div>

        {images.length === 0 ? (
          <p className="vd-body text-center">Galerija stiže uskoro.</p>
        ) : (
          <div className="vd-mosaic">
            {images.map((image, index) => (
              <motion.div
                key={`${image.url}-${index}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`vd-mosaic__tile ${spanClass(index)}`}
              >
                <Media src={image.url} alt={`Galerija ${index + 1}`} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurGallery;
