"use client";

import "../index.css";

type FixedBackdropProps = {
  src?: string;
};

/**
 * Fallback visual layer when TemplateRenderer page background is unavailable.
 * Uses inline styles so it still works if CSS import is delayed.
 */
export const FixedBackdrop = ({ src }: FixedBackdropProps) => {
  const imageSrc = src?.trim() ? src.trim() : "";

  if (!imageSrc) return null;

  // Page background is primarily applied in TemplateRenderer from hero config.
  // Keep a lightweight sticky layer as reinforcement inside scroll containers
  // where background-attachment:fixed is unreliable.
  return (
    <div
      aria-hidden="true"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
        marginBottom: "-100vh",
      }}
    >
      <img
        src={imageSrc}
        alt=""
        referrerPolicy="no-referrer"
        fetchPriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,6,5,0.4) 0%, rgba(8,6,5,0.35) 45%, rgba(8,6,5,0.6) 100%)",
        }}
      />
    </div>
  );
};
