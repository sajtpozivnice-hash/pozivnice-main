"use client";

import Link from "next/link";
import HeroBadge from "@/components/hero/HeroBadge";
import styles from "./Pozivnice.module.css";
import Heading from "@/components/shared/typography/Heading";
import { motion } from "framer-motion";
import Button from "@/components/button/Button";
import AnimatedMail from "@/components/icons/AnimatedMail";

const PozivniceHeader = () => {
  return (
    <div className={styles.pozivniceContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text="Primeri · 3.999 RSD jednokratno" />
        <Heading className={styles.pozivniceMainTitle}>
          Izaberite pozivnicu koja vam se
          <span className={styles.pozivniceMainTitleSpan}>
            {" "}
            najviše dopada
          </span>
        </Heading>
        <motion.p
          className={styles.pozivniceMainDescription}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.35,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Otvorite dizajn, isprobajte editor i pošaljite upit kad ste spremni.
          U cenu ulazi pozivnica + privatni nalog (RSVP, stolovi, budžet, planer,
          fotografije) — bez mesečne pretplate.
        </motion.p>
        <motion.div
          className={styles.pozivniceHeaderActions}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.45 }}
        >
          <Button variant="secondary" icon={AnimatedMail} maxWidth={280}>
            <Link href="/kontakt" className="white-color">
              Pošalji upit
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PozivniceHeader;
