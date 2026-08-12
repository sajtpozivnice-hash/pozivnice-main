"use client";

import { CSSProperties, FC } from "react";
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
  const accent = theme.colors?.base?.primary?.value ?? "#FF3E7F";

  return (
    <section id={id} className="kcan-section">
      <div className="kcan-shell max-w-4xl">
        <div className="kcan-mast">
          <p className="kcan-mast-inner text-xs font-black uppercase tracking-[0.3em] text-white">
            {data.subtitle || name}
          </p>
        </div>

        <div className="kcan-scrap">
          <div
            className="kcan-scrap-card"
            style={{ "--tilt": "-4deg" } as CSSProperties}
          >
            <span
              className="kcan-tape"
              style={{ top: "-14px", left: "50%", transform: "translateX(-50%) rotate(-4deg)" }}
            />
            <span className="kcan-scrap-photo">
              <Camera className="h-6 w-6" style={{ color: accent }} />
            </span>
          </div>
          <div
            className="kcan-scrap-card kcan-scrap-card--lead"
            style={{ "--tilt": "2deg" } as CSSProperties}
          >
            <span
              className="kcan-tape"
              style={{ top: "-14px", left: "50%", transform: "translateX(-50%) rotate(2deg)" }}
            />
            <span className="kcan-scrap-photo">
              {data.imageUrl ? (
                <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
              ) : (
                <Camera className="h-7 w-7" style={{ color: accent }} />
              )}
            </span>
          </div>
          <div
            className="kcan-scrap-card"
            style={{ "--tilt": "5deg" } as CSSProperties}
          >
            <span
              className="kcan-tape"
              style={{ top: "-14px", left: "50%", transform: "translateX(-50%) rotate(5deg)" }}
            />
            <span className="kcan-scrap-photo">
              <Camera className="h-6 w-6" style={{ color: accent }} />
            </span>
          </div>
        </div>

        <div className="kcan-card-strong mt-8 p-6 text-center sm:p-9">
          {data.title ? (
            <h2 className="kcan-heading text-3xl sm:text-5xl">{data.title}</h2>
          ) : null}

          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-kcan-ink/60 sm:text-base">
              {data.description}
            </p>
          ) : null}

          <div className="mx-auto mt-8 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              buttonClassName="kcan-btn w-full sm:w-auto"
              inputClassName="kcan-input text-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
