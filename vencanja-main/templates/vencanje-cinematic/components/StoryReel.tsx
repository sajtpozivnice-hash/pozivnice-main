"use client";

import { FC, ReactNode } from "react";

type StoryReelProps = {
  children: ReactNode;
  className?: string;
};

/** Horizontal cinematic reel — mobile-first snap scroll */
export const StoryReel: FC<StoryReelProps> = ({ children, className = "" }) => {
  return <div className={`vc-reel ${className}`}>{children}</div>;
};

type StoryReelSlideProps = {
  image?: string;
  children: ReactNode;
  className?: string;
};

export const StoryReelSlide: FC<StoryReelSlideProps> = ({
  image,
  children,
  className = "",
}) => {
  const src = image?.trim() ? image.trim() : "";

  return (
    <article className={`vc-reel-card aspect-[3/4] ${className}`}>
      {src ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="vc-scene-fallback absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">{children}</div>
    </article>
  );
};
