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
    <section id={id} className="va-section">
      <div className="va-shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {hasImage ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <Media
              src={data.imageUrl}
              alt={data.title ?? "Fotografije gostiju"}
              className="aspect-[4/3] w-full"
            />
          </motion.div>
        ) : null}

        <div className={hasImage ? "lg:col-span-7" : "lg:col-span-8"}>
          <p className="va-eyebrow">{data.subtitle ?? "Gosti"}</p>
          <h2 className="va-display mt-4 max-w-md">{data.title}</h2>
          {data.description ? (
            <p className="va-body mt-4 max-w-md text-va-muted">
              {data.description}
            </p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="mt-8 max-w-sm"
          >
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              stackClassName="flex w-full flex-col gap-4"
              buttonClassName="va-btn-ghost w-full"
              inputClassName="va-input"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
