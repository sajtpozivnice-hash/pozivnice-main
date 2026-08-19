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
    <section id={id} className="kcart-section">
      <div className="kcart-shell max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcart-panel p-6 sm:p-8"
        >
          <p className="kcart-eyebrow mb-4 w-fit">
            {data.subtitle ?? "Gosti"}
          </p>
          <h2 className="kcart-heading text-3xl sm:text-4xl">{data.title}</h2>
          {data.description ? (
            <p className="kcart-body mt-4">{data.description}</p>
          ) : null}
          <div className="mt-8">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              stackClassName="flex w-full flex-col gap-4"
              buttonClassName="kcart-btn w-full"
              inputClassName="kcart-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
