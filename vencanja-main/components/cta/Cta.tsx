"use client";

import { useRouter } from "next/navigation";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import styles from "./Cta.module.css";

const Cta = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pozivnice");
  };
  return (
    <Section>
      <Heading className={styles.headingContainer}>
        Brzo i lako kreirajte personalizovanu pozivnicu
      </Heading>
      <Button variant="primary" icon={AnimatedArrowRight} onClick={handleClick}>
        Kreirajte svoju pozivnicu
      </Button>
    </Section>
  );
};

export default Cta;
