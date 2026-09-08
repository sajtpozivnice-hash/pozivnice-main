"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./ClearPricing.module.css";

const INCLUDED = [
  "Digitalna pozivnica po vašem izboru",
  "Izmene tekstova i slika kad god želite",
  "Lični link za goste",
  "Potvrda dolaska (RSVP)",
  "Privatni nalog za organizaciju",
  "Bez mesečne pretplate",
];

const ClearPricing = () => {
  return (
    <div className={styles.wrapper} id="cenovnik">
      <Section>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className={styles.eyebrow}>Cena</p>
          <h2 className={styles.title}>Jedna cena. Sve uključeno.</h2>

          <div className={styles.priceBlock}>
            <p className={styles.price}>
              3.999 <span>RSD</span>
            </p>
            <p className={styles.billing}>
              Plaćate jednom. Pozivnica ostaje aktivna.
            </p>
          </div>

          <ul className={styles.features}>
            {INCLUDED.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: Math.min(index * 0.04, 0.35),
                  duration: 0.35,
                }}
              >
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <p className={styles.bonusNote}>
            Uz pozivnicu dobijate i nalog za goste, stolove, budžet, planer i
            fotografije — ako vam zatreba.
          </p>

          <div className={styles.footer}>
            <Button icon={AnimatedArrowRight}>
              <Link href="/pozivnice" className="white-color">
                Pogledaj dizajne
              </Link>
            </Button>
            <p className={styles.tagline}>Bez skrivenih troškova.</p>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default ClearPricing;
