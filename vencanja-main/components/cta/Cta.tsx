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
  meta?: string;
};

const Cta = ({
  title = "Vaš dan počinje jednom pozivnicom.",
  description = "Kreirate mesto gde vaši gosti mogu da saznaju sve važne informacije, potvrde dolazak i podele uspomene — dok vi imate sve što vam treba za organizaciju na jednom mestu.",
  primaryLabel = "Kreiraj svoju pozivnicu",
  primaryHref = "/pozivnice",
  meta = "Bez mesečne pretplate • 3.999 RSD • Neograničeno trajanje",
}: CtaProps) => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Završni korak</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Button icon={AnimatedArrowRight}>
              <Link href={primaryHref} className="white-color">
                {primaryLabel}
              </Link>
            </Button>
          </div>

          {meta ? <p className={styles.meta}>{meta}</p> : null}
        </div>
      </Section>
    </div>
  );
};

export default Cta;
