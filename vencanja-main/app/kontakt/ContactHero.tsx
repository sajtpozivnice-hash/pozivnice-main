"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Heading from "@/components/shared/typography/Heading";
import HeroBadge from "@/components/hero/HeroBadge";

const ContactHero = () => {
  return (
    <div className={styles.contactHeroContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text={"Kontaktirajte Nas"} />
        <Heading className={`${styles.contactMainTitle} `}>
          Pokrenimo Vašu
          <span className={styles.contactMainTitleSpan}> Priču</span>
        </Heading>
        <motion.p
          className={`${styles.contactMainDescription}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.5,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Bez obzira da li imate jasnu viziju ili tek početnu ideju,
          <br /> naš tim je tu da vam pomogne da je pretvorite u stvarnost.
        </motion.p>
      </div>
    </div>
  );
};

export default ContactHero;
