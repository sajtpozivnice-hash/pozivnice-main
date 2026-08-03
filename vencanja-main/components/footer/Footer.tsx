"use client";

import Section from "../layout/Section";
import Heading, { HeadingVariant } from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.container}>
          <div className={styles.item}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerMainTitle}
            >
              Pozivnice
            </Heading>
            <Paragraph center={false} color="var(--color-primary)">
              Od venčanja do rođendana, pravimo unikatne pozivnice za svaki
              važan događaj
            </Paragraph>
          </div>
          <div className={styles.item} style={{ color: "var(--color-accent)" }}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Linkovi
            </Heading>
          </div>
          <div className={styles.item} style={{ color: "var(--color-accent)" }}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Kontaktirajte Nas
            </Heading>
          </div>
          <div className={styles.item} style={{ color: "var(--color-accent)" }}>
            <Heading
              variant={HeadingVariant.H2}
              className={styles.footerSecondaryTitle}
            >
              Pratite Nas
            </Heading>
          </div>
        </div>
      </Section>
      <div className={`${styles.footerBottom} text-center`}>
        <p className={styles.description}>
          © 2026 Celebrations Event Planning. Sva prava zadržana.
        </p>
      </div>
    </div>
  );
};

export default Footer;
