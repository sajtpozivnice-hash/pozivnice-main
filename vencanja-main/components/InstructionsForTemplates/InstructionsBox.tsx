"use client";

import { FC } from "react";
import styles from "./InstructionsBox.module.css";
import { motion } from "framer-motion";
import AnimatedArrowRightBasic from "../icons/AnimatedArrowRightBasic";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import { InstructionsCardProps } from "@/types/general";

const InstructionsBox: FC<InstructionsCardProps> = (props) => {
  const { title, description, icon: Icon, iconColor, isLast, index } = props;

  const iconDuration = index * 0.3;

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.iconContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <Icon size={36} color={iconColor} duration={iconDuration} />
      </motion.div>
      <div className={styles.titleContainer}>
        <Heading variant={HeadingVariant.H3} className={styles.title}>
          {title}
        </Heading>
        {!isLast && (
          <div className={styles.arrowContainer}>
            <AnimatedArrowRightBasic color="var(--color-hot)" />
          </div>
        )}
      </div>
      <Paragraph variant="body">{description}</Paragraph>
    </div>
  );
};

export default InstructionsBox;
