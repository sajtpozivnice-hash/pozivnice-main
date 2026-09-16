"use client";

import Link from "next/link";
import HeroBadge from "@/components/hero/HeroBadge";
import styles from "./Pozivnice.module.css";
import Heading from "@/components/shared/typography/Heading";
import { motion } from "framer-motion";
import Button from "@/components/button/Button";
import AnimatedArrowRight from "@/components/icons/AnimatedArrowRight";

const PozivniceHeader = () => {
  return (
    <div className={styles.pozivniceContainer}>
      <div className={styles.contactHeroContent}>
        <HeroBadge text="Izaberite dizajn · 3.999 RSD" />
        <Heading className={styles.pozivniceMainTitle}>
          Koja pozivnica vam se
          <span className={styles.pozivniceMainTitleSpan}> dopada?</span>
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
          1) Kliknite dizajn · 2) Po želji promenite tekst · 3) Naruči · 4) Mi
          šaljemo uputstvo za uplatu (3.999 RSD). Povrat novca u roku od 7 dana.
        </motion.p>
        <motion.div
          className={styles.pozivniceHeaderActions}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.45 }}
        >
          <Button icon={AnimatedArrowRight} maxWidth={280}>
            <Link href="#katalog" className="white-color">
              Skroluj do dizajna
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PozivniceHeader;
