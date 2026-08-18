"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";
import Media from "../components/Media";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="vd-section">
      <div className="vd-shell">
        <div className="vd-split">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Media src={data.imageUrl} className="vd-split__still" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {data.subtitle ? <p className="vd-eyebrow">{data.subtitle}</p> : null}
            <h2 className="vd-title mt-3">{data.title}</h2>
            {data.description ? (
              <p className="vd-body mt-4">{data.description}</p>
            ) : null}
            <div className="vd-rule my-7" />
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografiju"}
              stackClassName="vd-upload-stack"
              inputClassName="vd-input"
              buttonClassName="vd-btn"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
