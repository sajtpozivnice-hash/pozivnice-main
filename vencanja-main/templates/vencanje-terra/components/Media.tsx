"use client";

import { FC } from "react";

type MediaProps = {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

/** Config-driven image with a warm sand fallback — never hardcodes URLs */
export const TerraMedia: FC<MediaProps> = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
}) => {
  const imageSrc = src?.trim() ?? "";

  return (
    <div className={`vt-media ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={imgClassName}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <div className={`vt-fallback h-full min-h-48 w-full ${imgClassName}`} />
      )}
    </div>
  );
};

export default TerraMedia;
