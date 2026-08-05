"use client";

import Section from "../layout/Section";
import styles from "./Faq.module.css";
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
          <Heading className={styles.heading}>Česta pitanja</Heading>
          <Paragraph variant="subtitle">
            Jasni odgovori o tome šta dobijate, šta možete da menjate i kako
            funkcioniše vaš nalog.
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
