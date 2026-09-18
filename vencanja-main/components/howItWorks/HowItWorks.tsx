"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    num: "1",
    title: "Izaberite dizajn",
    body: "Otvorite katalog i kliknite na pozivnicu koja vam se dopada — ili prvo pogledajte demo nalog.",
  },
  {
    num: "2",
    title: "Uredite sami u editoru",
    body: "Promenite imena, datum, tekstove, slike, fontove i boje — bez slanja poruka nama.",
  },
  {
    num: "3",
    title: "Pošaljite porudžbinu",
    body: "Kratka forma, pa uputstvo za uplatu (3.999 RSD). Jednokratno, bez pretplate.",
  },
  {
    num: "4",
    title: "Link za goste + nalog za vas",
    body: "Posle uplate delite pozivnicu i koristite nalog: RSVP, gosti, stolovi, budžet i planer. Povrat novca u roku od 7 dana.",
  },
];

const HowItWorks = () => {
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
          <p className={styles.eyebrow}>Kako naručiti</p>
          <h2 className={styles.title}>
            Četiri koraka do pozivnice i naloga.
          </h2>
        </motion.div>

        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <motion.li
              key={step.num}
              className={styles.step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                delay: index * 0.07,
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className={styles.rail} aria-hidden>
                <span className={styles.node}>{step.num}</span>
                {index < STEPS.length - 1 && <span className={styles.line} />}
              </div>

              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Button icon={AnimatedArrowRight}>
            <Link href="/pozivnice" className="white-color">
              Izaberi dizajn
            </Link>
          </Button>
          <Button variant="secondary" icon={AnimatedArrowRight}>
            <Link href="/demo" className="white-color">
              Pogledaj demo
            </Link>
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default HowItWorks;
