"use client";

import Section from "../layout/Section";
import styles from "./Faq.module.css";
import { motion } from "framer-motion";
import Heading from "../shared/typography/Heading";
import { faqQuestions } from "@/data/data";
import FaqBox from "./FaqBox";
import { useState } from "react";
import Paragraph from "../shared/typography/Paragraph";

const Faq = () => {
  const [openedId, setOpenedId] = useState(0);
  return (
    <div className={styles.wrapper}>
      <Section>
        <div>
          <Heading className={styles.heading}>
            Često postavljana pitanja
          </Heading>
          <Paragraph variant="subtitle">
            Saznajte sve što vam treba da brzo i lako kreirate savršene
            digitalne pozivnice za svaki događaj.
          </Paragraph>

          <div className={styles.boxesWrapper}>
            {faqQuestions.map((faq) => (
              <FaqBox
                key={faq.id}
                {...faq}
                isOpen={faq.id === openedId}
                setIsOpen={() => setOpenedId(openedId === faq.id ? 0 : faq.id)}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Faq;
