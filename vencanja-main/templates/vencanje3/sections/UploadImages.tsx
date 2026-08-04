"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="v3-section bg-white">
      <div className="v3-container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v3-card px-6 py-12 text-center sm:px-10 sm:py-16"
        >
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: `${accent}22`, color: accent }}
          >
            <Camera className="h-6 w-6" />
          </div>
          <p className="v3-eyebrow mb-3">{data.subtitle}</p>
          <h2 className="v3-heading text-3xl sm:text-4xl" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="v3-subheading mx-auto max-w-xl">{data.description}</p>
          ) : null}
          <button
            type="button"
            className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: ink }}
          >
            Dodaj fotografije
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
