"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";
import { Media } from "../components/Media";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;
  const hasImage = Boolean(data.imageUrl?.trim());

  return (
    <section id={id} className="vn-section">
      <div className="vn-shell max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="vn-eyebrow">{data.subtitle ?? "Galerija gostiju"}</p>
          <h2 className="vn-display mt-4">{data.title}</h2>
          {data.description ? (
            <p className="vn-body mx-auto mt-5 max-w-md">{data.description}</p>
          ) : null}

          {hasImage ? (
            <div className="mx-auto mt-10 max-w-xs">
              <Media
                src={data.imageUrl}
                alt={data.title ?? "Fotografije gostiju"}
                className="aspect-[4/3] w-full"
              />
            </div>
          ) : null}

          <div className="mt-12 border-t border-[var(--color-vn-line)] pt-10 text-left">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full flex-col gap-5"
              buttonClassName="vn-btn w-full"
              inputClassName="vn-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
