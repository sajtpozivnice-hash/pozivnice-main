"use client";

import { FC } from "react";
import styles from "./InstructionsBox.module.css";
import { motion } from "framer-motion";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import { InstructionsCardProps } from "@/types/general";

const InstructionsBox: FC<InstructionsCardProps> = (props) => {
  const { title, description, icon: Icon, iconColor, index } = props;
  const iconDuration = index * 0.25;

  return (
    <motion.article
      className={styles.container}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <div className={styles.iconContainer}>
        <Icon size={32} color={iconColor} duration={iconDuration} />
      </div>
      <Heading variant={HeadingVariant.H3} className={styles.title}>
        {title}
      </Heading>
      <Paragraph variant="body" center={false}>
        {description}
      </Paragraph>
    </motion.article>
  );
};

export default InstructionsBox;
