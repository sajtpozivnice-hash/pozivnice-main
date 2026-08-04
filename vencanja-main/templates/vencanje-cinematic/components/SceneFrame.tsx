"use client";

import { ReactNode } from "react";

type SceneFrameProps = {
  id: string;
  backgroundImage?: string;
  children: ReactNode;
  overlay?: "default" | "heavy";
  className?: string;
  parallax?: boolean;
};

export const SceneFrame = ({
  id,
  backgroundImage,
  children,
  overlay = "default",
  className = "",
  parallax = false,
}: SceneFrameProps) => {
  const src = backgroundImage?.trim() ? backgroundImage.trim() : "";

  return (
    <section id={id} className={`vc-scene ${className}`}>
      {src ? (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`vc-scene-media ${parallax ? "scale-110 will-change-transform" : ""}`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="vc-scene-fallback" aria-hidden="true" />
      )}
      <div className={overlay === "heavy" ? "vc-overlay-heavy" : "vc-overlay"} />
      {children}
    </section>
  );
};
