"use client";

import { backofficeFeatures } from "@/data/data";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./BackofficeShowcase.module.css";

const BackofficeShowcase = () => {
  return (
    <Section>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Vaš privatni nalog</p>
        <Heading className={styles.title}>
          Uz pozivnicu dobijate mesto gde sve uređujete sami
        </Heading>
        <Paragraph variant="subtitle">
          eVenčanje nije samo lep dizajn na internetu. Dobijate svoj prostor u
          kojem menjate pozivnicu, pratite goste i vodite organizaciju — bez
          znanja o pravljenju sajtova.
        </Paragraph>
      </div>

      <div className={styles.grid}>
        {backofficeFeatures.map((feature, index) => (
          <motion.article
            key={feature.title}
            className={styles.card}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: Math.min(index * 0.05, 0.35), duration: 0.45 }}
          >
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardBody}>{feature.description}</p>
          </motion.article>
        ))}
      </div>

      <div className={styles.cta}>
        <Button icon={AnimatedArrowRight}>
          <Link href="/pozivnice">Pogledaj primere</Link>
        </Button>
        <Button variant="secondary" icon={AnimatedArrowRight}>
          <Link href="/login">Prijavite se u nalog</Link>
        </Button>
      </div>
    </Section>
  );
};

export default BackofficeShowcase;
