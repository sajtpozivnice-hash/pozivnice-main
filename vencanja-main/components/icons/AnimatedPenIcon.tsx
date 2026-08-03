"use client";

import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";
import React from "react";

const AnimatedPenIcon: React.FC<AnimatedIconProps> = ({
  size = 24,
  strokeWidth = 2,
  color = "white",
  duration = 1,
  delay = 0.2,
}) => {
  return (
    <>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-pencil-line-icon lucide-pencil-line"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d="M13 21h8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.path
          d="m15 5 4 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.path
          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
      </motion.svg>
    </>
  );
};

export default AnimatedPenIcon;
