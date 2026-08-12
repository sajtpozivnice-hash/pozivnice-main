"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera, Heart, Sparkles } from "lucide-react";
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
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="ks-section bg-ks-ivory">
      <div className="ks-wash top-6 left-1/2 h-72 w-72 -translate-x-1/2 bg-ks-champagne-soft/25" />

      <div className="ks-container-narrow">
        <div className="mb-10 text-center">
          <p className="ks-script mb-2">{data.subtitle}</p>
          <h2 className="ks-heading text-3xl sm:text-4xl" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="ks-subheading mx-auto max-w-xl">{data.description}</p>
          ) : null}
        </div>

        {/* Overlapping scattered prints behind a soft centered upload card */}
        <div className="ks-print-stage">
          <div className="ks-print ks-print--left">
            <Heart className="h-6 w-6" />
          </div>
          <div className="ks-print ks-print--right">
            <Sparkles className="h-6 w-6" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ks-card ks-print-center px-6 py-10 text-center sm:px-10"
          >
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ks-champagne-soft/30 text-ks-champagne">
              <Camera className="h-5 w-5" />
            </div>
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              buttonStyle={{ background: "var(--color-ks-champagne)", color: "#fff" }}
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center rounded-full px-8 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
              inputClassName="w-full rounded-full border border-ks-champagne/25 bg-white px-4 py-3 text-sm outline-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
