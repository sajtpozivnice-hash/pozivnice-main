"use client";

import { motion } from "framer-motion";

interface HeroBadgeProps {
  text: string;
}

import styles from "./HeroBadge.module.css";
import { FC } from "react";
const HeroBadge: FC<HeroBadgeProps> = ({ text }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={styles.text}>{text}</h3>
    </motion.div>
  );
};

export default HeroBadge;
