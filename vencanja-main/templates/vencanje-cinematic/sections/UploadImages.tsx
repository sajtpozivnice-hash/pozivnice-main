"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneFrame } from "../components/SceneFrame";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

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
            {data.subtitle ?? "Vaš ugao"}
          </p>
          <h2 className="vc-title mb-5">{data.title}</h2>
          {data.description ? (
            <p className="vc-body mb-10 text-white/55">{data.description}</p>
          ) : null}
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Dodajte kadar"}
            buttonClassName="inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-white/30 px-8 py-3.5 text-[10px] uppercase tracking-[0.32em] text-white transition hover:bg-white/10 sm:w-auto"
            inputClassName="w-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50"
          />
        </motion.div>
      </div>
    </SceneFrame>
  );
};

export default UploadImages;
