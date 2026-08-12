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

const UploadImages: FC<Props> = ({ section, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#5EEAD4";

  return (
    <section id={id} className="kspc-section">
      <div className="kspc-shell max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kspc-hud"
        >
          <span className="kspc-hud-corner kspc-hud-corner--tl" />
          <span className="kspc-hud-corner kspc-hud-corner--tr" />
          <span className="kspc-hud-corner kspc-hud-corner--bl" />
          <span className="kspc-hud-corner kspc-hud-corner--br" />

          <div className="kspc-hud-strip">
            <span className="kspc-hud-frame">01</span>
            <span className="kspc-hud-frame kspc-hud-frame--active">
              {data.imageUrl ? (
                <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
              ) : (
                <Camera className="h-5 w-5" style={{ color: accent }} />
              )}
            </span>
            <span className="kspc-hud-frame">03</span>
          </div>

          <div className="relative z-10 text-center">
            <p className="kspc-eyebrow mx-auto mb-5 justify-center">
              {data.subtitle || name}
            </p>

            {data.title ? (
              <h2 className="kspc-heading text-3xl sm:text-5xl">{data.title}</h2>
            ) : null}

            {data.description ? (
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                {data.description}
              </p>
            ) : null}

            <div className="mx-auto mt-8 max-w-sm">
              <GuestPhotoUploadControl
                buttonText={data.buttonText || "Dodaj fotografije"}
                buttonClassName="kspc-btn w-full sm:w-auto"
                inputClassName="kspc-input text-left"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
