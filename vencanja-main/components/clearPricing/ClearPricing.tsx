"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./ClearPricing.module.css";

const INCLUDED = [
  "Kompletno prilagođavanje pozivnice",
  "Svi template-i",
  "Personalizovani link / domen",
  "RSVP",
  "Upravljanje gostima",
  "Planer",
  "Praćenje budžeta",
  "Raspored sedenja",
  "Fotografije gostiju",
  "Izmene nakon objavljivanja",
  "Neograničeno trajanje",
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
          <h2 className={styles.title}>Sve što vam treba. Jedna cena.</h2>

          <div className={styles.priceBlock}>
            <p className={styles.price}>
              3.999 <span>RSD</span>
            </p>
            <p className={styles.billing}>Jednokratno plaćanje.</p>
          </div>

          <ul className={styles.features}>
            {INCLUDED.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.35 }}
              >
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className={styles.footer}>
            <Button icon={AnimatedArrowRight}>
              <Link href="/pozivnice" className="white-color">
                Kreiraj svoju pozivnicu
              </Link>
            </Button>
            <p className={styles.tagline}>Plati jednom. Koristi zauvek.</p>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default ClearPricing;
