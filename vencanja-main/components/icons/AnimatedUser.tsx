"use client";
import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";
import React from "react";

const AnimatedUser: React.FC<AnimatedIconProps> = ({
  size = 24,
  strokeWidth = 2,
  duration = 1,
  color = "white",
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="lucide lucide-users-round-icon lucide-users-round"
      >
        <motion.path
          d="M18 21a8 8 0 0 0-16 0"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.circle
          cx="10"
          cy="8"
          r="5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.path
          d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
      </motion.svg>
    </>
  );
};

export default AnimatedUser;
