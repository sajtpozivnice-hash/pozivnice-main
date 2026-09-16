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
    body: "Otvorite katalog i kliknite na pozivnicu koja vam se dopada.",
  },
  {
    num: "2",
    title: "Unesite svoje podatke",
    body: "U editoru promenite imena, datum, tekstove i slike — kao u Wordu, samo lepše.",
  },
  {
    num: "3",
    title: "Pošaljite porudžbinu",
    body: "Popunite kratku formu. Mi vam pošaljemo uputstvo za uplatu.",
  },
  {
    num: "4",
    title: "Podelite sa gostima",
    body: "Posle uplate dobijate link i nalog. Ako niste zadovoljni — povrat novca u roku od 7 dana.",
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
            Četiri jednostavna koraka.
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
              Pogledaj dizajne
            </Link>
          </Button>
          <p className={styles.demoPrompt}>
            Želite prvo da probate?{" "}
            <Link href="/demo" className={styles.demoLink}>
              Isprobaj demo nalog
            </Link>
          </p>
        </motion.div>
      </Section>
    </div>
  );
};

export default HowItWorks;
