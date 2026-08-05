"use client";

import { motion, Variants } from "framer-motion";
import styles from "./PackageBox.module.css";
import { FC } from "react";
import { Check } from "lucide-react";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import { PackageBoxProps } from "@/types/general";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const PackageBox: FC<PackageBoxProps> = (data) => {
  const { title, price, description, list, link } = data;

  return (
    <motion.div
      layout
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <Heading className={styles.title} motionVariants={itemVariants}>
          {title}
        </Heading>
        <Heading className={styles.price} motionVariants={itemVariants}>
          {price}
        </Heading>
      </div>
      <Heading
        variant={HeadingVariant.H3}
        className={styles.description}
        motionVariants={itemVariants}
      >
        {description}
      </Heading>
      {list.map((item, index) => (
        <div className={styles.listedItem} key={index}>
          <Check color="var(--color-accent)" />
          <Paragraph center={false}>{item}</Paragraph>
        </div>
      ))}
      <motion.div variants={itemVariants}>
        <Button
          variant="primary"
          icon={AnimatedArrowRight}
          iconSize={30}
          buttonDelay={0}
          buttonDuration={0.7}
        >
          <Link href={link}>Pogledaj primere</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PackageBox;
