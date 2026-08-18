"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./EditorFreedom.module.css";

const EDITOR_FEATURES = [
  {
    title: "Fotografije",
    body: "Dodajte svoje najlepše fotografije.",
  },
  {
    title: "Tekstove",
    body: "Napišite priču baš onako kako želite.",
  },
  {
    title: "Fontove",
    body: "Izaberite stil koji vam odgovara.",
  },
  {
    title: "Boje",
    body: "Uskladite svaku boju sa vašim događajem.",
  },
  {
    title: "Sekcije",
    body: "Dodajte, uklonite i promenite redosled sadržaja.",
  },
  {
    title: "Detalje",
    body: "Vaša pozivnica ne treba da liči ni na jednu drugu.",
  },
];

const EditorFreedom = () => {
  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.grid}>
          <motion.div
            className={styles.stage}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className={styles.glow} aria-hidden />

            <div className={styles.laptop}>
              <div className={styles.laptopChrome}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.url}>editor · vaša pozivnica</span>
              </div>
              <div className={styles.laptopScreen}>
                <img
                  src="/preview.jpg"
                  alt="Primer uređivanja pozivnice u editoru"
                  className={styles.screenImage}
                />
              </div>
              <div className={styles.laptopBase} />
            </div>
          </motion.div>

          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <p className={styles.eyebrow}>Editor</p>
            <Heading className={styles.title}>Menjajte sve. Baš sve.</Heading>
            <Paragraph variant="subtitle" center={false} className={styles.lead}>
              Ne morate da se uklopite u gotov dizajn.
            </Paragraph>

            <ul className={styles.features}>
              {EDITOR_FEATURES.map((item) => (
                <li key={item.title} className={styles.feature}>
                  <span className={styles.featureTitle}>{item.title}</span>
                  <span className={styles.featureBody}>{item.body}</span>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Button icon={AnimatedArrowRight}>
                <Link href="/editor/vencanje-cinematic" className="white-color">
                  Otvori editor
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default EditorFreedom;
