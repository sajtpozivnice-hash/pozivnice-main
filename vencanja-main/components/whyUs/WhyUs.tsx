"use client";

import { whyUsCardsData } from "@/data/data";
import Section from "../layout/Section";
import WhyUsCard from "./WhyUsCard";
import styles from "./WhyUs.module.css";
import { motion, Variants } from "framer-motion";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";

const cardsContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const WhyUs = () => {
  return (
    <Section>
      <div className={styles.titleContainer}>
        <Heading className={styles.heading}>Zašto izabrati nas?</Heading>
        <Paragraph variant="subtitle">
          U svaki događaj unosimo energiju, kreativnost i preciznu organizaciju.
        </Paragraph>
      </div>
      <motion.div
        className={styles.cardsWrapper}
        variants={cardsContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {whyUsCardsData.map((card) => (
          <WhyUsCard key={card.title} {...card} />
        ))}
      </motion.div>
    </Section>
  );
};

export default WhyUs;
