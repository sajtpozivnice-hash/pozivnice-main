"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { PremiumMedia } from "../components/PremiumMedia";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#9c7a45";
  const ink = theme.colors?.base?.secondary?.value ?? "#1c1917";

  return (
    <section id={id} className="vp-section bg-vp-ivory">
      <div className="vp-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <PremiumMedia
            src={data.imageUrl}
            alt={data.title || "Otpremanje"}
            className="aspect-[5/4] w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6"
        >
          <p className="vp-eyebrow mb-4" style={{ color: accent }}>
            {data.subtitle ?? "Galerija gostiju"}
          </p>
          <h2 className="vp-display mb-5" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vp-body mb-8 text-vp-muted">{data.description}</p>
          ) : null}
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Dodajte fotografije"}
            buttonClassName="inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-vp-ink px-8 py-3.5 text-xs font-medium uppercase tracking-[0.28em] text-vp-ink transition hover:bg-vp-ink hover:text-white sm:w-auto"
            inputClassName="w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
