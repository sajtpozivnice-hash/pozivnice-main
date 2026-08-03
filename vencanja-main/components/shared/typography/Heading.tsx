"use client";

import React, { FC } from "react";
import styles from "./Heading.module.css";
import { motion, Variants } from "framer-motion";

export enum HeadingVariant {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

export type HeadingVariantType = HeadingVariant;

type HeadingProps = {
  variant?: HeadingVariantType;
  children: React.ReactNode;
  className?: string;
  motionVariants?: Variants;
  index?: number;
};

const motionHeading = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
};

const Heading: FC<HeadingProps> = ({
  variant = HeadingVariant.H1,
  children,
  className,
  motionVariants,
  index = 0,
}) => {
  const MotionTag = motionHeading[variant];

  const combinedClassName = `${styles.button} ${styles[`heading-${variant}`]} ${className ?? ""}`;

  const delay = index * 0.5;

  return (
    <MotionTag
      className={combinedClassName}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={
        motionVariants ?? {
          offscreen: { opacity: 0, y: 40 },
          onscreen: {
            opacity: 1,
            y: 0,
            transition: {
              delay,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        }
      }
    >
      {children}
    </MotionTag>
  );
};

export default Heading;
