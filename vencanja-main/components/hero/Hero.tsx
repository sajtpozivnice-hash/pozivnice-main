"use client";

import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import { motion } from "framer-motion";

import styles from "./Hero.module.css";
import HeroBadge from "./HeroBadge";
import Link from "next/link";
import Heading from "../shared/typography/Heading";
import Paragraph from "../shared/typography/Paragraph";

const Hero = () => {
  return (
    <div className={styles.background}>
      <div className={styles.heroContent}>
        <HeroBadge text="Digitalna pozivnica · 3.999 RSD" />
        <Heading className={styles.mainTitle}>
          <span className={styles.brand}>Vaš događaj</span>
          <span className={styles.mainTitleSpan}>
            Digitalna pozivnica
            <br />
            za vaš najvažniji dan.
          </span>
        </Heading>
        <Paragraph center={false} variant="subtitle">
          Izaberite dizajn, unesite svoje podatke i podelite link sa gostima.
          Plaćate jednom — 3.999 RSD — bez mesečne pretplate.
        </Paragraph>
        <p className={styles.priceLine}>
          3.999 RSD · jednokratno · povrat novca u 7 dana
        </p>
        <motion.div
          className={styles.heroButtons}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            icon={AnimatedArrowRight}
            iconSize={30}
            iconDelay={0.6}
            buttonDelay={0.1}
            buttonDuration={0.7}
            maxWidth={320}
          >
            <Link href="/pozivnice" className="white-color">
              Pogledaj dizajne i naruči
            </Link>
          </Button>
          <p className={styles.demoPrompt}>
            Želite prvo da probate?{" "}
            <Link href="/demo" className={styles.demoLink}>
              Isprobaj demo nalog
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
