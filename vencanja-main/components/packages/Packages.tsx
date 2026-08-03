"use client";

import Section from "../layout/Section";
import styles from "./Packages.module.css";
import Heading from "../shared/typography/Heading";
import ListedPackages from "./WeddingPackages";
import Paragraph from "../shared/typography/Paragraph";

const Packages = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.titleContainer}>
          <Heading className={styles.sectionTitle}>Cenovnik</Heading>
          <Paragraph variant="subtitle">
            Kompletno iskustvo – prilagodite, delite i pratite sve online
          </Paragraph>
        </div>
        <div>
          <ListedPackages />
        </div>
      </Section>
    </div>
  );
};
export default Packages;
