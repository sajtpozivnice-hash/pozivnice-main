"use client";

import { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  strong?: boolean;
};

export const GlassPanel = ({
  children,
  className = "",
  strong = false,
}: GlassPanelProps) => {
  return (
    <div className={`${strong ? "vb-glass" : "vb-glass-soft"} ${className}`}>
      {children}
    </div>
  );
};
