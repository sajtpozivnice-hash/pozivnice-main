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
      <div className="bday-shell max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bday-card-strong relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-16"
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1]"
              referrerPolicy="no-referrer"
            />
          ) : null}

          <div
            className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full opacity-30 blur-2xl"
            style={{ background: accent }}
          />
          <div
            className="pointer-events-none absolute -right-8 bottom-0 h-44 w-44 rounded-full opacity-25 blur-2xl"
            style={{ background: secondary }}
          />

          <div className="relative z-10">
            <p className="bday-eyebrow mb-5">{data.subtitle || name}</p>

            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${secondary})`,
              }}
            >
              <Camera className="h-7 w-7" />
            </div>

            {data.title ? (
              <h2 className="bday-heading text-3xl sm:text-5xl">{data.title}</h2>
            ) : null}

            {data.description ? (
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-black/55 sm:text-base">
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
