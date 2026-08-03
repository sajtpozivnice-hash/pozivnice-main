"use client";
import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";
import React from "react";

const AnimatedQuestion: React.FC<AnimatedIconProps> = ({
  size = 24,
  strokeWidth = 2,
  duration = 1,
  color = "#333",
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
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
      <motion.path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
      <motion.path
        d="M12 17h.01"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
    </motion.svg>
  );
};

export default AnimatedQuestion;
