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
        <HeroBadge text="Pozivnica + nalog · 3.999 RSD" />
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
          Izaberite dizajn, uredite sami i naručite. Uz pozivnicu dobijate i
          nalog: RSVP, gosti, stolovi, budžet i planer. 3.999 RSD · sve
          uključeno · povrat u 7 dana.
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
          <Button variant="secondary" icon={AnimatedArrowRight} maxWidth={280}>
            <Link href="/demo" className="white-color">
              Pogledaj demo
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PozivniceHeader;
