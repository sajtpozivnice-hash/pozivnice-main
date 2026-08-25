"use client";

import { FC } from "react";

type MediaProps = {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  caption?: string;
};

/** Editorial image plate — restrained contrast, stone fallback */
export const Media: FC<MediaProps> = ({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  caption,
}) => {
  const imageSrc = src?.trim() ?? "";

  return (
    <figure className="w-full">
      <div className={`va-media ${className}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={alt}
            className={imgClassName}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={`va-fallback h-full w-full ${imgClassName}`} />
        )}
      </div>
      {caption ? (
        <figcaption className="va-caption mt-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
};
