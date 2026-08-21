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

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#111111";

  return (
    <section id={id} className="vi-section">
      <div className="vi-shell">
        <div className="vi-rule-ink" />
        <div className="flex flex-wrap items-baseline justify-between gap-3 py-4">
          <p className="vi-eyebrow">{data.subtitle ?? "Galerija gostiju"}</p>
          <p className="vi-caption">No. 03</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85 }}
          className="mt-10 max-w-xl"
        >
          <h2 className="vi-display max-w-lg">{data.title}</h2>
          <div className="vi-accent mt-8" style={{ background: accent }} />
          {data.description ? (
            <p className="vi-body mt-6 max-w-md">{data.description}</p>
          ) : null}

          <div className="mt-10 border-t border-vi-line pt-8">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full max-w-sm flex-col gap-5"
              buttonClassName="vi-btn w-full"
              inputClassName="vi-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
