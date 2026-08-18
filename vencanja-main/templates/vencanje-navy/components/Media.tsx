"use client";

import { FC } from "react";

type MediaProps = {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

/** Config-driven image with navy fallback — never hardcodes URLs */
export const Media: FC<MediaProps> = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
}) => {
  const imageSrc = src?.trim() ?? "";

  return (
    <div className={`vn-media ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={imgClassName}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <div className={`vn-fallback h-full min-h-48 w-full ${imgClassName}`} />
      )}
    </div>
  );
};

export default Media;
