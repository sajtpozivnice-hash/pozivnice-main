"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#d4a574";

  return (
    <SceneFrame id={id} backgroundImage={data.imageUrl}>
      <div className="vc-stage-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="vc-eyebrow mb-5" style={{ color: accent }}>
            {data.subtitle ?? "Your perspective"}
          </p>
          <h2 className="vc-title mb-5">{data.title}</h2>
          {data.description ? (
            <p className="vc-body mb-10 text-white/55">{data.description}</p>
          ) : null}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-3 border border-white/30 px-8 py-3.5 text-[10px] uppercase tracking-[0.32em] text-white transition hover:bg-white/10"
          >
            <Camera className="h-4 w-4" />
            Add a frame
          </button>
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default UploadImages;
