"use client";

import Section from "../layout/Section";
import styles from "./Packages.module.css";
import Heading from "../shared/typography/Heading";
import ListedPackages from "./WeddingPackages";
import Paragraph from "../shared/typography/Paragraph";

const Packages = () => {
  return (
    <div className={styles.wrapper} id="cenovnik">
      <Section>
        <div className={styles.titleContainer}>
          <Heading className={styles.sectionTitle}>Cenovnik</Heading>
          <Paragraph variant="subtitle">
            Cena paketa uključuje online pozivnicu i privatni nalog. Izradu
            dogovorimo kada nas kontaktirate.
          </Paragraph>
        </div>
        <ListedPackages />
      </Section>
    </div>
  );
};

export default Packages;
