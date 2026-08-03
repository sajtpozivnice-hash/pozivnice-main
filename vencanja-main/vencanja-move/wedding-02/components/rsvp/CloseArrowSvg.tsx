"use client";

import { FC } from "react";

interface CloseArrowSvgProps {
  color: string;
  width: number;
  height: number;
}

const CloseArrowSvg: FC<CloseArrowSvgProps> = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer", position: "absolute", right: 20, top: 20 }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
};

export default CloseArrowSvg;
