"use client";
import { Check } from "lucide-react";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import styles from "./Controls.module.css";
import Paragraph from "../shared/typography/Paragraph";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Controls = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pozivnice");
  };
  return (
    <Section fullWidth>
      <div className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <Heading className={styles.heading}>
            Potpuna kontrola nad vašim šablonom
          </Heading>
          <Paragraph variant="subtitle">
            Svi naši šabloni su <strong>modularni i editabilni</strong>. To
            znači da možete:
          </Paragraph>
        </div>
        <div className={styles.container}>
          <motion.div
            className={styles.contentContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <ul>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>
                  Kreirajte Vašu pozivnicu za par minuta
                </Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>
                  Birajte koje sekcije želite da prikažete
                </Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>
                  Uključujte ili isključujte sekcije po želji
                </Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />{" "}
                <Paragraph center={false}>
                  Menjajte redosled sekcija direktno na šablonu
                </Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>
                  Menjajte tekstove, slike, boje i fontove čak i nakon kupovine
                </Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>
                  Uvid u spisak potvrđenih dolazaka
                </Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>Napravite spisak sedenja</Paragraph>
              </li>
              <li className={styles.liElement}>
                <Check color="var(--color-accent)" size={24} />
                <Paragraph center={false}>
                  Preuzmite spisak sedenja - jednostavno i brzo
                </Paragraph>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <img
              src="/preview.jpg"
              alt="Demo editabilnog šablona"
              className={styles.previewImage}
            />
          </motion.div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleClick} icon={AnimatedArrowRight}>
          Pogledaj primere
        </Button>
      </div>
    </Section>
  );
};

export default Controls;
