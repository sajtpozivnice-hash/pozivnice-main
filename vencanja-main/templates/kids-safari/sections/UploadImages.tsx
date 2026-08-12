"use client";

import { FC } from "react";
import { Camera, MapPin } from "lucide-react";
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
  const accent = theme.colors?.base?.primary?.value ?? "#C1801F";

  return (
    <section id={id} className="ksaf-section">
      <div className="ksaf-shell max-w-3xl">
        {/* Field-journal spread — a bound column of numbered specimen stubs beside one big mounted photo */}
        <div className="ksaf-journal-spread">
          <div className="ksaf-journal-stubs">
            <div className="ksaf-journal-stub">
              <span className="ksaf-journal-stub-num">01</span>
              <span className="ksaf-journal-stub-photo">
                <MapPin className="h-4 w-4" style={{ color: accent }} />
              </span>
            </div>
            <div className="ksaf-journal-stub">
              <span className="ksaf-journal-stub-num">02</span>
              <span className="ksaf-journal-stub-photo">
                <MapPin className="h-4 w-4" style={{ color: accent }} />
              </span>
            </div>
            <div className="ksaf-journal-stub">
              <span className="ksaf-journal-stub-num">03</span>
              <span className="ksaf-journal-stub-photo">
                <MapPin className="h-4 w-4" style={{ color: accent }} />
              </span>
            </div>
          </div>

          <div className="ksaf-journal-specimen">
            <span className="ksaf-journal-specimen-label">Fotografija dana</span>
            <span className="ksaf-journal-specimen-photo">
              {data.imageUrl ? (
                <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
              ) : (
                <Camera className="h-8 w-8" style={{ color: accent }} />
              )}
            </span>
          </div>
        </div>

        <div className="ksaf-card-strong mt-8 p-6 text-center sm:p-10">
          <p className="ksaf-eyebrow mb-4 justify-center">{data.subtitle || name}</p>

          {data.title ? (
            <h2 className="ksaf-heading text-3xl sm:text-5xl">{data.title}</h2>
          ) : null}

          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-black/55 sm:text-base">
              {data.description}
            </p>
          ) : null}

          <div className="mx-auto mt-8 max-w-sm">
            <GuestPhotoUploadControl
              buttonText={data.buttonText || "Dodaj fotografije"}
              buttonClassName="ksaf-btn w-full sm:w-auto"
              inputClassName="ksaf-input text-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadImages;
