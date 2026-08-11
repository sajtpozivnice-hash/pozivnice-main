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
    <section id={id} className="bn-section overflow-hidden">
      <div className="bn-shell relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bn-upload"
        >
          <p className="bn-label mb-3">{data.subtitle}</p>
          <h2 className="bn-display text-4xl sm:text-5xl">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-[color:var(--bn-muted)]">
              {data.description}
            </p>
          ) : null}
          <div className="mt-8 flex justify-center">
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
