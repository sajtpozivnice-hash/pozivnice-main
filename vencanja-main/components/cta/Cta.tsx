"use client";

import Link from "next/link";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
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
  title = "Spremni za pozivnicu i organizaciju?",
  description = "Izaberite dizajn, prilagodite ga i pošaljite porudžbinu. Dobijate digitalnu pozivnicu i privatni nalog — gosti, RSVP, stolovi, budžet i planer. Garancija povrata novca u roku od 7 dana.",
  primaryLabel = "Izaberi dizajn",
  primaryHref = "/pozivnice",
  secondaryLabel = "Pogledaj demo",
  secondaryHref = "/demo",
  meta = "3.999 RSD · sve uključeno · povrat novca u 7 dana",
}: CtaProps) => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Kako naručiti</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Button icon={AnimatedArrowRight}>
              <Link href={primaryHref} className="white-color">
                {primaryLabel}
              </Link>
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button variant="secondary" icon={AnimatedArrowRight}>
                <Link href={secondaryHref} className="white-color">
                  {secondaryLabel}
                </Link>
              </Button>
            ) : null}
          </div>

          {meta ? <p className={styles.meta}>{meta}</p> : null}
          <p className={styles.demoPrompt}>
            Niste sigurni?{" "}
            <Link href="/demo" className={styles.demoLink}>
              Isprobaj demo nalog
            </Link>
          </p>
        </div>
      </Section>
    </div>
  );
};

export default Cta;
