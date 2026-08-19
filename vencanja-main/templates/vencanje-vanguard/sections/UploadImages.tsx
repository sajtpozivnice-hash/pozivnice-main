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
    <section id={id} className="vg-section">
      <div className="vg-shell-narrow">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
        >
          <p className="vg-kicker">{data.subtitle ?? "Gosti"}</p>
          <h2 className="vg-display-sm mt-4">{data.title}</h2>
          {data.description ? (
            <p className="vg-body mt-5 max-w-md">{data.description}</p>
          ) : null}

          <div className="mt-10 border-t border-[var(--color-vg-ink)] pt-8">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              stackClassName="flex w-full flex-col gap-5"
              buttonClassName="vg-btn w-full"
              inputClassName="vg-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
