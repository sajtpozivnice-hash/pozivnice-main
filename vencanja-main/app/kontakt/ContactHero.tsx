"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Heading from "@/components/shared/typography/Heading";
import HeroBadge from "@/components/hero/HeroBadge";

const ContactHero = () => {
  return (
    <div className={styles.contactHeroContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text="Razgovaramo o vašoj pozivnici" />
        <Heading className={styles.contactMainTitle}>
          Kontaktirajte nas
          <span className={styles.contactMainTitleSpan}> kad god ste spremni</span>
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
          Dopada vam se neki od naših dizajna? Ili želite potpuno jedinstvenu
          pozivnicu? Pišite nam — zajedno dogovorimo šta vam treba.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactHero;
