"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Neon strip: horizontal glow bar with copy and action side by side, not a centered boxed panel. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="bn-section overflow-hidden">
      <div className="bn-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-strip"
        >
          <div className="bn-strip__text">
            <p className="bn-label mb-2">{data.subtitle}</p>
            <h2 className="bn-display text-3xl sm:text-4xl">{data.title}</h2>
            {data.description ? (
              <p className="mt-3 max-w-md text-[color:var(--bn-muted)]">
                {data.description}
              </p>
            ) : null}
          </div>
          <div className="bn-strip__action">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              buttonClassName="bn-btn cursor-pointer"
              inputClassName="bn-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
