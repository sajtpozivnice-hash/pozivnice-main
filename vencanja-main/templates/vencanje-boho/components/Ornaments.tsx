"use client";

import { FC } from "react";

export const Wave: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className ?? "vb-wave"}
    viewBox="0 0 160 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M2 14c18-12 28-12 46 0s28 12 46 0 28-12 46 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
