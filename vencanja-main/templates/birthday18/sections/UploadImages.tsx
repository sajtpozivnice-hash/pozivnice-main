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
    <section id={id} className="b18-section overflow-hidden">
      {data.imageUrl ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <img
            src={data.imageUrl}
            alt=""
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#050506]/90" />
        </div>
      ) : null}

      <div className="b18-shell relative z-10 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18-panel px-6 py-12 sm:px-10"
        >
          <p className="b18-eyebrow mb-4">{data.subtitle}</p>
          <h2 className="b18-heading text-4xl sm:text-5xl">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              {data.description}
            </p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              buttonClassName="b18-btn cursor-pointer"
              inputClassName="b18-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
