"use client";

import { ThemeConfig } from "@/types/config";
import { UploadImagesSection } from "@/types/sections";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import GuestPhotoUploadControl from "@/components/shared/GuestPhotoUploadControl";

type Props = {
  section: UploadImagesSection;
  theme: ThemeConfig;
};

const UploadImages: React.FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const { colors } = theme;

  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden bg-wedding-cream"
    >
      {data.imageUrl ? (
        <div className="section-bg opacity-[0.1]">
          <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-3xl space-y-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/5 text-black/20">
              <ImageIcon size={32} strokeWidth={1} />
            </div>
          </div>
          <div className="space-y-3">
            {data.subtitle ? (
              <span
                style={{ color: colors?.base?.primary?.value }}
                className="text-xs font-bold tracking-[0.4em] uppercase"
              >
                {data.subtitle}
              </span>
            ) : null}
            <h3
              style={{ color: colors?.base?.secondary?.value }}
              className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl"
            >
              {data.title}
            </h3>
            {data.description ? (
              <p
                style={{ color: colors?.base?.secondary?.value }}
                className="mx-auto max-w-md text-base opacity-80 sm:text-lg"
              >
                {data.description}
              </p>
            ) : null}
          </div>

          <div className="pt-4">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodajte Slike i Video zapise"}
              buttonStyle={{
                background: colors?.base?.secondary?.value,
                color: "#fff",
              }}
              buttonClassName="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase shadow-2xl shadow-black/20 transition-all hover:scale-[1.03] active:scale-[0.97] sm:w-auto sm:gap-4 sm:px-10 sm:py-5"
              inputClassName="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm outline-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadImages;
