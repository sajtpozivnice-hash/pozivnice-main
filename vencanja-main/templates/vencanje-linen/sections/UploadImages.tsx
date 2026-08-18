"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";
import { LinenMedia } from "../components/Media";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C4A574";
  const ink = theme.colors?.base?.secondary?.value ?? "#2A2420";

  return (
    <section id={id} className="vl-section bg-vl-paper">
      <div className="vl-container max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <p className="vl-eyebrow mb-5" style={{ color: accent }}>
            {data.subtitle ?? "Galerija gostiju"}
          </p>
          <h2 className="vl-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vl-body mt-5 text-vl-muted">{data.description}</p>
          ) : null}

          <div className="mx-auto mt-10 max-w-xs">
            <LinenMedia
              src={data.imageUrl}
              alt={data.title ?? "Fotografije gostiju"}
              className="aspect-[4/3] w-full"
            />
          </div>

          <div className="mx-auto mt-10 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full flex-col gap-4"
              inputClassName="vl-input text-center"
              buttonClassName="vl-btn w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
