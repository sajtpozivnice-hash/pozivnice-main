"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";
import { TerraMedia } from "../components/Media";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C45C26";
  const ink = theme.colors?.base?.secondary?.value ?? "#3D3429";

  return (
    <section id={id} className="vt-section bg-vt-cream">
      <div className="vt-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1 lg:col-span-5"
        >
          <TerraMedia
            src={data.imageUrl}
            alt={data.title ?? "Fotografije gostiju"}
            className="vt-arch aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2 lg:col-span-7"
        >
          <p className="vt-eyebrow mb-6" style={{ color: accent }}>
            {data.subtitle ?? "Galerija gostiju"}
          </p>
          <h2 className="vt-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vt-body mt-5 max-w-md text-vt-muted">
              {data.description}
            </p>
          ) : null}

          <div className="mt-10 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full flex-col gap-4"
              inputClassName="vt-input"
              buttonClassName="vt-btn w-full sm:w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
