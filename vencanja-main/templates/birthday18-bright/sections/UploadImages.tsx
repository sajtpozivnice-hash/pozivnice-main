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

/** Sticky bottom bar CTA: intro copy up top, upload action pinned in a floating bar, not a centered panel. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18b-section overflow-hidden">
      <div className="b18b-shell relative z-10 max-w-3xl text-center">
        <p className="b18b-eyebrow mb-3">{data.subtitle}</p>
        <h2 className="b18b-heading text-4xl sm:text-5xl">{data.title}</h2>
        {data.description ? (
          <p className="mx-auto mt-4 max-w-xl text-[var(--b18b-muted)]">
            {data.description}
          </p>
        ) : null}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="b18b-shell relative z-10 mt-10 max-w-3xl"
      >
        <div className="b18b-sticky-bar">
          <span className="b18b-sticky-bar__text">
            Podeli trenutak sa proslave
          </span>
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Pošalji fotografiju"}
            buttonClassName="b18b-btn cursor-pointer shrink-0"
            inputClassName="b18b-input"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default UploadImages;
