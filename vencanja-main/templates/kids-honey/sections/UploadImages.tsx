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
    <section id={id} className="khny-section">
      <div className="khny-shell max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="khny-jar relative px-6 py-8 text-center sm:px-8 sm:py-10"
        >
          <span className="khny-jar-lid" aria-hidden />
          <p className="khny-lid mx-auto mb-4 w-fit">
            {data.subtitle ?? "Gosti"}
          </p>
          <h2 className="khny-heading">{data.title}</h2>
          {data.description ? (
            <p className="khny-body mx-auto mt-4 max-w-sm">{data.description}</p>
          ) : null}
          <div className="mt-8">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              stackClassName="flex w-full flex-col gap-4"
              buttonClassName="khny-btn w-full"
              inputClassName="khny-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
