"use client";

import Button from "../button/Button";
import AnimatedArrowRight from "../icons/AnimatedArrowRight";
import AnimatedMail from "../icons/AnimatedMail";
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
        <HeroBadge text="Digitalne pozivnice sa privatnim nalogom." />
        <Heading className={styles.mainTitle}>
          <span className={styles.brand}>Vaša pozivnica. Vaš sajt.</span>
          <span className={styles.mainTitleSpan}>
            Vaš događaj.
            <br />
            Sve na jednom mestu.
          </span>
        </Heading>
        <Paragraph center={false} variant="subtitle">
        Kreirajte prelepu online pozivnicu, prilagodite je potpuno po svojoj meri i upravijajte gostima, RSVP-om, budžetom, rasporedom sedenja i fotografijama — sve iz jednog mesta.</Paragraph>
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
            maxWidth={300}
          >
            <Link href="/pozivnice" className="white-color">
              Pogledaj primere
            </Link>
          </Button>
          <Button
            variant="secondary"
            icon={AnimatedMail}
            iconSize={30}
            iconDelay={0.6}
            buttonDelay={0.1}
            buttonDuration={0.7}
            maxWidth={300}
          >
            <Link href="/kontakt" className="white-color">
              Kontaktirajte nas
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
