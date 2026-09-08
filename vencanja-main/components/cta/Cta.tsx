"use client";

import Link from "next/link";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import AnimatedMail from "../icons/AnimatedMail";
import Section from "../layout/Section";
import styles from "./Cta.module.css";

type CtaProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  meta?: string;
};

const Cta = ({
  title = "Spremni da naručite?",
  description = "Izaberite dizajn ili odmah pošaljite upit — javljamo se lično i dogovorimo izradu. Jednokratno 3.999 RSD, bez pretplate.",
  primaryLabel = "Pogledaj dizajne",
  primaryHref = "/pozivnice",
  secondaryLabel = "Pošalji upit",
  secondaryHref = "/kontakt",
  meta = "3.999 RSD · Bez mesečne pretplate · Neograničeno trajanje",
}: CtaProps) => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Sledeći korak</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Button icon={AnimatedArrowRight}>
              <Link href={primaryHref} className="white-color">
                {primaryLabel}
              </Link>
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button variant="secondary" icon={AnimatedMail}>
                <Link href={secondaryHref} className="white-color">
                  {secondaryLabel}
                </Link>
              </Button>
            ) : null}
          </div>

          {meta ? <p className={styles.meta}>{meta}</p> : null}
        </div>
      </Section>
    </div>
  );
};

export default Cta;
