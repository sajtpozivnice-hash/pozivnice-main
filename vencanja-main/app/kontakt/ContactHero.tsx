"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Heading from "@/components/shared/typography/Heading";
import HeroBadge from "@/components/hero/HeroBadge";

const ContactHero = () => {
  return (
    <div className={styles.contactHeroContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text="3.999 RSD · jednokratno" />
        <Heading className={styles.contactMainTitle}>
          Kontakt
          <span className={styles.contactMainTitleSpan}>
            {" "}
            ili porudžbina
          </span>
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
          Najbrži način da naručite: otvorite Pozivnice → izaberite dizajn →
          pošaljite podatke. Mi vam pošaljemo uputstvo za uplatu.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactHero;
