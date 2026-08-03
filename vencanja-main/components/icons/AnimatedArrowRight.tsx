"use client";
import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";

const AnimatedArrowRight: React.FC<AnimatedIconProps> = ({
  size = 24,
  strokeWidth = 2,
  duration = 1,
  color = "white",
  delay = 0.2,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-arrow-right-icon lucide-circle-arrow-right"
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
        d="m12 16 4-4-4-4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
      <motion.path
        d="M8 12h8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, ease: "easeInOut", delay }}
      />
    </motion.svg>
  );
};
export default AnimatedArrowRight;
