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

/** Lookbook contact sheet: grid of frame placeholders beside the copy, not a centered upload panel. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18a-section">
      <div className="b18a-shell">
        <p className="b18a-label mb-3">{data.subtitle}</p>
        <h2 className="b18a-display mb-8 text-2xl sm:text-3xl">
          {data.title}
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18a-contact"
        >
          <div className="b18a-contact__sheet" aria-hidden>
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className="b18a-contact__frame" />
            ))}
          </div>
          <div className="b18a-contact__panel">
            {data.description ? (
              <p className="text-[var(--atelier-muted)]">
                {data.description}
              </p>
            ) : null}
            <div className="mt-6">
              <GuestPhotoUploadControl
                buttonText={data.buttonText || "Pošalji fotografiju"}
                buttonClassName="b18a-btn cursor-pointer"
                inputClassName="b18a-input"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
