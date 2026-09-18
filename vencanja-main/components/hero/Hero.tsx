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
        <HeroBadge text="Pozivnica + organizacija · 3.999 RSD" />
        <Heading className={styles.mainTitle}>
          <span className={styles.brand}>Vaš događaj</span>
          <span className={styles.mainTitleSpan}>
            Pozivnica za goste.
            <br />
            Organizacija za vas.
          </span>
        </Heading>
        <Paragraph center={false} variant="subtitle">
          Personalizovana digitalna pozivnica i privatni nalog za goste, RSVP,
          raspored sedenja, budžet i planer — sve na jednom mestu.
        </Paragraph>
        <p className={styles.priceLine}>
          3.999 RSD · jednokratno · bez pretplate · povrat u 7 dana
        </p>
        <p className={styles.systemLine}>
          Gosti · RSVP · Stolovi · Budžet · Planer · Fotografije
        </p>
        <motion.div
          className={styles.heroButtons}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.buttonRow}>
            <Button
              icon={AnimatedArrowRight}
              iconSize={28}
              iconDelay={0.6}
              buttonDelay={0.1}
              buttonDuration={0.7}
              maxWidth={280}
            >
              <Link href="/demo" className="white-color">
                Pogledaj demo
              </Link>
            </Button>
            <Button
              variant="secondary"
              icon={AnimatedArrowRight}
              iconSize={28}
              iconDelay={0.7}
              buttonDelay={0.15}
              buttonDuration={0.7}
              maxWidth={280}
            >
              <Link href="/pozivnice" className="white-color">
                Izaberi dizajn
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
