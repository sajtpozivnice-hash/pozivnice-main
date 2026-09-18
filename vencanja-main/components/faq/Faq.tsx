"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../layout/Section";
import styles from "./Faq.module.css";

const FAQ_ITEMS: { question: string; answer: ReactNode }[] = [
  {
    question: "Koliko košta?",
    answer:
      "3.999 RSD, jednokratno. Nema mesečne pretplate. Pozivnica ostaje aktivna.",
  },
  {
    question: "Kako naručujem?",
    answer:
      "Izaberete dizajn, unesete svoje podatke u editoru i pošaljete porudžbinu. Mi vam pošaljemo uputstvo za uplatu. Posle uplate dobijate link i nalog.",
  },
  {
    question: "Mogu li da probate pre kupovine?",
    answer: (
      <>
        Da. Otvorite{" "}
        <Link href="/demo" className={styles.inlineLink}>
          demo nalog
        </Link>{" "}
        i isprobajte kako izgleda — bez registracije i bez uplate.
      </>
    ),
  },
  {
    question: "Šta ako nisam zadovoljan/na?",
    answer:
      "Imate garanciju povrata novca u roku od 7 dana od uplate. Ako vam se ne sviđa, javite nam se — vraćamo novac.",
  },
  {
    question: "Mogu li da promenim tekst i slike?",
    answer:
      "Da. Pre porudžbine u editoru, a i posle uplate — kad god želite.",
  },
  {
    question: "Da li gosti mogu da potvrde dolazak?",
    answer:
      "Da. Na pozivnici mogu da jave da li dolaze, a vi to vidite u svom nalogu.",
  },
  {
    question: "Šta još dobijam uz pozivnicu?",
    answer:
      "Privatni nalog za organizaciju celog događaja: gosti, RSVP, stolovi, budžet, planer i fotografije. Pozivnica je ulaz — nalog je sistem.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.wrapper}>
      <Section>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Pitanja</p>
          <h2 className={styles.title}>Najčešća pitanja</h2>
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
                      transition={{
                        duration: 0.28,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
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

        <p className={styles.demoPrompt}>
          Niste sigurni?{" "}
          <Link href="/demo" className={styles.inlineLink}>
            Isprobaj demo nalog
          </Link>
        </p>
      </Section>
    </div>
  );
};

export default Faq;
