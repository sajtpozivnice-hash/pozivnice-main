"use client";

import { workflowSteps } from "@/data/data";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import { motion } from "framer-motion";
import styles from "./Workflow.module.css";

const Workflow = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.header}>
          <Heading className={styles.title}>Odaberite pozivnicu i podelite je za samo nekoliko koraka</Heading>
          <Paragraph variant="subtitle">
          Digitalna pozivnica je spremna za korišćenje odmah nakon evidentirane uplate. Dobijate svoj jedinstveni link koji možete podeliti sa porodicom i prijateljima putem Vibera, WhatsApp-a, Messengera, SMS-a, e-maila ili društvenih mreža.</Paragraph>
        </div>

        <div className={styles.steps}>
          {workflowSteps.map((item, index) => (
            <motion.div
              key={item.step}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
            >
              <span className={styles.stepNumber}>{item.step}</span>
              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepBody}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Workflow;
