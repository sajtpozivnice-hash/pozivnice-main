"use client";

import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import FeaturedBox from "./FeaturedBox";
import styles from "./FeaturedInvites.module.css";
import { motion, Variants } from "framer-motion";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Link from "next/link";
import { getFeaturedCatalogTemplates } from "@/templates/catalog";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const FeaturedInvites = () => {
  const featured = getFeaturedCatalogTemplates(4);

  return (
    <Section>
      <div>
        <div className={styles.titleContainer}>
          <Heading className={styles.heading}>Istaknute pozivnice</Heading>
          <Paragraph variant="subtitle">
            Otvorite primer i proverite šta možete da promenite pre nego što nas
            kontaktirate.
          </Paragraph>
        </div>

        <motion.div
          className={styles.boxContainer}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featured.map((data, index) => (
            <motion.div key={data.id} variants={itemVariants}>
              <FeaturedBox {...data} index={index} />
            </motion.div>
          ))}
        </motion.div>
        <div className={styles.buttonContainer}>
          <Link href="/pozivnice">
            <Button icon={AnimatedArrowRight}>Pogledaj sve pozivnice</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default FeaturedInvites;
