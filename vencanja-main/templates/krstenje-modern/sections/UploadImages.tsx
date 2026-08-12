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
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="km-section bg-white">
      <div className="km-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="km-eyebrow mb-4">{data.subtitle}</p>
          <h2 className="km-heading" style={{ color: ink }}>
            {data.title}
          </h2>
          {data.description ? (
            <p className="km-subheading">{data.description}</p>
          ) : null}

          <div className="mt-8">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              buttonStyle={{ background: ink, color: "#fff" }}
              buttonClassName="inline-flex w-full cursor-pointer items-center justify-center px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition hover:opacity-85 sm:w-auto"
              inputClassName="w-full border-0 border-b border-km-ink/20 bg-transparent px-0 py-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* Strict grid contact sheet — flat numbered frames, no radius, no shadow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="km-contact-sheet"
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="km-contact-frame">
              <span className="km-contact-frame__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Camera className="h-4 w-4" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
