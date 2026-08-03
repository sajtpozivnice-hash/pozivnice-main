"use client";

import { FC } from "react";
import { motion, Variants } from "framer-motion";
import styles from "./WhyUsCard.module.css";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import { WhyUsCardProps } from "@/types/general";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WhyUsCard: FC<WhyUsCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  index,
}) => {
  const duration = index * 0.5;
  return (
    <motion.div
      className={styles.container}
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <motion.div className={styles.iconWrapper} variants={contentVariants}>
        <Icon size={36} color={iconColor} duration={duration} />
      </motion.div>

      <Heading variant={HeadingVariant.H3} className={styles.title}>
        {title}
      </Heading>
      <Paragraph center={false}> {description}</Paragraph>
    </motion.div>
  );
};

export default WhyUsCard;
