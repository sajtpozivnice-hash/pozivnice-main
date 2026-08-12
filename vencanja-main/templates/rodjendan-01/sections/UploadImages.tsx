"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#FF5C8A";
  const secondary = theme.colors?.base?.secondary?.value ?? "#3D8BFF";

  return (
    <section id={id} className="bday-section">
      <div className="bday-shell max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bday-card-strong bday-album"
        >
          <div
            className="bday-album-cover"
            style={{
              background: data.imageUrl
                ? undefined
                : `linear-gradient(135deg, ${accent}, ${secondary})`,
            }}
          >
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : null}
            <span className="bday-album-corner bday-album-corner--tl" />
            <span className="bday-album-corner bday-album-corner--tr" />
            <span className="bday-album-corner bday-album-corner--bl" />
            <span className="bday-album-corner bday-album-corner--br" />
            <div className="bday-album-icon">
              <Camera className="h-6 w-6" />
            </div>
          </div>

          <div className="bday-album-body">
            <p className="bday-eyebrow mb-5 w-fit">{data.subtitle || name}</p>

            {data.title ? (
              <h2 className="bday-heading text-3xl sm:text-4xl">{data.title}</h2>
            ) : null}

            {data.description ? (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55 sm:text-base">
                {data.description}
              </p>
            ) : null}

            <div className="mt-8">
              <GuestPhotoUploadControl
                buttonText={data.buttonText || "Dodaj fotografije"}
                buttonClassName="bday-btn w-full sm:w-auto"
                inputClassName="bday-input text-left"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
