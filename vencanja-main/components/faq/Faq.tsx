"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../layout/Section";
import styles from "./Faq.module.css";

const FAQ_ITEMS = [
  {
    question: "Da li mogu da menjam pozivnicu nakon kupovine?",
    answer:
      "Da. Nakon kupovine dobijate pristup svom panelu i možete menjati sadržaj pozivnice kad god želite.",
  },
  {
    question: "Da li postoji mesečna pretplata?",
    answer:
      "Ne. Plaćate jednom i pozivnicu možete koristiti neograničeno.",
  },
  {
    question: "Da li mogu da dodajem svoje fotografije?",
    answer:
      "Da. Možete dodavati i menjati fotografije direktno kroz editor.",
  },
  {
    question: "Mogu li gosti da potvrde dolazak?",
    answer:
      "Da. RSVP je deo vaše online pozivnice i odgovore pratite iz svog panela.",
  },
  {
    question: "Mogu li da menjam fontove i boje?",
    answer: "Da. Pozivnicu možete prilagoditi svojim željama.",
  },
  {
    question: "Mogu li da napravim raspored sedenja?",
    answer:
      "Da. Raspored možete napraviti u svom panelu i preuzeti ga kada završite.",
  },
  {
    question: "Mogu li gosti da šalju fotografije?",
    answer:
      "Da. Možete omogućiti gostima da uploaduju fotografije direktno preko vaše pozivnice.",
  },
  {
    question: "Koliko dugo je pozivnica aktivna?",
    answer: "Neograničeno.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.header}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 className={styles.title}>Česta pitanja</h2>
        </div>

        <div className={styles.list}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.icon} aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className={styles.answerWrap}
                    >
                      <p className={styles.answer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

export default Faq;
