"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";
import { SageMedia } from "../components/Media";

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
      <div className="vs-container grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <p className="vs-eyebrow mb-6" style={{ color: accent }}>
            {data.subtitle ?? "Galerija gostiju"}
          </p>
          <h2 className="vs-display" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="vs-body mt-5 max-w-md text-vs-muted">
              {data.description}
            </p>
          ) : null}

          <div className="mt-10 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte fotografiju"}
              stackClassName="flex w-full flex-col gap-4"
              inputClassName="vs-input bg-transparent"
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-vs-ink/25 px-8 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-vs-ink transition hover:border-vs-ink hover:bg-vs-ink hover:text-vs-linen sm:w-auto"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="lg:col-span-5"
        >
          <SageMedia
            src={data.imageUrl}
            alt={data.title ?? "Fotografije gostiju"}
            className="aspect-[4/5] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
