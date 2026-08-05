"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { SceneShell } from "../components/SceneShell";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#c9a86a";

  return (
    <SceneShell
      id={id}
      backgroundImage={data.imageUrl}
      overlay="default"
    >
      <div className="v4-content-narrow">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="v4-glass-strong px-6 py-14 text-center sm:px-10 sm:py-16"
        >
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/25"
            style={{ color: accent }}
          >
            <Camera className="h-6 w-6" />
          </div>
          {data.subtitle ? (
            <p className="v4-eyebrow mb-4" style={{ color: accent }}>
              {data.subtitle}
            </p>
          ) : null}
          <h2 className="v4-heading text-3xl sm:text-5xl">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/65 sm:text-base">
              {data.description}
            </p>
          ) : null}
          <div className="mt-8">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 sm:w-auto"
              inputClassName="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50"
            />
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
};

export default UploadImages;
