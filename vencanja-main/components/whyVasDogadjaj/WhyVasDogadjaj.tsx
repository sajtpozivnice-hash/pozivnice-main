"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import styles from "./WhyVasDogadjaj.module.css";

const REASONS = [
  {
    title: "Jedna pozivnica",
    body: "Pošaljite jedan link svim gostima — Viber, WhatsApp ili Instagram.",
  },
  {
    title: "Znate ko dolazi",
    body: "RSVP odgovori stižu direktno u vaš nalog. Bez tabelica i nagađanja.",
  },
  {
    title: "Organizujte goste",
    body: "Stolovi i raspored sedenja na jednom mestu, uz listu gostiju.",
  },
  {
    title: "Kontrolišite budžet",
    body: "Pratite troškove i zadatke dok planirate događaj — sve u istom nalogu.",
  },
];

const WhyVasDogadjaj = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.eyebrow}>Zašto Vaš događaj</p>
          <h2 className={styles.title}>
            Pozivnica je ulaz. Organizacija je proizvod.
          </h2>
          <p className={styles.lead}>
            Ne kupujete samo lep link — dobijate sistem za goste i planiranje
            celog događaja.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {REASONS.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: Math.min(index * 0.06, 0.3),
                duration: 0.4,
              }}
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </motion.article>
          ))}
        </div>

        <p className={styles.demoPrompt}>
          Bolje jednom da vidite?{" "}
          <Link href="/demo" className={styles.demoLink}>
            Otvorite demo nalog
          </Link>
        </p>
      </Section>
    </div>
  );
};

export default WhyVasDogadjaj;
