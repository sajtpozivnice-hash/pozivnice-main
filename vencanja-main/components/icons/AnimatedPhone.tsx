"use client";

import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";
import React from "react";

const AnimatedPhone: React.FC<AnimatedIconProps> = ({
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
        className="lucide lucide-phone-outgoing-icon lucide-phone-outgoing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d="m16 8 6-6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.path
          d="M22 8V2h-6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.path
          d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
      </motion.svg>
    </>
  );
};

export default AnimatedPhone;
