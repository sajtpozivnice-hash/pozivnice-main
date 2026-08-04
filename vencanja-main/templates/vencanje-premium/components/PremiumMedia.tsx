"use client";

import { FC } from "react";

type MediaProps = {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

/** Config-driven image with elegant fallback — never hardcodes URLs */
export const PremiumMedia: FC<MediaProps> = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
}) => {
  const imageSrc = src?.trim() ? src.trim() : "";

  return (
    <div className={`vp-media ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={imgClassName}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className={`vp-fallback h-full min-h-[12rem] w-full ${imgClassName}`} />
      )}
    </div>
  );
};
