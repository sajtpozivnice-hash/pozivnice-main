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
  const accent = theme.colors?.base?.primary?.value ?? "#6b7f6a";
  const ink = theme.colors?.base?.secondary?.value ?? "#2c2a26";

  return (
    <section id={id} className="vs-section bg-vs-sage-tint">
      <div className="vs-container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="vs-eyebrow mb-6" style={{ color: accent }}>
            {data.subtitle ?? "Galerija gostiju"}
          </p>
          <h2 className="vs-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vs-body mx-auto mt-5 max-w-md text-vs-muted">
              {data.description}
            </p>
          ) : null}

          <div className="mx-auto mt-10 max-w-sm text-left">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full flex-col gap-4"
              inputClassName="vs-input bg-transparent"
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-vs-ink/25 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.28em] text-vs-ink transition hover:border-vs-ink hover:bg-vs-ink hover:text-vs-linen sm:text-[13px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
