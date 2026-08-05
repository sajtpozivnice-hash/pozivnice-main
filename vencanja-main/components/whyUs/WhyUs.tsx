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
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const WhyUs = () => {
  return (
    <Section>
      <div className={styles.titleContainer}>
        <Heading className={styles.heading}>Zašto eVenčanje</Heading>
        <Paragraph variant="subtitle">
          Jer uz pozivnicu dobijate prostor koji vam olakšava organizaciju do
          samog dana događaja.
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
