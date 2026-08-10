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

const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="ed-section overflow-hidden">
      <div className="ed-shell relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ed-upload"
        >
          <p className="ed-label mb-3">{data.subtitle}</p>
          <h2 className="ed-display text-4xl sm:text-5xl">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-[var(--ed-muted)]">
              {data.description}
            </p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji kadar"}
              buttonClassName="ed-btn cursor-pointer"
              inputClassName="ed-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
