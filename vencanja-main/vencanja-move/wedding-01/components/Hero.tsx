"use client";

import React, { FC, useRef, useState } from "react";
import Countdown from "./Countdown";
import styles from "../css/Components.module.css";
import { hsvaToHex } from "@uiw/react-color";
import { formatDate } from "@/helpers/formatDate";
import { useInviteConfig } from "../InviteConfigContext";
import Navigation from "./Navigation";
import { CldImage } from "next-cloudinary";
import { uploadImageToCloudinary } from "@/helpers/uploadImageToCloudinary";
import LoaderComponent from "@/app/components/shared/LoaderComponent/LoaderComponent";

interface HeroProps {
  children: React.ReactNode;
}

const Hero: FC<HeroProps> = ({ children }) => {
  const { config, setConfig } = useInviteConfig();

  const dateRef = useRef<HTMLInputElement>(null);
  const smallImageRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    dateRef.current?.showPicker?.();
    dateRef.current?.focus();
  };

  const handleSmallImageUpload = () => {
    smallImageRef.current?.click();
  };

  const handleSmallImageUploadResolver = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const url = await uploadImageToCloudinary(file);
      setConfig({
        ...config,
        hero: {
          ...config.hero,
          heroImage: url,
        },
      });
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={styles.heroContainer}
      style={{
        backgroundImage: `linear-gradient(${config.main.backgroundColor}, #8d14734d), url(${config.main.backgroundImage})`,
      }}
    >
      <Navigation />
      <LoaderComponent isOpen={isLoading} text="Zamena slike u toku..." />
      <div className={styles.heroInner}>
        <input
          ref={smallImageRef}
          type="file"
          accept="image/*"
          onChange={handleSmallImageUploadResolver}
          style={{ display: "none" }}
        />
        <h3
          style={{ color: hsvaToHex(config.main.primaryColor) }}
          className={`${styles.fontSizeH3} ${styles.heroTitle} ${styles.editable} ${styles.fontInviteClassic}`}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setConfig({
              ...config,
              hero: {
                ...config.hero,
                heroTitle: e.currentTarget.innerText,
              },
            })
          }
        >
          {config.hero.heroTitle}
        </h3>

        {config.hero.heroImage && (
          <CldImage
            src={config.hero.heroImage}
            width={160}
            height={160}
            crop="fit"
            alt="Hero"
            onClick={handleSmallImageUpload}
            style={{ cursor: "pointer", objectFit: "contain" }}
          />
        )}

        <div>
          <h1
            style={{ color: hsvaToHex(config.main.primaryColor) }}
            className={`${styles.fontSizeH1} ${styles.editable} ${styles.fontInviteClassic}`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setConfig({
                ...config,
                main: {
                  ...config.main,
                  header: e.currentTarget.innerText,
                },
              })
            }
          >
            {config.main.header}
          </h1>
          <h2
            onClick={handleClick}
            style={{ color: hsvaToHex(config.main.primaryColor) }}
            className={`${styles.fontSizeH2} ${styles.fontInviteClassic}`}
          >
            {formatDate(config.main.date, config.main.dateFormat)}
          </h2>
        </div>
        <Countdown />
      </div>

      {children}
    </div>
  );
};

export default Hero;
