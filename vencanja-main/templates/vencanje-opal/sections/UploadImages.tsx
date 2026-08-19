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
  const accent = theme.colors?.base?.primary?.value ?? "#C9A9A0";
  const ink = theme.colors?.base?.secondary?.value ?? "#3A3532";

  return (
    <section id={id} className="vo-section bg-vo-pearl">
      <div className="vo-container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="vo-vellum rounded-[1.75rem] p-8 sm:p-10"
        >
          <p className="vo-eyebrow mb-5" style={{ color: accent }}>
            {data.subtitle ?? "Galerija gostiju"}
          </p>
          <h2 className="vo-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vo-body mt-5 max-w-md">{data.description}</p>
          ) : null}

          <div className="mt-10 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full flex-col gap-4"
              inputClassName="vo-input bg-transparent"
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-vo-charcoal/20 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-vo-charcoal transition hover:border-vo-charcoal hover:bg-vo-charcoal hover:text-vo-pearl sm:w-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
