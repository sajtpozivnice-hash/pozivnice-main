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
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="kc-section bg-kc-sand">
      <div className="kc-container-narrow">
        {/* Framed album — ornate corner-marked frame, like an embossed album cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kc-album-frame px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          <span className="kc-corner top-4 left-4 border-t border-l sm:top-6 sm:left-6" />
          <span className="kc-corner top-4 right-4 border-t border-r sm:top-6 sm:right-6" />
          <span className="kc-corner bottom-4 left-4 border-b border-l sm:bottom-6 sm:left-6" />
          <span className="kc-corner bottom-4 right-4 border-b border-r sm:bottom-6 sm:right-6" />

          <p className="kc-eyebrow mb-3">{data.subtitle}</p>

          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <Camera className="h-6 w-6" />
          </div>

          <h2 className="kc-heading text-3xl sm:text-4xl" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="kc-subheading mx-auto max-w-xl">{data.description}</p>
          ) : null}

          <div className="kc-album-plate mx-auto mt-9 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              buttonStyle={{ background: ink, color: "#fff" }}
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
              inputClassName="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm outline-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
