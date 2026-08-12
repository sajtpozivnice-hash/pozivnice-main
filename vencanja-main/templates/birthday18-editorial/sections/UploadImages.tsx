"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Full-bleed dashed dropzone: edge-to-edge frame, not the boxed shadow-card panel. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="ed-section overflow-hidden">
      <div className="ed-shell relative z-10 mb-8 max-w-2xl">
        <p className="ed-label mb-3">{data.subtitle}</p>
        <h2 className="ed-display text-4xl sm:text-5xl">{data.title}</h2>
        {data.description ? (
          <p className="mt-4 max-w-xl text-[var(--ed-muted)]">
            {data.description}
          </p>
        ) : null}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="ed-dropzone"
      >
        <Camera className="ed-dropzone__icon" />
        <p className="ed-dropzone__hint">Prevuci ili klikni da pošalješ</p>
        <div className="mt-6 flex justify-center">
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Pošalji kadar"}
            buttonClassName="ed-btn cursor-pointer"
            inputClassName="ed-input"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default UploadImages;
