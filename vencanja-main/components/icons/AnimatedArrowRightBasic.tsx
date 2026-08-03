"use client";
import { AnimatedIconProps } from "@/types/general";
import { motion } from "framer-motion";

const AnimatedArrowRightBasic: React.FC<AnimatedIconProps> = ({
  size = 24,
  strokeWidth = 2,
  duration = 1,
  color = "white",
  delay = 0.2,
}) => {
  return (
    <>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-right-icon lucide-arrow-right"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d="M5 12h14"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
        <motion.path
          d="m12 5 7 7-7 7"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration, ease: "easeInOut", delay }}
        />
      </motion.svg>
    </>
  );
};
export default AnimatedArrowRightBasic;
