"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Camera, Leaf } from "lucide-react";
import { UploadImagesSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const UploadImages: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kg-section bg-white">
      <div className="kg-container-narrow">
        <div className="mb-10 text-center">
          <div className="kg-eyebrow justify-center">
            <Leaf className="h-3.5 w-3.5" />
            {data.subtitle}
          </div>
          <h2 className="kg-heading mt-4 text-3xl sm:text-4xl">{data.title}</h2>
          {data.description ? (
            <p className="kg-subheading mx-auto max-w-xl">{data.description}</p>
          ) : null}
        </div>

        {/* Trellis gallery — photo slots clipped to a vine lattice, upload control hangs below */}
        <div className="kg-trellis">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="kg-trellis-slot">
              <Camera className="h-4 w-4" />
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kg-trellis-post mx-auto mt-2 max-w-sm text-center"
        >
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Dodaj fotografije"}
            buttonStyle={{ background: "var(--color-kg-champagne)", color: "#fff" }}
            buttonClassName="inline-flex w-full cursor-pointer items-center justify-center rounded-tl-xl rounded-br-xl px-8 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
            inputClassName="w-full rounded-tl-xl rounded-br-xl border border-kg-champagne/20 bg-white px-4 py-3 text-sm outline-none"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
