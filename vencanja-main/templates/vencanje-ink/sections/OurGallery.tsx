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

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";
  const images = data.images ?? [];

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">Galerija</p>
          <p className="vi-caption">Prevucite u stranu</p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <h2 className="vi-display lg:col-span-6">{data.title}</h2>
          <div className="lg:col-span-6 lg:text-right">
            <div className="vi-accent lg:ml-auto" style={{ background: accent }} />
            <p className="vi-body mt-5">{data.description}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="vi-strip mt-12"
        >
          {images.map((image, index) => (
            <div key={`${image.url}-${index}`} className="vi-strip-item">
              <Media src={image.url} alt="" className="vi-plate-square" />
            </div>
          ))}
        </motion.div>

        <div className="vi-rule mt-4" />
        <p className="vi-caption mt-3">
          {String(images.length).padStart(2, "0")} kadrova
        </p>
      </div>
    </section>
  );
};

export default OurGallery;
