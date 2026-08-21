"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./AlwaysFresh.module.css";

const CHANGES = [
  "Promenili ste restoran? Nema problema.",
  "Datum se promenio?",
  "Dodali ste novu informaciju?",
  "Promenila se lokacija?",
  "Želite novu fotografiju?",
];

const BENEFITS = [
  "Nema ponovnog štampanja.",
  "Nema slanja nove pozivnice.",
  "Nema dodatnog troška.",
];

const AlwaysFresh = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className={styles.eyebrow}>Uvek ažurno</p>
          <h2 className={styles.title}>Promenili ste nešto?</h2>
        </motion.div>

        <div className={styles.layout}>
          <motion.ul
            className={styles.changes}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            {CHANGES.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className={styles.payoff}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className={styles.solve}>Samo izmenite pozivnicu.</p>

            <ul className={styles.benefits}>
              {BENEFITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className={styles.assurance}>
              Vaša pozivnica je uvek ažurna.
            </p>

            <div className={styles.actions}>
              <Button icon={AnimatedArrowRight}>
                <Link href="/editor/vencanje-terra" className="white-color">
                  Isprobaj izmenu
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default AlwaysFresh;
