"use client";

import { useRouter } from "next/navigation";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import AnimatedMail from "../icons/AnimatedMail";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import styles from "./Cta.module.css";

type CtaProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const Cta = ({
  title = "Spremni za svoju pozivnicu?",
  description = "Pregledajte primere ili nam opišite šta želite. Javite se preko kontakta — zajedno dogovorimo izradu.",
  primaryLabel = "Pogledaj primere",
  primaryHref = "/pozivnice",
  secondaryLabel = "Kontaktirajte nas",
  secondaryHref = "/kontakt",
}: CtaProps) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.inner}>
          <Heading className={styles.heading}>{title}</Heading>
          <Paragraph variant="subtitle" className={styles.description}>
            {description}
          </Paragraph>
          <div className={styles.actions}>
            <Button
              variant="primary"
              icon={AnimatedArrowRight}
              onClick={() => router.push(primaryHref)}
            >
              {primaryLabel}
            </Button>
            <Button
              variant="secondary"
              icon={AnimatedMail}
              onClick={() => router.push(secondaryHref)}
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Cta;
