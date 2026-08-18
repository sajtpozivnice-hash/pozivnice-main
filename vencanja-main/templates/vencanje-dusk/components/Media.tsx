"use client";

import { CSSProperties, FC } from "react";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Adds the standard dusk gradient veil above the image. */
  veil?: boolean;
  loading?: "lazy" | "eager";
};

/** Dark-graded still. Falls back to an empty copper-tinted plate when no source is set. */
const Media: FC<Props> = ({
  src,
  alt = "",
  className,
  style,
  veil = false,
  loading = "lazy",
}) => {
  const url = src?.trim() ?? "";

  return (
    <div className={`vd-media ${className ?? ""}`} style={style}>
      {url ? (
        <img src={url} alt={alt} loading={loading} referrerPolicy="no-referrer" />
      ) : (
        <div className="h-full w-full" />
      )}
      {veil ? <div className="vd-media__veil" /> : null}
    </div>
  );
};

export default Media;
