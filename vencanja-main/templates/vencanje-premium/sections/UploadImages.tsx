"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";

  return (
    <section id={id} className="vp-section bg-vp-ivory">
      <div className="vp-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <PremiumMedia
            src={data.imageUrl}
            alt={data.title || "Upload"}
            className="aspect-[5/4] w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <p className="vp-eyebrow mb-4" style={{ color: accent }}>
            {data.subtitle ?? "Guest gallery"}
          </p>
          <h2 className="vp-display mb-5" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vp-body mb-8 text-vp-muted">{data.description}</p>
          ) : null}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-3 border border-vp-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.28em] text-vp-ink transition hover:bg-vp-ink hover:text-white"
          >
            <Camera className="h-4 w-4" />
            Add photographs
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
