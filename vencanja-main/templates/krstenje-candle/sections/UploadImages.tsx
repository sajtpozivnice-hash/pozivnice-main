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
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value;

  return (
    <section id={id} className="kd-section">
      <div className="kd-glow top-0 left-1/2 h-72 w-72 -translate-x-1/2" />

      <div className="kd-container-narrow text-center">
        <p className="kd-eyebrow mb-3">{data.subtitle}</p>
        <h2 className="kd-heading text-3xl sm:text-4xl">{data.title}</h2>
        {data.description ? (
          <p className="kd-subheading mx-auto max-w-xl">{data.description}</p>
        ) : null}

        {/* Single lit focal frame with dim thumbnails gathered around it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="kd-focal-stage"
        >
          <div className="kd-focal-frame">
            {data.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.imageUrl} alt={data.title || ""} />
            ) : (
              <Camera className="h-8 w-8" style={{ color: accent }} />
            )}
          </div>
          <div className="kd-focal-thumbs">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index} className="kd-focal-thumb" />
            ))}
          </div>
        </motion.div>

        <div className="mx-auto mt-8 max-w-sm">
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Dodaj fotografije"}
            buttonStyle={{
              background: accent,
              color: "var(--color-kd-ivory, #17120d)",
            }}
            buttonClassName="inline-flex w-full cursor-pointer items-center justify-center rounded-full px-8 py-3 text-sm font-medium transition hover:opacity-90 sm:w-auto"
            inputClassName="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
