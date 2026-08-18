"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { LinenMedia } from "../components/Media";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";
  const images = (data.images ?? []).slice(0, 6);

  const rows: (typeof images)[] = [];
  for (let i = 0; i < images.length; i += 2) {
    rows.push(images.slice(i, i + 2));
  }

  return (
    <section id={id} className="vl-section vl-linen-ground">
      <div className="vl-container-wide">
        <div className="mb-12 text-center">
          <p className="vl-eyebrow mb-4" style={{ color: accent }}>
            Galerija
          </p>
          <h2 className="vl-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vl-body mt-4 text-vl-muted">{data.description}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {rows.slice(0, 3).map((row, rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: rowIndex * 0.08 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {row.map((image, colIndex) => (
                <LinenMedia
                  key={`${image.url}-${colIndex}`}
                  src={image.url}
                  alt={data.title ?? "Galerija"}
                  className="vl-gallery-plate"
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurGallery;
