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

const CONTROL_POINTS = [
  "Prikazujete ili sakrivate delove pozivnice",
  "Menjate redosled sadržaja kako vama odgovara",
  "Ažurirate tekstove, slike, boje i fontove kad god poželite",
  "Vidite ko je potvrdio dolazak",
  "Pravite raspored sedenja i spremate ga za štampu",
  "Pratite budžet, uplate i listu obaveza",
  "Primáte privatne fotografije koje gosti pošalju",
  "Delite pozivnicu linkom sa gostima",
];

const Controls = () => {
  const router = useRouter();

  return (
    <Section fullWidth>
      <div className={styles.wrapper}>
        <div className={styles.headingContainer}>
          <Heading className={styles.heading}>
            Šta možete sami da promenite
          </Heading>
          <Paragraph variant="subtitle">
            Pozivnica nije gotov fajl koji više ne dirate. Dobijate prostor u
            kojem sve uređujete sami — jednostavno, u nekoliko klikova.
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
            <ul className={styles.list}>
              {CONTROL_POINTS.map((point) => (
                <li key={point} className={styles.liElement}>
                  <Check color="var(--color-accent)" size={22} />
                  <Paragraph center={false}>{point}</Paragraph>
                </li>
              ))}
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
              alt="Primer kako izgleda uređivanje pozivnice"
              className={styles.previewImage}
            />
          </motion.div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => router.push("/pozivnice")}
          icon={AnimatedArrowRight}
        >
          Pogledaj kako izgleda
        </Button>
      </div>
    </Section>
  );
};

export default Controls;
