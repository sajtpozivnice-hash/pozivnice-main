"use client";

import { FC } from "react";

type MediaProps = {
  src?: string;
  alt?: string;
  /** Wrapper classes — pass an aspect-ratio helper such as vi-plate-portrait */
  className?: string;
  caption?: string;
};

/** Config-driven, grayscale-by-default image plate with a paper fallback */
export const Media: FC<MediaProps> = ({
  src,
  alt = "",
  className = "",
  caption,
}) => {
  const imageSrc = src?.trim() ?? "";

  return (
    <figure className="w-full">
      <div className={`vi-media ${className}`}>
        {imageSrc ? (
          <img src={imageSrc} alt={alt} referrerPolicy="no-referrer" />
        ) : (
          <div className="vi-fallback h-full w-full" />
        )}
      </div>
      {caption ? (
        <figcaption className="vi-caption mt-3 border-t border-vi-line pt-2">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};
