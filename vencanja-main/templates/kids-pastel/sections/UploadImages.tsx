"use client";

import { FC } from "react";
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
  const accent = theme.colors?.base?.primary?.value ?? "#8C6A9C";

  return (
    <section id={id} className="kpas-section">
      <div className="kpas-shell max-w-2xl text-center">
        <div className="kpas-polaroid-stack">
          <div className="kpas-polaroid kpas-polaroid--1">
            <span className="kpas-polaroid-photo">
              <Camera className="h-6 w-6" style={{ color: accent }} />
            </span>
          </div>
          <div className="kpas-polaroid kpas-polaroid--2">
            <span className="kpas-polaroid-photo">
              {data.imageUrl ? (
                <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
              ) : (
                <Camera className="h-6 w-6" style={{ color: accent }} />
              )}
            </span>
          </div>
          <div className="kpas-polaroid kpas-polaroid--3">
            <span className="kpas-polaroid-photo">
              <Camera className="h-6 w-6" style={{ color: accent }} />
            </span>
          </div>
        </div>

        <p className="kpas-eyebrow mb-4 justify-center">{data.subtitle || name}</p>

        {data.title ? (
          <h2 className="kpas-heading text-3xl sm:text-5xl">{data.title}</h2>
        ) : null}

        {data.description ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-black/55 sm:text-base">
            {data.description}
          </p>
        ) : null}

        <div className="kpas-divider" />

        <div className="mx-auto max-w-sm">
          <GuestPhotoUploadControl
            buttonText={data.buttonText || "Dodaj fotografije"}
            buttonClassName="kpas-btn w-full sm:w-auto"
            inputClassName="kpas-input text-left"
          />
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
