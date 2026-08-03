"use client";
import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";
import React from "react";

const AnimatedLetter: React.FC<AnimatedIconProps> = ({
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
      className="lucide lucide-mail-icon lucide-mail"
    >
      <motion.path
        d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
      <motion.rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
    </motion.svg>
  );
};

export default AnimatedLetter;
