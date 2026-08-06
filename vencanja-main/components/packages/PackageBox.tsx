"use client";

import { motion } from "framer-motion";
import styles from "./PackageBox.module.css";
import { FC } from "react";
import { Check } from "lucide-react";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import { PackageBoxProps } from "@/types/general";
import Link from "next/link";

const PackageBox: FC<PackageBoxProps> = (data) => {
  const { title, price, description, list, link, index = 0 } = data;

  return (
    <motion.article
      className={styles.container}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.08, 0.24),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price}</p>
      </div>

      <Heading variant={HeadingVariant.H3} className={styles.description}>
        {description}
      </Heading>

      <ul className={styles.features}>
        {list.map((item) => (
          <li className={styles.listedItem} key={item}>
            <Check color="var(--color-accent)" size={18} aria-hidden />
            <p className={styles.featureText}>{item}</p>
          </li>
        ))}
      </ul>

      <div className={styles.cta}>
        <Button
          variant="primary"
          icon={AnimatedArrowRight}
          iconSize={28}
          buttonDelay={0}
          buttonDuration={0.5}
        >
          <Link href={link}>Pogledaj primere</Link>
        </Button>
      </div>
    </motion.article>
  );
};

export default PackageBox;
