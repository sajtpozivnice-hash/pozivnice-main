"use client";

import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";
import React from "react";

const AnimatedMail: React.FC<AnimatedIconProps> = ({
  size = 24,
  strokeWidth = 2,
  duration = 1,
  color = "white",
  delay = 0.2,
}) => {
  return (
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.path
        d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
      <motion.path
        d="m21.854 2.147-10.94 10.939"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
    </motion.svg>
  );
};

export default AnimatedMail;
