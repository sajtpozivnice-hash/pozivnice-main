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
    <section id={id} className="vd-section bg-[var(--color-vd-ivory-deep)]">
      <div className="vd-shell-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <p className="vd-eyebrow">{data.subtitle ?? "Gosti"}</p>
          <h2 className="vd-display-sm mt-4">{data.title}</h2>
          <div className="vd-diamond mt-6" />
          {data.description ? (
            <p className="vd-body mx-auto mt-6 max-w-md">{data.description}</p>
          ) : null}

          <div className="mt-10 text-left">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              stackClassName="flex w-full flex-col gap-5"
              buttonClassName="vd-btn w-full"
              inputClassName="vd-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
