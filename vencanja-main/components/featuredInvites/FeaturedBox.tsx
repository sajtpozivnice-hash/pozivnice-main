"use client";

import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import ProjectBadge from "../ProjectBadge";
import styles from "./FeaturedBox.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Heading from "../shared/typography/Heading";
import { FC } from "react";
import { FeaturedProjectsCard, Tag } from "@/types/general";
import Paragraph from "../shared/typography/Paragraph";

const MotionLink = motion.create(Link);

const FeaturedBox: FC<FeaturedProjectsCard> = ({
  id,
  title,
  description,
  tag,
  imageLink,
  projectLink,
}) => {
  const buttonVarint = () => {
    if (tag === Tag.WEDDING) {
      return "primary";
    } else if (tag === Tag.BIRTHDAY) {
      return "secondary";
    } else {
      return "secondary";
    }
  };

  return (
    <motion.div className={styles.container} id={id.toString()}>
      <motion.div
        className={styles.background}
        style={{ backgroundImage: `url(${imageLink})` }}
      />
      <motion.div className={styles.overlay} />

      <motion.div className={styles.content}>
        <ProjectBadge tag={tag} />
        <Heading className={styles.header}>{title}</Heading>
        <Paragraph variant="subtitle" center={false}>
          {description}
        </Paragraph>
        <MotionLink href={projectLink} passHref className={styles.link}>
          <Button
            icon={AnimatedArrowRight}
            variant={buttonVarint()}
            className={styles.button}
            maxWidth={300}
          >
            Pogledaj
          </Button>
        </MotionLink>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedBox;
