"use client";

import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import ProjectBadge from "../ProjectBadge";
import styles from "./FeaturedBox.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Heading from "../shared/typography/Heading";
import { FC } from "react";
import { CatalogCard } from "@/types/catalog";
import { Tag } from "@/types/general";
import Paragraph from "../shared/typography/Paragraph";
import { TEMPLATE_STYLE_LABELS } from "@/types/catalog";

const MotionLink = motion.create(Link);

type FeaturedBoxProps = CatalogCard & {
  index?: number;
};

const FeaturedBox: FC<FeaturedBoxProps> = ({
  id,
  title,
  description,
  tag,
  style,
  price,
  imageLink,
  projectLink,
  index = 0,
}) => {
  const buttonVariant = tag === Tag.WEDDING ? "primary" : "secondary";

  return (
    <motion.article
      className={styles.container}
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: Math.min(index * 0.08, 0.4),
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6 }}
    >
      <motion.div
        className={styles.background}
        style={{ backgroundImage: `url(${imageLink})` }}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.meta}>
          <ProjectBadge tag={tag} />
          <span className={styles.chip}>{TEMPLATE_STYLE_LABELS[style]}</span>
          <span className={styles.chip}>
            {price.toLocaleString("sr-RS")} RSD
          </span>
        </div>
        <Heading className={styles.header}>{title}</Heading>
        <Paragraph variant="subtitle" center={false}>
          {description}
        </Paragraph>
        <MotionLink href={projectLink} className={styles.link}>
          <Button
            icon={AnimatedArrowRight}
            variant={buttonVariant}
            className={styles.button}
            maxWidth={300}
          >
            Pogledaj primer
          </Button>
        </MotionLink>
      </div>
    </motion.article>
  );
};

export default FeaturedBox;
