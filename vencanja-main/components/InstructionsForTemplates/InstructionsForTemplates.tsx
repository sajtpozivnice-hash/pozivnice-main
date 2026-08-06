"use client";

import { instructionsData } from "@/data/data";
import Section from "../layout/Section";
import InstructionsBox from "./InstructionsBox";
import styles from "./InstructionsForTemplates.module.css";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Link from "next/link";

const InstructionsForTemplates = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.titleContainer}>
          <Heading className={styles.heading}>Kako funkcioniše</Heading>
          <Paragraph variant="subtitle">
          Od izbora pozivnice do slanja gostima – ceo proces je jednostavan i traje svega nekoliko koraka.
          </Paragraph>
        </div>
        <div className={styles.cardsContainer}>
          {instructionsData.map((card) => (
            <InstructionsBox key={card.title} {...card} />
          ))}
        </div>
        <Button
          icon={AnimatedArrowRight}
          className={styles.buttonContainer}
          buttonDelay={0.5}
          buttonDuration={0.6}
        >
          <Link href="/pozivnice">Pogledaj primere</Link>
        </Button>
      </Section>
    </div>
  );
};

export default InstructionsForTemplates;
