"use client";

import { ReactNode } from "react";

type SceneShellProps = {
  id: string;
  backgroundImage?: string;
  children: ReactNode;
  overlay?: "default" | "soft" | "dark";
  align?: "center" | "start" | "end";
  className?: string;
};

const overlayClass = {
  default: "v4-overlay",
  soft: "v4-overlay-soft",
  dark: "absolute inset-0 bg-black/65",
} as const;

const alignClass = {
  center: "items-center",
  start: "items-start",
  end: "items-end",
} as const;

export const SceneShell = ({
  id,
  backgroundImage,
  children,
  overlay = "default",
  align = "center",
  className = "",
}: SceneShellProps) => {
  const imageSrc = backgroundImage?.trim() ? backgroundImage.trim() : "";

  return (
    <section id={id} className={`v4-scene ${alignClass[align]} ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="v4-scene-bg"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="v4-scene-bg v4-scene-fallback" aria-hidden="true" />
      )}
      <div className={overlayClass[overlay]} />
      {children}
    </section>
  );
};
