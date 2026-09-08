"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Heading from "@/components/shared/typography/Heading";
import HeroBadge from "@/components/hero/HeroBadge";

const ContactHero = () => {
  return (
    <div className={styles.contactHeroContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text="Upit za pozivnicu · 3.999 RSD" />
        <Heading className={styles.contactMainTitle}>
          Pošaljite upit
          <span className={styles.contactMainTitleSpan}> — javljamo se lično</span>
        </Heading>
        <motion.p
          className={styles.contactMainDescription}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.35,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Recite nam za koji događaj vam treba pozivnica. Odgovaramo na email i
          dogovorimo dizajn, link i nalog — jednokratno 3.999 RSD, bez pretplate.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactHero;
