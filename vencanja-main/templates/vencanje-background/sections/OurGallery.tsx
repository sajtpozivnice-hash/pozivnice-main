"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { OurGallerySection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: OurGallerySection;
  event: EventConfig;
  theme: ThemeConfig;
};

const OurGallery: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";
  const images = data.images ?? [];

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap">
        <div className="mb-10 text-center">
          <GlassPanel className="inline-block px-8 py-6">
            <p className="vb-eyebrow mb-3" style={{ color: accent }}>
              Galerija
            </p>
            <h2 className="vb-title text-3xl sm:text-4xl">{data.title}</h2>
            {data.description ? (
              <p className="mt-2 text-sm text-white/55">{data.description}</p>
            ) : null}
          </GlassPanel>
        </div>

        {images.length === 0 ? (
          <GlassPanel className="px-6 py-14 text-center text-sm text-white/50">
            Galerija će biti dostupna uskoro.
          </GlassPanel>
        ) : (
          <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
            {images.map((image, index) => {
              const url = image.url?.trim() ? image.url.trim() : "";
              if (!url) return null;
              return (
                <motion.div
                  key={`${url}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="mb-3 break-inside-avoid sm:mb-4"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md">
                    <img
                      src={url}
                      alt={`Galerija ${index + 1}`}
                      className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurGallery;
