"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { GlassPanel } from "../components/GlassPanel";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#e2c4a0";

  return (
    <section id={id} className="vb-section">
      <div className="vb-wrap-narrow">
        <GlassPanel strong className="px-6 py-12 text-center sm:px-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/25"
              style={{ color: accent }}
            >
              <Camera className="h-5 w-5" />
            </div>
            {data.subtitle ? (
              <p className="vb-eyebrow mb-3" style={{ color: accent }}>
                {data.subtitle}
              </p>
            ) : null}
            <h2 className="vb-title mb-4">{data.title}</h2>
            {data.description ? (
              <p className="vb-body mb-8 text-white/60">{data.description}</p>
            ) : null}
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/30 px-8 py-3 text-xs uppercase tracking-[0.28em] text-white transition hover:bg-white/10"
            >
              Dodaj fotografije
            </button>
          </motion.div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default UploadImages;
