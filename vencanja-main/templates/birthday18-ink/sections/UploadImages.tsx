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

/** Broadsheet photo plate: dashed clip frame with a caption line, not a plain solid-border desk box. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18i-section">
      <div className="b18i-shell max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18i-plate"
        >
          <span className="b18i-plate__snip">
            <Camera className="h-3.5 w-3.5" />
            Foto prilog
          </span>
          <p className="b18i-eyebrow mb-3">{data.subtitle}</p>
          <h2 className="b18i-display text-3xl sm:text-4xl">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-[var(--ink-muted)]">
              {data.description}
            </p>
          ) : null}
          <div className="mt-7 flex justify-center">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              buttonClassName="b18i-btn cursor-pointer"
              inputClassName="b18i-input"
            />
          </div>
          <p className="b18i-plate__caption">Fig. 1 — Gost na proslavi</p>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
