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

/** Split layout: copy anchored left, upload action in its own card right, not a centered stack. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="b18c-band">
      <div className="b18c-shell b18c-split">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="b18c-split__copy"
        >
          <p className="b18c-kicker mb-3">{data.subtitle}</p>
          <h2 className="b18c-display text-3xl sm:text-4xl">{data.title}</h2>
          {data.description ? (
            <p className="mt-4 max-w-md text-[var(--coast-muted)]">
              {data.description}
            </p>
          ) : null}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="b18c-split__action"
        >
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Pošalji fotografiju"}
            buttonClassName="b18c-btn cursor-pointer w-full"
            inputClassName="b18c-input"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
