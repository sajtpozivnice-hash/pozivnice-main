"use client";

import { FC } from "react";

type MediaProps = {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
};

/** Config-driven image with a soft sage fallback — never hardcodes URLs */
export const SageMedia: FC<MediaProps> = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
}) => {
  const imageSrc = src?.trim() ?? "";

  return (
    <div className={`vs-media ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={imgClassName}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      ) : (
        <div className={`vs-fallback h-full min-h-48 w-full ${imgClassName}`} />
      )}
    </div>
  );
};

export default SageMedia;
