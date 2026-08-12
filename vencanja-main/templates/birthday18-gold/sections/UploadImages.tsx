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

/** Gala guestbook plate: bracketed frame with a corner mark, not the bright centered upload panel. */
const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="gala-section overflow-hidden">
      <div className="gala-shell relative z-10 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gala-plate"
        >
          <span className="gala-plate__corner gala-plate__corner--tl" aria-hidden />
          <span className="gala-plate__corner gala-plate__corner--br" aria-hidden />
          <Camera
            className="mx-auto h-6 w-6"
            style={{ color: "var(--gala-gold)" }}
          />
          <p className="gala-kicker mt-4 mb-2">{data.subtitle}</p>
          <h2 className="gala-display text-3xl sm:text-4xl">{data.title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-md text-[var(--gala-muted)]">
              {data.description}
            </p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Pošalji fotografiju"}
              buttonClassName="gala-btn cursor-pointer"
              inputClassName="gala-input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
